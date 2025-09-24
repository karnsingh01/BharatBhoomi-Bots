# Translation dictionary: Key = English, Values = dict per language
TRANSLATIONS = {
    "en": {  # English
        "title": "Digital Krishi Officer",
        "location_label": "Your Location (e.g., Thiruvananthapuram):",
        "crop_label": "Main Crop (e.g., Banana):",
        "input_type": "Input Method:",
        "text": "Text",
        "voice": "Voice",
        "image": "Image",
        "query_label": "Your Query (in English):",
        "voice_transcript": "Voice Transcript (manual entry):",
        "upload_image": "Upload Crop Image:",
        "ask_button": "Ask for Answer",
        "response_label": "Answer:",
        "escalate_msg": "Complex Query: Escalating to Local Officer.",
        "feedback_label": "Was this answer helpful?",
        "yes": "Yes",
        "no": "No",
        "thanks": "Thanks! Your feedback will improve the system.",
        "system_prompt": "You are a Digital Agri Officer. Answer farmers' questions in English. Consider location and season."
    },
    "hi": {  # Hindi
        "title": "डिजिटल कृषि अधिकारी",
        "location_label": "आपका स्थान (उदा., तिरुवनंतपुरम):",
        "crop_label": "मुख्य फसल (उदा., केला):",
        "input_type": "इनपुट विधि:",
        "text": "पाठ",
        "voice": "आवाज",
        "image": "छवि",
        "query_label": "आपका प्रश्न (हिंदी में):",
        "voice_transcript": "आवाज ट्रांसक्रिप्ट (मैनुअल एंट्री):",
        "upload_image": "फसल छवि अपलोड करें:",
        "ask_button": "उत्तर पूछें",
        "response_label": "उत्तर:",
        "escalate_msg": "जटिल प्रश्न: स्थानीय अधिकारी को बढ़ा रहा है।",
        "feedback_label": "क्या यह उत्तर सहायक था?",
        "yes": "हाँ",
        "no": "नहीं",
        "thanks": "धन्यवाद! आपका फीडबैक सिस्टम को बेहतर बनाएगा।",
        "system_prompt": "आप एक डिजिटल कृषि अधिकारी हैं। किसानों के सवालों का हिंदी में जवाब दें। स्थान और मौसम को ध्यान में रखें।"
    },
    "ml": {  # Malayalam
        "title": "ഡിജിറ്റൽ കൃഷി ഓഫീസർ",
        "location_label": "നിങ്ങളുടെ സ്ഥലം (ഉദാ., തിരുവനന്തപുരം):",
        "crop_label": "പ്രധാന ക്രോപ്പ് (ഉദാ., വാഴ):",
        "input_type": "ഇൻപുട്ട് രീതി:",
        "text": "ടെക്സ്റ്റ്",
        "voice": "വോയ്സ്",
        "image": "ഇമേജ്",
        "query_label": "നിങ്ങളുടെ ചോദ്യം (മലയാളത്തിൽ):",
        "voice_transcript": "വോയ്സ് ട്രാൻസ്ക്രിപ്റ്റ് (മാനുവൽ എൻട്രി):",
        "upload_image": "ക്രോപ്പ് ഇമേജ് അപ്ലോഡ് ചെയ്യുക:",
        "ask_button": "ഉത്തരം ചോദിക്കുക",
        "response_label": "ഉത്തരം:",
        "escalate_msg": "സങ്കീർണ്ണമായ ചോദ്യം: ലോക്കൽ ഓഫീസറിലേക്ക് എസ്കലേറ്റ് ചെയ്യുന്നു।",
        "feedback_label": "ഈ ഉത്തരം സഹായകരമായിരുന്നോ?",
        "yes": "അതെ",
        "no": "ഇല്ല",
        "thanks": "നന്ദി! നിങ്ങളുടെ ഫീഡ്ബാക്ക് സിസ്റ്റം മെച്ചപ്പെടുത്താൻ സഹായിക്കും।",
        "system_prompt": "നിങ്ങൾ ഒരു ഡിജിറ്റൽ കൃഷി ഓഫീസറാണ്. കർഷകരുടെ ചോദ്യങ്ങൾക്ക് മലയാളത്തിൽ ഉത്തരം നൽകുക. സ്ഥലം, സീസൺ എന്നിവ കണക്കിലെടുക്കുക."
    },
    # Add more, e.g., "ta" for Tamil, "te" for Telugu
    "ta": {  # Tamil (sample)
        "title": "டிஜிட்டல் கிரிஷி அதிகாரி",
        "location_label": "உங்கள் இடம் (எ.கா., திருவனந்தபுரம்):",
        # ... Add full translations
        "system_prompt": "நீங்கள் ஒரு டிஜிட்டல் விவசாய அதிகாரி. விவசாயிகளின் கேள்விகளுக்கு தமிழில் பதில் கொடுங்கள்."
    },
    "te": {  # Telugu (sample)
        "title": "డిజిటల్ కృషి అధికారి",
        "location_label": "మీ స్థలం (ఉదా., తిరువనంతపురం):",
        # ... Add full translations
        "system_prompt": "మీరు ఒక డిజిటల్ కృషి అధికారి. రైతుల ప్రశ్నలకు తెలుగులో సమాధానం ఇవ్వండి."
    }
}

def get_translation(lang_code, key):
    return TRANSLATIONS.get(lang_code, TRANSLATIONS["en"]).get(key, key)  # Fallback to English/key