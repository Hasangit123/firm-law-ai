'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import LanguageToggle from '../components/LanguageToggle';
import { stripMarkdown, printMarkdown } from '../utils/markdownUtils';

const rightsCategories = {
  english: [
    { id: 'consumer', icon: '🛒', title: 'Consumer Rights', law: 'Consumer Protection Act, 2019', rights: ['Right to Safety — Protection from hazardous goods and services', 'Right to Information — Know the quality, quantity, price of goods', 'Right to Choose — Access to variety of goods at competitive prices', 'Right to be Heard — Your grievance must be heard by seller/court', 'Right to Redressal — File complaint in Consumer Forum for defective goods', 'Right to Consumer Education — Awareness about consumer rights'] },
    { id: 'tenant', icon: '🏠', title: 'Tenant Rights', law: 'Transfer of Property Act, 1882 & State Rent Control Acts', rights: ['Right to peaceful enjoyment of rented property', 'Landlord cannot evict without proper notice (usually 15-30 days)', 'Right to receipt for every rent payment', 'Landlord cannot cut electricity/water to force eviction', 'Security deposit must be returned within reasonable time after vacating', 'Right to get rent agreement in writing'] },
    { id: 'employee', icon: '👷', title: 'Employee & Worker Rights', law: 'Labour Laws — Factories Act, Payment of Wages Act, etc.', rights: ['Right to minimum wages as fixed by State Government', 'Right to 8 hours work per day, overtime pay for extra hours', 'Right to weekly holiday (at least one day off per week)', 'Right to paid leave — casual, sick, and earned leave', 'Right to provident fund (PF) and ESI benefits', 'Protection from wrongful termination without notice or compensation'] },
    { id: 'women', icon: '👩', title: "Women's Rights", law: 'Protection of Women from Domestic Violence Act, POSH Act, IPC', rights: ['Right to file complaint for domestic violence — PWDVA 2005', 'Right to protection from sexual harassment at workplace — POSH Act 2013', 'Equal pay for equal work as male counterparts', 'Right to free legal aid in cases of rape and sexual assault', 'Maternity benefit of 26 weeks paid leave — Maternity Benefit Act', 'Right to maintenance from husband after separation — Section 125 CrPC'] },
    { id: 'arrested', icon: '👮', title: 'Rights When Arrested', law: 'Code of Criminal Procedure, 1973 & Article 22 Constitution', rights: ['Right to know the reason for arrest — Article 22(1)', 'Right to consult a lawyer of your choice immediately', 'Right to be produced before Magistrate within 24 hours of arrest', 'Right to bail in bailable offences — cannot be denied', 'Right to free legal aid if you cannot afford a lawyer', 'Police cannot torture or use third degree methods — punishable under IPC'] },
    { id: 'patient', icon: '🏥', title: 'Patient Rights', law: 'Consumer Protection Act & Medical Council of India Guidelines', rights: ['Right to emergency treatment — no hospital can refuse', 'Right to know your diagnosis, treatment, and prognosis', 'Right to give informed consent before any surgery or procedure', 'Right to see and get copies of your medical records', 'Right to file complaint against doctor for negligence in Consumer Forum', 'Right to second medical opinion from another doctor'] },
    { id: 'student', icon: '🧑‍🎓', title: 'Student Rights', law: 'Right to Education Act, 2009 & UGC Regulations', rights: ['Right to free and compulsory education up to age 14 — RTE Act 2009', 'University cannot withhold degree/marksheet for pending fees', 'Right to revaluation of answer sheets in most universities', 'Anti-ragging protection — complaint to UGC/university mandatory action', 'Right to get refund of fees if admission cancelled within time', 'Right to grievance redressal committee in every institution'] },
    { id: 'rti', icon: '📋', title: 'Right to Information', law: 'Right to Information Act, 2005', rights: ['Any citizen can ask information from any government department', 'Government must reply within 30 days of application', 'Fee is only ₹10 for filing RTI application', 'If denied, appeal to First Appellate Authority within 30 days', 'Second appeal to Central/State Information Commission', 'Public Information Officer can be penalised for non-compliance'] },
  ],
  hindi: [
    { id: 'consumer', icon: '🛒', title: 'उपभोक्ता अधिकार', law: 'उपभोक्ता संरक्षण अधिनियम, 2019', rights: ['सुरक्षा का अधिकार — हानिकारक वस्तुओं से सुरक्षा', 'जानकारी का अधिकार — वस्तु की गुणवत्ता, मात्रा, कीमत जानें', 'चुनाव का अधिकार — प्रतिस्पर्धी कीमतों पर विभिन्न वस्तुएं', 'सुने जाने का अधिकार — आपकी शिकायत सुनी जानी चाहिए', 'निवारण का अधिकार — उपभोक्ता फोरम में शिकायत दर्ज करें', 'उपभोक्ता शिक्षा का अधिकार — अधिकारों के बारे में जागरूकता'] },
    { id: 'tenant', icon: '🏠', title: 'किरायेदार अधिकार', law: 'संपत्ति हस्तांतरण अधिनियम, 1882 और राज्य किराया नियंत्रण अधिनियम', rights: ['किराए की संपत्ति का शांतिपूर्ण उपयोग करने का अधिकार', 'मकान मालिक उचित नोटिस के बिना नहीं निकाल सकता (15-30 दिन)', 'हर किराया भुगतान की रसीद पाने का अधिकार', 'मकान मालिक बिजली/पानी नहीं काट सकता', 'खाली करने के बाद सुरक्षा राशि वापस मिलनी चाहिए', 'लिखित किराया समझौता पाने का अधिकार'] },
    { id: 'employee', icon: '👷', title: 'कर्मचारी और श्रमिक अधिकार', law: 'श्रम कानून — कारखाना अधिनियम, मजदूरी भुगतान अधिनियम आदि', rights: ['राज्य सरकार द्वारा निर्धारित न्यूनतम वेतन का अधिकार', 'प्रतिदिन 8 घंटे काम, अतिरिक्त घंटों का ओवरटाइम भुगतान', 'साप्ताहिक छुट्टी का अधिकार (कम से कम एक दिन)', 'सवैतनिक अवकाश का अधिकार — आकस्मिक, बीमारी और अर्जित', 'भविष्य निधि (PF) और ESI लाभ का अधिकार', 'बिना नोटिस या मुआवजे के गलत बर्खास्तगी से सुरक्षा'] },
    { id: 'women', icon: '👩', title: 'महिलाओं के अधिकार', law: 'घरेलू हिंसा से महिला संरक्षण अधिनियम, POSH अधिनियम, IPC', rights: ['घरेलू हिंसा के लिए शिकायत दर्ज करने का अधिकार — PWDVA 2005', 'कार्यस्थल पर यौन उत्पीड़न से सुरक्षा — POSH अधिनियम 2013', 'पुरुष समकक्षों के समान काम के लिए समान वेतन', 'बलात्कार और यौन उत्पीड़न में मुफ्त कानूनी सहायता', 'मातृत्व लाभ — 26 सप्ताह का सवैतनिक अवकाश', 'अलगाव के बाद पति से भरण-पोषण का अधिकार — धारा 125 CrPC'] },
    { id: 'arrested', icon: '👮', title: 'गिरफ्तारी पर अधिकार', law: 'दंड प्रक्रिया संहिता, 1973 और अनुच्छेद 22 संविधान', rights: ['गिरफ्तारी का कारण जानने का अधिकार — अनुच्छेद 22(1)', 'तुरंत अपनी पसंद के वकील से परामर्श का अधिकार', '24 घंटे के भीतर मजिस्ट्रेट के सामने पेश होने का अधिकार', 'जमानती अपराधों में जमानत का अधिकार — मना नहीं किया जा सकता', 'वकील न कर सकने पर मुफ्त कानूनी सहायता का अधिकार', 'पुलिस拷问 या तीसरी डिग्री नहीं कर सकती — IPC के तहत दंडनीय'] },
    { id: 'patient', icon: '🏥', title: 'मरीज के अधिकार', law: 'उपभोक्ता संरक्षण अधिनियम और भारतीय चिकित्सा परिषद दिशानिर्देश', rights: ['आपातकालीन उपचार का अधिकार — कोई भी अस्पताल मना नहीं कर सकता', 'अपने निदान, उपचार और पूर्वानुमान जानने का अधिकार', 'किसी भी सर्जरी से पहले सूचित सहमति देने का अधिकार', 'अपने चिकित्सा रिकॉर्ड देखने और प्रतियां पाने का अधिकार', 'लापरवाही के लिए उपभोक्ता फोरम में डॉक्टर के खिलाफ शिकायत', 'दूसरे डॉक्टर से दूसरी राय लेने का अधिकार'] },
    { id: 'student', icon: '🧑‍🎓', title: 'छात्र अधिकार', law: 'शिक्षा का अधिकार अधिनियम, 2009 और UGC विनियम', rights: ['14 वर्ष तक मुफ्त और अनिवार्य शिक्षा का अधिकार — RTE 2009', 'विश्वविद्यालय बकाया फीस के लिए डिग्री/मार्कशीट नहीं रोक सकता', 'अधिकांश विश्वविद्यालयों में उत्तर पुस्तिका के पुनर्मूल्यांकन का अधिकार', 'रैगिंग विरोधी सुरक्षा — UGC/विश्वविद्यालय में अनिवार्य कार्रवाई', 'समय पर प्रवेश रद्द होने पर फीस वापसी का अधिकार', 'हर संस्थान में शिकायत निवारण समिति का अधिकार'] },
    { id: 'rti', icon: '📋', title: 'सूचना का अधिकार', law: 'सूचना का अधिकार अधिनियम, 2005', rights: ['कोई भी नागरिक किसी भी सरकारी विभाग से जानकारी मांग सकता है', 'सरकार को आवेदन के 30 दिनों के भीतर जवाब देना होगा', 'RTI आवेदन दाखिल करने की फीस केवल ₹10 है', 'इनकार पर 30 दिनों के भीतर प्रथम अपीलीय प्राधिकरण में अपील', 'केंद्रीय/राज्य सूचना आयोग में दूसरी अपील', 'जन सूचना अधिकारी अनुपालन न करने पर दंडनीय है'] },
  ],
  telugu: [
    { id: 'consumer', icon: '🛒', title: 'వినియోగదారు హక్కులు', law: 'వినియోగదారు రక్షణ చట్టం, 2019', rights: ['భద్రత హక్కు — హానికరమైన వస్తువుల నుండి రక్షణ', 'సమాచార హక్కు — వస్తువు నాణ్యత, పరిమాణం, ధర తెలుసుకోండి', 'ఎంపిక హక్కు — పోటీ ధరలకు వివిధ వస్తువులు', 'వినబడే హక్కు — మీ ఫిర్యాదు వినాలి', 'పరిష్కార హక్కు — వినియోగదారు ఫోరమ్‌లో ఫిర్యాదు చేయండి', 'వినియోగదారు విద్య హక్కు — హక్కులపై అవగాహన'] },
    { id: 'tenant', icon: '🏠', title: 'అద్దెదారు హక్కులు', law: 'ఆస్తి బదిలీ చట్టం, 1882 మరియు రాష్ట్ర అద్దె నియంత్రణ చట్టాలు', rights: ['అద్దె ఆస్తిని శాంతియుతంగా అనుభవించే హక్కు', 'సరైన నోటీసు లేకుండా ఇంటి యజమాని ఖాళీ చేయించలేడు (15-30 రోజులు)', 'ప్రతి అద్దె చెల్లింపుకు రసీదు పొందే హక్కు', 'ఇంటి యజమాని విద్యుత్/నీరు కట్ చేయలేడు', 'ఖాళీ చేసిన తర్వాత సెక్యూరిటీ డిపాజిట్ తిరిగి ఇవ్వాలి', 'లిఖిత అద్దె ఒప్పందం పొందే హక్కు'] },
    { id: 'employee', icon: '👷', title: 'ఉద్యోగి మరియు కార్మిక హక్కులు', law: 'కార్మిక చట్టాలు — కర్మాగారాల చట్టం, వేతన చెల్లింపు చట్టం మొదలైనవి', rights: ['రాష్ట్ర ప్రభుత్వం నిర్ణయించిన కనీస వేతన హక్కు', 'రోజుకు 8 గంటలు పని, అదనపు గంటలకు ఓవర్‌టైమ్ చెల్లింపు', 'వారపు సెలవు హక్కు (కనీసం ఒక రోజు)', 'చెల్లింపు సెలవు హక్కు — సాధారణ, అనారోగ్య మరియు సంపాదించిన', 'భవిష్య నిధి (PF) మరియు ESI ప్రయోజనాల హక్కు', 'నోటీసు లేదా పరిహారం లేకుండా తప్పుడు తొలగింపు నుండి రక్షణ'] },
    { id: 'women', icon: '👩', title: 'మహిళల హక్కులు', law: 'గృహ హింస నుండి మహిళల రక్షణ చట్టం, POSH చట్టం, IPC', rights: ['గృహ హింసకు ఫిర్యాదు చేసే హక్కు — PWDVA 2005', 'కార్యాలయంలో లైంగిక వేధింపుల నుండి రక్షణ — POSH చట్టం 2013', 'పురుష సహచరులతో సమాన పని కోసం సమాన వేతనం', 'అత్యాచారం మరియు లైంగిక దాడిలో ఉచిత న్యాయ సహాయం', 'మాతృత్వ ప్రయోజనం — 26 వారాల వేతన సెలవు', 'విడిపోయిన తర్వాత భర్త నుండి భరణపోషణ హక్కు — సెక్షన్ 125 CrPC'] },
    { id: 'arrested', icon: '👮', title: 'అరెస్టు అయినప్పుడు హక్కులు', law: 'నేర విధాన నియమావళి, 1973 మరియు ఆర్టికల్ 22 రాజ్యాంగం', rights: ['అరెస్టు కారణం తెలుసుకునే హక్కు — ఆర్టికల్ 22(1)', 'వెంటనే మీ న్యాయవాదిని సంప్రదించే హక్కు', '24 గంటల్లోపు మేజిస్ట్రేట్ ముందు హాజరుపరచాలి', 'బెయిలబుల్ నేరాలలో బెయిల్ హక్కు — తిరస్కరించలేరు', 'న్యాయవాది పెట్టుకోలేకపోతే ఉచిత న్యాయ సహాయం హక్కు', 'పోలీసులు చిత్రహింసలు పెట్టలేరు — IPC కింద శిక్షార్హం'] },
    { id: 'patient', icon: '🏥', title: 'రోగి హక్కులు', law: 'వినియోగదారు రక్షణ చట్టం మరియు భారత వైద్య మండలి మార్గదర్శకాలు', rights: ['అత్యవసర చికిత్స హక్కు — ఏ ఆసుపత్రీ నిరాకరించలేదు', 'మీ రోగనిర్ధారణ, చికిత్స తెలుసుకునే హక్కు', 'ఏ శస్త్రచికిత్సకు ముందైనా సమ్మతి ఇచ్చే హక్కు', 'మీ వైద్య రికార్డులు చూసే మరియు కాపీలు పొందే హక్కు', 'నిర్లక్ష్యానికి వినియోగదారు ఫోరమ్‌లో డాక్టర్‌పై ఫిర్యాదు', 'మరో డాక్టర్ నుండి రెండో అభిప్రాయం పొందే హక్కు'] },
    { id: 'student', icon: '🧑‍🎓', title: 'విద్యార్థి హక్కులు', law: 'విద్యా హక్కు చట్టం, 2009 మరియు UGC నిబంధనలు', rights: ['14 సంవత్సరాల వరకు ఉచిత మరియు నిర్బంధ విద్య హక్కు — RTE 2009', 'పెండింగ్ ఫీజులకు విశ్వవిద్యాలయం డిగ్రీ/మార్క్‌షీట్ నిలిపివేయలేదు', 'చాలా విశ్వవిద్యాలయాలలో సమాధాన పత్రాల పునర్మూల్యాంకన హక్కు', 'యాంటీ-రాగింగ్ రక్షణ — UGC/విశ్వవిద్యాలయంలో తప్పనిసరి చర్య', 'సమయంలో ప్రవేశం రద్దు అయితే ఫీజు వాపసు హక్కు', 'ప్రతి సంస్థలో ఫిర్యాదు పరిష్కార కమిటీ హక్కు'] },
    { id: 'rti', icon: '📋', title: 'సమాచార హక్కు', law: 'సమాచార హక్కు చట్టం, 2005', rights: ['ఏ పౌరుడైనా ఏ ప్రభుత్వ విభాగం నుండైనా సమాచారం అడగవచ్చు', 'దరఖాస్తు చేసిన 30 రోజుల్లోపు ప్రభుత్వం జవాబు ఇవ్వాలి', 'RTI దరఖాస్తు ఫీజు కేవలం ₹10 మాత్రమే', 'నిరాకరిస్తే 30 రోజుల్లోపు మొదటి అప్పీలేట్ అధికారికి అప్పీల్', 'కేంద్ర/రాష్ట్ర సమాచార కమిషన్‌కు రెండో అప్పీల్', 'అనుపాలన చేయకపోతే పబ్లిక్ ఇన్ఫర్మేషన్ ఆఫీసర్‌కు శిక్ష'] },
  ],
};

