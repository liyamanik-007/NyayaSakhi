"""Backend tests for NyayaSakhi API"""
import os
import time
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


# ── API Root ──
class TestAPIRoot:
    def test_api_root(self):
        res = requests.get(f"{BASE_URL}/api/")
        assert res.status_code == 200
        assert "NyayaSakhi" in res.json().get("message", "")


# ── Chat CRUD basic ──
class TestChat:
    def test_post_chat(self):
        res = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "test_nyaya_9999999999",
            "message": "Hello, I need help",
            "language": "en",
            "user_name": "TestUser"
        }, timeout=60)
        assert res.status_code == 200
        data = res.json()
        assert "response" in data and len(data["response"]) > 0
        assert data["session_id"] == "test_nyaya_9999999999"

    def test_get_chat_history(self):
        requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "hist_test_999",
            "message": "Test message",
            "language": "en",
            "user_name": "TestUser"
        }, timeout=60)
        res = requests.get(f"{BASE_URL}/api/chat/history/hist_test_999")
        assert res.status_code == 200
        data = res.json()
        assert isinstance(data["messages"], list)
        assert data["session_id"] == "hist_test_999"

    def test_get_chat_history_empty(self):
        res = requests.get(f"{BASE_URL}/api/chat/history/nonexistent_session_xyz_TEST")
        assert res.status_code == 200
        assert res.json()["messages"] == []

    def test_delete_chat_session(self):
        sid = "TEST_delete_session_123"
        requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": sid, "message": "temp", "language": "en", "user_name": "Test"
        }, timeout=60)
        res = requests.delete(f"{BASE_URL}/api/chat/session/{sid}")
        assert res.status_code == 200
        hist = requests.get(f"{BASE_URL}/api/chat/history/{sid}")
        assert hist.json()["messages"] == []


# ── NEW: Age personalization ──
class TestAgePersonalization:
    """user_age field is optional. Different ages should produce different LLM personas."""

    def test_chat_accepts_user_age_field(self):
        res = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "TEST_age_15_session",
            "message": "Someone is bothering me",
            "language": "en",
            "user_name": "Test",
            "user_age": 15
        }, timeout=60)
        assert res.status_code == 200
        assert "response" in res.json()

    def test_chat_works_without_user_age(self):
        res = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "TEST_no_age_session",
            "message": "Hello",
            "language": "en",
            "user_name": "Test"
        }, timeout=60)
        assert res.status_code == 200
        assert len(res.json().get("response", "")) > 0

    def test_age_buckets_create_distinct_responses(self):
        """Sending same message with age=15 (teen) vs age=60 (senior) should produce
        meaningfully different responses (different persona)."""
        msg = "A neighbour keeps staring at me and following me. I am scared. Tell me what to do."

        r_teen = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "TEST_teen_distinct",
            "message": msg, "language": "en",
            "user_name": "Teen", "user_age": 15
        }, timeout=90)
        time.sleep(0.5)
        r_sn = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "TEST_senior_distinct",
            "message": msg, "language": "en",
            "user_name": "Senior", "user_age": 65
        }, timeout=90)

        assert r_teen.status_code == 200
        assert r_sn.status_code == 200
        teen_text = r_teen.json()["response"].lower()
        sn_text   = r_sn.json()["response"].lower()
        assert teen_text != sn_text, "Teen and Senior responses should differ"
        # Teen persona keywords (Childline 1098 / school / friend / trusted adult / college)
        teen_hint = any(k in teen_text for k in [
            "1098", "childline", "school", "college", "trusted adult", "teacher",
            "parent", "friend", "pocso"
        ])
        # Senior persona keywords
        sn_hint = any(k in sn_text for k in [
            "senior", "ji", "family", "tribunal", "maintenance", "elder", "1091"
        ])
        assert teen_hint or sn_hint, (
            f"Persona differentiation not detected.\nTEEN: {teen_text[:300]}\nSENIOR: {sn_text[:300]}"
        )


