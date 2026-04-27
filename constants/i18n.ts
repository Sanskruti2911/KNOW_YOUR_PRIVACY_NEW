export type Lang = 'en' | 'hi';

export const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    appName: 'Kavach – Privacy Debt Visualiser',
    language: 'Language',
    english: 'English',
    hindi: 'Hindi',

    // Auth / login
    auth_title: 'Login or create account',
    auth_email_placeholder: 'Email',
    auth_password_placeholder: 'Password',
    auth_button_create: 'Create account',
    auth_button_login: 'Login',
    auth_button_guest: 'Continue as guest',
    auth_loading: 'Please wait…',
    auth_error_missing_fields: 'Enter email and password.',
    auth_error_invalid_email: 'Invalid email address.',
    auth_error_weak_password: 'Password is too weak.',
    auth_error_email_in_use: 'Account already exists. Use Login instead.',
    auth_error_user_not_found: 'No account found. Use Create account.',
    auth_error_wrong_password: 'Incorrect password.',
    auth_error_generic_login: 'Login failed. Please try again.',
    auth_error_generic_signup: 'Sign up failed. Please try again.',

    home_title: 'Understand Your Privacy Debt!',
    home_subtitle:
      'A simple way to see how much of your digital life is exposed and how to fix it.',
    home_whatIs_title: 'What is privacy debt?',
    home_whatIs_body:
      'Privacy debt builds up every time apps, websites and services collect more data than needed, or when you keep old permissions and accounts open.',
    home_why_title: 'Why it matters?',
    home_why_body:
      'High privacy debt increases chances of data leaks, fraud, digital arrest situations and misuse of your identity.',
    home_facts_title: 'Real‑life facts',
    home_fact1:
      'India reported millions of data records exposed in breaches over the last few years.',
    home_fact2:
      'Most users accept permissions without reading, giving apps access to contacts, location and files.',
    home_prevent_title: 'How Kavach helps?',
    home_prevent_body:
      'Kavach shows your privacy debt score, visualises data exposure and guides you step‑by‑step to reduce risk.',
    home_cta_assess: 'Take your free assessment',
    home_cta_download: 'Download Android app (free scan)',

    news_title: 'Privacy & Cyber News',
    news_subtitle: 'Latest reports about data leaks, frauds and privacy violations.',
    news_empty: 'No stories available right now. Please check again in some time.',
    news_source: 'Source',

    assessment_title: 'Privacy Debt Assessment',
    assessment_subtitle:
      'Answer a few questions about how you use your phone and online accounts.',
    assessment_start: 'Start assessment',
    assessment_submit: 'Calculate my score',
    assessment_reset: 'Reset answers',

    q_device_lock: 'Do you use a screen lock (PIN, pattern, fingerprint, Face ID)?',
    q_device_lock_opt1: 'Always, on all devices',
    q_device_lock_opt2: 'On main phone only',
    q_device_lock_opt3: 'No, or very weak',
    q_public_wifi: 'How often do you use public / open Wi‑Fi for banking or payments?',
    q_public_wifi_opt1: 'Never',
    q_public_wifi_opt2: 'Sometimes',
    q_public_wifi_opt3: 'Frequently',
    q_permissions:
      'When installing apps, what do you usually do with permission requests?',
    q_permissions_opt1: 'Review carefully and deny what is not needed',
    q_permissions_opt2: 'Allow most, deny a few',
    q_permissions_opt3: 'Allow everything quickly to continue',
    q_social_sharing:
      'How much personal information do you share publicly on social media?',
    q_social_sharing_opt1: 'Very limited, mostly private',
    q_social_sharing_opt2: 'Moderate, some posts public',
    q_social_sharing_opt3: 'A lot, most posts public',
    q_passwords:
      'How do you manage passwords for important accounts (email, banking, UPI)?',
    q_passwords_opt1: 'Unique passwords + password manager / notes offline',
    q_passwords_opt2: 'Some reuse, some unique',
    q_passwords_opt3: 'Same or similar password everywhere',
    q_2fa: 'Do you use two‑factor authentication (OTP / Authenticator app)?',
    q_2fa_opt1: 'Yes, on almost all important accounts',
    q_2fa_opt2: 'On a few accounts only',
    q_2fa_opt3: 'No',
    q_social_apps: 'How many social apps do you use daily?',
    q_social_apps_opt1: '0 (None)',
    q_social_apps_opt2: '1',
    q_social_apps_opt3: '2+',

    q_password_manager: 'Do you use password manager or save passwords in browser?',
    q_password_manager_opt1: 'No, I remember them',
    q_password_manager_opt2: 'Browser saved passwords only',
    q_password_manager_opt3: 'Yes, password manager',

    q_browsing_history: 'Do you allow apps to read your browsing history?',
    q_browsing_history_opt1: 'Never, I deny this permission',
    q_browsing_history_opt2: 'Only trusted apps',
    q_browsing_history_opt3: 'Yes, several apps have access',

    score_title: 'Your Privacy Debt Score',
    score_again: 'Re‑take assessment',
    score_overall: 'Overall score',
    score_risk_low: 'Low risk',
    score_risk_med: 'Moderate risk',
    score_risk_high: 'High risk',
    score_exposure_title: 'Data exposure overview',
    score_exposure_apps: 'Apps and permissions',
    score_exposure_social: 'Social media sharing',
    score_exposure_auth: 'Passwords & login security',
    score_actions_title: 'Recommended next steps',
    score_action1:
      'Review app permissions and uninstall apps you do not use at least once a month.',
    score_action2:
      'Enable two‑factor authentication on email, banking, UPI and social accounts.',
    score_action3:
      'Avoid logging in to sensitive apps on public Wi‑Fi. Prefer mobile data or VPN.',
    score_action4:
      'Use unique, long passwords or a password manager for critical accounts.',

    score_app_banner_title: 'Get deeper insights on the app',
    score_app_banner_body:
      'The Kavach mobile app runs one free scan of your device, checking what apps you use and what data they access without storing personal data.',
    score_app_banner_cta: 'Download the app (Android)',

    app_feature_scan_title: 'One free privacy scan',
    app_feature_scan_body:
      'The app reads installed apps and their permissions once, without collecting personal content like photos, messages or contacts.',
    app_feature_report_title: 'Detailed app‑wise report',
    app_feature_report_body:
      'See which apps access camera, microphone, location, files and how often.',
    app_feature_alerts_title: 'Privacy alerts & weekly score',
    app_feature_alerts_body:
      'Get weekly breakdowns, trend of your privacy debt score and alerts for risky changes.',
    app_feature_fraud_title: 'Fraud link detection',
    app_feature_fraud_body:
      'Scan suspicious URLs or messages and get a simple fraud risk indicator.',

    fraudCheck_title: 'Fraud link checker',
    fraudCheck_placeholder: 'Paste a link or message here…',
    fraudCheck_button: 'Check link',
    fraudCheck_safe: 'Looks safe based on basic checks. Still stay alert.',
    fraudCheck_risky: 'This looks risky. Avoid clicking or sharing.',
    carbon_low: 'Low carbon impact',
    carbon_medium: 'Medium carbon impact',
    carbon_high: 'High carbon impact',
    carbon_footprint_title: 'Carbon footprint (estimate)',
    carbon_footprint_label: 'Carbon impact',
    carbon_action: 'Improve privacy to reduce your digital carbon footprint',
    more_title: 'More',
    more_about: 'About Us',
    more_about_body1:
      "Kavach is India's first Privacy Debt Visualizer that helps you understand and reduce your digital privacy risks.",
    more_about_body2:
      'Our mission: Make privacy simple, visual, and actionable for every Indian smartphone user.',
    more_about_body3: 'We believe privacy is a fundamental right, not a luxury.',
    more_about_body4: 'No data collection. No tracking. Just honest privacy insights.',
    more_support_title: 'Need Help?',
    more_support_email: 'kavachsupport@gmail.com',
    more_support_body: 'Have questions or feedback? Email us anytime.',
    more_support_action: 'Contact Support',
    more_privacy: 'Privacy Policy',
    more_terms: 'Terms of Service',
  },

  hi: {
    appName: 'कवच – प्राइवेसी डेब्ट विज़ुअलाइज़र',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिन्दी',

    // Auth / login
    auth_title: 'लॉगिन या नया अकाउंट बनाएँ',
    auth_email_placeholder: 'ई‑मेल',
    auth_password_placeholder: 'पासवर्ड',
    auth_button_create: 'अकाउंट बनाएँ',
    auth_button_login: 'लॉगिन',
    auth_button_guest: 'गेस्ट के रूप में जारी रखें',
    auth_loading: 'कृपया इंतज़ार करें…',
    auth_error_missing_fields: 'ई‑मेल और पासवर्ड भरें।',
    auth_error_invalid_email: 'ई‑मेल पता सही नहीं है।',
    auth_error_weak_password: 'पासवर्ड बहुत कमजोर है।',
    auth_error_email_in_use: 'यह ई‑मेल पहले से रजिस्टर है, लॉगिन करें।',
    auth_error_user_not_found: 'इस ई‑मेल से कोई अकाउंट नहीं मिला, पहले अकाउंट बनाएँ।',
    auth_error_wrong_password: 'गलत पासवर्ड।',
    auth_error_generic_login: 'लॉगिन नहीं हो पाया, दोबारा कोशिश करें।',
    auth_error_generic_signup: 'साइन‑अप नहीं हो पाया, दोबारा कोशिश करें।',

    home_title: 'अपना प्राइवेसी डेब्ट समझें',
    home_subtitle:
      'आपकी डिजिटल ज़िंदगी कितना एक्सपोज़्ड है, इसे आसान ग्राफ़ और स्कोर में देखें।',
    home_whatIs_title: 'प्राइवेसी डेब्ट क्या है?',
    home_whatIs_body:
      'जब ऐप्स और वेबसाइटें ज़रूरत से ज़्यादा डेटा लेती हैं या आप पुरानी परमिशन व अकाउंट बंद नहीं करते, तो समय के साथ प्राइवेसी डेब्ट बढ़ता जाता है।',
    home_why_title: 'यह क्यों ज़रूरी है',
    home_why_body:
      'ज़्यादा प्राइवेसी डेब्ट का मतलब है डेटा लीक, धोखाधड़ी, डिजिटल गिरफ्तारी जैसी घटनाओं का ज़्यादा खतरा।',
    home_facts_title: 'रियल‑लाइफ़ तथ्य',
    home_fact1:
      'पिछले कुछ साल में भारत में लाखों यूज़र्स का डेटा अलग‑अलग ब्रीच में लीक हुआ है।',
    home_fact2:
      'ज़्यादातर यूज़र्स परमिशन पढ़े बिना ही Allow कर देते हैं, जिससे ऐप्स को कॉन्टैक्ट, लोकेशन और फ़ाइलों तक पहुंच मिल जाती है।',
    home_prevent_title: 'कवच आपकी कैसे मदद करता है',
    home_prevent_body:
      'कवच आपका प्राइवेसी डेब्ट स्कोर दिखाता है, डेटा एक्सपोज़र का ग्राफ़ बनाता है और स्टेप‑बाय‑स्टेप गाइड देता है।',
    home_cta_assess: 'फ्री असेसमेंट शुरू करें',
    home_cta_download: 'एंड्रॉइड ऐप डाउनलोड करें (फ्री स्कैन)',

    news_title: 'प्राइवेसी व साइबर न्यूज़',
    news_subtitle: 'डेटा लीक, धोखाधड़ी और प्राइवेसी उल्लंघन की ताज़ा ख़बरें।',
    news_empty: 'अभी कोई स्टोरी उपलब्ध नहीं है। कृपया कुछ देर बाद देखें।',
    news_source: 'स्रोत',

    assessment_title: 'प्राइवेसी डेब्ट असेसमेंट',
    assessment_subtitle:
      'अपने फोन और ऑनलाइन इस्तेमाल के बारे में कुछ सवालों के जवाब दें।',
    assessment_start: 'असेसमेंट शुरू करें',
    assessment_submit: 'मेरा स्कोर निकालें',
    assessment_reset: 'जवाब रीसेट करें',

    q_device_lock:
      'क्या आप स्क्रीन लॉक (PIN, पैटर्न, फिंगरप्रिंट, Face ID) का उपयोग करते हैं?',
    q_device_lock_opt1: 'हाँ, सभी डिवाइस पर',
    q_device_lock_opt2: 'केवल मुख्य फोन पर',
    q_device_lock_opt3: 'नहीं, या बहुत कमजोर',
    q_public_wifi:
      'बैंकिंग या पेमेंट के लिए आप पब्लिक / ओपन वाई‑फाई कितनी बार उपयोग करते हैं?',
    q_public_wifi_opt1: 'कभी नहीं',
    q_public_wifi_opt2: 'कभी‑कभी',
    q_public_wifi_opt3: 'अक्सर',
    q_permissions:
      'ऐप इंस्टॉल करते समय आप आमतौर पर परमिशन रिक्वेस्ट के साथ क्या करते हैं?',
    q_permissions_opt1: 'ध्यान से पढ़कर केवल ज़रूरी परमिशन Allow',
    q_permissions_opt2: 'ज़्यादातर Allow, कुछ Deny',
    q_permissions_opt3: 'सब Allow ताकि जल्दी आगे बढ़ सकें',
    q_social_sharing:
      'सोशल मीडिया पर आप कितना पर्सनल जानकारी पब्लिकली शेयर करते हैं?',
    q_social_sharing_opt1: 'बहुत कम, ज़्यादातर प्राइवेट',
    q_social_sharing_opt2: 'मध्यम, कुछ पोस्ट पब्लिक',
    q_social_sharing_opt3: 'बहुत ज़्यादा, ज़्यादातर पोस्ट पब्लिक',
    q_passwords:
      'महत्त्वपूर्ण अकाउंट (ई‑मेल, बैंक, UPI) के पासवर्ड आप कैसे मैनेज करते हैं?',
    q_passwords_opt1: 'हर अकाउंट के लिए अलग पासवर्ड / पासवर्ड मैनेजर',
    q_passwords_opt2: 'कुछ जगह री‑यूज़, कुछ यूनिक',
    q_passwords_opt3: 'लगभग हर जगह एक जैसा पासवर्ड',
    q_2fa:
      'क्या आप टू‑फैक्टर ऑथेंटिकेशन (OTP / Authenticator ऐप) का उपयोग करते हैं?',
    q_2fa_opt1: 'हाँ, लगभग सभी ज़रूरी अकाउंट पर',
    q_2fa_opt2: 'कुछ अकाउंट पर ही',
    q_2fa_opt3: 'नहीं',
    q_social_apps: 'आप प्रतिदिन कितने सोशल ऐप्स का उपयोग करते हैं?',
    q_social_apps_opt1: '० (कोई नहीं)',
    q_social_apps_opt2: '१',
    q_social_apps_opt3: '२+',

    q_password_manager:
      'क्या आप पासवर्ड मैनेजर उपयोग करते हैं या ब्राउज़र में पासवर्ड सेव करते हैं?',
    q_password_manager_opt1: 'नहीं, याद रखता हूँ',
    q_password_manager_opt2: 'केवल ब्राउज़र में सेव पासवर्ड',
    q_password_manager_opt3: 'हाँ, पासवर्ड मैनेजर',

    q_browsing_history:
      'क्या आप ऐप्स को अपना ब्राउज़िंग हिस्ट्री पढ़ने की अनुमति देते हैं?',
    q_browsing_history_opt1: 'नहीं, कभी अनुमति नहीं देता',
    q_browsing_history_opt2: 'केवल भरोसेमंद ऐप्स को',
    q_browsing_history_opt3: 'हाँ, कई ऐप्स को अनुमति है',

    score_title: 'आपका प्राइवेसी डेब्ट स्कोर',
    score_again: 'असेसमेंट दोबारा करें',
    score_overall: 'कुल स्कोर',
    score_risk_low: 'कम खतरा',
    score_risk_med: 'मध्यम खतरा',
    score_risk_high: 'ज़्यादा खतरा',
    score_exposure_title: 'डेटा एक्सपोज़र ओवरव्यू',
    score_exposure_apps: 'ऐप्स व परमिशन',
    score_exposure_social: 'सोशल मीडिया शेयरिंग',
    score_exposure_auth: 'पासवर्ड व लॉगिन सुरक्षा',
    score_actions_title: 'अगले कदम (रिकमेंडेशन)',
    score_action1:
      'ऐप परमिशन की समीक्षा करें और जो ऐप महीने भर से इस्तेमाल नहीं हुए, उन्हें हटा दें।',
    score_action2:
      'ई‑मेल, बैंकिंग, UPI और सोशल अकाउंट पर टू‑फैक्टर ऑथेंटिकेशन चालू करें।',
    score_action3:
      'पब्लिक वाई‑फाई पर संवेदनशील लॉगिन से बचें। बेहतर है मोबाइल डेटा या VPN का उपयोग।',
    score_action4:
      'महत्त्वपूर्ण अकाउंट्स के लिए यूनिक और लंबा पासवर्ड रखें या पासवर्ड मैनेजर उपयोग करें।',

    score_app_banner_title: 'ऐप में और गहराई से विश्लेषण',
    score_app_banner_body:
      'कवच मोबाइल ऐप आपके डिवाइस को एक बार फ्री स्कैन करता है, यह केवल ऐप्स और उनकी परमिशन पढ़ता है, कोई निजी कंटेंट स्टोर नहीं करता।',
    score_app_banner_cta: 'ऐंड्रॉइड ऐप डाउनलोड करें',

    app_feature_scan_title: 'एक फ्री प्राइवेसी स्कैन',
    app_feature_scan_body:
      'ऐप इंस्टॉल किए गए ऐप्स और उनकी परमिशन को सिर्फ पढ़ता है, फ़ोटो, मैसेज या कॉन्टैक्ट जैसे निजी डेटा को नहीं।',
    app_feature_report_title: 'डिटेल्ड ऐप‑वाइज रिपोर्ट',
    app_feature_report_body:
      'देखें कौन‑सा ऐप कैमरा, माइक, लोकेशन, फ़ाइलों आदि तक पहुंच रखता है और कितनी बार।',
    app_feature_alerts_title: 'प्राइवेसी अलर्ट व साप्ताहिक स्कोर',
    app_feature_alerts_body:
      'हर हफ्ते आपका प्राइवेसी डेब्ट स्कोर और उसका ट्रेंड दिखाता है व जोखिम वाले बदलाव पर अलर्ट देता है।',
    app_feature_fraud_title: 'फ्रॉड लिंक डिटेक्शन',
    app_feature_fraud_body:
      'सस्पीशस URL या मैसेज को स्कैन करके सिंपल फ्रॉड रिस्क इंडिकेटर देता है।',

    fraudCheck_title: 'फ्रॉड लिंक चेकर',
    fraudCheck_placeholder: 'कोई लिंक या मैसेज यहाँ पेस्ट करें…',
    fraudCheck_button: 'लिंक चेक करें',
    fraudCheck_safe:
      'बेसिक चेक के आधार पर यह ठीक लगता है, फिर भी सावधान रहें।',
    fraudCheck_risky:
      'यह लिंक रिस्की दिख रहा है। इसे खोलने या शेयर करने से बचें।',
    carbon_low: 'कम कार्बन प्रभाव',
    carbon_medium: 'मध्यम कार्बन प्रभाव',
    carbon_high: 'ज़्यादा कार्बन प्रभाव',
    carbon_footprint_title: 'कार्बन फुटप्रिंट (अनुमान)',
    carbon_footprint_label: 'कार्बन प्रभाव',
    carbon_action: 'अपनी प्राइवेसी सुधारकर डिजिटल कार्बन फुटप्रिंट घटाएँ',
    more_title: 'और जानकारी',
    more_about: 'हमारे बारे में',
    more_about_body1:
      'कवच भारत का पहला प्राइवेसी डेब्ट विज़ुअलाइज़र है जो आपके डिजिटल प्राइवेसी जोखिमों को समझने और कम करने में मदद करता है।',
    more_about_body2:
      'हमारा मिशन: हर भारतीय स्मार्टफोन यूज़र के लिए प्राइवेसी को सरल, दृश्यात्मक और व्यावहारिक बनाना।',
    more_about_body3:
      'हमारा मानना है कि प्राइवेसी एक मौलिक अधिकार है, विलासिता नहीं।',
    more_about_body4:
      'कोई डेटा संग्रह नहीं। कोई ट्रैकिंग नहीं। केवल ईमानदार प्राइवेसी अंतर्दृष्टि।',
    more_support_title: 'मदद चाहिए?',
    more_support_email: 'kavachsupport@gmail.com',
    more_support_body: 'कोई सवाल या सुझाव? कभी भी ईमेल करें।',
    more_support_action: 'सपोर्ट से संपर्क करें',
    more_privacy: 'प्राइवेसी पॉलिसी',
    more_terms: 'सेवा की शर्तें',
  },
};

export function t(lang: Lang, key: string): string {
  return STRINGS[lang][key] ?? STRINGS['en'][key] ?? key;
}