const uiLabels = {
  english: { title: '✊ Know Your Rights', subtitle: 'Every Indian citizen has rights protected by law.', back: '← Back to categories', askTitle: 'Ask AI about your', askPlaceholder: 'Ask a specific question about your', askButton: '🔍 Ask Firm Law AI', askLoading: '⏳ Getting answer...', lookingUp: 'Looking up your rights...', answerTitle: 'Firm Law AI Answer', savePDF: '🖨️ Save PDF', copy: '📋 Copy', copied: '✅ Copied!', disclaimer: '⚠️ This is general legal information only. For your specific situation, please consult a qualified advocate.' },
  hindi: { title: '✊ अपने अधिकार जानें', subtitle: 'हर भारतीय नागरिक के अधिकार कानून द्वारा संरक्षित हैं।', back: '← श्रेणियों पर वापस जाएं', askTitle: 'AI से पूछें अपने', askPlaceholder: 'अपने अधिकारों के बारे में कोई सवाल पूछें', askButton: '🔍 Firm Law AI से पूछें', askLoading: '⏳ जवाब मिल रहा है...', lookingUp: 'आपके अधिकार खोजे जा रहे हैं...', answerTitle: 'Firm Law AI का जवाब', savePDF: '🖨️ PDF सेव करें', copy: '📋 कॉपी करें', copied: '✅ कॉपी हो गया!', disclaimer: '⚠️ यह केवल सामान्य कानूनी जानकारी है। अपनी विशेष स्थिति के लिए किसी वकील से सलाह लें।' },
  telugu: { title: '✊ మీ హక్కులు తెలుసుకోండి', subtitle: 'ప్రతి భారతీయ పౌరునికి చట్టం ద్వారా రక్షించబడిన హక్కులు ఉన్నాయి.', back: '← వర్గాలకు తిరిగి వెళ్ళండి', askTitle: 'AI ని అడగండి మీ', askPlaceholder: 'మీ హక్కుల గురించి ప్రశ్న అడగండి', askButton: '🔍 Firm Law AI అడగండి', askLoading: '⏳ సమాధానం వస్తోంది...', lookingUp: 'మీ హక్కులు వెతుకుతున్నాం...', answerTitle: 'Firm Law AI సమాధానం', savePDF: '🖨️ PDF సేవ్ చేయండి', copy: '📋 కాపీ చేయండి', copied: '✅ కాపీ అయింది!', disclaimer: '⚠️ ఇది సాధారణ చట్టపరమైన సమాచారం మాత్రమే. మీ నిర్దిష్ట పరిస్థితి కోసం అర్హత కలిగిన న్యాయవాదిని సంప్రదించండి.' },
};