# ── NEW: Regional language script preservation & casual tone ──
class TestRegionalLanguageQuality:
    """Verify replies stay in the user's script (no transliteration) and helpline
    digits are preserved when relevant."""

    # Unicode script ranges for each language
    SCRIPT_RANGES = {
        "hi": (0x0900, 0x097F),  # Devanagari (Hindi)
        "mr": (0x0900, 0x097F),  # Devanagari (Marathi)
        "ta": (0x0B80, 0x0BFF),  # Tamil
        "te": (0x0C00, 0x0C7F),  # Telugu
        "kn": (0x0C80, 0x0CFF),  # Kannada
    }

    REGIONAL_CASES = [
        ("hi", "मुझे ऑफिस में परेशान किया जा रहा है, मेरी मदद करो", "hindi_office_harassment"),
        ("ta", "எனக்கு உதவி வேண்டும். யாரோ என்னைப் பின்தொடர்கிறார்கள்.", "tamil_stalking"),
        ("te", "ఆఫీస్‌లో నన్ను ఇబ్బంది పెడుతున్నారు. ఏం చేయాలి?", "telugu_office"),
        ("kn", "ನನಗೆ ಸಹಾಯ ಬೇಕು. ಮನೆಯಲ್ಲಿ ಗಲಾಟೆ ಆಗುತ್ತಿದೆ.", "kannada_dv"),
        ("mr", "मला कामाच्या ठिकाणी त्रास होत आहे. काय करू?", "marathi_workplace"),
    ]

    def _script_ratio(self, text, lang):
        """Return fraction of letters in the expected script."""
        lo, hi = self.SCRIPT_RANGES[lang]
        letters = [c for c in text if c.isalpha()]
        if not letters:
            return 0.0
        in_script = sum(1 for c in letters if lo <= ord(c) <= hi)
        return in_script / len(letters)

    def test_each_language_replies_in_native_script(self):
        """For each regional language, the reply must be predominantly in the
        same script as the user input (no Roman transliteration)."""
        for lang, msg, sid in self.REGIONAL_CASES:
            res = requests.post(f"{BASE_URL}/api/chat", json={
                "session_id": f"TEST_lang_{sid}",
                "message": msg,
                "language": lang,
                "user_name": "TestUser",
                "user_age": 28,
            }, timeout=90)
            assert res.status_code == 200, f"{lang}: status {res.status_code}"
            reply = res.json().get("response", "")
            assert len(reply) > 50, f"{lang}: reply too short — {reply!r}"
            ratio = self._script_ratio(reply, lang)
            # ≥60% letters in target script (allow some English legal terms like 'POSH', 'IPC')
            assert ratio >= 0.6, (
                f"{lang}: only {ratio:.0%} of letters in target script — "
                f"likely transliterated. Reply: {reply[:300]!r}"
            )
            time.sleep(0.4)

    def test_helpline_numbers_appear_as_digits(self):
        """When the response references helpline numbers, they must appear as
        digits (1091/100/1098) and not as spelled-out words."""
        # Use an English-language urgent prompt — easiest to assert digit presence
        res = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "TEST_helpline_digits",
            "message": "I am in immediate danger right now. Help.",
            "language": "en",
            "user_name": "TestUser",
            "user_age": 25,
        }, timeout=90)
        assert res.status_code == 200
        text = res.json()["response"]
        # At least one of the well-known digit-form helplines should appear
        has_digit_helpline = any(num in text for num in ["1091", "100", "1098", "011-26942369"])
        assert has_digit_helpline, f"No digit-form helpline in urgent reply: {text[:300]!r}"
def teardown_module(module):
    for sid in [
        "TEST_delete_session_123", "TEST_age_15_session", "TEST_no_age_session",
        "TEST_teen_distinct", "TEST_senior_distinct", "test_nyaya_9999999999",
        "hist_test_999",
        "TEST_lang_hindi_office_harassment", "TEST_lang_tamil_stalking",
        "TEST_lang_telugu_office", "TEST_lang_kannada_dv",
        "TEST_lang_marathi_workplace", "TEST_helpline_digits",
    ]:
        try:
            requests.delete(f"{BASE_URL}/api/chat/session/{sid}", timeout=10)
        except Exception:
            pass
