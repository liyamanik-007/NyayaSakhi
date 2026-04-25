import { extraTranslations } from "./extraTranslations";

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

export const translations = {
  en: {
    appName: "NyayaSakhi",
    tagline: "Your Safe Space • Your Legal Friend",
    login: {
      welcome: "Welcome",
      safeSpace: "You are in a safe space",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      continueBtn: "Continue",
      selectLanguage: "Select Language"
    },
    calm: {
      title: "You're Safe.",
      subtitle: "Take a Moment.",
      breatheIn: "Breathe In",
      breatheOut: "Breathe Out",
      line1: "Let's slow things down.",
      line2: "You're not alone.",
      line3: "We will guide you step by step.",
      readyBtn: "I'm Ready to Continue"
    },
    home: {
      greeting: "Hi",
      subtitle: "How can I help you today?",
      chat: "Talk to NyayaSakhi",
      chatSub: "AI-powered legal & emotional support",
      rights: "Know Your Rights",
      rightsSub: "POSH Act, DV Act & more",
      emergency: "Emergency Help",
      emergencySub: "Helplines & immediate support",
      calm: "Calm Mode",
      calmSub: "Take a breathing break"
    },
    chat: {
      title: "NyayaSakhi",
      subtitle: "AI Legal Support",
      placeholder: "Tell me what's happening...",
      send: "Send",
      quickActions: ["Harassment", "Workplace Abuse", "Know My Rights", "Roommate Issue"],
      welcome: "Hi! I'm NyayaSakhi, your legal support companion. I'm here to listen and help. Tell me what's happening — everything you share is private and confidential.",
      thinking: "Thinking...",
      clearChat: "Clear Chat"
    },
    legal: {
      title: "Know Your Rights",
      subtitle: "Your legal protections, simplified",
      posh: {
        title: "POSH Act 2013",
        fullName: "Sexual Harassment of Women at Workplace Act",
        description: "Protects you from sexual harassment at any workplace — office, factory, hospital, educational institution.",
        steps: [
          "Report to your Internal Complaints Committee (ICC) within 90 days",
          "ICC must complete inquiry within 60 days",
          "Contact Local Complaints Committee (LCC) at district level if no ICC",
          "Whistleblower protection: No one can retaliate against you"
        ]
      },
      dv: {
        title: "DV Act 2005",
        fullName: "Protection of Women from Domestic Violence Act",
        description: "Covers physical, sexual, verbal, emotional, and financial abuse by any family member.",
        steps: [
          "File complaint with Protection Officer at police station or court",
          "You can get a Protection Order, Residence Order, or Monetary Relief",
          "Contact a Service Provider — government-appointed NGO near you",
          "Free legal aid available at District Legal Services Authority"
        ]
      },
      ipc: {
        title: "IPC Protections",
        fullName: "Indian Penal Code — Key Sections for Women",
        description: "The IPC provides specific sections to protect women from various offences.",
        steps: [
          "Section 354: Assault or criminal force against a woman",
          "Section 354A: Sexual harassment at any location",
          "Section 354D: Stalking — even online stalking is an offence",
          "Section 498A: Husband/relative cruelty (dowry harassment)"
        ]
      }
    },
    emergency: {
      title: "Emergency Help",
      subtitle: "You are not alone. Help is one call away.",
      womenHelpline: "Women Helpline",
      police: "Police",
      ncw: "Nat'l Commission for Women",
      childline: "Childline",
      callNow: "Call Now",
      safeMessage: "If you are in immediate danger, call 100 right now.",
      tip1: "Move to a safe location if possible",
      tip2: "Tell a trusted person your location",
      tip3: "Document evidence if it is safe to do so"
    },
    nav: { back: "Back", home: "Home" }
  },

  hi: {
    appName: "न्यायसखी",
    tagline: "आपका सुरक्षित स्थान • आपकी कानूनी मित्र",
    login: {
      welcome: "स्वागत है",
      safeSpace: "आप एक सुरक्षित स्थान पर हैं",
      nameLabel: "आपका नाम",
      namePlaceholder: "अपना नाम दर्ज करें",
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "फोन नंबर दर्ज करें",
      continueBtn: "आगे बढ़ें",
      selectLanguage: "भाषा चुनें"
    },
    calm: {
      title: "आप सुरक्षित हैं।",
      subtitle: "एक पल रुकें।",
      breatheIn: "सांस लें",
      breatheOut: "सांस छोड़ें",
      line1: "चीज़ों को धीमा करें।",
      line2: "आप अकेले नहीं हैं।",
      line3: "हम आपको कदम दर कदम मार्गदर्शन करेंगे।",
      readyBtn: "मैं आगे जाने के लिए तैयार हूँ"
    },
    home: {
      greeting: "नमस्ते",
      subtitle: "आज मैं आपकी कैसे मदद कर सकती हूँ?",
      chat: "न्यायसखी से बात करें",
      chatSub: "AI कानूनी एवं भावनात्मक सहायता",
      rights: "अपने अधिकार जानें",
      rightsSub: "POSH, DV अधिनियम और अधिक",
      emergency: "आपातकालीन सहायता",
      emergencySub: "हेल्पलाइन और तत्काल सहायता",
      calm: "शांत मोड",
      calmSub: "एक श्वास विराम लें"
    },
    chat: {
      title: "न्यायसखी",
      subtitle: "AI कानूनी सहायता",
      placeholder: "मुझे बताएं क्या हो रहा है...",
      send: "भेजें",
      quickActions: ["उत्पीड़न", "कार्यस्थल दुर्व्यवहार", "मेरे अधिकार जानें", "रूममेट समस्या"],
      welcome: "नमस्ते! मैं न्यायसखी हूँ, आपकी कानूनी सहायक। आप मुझे बताएं क्या हो रहा है — आपकी हर बात गोपनीय रहेगी।",
      thinking: "सोच रही हूँ...",
      clearChat: "चैट साफ़ करें"
    },
    legal: {
      title: "अपने अधिकार जानें",
      subtitle: "आपकी कानूनी सुरक्षा, सरल भाषा में",
      posh: {
        title: "POSH अधिनियम 2013",
        fullName: "कार्यस्थल पर यौन उत्पीड़न (रोकथाम, निषेध एवं निवारण) अधिनियम",
        description: "किसी भी कार्यस्थल पर यौन उत्पीड़न से आपको सुरक्षित करता है।",
        steps: [
          "90 दिनों के भीतर ICC को शिकायत करें",
          "ICC को 60 दिनों में जांच पूरी करनी होगी",
          "यदि ICC नहीं है तो जिला स्तर पर LCC से संपर्क करें",
          "प्रतिशोध के खिलाफ व्हिसलब्लोअर सुरक्षा उपलब्ध है"
        ]
      },
      dv: {
        title: "घरेलू हिंसा अधिनियम 2005",
        fullName: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम",
        description: "शारीरिक, यौन, मौखिक, भावनात्मक और आर्थिक दुर्व्यवहार को कवर करता है।",
        steps: [
          "पुलिस थाने या अदालत में संरक्षण अधिकारी के पास शिकायत दर्ज करें",
          "संरक्षण आदेश, निवास आदेश या आर्थिक राहत पा सकती हैं",
          "सरकार द्वारा नियुक्त NGO से संपर्क करें",
          "जिला कानूनी सेवा प्राधिकरण पर मुफ्त कानूनी सहायता"
        ]
      },
      ipc: {
        title: "IPC संरक्षण",
        fullName: "भारतीय दंड संहिता — महिलाओं के लिए प्रमुख धाराएं",
        description: "IPC महिलाओं को विभिन्न अपराधों से बचाने के लिए विशेष धाराएं प्रदान करती है।",
        steps: [
          "धारा 354: महिला के विरुद्ध आपराधिक बल प्रयोग",
          "धारा 354A: किसी भी स्थान पर यौन उत्पीड़न",
          "धारा 354D: पीछा करना — ऑनलाइन पीछा भी अपराध है",
          "धारा 498A: पति/रिश्तेदार की क्रूरता (दहेज उत्पीड़न)"
        ]
      }
    },
    emergency: {
      title: "आपातकालीन सहायता",
      subtitle: "आप अकेले नहीं हैं। सहायता बस एक कॉल दूर है।",
      womenHelpline: "महिला हेल्पलाइन",
      police: "पुलिस",
      ncw: "राष्ट्रीय महिला आयोग",
      childline: "चाइल्डलाइन",
      callNow: "अभी कॉल करें",
      safeMessage: "यदि आप तत्काल खतरे में हैं, तुरंत 100 पर कॉल करें।",
      tip1: "यदि संभव हो तो सुरक्षित स्थान पर जाएं",
      tip2: "किसी विश्वसनीय व्यक्ति को अपनी लोकेशन बताएं",
      tip3: "यदि सुरक्षित हो तो सबूत दर्ज करें"
    },
    nav: { back: "वापस", home: "होम" }
  },

  ta: {
    appName: "நியாயசகி",
    tagline: "உங்கள் பாதுகாப்பான இடம் • உங்கள் சட்ட நண்பர்",
    login: {
      welcome: "வரவேற்கிறோம்",
      safeSpace: "நீங்கள் பாதுகாப்பான இடத்தில் இருக்கிறீர்கள்",
      nameLabel: "உங்கள் பெயர்",
      namePlaceholder: "உங்கள் பெயரை உள்ளிடவும்",
      phoneLabel: "தொலைபேசி எண்",
      phonePlaceholder: "தொலைபேசி எண்ணை உள்ளிடவும்",
      continueBtn: "தொடரவும்",
      selectLanguage: "மொழி தேர்ந்தெடு"
    },
    calm: {
      title: "நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்.",
      subtitle: "ஒரு நிமிடம் எடுங்கள்.",
      breatheIn: "உள்ளிழுங்கள்",
      breatheOut: "வெளியேற்றுங்கள்",
      line1: "மெதுவாக சுவாசியுங்கள்.",
      line2: "நீங்கள் தனியாக இல்லை.",
      line3: "நாங்கள் படிப்படியாக வழிகாட்டுவோம்.",
      readyBtn: "தொடர நான் தயாராக இருக்கிறேன்"
    },
    home: {
      greeting: "வணக்கம்",
      subtitle: "இன்று நான் உங்களுக்கு எவ்வாறு உதவலாம்?",
      chat: "நியாயசகியிடம் பேசு",
      chatSub: "AI சட்ட மற்றும் உணர்வு ஆதரவு",
      rights: "உங்கள் உரிமைகளை அறியுங்கள்",
      rightsSub: "POSH, DV சட்டம் மற்றும் மேலும்",
      emergency: "அவசர உதவி",
      emergencySub: "உதவி எண்கள் மற்றும் உடனடி ஆதரவு",
      calm: "அமைதி முறை",
      calmSub: "மூச்சு பயிற்சி எடுங்கள்"
    },
    chat: {
      title: "நியாயசகி",
      subtitle: "AI சட்ட ஆதரவு",
      placeholder: "என்ன நடக்கிறது என்று சொல்லுங்கள்...",
      send: "அனுப்பு",
      quickActions: ["தொல்லை", "பணியிட துஷ்பிரயோகம்", "என் உரிமைகள் அறி", "அறைத்தோழர் பிரச்சனை"],
      welcome: "வணக்கம்! நான் நியாயசகி, உங்கள் சட்ட ஆதரவு உதவியாளர். என்ன நடக்கிறது என்று சொல்லுங்கள் — எல்லாமே ரகசியமாக இருக்கும்.",
      thinking: "யோசிக்கிறேன்...",
      clearChat: "அரட்டையை அழி"
    },
    legal: {
      title: "உங்கள் உரிமைகளை அறியுங்கள்",
      subtitle: "உங்கள் சட்ட பாதுகாப்பு, எளிய மொழியில்",
      posh: {
        title: "POSH சட்டம் 2013",
        fullName: "பணியிடத்தில் பெண்களின் பாலியல் துன்புறுத்தல் தடுப்பு சட்டம்",
        description: "அலுவலகம், மருத்துவமனை உட்பட எந்த பணியிடத்திலும் பாலியல் துன்புறுத்தலிலிருந்து பாதுகாக்கிறது.",
        steps: [
          "90 நாட்களுக்குள் ICC-யிடம் புகார் அளிக்கவும்",
          "ICC 60 நாட்களில் விசாரணை முடிக்க வேண்டும்",
          "ICC இல்லாவிட்டால் மாவட்ட LCC-யிடம் புகார் அளிக்கலாம்",
          "யாரும் உங்களுக்கு எதிர் நடவடிக்கை எடுக்க முடியாது"
        ]
      },
      dv: {
        title: "குடும்ப வன்முறை சட்டம் 2005",
        fullName: "குடும்ப வன்முறையிலிருந்து பெண்களுக்கு பாதுகாப்பு சட்டம்",
        description: "உடல், பாலியல், வாய்மொழி, உணர்ச்சி மற்றும் நிதி துஷ்பிரயோகம் ஆகியவற்றை உள்ளடக்கியது.",
        steps: [
          "பொலீஸ் நிலையம் அல்லது நீதிமன்றத்தில் புகார் அளிக்கவும்",
          "பாதுகாப்பு ஆணை அல்லது வாழிட ஆணை பெறலாம்",
          "அரசு நியமித்த NGO-வை தொடர்பு கொள்ளவும்",
          "மாவட்ட சட்ட சேவை ஆணையத்தில் இலவச சட்ட உதவி"
        ]
      },
      ipc: {
        title: "IPC பாதுகாப்பு",
        fullName: "இந்திய தண்டனை சட்டம் — பெண்களுக்கான முக்கிய பிரிவுகள்",
        description: "IPC பெண்களுக்கு பல குற்றங்களிலிருந்து பாதுகாப்பு அளிக்கிறது.",
        steps: [
          "பிரிவு 354: பெண்ணுக்கு எதிரான தாக்குதல்",
          "பிரிவு 354A: எந்த இடத்திலும் பாலியல் துன்புறுத்தல்",
          "பிரிவு 354D: பின்தொடர்தல் — ஆன்லைன் பின்தொடர்தலும் குற்றம்",
          "பிரிவு 498A: கணவன்/உறவினர் கொடுமை (வரதட்சணை)"
        ]
      }
    },
    emergency: {
      title: "அவசர உதவி",
      subtitle: "நீங்கள் தனியாக இல்லை. உதவி ஒரு அழைப்பு தூரத்தில் உள்ளது.",
      womenHelpline: "பெண்கள் உதவி எண்",
      police: "பொலீஸ்",
      ncw: "தேசிய மகளிர் ஆணையம்",
      childline: "சைல்டுலைன்",
      callNow: "இப்போது அழைக்கவும்",
      safeMessage: "உடனடி ஆபத்தில் இருந்தால், உடனே 100 என்று அழைக்கவும்.",
      tip1: "முடிந்தால் பாதுகாப்பான இடத்திற்கு செல்லவும்",
      tip2: "நம்பகமான ஒருவரிடம் இருப்பிடம் சொல்லுங்கள்",
      tip3: "பாதுகாப்பாக இருந்தால் ஆதாரங்களை பதிவு செய்யுங்கள்"
    },
    nav: { back: "திரும்பு", home: "முகப்பு" }
  },

  te: {
    appName: "న్యాయసఖి",
    tagline: "మీ సురక్షిత స్థలం • మీ చట్టపరమైన స్నేహితురాలు",
    login: {
      welcome: "స్వాగతం",
      safeSpace: "మీరు సురక్షిత స్థలంలో ఉన్నారు",
      nameLabel: "మీ పేరు",
      namePlaceholder: "మీ పేరు నమోదు చేయండి",
      phoneLabel: "ఫోన్ నంబర్",
      phonePlaceholder: "ఫోన్ నంబర్ నమోదు చేయండి",
      continueBtn: "కొనసాగించు",
      selectLanguage: "భాష ఎంచుకోండి"
    },
    calm: {
      title: "మీరు సురక్షితంగా ఉన్నారు.",
      subtitle: "ఒక్క క్షణం తీసుకోండి.",
      breatheIn: "శ్వాస తీసుకోండి",
      breatheOut: "శ్వాస వదలండి",
      line1: "నెమ్మదిగా శ్వాస తీసుకోండి.",
      line2: "మీరు ఒంటరిగా లేరు.",
      line3: "మేము మీకు అడుగు అడుగుగా మార్గనిర్దేశం చేస్తాం.",
      readyBtn: "నేను కొనసాగడానికి సిద్ధంగా ఉన్నాను"
    },
    home: {
      greeting: "నమస్కారం",
      subtitle: "ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      chat: "న్యాయసఖితో మాట్లాడు",
      chatSub: "AI చట్టపరమైన మద్దతు",
      rights: "మీ హక్కులు తెలుసుకోండి",
      rightsSub: "POSH, DV చట్టం మరియు మరిన్ని",
      emergency: "అత్యవసర సహాయం",
      emergencySub: "హెల్ప్‌లైన్‌లు & తక్షణ మద్దతు",
      calm: "శాంత మోడ్",
      calmSub: "శ్వాస విరామం తీసుకోండి"
    },
    chat: {
      title: "న్యాయసఖి",
      subtitle: "AI చట్టపరమైన మద్దతు",
      placeholder: "ఏం జరుగుతుందో చెప్పండి...",
      send: "పంపండి",
      quickActions: ["వేధింపు", "కార్యాలయ దుర్వినియోగం", "నా హక్కులు తెలుసుకో", "రూమ్‌మేట్ సమస్య"],
      welcome: "నమస్కారం! నేను న్యాయసఖి, మీ చట్టపరమైన సహాయకురాలిని. ఏం జరుగుతుందో చెప్పండి — మీరు చెప్పేది రహస్యంగా ఉంటుంది.",
      thinking: "ఆలోచిస్తున్నాను...",
      clearChat: "చాట్ క్లియర్ చేయండి"
    },
    legal: {
      title: "మీ హక్కులు తెలుసుకోండి",
      subtitle: "మీ చట్టపరమైన రక్షణలు, సరళమైన భాషలో",
      posh: {
        title: "POSH చట్టం 2013",
        fullName: "కార్యాలయంలో మహిళలపై లైంగిక వేధింపు నిరోధక చట్టం",
        description: "ఏ కార్యాలయంలోనైనా లైంగిక వేధింపుల నుండి మిమ్మల్ని రక్షిస్తుంది.",
        steps: [
          "90 రోజుల్లోపు ICC కి ఫిర్యాదు చేయండి",
          "ICC 60 రోజుల్లో విచారణ పూర్తి చేయాలి",
          "ICC లేకపోతే జిల్లా LCC కి ఫిర్యాదు చేయవచ్చు",
          "ఎవరూ మీకు వ్యతిరేకంగా చర్య తీసుకోలేరు"
        ]
      },
      dv: {
        title: "DV చట్టం 2005",
        fullName: "గృహ హింస నుండి మహిళలను రక్షించే చట్టం",
        description: "శారీరక, లైంగిక, మౌఖిక, భావోద్వేగ మరియు ఆర్థిక దుర్వినియోగాన్ని కవర్ చేస్తుంది.",
        steps: [
          "పోలీస్ స్టేషన్ లేదా కోర్టులో ఫిర్యాదు చేయండి",
          "రక్షణ ఆర్డర్ లేదా నివాస ఆర్డర్ పొందవచ్చు",
          "ప్రభుత్వం నియమించిన NGO ని సంప్రదించండి",
          "జిల్లా చట్టపరమైన సేవా అధికారి వద్ద ఉచిత సహాయం"
        ]
      },
      ipc: {
        title: "IPC రక్షణలు",
        fullName: "భారతీయ దండ స్మృతి — మహిళలకు ముఖ్యమైన విభాగాలు",
        description: "IPC మహిళలను వివిధ నేరాల నుండి రక్షించే విభాగాలను అందిస్తుంది.",
        steps: [
          "సెక్షన్ 354: మహిళపై దాడి లేదా నేరపూరిత బలప్రయోగం",
          "సెక్షన్ 354A: ఏ స్థలంలోనైనా లైంగిక వేధింపు",
          "సెక్షన్ 354D: వెంబడించడం — ఆన్‌లైన్ వెంబడించడం కూడా నేరం",
          "సెక్షన్ 498A: భర్త/బంధువు క్రూరత్వం (వరకట్న వేధింపు)"
        ]
      }
    },
    emergency: {
      title: "అత్యవసర సహాయం",
      subtitle: "మీరు ఒంటరిగా లేరు. సహాయం ఒక కాల్ దూరంలో ఉంది.",
      womenHelpline: "మహిళా హెల్ప్‌లైన్",
      police: "పోలీస్",
      ncw: "జాతీయ మహిళా కమిషన్",
      childline: "చైల్డ్‌లైన్",
      callNow: "ఇప్పుడే కాల్ చేయండి",
      safeMessage: "తక్షణ ప్రమాదంలో ఉంటే, వెంటనే 100 కి కాల్ చేయండి.",
      tip1: "సాధ్యమైతే సురక్షిత ప్రదేశానికి వెళ్ళండి",
      tip2: "నమ్మకమైన వ్యక్తికి మీ స్థానం తెలియజేయండి",
      tip3: "సురక్షితంగా ఉంటే ఆధారాలు నమోదు చేయండి"
    },
    nav: { back: "వెనుకకు", home: "హోమ్" }
  },

  kn: {
    appName: "ನ್ಯಾಯಸಖಿ",
    tagline: "ನಿಮ್ಮ ಸುರಕ್ಷಿತ ಸ್ಥಳ • ನಿಮ್ಮ ಕಾನೂನು ಮಿತ್ರ",
    login: {
      welcome: "ಸ್ವಾಗತ",
      safeSpace: "ನೀವು ಸುರಕ್ಷಿತ ಸ್ಥಳದಲ್ಲಿದ್ದೀರಿ",
      nameLabel: "ನಿಮ್ಮ ಹೆಸರು",
      namePlaceholder: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
      phonePlaceholder: "ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
      continueBtn: "ಮುಂದುವರಿಯಿರಿ",
      selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ"
    },
    calm: {
      title: "ನೀವು ಸುರಕ್ಷಿತರಾಗಿದ್ದೀರಿ.",
      subtitle: "ಒಂದು ಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳಿ.",
      breatheIn: "ಉಸಿರು ತೆಗೆಯಿರಿ",
      breatheOut: "ಉಸಿರು ಬಿಡಿ",
      line1: "ನಿಧಾನವಾಗಿ ಉಸಿರಾಡಿ.",
      line2: "ನೀವು ಒಂಟಿಯಲ್ಲ.",
      line3: "ನಾವು ಹೆಜ್ಜೆ ಹೆಜ್ಜೆಯಾಗಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡುತ್ತೇವೆ.",
      readyBtn: "ಮುಂದುವರಿಯಲು ನಾನು ಸಿದ್ಧ"
    },
    home: {
      greeting: "ನಮಸ್ಕಾರ",
      subtitle: "ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      chat: "ನ್ಯಾಯಸಖಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ",
      chatSub: "AI ಕಾನೂನು ಮತ್ತು ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ",
      rights: "ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ",
      rightsSub: "POSH, DV ಕಾಯ್ದೆ ಮತ್ತು ಹೆಚ್ಚು",
      emergency: "ತುರ್ತು ಸಹಾಯ",
      emergencySub: "ಹೆಲ್ಪ್‌ಲೈನ್‌ಗಳು ಮತ್ತು ತಕ್ಷಣ ಬೆಂಬಲ",
      calm: "ಶಾಂತ ಮೋಡ್",
      calmSub: "ಉಸಿರಾಟ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಿ"
    },
    chat: {
      title: "ನ್ಯಾಯಸಖಿ",
      subtitle: "AI ಕಾನೂನು ಬೆಂಬಲ",
      placeholder: "ಏನು ನಡೆಯುತ್ತಿದೆ ಎಂದು ಹೇಳಿ...",
      send: "ಕಳುಹಿಸಿ",
      quickActions: ["ಕಿರುಕುಳ", "ಕಾರ್ಯಸ್ಥಳ ದುರ್ಬಳಕೆ", "ನನ್ನ ಹಕ್ಕುಗಳು ತಿಳಿಯಿರಿ", "ರೂಮ್‌ಮೇಟ್ ಸಮಸ್ಯೆ"],
      welcome: "ನಮಸ್ಕಾರ! ನಾನು ನ್ಯಾಯಸಖಿ, ನಿಮ್ಮ ಕಾನೂನು ಬೆಂಬಲ ಸಹಾಯಕಿ. ಏನು ನಡೆಯುತ್ತಿದೆ ಎಂದು ಹೇಳಿ — ಎಲ್ಲವೂ ಗೌಪ್ಯವಾಗಿರುತ್ತದೆ.",
      thinking: "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...",
      clearChat: "ಚಾಟ್ ತೆರವು ಮಾಡಿ"
    },
    legal: {
      title: "ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ",
      subtitle: "ನಿಮ್ಮ ಕಾನೂನು ರಕ್ಷಣೆಗಳು, ಸರಳ ಭಾಷೆಯಲ್ಲಿ",
      posh: {
        title: "POSH ಕಾಯ್ದೆ 2013",
        fullName: "ಕಾರ್ಯಸ್ಥಳದಲ್ಲಿ ಮಹಿಳೆಯರ ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಕಾಯ್ದೆ",
        description: "ಯಾವುದೇ ಕಾರ್ಯಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳದಿಂದ ನಿಮ್ಮನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.",
        steps: [
          "90 ದಿನಗಳಲ್ಲಿ ICC ಗೆ ದೂರು ನೀಡಿ",
          "ICC 60 ದಿನಗಳಲ್ಲಿ ತನಿಖೆ ಮುಗಿಸಬೇಕು",
          "ICC ಇಲ್ಲದಿದ್ದರೆ ಜಿಲ್ಲಾ LCC ಗೆ ದೂರು ಸಲ್ಲಿಸಿ",
          "ಯಾರೂ ನಿಮ್ಮ ವಿರುದ್ಧ ಸೇಡು ತೀರಿಸಿಕೊಳ್ಳಲು ಆಗುವುದಿಲ್ಲ"
        ]
      },
      dv: {
        title: "ಗೃಹ ಹಿಂಸೆ ಕಾಯ್ದೆ 2005",
        fullName: "ಗೃಹ ಹಿಂಸೆಯಿಂದ ಮಹಿಳೆಯರ ರಕ್ಷಣೆ ಕಾಯ್ದೆ",
        description: "ಶಾರೀರಿಕ, ಲೈಂಗಿಕ, ವಾಚಿಕ, ಭಾವನಾತ್ಮಕ ಮತ್ತು ಆರ್ಥಿಕ ದುರ್ಬಳಕೆಯನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ.",
        steps: [
          "ಪೊಲೀಸ್ ಠಾಣೆ ಅಥವಾ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ದೂರು ನೀಡಿ",
          "ರಕ್ಷಣಾ ಆದೇಶ ಅಥವಾ ವಾಸ ಆದೇಶ ಪಡೆಯಬಹುದು",
          "ಸರ್ಕಾರ ನೇಮಿಸಿದ NGO ಸಂಪರ್ಕಿಸಿ",
          "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವಾ ಪ್ರಾಧಿಕಾರದಲ್ಲಿ ಉಚಿತ ಸಹಾಯ"
        ]
      },
      ipc: {
        title: "IPC ರಕ್ಷಣೆಗಳು",
        fullName: "ಭಾರತೀಯ ದಂಡ ಸಂಹಿತೆ — ಮಹಿಳೆಯರಿಗೆ ಪ್ರಮುಖ ಕಲಂಗಳು",
        description: "IPC ಮಹಿಳೆಯರನ್ನು ವಿವಿಧ ಅಪರಾಧಗಳಿಂದ ರಕ್ಷಿಸಲು ಕಲಂಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
        steps: [
          "ಕಲಂ 354: ಮಹಿಳೆಯ ವಿರುದ್ಧ ಹಲ್ಲೆ ಅಥವಾ ಅಪರಾಧ ಬಲ",
          "ಕಲಂ 354A: ಯಾವುದೇ ಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳ",
          "ಕಲಂ 354D: ಹಿಂಬಾಲಿಸುವುದು — ಆನ್‌ಲೈನ್ ಹಿಂಬಾಲಿಸುವುದೂ ಅಪರಾಧ",
          "ಕಲಂ 498A: ಪತಿ/ಸಂಬಂಧಿ ಕ್ರೌರ್ಯ (ವರದಕ್ಷಿಣೆ ಕಿರುಕುಳ)"
        ]
      }
    },
    emergency: {
      title: "ತುರ್ತು ಸಹಾಯ",
      subtitle: "ನೀವು ಒಂಟಿಯಲ್ಲ. ಸಹಾಯ ಒಂದು ಕರೆ ದೂರದಲ್ಲಿದೆ.",
      womenHelpline: "ಮಹಿಳಾ ಹೆಲ್ಪ್‌ಲೈನ್",
      police: "ಪೊಲೀಸ್",
      ncw: "ರಾಷ್ಟ್ರೀಯ ಮಹಿಳಾ ಆಯೋಗ",
      childline: "ಚೈಲ್ಡ್‌ಲೈನ್",
      callNow: "ಈಗ ಕರೆ ಮಾಡಿ",
      safeMessage: "ತಕ್ಷಣ ಅಪಾಯದಲ್ಲಿದ್ದರೆ, ತಕ್ಷಣ 100 ಗೆ ಕರೆ ಮಾಡಿ.",
      tip1: "ಸಾಧ್ಯವಾದರೆ ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಹೋಗಿ",
      tip2: "ನಂಬಿಕಸ್ಥ ವ್ಯಕ್ತಿಗೆ ನಿಮ್ಮ ಸ್ಥಳ ತಿಳಿಸಿ",
      tip3: "ಸುರಕ್ಷಿತವಾಗಿದ್ದರೆ ಸಾಕ್ಷ್ಯ ದಾಖಲಿಸಿ"
    },
    nav: { back: "ಹಿಂದೆ", home: "ಮನೆ" }
  },

  mr: {
    appName: "न्यायसखी",
    tagline: "तुमची सुरक्षित जागा • तुमची कायदेशीर मैत्रीण",
    login: {
      welcome: "स्वागत आहे",
      safeSpace: "तुम्ही एका सुरक्षित ठिकाणी आहात",
      nameLabel: "तुमचे नाव",
      namePlaceholder: "तुमचे नाव प्रविष्ट करा",
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "फोन नंबर प्रविष्ट करा",
      continueBtn: "पुढे जा",
      selectLanguage: "भाषा निवडा"
    },
    calm: {
      title: "तुम्ही सुरक्षित आहात.",
      subtitle: "एक क्षण थांबा.",
      breatheIn: "श्वास घ्या",
      breatheOut: "श्वास सोडा",
      line1: "हळूहळू श्वास घ्या.",
      line2: "तुम्ही एकटे नाही.",
      line3: "आम्ही तुम्हाला पावलोपावली मार्गदर्शन करू.",
      readyBtn: "मी पुढे जाण्यास तयार आहे"
    },
    home: {
      greeting: "नमस्कार",
      subtitle: "आज मी तुम्हाला कशी मदत करू शकते?",
      chat: "न्यायसखीशी बोला",
      chatSub: "AI कायदेशीर आणि भावनिक आधार",
      rights: "तुमचे हक्क जाणून घ्या",
      rightsSub: "POSH कायदा, DV कायदा आणि अधिक",
      emergency: "आपत्कालीन मदत",
      emergencySub: "हेल्पलाइन आणि तातडीचा आधार",
      calm: "शांत मोड",
      calmSub: "श्वासोच्छ्वास विराम घ्या"
    },
    chat: {
      title: "न्यायसखी",
      subtitle: "AI कायदेशीर आधार",
      placeholder: "काय होत आहे ते सांगा...",
      send: "पाठवा",
      quickActions: ["छळवणूक", "कामाच्या ठिकाणी शोषण", "माझे हक्क जाणा", "रूममेट समस्या"],
      welcome: "नमस्कार! मी न्यायसखी, तुमची कायदेशीर सहायक आहे. काय होत आहे ते सांगा — सर्व काही गोपनीय राहील.",
      thinking: "विचार करत आहे...",
      clearChat: "चॅट साफ करा"
    },
    legal: {
      title: "तुमचे हक्क जाणून घ्या",
      subtitle: "तुमचे कायदेशीर संरक्षण, सोप्या भाषेत",
      posh: {
        title: "POSH कायदा 2013",
        fullName: "कामाच्या ठिकाणी महिलांचा लैंगिक छळ प्रतिबंध कायदा",
        description: "कार्यालय, रुग्णालय, शैक्षणिक संस्था यासह कोणत्याही कामाच्या ठिकाणी लैंगिक छळापासून संरक्षण.",
        steps: [
          "90 दिवसांत ICC ला तक्रार द्या",
          "ICC ने 60 दिवसांत चौकशी पूर्ण करावी",
          "ICC नसल्यास जिल्हा LCC कडे तक्रार करा",
          "कोणीही तुमच्याविरुद्ध सूड उगवू शकत नाही"
        ]
      },
      dv: {
        title: "कौटुंबिक हिंसाचार कायदा 2005",
        fullName: "कौटुंबिक हिंसाचारापासून महिलांचे संरक्षण कायदा",
        description: "शारीरिक, लैंगिक, मौखिक, भावनिक आणि आर्थिक अत्याचाराचा समावेश करतो.",
        steps: [
          "पोलीस ठाण्यात किंवा न्यायालयात संरक्षण अधिकाऱ्याकडे तक्रार नोंदवा",
          "संरक्षण आदेश किंवा निवास आदेश मिळवता येते",
          "सरकारने नियुक्त केलेल्या NGO शी संपर्क करा",
          "जिल्हा कायदेशीर सेवा प्राधिकरणाकडे मोफत सहाय्य"
        ]
      },
      ipc: {
        title: "IPC संरक्षण",
        fullName: "भारतीय दंड संहिता — महिलांसाठी महत्त्वाची कलमे",
        description: "IPC महिलांना विविध गुन्ह्यांपासून संरक्षण देण्यासाठी विशेष कलमे प्रदान करते.",
        steps: [
          "कलम 354: महिलेवर हल्ला किंवा गुन्हेगारी बळाचा वापर",
          "कलम 354A: कोणत्याही ठिकाणी लैंगिक छळ",
          "कलम 354D: पाठलाग करणे — ऑनलाइन पाठलागही गुन्हा",
          "कलम 498A: पती/नातेवाईकाची क्रूरता (हुंडा छळ)"
        ]
      }
    },
    emergency: {
      title: "आपत्कालीन मदत",
      subtitle: "तुम्ही एकटे नाही. मदत एका फोनकॉलवर आहे.",
      womenHelpline: "महिला हेल्पलाइन",
      police: "पोलीस",
      ncw: "राष्ट्रीय महिला आयोग",
      childline: "चाइल्डलाइन",
      callNow: "आत्ता कॉल करा",
      safeMessage: "तात्काळ धोक्यात असल्यास, लगेच 100 वर कॉल करा.",
      tip1: "शक्य असल्यास सुरक्षित ठिकाणी जा",
      tip2: "विश्वासू व्यक्तीला तुमचे ठिकाण सांगा",
      tip3: "सुरक्षित असल्यास पुरावे नोंदवा"
    },
    nav: { back: "मागे", home: "होम" }
  }
};

export const t = (lang, path) => {
  const keys = path.split('.');
  let obj = translations[lang] || translations['en'];
  for (const key of keys) {
    if (obj === undefined) return path;
    obj = obj[key];
  }
  return obj || path;
};

// Deep-merge extra translation keys (age, fakeCall, panic, nav additions) into each language
Object.keys(translations).forEach((code) => {
  const extras = extraTranslations[code] || extraTranslations.en;
  Object.keys(extras).forEach((section) => {
    translations[code][section] = { ...(translations[code][section] || {}), ...extras[section] };
  });
});