const markdownStyles = `
  .markdown-body { font-family: 'Outfit', sans-serif; font-size: 14px; line-height: 1.8; color: rgba(245,240,232,0.7); }
  .markdown-body h1, .markdown-body h2, .markdown-body h3 { font-family: 'Cormorant Garamond', serif; color: #f5f0e8; margin: 20px 0 10px; font-weight: 600; }
  .markdown-body h1 { font-size: 22px; }
  .markdown-body h2 { font-size: 18px; color: #c9a84c; }
  .markdown-body h3 { font-size: 16px; }
  .markdown-body strong { color: #f5f0e8; font-weight: 600; }
  .markdown-body em { color: #c9a84c; font-style: italic; }
  .markdown-body ul, .markdown-body ol { padding-left: 20px; margin: 10px 0; }
  .markdown-body li { margin: 6px 0; }
  .markdown-body p { margin: 10px 0; }
  .markdown-body blockquote { border-left: 3px solid #c9a84c; padding-left: 16px; margin: 12px 0; color: rgba(245,240,232,0.5); font-style: italic; }
  .markdown-body hr { border: none; border-top: 1px solid rgba(201,168,76,0.2); margin: 16px 0; }
  .markdown-body a { color: #c9a84c; text-decoration: underline; }
`;

export default function KnowYourRights() {
  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('english');

  const L = uiLabels[language];
  const categories = rightsCategories[language];

  function handleLanguageChange(lang) {
    setLanguage(lang);
    setSelected(null);
    setAnswer('');
    setQuestion('');
  }

  async function askRightsQuestion() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);
    const prompt = `A person is asking about their rights under Indian law related to "${selected.title}". Their question is: "${question}". Please provide a clear, practical answer explaining their legal rights and what steps they can take.`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, mode: 'qa', language }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setAnswer(data.response);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function copyAnswer() {
    const clean = stripMarkdown(answer);
    navigator.clipboard.writeText(clean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function printAnswer() {
    printMarkdown(
      selected.title,
      `Question: ${question}`,
      answer,
      'This answer was AI-generated by Firm Law AI. This is general legal information only. Please consult a qualified advocate.'
    );
  }

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <style>{markdownStyles}</style>
      <main style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px 80px'}}>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
          <div>
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>{L.title}</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>{L.subtitle}</p>
          </div>
          <LanguageToggle language={language} setLanguage={handleLanguageChange} />
        </div>

        {!selected && (
          <div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px'}}>
              {categories.map(cat => (
                <div key={cat.id} onClick={() => setSelected(cat)}
                  style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'}}>
                  <div style={{fontSize: '32px', marginBottom: '12px'}}>{cat.icon}</div>
                  <h3 style={{fontSize: '13px', fontWeight: 600, color: '#ffffff'}}>{cat.title}</h3>
                </div>
              ))}
            </div>

            {/* Chat Banner — at bottom of categories */}
            <a href="/chat?from=rights" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '14px 20px', marginTop: '24px', textDecoration: 'none', color: 'inherit', flexWrap: 'wrap', gap: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '20px'}}>🤖</span>
                <div>
                  <p style={{fontSize: '13px', fontWeight: 600, color: '#c9a84c', margin: 0}}>Not sure which rights apply to you?</p>
                  <p style={{fontSize: '12px', color: 'rgba(245,240,232,0.5)', margin: 0}}>Switch to Chat Mode — describe your situation and get personalised rights advice</p>
                </div>
              </div>
              <span style={{fontSize: '12px', fontWeight: 600, color: '#080808', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', padding: '6px 14px', borderRadius: '8px', whiteSpace: 'nowrap'}}>💬 Open Chat →</span>
            </a>
          </div>
        )}

        {selected && (
          <div>
            <button onClick={() => { setSelected(null); setAnswer(''); setQuestion(''); }}
              style={{fontSize: '13px', color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Outfit, sans-serif'}}>
              {L.back}
            </button>

            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '20px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)'}}>
                <span style={{fontSize: '36px'}}>{selected.icon}</span>
                <div>
                  <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '4px'}}>{selected.title}</h2>
                  <p style={{fontSize: '12px', color: 'var(--text-dim)'}}>{selected.law}</p>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {selected.rights.map((right, i) => (
                  <div key={i} style={{display: 'flex', gap: '12px', padding: '12px 16px', background: 'rgba(201,168,76,0.04)', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.08)'}}>
                    <div style={{width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--black)', flexShrink: 0}}>{i + 1}</div>
                    <p style={{fontSize: '13px', color: '#ffffff', lineHeight: 1.6, fontWeight: 300}}>{right}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '20px'}}>
              <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '16px'}}>🤖 {L.askTitle} {selected.title}</h3>
              <textarea value={question} onChange={e => setQuestion(e.target.value)}
                placeholder={`${L.askPlaceholder} ${selected.title.toLowerCase()}...`}
                style={{width: '100%', minHeight: '80px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: 'var(--off-white)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.7}}
              />
              <button onClick={askRightsQuestion} disabled={loading || !question.trim()}
                style={{marginTop: '16px', width: '100%', padding: '12px', background: loading || !question.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: loading || !question.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                {loading ? L.askLoading : L.askButton}
              </button>
            </div>

            {loading && (
              <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
                <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}}/>
                <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px'}}>{L.lookingUp}</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {error && (
              <div style={{background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '12px', padding: '16px', fontSize: '13px', color: '#ff6b6b'}}>❌ {error}</div>
            )}

            {answer && (
              <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>⚖️</div>
                    <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)'}}>{L.answerTitle}</span>
                  </div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button onClick={copyAnswer}
                      style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: copied ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                      {copied ? L.copied : L.copy}
                    </button>
                    <button onClick={printAnswer}
                      style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', border: 'none', color: 'var(--black)', cursor: 'pointer', fontWeight: 600, fontFamily: 'Outfit, sans-serif'}}>
                      {L.savePDF}
                    </button>
                  </div>
                </div>
                <div className="markdown-body">
                  <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
                <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-dim)'}}>{L.disclaimer}</div>

                {/* Chat Banner — after answer */}
                <a href="/chat?from=rights" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '14px 20px', marginTop: '20px', textDecoration: 'none', color: 'inherit', flexWrap: 'wrap', gap: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{fontSize: '20px'}}>🤖</span>
                    <div>
                      <p style={{fontSize: '13px', fontWeight: 600, color: '#c9a84c', margin: 0}}>Have more questions about your rights?</p>
                      <p style={{fontSize: '12px', color: 'rgba(245,240,232,0.5)', margin: 0}}>Switch to Chat Mode — continue the conversation with full memory</p>
                    </div>
                  </div>
                  <span style={{fontSize: '12px', fontWeight: 600, color: '#080808', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', padding: '6px 14px', borderRadius: '8px', whiteSpace: 'nowrap'}}>💬 Open Chat →</span>
                </a>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}