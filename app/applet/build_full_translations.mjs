import fs from 'fs';
import path from 'path';

// Let's create the complete translation dictionary in a clean JSON-backed or TS module
// We will write the file src/data/legalTopicsTranslations.ts

const OUTPUT_FILE = path.resolve('src/data/legalTopicsTranslations.ts');

const fullFileContent = `import { LegalTopic, LegalTermGlossary, CategoryKey } from '../types';
import { SupportedLanguage } from '../utils/translations';
import { LEGAL_TOPICS, LEGAL_GLOSSARY } from './legalData';

export interface LocalizedLegalTopicContent {
  title: string;
  shortDescription: string;
  fullExplanation: string;
  primaryLaw: string;
  keyRights: string[];
  whatToDoIfViolated: string[];
  recommendedAuthority: string;
  helpline: string;
}

export interface LocalizedGlossaryContent {
  term: string;
  nativeTerm?: string;
  simplifiedMeaning: string;
  practicalExample: string;
}

export const LOCALIZED_TOPICS_MAP: Record<
  SupportedLanguage,
  Record<string, LocalizedLegalTopicContent>
> = {
  English: {
    'topic-consumer': {
      title: 'Consumer Protection & Defective Goods/Services',
      shortDescription:
        'Your statutory rights when you buy defective goods, face misleading advertisements, or suffer unfair trade practices.',
      fullExplanation:
        'Under the Consumer Protection Act 2019, every Indian buyer is protected against deficiency in services, unfair contract terms, overcharging, and substandard goods. Whether you purchased from a local shop or an e-commerce platform, businesses are legally bound to deliver what they promised and cannot refuse refunds for deficient items or services.',
      primaryLaw: 'Consumer Protection Act, 2019 & E-Commerce Rules, 2020',
      keyRights: [
        'Right to Safety: Protection against goods and services hazardous to life or property.',
        'Right to Information: Accurate facts on quantity, purity, potency, standard, and price.',
        'Right to Redressal: Compensation for defective goods, deficiency in service, or overpricing.',
        'Right against Misleading Ads: Celebrities and manufacturers face liability for false endorsements.',
        'Product Liability: Manufacturer and seller are liable for injury/damage caused by a defective product.',
      ],
      whatToDoIfViolated: [
        'Draft a formal written complaint with your order ID, bill, and specific grievance.',
        'Call the National Consumer Helpline at 1915 or send a WhatsApp message to 8800001915.',
        'Register on consumerhelpline.gov.in or file a formal case on e-Daakhil (edaakhil.nic.in).',
        'Claims up to ₹50 Lakhs are heard at the District Consumer Commission with minimal filing fee.',
      ],
      recommendedAuthority: 'District Consumer Disputes Redressal Commission',
      helpline: '1915 (National Consumer Helpline)',
    },
    'topic-cyber': {
      title: 'Cyber Security, Digital Fraud & Online Harassment',
      shortDescription:
        'How to recover frozen money within the "Golden Hour", combat blackmail and fake loan apps, and report safely.',
      fullExplanation:
        'Cybercrime affects millions through financial fraud, identity theft, unauthorized access, and cyber harassment. Under the Information Technology Act 2000 and Indian Penal Code / Bharatiya Nyaya Sanhita, unauthorized electronic access, phishing, and non-consensual sharing of intimate images are severe criminal offences punishable by rigorous imprisonment and fines.',
      primaryLaw: 'Information Technology Act, 2000 (Sec 43, 66, 67) & BNS',
      keyRights: [
        'Golden Hour Freeze: Calling 1930 enables automated inter-bank holds on transiting funds.',
        'Right to Digital Privacy: Companies must protect your personal data with reasonable security.',
        'Right to Protection from Extortion: Blackmail via fake loan apps or morphed images is strictly punishable.',
        'Right to Anonymous Reporting: Women and children can report sexual content anonymously on the portal.',
      ],
      whatToDoIfViolated: [
        'Immediately dial 1930 within the first 2 hours of unauthorized bank debit.',
        'Collect transaction UTR numbers, account numbers, and unedited screenshot trails.',
        'Register an e-complaint on cybercrime.gov.in.',
        'Request your bank to initiate a chargeback and freeze corresponding beneficiary accounts.',
      ],
      recommendedAuthority: 'Indian Cyber Crime Coordination Centre (I4C) / Local Cyber Cell',
      helpline: '1930 (National Cyber Fraud Emergency)',
    },
    'topic-women': {
      title: "Women's Safety, Dignity & Anti-Harassment Protections",
      shortDescription:
        'Legal safeguards against domestic abuse, workplace harassment (POSH), zero-FIR rights, and unconditional free legal aid.',
      fullExplanation:
        'Indian jurisprudence grants robust constitutional and statutory safeguards to women. This includes the right to a safe domestic household under PWDVA 2005, dignity at workplaces under the POSH Act 2013, 26 weeks paid maternity leave, right to register Zero FIR anywhere in India, and 100% free legal aid through NALSA irrespective of financial status.',
      primaryLaw: 'Protection of Women from Domestic Violence Act 2005 & POSH Act 2013',
      keyRights: [
        'Zero FIR: A woman can lodge an FIR at ANY police station, regardless of territorial jurisdiction.',
        'Arrest Safeguards: A woman cannot be arrested before sunrise or after sunset without special magistrate orders, and only by a woman police officer.',
        'Right to Stridhan: All gifts, jewelry, and assets given before/during marriage belong exclusively to the woman.',
        'Workplace Protection: Any organization with 10+ employees must have an Internal Complaints Committee.',
        'Free Legal Aid: Absolute entitlement to free advocate, court fee exemption, and documentation under Sec 12 NALSA.',
      ],
      whatToDoIfViolated: [
        'Contact Sakhi One Stop Centre (OSC) or dial 181 for immediate medical, shelter, and legal support.',
        'For workplace matters, submit a written complaint to the ICC within 90 days.',
        'Approach the Protection Officer or District Legal Services Authority (DLSA) at the district court.',
      ],
      recommendedAuthority: 'National Commission for Women / Sakhi OSC / DLSA',
      helpline: '181 / 7827170170 (Women Helpline)',
    },
    'topic-labour': {
      title: "Workers' Rights, Wage Protections & Wrongful Termination",
      shortDescription:
        'Rules regarding timely salary release, gratuity entitlements, PF deposits, notice periods, and working hours limits.',
      fullExplanation:
        'Employees and workmen in both formal and informal sectors are shielded by labor codes and acts. Employers are legally obligated to pay agreed wages on time, contribute matching provident fund (PF), provide safe and hygienic working premises, respect statutory notice periods, and disburse gratuity upon completion of 5 years of service.',
      primaryLaw: 'Code on Wages, Industrial Disputes Act & Payment of Gratuity Act',
      keyRights: [
        'Timely Wage Payment: Salaries must be credited before the 7th or 10th of every calendar month.',
        'Full & Final Settlement: Employers must clear all undisputed dues within 2 working days of resignation/termination.',
        'Gratuity: Guaranteed 15 days wages per completed year of service after 5 continuous years.',
        'Prohibition of Unlawful Deductions: Arbitrary penalties cannot be subtracted from earnings.',
      ],
      whatToDoIfViolated: [
        'Send a formal demand letter via registered post and email to management.',
        'File a complaint on the Shram Suvidha portal (shramsuvidha.gov.in) or Samadhan portal.',
        'Approach the District Labour Conciliation Officer for conciliation proceedings.',
        'Lodge an EPF grievance at epfigms.gov.in if employee PF was deducted but not remitted to EPFO.',
      ],
      recommendedAuthority: 'Office of the Labour Commissioner / EPFO',
      helpline: '14434 (Ministry of Labour Helpline)',
    },
    'topic-housing': {
      title: 'Tenant & Landlord Rights: Deposits, Evictions & Amenities',
      shortDescription:
        'Protection against unlawful eviction, caps on security deposits, preservation of electricity and water amenities.',
      fullExplanation:
        'Rental relationships are governed by the Model Tenancy Act and State Rent Control Acts. Landlords cannot arbitrarily enter premises without 24-hour notice, cannot cut off water or electricity to coerce vacating, and must refund security deposits promptly upon lease completion after reasonable wear and tear adjustments.',
      primaryLaw: 'Model Tenancy Act & State Rent Control Legislations',
      keyRights: [
        'Security Deposit Cap: Capped at maximum 2 months rent for residential and 1 month for commercial premises under modern guidelines.',
        'Essential Amenities Protection: Cutting electricity or water supply is a cognizable legal violation.',
        'Notice Before Entry: Landlord must give 24-hour prior notice to enter rented premises for inspection.',
        'Protection from Forceful Eviction: Eviction can only be executed through due legal process and court order.',
      ],
      whatToDoIfViolated: [
        'If amenities are cut off, report to local police immediately or approach the Rent Authority.',
        'Send a legal notice for wrongful withholding of security deposit.',
        'File a petition before the Rent Court or approach DLSA mediation.',
      ],
      recommendedAuthority: 'Rent Authority / Rent Court / Sub-Divisional Magistrate',
      helpline: '15100 (DLSA Legal Services Helpline)',
    },
    'topic-police': {
      title: 'Citizen Rights During Police Interaction & Arrest',
      shortDescription:
        'Crucial Supreme Court DK Basu guidelines: rights upon arrest, zero FIR, grounds of arrest, and 24-hour magistrate rule.',
      fullExplanation:
        'Every citizen has fundamental liberties protected by Article 21 and 22 of the Constitution. The landmark Supreme Court ruling in D.K. Basu v. State of West Bengal and Section 41-50 of CrPC / Bharatiya Nagarik Suraksha Sanhita establish mandatory rules that every police officer must strictly follow during detention or arrest.',
      primaryLaw: 'Constitution of India (Art 21, 22) & CrPC / BNSS',
      keyRights: [
        'Right to Know Grounds of Arrest: Police must inform you immediately of the specific offence and reason.',
        'Right to Legal Counsel: You have the right to consult and be defended by a lawyer of your choice.',
        'Right to Inform Family: Police must notify one friend or relative within 8-12 hours of arrest.',
        'Mandatory 24-Hour Rule: Arrested person must be produced before the nearest Judicial Magistrate within 24 hours.',
        'Right to Medical Examination: You can demand an independent medical checkup at the time of arrest and every 48 hours in custody.',
        'Arrest Memo: Police must prepare a formal memo of arrest signed by at least one witness and the arrestee.',
      ],
      whatToDoIfViolated: [
        'Demand to see the police officer’s official name badge and identification.',
        'Inform family/friends immediately and disclose the exact police station location.',
        'Request the duty counsel provided by the Legal Aid Defense Counsel System (LADCS).',
        'If torture or illegal detention occurred, report directly to the Magistrate upon first production.',
      ],
      recommendedAuthority: 'Judicial Magistrate / State Human Rights Commission (SHRC) / SP Office',
      helpline: '112 / 14433 (NHRC Human Rights Helpline)',
    },
    'topic-rti': {
      title: 'Right to Information (RTI): Demanding Accountability',
      shortDescription:
        'How to file a ₹10 RTI application, statutory 30-day response mandates, and appealing to Information Commissions.',
      fullExplanation:
        'The Right to Information Act 2005 empowers every Indian citizen to question government departments, inspect public works, obtain certified copies of official documents, and demand transparency. Public Information Officers (PIOs) are legally bound to reply within 30 days, or 48 hours if the matter involves life and liberty.',
      primaryLaw: 'Right to Information Act, 2005',
      keyRights: [
        '30-Day Mandatory Reply: Information must be supplied within 30 calendar days.',
        'Life and Liberty Rule: Urgent information concerning life/liberty must be provided within 48 hours.',
        'Affordable Access: Central RTI application fee is just ₹10 (free for Below Poverty Line citizens).',
        'Penalty on Errant Officers: PIOs face personal fines of ₹250 per day (up to ₹25,000) for unjustified delays.',
      ],
      whatToDoIfViolated: [
        'File First Appeal within 30 days of deadline expiry before the First Appellate Authority (FAA).',
        'If First Appeal is ignored or rejected, file Second Appeal with the Central or State Information Commission.',
      ],
      recommendedAuthority: 'Central Information Commission (CIC) / State Information Commissions',
      helpline: '011-26183027 (Central Information Commission)',
    },
    'topic-students': {
      title: 'Student Rights: Anti-Ragging, Fee Refunds & Documents',
      shortDescription:
        'UGC guidelines on mandatory fee refunds, strict prohibition of holding original certificates, and zero-tolerance anti-ragging.',
      fullExplanation:
        'Students and parents are protected against predatory practices by educational institutions. The University Grants Commission (UGC) and AICTE mandate that universities cannot withhold original certificates under any pretext, must refund fees if admission is withdrawn within prescribed periods, and must maintain 24x7 anti-ragging vigilance.',
      primaryLaw: 'UGC Fee Refund Norms & Anti-Ragging Regulations 2009',
      keyRights: [
        'Original Documents: Colleges have NO legal right to retain original marksheets or certificates.',
        'Pro-Rata Fee Refund: Tiered refund policies protect students who switch colleges during counselling.',
        'Anti-Ragging Protection: Ragging is a criminal offence; institutions face derecognition for negligence.',
        'Right to Grievance Redressal: Every higher education institution must have a Student Grievance Redressal Committee (SGRC).',
      ],
      whatToDoIfViolated: [
        'Lodge complaint on UGC e-Samadhan portal (samadhan.ugc.ac.in).',
        'For ragging incidents, call the 24x7 toll-free helpline at 1800-180-5522 immediately.',
        'Approach the District Consumer Forum for arbitrary fee forfeiture.',
      ],
      recommendedAuthority: 'UGC e-Samadhan / National Anti-Ragging Cell',
      helpline: '1800-180-5522 (National Anti-Ragging Toll Free)',
    },
    'topic-seniors': {
      title: 'Senior Citizen Protection & Maintenance Rights',
      shortDescription:
        'Maintenance Tribunal orders under SDM, voiding gift deeds if children abandon parents, and healthcare priorities.',
      fullExplanation:
        'The Maintenance and Welfare of Parents and Senior Citizens Act 2007 provides a fast-track, lawyer-free mechanism for parents and senior citizens (aged 60+) to demand monthly maintenance from children or legal heirs. The law empowers tribunals to evict abusive children and even cancel property transfers.',
      primaryLaw: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
      keyRights: [
        'Right to Monthly Maintenance: Children/heirs are legally bound to provide food, clothing, shelter, and medical care.',
        'Cancellation of Property Transfer: Under Section 23, property transferred to children can be revoked if they neglect parents.',
        'Summary Procedure: Tribunals headed by SDM decide cases within 90 days without complex civil court delays.',
        'Elder Abuse Penalty: Abandonment of senior citizens is a cognizable criminal offence.',
      ],
      whatToDoIfViolated: [
        'Call Elderline at 14567 for free counseling and field intervention.',
        'File an application before the Sub-Divisional Magistrate (SDM) / Maintenance Tribunal.',
        'Seek assistance from the District Social Welfare Officer or DLSA front office.',
      ],
      recommendedAuthority: 'SDM Maintenance Tribunal / Social Welfare Department',
      helpline: '14567 (Elderline National Senior Helpline)',
    },
  },

  Hindi: {
    'topic-consumer': {
      title: 'उपभोक्ता संरक्षण, घटिया सामान और सेवा में कमी',
      shortDescription:
        'दोषपूर्ण सामान, भ्रामक विज्ञापनों और अनुचित व्यापार प्रथाओं के खिलाफ आपके वैधानिक अधिकार।',
      fullExplanation:
        'उपभोक्ता संरक्षण अधिनियम 2019 के तहत प्रत्येक भारतीय खरीदार को सेवा में कमी, अनुचित अनुबंध शर्तों, अधिक मूल्य वसूली और घटिया सामान के खिलाफ कानूनी संरक्षण प्राप्त है। चाहे आपने किसी स्थानीय दुकान से खरीदारी की हो या ई-कॉमर्स प्लेटफॉर्म से, कंपनियां वादे के अनुसार सामान व सेवा देने के लिए बाध्य हैं और रिफंड से इनकार नहीं कर सकतीं।',
      primaryLaw: 'उपभोक्ता संरक्षण अधिनियम, 2019 और ई-कॉमर्स नियम, 2020',
      keyRights: [
        'सुरक्षा का अधिकार: जीवन या संपत्ति के लिए हानिकारक वस्तुओं व सेवाओं से सुरक्षा।',
        'सूचना का अधिकार: उत्पाद की गुणवत्ता, मात्रा, शुद्धता, मानक और मूल्य की सटीक जानकारी।',
        'निवारण का अधिकार: दोषपूर्ण सामान, सेवा में कमी या अधिक कीमत वसूली पर मुआवजा।',
        'भ्रामक विज्ञापनों के विरुद्ध अधिकार: झूठे दावों और भ्रामक प्रचार के लिए निर्माताओं पर कठोर कानूनी जिम्मेदारी।',
        'उत्पाद देयता: दोषपूर्ण उत्पाद से हुए किसी भी नुकसान या चोट के लिए निर्माता और विक्रेता की पूर्ण देनदारी।',
      ],
      whatToDoIfViolated: [
        'अपने ऑर्डर नंबर, बिल और स्पष्ट शिकायत के साथ एक औपचारिक लिखित शिकायत तैयार करें।',
        'राष्ट्रीय उपभोक्ता हेल्पलाइन नंबर 1915 पर कॉल करें या 8800001915 पर व्हाट्सएप भेजें।',
        'consumerhelpline.gov.in पर शिकायत दर्ज करें या ई-दाखिल (edaakhil.nic.in) पर ऑनलाइन केस दायर करें।',
        '₹50 लाख तक के दावों की सुनवाई जिला उपभोक्ता आयोग में न्यूनतम फीस के साथ होती है।',
      ],
      recommendedAuthority: 'जिला उपभोक्ता विवाद निवारण आयोग (उपभोक्ता फोरम)',
      helpline: '1915 (राष्ट्रीय उपभोक्ता हेल्पलाइन)',
    },
    'topic-cyber': {
      title: 'साइबर सुरक्षा, डिजिटल वित्तीय धोखाधड़ी और ऑनलाइन उत्पीड़न',
      shortDescription:
        'गोल्डन ऑवर में रुके हुए पैसे वापस पाना, फर्जी लोन ऐप ब्लैकमेलिंग से निपटना और सुरक्षित शिकायत।',
      fullExplanation:
        'साइबर अपराध वित्तीय धोखाधड़ी, पहचान की चोरी, अनधिकृत पहुंच और ऑनलाइन उत्पीड़न के माध्यम से लाखों लोगों को प्रभावित करता है। सूचना प्रौद्योगिकी अधिनियम 2000 और भारतीय न्याय संहिता के तहत, अनधिकृत इलेक्ट्रॉनिक पहुंच, बैंक फ़िशिंग और सहमति के बिना निजी तस्वीरें साझा करना गंभीर संज्ञेय अपराध हैं जिनमें कठोर कारावास और जुर्माना होता है।',
      primaryLaw: 'सूचना प्रौद्योगिकी अधिनियम, 2000 (धारा 43, 66, 67) व BNS',
      keyRights: [
        'गोल्डन ऑवर फ़्रीज़: घटना के तुरंत बाद 1930 पर कॉल करने से विभिन्न बैंकों के बीच ट्रांसफर हो रही रकम पर स्वतः रोक लग जाती है।',
        'डिजिटल गोपनीयता का अधिकार: कंपनियों को उचित सुरक्षा उपायों के साथ आपके व्यक्तिगत डेटा की रक्षा करनी होगी।',
        'जबरन वसूली से संरक्षण: फर्जी लोन ऐप या मॉर्फ्ड तस्वीरों द्वारा ब्लैकमेल करना सख्त दंडनीय अपराध है।',
        'गुमनाम शिकायत का अधिकार: महिलाएं और बच्चे पोर्टल पर अवांछित यौन सामग्री की बिना नाम बताए शिकायत कर सकते हैं।',
      ],
      whatToDoIfViolated: [
        'अनधिकृत बैंक कटौती के पहले 2 घंटों के भीतर तुरंत 1930 डायल करें।',
        'लेन-देन यूटीआर नंबर, बैंक खाता विवरण और स्क्रीनशॉट साक्ष्य एकत्रित करें।',
        'cybercrime.gov.in पोर्टल पर तुरंत औपचारिक ई-शिकायत दर्ज करें।',
        'अपने बैंक से चार्ज-बैक शुरू करने और संबंधित लाभार्थी खातों को फ्रीज करने का अनुरोध करें।',
      ],
      recommendedAuthority: 'भारतीय साइबर अपराध समन्वय केंद्र (I4C) / स्थानीय साइबर सेल',
      helpline: '1930 (राष्ट्रीय साइबर धोखाधड़ी हेल्पलाइन)',
    },
    'topic-women': {
      title: 'महिला सुरक्षा, गरिमा और घरेलू व कार्यस्थल उत्पीड़न से संरक्षण',
      shortDescription:
        'घरेलू हिंसा, कार्यस्थल पर उत्पीड़न (POSH), ज़ीरो एफआईआर का अधिकार और बिना शर्त निःशुल्क कानूनी सहायता।',
      fullExplanation:
        'भारतीय न्यायशास्त्र महिलाओं को मजबूत संवैधानिक और वैधानिक सुरक्षा प्रदान करता है। इसमें घरेलू हिंसा अधिनियम 2005 के तहत सुरक्षित घरेलू आवास, कार्यस्थल पर यौन उत्पीड़न निवारण (POSH) अधिनियम 2013, 26 सप्ताह का सवेतन मातृत्व अवकाश, भारत में कहीं भी ज़ीरो एफआईआर दर्ज कराने का अधिकार और नालसा (NALSA) के माध्यम से बिना किसी आय सीमा के 100% निःशुल्क कानूनी सहायता शामिल है।',
      primaryLaw: 'घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम 2005 व POSH अधिनियम 2013',
      keyRights: [
        'ज़ीरो एफआईआर: एक महिला किसी भी पुलिस स्टेशन में एफआईआर दर्ज करा सकती है, भले ही अपराध कहीं भी हुआ हो।',
        'गिरफ्तारी से सुरक्षा: सूर्यास्त के बाद और सूर्योदय से पहले किसी महिला को विशेष मजिस्ट्रेट आदेश के बिना गिरफ्तार नहीं किया जा सकता, और केवल महिला पुलिसकर्मी ही गिरफ्तार कर सकती है।',
        'स्त्रीधन पर पूर्ण अधिकार: विवाह से पहले या दौरान मिले सभी आभूषण, उपहार और संपत्तियां विशेष रूप से महिला की होती हैं।',
        'कार्यस्थल सुरक्षा: 10 या अधिक कर्मचारियों वाले प्रत्येक संस्थान में आंतरिक शिकायत समिति (ICC) होना अनिवार्य है।',
        'मुफ्त कानूनी सहायता: नालसा की धारा 12 के तहत निःशुल्क वकील, कोर्ट फीस माफी और कानूनी सलाह पाने का पूर्ण कानूनी हक।',
      ],
      whatToDoIfViolated: [
        'तत्काल चिकित्सा, आश्रय और कानूनी सहायता के लिए सखी वन स्टॉप सेंटर (OSC) से संपर्क करें या 181 डायल करें।',
        'कार्यस्थल मामलों में 90 दिनों के भीतर आंतरिक शिकायत समिति (ICC) को लिखित शिकायत दें।',
        'जिला अदालत में स्थित संरक्षण अधिकारी (Protection Officer) या जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।',
      ],
      recommendedAuthority: 'राष्ट्रीय महिला आयोग / सखी वन स्टॉप सेंटर / DLSA',
      helpline: '181 / 7827170170 (महिला हेल्पलाइन)',
    },
    'topic-labour': {
      title: 'श्रमिक अधिकार, वेतन सुरक्षा और अनुचित बर्खास्तगी से बचाव',
      shortDescription:
        'समय पर वेतन भुगतान, ग्रेच्युटी हकदारी, पीएफ जमा, नोटिस अवधि और काम के घंटों के नियम।',
      fullExplanation:
        'संगठित और असंगठित दोनों क्षेत्रों के कर्मचारियों को श्रम संहिताओं और कानूनों द्वारा पूर्ण सुरक्षा प्राप्त है। नियोक्ता समय पर सहमत वेतन देने, पीएफ (भविष्य निधि) जमा करने, सुरक्षित और स्वच्छ कार्यस्थल उपलब्ध कराने, नोटिस अवधि का पालन करने और 5 वर्ष की सेवा पूर्ण होने पर ग्रेच्युटी का भुगतान करने के लिए कानूनी रूप से बाध्य हैं।',
      primaryLaw: 'वेतन संहिता, औद्योगिक विवाद अधिनियम व ग्रेच्युटी भुगतान अधिनियम',
      keyRights: [
        'समय पर वेतन: प्रत्येक कैलेंडर माह की 7 या 10 तारीख से पहले वेतन खाते में जमा होना चाहिए।',
        'पूर्ण व अंतिम निपटान (F&F): इस्तीफे या सेवामुक्ति के 2 कार्य दिवसों के भीतर सभी वैध बकाया राशि का भुगतान होना चाहिए।',
        'ग्रेच्युटी: 5 वर्ष की निरंतर सेवा के बाद प्रत्येक वर्ष के लिए 15 दिनों के वेतन की गारंटीकृत ग्रेच्युटी।',
        'गैरकानूनी कटौती पर रोक: कर्मचारियों की कमाई से मनमाने जुर्माने या अवैध कटौतियां नहीं की जा सकतीं।',
      ],
      whatToDoIfViolated: [
        'प्रबंधन को पंजीकृत डाक और ईमेल के माध्यम से औपचारिक मांग पत्र (Demand Notice) भेजें।',
        'श्रम सुविधा पोर्टल (shramsuvidha.gov.in) या समाधान पोर्टल पर अपनी शिकायत दर्ज करें।',
        'समझौता कार्यवाही के लिए जिला श्रम सुलह अधिकारी (Labour Conciliation Officer) के समक्ष आवेदन करें।',
        'यदि वेतन से पीएफ काटा गया लेकिन ईपीएफओ में जमा नहीं हुआ, तो epfigms.gov.in पर शिकायत दर्ज करें।',
      ],
      recommendedAuthority: 'श्रम आयुक्त कार्यालय / कर्मचारी भविष्य निधि संगठन (EPFO)',
      helpline: '14434 (श्रम और रोजगार मंत्रालय हेल्पलाइन)',
    },
    'topic-housing': {
      title: 'किरायेदार व मकान मालिक अधिकार: डिपॉजिट, बेदखली और सुविधाएं',
      shortDescription:
        'अवैध बेदखली से सुरक्षा, सुरक्षा जमा (डिपॉजिट) की सीमा, बिजली और पानी जैसी आवश्यक सुविधाओं की रक्षा।',
      fullExplanation:
        'किरायेदारी संबंध मॉडल टेनेंसी एक्ट और राज्य किराया नियंत्रण कानूनों द्वारा शासित होते हैं। मकान मालिक 24 घंटे की पूर्व सूचना के बिना परिसर में मनमाने ढंग से प्रवेश नहीं कर सकते, मकान खाली कराने के लिए पानी या बिजली की आपूर्ति नहीं काट सकते, और सामान्य टूट-फूट के समायोजन के बाद लीज समाप्ति पर सुरक्षा जमा तुरंत वापस करना अनिवार्य है।',
      primaryLaw: 'मॉडल टेनेंसी एक्ट और राज्य किराया नियंत्रण अधिनियम',
      keyRights: [
        'डिपॉजिट की सीमा: आवासीय परिसर के लिए अधिकतम 2 महीने और वाणिज्यिक परिसर के लिए 1 महीने का किराया ही सुरक्षा जमा लिया जा सकता है।',
        'आवश्यक सुविधाओं की सुरक्षा: बिजली या पानी का कनेक्शन काटना कानूनन संज्ञेय अपराध है।',
        'निरीक्षण से पूर्व सूचना: मकान मालिक को किराये के परिसर में आने से पहले कम से कम 24 घंटे का पूर्व नोटिस देना होगा।',
        'जबरन बेदखली से सुरक्षा: बेदखली केवल उचित कानूनी प्रक्रिया और किराया अदालत के आदेश से ही हो सकती है।',
      ],
      whatToDoIfViolated: [
        'यदि बिजली या पानी काटा जाता है, तो तुरंत स्थानीय पुलिस को सूचित करें या रेंट अथॉरिटी के पास जाएं।',
        'सुरक्षा जमा को अवैध रूप से रोके रखने पर मकान मालिक को कानूनी नोटिस (Legal Notice) भेजें।',
        'रेंट कोर्ट में याचिका दायर करें या डीएलएसए (DLSA) मध्यस्थता केंद्र से मदद लें।',
      ],
      recommendedAuthority: 'रेंट अथॉरिटी / रेंट कोर्ट / उप-मंडल मजिस्ट्रेट (SDM)',
      helpline: '15100 (डीएलएसए कानूनी सहायता हेल्पलाइन)',
    },
    'topic-police': {
      title: 'पुलिस पूछताछ और गिरफ्तारी के समय नागरिक अधिकार (डी.के. बसु दिशानिर्देश)',
      shortDescription:
        'सुप्रीम कोर्ट के ऐतिहासिक डीके बसु दिशानिर्देश: गिरफ्तारी के आधार, ज़ीरो एफआईआर और 24 घंटे में मजिस्ट्रेट पेशी।',
      fullExplanation:
        'प्रत्येक नागरिक को संविधान के अनुच्छेद 21 और 22 द्वारा मौलिक स्वतंत्रता प्राप्त है। सुप्रीम कोर्ट के ऐतिहासिक फैसले (डी.के. बसु बनाम पश्चिम बंगाल राज्य) और भारतीय नागरिक सुरक्षा संहिता (BNSS) के तहत अनिवार्य नियम निर्धारित हैं जिनका पालन हर पुलिस अधिकारी को हिरासत या गिरफ्तारी के दौरान सख्ती से करना होता है।',
      primaryLaw: 'भारत का संविधान (अनुच्छेद 21, 22) और BNSS / CrPC',
      keyRights: [
        'गिरफ्तारी का कारण जानने का अधिकार: पुलिस को तुरंत अपराध और गिरफ्तारी का स्पष्ट कारण बताना होगा।',
        'कानूनी वकील का अधिकार: आपको अपनी पसंद के वकील से परामर्श करने और बचाव कराने का पूरा हक है।',
        'परिवार को सूचित करने का अधिकार: गिरफ्तारी के 8-12 घंटे के भीतर पुलिस को आपके एक रिश्तेदार या मित्र को सूचित करना अनिवार्य है।',
        '24 घंटे का अनिवार्य नियम: गिरफ्तार व्यक्ति को 24 घंटे के भीतर निकटतम न्यायिक मजिस्ट्रेट के समक्ष पेश किया जाना आवश्यक है।',
        'चिकित्सा जांच का अधिकार: गिरफ्तारी के समय और हिरासत के दौरान हर 48 घंटे में स्वतंत्र डॉक्टर से मेडिकल जांच की मांग कर सकते हैं।',
        'अरेस्ट मेमो: पुलिस को गिरफ्तारी का औपचारिक मेमो तैयार करना होगा जिस पर कम से कम एक गवाह और गिरफ्तार व्यक्ति के हस्ताक्षर हों।',
      ],
      whatToDoIfViolated: [
        'पुलिस अधिकारी का आधिकारिक नेम-बैज और पहचान पत्र देखने की मांग करें।',
        'तुरंत परिवार या मित्रों को सूचित करें और सटीक पुलिस स्टेशन का नाम बताएं।',
        'लीगल एड डिफेंस काउंसिल सिस्टम (LADCS) के माध्यम से मुफ्त ड्यूटी वकील की मांग करें।',
        'यदि अवैध हिरासत या प्रताड़ना हुई हो, तो मजिस्ट्रेट के समक्ष पहली पेशी पर सीधे शिकायत दर्ज कराएं।',
      ],
      recommendedAuthority: 'न्यायिक मजिस्ट्रेट / राज्य मानवाधिकार आयोग (SHRC) / एसपी कार्यालय',
      helpline: '112 / 14433 (राष्ट्रीय मानवाधिकार आयोग हेल्पलाइन)',
    },
    'topic-rti': {
      title: 'सूचना का अधिकार (RTI): सरकारी जवाबदेही और पारदर्शिता',
      shortDescription:
        'मात्र ₹10 में आरटीआई आवेदन, 30 दिनों में अनिवार्य जवाब और सूचना आयोग में अपील की प्रक्रिया।',
      fullExplanation:
        'सूचना का अधिकार अधिनियम 2005 प्रत्येक भारतीय नागरिक को सरकारी विभागों से सवाल पूछने, सार्वजनिक कार्यों का निरीक्षण करने, आधिकारिक दस्तावेजों की प्रमाणित प्रतियां प्राप्त करने और पारदर्शिता सुनिश्चित करने का अधिकार देता है। जन सूचना अधिकारियों (PIO) को 30 दिनों के भीतर जवाब देना कानूनी रूप से अनिवार्य है, या यदि मामला जीवन और स्वतंत्रता से जुड़ा हो तो 48 घंटे में।',
      primaryLaw: 'सूचना का अधिकार अधिनियम, 2005',
      keyRights: [
        '30 दिनों में अनिवार्य उत्तर: मांगी गई जानकारी 30 कैलेंडर दिनों के भीतर उपलब्ध कराई जानी चाहिए।',
        'जीवन और स्वतंत्रता का नियम: जीवन या व्यक्तिगत स्वतंत्रता से जुड़ी जानकारी 48 घंटे के भीतर दी जानी चाहिए।',
        'सस्ती पहुंच: केंद्रीय आरटीआई आवेदन शुल्क मात्र ₹10 है (गरीबी रेखा से नीचे के नागरिकों के लिए पूर्णतः निःशुल्क)।',
        'दोषी अधिकारियों पर जुर्माना: बिना ठोस कारण के देरी करने पर पीआईओ पर ₹250 प्रति दिन (अधिकतम ₹25,000) का व्यक्तिगत जुर्माना लगाया जा सकता है।',
      ],
      whatToDoIfViolated: [
        'समय सीमा समाप्त होने के 30 दिनों के भीतर प्रथम अपीलीय प्राधिकारी (FAA) के समक्ष प्रथम अपील दायर करें।',
        'यदि प्रथम अपील खारिज हो या जवाब न मिले, तो केंद्रीय या राज्य सूचना आयोग में द्वितीय अपील दर्ज करें।',
      ],
      recommendedAuthority: 'केंद्रीय सूचना आयोग (CIC) / राज्य सूचना आयोग',
      helpline: '011-26183027 (केंद्रीय सूचना आयोग हेल्पलाइन)',
    },
    'topic-students': {
      title: 'छात्र अधिकार: रैगिंग निषेध, फीस रिफंड और मूल शैक्षणिक दस्तावेज',
      shortDescription:
        'यूजीसी दिशानिर्देश: अनिवार्य फीस रिफंड, मूल प्रमाण पत्र रोकने पर प्रतिबंध और रैगिंग पर पूर्ण रोक।',
      fullExplanation:
        'विश्वविद्यालय अनुदान आयोग (UGC) और AICTE के स्पष्ट नियमों के अनुसार कॉलेज किसी भी परिस्थिति में छात्र के मूल प्रमाण पत्र या अंकतालिकाएं अपने पास नहीं रख सकते। काउंसलिंग के दौरान प्रवेश वापस लेने पर निर्धारित नियमों के अनुसार फीस वापस करना अनिवार्य है, और 24 घंटे रैगिंग विरोधी निगरानी रखनी आवश्यक है।',
      primaryLaw: 'यूजीसी फीस रिफंड मानदंड और एंटी-रैगिंग विनियम 2009',
      keyRights: [
        'मूल प्रमाण पत्रों की सुरक्षा: कॉलेजों को छात्रों की मूल अंकतालिकाएं या डिग्रियां जब्त करने का कोई कानूनी हक नहीं है।',
        'फीस वापसी का अधिकार: समय पर दाखिला रद्द कराने पर छात्रों को नियमों के अनुसार आनुपातिक फीस रिफंड प्राप्त करने का अधिकार है।',
        'रैगिंग विरोधी संरक्षण: रैगिंग एक गंभीर गैर-जमानती अपराध है; लापरवाही बरतने वाले कॉलेजों की मान्यता रद्द हो सकती है।',
        'छात्र शिकायत निवारण: प्रत्येक उच्च शिक्षा संस्थान में छात्र शिकायत निवारण समिति (SGRC) का होना अनिवार्य है।',
      ],
      whatToDoIfViolated: [
        'यूजीसी के ई-समाधान पोर्टल (samadhan.ugc.ac.in) पर अपनी आधिकारिक शिकायत दर्ज करें।',
        'रैगिंग की घटना होने पर तुरंत 24x7 टोल-फ्री हेल्पलाइन नंबर 1800-180-5522 पर कॉल करें।',
        'मनमाने ढंग से फीस जब्त करने पर जिला उपभोक्ता फोरम में याचिका दायर करें।',
      ],
      recommendedAuthority: 'यूजीसी ई-समाधान / राष्ट्रीय एंटी-रैगिंग सेल',
      helpline: '1800-180-5522 (राष्ट्रीय एंटी-रैगिंग टोल फ्री)',
    },
    'topic-seniors': {
      title: 'वरिष्ठ नागरिक संरक्षण, मासिक भरण-पोषण और संपत्ति सुरक्षा अधिकार',
      shortDescription:
        'एसडीएम मेंटेनेंस ट्रिब्यूनल के आदेश, माता-पिता की उपेक्षा करने पर गिफ्ट डीड रद्द करना और स्वास्थ्य प्राथमिकताएं।',
      fullExplanation:
        'माता-पिता और वरिष्ठ नागरिक भरण-पोषण तथा कल्याण अधिनियम 2007 वरिष्ठ नागरिकों (60 वर्ष और अधिक) को बच्चों या कानूनी वारिसों से मासिक भरण-पोषण पाने के लिए बिना वकील की त्वरित प्रक्रिया प्रदान करता है। कानून ट्रिब्यूनल को प्रताड़ित करने वाले बच्चों को घर से बेदखल करने और माता-पिता की उपेक्षा पर हस्तांतरित संपत्ति का दान-पत्र (गिफ्ट डीड) रद्द करने का अधिकार देता है।',
      primaryLaw: 'माता-पिता और वरिष्ठ नागरिकों का भरण-पोषण तथा कल्याण अधिनियम, 2007',
      keyRights: [
        'मासिक भरण-पोषण का अधिकार: बच्चे और कानूनी वारिस भोजन, कपड़े, आश्रय और चिकित्सा देखभाल प्रदान करने के लिए बाध्य हैं।',
        'संपत्ति हस्तांतरण की रद्दीकरण: धारा 23 के तहत बच्चों को दी गई संपत्ति वापस ली जा सकती है यदि वे माता-पिता की उपेक्षा करते हैं।',
        'त्वरित प्रक्रिया: एसडीएम की अध्यक्षता वाले ट्रिब्यूनल 90 दिनों के भीतर बिना लंबी दीवानी अदालती देरी के फैसला सुनाते हैं।',
        'बुजुर्गों के परित्याग पर सजा: वरिष्ठ नागरिकों को असहाय छोड़ देना संज्ञेय आपराधिक अपराध है।',
      ],
      whatToDoIfViolated: [
        'मुफ्त परामर्श और त्वरित सहायता के लिए एल्डरलाइन 14567 पर कॉल करें।',
        'उप-मंडल मजिस्ट्रेट (SDM) / भरण-पोषण ट्रिब्यूनल के समक्ष सादे कागज पर आवेदन जमा करें।',
        'जिला समाज कल्याण अधिकारी या डीएलएसए (DLSA) फ्रंट ऑफिस से कानूनी सहायता प्राप्त करें।',
      ],
      recommendedAuthority: 'एसडीएम मेंटेनेंस ट्रिब्यूनल / समाज कल्याण विभाग',
      helpline: '14567 (एल्डरलाइन राष्ट्रीय वरिष्ठ नागरिक हेल्पलाइन)',
    },
  },

  Kannada: {
    'topic-consumer': {
      title: 'ಗ್ರಾಹಕ ಸಂರಕ್ಷಣೆ, ದೋಷಯುಕ್ತ ಸರಕುಗಳು ಮತ್ತು ಸೇವಾ ಲೋಪ',
      shortDescription:
        'ದೋಷಯುಕ್ತ ಸರಕುಗಳು, ದಿಕ್ಕು ತಪ್ಪಿಸುವ ಜಾಹೀರಾತುಗಳು ಮತ್ತು ಅನ್ಯಾಯದ ವ್ಯಾಪಾರ ಪದ್ಧತಿಗಳ ವಿರುದ್ಧ ನಿಮ್ಮ ಶಾಸನಬದ್ಧ ಹಕ್ಕುಗಳು.',
      fullExplanation:
        'ಗ್ರಾಹಕ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ 2019 ರ ಅಡಿಯಲ್ಲಿ, ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯ ಗ್ರಾಹಕನಿಗೆ ಸೇವಾ ನ್ಯೂನತೆ, ಅನ್ಯಾಯದ ಒಪ್ಪಂದದ ನಿಯಮಗಳು, ಹೆಚ್ಚಿನ ಬೆಲೆ ವಸೂಲಿ ಮತ್ತು ಕಳಪೆ ಗುಣಮಟ್ಟದ ವಸ್ತುಗಳ ವಿರುದ್ಧ ಸಂಪೂರ್ಣ ಕಾನೂನು ರಕ್ಷಣೆ ಇದೆ. ನೀವು ಸ್ಥಳೀಯ ಅಂಗಡಿಯಿಂದ ಖರೀದಿಸಿರಲಿ ಅಥವಾ ಇ-ಕಾಮರ್ಸ್ ಪೋರ್ಟಲ್‌ನಿಂದಿರಲಿ, ವ್ಯಾಪಾರಿಗಳು ಭರವಸೆ ನೀಡಿದ ಸರಕು-ಸೇವೆಗಳನ್ನು ಒದಗಿಸಲು ಬದ್ಧರಾಗಿದ್ದಾರೆ ಮತ್ತು ಹಣ ಮರುಪಾವತಿಸಲು ನಿರಾಕರಿಸುವಂತಿಲ್ಲ.',
      primaryLaw: 'ಗ್ರಾಹಕ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ, 2019 ಮತ್ತು ಇ-ಕಾಮರ್ಸ್ ನಿಯಮಗಳು, 2020',
      keyRights: [
        'ಸುರಕ್ಷತೆಯ ಹಕ್ಕು: ಜೀವ ಅಥವಾ ಆಸ್ತಿಗೆ ಹಾನಿಕಾರಕವಾದ ಸರಕು ಮತ್ತು ಸೇವೆಗಳಿಂದ ರಕ್ಷಣೆ.',
        'ಮಾಹಿತಿ ಪಡೆಯುವ ಹಕ್ಕು: ಗುಣಮಟ್ಟ, ಪ್ರಮಾಣ, ಶುದ್ಧತೆ, ಮಾನದಂಡ ಮತ್ತು ನಿಖರ ಬೆಲೆಯ ಮಾಹಿತಿ.',
        'ಪರಿಹಾರದ ಹಕ್ಕು: ದೋಷಯುಕ್ತ ವಸ್ತು ಅಥವಾ ಸೇವೆಯ ಲೋಪಕ್ಕೆ ಮರುಪಾವತಿ ಹಾಗೂ ಸೂಕ್ತ ಪರಿಹಾರ.',
        'ದಿಕ್ಕು ತಪ್ಪಿಸುವ ಜಾಹೀರಾತುಗಳ ವಿರುದ್ಧ ಹಕ್ಕು: ಸುಳ್ಳು ಪ್ರಚಾರ ಮಾಡುವ ತಯಾರಕರು ಮತ್ತು ಪ್ರಚಾರಕರ ಮೇಲೆ ಕಠಿಣ ದಂಡ.',
        'ಉತ್ಪನ್ನ ಹೊಣೆಗಾರಿಕೆ: ದೋಷಪೂರಿತ ಉತ್ಪನ್ನದಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ಹಾನಿಗೆ ಮಾರಾಟಗಾರ ಮತ್ತು ತಯಾರಕರ ಹೊಣೆ.',
      ],
      whatToDoIfViolated: [
        'ನಿಮ್ಮ ಆರ್ಡರ್ ಐಡಿ, ಬಿಲ್ ಮತ್ತು ದೂರಿನ ವಿವರಗಳೊಂದಿಗೆ ಔಪಚಾರಿಕ ಲಿಖಿತ ದೂರನ್ನು ಸಿದ್ಧಪಡಿಸಿ.',
        'ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಹಕ ಸಹಾಯವಾಣಿ 1915 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ 8800001915 ಗೆ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ.',
        'consumerhelpline.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ ಅಥವಾ ಇ-ದಾಖಿಲ್ (edaakhil.nic.in) ನಲ್ಲಿ ಆನ್‌ಲೈನ್ ಕೇಸ್ ದಾಖಲಿಸಿ.',
        '₹50 ಲಕ್ಷದವರೆಗಿನ ಕ್ಲೈಮ್‌ಗಳ ವಿಚಾರಣೆಯು ಜಿಲ್ಲಾ ಗ್ರಾಹಕ ಆಯೋಗದಲ್ಲಿ ಕನಿಷ್ಠ ಶುಲ್ಕದೊಂದಿಗೆ ನಡೆಯುತ್ತದೆ.',
      ],
      recommendedAuthority: 'ಜಿಲ್ಲಾ ಗ್ರಾಹಕ ವ್ಯಾಜ್ಯಗಳ ಪರಿಹಾರ ಆಯೋಗ (ಗ್ರಾಹಕ ವೇದಿಕೆ)',
      helpline: '1915 (ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಹಕ ಸಹಾಯವಾಣಿ)',
    },
    'topic-cyber': {
      title: 'ಸೈಬರ್ ಭದ್ರತೆ, ಡಿಜಿಟಲ್ ಆರ್ಥಿಕ ವಂಚನೆ ಮತ್ತು ಗೌಪ್ಯತೆ ಹಕ್ಕುಗಳು',
      shortDescription:
        'ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ ಹಣ ಮರಳಿ ಪಡೆಯುವುದು, ನಕಲಿ ಸಾಲ ಆ್ಯಪ್ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ತಡೆ ಮತ್ತು ಸುರಕ್ಷಿತ ದೂರು.',
      fullExplanation:
        'ಸೈಬರ್ ಅಪರಾಧವು ಹಣಕಾಸು ವಂಚನೆ, ಗುರುತಿನ ಕಳ್ಳತನ, ಅನಧಿಕೃತ ಪ್ರವೇಶ ಮತ್ತು ಆನ್‌ಲೈನ್ ಕಿರುಕುಳದ ಮೂಲಕ ಲಕ್ಷಾಂತರ ಜನರನ್ನು ಬಾಧಿಸುತ್ತದೆ. ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಕಾಯ್ದೆ 2000 ಮತ್ತು ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತೆಯ ಅಡಿಯಲ್ಲಿ ಅನಧಿಕೃತ ಡಿಜಿಟಲ್ ಪ್ರವೇಶ, ಫಿಶಿಂಗ್ ಮತ್ತು ಸಮ್ಮತಿಯಿಲ್ಲದೆ ಖಾಸಗಿ ಚಿತ್ರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದು ಕಠಿಣ ಜೈಲು ಶಿಕ್ಷೆ ಮತ್ತು ದಂಡ ವಿಧಿಸಬಹುದಾದ ಗಂಭೀರ ಅಪರಾಧಗಳಾಗಿವೆ.',
      primaryLaw: 'ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಕಾಯ್ದೆ, 2000 (ಸೆಕ್ಷನ್ 43, 66, 67) ಮತ್ತು BNS',
      keyRights: [
        'ಗೋಲ್ಡನ್ ಅವರ್ ಫ್ರೀಜ್: ಘಟನೆ ನಡೆದ 2 ಗಂಟೆಗಳಲ್ಲಿ 1930 ಗೆ ಕರೆ ಮಾಡುವುದರಿಂದ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ತಡೆಯಬಹುದು.',
        'ಡಿಜಿಟಲ್ ಗೌಪ್ಯತೆಯ ಹಕ್ಕು: ಕಂಪನಿಗಳು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಕಟ್ಟುನಿಟ್ಟಾದ ಭದ್ರತೆಯೊಂದಿಗೆ ರಕ್ಷಿಸಬೇಕು.',
        'ಸುಲಿಗೆಯಿಂದ ರಕ್ಷಣೆ: ನಕಲಿ ಲೋನ್ ಆ್ಯಪ್ ಅಥವಾ ತಿರುಚಿದ ಫೋಟೋಗಳ ಮೂಲಕ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುವುದು ಅಪರಾಧ.',
        'ಅನಾಮಧೇಯ ದೂರು ದಾಖಲಿಸುವ ಹಕ್ಕು: ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳು ತಮ್ಮ ಹೆಸರು ಬಹಿರಂಗಪಡಿಸದೆ ಅಶ್ಲೀಲ ವಿಷಯಗಳ ಬಗ್ಗೆ ದೂರು ನೀಡಬಹುದು.',
      ],
      whatToDoIfViolated: [
        'ಅನಧಿಕೃತ ಹಣ ಕಡಿತವಾದ ಮೊದಲ 2 ಗಂಟೆಗಳಲ್ಲಿ ತಕ್ಷಣ 1930 ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ.',
        'ವಹಿವಾಟಿನ ಯುಟಿಆರ್ (UTR) ಸಂಖ್ಯೆ, ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ ಮತ್ತು ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ.',
        'cybercrime.gov.in ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತಕ್ಷಣವೇ ಇ-ದೂರನ್ನು ನೋಂದಾಯಿಸಿ.',
        'ನಿಮ್ಮ ಬ್ಯಾಂಕಿಗೆ ಚಾರ್ಜ್-ಬ್ಯಾಕ್ ಪ್ರಕ್ರಿಯೆ ಪ್ರಾರಂಭಿಸಲು ಮತ್ತು ಫಲಾನುಭವಿ ಖಾತೆಯನ್ನು ಸ್ಥಗಿತಗೊಳಿಸಲು ಕೋರಿ.',
      ],
      recommendedAuthority: 'ಭಾರತೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಸಮನ್ವಯ ಕೇಂದ್ರ (I4C) / ಸ್ಥಳೀಯ ಸೈಬರ್ ಪೊಲೀಸ್ ಠಾಣೆ',
      helpline: '1930 (ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ವಂಚನೆ ತುರ್ತು ಸಹಾಯವಾಣಿ)',
    },
    'topic-women': {
      title: 'ಮಹಿಳಾ ಸುರಕ್ಷತೆ, ಘನತೆ ಮತ್ತು ಕೌಟುಂಬಿಕ ಹಾಗೂ ಕೆಲಸದ ಸ್ಥಳದ ದೌರ್ಜನ್ಯ ತಡೆ',
      shortDescription:
        'ಕೌಟುಂಬಿಕ ಹಿಂಸಾಚಾರ, ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳ (POSH), ಜೀರೋ ಎಫ್‌ಐಆರ್ ಮತ್ತು ಉಚಿತ ಕಾನೂನು ನೆರವು.',
      fullExplanation:
        'ಭಾರತೀಯ ಸಂವಿಧಾನ ಮತ್ತು ಕಾನೂನುಗಳು ಮಹಿಳೆಯರಿಗೆ ಬಲವಾದ ರಕ್ಷಣೆಗಳನ್ನು ನೀಡಿವೆ. ಕೌಟುಂಬಿಕ ದೌರ್ಜನ್ಯ ತಡೆ ಕಾಯ್ದೆ 2005 ರ ಅಡಿಯಲ್ಲಿ ಸುರಕ್ಷಿತ ಮನೆಯ ಹಕ್ಕು, ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆ (POSH) ಕಾಯ್ದೆ 2013, 26 ವಾರಗಳ ವೇತನ ಸಹಿತ ಹೆರಿಗೆ ರಜೆ, ದೇಶದ ಯಾವುದೇ ಪೊಲೀಸ್ ಠಾಣೆಯಲ್ಲಿ ಜೀರೋ ಎಫ್‌ಐಆರ್ ದಾಖಲಿಸುವ ಹಕ್ಕು ಮತ್ತು ಯಾವುದೇ ಆದಾಯದ ಮಿತಿಯಿಲ್ಲದೆ ನಾಲ್ಸಾ (NALSA) ಮೂಲಕ 100% ಉಚಿತ ಕಾನೂನು ನೆರವು ದೊರೆಯುತ್ತದೆ.',
      primaryLaw: 'ಕೌಟುಂಬಿಕ ದೌರ್ಜನ್ಯದಿಂದ ಮಹಿಳೆಯರ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ 2005 ಮತ್ತು POSH ಕಾಯ್ದೆ 2013',
      keyRights: [
        'ಜೀರೋ ಎಫ್‌ಐಆರ್: ಘಟನೆ ಎಲ್ಲಿಯೇ ನಡೆದಿದ್ದರೂ ಮಹಿಳೆಯು ಭಾರತದ ಯಾವುದೇ ಪೊಲೀಸ್ ಠಾಣೆಯಲ್ಲಿ ಎಫ್‌ಐಆರ್ ದಾಖಲಿಸಬಹುದು.',
        'ಬಂಧನ ನಿಯಮಗಳು: ಸೂರ್ಯಾಸ್ತದ ನಂತರ ಮತ್ತು ಸೂರ್ಯೋದಯಕ್ಕೂ ಮುನ್ನ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಆದೇಶವಿಲ್ಲದೆ ಮಹಿಳೆಯನ್ನು ಬಂಧಿಸುವಂತಿಲ್ಲ, ಕೇವಲ ಮಹಿಳಾ ಪೇದೆಯೇ ಬಂಧಿಸಬೇಕು.',
        'ಸ್ತ್ರೀಧನದ ಮೇಲಿನ ಹಕ್ಕು: ಮದುವೆಯ ಮೊದಲು ಅಥವಾ ಸಮಯದಲ್ಲಿ ಬಂದ ಎಲ್ಲಾ ಒಡವೆಗಳು ಮತ್ತು ಆಸ್ತಿಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಮಹಿಳೆಗೆ ಸೇರಿವೆ.',
        'ಕೆಲಸದ ಸ್ಥಳದ ರಕ್ಷಣೆ: 10 ಕ್ಕಿಂತ ಹೆಚ್ಚು ನೌಕರರಿರುವ ಪ್ರತಿಯೊಂದು ಸಂಸ್ಥೆಯಲ್ಲೂ ಆಂತರಿಕ ದೂರು ಸಮಿತಿ (ICC) ಇರಲೇಬೇಕು.',
        'ಉಚಿತ ಕಾನೂನು ನೆರವು: ಸೆಕ್ಷನ್ 12 ನಾಲ್ಸಾ ಅಡಿಯಲ್ಲಿ ಉಚಿತ ವಕೀಲರು, ಕೋರ್ಟ್ ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ಕಾನೂನು ಮಾರ್ಗದರ್ಶನದ ಹಕ್ಕು.',
      ],
      whatToDoIfViolated: [
        'ತುರ್ತು ವೈದ್ಯಕೀಯ, ಆಶ್ರಯ ಮತ್ತು ಕಾನೂನು ನೆರವಿಗಾಗಿ ಸಖಿ ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್ (OSC) ಅಥವಾ 181 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.',
        'ಕೆಲಸದ ಸ್ಥಳದ ಪ್ರಕರಣಗಳಿಗೆ 90 ದಿನಗಳೊಳಗೆ ಆಂತರಿಕ ಸಮಿತಿಗೆ (ICC) ಲಿಖಿತ ದೂರು ಸಲ್ಲಿಸಿ.',
        'ಜಿಲ್ಲಾ ನ್ಯಾಯಾಲಯದಲ್ಲಿರುವ ರಕ್ಷಣಾ ಅಧಿಕಾರಿ (Protection Officer) ಅಥವಾ ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರವನ್ನು (DLSA) ಸಂಪರ್ಕಿಸಿ.',
      ],
      recommendedAuthority: 'ರಾಷ್ಟ್ರೀಯ ಮಹಿಳಾ ಆಯೋಗ / ಸಖಿ ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್ / DLSA',
      helpline: '181 / 7827170170 (ಮಹಿಳಾ ಸಹಾಯವಾಣಿ)',
    },
    'topic-labour': {
      title: 'ಕಾರ್ಮಿಕರ ಹಕ್ಕುಗಳು, ವೇತನ ರಕ್ಷಣೆ ಮತ್ತು ಅಕ್ರಮ ವಜಾಗೊಳಿಸುವಿಕೆ ತಡೆ',
      shortDescription:
        'ಸಕಾಲಿಕ ವೇತನ ಬಿಡುಗಡೆ, ಗ್ರಾಚ್ಯುಟಿ ಹಕ್ಕು, ಪಿಎಫ್ ಜಮೆ, ನೋಟಿಸ್ ಅವಧಿ ಮತ್ತು ಕೆಲಸದ ಅವಧಿಯ ನಿಯಮಗಳು.',
      fullExplanation:
        'ಸಂಘಟಿತ ಮತ್ತು ಅಸಂಘಟಿತ ವಲಯದ ಉದ್ಯೋಗಿಗಳಿಗೆ ಕಾರ್ಮಿಕ ಸಂಹಿತೆಗಳಿಂದ ರಕ್ಷಣೆ ಇದೆ. ಉದ್ಯೋಗದಾತರು ಒಪ್ಪಂದದ ವೇತನವನ್ನು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಪಾವತಿಸಲು, ಭವಿಷ್ಯ ನಿಧಿ (ಪಿಎಫ್) ಜಮೆ ಮಾಡಲು, ಸುರಕ್ಷಿತ ಕೆಲಸದ ಸ್ಥಳ ನೀಡಲು, ನೋಟಿಸ್ ಅವಧಿಯನ್ನು ಗೌರವಿಸಲು ಮತ್ತು 5 ವರ್ಷಗಳ ಸೇವೆಯ ನಂತರ ಗ್ರಾಚ್ಯುಟಿ ನೀಡಲು ಕಾನೂನುಬದ್ಧವಾಗಿ ಬದ್ಧರಾಗಿದ್ದಾರೆ.',
      primaryLaw: 'ವೇತನ ಸಂಹಿತೆ, ಕೈಗಾರಿಕಾ ವಿವಾದಗಳ ಕಾಯ್ದೆ ಮತ್ತು ಗ್ರಾಚ್ಯುಟಿ ಪಾವತಿ ಕಾಯ್ದೆ',
      keyRights: [
        'ಸಕಾಲಿಕ ವೇತನ: ಪ್ರತಿ ತಿಂಗಳ 7 ಅಥವಾ 10 ನೇ ತಾರೀಖಿನೊಳಗೆ ಸಂಬಳ ಖಾತೆಗೆ ಜಮೆಯಾಗಬೇಕು.',
        'ಪೂರ್ಣ ಮತ್ತು ಅಂತಿಮ ಇತ್ಯರ್ಥ (F&F): ರಾಜೀನಾಮೆ ಅಥವಾ ವಜಾಗೊಳಿಸಿದ 2 ಕೆಲಸದ ದಿನಗಳೊಳಗೆ ಎಲ್ಲಾ ಬಾಕಿಗಳನ್ನು ತೀರಿಸಬೇಕು.',
        'ಗ್ರಾಚ್ಯುಟಿ ಹಕ್ಕು: ಸತತ 5 ವರ್ಷಗಳ ಸೇವೆಯ ನಂತರ ಪ್ರತಿ ವರ್ಷಕ್ಕೆ 15 ದಿನಗಳ ವೇತನದ ಗ್ರಾಚ್ಯುಟಿ ಖಾತರಿ.',
        'ಅಕ್ರಮ ಕಡಿತಗಳ ನಿಷೇಧ: ಉದ್ಯೋಗಿಯ ಗಳಿಕೆಯಿಂದ ಅಕ್ರಮ ದಂಡಗಳನ್ನು ಅಥವಾ ಅನಧಿಕೃತ ಮೊತ್ತವನ್ನು ಕಡಿತಗೊಳಿಸುವಂತಿಲ್ಲ.',
      ],
      whatToDoIfViolated: [
        'ಆಡಳಿತ ಮಂಡಳಿಗೆ ನೋಂದಾಯಿತ ಅಂಚೆ ಮತ್ತು ಇಮೇಲ್ ಮೂಲಕ ಬೇಡಿಕೆ ಪತ್ರ (Demand Letter) ಕಳುಹಿಸಿ.',
        'ಶ್ರಮ ಸುವಿಧಾ ಪೋರ್ಟಲ್ (shramsuvidha.gov.in) ಅಥವಾ ಸಮಾಧಾನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೂರು ನೀಡಿ.',
        'ರಾಜಿ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ಜಿಲ್ಲಾ ಕಾರ್ಮಿಕ ಸಂಧಾನ ಅಧಿಕಾರಿಯ ಬಳಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
        'ಸಂಬಳದಿಂದ ಪಿಎಫ್ ಕಡಿತಗೊಳಿಸಿ ಇಪಿಎಫ್‌ಒಗೆ ಜಮೆ ಮಾಡದಿದ್ದರೆ epfigms.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ.',
      ],
      recommendedAuthority: 'ಕಾರ್ಮಿಕ ಆಯುಕ್ತರ ಕಚೇರಿ / ನೌಕರರ ಭವಿಷ್ಯ ನಿಧಿ ಸಂಸ್ಥೆ (EPFO)',
      helpline: '14434 (ಕಾರ್ಮಿಕ ಸಚಿವಾಲಯ ಸಹಾಯವಾಣಿ)',
    },
    'topic-housing': {
      title: 'ಬಾಡಿಗೆದಾರರ ಹಕ್ಕುಗಳು: ಠೇವಣಿ ಮರುಪಾವತಿ, ಅಕ್ರಮ ತೆರವು ಮತ್ತು ಸೌಲಭ್ಯಗಳು',
      shortDescription:
        'ಅಕ್ರಮವಾಗಿ ಹೊರಹಾಕುವುದರ ವಿರುದ್ಧ ರಕ್ಷಣೆ, ಸೆಕ್ಯೂರಿಟಿ ಠೇವಣಿ ಮಿತಿ, ವಿದ್ಯುತ್ ಮತ್ತು ನೀರಿನ ಸೌಲಭ್ಯಗಳ ರಕ್ಷಣೆ.',
      fullExplanation:
        'ಬಾಡಿಗೆ ಸಂಬಂಧಗಳು ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ ಮತ್ತು ರಾಜ್ಯ ಬಾಡಿಗೆ ನಿಯಂತ್ರಣ ಕಾಯ್ದೆಗಳ ಅಡಿಯಲ್ಲಿ ಬರುತ್ತವೆ. ಮನೆಮಾಲೀಕರು 24 ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆಯಿಲ್ಲದೆ ಬಾಡಿಗೆ ಮನೆಗೆ ಪ್ರವೇಶಿಸುವಂತಿಲ್ಲ, ಖಾಲಿ ಮಾಡಿಸಲು ನೀರು ಅಥವಾ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸುವಂತಿಲ್ಲ ಮತ್ತು ಒಪ್ಪಂದ ಮುಗಿದ ನಂತರ ಠೇವಣಿ ಹಣವನ್ನು ತಕ್ಷಣ ಹಿಂದಿರುಗಿಸಬೇಕು.',
      primaryLaw: 'ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ ಮತ್ತು ರಾಜ್ಯ ಬಾಡಿಗೆ ನಿಯಂತ್ರಣ ಶಾಸನಗಳು',
      keyRights: [
        'ಠೇವಣಿ ಮಿತಿ: ವಸತಿ ಮನೆಗಳಿಗೆ ಗರಿಷ್ಠ 2 ತಿಂಗಳ ಬಾಡಿಗೆ ಮತ್ತು ವಾಣಿಜ್ಯ ಕಟ್ಟಡಗಳಿಗೆ 1 ತಿಂಗಳ ಬಾಡಿಗೆಯನ್ನು ಮಾತ್ರ ಠೇವಣಿಯಾಗಿ ಪಡೆಯಬಹುದು.',
        'ಮೂಲಭೂತ ಸೌಕರ್ಯ ರಕ್ಷಣೆ: ವಿದ್ಯುತ್ ಅಥವಾ ನೀರು ಕಡಿತಗೊಳಿಸುವುದು ಕಾನೂನುಬಾಹಿರ ಅಪರಾಧ.',
        'ಪರಿಶೀಲನೆಗೆ ಮುನ್ಸೂಚನೆ: ಮನೆ ಮಾಲೀಕರು ಪರಿಶೀಲನೆಗೆ ಬರುವ ಮುನ್ನ ಕನಿಷ್ಠ 24 ಗಂಟೆಗಳ ಮುಂಚಿತ ನೋಟಿಸ್ ನೀಡಬೇಕು.',
        'ಬಲವಂತದ ತೆರವು ತಡೆ: ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಮತ್ತು ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಯಿಲ್ಲದೆ ಬಾಡಿಗೆದಾರರನ್ನು ಹೊರಹಾಕುವಂತಿಲ್ಲ.',
      ],
      whatToDoIfViolated: [
        'ಸೌಲಭ್ಯಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿದರೆ ತಕ್ಷಣ ಸ್ಥಳೀಯ ಪೊಲೀಸರಿಗೆ ಅಥವಾ ಬಾಡಿಗೆ ಪ್ರಾಧಿಕಾರಕ್ಕೆ ದೂರು ನೀಡಿ.',
        'ಠೇವಣಿ ಹಿಡಿದಿಟ್ಟುಕೊಂಡಿದ್ದರೆ ಮನೆಮಾಲೀಕರಿಗೆ ವಕೀಲರ ಮೂಲಕ ಕಾನೂನು ನೋಟಿಸ್ ಕಳುಹಿಸಿ.',
        'ಬಾಡಿಗೆ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಅಥವಾ ಡಿಎಲ್‌ಎಸ್‌ಎ (DLSA) ಸಂಧಾನ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      ],
      recommendedAuthority: 'ಬಾಡಿಗೆ ಪ್ರಾಧಿಕಾರ / ಬಾಡಿಗೆ ನ್ಯಾಯಾಲಯ / ಉಪವಿಭಾಗಾಧಿಕಾರಿ (SDM)',
      helpline: '15100 (ಡಿಎಲ್‌ಎಸ್‌ಎ ಕಾನೂನು ಸೇವೆಗಳ ಸಹಾಯವಾಣಿ)',
    },
    'topic-police': {
      title: 'ಪೊಲೀಸ್ ವಿಚಾರಣೆ ಮತ್ತು ಬಂಧನದ ಸಮಯದಲ್ಲಿ ನಾಗರಿಕರ ಹಕ್ಕುಗಳು (ಡಿಕೆ ಬಸು ಮಾರ್ಗಸೂಚಿಗಳು)',
      shortDescription:
        'ಸುಪ್ರೀಂ ಕೋರ್ಟ್‌ನ ಮಹತ್ವದ ಡಿಕೆ ಬಸು ತೀರ್ಪು: ಬಂಧನದ ಕಾರಣ ತಿಳಿಯುವುದು, ಜೀರೋ ಎಫ್‌ಐಆರ್ ಮತ್ತು 24 ಗಂಟೆಗಳಲ್ಲಿ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಹಾಜರಾತಿ.',
      fullExplanation:
        'ಸಂವಿಧಾನದ 21 ಮತ್ತು 22 ನೇ ವಿಧಿಗಳ ಅಡಿಯಲ್ಲಿ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನಿಗೂ ಮೂಲಭೂತ ಹಕ್ಕುಗಳಿವೆ. ಡಿ.ಕೆ. ಬಸು ವಿರುದ್ಧ ಪಶ್ಚಿಮ ಬಂಗಾಳ ರಾಜ್ಯ ಪ್ರಕರಣದಲ್ಲಿ ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ನೀಡಿದ ತೀರ್ಪು ಮತ್ತು ಭಾರತೀಯ ನಾಗರಿಕ ಸುರಕ್ಷಾ ಸಂಹಿತೆಯು (BNSS) ಬಂಧನದ ವೇಳೆ ಪೊಲೀಸರು ಪಾಲಿಸಲೇಬೇಕಾದ ಕಡ್ಡಾಯ ನಿಯಮಗಳನ್ನು ರೂಪಿಸಿದೆ.',
      primaryLaw: 'ಭಾರತೀಯ ಸಂವಿಧಾನ (ವಿಧಿ 21, 22) ಮತ್ತು BNSS / CrPC',
      keyRights: [
        'ಬಂಧನದ ಕಾರಣ ತಿಳಿಯುವ ಹಕ್ಕು: ಪೊಲೀಸರು ತಕ್ಷಣವೇ ಯಾವ ಅಪರಾಧಕ್ಕಾಗಿ ಬಂಧಿಸಲಾಗುತ್ತಿದೆ ಎಂಬುದನ್ನು ತಿಳಿಸಬೇಕು.',
        'ವಕೀಲರ ನೆರವಿನ ಹಕ್ಕು: ನಿಮ್ಮಿಷ್ಟದ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಲು ಮತ್ತು ರಕ್ಷಣೆ ಪಡೆಯಲು ನಿಮಗೆ ಪೂರ್ಣ ಹಕ್ಕಿದೆ.',
        'ಕುಟುಂಬಕ್ಕೆ ತಿಳಿಸುವ ಹಕ್ಕು: ಬಂಧಿಸಿದ 8-12 ಗಂಟೆಗಳೊಳಗೆ ನಿಮ್ಮ ಕುಟುಂಬದವರಿಗೆ ಅಥವಾ ಸ್ನೇಹಿತರಿಗೆ ಪೊಲೀಸರು ಮಾಹಿತಿ ನೀಡಬೇಕು.',
        '24 ಗಂಟೆಗಳ ಕಡ್ಡಾಯ ನಿಯಮ: ಬಂಧಿತ ವ್ಯಕ್ತಿಯನ್ನು 24 ಗಂಟೆಗಳ ಒಳಗೆ ಹತ್ತಿರದ ನ್ಯಾಯಾಂಗ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಮುಂದೆ ಹಾಜರುಪಡಿಸಬೇಕು.',
        'ವೈದ್ಯಕೀಯ ತಪಾಸಣೆಯ ಹಕ್ಕು: ಬಂಧನದ ಸಮಯದಲ್ಲಿ ಮತ್ತು ಕಸ್ಟಡಿಯಲ್ಲಿದ್ದಾಗ ಪ್ರತಿ 48 ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ಸ್ವತಂತ್ರ ವೈದ್ಯರಿಂದ ತಪಾಸಣೆ ಕೋರಬಹುದು.',
        'ಅರೆಸ್ಟ್ ಮೆಮೊ: ಸಾಕ್ಷಿಯೊಬ್ಬರ ಸಮ್ಮುಖದಲ್ಲಿ ಅಧಿಕೃತ ಬಂಧನ ಜ್ಞಾಪನಾ ಪತ್ರವನ್ನು (Arrest Memo) ಸಿದ್ಧಪಡಿಸಬೇಕು.',
      ],
      whatToDoIfViolated: [
        'ಪೊಲೀಸ್ ಅಧಿಕಾರಿಯ ಅಧಿಕೃತ ನೇಮ್ ಬ್ಯಾಡ್ಜ್ ಮತ್ತು ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ಕೇಳಿ.',
        'ತಕ್ಷಣ ಕುಟುಂಬಕ್ಕೆ ಮಾಹಿತಿ ನೀಡಿ ಮತ್ತು ಯಾವ ಪೊಲೀಸ್ ಠಾಣೆ ಎಂದು ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಸಿ.',
        'ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರದಿಂದ (LADCS) ಉಚಿತ ಕರ್ತವ್ಯ ವಕೀಲರನ್ನು ಒದಗಿಸಲು ವಿನಂತಿಸಿ.',
        'ಕಸ್ಟಡಿಯಲ್ಲಿ ಹಲ್ಲೆ ಅಥವಾ ಅಕ್ರಮ ಬಂಧನವಾಗಿದ್ದರೆ, ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಮುಂದೆ ಹಾಜರುಪಡಿಸಿದಾಗ ನೇರವಾಗಿ ದೂರು ನೀಡಿ.',
      ],
      recommendedAuthority: 'ನ್ಯಾಯಾಂಗ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ / ರಾಜ್ಯ ಮಾನವ ಹಕ್ಕುಗಳ ಆಯೋಗ (SHRC) / ಎಸ್ಪಿ ಕಚೇರಿ',
      helpline: '112 / 14433 (ಮಾನವ ಹಕ್ಕುಗಳ ಸಹಾಯವಾಣಿ)',
    },
    'topic-rti': {
      title: 'ಮಾಹಿತಿ ಹಕ್ಕು (RTI): ಸರ್ಕಾರಿ ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಜವಾಬ್ದಾರಿ ಕೋರುವುದು',
      shortDescription:
        'ಕೇವಲ ₹10 ಶುಲ್ಕದಲ್ಲಿ ಆರ್‌ಟಿಐ ಅರ್ಜಿ, 30 ದಿನಗಳಲ್ಲಿ ಕಡ್ಡಾಯ ಉತ್ತರ ಮತ್ತು ಮಾಹಿತಿ ಆಯೋಗಕ್ಕೆ ಮೇಲ್ಮನವಿ.',
      fullExplanation:
        'ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ 2005 ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯ ನಾಗರಿಕನಿಗೂ ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳನ್ನು ಪ್ರಶ್ನಿಸಲು, ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ದಾಖಲೆಗಳ ಪ್ರಮಾಣೀಕೃತ ಪ್ರತಿಗಳನ್ನು ಪಡೆಯಲು ಅಧಿಕಾರ ನೀಡುತ್ತದೆ. ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿಗಳು (PIO) 30 ದಿನಗಳೊಳಗೆ ಮಾಹಿತಿ ನೀಡಲು ಕಾನೂನುಬದ್ಧವಾಗಿ ಬದ್ಧರಾಗಿದ್ದಾರೆ (ಜೀವ ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದಾದರೆ 48 ಗಂಟೆಗಳು).',
      primaryLaw: 'ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ, 2005',
      keyRights: [
        '30 ದಿನಗಳ ಕಡ್ಡಾಯ ಉತ್ತರ: ಕೋರಿದ ಮಾಹಿತಿಯನ್ನು 30 ಕ್ಯಾಲೆಂಡರ್ ದಿನಗಳೊಳಗೆ ಒದಗಿಸಬೇಕು.',
        'ಜೀವ ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯದ ನಿಯಮ: ವ್ಯಕ್ತಿಯ ಜೀವ ಅಥವಾ ಸ್ವಾತಂತ್ರ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಯನ್ನು 48 ಗಂಟೆಗಳೊಳಗೆ ನೀಡಬೇಕು.',
        'ಕಡಿಮೆ ವೆಚ್ಚ: ಕೇಂದ್ರ ಆರ್‌ಟಿಐ ಅರ್ಜಿ ಶುಲ್ಕ ಕೇವಲ ₹10 (ಬಿಪಿಎಲ್ ಕುಟುಂಬಗಳಿಗೆ ಸಂಪೂರ್ಣ ಉಚಿತ).',
        'ಅಧಿಕಾರಿಗಳಿಗೆ ದಂಡ: ಕಾರಣವಿಲ್ಲದೆ ವಿಳಂಬ ಮಾಡಿದರೆ ಪಿಐಒಗೆ ದಿನಕ್ಕೆ ₹250 ರಂತೆ ಗರಿಷ್ಠ ₹25,000 ವರೆಗೆ ವೈಯಕ್ತಿಕ ದಂಡ.',
      ],
      whatToDoIfViolated: [
        'ಗಡುವು ಮುಗಿದ 30 ದಿನಗಳೊಳಗೆ ಪ್ರಥಮ ಮೇಲ್ಮನವಿ ಪ್ರಾಧಿಕಾರಕ್ಕೆ (FAA) ಮೊದಲ ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಿ.',
        'ಪ್ರಥಮ ಮೇಲ್ಮನವಿಗೆ ಸ್ಪಂದಿಸದಿದ್ದರೆ ಕೇಂದ್ರ ಅಥವಾ ರಾಜ್ಯ ಮಾಹಿತಿ ಆಯೋಗಕ್ಕೆ ಎರಡನೇ ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಿ.',
      ],
      recommendedAuthority: 'ಕೇಂದ್ರ ಮಾಹಿತಿ ಆಯೋಗ (CIC) / ರಾಜ್ಯ ಮಾಹಿತಿ ಆಯೋಗ',
      helpline: '011-26183027 (ಕೇಂದ್ರ ಮಾಹಿತಿ ಆಯೋಗ ಸಹಾಯವಾಣಿ)',
    },
    'topic-students': {
      title: 'ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು: ರ‌್ಯಾಗಿಂಗ್ ತಡೆ, ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ಮೂಲ ದಾಖಲೆಗಳು',
      shortDescription:
        'ಯುಜಿಸಿ ಮಾರ್ಗಸೂಚಿಗಳು: ಶುಲ್ಕ ಮರುಪಾವತಿ ಕಡ್ಡಾಯ, ಮೂಲ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ತಡೆಹಿಡಿಯುವಂತಿಲ್ಲ ಮತ್ತು ರ‌್ಯಾಗಿಂಗ್ ನಿಷೇಧ.',
      fullExplanation:
        'ಯುನಿವರ್ಸಿಟಿ ಗ್ರಾಂಟ್ಸ್ ಕಮಿಷನ್ (UGC) ಮತ್ತು AICTE ನಿಯಮಗಳ ಪ್ರಕಾರ ಕಾಲೇಜುಗಳು ವಿದ್ಯಾರ್ಥಿಗಳ ಮೂಲ ಅಂಕಪಟ್ಟಿಗಳು ಅಥವಾ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ತಮ್ಮಲ್ಲೇ ಇಟ್ಟುಕೊಳ್ಳುವಂತಿಲ್ಲ. ಪ್ರವೇಶ ರದ್ದುಗೊಳಿಸಿದರೆ ನಿಗದಿತ ನಿಯಮಗಳಂತೆ ಶುಲ್ಕ ಮರುಪಾವತಿಸಬೇಕು ಮತ್ತು ರ‌್ಯಾಗಿಂಗ್ ವಿರುದ್ಧ ಶೂನ್ಯ ಸಹಿಷ್ಣುತೆ ಹೊಂದಿರಬೇಕು.',
      primaryLaw: 'ಯುಜಿಸಿ ಶುಲ್ಕ ಮರುಪಾವತಿ ನಿಯಮಗಳು ಮತ್ತು ಆ್ಯಂಟಿ-ರ‌್ಯಾಗಿಂಗ್ ನಿಬಂಧನೆಗಳು 2009',
      keyRights: [
        'ಮೂಲ ದಾಖಲೆಗಳ ರಕ್ಷಣೆ: ಕಾಲೇಜುಗಳಿಗೆ ಮೂಲ ದಾಖಲೆಗಳನ್ನು ವಶಪಡಿಸಿಕೊಳ್ಳುವ ಯಾವುದೇ ಕಾನೂನು ಹಕ್ಕಿಲ್ಲ.',
        'ಶುಲ್ಕ ಮರುಪಾವತಿ: ಕೌನ್ಸಿಲಿಂಗ್ ಸಮಯದಲ್ಲಿ ಪ್ರವೇಶ ರದ್ದುಪಡಿಸಿದರೆ ಅನುಪಾತದಂತೆ ಶುಲ್ಕ ಮರಳಿ ಪಡೆಯುವ ಹಕ್ಕು.',
        'ರ‌್ಯಾಗಿಂಗ್ ವಿರೋಧಿ ರಕ್ಷಣೆ: ರ‌್ಯಾಗಿಂಗ್ ಗಂಭೀರ ಅಪರಾಧ; ನಿರ್ಲಕ್ಷ್ಯ ತೋರುವ ಸಂಸ್ಥೆಗಳ ಮಾನ್ಯತೆ ರದ್ದಾಗಬಹುದು.',
        'ಕುಂದುಕೊರತೆ ನಿವಾರಣೆ: ಪ್ರತಿಯೊಂದು ಉನ್ನತ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಲ್ಲೂ ವಿದ್ಯಾರ್ಥಿ ಕುಂದುಕೊರತೆ ನಿವಾರಣಾ ಸಮಿತಿ (SGRC) ಇರಬೇಕು.',
      ],
      whatToDoIfViolated: [
        'ಯುಜಿಸಿ ಇ-ಸಮಾಧಾನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (samadhan.ugc.ac.in) ನಿಮ್ಮ ಅಧಿಕೃತ ದೂರು ನೋಂದಾಯಿಸಿ.',
        'ರ‌್ಯಾಗಿಂಗ್ ಘಟನೆಗಳಿಗೆ ತಕ್ಷಣವೇ 24x7 ಟೋಲ್ ಫ್ರೀ ಸಂಖ್ಯೆ 1800-180-5522 ಗೆ ಕರೆ ಮಾಡಿ.',
        'ಅನ್ಯಾಯವಾಗಿ ಶುಲ್ಕ ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಂಡರೆ ಗ್ರಾಹಕ ಆಯೋಗದ ಮೊರೆ ಹೋಗಿ.',
      ],
      recommendedAuthority: 'ಯುಜಿಸಿ ಇ-ಸಮಾಧಾನ / ರಾಷ್ಟ್ರೀಯ ಆ್ಯಂಟಿ-ರ‌್ಯಾಗಿಂಗ್ ಕೋಶ',
      helpline: '1800-180-5522 (ರಾಷ್ಟ್ರೀಯ ಆ್ಯಂಟಿ-ರ‌್ಯಾಗಿಂಗ್ ಟೋಲ್ ಫ್ರೀ)',
    },
    'topic-seniors': {
      title: 'ಹಿರಿಯ ನಾಗರಿಕರ ರಕ್ಷಣೆ, ಜೀವನಾಧಾರ ಭತ್ಯೆ ಮತ್ತು ಆಸ್ತಿ ರಕ್ಷಣಾ ಹಕ್ಕುಗಳು',
      shortDescription:
        'ಎಸ್‌ಡಿಎಂ ನಿರ್ವಹಣಾ ನ್ಯಾಯಮಂಡಳಿ ಆದೇಶಗಳು, ಪೋಷಕರನ್ನು ಉಪೇಕ್ಷಿಸಿದರೆ ಗಿಫ್ಟ್ ಡೀಡ್ ರದ್ದು ಮತ್ತು ಆದ್ಯತೆಯ ಆರೋಗ್ಯ ಸೇವೆ.',
      fullExplanation:
        'ಪೋಷಕರು ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರ ನಿರ್ವಹಣೆ ಮತ್ತು ಕಲ್ಯಾಣ ಕಾಯ್ದೆ 2007 ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ (60 ವರ್ಷ ಮೇಲ್ಪಟ್ಟವರಿಗೆ) ಮಕ್ಕಳು ಅಥವಾ ಉತ್ತರಾಧಿಕಾರಿಗಳಿಂದ ಮಾಸಿಕ ಜೀವನಾಧಾರ ಭತ್ಯೆ ಪಡೆಯಲು ವಕೀಲರಿಲ್ಲದ ತ್ವರಿತ ವೇದಿಕೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ. ಪೋಷಕರನ್ನು ನೋಡಿಕೊಳ್ಳದಿದ್ದರೆ ಮಕ್ಕಳಿಗೆ ನೀಡಿದ ಆಸ್ತಿ ದಾನಪತ್ರವನ್ನು (Gift Deed) ರದ್ದುಗೊಳಿಸಲು ಕಾಯ್ದೆಯಲ್ಲಿ ಅವಕಾಶವಿದೆ.',
      primaryLaw: 'ಪೋಷಕರು ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರ ನಿರ್ವಹಣೆ ಹಾಗೂ ಕಲ್ಯಾಣ ಕಾಯ್ದೆ, 2007',
      keyRights: [
        'ಮಾಸಿಕ ಭತ್ಯೆಯ ಹಕ್ಕು: ಮಕ್ಕಳು/ವಾರಸುದಾರರು ಆಹಾರ, ಬಟ್ಟೆ, ಆಶ್ರಯ ಮತ್ತು ವೈದ್ಯಕೀಯ ವೆಚ್ಚಗಳನ್ನು ಒದಗಿಸಲು ಬದ್ಧರು.',
        'ಆಸ್ತಿ ವರ್ಗಾವಣೆ ರದ್ಧತಿ: ಸೆಕ್ಷನ್ 23 ರ ಪ್ರಕಾರ, ಪೋಷಕರನ್ನು ನಿರ್ಲಕ್ಷಿಸಿದರೆ ಮಕ್ಕಳಿಗೆ ನೀಡಿದ ಆಸ್ತಿಯನ್ನು ವಾಪಸ್ ಪಡೆಯಬಹುದು.',
        'ತ್ವರಿತ ವಿಚಾರಣೆ: ಎಸ್‌ಡಿಎಂ ನೇತೃತ್ವದ ನ್ಯಾಯಮಂಡಳಿಯು 90 ದಿನಗಳೊಳಗೆ ಪ್ರಕರಣಗಳನ್ನು ಇತ್ಯರ್ಥಪಡಿಸುತ್ತದೆ.',
        'ಹಿರಿಯರ ಪರಿತ್ಯಾಗಕ್ಕೆ ಶಿಕ್ಷೆ: ಹಿರಿಯ ನಾಗರಿಕರನ್ನು ಅನಾಥವಾಗಿ ಬಿಡುವುದು ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧವಾಗಿದೆ.',
      ],
      whatToDoIfViolated: [
        'ಉಚಿತ ಸಮಾಲೋಚನೆ ಮತ್ತು ತುರ್ತು ನೆರವಿಗಾಗಿ ಎಲ್ಡರ್‌ಲೈನ್ 14567 ಗೆ ಕರೆ ಮಾಡಿ.',
        'ಉಪವಿಭಾಗಾಧಿಕಾರಿ (SDM) / ನಿರ್ವಹಣಾ ನ್ಯಾಯಮಂಡಳಿಗೆ ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
        'ಜಿಲ್ಲಾ ಸಮಾಜ ಕಲ್ಯಾಣಾಧಿಕಾರಿ ಅಥವಾ ಡಿಎಲ್‌ಎಸ್‌ಎ (DLSA) ಕಚೇರಿಯಿಂದ ಉಚಿತ ಕಾನೂನು ನೆರವು ಪಡೆಯಿರಿ.',
      ],
      recommendedAuthority: 'ಎಸ್‌ಡಿಎಂ ನಿರ್ವಹಣಾ ನ್ಯಾಯಮಂಡಳಿ / ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ',
      helpline: '14567 (ಎಲ್ಡರ್‌ಲೈನ್ ಹಿರಿಯ ನಾಗರಿಕರ ರಾಷ್ಟ್ರೀಯ ಸಹಾಯವಾಣಿ)',
    },
  },

  Tamil: {
    'topic-consumer': {
      title: 'நுகர்வோர் பாதுகாப்பு மற்றும் குறைபாடுள்ள பொருட்கள்/சேவைகள்',
      shortDescription:
        'குறைபாடுள்ள பொருட்கள், தவறான விளம்பரங்கள் மற்றும் நியாயமற்ற வர்த்தக நடைமுறைகளுக்கு எதிரான உங்கள் சட்டப்பூர்வ உரிமைகள்.',
      fullExplanation:
        'நுகர்வோர் பாதுகாப்புச் சட்டம் 2019-ன் கீழ், ஒவ்வொரு இந்திய நுகர்வோருக்கும் சேவை குறைபாடு, நியாயமற்ற ஒப்பந்த விதிமுறைகள், அதிக விலை வசூலித்தல் மற்றும் தரமற்ற பொருட்களுக்கு எதிராக முழுமையான சட்டப் பாதுகாப்பு உள்ளது. நீங்கள் உள்ளூர் கடையில் வாங்கினாலும் அல்லது இணையதளத்தில் வாங்கினாலும், வாக்குறுதியளித்தபடி பொருட்களை வழங்க வணிகங்கள் கடமைப்பட்டுள்ளன.',
      primaryLaw: 'நுகர்வோர் பாதுகாப்புச் சட்டம், 2019 & மின்-வணிக விதிகள், 2020',
      keyRights: [
        'பாதுகாப்பு உரிமை: உயிருக்கு அல்லது உடமைக்கு ஆபத்தான பொருட்கள் மற்றும் சேவைகளிலிருந்து பாதுகாப்பு.',
        'தகவல் அறியும் உரிமை: தரம், அளவு, தூய்மை, தரம் மற்றும் சரியான விலை பற்றிய துல்லியமான தகவல்கள்.',
        'பரிகாரம் பெறும் உரிமை: குறைபாடுள்ள பொருட்கள் அல்லது சேவைகளுக்கான இழப்பீடு மற்றும் பணத்தைத் திரும்பப் பெறுதல்.',
        'தவறான விளம்பரங்களுக்கு எதிரான உரிமை: தவறான விளம்பரங்களை வெளியிடும் நிறுவனங்கள் மற்றும் விளம்பரதாரர்கள் மீது கடுமையான அபராதம்.',
        'பொருள் பொறுப்பு: குறைபாடுள்ள பொருளால் ஏற்படும் எந்தவொரு பாதிப்பிற்கும் உற்பத்தியாளர் மற்றும் விற்பனையாளர் பொறுப்பேற்க வேண்டும்.',
      ],
      whatToDoIfViolated: [
        'ஆர்டர் எண், ரசீது மற்றும் புகாரின் விவரங்களுடன் முறையான எழுத்துப்பூர்வ புகாரைத் தயாரிக்கவும்.',
        'தேசிய நுகர்வோர் உதவி எண் 1915-ஐ அழைக்கவும் அல்லது 8800001915-க்கு வாட்ஸ்அப் செய்தி அனுப்பவும்.',
        'consumerhelpline.gov.in-ல் பதிவு செய்யவும் அல்லது e-Daakhil (edaakhil.nic.in) மூலம் ஆன்லைனில் வழக்குத் தொடரவும்.',
        '₹50 லட்சம் வரையிலான கோரிக்கைகள் மாவட்ட நுகர்வோர் ஆணையத்தில் குறைந்த கட்டணத்தில் விசாரிக்கப்படும்.',
      ],
      recommendedAuthority: 'மாவட்ட நுகர்வோர் தகராறுகள் தீர்வு ஆணையம் (நுகர்வோர் நீதிமன்றம்)',
      helpline: '1915 (தேசிய நுகர்வோர் உதவி எண்)',
    },
    'topic-cyber': {
      title: 'இணையப் பாதுகாப்பு, டிஜிட்டல் நிதி மோசடி மற்றும் ஆன்லைன் துன்புறுத்தல்',
      shortDescription:
        'கோல்டன் ஹவர்-க்குள் இழந்த பணத்தை மீட்டல், போலி கடன் செயலி அச்சுறுத்தலை எதிர்கொள்ளுதல் மற்றும் பாதுகாப்பான புகார்.',
      fullExplanation:
        'இணையக் குற்றங்கள் நிதி மோசடி, அடையாளத் திருட்டு, அனுமதியற்ற பயன்பாடு மற்றும் ஆன்லைன் துன்புறுத்தல் மூலம் பலரை பாதிக்கின்றன. தகவல் தொழில்நுட்பச் சட்டம் 2000 மற்றும் பாரதிய நியாய சன்ஹிதாவின் கீழ், அனுமதியற்ற டிஜிட்டல் அணுகல், வங்கி ஃபிஷிங் மற்றும் அந்தரங்கப் படங்களை அனுமதியின்றி பரப்புவது கடுமையான தண்டனைக்குரிய குற்றங்களாகும்.',
      primaryLaw: 'தகவல் தொழில்நுட்ப சட்டம், 2000 (பிரிவு 43, 66, 67) & BNS',
      keyRights: [
        'கோல்டன் ஹவர் முடக்கம்: சம்பவம் நடந்த 2 மணி நேரத்திற்குள் 1930-ஐ அழைப்பதன் மூலம் வங்கிப் பரிவர்த்தனையை முடக்கலாம்.',
        'டிஜிட்டல் தனியுரிமை உரிமை: நிறுவனங்கள் உங்கள் தனிப்பட்ட தரவை கடுமையான பாதுகாப்புடன் பாதுகாக்க வேண்டும்.',
        'பயமுறுத்தி பணம் பறிப்பதில் இருந்து பாதுகாப்பு: போலி லோன் ஆப் அல்லது மார்ஃபிங் படங்கள் மூலம் மிரட்டுவது தண்டனைக்குரிய குற்றம்.',
        'பெயர் வெளியிடாமல் புகார் செய்யும் உரிமை: பெண்கள் மற்றும் குழந்தைகள் தங்களின் அடையாளத்தை மறைத்து ஆபாச உள்ளடக்கம் குறித்து புகார் செய்யலாம்.',
      ],
      whatToDoIfViolated: [
        'அனுமதியற்ற வங்கிப் பரிவர்த்தனை நடந்த முதல் 2 மணி நேரத்திற்குள் உடனே 1930-ஐ அழைக்கவும்.',
        'பரிவர்த்தனை UTR எண், வங்கிக் கணக்கு விவரங்கள் மற்றும் ஸ்கிரீன்ஷாட்களை சேகரிக்கவும்.',
        'cybercrime.gov.in போர்ட்டலில் உடனடியாக மின்-புகாரைப் பதிவு செய்யவும்.',
        'சார்ஜ்-பேக் தொடங்கவும் பயனாளி கணக்கை முடக்கவும் உங்கள் வங்கியை அணுகவும்.',
      ],
      recommendedAuthority: 'இந்திய சைபர் கிரைம் ஒருங்கிணைப்பு மையம் (I4C) / உள்ளூர் சைபர் காவல் பிரிவு',
      helpline: '1930 (தேசிய இணைய நிதி மோசடி உதவி எண்)',
    },
    'topic-women': {
      title: 'பெண்கள் பாதுகாப்பு, கண்ணியம் மற்றும் பணியிடப் பாலியல் துன்புறுத்தல் தடுப்பு',
      shortDescription:
        'குடும்ப வன்முறை, பணியிடப் பாலியல் துன்புறுத்தல் (POSH), ஜீரோ எஃப்.ஐ.ஆர் மற்றும் இலவச சட்ட உதவி.',
      fullExplanation:
        'இந்திய சட்டம் பெண்களுக்கு வலுவான அரசியலமைப்பு பாதுகாப்புகளை வழங்குகிறது. குடும்ப வன்முறை பாதுகாப்புச் சட்டம் 2005, பணியிடப் பாலியல் துன்புறுத்தல் தடுப்பு (POSH) சட்டம் 2013, 26 வார கால சம்பளத்துடன் கூடிய மகப்பேறு விடுப்பு, ஜீரோ எஃப்.ஐ.ஆர் பதிவு செய்யும் உரிமை மற்றும் நல்சா (NALSA) மூலம் 100% இலவச சட்ட உதவி ஆகியவை இதில் அடங்கும்.',
      primaryLaw: 'குடும்ப வன்முறையிலிருந்து பெண்களைப் பாதுகாக்கும் சட்டம் 2005 & POSH சட்டம் 2013',
      keyRights: [
        'ஜீரோ எஃப்.ஐ.ஆர்: குற்றம் எங்கு நடந்திருந்தாலும், ஒரு பெண் இந்தியாவில் உள்ள எந்தவொரு காவல் நிலையத்திலும் எஃப்.ஐ.ஆர் பதிவு செய்யலாம்.',
        'கைது விதிமுறைகள்: சூரிய அஸ்தமனத்திற்குப் பின்னரும் சூரிய உதயத்திற்கு முன்னரும் பெண் காவலரைக் கொண்டே அன்றி பெண்களைக் கைது செய்யக்கூடாது.',
        'ஸ்ரீதன உரிமை: திருமணத்திற்கு முன்னரோ பின்னரோ கொடுக்கப்பட்ட அனைத்து நகைகளும் பொருட்களும் பெண்ணுக்கே சொந்தமானவை.',
        'பணியிடப் பாதுகாப்பு: 10-க்கும் மேற்பட்ட பணியாளர்களைக் கொண்ட ஒவ்வொரு நிறுவனத்திலும் உள் புகார்கள் குழு (ICC) இருக்க வேண்டும்.',
        'இலவச சட்ட உதவி: பிரிவு 12 நல்சா-வின் கீழ் இலவச வழக்கறிஞர், நீதிமன்றக் கட்டண விலக்கு மற்றும் சட்ட ஆலோசனைகள்.',
      ],
      whatToDoIfViolated: [
        'சகி ஒன் ஸ்டாப் மையம் (OSC) அல்லது 181 உதவி எண்ணைத் தொடர்பு கொள்ளவும்.',
        'பணியிடப் புகார்களுக்கு 90 நாட்களுக்குள் உள் புகார்கள் குழுவிடம் (ICC) எழுத்துப்பூர்வமாகப் புகார் அளிக்கவும்.',
        'மாவட்ட நீதிமன்றத்தில் உள்ள பாதுகாப்பு அலுவலர் அல்லது மாவட்ட சட்ட சேவைகள் ஆணையத்தை (DLSA) அணுகவும்.',
      ],
      recommendedAuthority: 'தேசிய மகளிர் ஆணையம் / சகி ஒன் ஸ்டாப் மையம் / DLSA',
      helpline: '181 / 7827170170 (மகளிர் உதவி எண்)',
    },
    'topic-labour': {
      title: 'தொழிலாளர் உரிமைகள், ஊதியப் பாதுகாப்பு மற்றும் நியாயமற்ற பணிநீக்கம்',
      shortDescription:
        'சரியான நேரத்தில் சம்பளம், பணிக்கொடை (Gratuity), பி.எஃப் வைப்பு, நோட்டீஸ் காலம் மற்றும் வேலை நேர வரம்புகள்.',
      fullExplanation:
        'தொழிலாளர் சட்டங்கள் ஊழியர்களுக்கு முழுமையான பாதுகாப்பை வழங்குகின்றன. முதலாளிகள் ஒப்புக்கொண்ட ஊதியத்தை சரியான நேரத்தில் வழங்கவும், பி.எஃப் தொகையைச் செலுத்தவும், பாதுகாப்பான பணியிடத்தை வழங்கவும், 5 ஆண்டுகள் பணி முடித்த பின் பணிக்கொடை (Gratuity) வழங்கவும் கடமைப்பட்டுள்ளனர்.',
      primaryLaw: 'ஊதியக் குறியீடு, தொழில்துறை தகராறுகள் சட்டம் & பணிக்கொடை சட்டம்',
      keyRights: [
        'சரியான நேரத்தில் ஊதியம்: ஒவ்வொரு மாதமும் 7 அல்லது 10-ஆம் தேதிக்குள் ஊதியம் வழங்கப்பட வேண்டும்.',
        'முழுமையான தீர்வு (F&F): ராஜினாமா செய்த 2 வேலை நாட்களுக்குள் அனைத்து நிலுவைத் தொகைகளும் வழங்கப்பட வேண்டும்.',
        'பணிக்கொடை: 5 ஆண்டுகள் தொடர் பணிக்குப் பிறகு ஒவ்வொரு ஆண்டிற்கும் 15 நாட்கள் ஊதியம் பணிக்கொடையாகக் கிடைக்கும்.',
        'சட்டவிரோத பிடித்தங்கள் தடை: ஊதியத்திலிருந்து தன்னிச்சையான அபராதங்களை கழிக்க முடியாது.',
      ],
      whatToDoIfViolated: [
        'நிர்வாகத்திற்குப் பதிவுத் தபால் மற்றும் மின்னஞ்சல் மூலம் கோரிக்கை கடிதம் அனுப்பவும்.',
        'ஷ்ரம் சுவிதா போர்ட்டலில் (shramsuvidha.gov.in) புகார் அளிக்கவும்.',
        'சமரசம் செய்ய மாவட்ட தொழிலாளர் சமரச அதிகாரியை அணுகவும்.',
        'சம்பளத்திலிருந்து பிடித்தம் செய்த பி.எஃப் தொகை செலுத்தப்படாவிட்டால் epfigms.gov.in-ல் புகார் செய்யவும்.',
      ],
      recommendedAuthority: 'தொழிலாளர் ஆணையர் அலுவலகம் / இ.பி.எஃப்.ஓ (EPFO)',
      helpline: '14434 (தொழிலாளர் அமைச்சக உதவி எண்)',
    },
    'topic-housing': {
      title: 'வாடகைதாரர் உரிமைகள்: முன்பணம், சட்டவிரோத வெளியேற்றம் மற்றும் வசதிகள்',
      shortDescription:
        'சட்டவிரோத வெளியேற்றத்திற்கு எதிரான பாதுகாப்பு, முன்பண வரம்பு, மின்சாரம் மற்றும் தண்ணீர் வசதிகள் பாதுகாப்பு.',
      fullExplanation:
        'மாதிரி வாடகை சட்டம் மற்றும் மாநில வாடகைக் கட்டுப்பாட்டுச் சட்டங்களின்படி, வீட்டு உரிமையாளர் 24 மணி நேர முன்னறிவிப்பின்றி வீட்டிற்குள் நுழைய முடியாது. வீட்டை காலி செய்ய மிரட்டுவதற்காக மின்சாரம் அல்லது தண்ணீரைத் துண்டிக்கக் கூடாது. ஒப்பந்தம் முடிந்ததும் முன்பணத்தை உடனடியாகத் திருப்பித் தர வேண்டும்.',
      primaryLaw: 'மாதிரி வாடகை சட்டம் மற்றும் மாநில வாடகைக் கட்டுப்பாட்டுச் சட்டங்கள்',
      keyRights: [
        'முன்பண வரம்பு: குடியிருப்புகளுக்கு அதிகபட்சம் 2 மாத வாடகையும், வணிக இடங்களுக்கு 1 மாத வாடகையும் மட்டுமே முன்பணமாகப் பெற முடியும்.',
        'அடிப்படை வசதிகள் பாதுகாப்பு: மின்சாரம் அல்லது குடிநீரைத் துண்டிப்பது சட்டப்படி குற்றமாகும்.',
        'பார்வையிட முன்னறிவிப்பு: ஆய்வு செய்ய வருவதற்கு முன் குறைந்தது 24 மணி நேர முன்னறிவிப்பு தர வேண்டும்.',
        'பலவந்தமாக வெளியேற்றுவது தடை: நீதிமன்ற உத்தரவின்றி வாடகைதாரரை பலவந்தமாக வெளியேற்ற முடியாது.',
      ],
      whatToDoIfViolated: [
        'வசதிகள் துண்டிக்கப்பட்டால் உள்ளூர் காவல் துறையிலோ அல்லது வாடகை அதிகாரியிடமோ உடனே புகார் அளிக்கவும்.',
        'முன்பணத்தைத் திருப்பித் தர மறுத்தால் வழக்கறிஞர் மூலம் சட்ட அறிவிப்பு அனுப்பவும்.',
        'வாடகை நீதிமன்றத்தில் மனு தாக்கல் செய்யவும் அல்லது DLSA சமரச மையத்தை அணுகவும்.',
      ],
      recommendedAuthority: 'வாடகை ஆணையம் / வாடகை நீதிமன்றம் / வருவாய் கோட்டாட்சியர் (RDO/SDM)',
      helpline: '15100 (DLSA சட்ட சேவைகள் உதவி எண்)',
    },
    'topic-police': {
      title: 'காவல்துறை விசாரணை மற்றும் கைது செய்யப்படும் போது குடிமக்கள் உரிமைகள்',
      shortDescription:
        'உச்ச நீதிமன்றத்தின் வரலாற்றுச் சிறப்புமிக்க டிகே பாசு வழிகாட்டுதல்கள்: கைதின் காரணங்கள், ஜீரோ எஃப்.ஐ.ஆர் மற்றும் 24 மணி நேர மாஜிஸ்திரேட் விதி.',
      fullExplanation:
        'இந்திய அரசியலமைப்பின் 21 மற்றும் 22-வது பிரிவுகளின்படி குடிமக்கள் அனைவருக்கும் அடிப்படை உரிமைகள் உள்ளன. டி.கே. பாசு வழக்கில் உச்ச நீதிமன்றம் வழங்கிய வழிகாட்டுதல்களின்படி, ஒருவரைக் கைது செய்யும் போது காவல்துறை பின்பற்ற வேண்டிய கட்டாய விதிகள் வகுக்கப்பட்டுள்ளன.',
      primaryLaw: 'இந்திய அரசியலமைப்பு (பிரிவு 21, 22) & BNSS / CrPC',
      keyRights: [
        'கைதுக்கான காரணத்தை அறியும் உரிமை: எந்தக் குற்றத்திற்காகக் கைது செய்யப்படுகிறார் என்பதை காவல்துறை உடனடியாகத் தெரிவிக்க வேண்டும்.',
        'வழக்கறிஞர் உதவி: நீங்கள் விரும்பும் வழக்கறிஞரை அணுகவும் ஆலோசிக்கவும் முழு உரிமை உண்டு.',
        'குடும்பத்தினருக்குத் தெரிவித்தல்: கைது செய்யப்பட்ட 8-12 மணி நேரத்திற்குள் உறவினருக்குத் தகவல் தெரிவிக்க வேண்டும்.',
        '24 மணி நேர விதி: கைது செய்யப்பட்டவரை 24 மணி நேரத்திற்குள் மாஜிஸ்திரேட் முன் ஆஜர்படுத்த வேண்டும்.',
        'மருத்துவப் பரிசோதனை உரிமை: கைது செய்யப்படும் போதும் காவலில் இருக்கும் போதும் சுதந்திரமான மருத்துவப் பரிசோதனையைக் கோரலாம்.',
        'கைது குறிப்பாணை (Arrest Memo): சாட்சி முன்னிலையில் முறையான கைது குறிப்பாணை தயாரிக்கப்பட வேண்டும்.',
      ],
      whatToDoIfViolated: [
        'காவல்துறை அதிகாரியின் பெயர் பேட்ஜ் மற்றும் அடையாள அட்டையைக் காட்டக் கோருங்கள்.',
        'குடும்பத்தினருக்கு உடனடியாகத் தகவல் கொடுத்து காவல் நிலையத்தின் பெயரைத் தெரியப்படுத்துங்கள்.',
        'இலவச சட்ட உதவி வழக்கறிஞரை நியமிக்கக் கோருங்கள் (LADCS).',
        'காவலில் துன்புறுத்தல் நடந்திருந்தால், மாஜிஸ்திரேட் முன் ஆஜர்படுத்தப்படும் போது நேரடியாகத் தெரிவியுங்கள்.',
      ],
      recommendedAuthority: 'நீதித்துறை நடுவர் (Magistrate) / மாநில மனித உரிமைகள் ஆணையம் / எஸ்பி அலுவலகம்',
      helpline: '112 / 14433 (மனித உரிமைகள் உதவி எண்)',
    },
    'topic-rti': {
      title: 'தகவல் அறியும் உரிமை (RTI): அரசு வெளிப்படைத்தன்மை மற்றும் பொறுப்புடைமை',
      shortDescription:
        'வெறும் ₹10 கட்டணத்தில் ஆர்டிஐ மனு, 30 நாட்களில் கட்டாய பதில் மற்றும் தகவல் ஆணையத்தில் மேல்முறையீடு.',
      fullExplanation:
        'தகவல் அறியும் உரிமைச் சட்டம் 2005 ஒவ்வொரு இந்தியக் குடிமகனுக்கும் அரசுத் துறைகளிடம் கேள்வி கேட்கவும், ஆவணங்களின் சான்றளிக்கப்பட்ட பிரதிகளைப் பெறவும் அதிகாரம் அளிக்கிறது. பொதுத் தகவல் அலுவலர்கள் (PIO) 30 நாட்களுக்குள் பதிலளிக்கக் கடமைப்பட்டுள்ளனர் (உயிர் மற்றும் சுதந்திரம் சம்பந்தப்பட்ட விவகாரம் என்றால் 48 மணி நேரத்திற்குள்).',
      primaryLaw: 'தகவல் அறியும் உரிமைச் சட்டம், 2005',
      keyRights: [
        '30 நாட்களில் கட்டாய பதில்: கோரப்பட்ட தகவல்களை 30 நாட்களுக்குள் வழங்க வேண்டும்.',
        'உயிர் மற்றும் சுதந்திர விதி: மனித உயிருக்கு ஆபத்தான விவகாரங்களில் 48 மணி நேரத்திற்குள் தகவல் வழங்கப்பட வேண்டும்.',
        'குறைந்த கட்டணம்: மத்திய அரசின் ஆர்டிஐ மனு கட்டணம் வெறும் ₹10 மட்டுமே (வறுமைக் கோட்டிற்கு கீழ் உள்ளவர்களுக்கு முற்றிலும் இலவசம்).',
        'அதிகாரிகளுக்கு அபராதம்: நியாயமான காரணமின்றி தாமதம் செய்தால் அதிகாரிக்கு நாளொன்றுக்கு ₹250 வீதம் அதிகபட்சம் ₹25,000 வரை தனிப்பட்ட அபராதம்.',
      ],
      whatToDoIfViolated: [
        'காலக்கெடு முடிந்த 30 நாட்களுக்குள் முதல் மேல்முறையீட்டு அதிகாரியிடம் (FAA) மேல்முறையீடு செய்யவும்.',
        'பதில் கிடைக்காவிட்டால் மத்திய அல்லது மாநிலத் தகவல் ஆணையத்தில் இரண்டாவது மேல்முறையீடு செய்யவும்.',
      ],
      recommendedAuthority: 'மத்திய தகவல் ஆணையம் (CIC) / தமிழ்நாடு தகவல் ஆணையம்',
      helpline: '011-26183027 (மத்திய தகவல் ஆணையம்)',
    },
    'topic-students': {
      title: 'மாணவர் உரிமைகள்: ரேக்கிங் தடுப்பு, கட்டணத்தைத் திரும்பப் பெறுதல் மற்றும் அசல் சான்றிதழ்கள்',
      shortDescription:
        'யுஜிசி வழிகாட்டுதல்கள்: கட்டணத்தை கட்டாயம் திரும்பத் தருதல், அசல் சான்றிதழ்களைப் பிடித்து வைக்கத் தடை மற்றும் ரேக்கிங் எதிர்ப்பு.',
      fullExplanation:
        'பல்கலைக்கழக மானியக் குழு (UGC) மற்றும் AICTE விதிகளின்படி, கல்லூரிகள் மாணவர்களின் அசல் மதிப்பெண் சான்றிதழ்களைப் பிடித்து வைக்க சட்டப்படி உரிமையில்லை. சேர்க்கையை ரத்து செய்தால் விதிகளின்படி கட்டணத்தைத் திரும்பத் தர வேண்டும் மற்றும் ரேக்கிங்கை முற்றிலும் தடுக்க வேண்டும்.',
      primaryLaw: 'யுஜிசி கட்டணத் திரும்பப் பெறுதல் விதிகள் மற்றும் ரேக்கிங் எதிர்ப்பு நெறிமுறைகள் 2009',
      keyRights: [
        'அசல் ஆவணங்கள் பாதுகாப்பு: அசல் சான்றிதழ்களைக் கல்லூரிகள் தன்னிச்சையாகப் பிடித்து வைக்க முடியாது.',
        'கட்டணம் திரும்பப் பெறுதல்: குறிப்பிட்ட காலத்திற்குள் விலகினால் விதிகளின்படி கட்டணத்தைப் பெற உரிமை உண்டு.',
        'ரேக்கிங் எதிர்ப்புப் பாதுகாப்பு: ரேக்கிங் கடுமையான குற்றமாகும்; அலட்சியம் காட்டும் கல்லூரிகளின் அங்கீகாரம் ரத்து செய்யப்படும்.',
        'குறைதீர்ப்பு மன்றம்: ஒவ்வொரு உயர்கல்வி நிறுவனத்திலும் மாணவர் குறைதீர்ப்புக் குழு (SGRC) இருக்க வேண்டும்.',
      ],
      whatToDoIfViolated: [
        'யுஜிசி-யின் e-Samadhan போர்ட்டலில் (samadhan.ugc.ac.in) புகார் அளிக்கவும்.',
        'ரேக்கிங் புகார்களுக்கு 24x7 கட்டணமில்லா உதவி எண் 1800-180-5522-ஐ உடனடியாக அழைக்கவும்.',
        'கட்டணத்தை திருப்பித் தர மறுத்தால் நுகர்வோர் நீதிமன்றத்தை அணுகவும்.',
      ],
      recommendedAuthority: 'யுஜிசி இ-சமாதான் / தேசிய ரேக்கிங் எதிர்ப்பு பிரிவு',
      helpline: '1800-180-5522 (தேசிய ரேக்கிங் எதிர்ப்பு கட்டணமில்லா எண்)',
    },
    'topic-seniors': {
      title: 'மூத்த குடிமக்கள் பாதுகாப்பு, மாதாந்திர பராமரிப்பு மற்றும் சொத்துரிமை',
      shortDescription:
        'ஆர்டிஓ பராமரிப்புத் தீர்ப்பாய உத்தரவுகள், கைவிட்டால் சொத்துப் பத்திரத்தை ரத்து செய்தல் மற்றும் மருத்துவ முன்னுரிமை.',
      fullExplanation:
        'பெற்றோர் மற்றும் மூத்த குடிமக்கள் பராமரிப்பு மற்றும் நலச் சட்டம் 2007 மூத்த குடிமக்களுக்கு (60 வயதுக்கு மேற்பட்டவர்கள்) பிள்ளைகளிடமிருந்து மாதாந்திர பராமரிப்புச் செலவைப் பெற விரைவான நடைமுறையை வழங்குகிறது. பெற்றோரைப் பராமரிக்கத் தவறினால் பிள்ளைகளுக்கு வழங்கிய சொத்துப் பத்திரத்தை (Gift Deed) ரத்து செய்யவும் இச்சட்டம் அதிகாரம் அளிக்கிறது.',
      primaryLaw: 'பெற்றோர் மற்றும் மூத்த குடிமக்கள் பராமரிப்பு மற்றும் நலச் சட்டம், 2007',
      keyRights: [
        'மாதாந்திர பராமரிப்பு உரிமை: உணவு, உடை, உறைவிடம் மற்றும் மருத்துவச் செலவுகளைப் பிள்ளைகள் வழங்க வேண்டும்.',
        'சொத்து தானப் பத்திரம் ரத்து: பிரிவு 23-ன் கீழ், பெற்றோரைப் பராமரிக்காவிட்டால் பிள்ளைகளுக்கு அளித்த சொத்தை ரத்து செய்யலாம்.',
        'விரைவான விசாரணை: வழக்கறிஞர்கள் தேவையின்றி 90 நாட்களுக்குள் தீர்ப்பாயம் வழக்குகளைத் தீர்க்கிறது.',
        'முதியோரைக் கைவிடுவது குற்றம்: முதியோர்களைத் தனியாகக் கைவிட்டுச் செல்வது தண்டனைக்குரிய குற்றமாகும்.',
      ],
      whatToDoIfViolated: [
        'இலவச ஆலோசனை மற்றும் உதவிக்கு எல்டர்லைன் 14567 உதவி எண்ணை அழைக்கவும்.',
        'வருவாய் கோட்டாட்சியர் (RDO / SDM) பராமரிப்புத் தீர்ப்பாயத்தில் மனு அளிக்கவும்.',
        'மாவட்ட சமூக நல அலுவலர் அல்லது DLSA அலுவலகத்தின் உதவியைப் பெறவும்.',
      ],
      recommendedAuthority: 'பராமரிப்புத் தீர்ப்பாயம் (RDO/SDM) / சமூக நலத் துறை',
      helpline: '14567 (எல்டர்லைன் மூத்த குடிமக்கள் தேசிய உதவி எண்)',
    },
  },

  Telugu: {
    'topic-consumer': {
      title: 'వినియోగదారుల రక్షణ, లోపభూయిష్ట వస్తువులు మరియు సేవల లోపం',
      shortDescription:
        'లోపభూయిష్ట వస్తువులు, తప్పుదారి పట్టించే ప్రకటనలు మరియు వ్యాపార మోసాలపై మీ చట్టబద్ధమైన హక్కులు.',
      fullExplanation:
        'వినియోగదారుల రక్షణ చట్టం 2019 ప్రకారం, ప్రతి భారతీయ వినియోగదారునికి సేవా లోపాలు, అనుచిత నిబంధనలు, అధిక ధరలు మరియు నాసిరకం వస్తువుల నుండి రక్షణ ఉంది. మీరు స్థానిక దుకాణంలో కొనుగోలు చేసినా లేదా ఆన్‌లైన్ సైట్‌లో కొనుగోలు చేసినా, నాణ్యమైన ఉత్పత్తులను అందించడానికి వ్యాపారులు చట్టబద్ధంగా బాధ్యులు.',
      primaryLaw: 'వినియోగదారుల రక్షణ చట్టం, 2019 & ఇ-కామర్స్ నిబంధనలు, 2020',
      keyRights: [
        'భద్రతా హక్కు: ప్రాణానికి లేదా ఆస్తికి హాని కలిగించే వస్తువులు మరియు సేవల నుండి రక్షణ.',
        'సమాచార హక్కు: వస్తువు నాణ్యత, పరిమాణం, స్వచ్ఛత, ప్రమాణాలు మరియు సరైన ధర గురించిన సమాచారం.',
        'పరిహార హక్కు: లోపభూయిష్ట వస్తువులు లేదా సేవల లోపానికి పరిహారం మరియు రీఫండ్ పొందే హక్కు.',
        'తప్పుదారి పట్టించే ప్రకటనల నిరోధం: అబద్ధపు ప్రచారాలు చేసే కంపెనీలపై కఠిన జరిమానాలు.',
        'ఉత్పత్తి బాధ్యత: లోపభూయిష్ట ఉత్పత్తి వల్ల కలిగే నష్టానికి విక్రేత మరియు తయారీదారు బాధ్యత వహించాలి.',
      ],
      whatToDoIfViolated: [
        'ఆర్డర్ ఐడీ, బిల్లు మరియు సమస్య వివరాలతో అధికారిక లిఖితపూర్వక ఫిర్యాదును సిద్ధం చేయండి.',
        'జాతీయ వినియోగదారుల హెల్ప్‌లైన్ 1915 కు కాల్ చేయండి లేదా 8800001915 కు వాట్సాప్ సందేశం పంపండి.',
        'consumerhelpline.gov.in లో ఫిర్యాదు చేయండి లేదా e-Daakhil (edaakhil.nic.in) ద్వారా కేసు నమోదు చేయండి.',
        '₹50 లక్షల వరకు క్లెయిమ్‌లను జిల్లా వినియోగదారుల కమిషన్‌లో అతి తక్కువ ఫీజుతో విచారిస్తారు.',
      ],
      recommendedAuthority: 'జిల్లా వినియోగదారుల వివాదాల పరిష్కార కమిషన్ (కన్స్యూమర్ ఫోరమ్)',
      helpline: '1915 (జాతీయ వినియోగదారుల హెల్ప్‌లైన్)',
    },
    'topic-cyber': {
      title: 'సైబర్ భద్రత, డిజిటల్ ఆర్థిక మోసాలు మరియు ఆన్‌లైన్ వేధింపులు',
      shortDescription:
        'గోల్డెన్ అవర్‌లో పోయిన డబ్బును రికవర్ చేయడం, నకిలీ లోన్ యాప్‌ల బ్లాక్‌మెయిల్ అడ్డుకట్ట మరియు రక్షణ.',
      fullExplanation:
        'సైబర్ నేరాలు ఆర్థిక మోసాలు, గుర్తింపు దొంగతనం మరియు ఆన్‌లైన్ వేధింపుల ద్వారా ప్రజలను తీవ్రంగా ఇబ్బంది పెడుతున్నాయి. ఇన్ఫర్మేషన్ టెక్నాలజీ చట్టం 2000 మరియు భారతీయ న్యాయ సంహిత ప్రకారం అనధికారిక డిజిటల్ యాక్సెస్, ఫిషింగ్ మరియు ప్రైవేట్ ఫోటోలను దుర్వినియోగం చేయడం తీవ్రమైన శిక్షార్హమైన నేరాలు.',
      primaryLaw: 'ఇన్ఫర్మేషన్ టెక్నాలజీ చట్టం, 2000 (సెక్షన్ 43, 66, 67) & BNS',
      keyRights: [
        'గోల్డెన్ అవర్ ఫ్రీజ్: సంఘటన జరిగిన 2 గంటల్లోపు 1930 కు కాల్ చేయడం ద్వారా బ్యాంకు లావాదేవీలను ఆపవచ్చు.',
        'డిజిటల్ గోప్యతా హక్కు: కంపెనీలు మీ వ్యక్తిగత డేటాను అత్యంత భద్రతతో రక్షించాలి.',
        'బెదిరింపుల నుండి రక్షణ: నకిలీ లోన్ యాప్‌లు లేదా మార్ఫింగ్ ఫోటోలతో బ్లాక్‌మెయిల్ చేయడం చట్టవిరుద్ధం.',
        'పేరు వెల్లడించకుండా ఫిర్యాదు: మహిళలు మరియు పిల్లలు తమ గుర్తింపును దాచి ఉంచి అసభ్యకర కంటెంట్‌పై ఫిర్యాదు చేయవచ్చు.',
      ],
      whatToDoIfViolated: [
        'అనధికారిక లావాదేవీ జరిగిన మొదటి 2 గంటల్లోనే వెంటనే 1930 కు కాల్ చేయండి.',
        'ట్రాన్సాక్షన్ UTR నంబర్, బ్యాంక్ ఖాతా వివరాలు మరియు స్క్రీన్‌షాట్‌లను సేకరించండి.',
        'cybercrime.gov.in పోర్టల్‌లో వెంటనే ఈ-ఫిర్యాదును నమోదు చేయండి.',
        'ఛార్జ్‌బ్యాక్ ప్రారంభించడానికి మరియు లబ్ధిదారుని ఖాతాను నిలిపివేయడానికి మీ బ్యాంకును సంప్రదించండి.',
      ],
      recommendedAuthority: 'భారతీయ సైబర్ క్రైమ్ సమన్వయ కేంద్రం (I4C) / స్థానిక సైబర్ క్రైమ్ పోలీస్ స్టేషన్',
      helpline: '1930 (జాతీయ సైబర్ ఫైనాన్షియల్ ఫ్రాడ్ హెల్ప్‌లైన్)',
    },
    'topic-women': {
      title: 'మహిళల భద్రత, గౌరవం మరియు పని ప్రదేశాల్లో వేధింపుల నిరోధం',
      shortDescription:
        'గృహహింస, పని ప్రదేశంలో వేధింపులు (POSH), జీరో ఎఫ్ఐఆర్ మరియు ఉచిత న్యాయ సహాయ హక్కు.',
      fullExplanation:
        'భారత రాజ్యాంగం మరియు చట్టాలు మహిళలకు అత్యున్నత రక్షణలు కల్పిస్తున్నాయి. గృహహింస నిరోధక చట్టం 2005, పని ప్రదేశంలో లైంగిక వేధింపుల నిరోధక (POSH) చట్టం 2013, 26 వారాల వేతనంతో కూడిన ప్రసూతి సెలవులు, జీరో ఎఫ్ఐఆర్ నమోదు చేసే హక్కు మరియు నల్సా (NALSA) ద్వారా 100% ఉచిత న్యాయ సహాయం లభిస్తాయి.',
      primaryLaw: 'గృహహింస నుండి మహిళల రక్షణ చట్టం 2005 & POSH చట్టం 2013',
      keyRights: [
        'జీరో ఎఫ్ఐఆర్: నేరం ఎక్కడ జరిగినా భారతదేశంలోని ఏ పోలీస్ స్టేషన్‌లోనైనా మహిళలు ఎఫ్ఐఆర్ నమోదు చేయవచ్చు.',
        'అరెస్టు నిబంధనలు: సూర్యాస్తమయం తర్వాత మరియు సూర్యోదయానికి ముందు మహిళా పోలీసుల సమక్షంలో మాత్రమే న్యాయాధికారి అనుమతితో అరెస్టు చేయాలి.',
        'స్త్రీధనం హక్కు: పెళ్లికి ముందు లేదా తర్వాత ఇచ్చిన నగలపై మరియు ఆస్తులపై మహిళకే పూర్తి హక్కు ఉంటుంది.',
        'పని ప్రదేశాల రక్షణ: 10 మందికి పైగా ఉద్యోగులున్న ప్రతి సంస్థలో అంతర్గత ఫిర్యాదుల కమిటీ (ICC) ఉండాలి.',
        'ఉచిత న్యాయ సహాయం: సెక్షన్ 12 నల్సా కింద ఉచిత న్యాయవాది, కోర్టు ఫీజు మినహాయింపు మరియు ఉచిత న్యాయ సలహాలు.',
      ],
      whatToDoIfViolated: [
        'సఖీ వన్ స్టాప్ సెంటర్ (OSC) లేదా 181 హెల్ప్‌లైన్‌ను సంప్రదించండి.',
        'పని ప్రదేశాల సమస్యలపై 90 రోజుల్లోపు అంతర్గత కమిటీకి (ICC) లిఖితపూర్వక ఫిర్యాదు ఇవ్వండి.',
        'జిల్లా కోర్టులోని ప్రొటెక్షన్ ఆఫీసర్ లేదా జిల్లా న్యాయ సేవాధికార సంస్థను (DLSA) సంప్రదించండి.',
      ],
      recommendedAuthority: 'జాతీయ మహిళా కమిషన్ / సఖీ వన్ స్టాప్ సెంటర్ / DLSA',
      helpline: '181 / 7827170170 (మహిళా హెల్ప్‌లైన్)',
    },
    'topic-labour': {
      title: 'కార్మికుల హక్కులు, వేతన రక్షణ మరియు అక్రమ తొలగింపుల నిరోధం',
      shortDescription:
        'సకాలంలో వేతనం, గ్రాట్యుటీ హక్కు, పీఎఫ్ జమ, నోటీస్ పీరియడ్ మరియు పని గంటల నిబంధనలు.',
      fullExplanation:
        'కార్మిక చట్టాలు ఉద్యోగులకు సంపూర్ణ రక్షణ కల్పిస్తున్నాయి. యాజమాన్యాలు అంగీకరించిన వేతనాన్ని సమయానికి చెల్లించాలి, పీఎఫ్ జమ చేయాలి, సురక్షితమైన పని వాతావరణం కల్పించాలి మరియు 5 సంవత్సరాల నిరంతర సర్వీస్ పూర్తయిన తర్వాత గ్రాట్యుటీ చెల్లించాలి.',
      primaryLaw: 'వేతన కోడ్, పారిశ్రామిక వివాదాల చట్టం & గ్రాట్యుటీ చెల్లింపు చట్టం',
      keyRights: [
        'సకాలంలో వేతనం: ప్రతి నెలా 7 లేదా 10వ తేదీలోపు జీతం ఖాతాలో జమ కావాలి.',
        'పూర్తి పరిష్కారం (F&F): రాజీనామా చేసిన 2 పని దినాలలోపు అన్ని బకాయిలను క్లియర్ చేయాలి.',
        'గ్రాట్యుటీ హామీ: 5 సంవత్సరాల నిరంతర సర్వీస్ తర్వాత ప్రతి సంవత్సరానికి 15 రోజుల జీతం గ్రాట్యుటీగా లభిస్తుంది.',
        'అనధికార కోతలు నిషేధం: జీతం నుండి ఏకపక్షంగా జరిమానాలు లేదా కోతలు విధించకూడదు.',
      ],
      whatToDoIfViolated: [
        'యాజమాన్యానికి రిజిస్టర్డ్ పోస్ట్ మరియు ఈమెయిల్ ద్వారా డిమాండ్ నోటీసు పంపండి.',
        'శ్రమ్ సువిధ పోర్టల్‌లో (shramsuvidha.gov.in) ఫిర్యాదు చేయండి.',
        'రాజీ కోసం జిల్లా లేబర్ కాన్సిలియేషన్ ఆఫీసర్‌ను ఆశ్రయించండి.',
        'జీతం నుండి పీఎఫ్ కట్ చేసి జమ చేయకపోతే epfigms.gov.in లో ఫిర్యాదు చేయండి.',
      ],
      recommendedAuthority: 'లేబర్ కమిషనర్ కార్యాలయం / ఈపీఎఫ్ఓ (EPFO)',
      helpline: '14434 (కార్మిక మంత్రిత్వ శాఖ హెల్ప్‌లైన్)',
    },
    'topic-housing': {
      title: 'అద్దెదారుల హక్కులు: డిపాజిట్ వాపసు, అక్రమ ఖాళీ చేయించడం మరియు సౌకర్యాలు',
      shortDescription:
        'అక్రమంగా గెంటివేయడంపై రక్షణ, సెక్యూరిటీ డిపాజిట్ పరిమితులు, విద్యుత్ మరియు నీటి సరఫరా రక్షణ.',
      fullExplanation:
        'మోడల్ టెనెన్సీ యాక్ట్ ప్రకారం, యజమాని 24 గంటల ముందస్తు నోటీసు లేకుండా అద్దె ఇంటిలోకి ప్రవేశించకూడదు. ఖాళీ చేయించడానికి విద్యుత్ లేదా నీటి సరఫరాను నిలిపివేయకూడదు. లీజు ముగిసిన వెంటనే డిపాజిట్ మొత్తాన్ని వాపసు చేయాలి.',
      primaryLaw: 'మోడల్ టెనెన్సీ చట్టం మరియు రాష్ట్ర అద్దె నియంత్రణ చట్టాలు',
      keyRights: [
        'డిపాజిట్ పరిమితి: నివాస గృహాలకు గరిష్టంగా 2 నెలల అద్దె, వాణిజ్య సముదాయాలకు 1 నెల అద్దె మాత్రమే డిపాజిట్‌గా తీసుకోవాలి.',
        'మౌలిక సదుపాయాల రక్షణ: నీరు లేదా విద్యుత్ కనెక్షన్ కట్ చేయడం చట్టరీత్యా నేరం.',
        'ముందస్తు నోటీసు: ఇంటి తనిఖీ కోసం రావడానికి కనీసం 24 గంటల ముందు నోటీసు ఇవ్వాలి.',
        'బలవంతపు ఖాళీ నిరోధం: కోర్టు ఆదేశాలు లేకుండా అద్దెదారులను బలవంతంగా ఖాళీ చేయించలేరు.',
      ],
      whatToDoIfViolated: [
        'సౌకర్యాలు నిలిపివేస్తే స్థానిక పోలీసులకు లేదా రెంటల్ అథారిటీకి వెంటనే ఫిర్యాదు చేయండి.',
        'డిపాజిట్ వాపసు చేయకపోతే లీగల్ నోటీసు పంపండి.',
        'రెంట్ కోర్టులో పిటిషన్ దాఖలు చేయండి లేదా DLSA మధ్యవర్తిత్వాన్ని కోరండి.',
      ],
      recommendedAuthority: 'రెంట్ అథారిటీ / రెంట్ కోర్టు / సబ్-డివిజనల్ మేజిస్ట్రేట్ (SDM)',
      helpline: '15100 (DLSA న్యాయ సేవల హెల్ప్‌లైన్)',
    },
    'topic-police': {
      title: 'పోలీసు విచారణ మరియు అరెస్టు సమయాల్లో పౌర హక్కులు (డి.కె. బసు మార్గదర్శకాలు)',
      shortDescription:
        'సుప్రీంకోర్టు చారిత్రక డీకే బసు మార్గదర్శకాలు: అరెస్టు కారణాలు, జీరో ఎఫ్ఐఆర్ మరియు 24 గంటల్లో మేజిస్ట్రేట్ ముందు హాజరు.',
      fullExplanation:
        'రాజ్యాంగంలోని అధికరణ 21 మరియు 22 ప్రకారం ప్రతి పౌరుడికి ప్రాథమిక హక్కులు ఉన్నాయి. డి.కె. బసు వర్సెస్ పశ్చిమ బెంగాల్ కేసులో సుప్రీంకోర్టు ఇచ్చిన తీర్పు ప్రకారం, అరెస్టు లేదా నిర్బంధ సమయంలో పోలీసులు పాటించాల్సిన తప్పనిసరి నియమాలు నిర్దేశించబడ్డాయి.',
      primaryLaw: 'భారత రాజ్యాంగం (ఆర్టికల్ 21, 22) & BNSS / CrPC',
      keyRights: [
        'అరెస్టు కారణం తెలుసుకునే హక్కు: ఏ నేరంపై అరెస్టు చేస్తున్నారో పోలీసులు వెంటనే స్పష్టంగా చెప్పాలి.',
        'న్యాయవాది సహాయం: మీకిష్టమైన లాయర్‌ను సంప్రదించే పూర్తి హక్కు మీకు ఉంది.',
        'కుటుంబానికి సమాచారం: అరెస్టు చేసిన 8-12 గంటల్లోపు బంధువులకు లేదా స్నేహితులకు సమాచారం అందించాలి.',
        '24 గంటల తప్పనిసరి నియమం: అరెస్టు చేసిన వ్యక్తిని 24 గంటల్లోపు సమీప మేజిస్ట్రేట్ ముందు హాజరుపరచాలి.',
        'వైద్య పరీక్షల హక్కు: అరెస్టు సమయంలో మరియు కస్టడీలో ఉన్నప్పుడు ప్రతి 48 గంటలకు స్వతంత్ర వైద్య పరీక్షను కోరవచ్చు.',
        'అరెస్ట్ మెమో: సాక్షి సమక్షంలో అధికారిక అరెస్ట్ మెమోను పోలీసులు తప్పక తయారు చేయాలి.',
      ],
      whatToDoIfViolated: [
        'పోలీసు అధికారి నేమ్ బ్యాడ్జ్ మరియు గుర్తింపు కార్డును చూపించమని కోరండి.',
        'వెంటనే కుటుంబ సభ్యులకు సమాచారం ఇచ్చి పోలీస్ స్టేషన్ పేరు చెప్పండి.',
        'ఉచిత లీగల్ ఎయిడ్ లాయర్‌ను ఏర్పాటు చేయాలని డిమాండ్ చేయండి (LADCS).',
        'కస్టడీలో వేధింపులు జరిగితే మేజిస్ట్రేట్ ముందు హాజరుపరిచినప్పుడు నేరుగా చెప్పండి.',
      ],
      recommendedAuthority: 'న్యాయ మేజిస్ట్రేట్ / రాష్ట్ర మానవ హక్కుల కమిషన్ / ఎస్పీ కార్యాలయం',
      helpline: '112 / 14433 (మానవ హక్కుల హెల్ప్‌లైన్)',
    },
    'topic-rti': {
      title: 'సమాచార హక్కు (RTI): ప్రభుత్వ పారదర్శకత మరియు జవాబుదారీతనం',
      shortDescription:
        'కేవలం ₹10 ఫీజుతో ఆర్టీఐ దరఖాస్తు, 30 రోజుల్లో తప్పనిసరి సమాధానం మరియు ఇన్ఫర్మేషన్ కమిషన్‌కు అప్పీల్.',
      fullExplanation:
        'సమాచార హక్కు చట్టం 2005 ప్రతి భారతీయ పౌరుడికి ప్రభుత్వ విభాగాలను ప్రశ్నించడానికి, రికార్డులను పరిశీలించడానికి మరియు ధృవీకరించిన పత్రాలను పొందడానికి అధికారం ఇస్తుంది. ప్రజా సమాచార అధికారులు (PIO) 30 రోజుల్లోపు సమాధానం ఇవ్వాలి (జీవితం మరియు స్వేచ్ఛకు సంబంధించినదైతే 48 గంటల్లో).',
      primaryLaw: 'సమాచార హక్కు చట్టం, 2005',
      keyRights: [
        '30 రోజుల్లో తప్పనిసరి సమాధానం: కోరిన సమాచారాన్ని 30 క్యాలెండర్ రోజుల్లోపు అందించాలి.',
        'జీవితం మరియు స్వేచ్ఛ నిబంధన: అత్యవసర ప్రాణాపాయ సమాచారాన్ని 48 గంటల్లోపు ఇవ్వాలి.',
        'తక్కువ ఖర్చు: కేంద్ర ఆర్టీఐ దరఖాస్తు రుసుము కేవలం ₹10 మాత్రమే (దారిద్య్రరేఖకు దిగువన ఉన్నవారికి ఉచితం).',
        'అధికారులపై జరిమానా: నిర్లక్ష్యంగా జాప్యం చేస్తే అధికారికి రోజుకు ₹250 చొప్పున గరిష్టంగా ₹25,000 వ్యక్తిగత జరిమానా.',
      ],
      whatToDoIfViolated: [
        'గడువు ముగిసిన 30 రోజుల్లోపు మొదటి అప్పిలేట్ అథారిటీకి (FAA) అప్పీల్ చేయండి.',
        'సమాధానం రాకపోతే కేంద్ర లేదా రాష్ట్ర సమాచార కమిషన్‌కు రెండవ అప్పీల్ చేయండి.',
      ],
      recommendedAuthority: 'కేంద్ర సమాచార కమిషన్ (CIC) / రాష్ట్ర సమాచార కమిషన్',
      helpline: '011-26183027 (కేంద్ర సమాచార కమిషన్)',
    },
    'topic-students': {
      title: 'విద్యార్థి హక్కులు: ర్యాగింగ్ నిరోధం, ఫీజు వాపసు మరియు ఒరిజినల్ సర్టిఫికెట్ల రక్షణ',
      shortDescription:
        'యూజీసీ నిబంధనలు: ఫీజు వాపసు తప్పనిసరి, ఒరిజినల్ సర్టిఫికెట్లు ఆపడం నిషేధం మరియు ర్యాగింగ్ రహిత క్యాంపస్.',
      fullExplanation:
        'యూనివర్సిటీ గ్రాంట్స్ కమిషన్ (UGC) మరియు AICTE మార్గదర్శకాల ప్రకారం, కళాశాలలు విద్యార్థుల ఒరిజినల్ సర్టిఫికెట్లను తమ వద్ద ఉంచుకోకూడదు. అడ్మిషన్ రద్దు చేసుకుంటే నిబంధనల ప్రకారం ఫీజు వాపసు చేయాలి మరియు ర్యాగింగ్‌ను పూర్తిగా అరికట్టాలి.',
      primaryLaw: 'యూజీసీ ఫీజు రీఫండ్ నిబంధనలు & యాంటీ-ర్యాగింగ్ నియమావళి 2009',
      keyRights: [
        'ఒరిజినల్ డాక్యుమెంట్ల రక్షణ: కళాశాలలు ఒరిజినల్ సర్టిఫికెట్లను అట్టిపెట్టుకోవడానికి వీల్లేదు.',
        'ఫీజు వాపసు హక్కు: కౌన్సెలింగ్ సమయంలో తప్పుకుంటే నిబంధనల ప్రకారం ఫీజు వాపసు పొందే హక్కు.',
        'యాంటీ-ర్యాగింగ్ రక్షణ: ర్యాగింగ్ చట్టరీత్యా తీవ్రమైన నేరం; నిర్లక్ష్యంగా ఉన్న కళాశాలల గుర్తింపు రద్దవుతుంది.',
        'ఫిర్యాదుల పరిష్కారం: ప్రతి విద్యాసంస్థలో విద్యార్థి గ్రీవెన్స్ రిడ్రెస్సల్ కమిటీ (SGRC) ఉండాలి.',
      ],
      whatToDoIfViolated: [
        'యూజీసీ e-Samadhan పోర్టల్‌లో (samadhan.ugc.ac.in) ఫిర్యాదు చేయండి.',
        'ర్యాగింగ్ ఘటనలపై వెంటనే 24x7 టోల్ ఫ్రీ నంబర్ 1800-180-5522 కు కాల్ చేయండి.',
        'ఫీజు వాపసు ఇవ్వకపోతే వినియోగదారుల ఫోరమ్‌ను ఆశ్రయించండి.',
      ],
      recommendedAuthority: 'యూజీసీ ఇ-సమాధాన్ / జాతీయ యాంటీ-ర్యాగింగ్ సెల్',
      helpline: '1800-180-5522 (జాతీయ యాంటీ-ర్యాగింగ్ టోల్ ఫ్రీ)',
    },
    'topic-seniors': {
      title: 'వయోవృద్ధుల సంరక్షణ, నెలవారీ భరణం మరియు ఆస్తి రక్షణ హక్కులు',
      shortDescription:
        'ఆర్డీవో నిర్వహణ ట్రిబ్యునల్ ఆదేశాలు, తల్లిదండ్రులను పట్టించుకోకపోతే గిఫ్ట్ డీడ్ రద్దు మరియు ఆరోగ్య ప్రాధాన్యత.',
      fullExplanation:
        'తల్లిదండ్రులు మరియు వయోవృద్ధుల నిర్వహణ మరియు సంక్షేమ చట్టం 2007 వయోవృద్ధులకు (60 ఏళ్లు పైబడినవారు) పిల్లల నుండి నెలవారీ నిర్వహణ భరణం పొందడానికి సులభమైన చట్టపరమైన మార్గాన్ని అందిస్తుంది. తల్లిదండ్రులను పోషించకపోతే పిల్లలకు ఇచ్చిన ఆస్తి దానపత్రాన్ని (Gift Deed) రద్దు చేసే అధికారం ట్రిబ్యునల్‌కు ఉంది.',
      primaryLaw: 'తల్లిదండ్రులు మరియు వయోవృద్ధుల సంక్షేమ చట్టం, 2007',
      keyRights: [
        'నెలవారీ భరణం హక్కు: ఆహారం, బట్టలు, నివాసం మరియు వైద్య ఖర్చులను పిల్లలు భరించాలి.',
        'ఆస్తి బదిలీ రద్దు: సెక్షన్ 23 కింద, తల్లిదండ్రులను నిర్లక్ష్యం చేస్తే పిల్లలకు బదిలీ చేసిన ఆస్తిని రద్దు చేయవచ్చు.',
        'త్వరిత పరిష్కారం: లాయర్లు అవసరం లేకుండా 90 రోజుల్లోపే ట్రిబ్యునల్ కేసులను పరిష్కరిస్తుంది.',
        'వృద్ధులను వదిలివేయడం నేరం: వయోవృద్ధులను నిస్సహాయంగా వదిలివేయడం శిక్షార్హమైన నేరం.',
      ],
      whatToDoIfViolated: [
        'ఉచిత కౌన్సెలింగ్ మరియు సహాయం కోసం ఎల్డర్‌లైన్ 14567 కు కాల్ చేయండి.',
        'సబ్-డివిజనల్ మేజిస్ట్రేట్ (SDM) / ట్రిబ్యునల్‌కు నేరుగా దరఖాస్తు చేసుకోండి.',
        'జిల్లా సాంఘిక సంక్షేమ అధికారి లేదా DLSA కార్యాలయం సహాయం పొందండి.',
      ],
      recommendedAuthority: 'నిర్వహణ ట్రిబ్యునల్ (SDM) / సాంఘిక సంక్షేమ శాఖ',
      helpline: '14567 (ఎల్డర్‌లైన్ జాతీయ సీనియర్ సిటిజన్ హెల్ప్‌లైన్)',
    },
  },

  Marathi: {
    'topic-consumer': {
      title: 'ग्राहक संरक्षण, सदोष वस्तू आणि सेवांमधील त्रुटी',
      shortDescription:
        'सदोष वस्तू, दिशाभूल करणाऱ्या जाहिराती आणि फसव्या व्यापारी पद्धतींविरुद्ध तुमचे कायदेशीर हक्क.',
      fullExplanation:
        'ग्राहक संरक्षण कायदा २०१९ नुसार, प्रत्येक भारतीय ग्राहकाला सेवांमधील त्रुटी, अयोग्य करार, जादा दर आकारणी आणि निकृष्ट दर्जाच्या वस्तूंविरुद्ध पूर्ण कायदेशीर संरक्षण आहे. तुम्ही स्थानिक दुकानातून खरेदी केली असो वा ई-कॉमर्स पोर्टलवरून, कंपन्या दिलेले वचन पाळण्यास बांधील आहेत.',
      primaryLaw: 'ग्राहक संरक्षण कायदा, २०१९ आणि ई-कॉमर्स नियम, २०२०',
      keyRights: [
        'सुरक्षिततेचा हक्क: जीवित किंवा वित्ताला धोकादायक असणाऱ्या वस्तू व सेवांपासून संरक्षण.',
        'माहितीचा हक्क: वस्तूची गुणवत्ता, प्रमाण, शुद्धता, दर्जा आणि अचूक किमतीची माहिती मिळवणे.',
        'निवारणाचा हक्क: सदोष वस्तू किंवा सेवेतील त्रुटींसाठी भरपाई आणि परतावा मिळवणे.',
        'दिशाभूल करणाऱ्या जाहिरातींविरुद्ध हक्क: खोट्या जाहिराती करणाऱ्या उत्पादकांवर कडक दंड.',
        'उत्पादन दायित्व: सदोष उत्पादनामुळे झालेल्या कोणत्याही नुकसानीस उत्पादक व विक्रेता जबाबदार.',
      ],
      whatToDoIfViolated: [
        'ऑर्डर आयडी, बिल आणि तक्रारीच्या तपशीलासह लेखी तक्रार तयार करा.',
        'राष्ट्रीय ग्राहक हेल्पलाइन १९१५ वर कॉल करा किंवा ८८००००१९१५ वर व्हॉट्सॲप मेसेज पाठवा.',
        'consumerhelpline.gov.in वर तक्रार नोंदवा किंवा e-Daakhil (edaakhil.nic.in) वर ऑनलाइन केस दाखल करा.',
        '₹५० लाखांपर्यंतच्या दाव्यांची सुनावणी जिल्हा ग्राहक आयोगात नाममात्र शुल्कात होते.',
      ],
      recommendedAuthority: 'जिल्हा ग्राहक वाद निवारण आयोग (ग्राहक मंच)',
      helpline: '1915 (राष्ट्रीय ग्राहक हेल्पलाइन)',
    },
    'topic-cyber': {
      title: 'सायबर सुरक्षा, डिजिटल आर्थिक फसवणूक आणि ऑनलाइन छळवणूक',
      shortDescription:
        'गोल्डन अवरमध्ये अडकलेले पैसे परत मिळवणे, बनावट लोन ॲप ब्लॅकमेलिंगविरुद्ध कारवाई आणि सुरक्षित तक्रार.',
      fullExplanation:
        'सायबर गुन्हेगारी वित्तीय फसवणूक, ओळख चोरी आणि ऑनलाइन छळवणुकीद्वारे सामान्य नागरिकांना लक्ष्य करते. माहिती तंत्रज्ञान कायदा २००० आणि भारतीय न्याय संहितेनुसार अनधिकृत डिजिटल प्रवेश, बँक फिशिंग आणि संमतीशिवाय खाजगी फोटो प्रसारित करणे गंभीर दखलपात्र गुन्हे आहेत.',
      primaryLaw: 'माहिती तंत्रज्ञान कायदा, २००० (कलम ४३, ६६, ६७) आणि BNS',
      keyRights: [
        'गोल्डन अवर फ्रीझ: घटनेनंतर २ तासांत १९३० वर कॉल केल्याने बँक व्यवहारांवर त्वरित बंदी घालता येते.',
        'डिजिटल गोपनीयतेचा हक्क: कंपन्यांनी तुमचा वैयक्तिक डेटा कडक सुरक्षेसह जतन केला पाहिजे.',
        'खंडणीपासून संरक्षण: बनावट लोन ॲप किंवा मॉर्फ केलेल्या फोटोंद्वारे ब्लॅकमेल करणे दंडनीय अपराध आहे.',
        'नाव गुप्त ठेवून तक्रार: महिला आणि बालके पोर्टलवर स्वतःचे नाव गुप्त ठेवून अश्लील मजकुराची तक्रार करू शकतात.',
      ],
      whatToDoIfViolated: [
        'अनधिकृत बँक कपातीनंतर पहिल्या २ तासांत त्वरित १९३० डायल करा.',
        'व्यवहार यूटीआर (UTR) क्रमांक, बँक खाते तपशील आणि स्क्रीनशॉट पुरावे गोळा करा.',
        'cybercrime.gov.in पोर्टलवर त्वरित ई-तक्रार नोंदवा.',
        'आपल्या बँकेला चार्ज-बॅक सुरू करण्याची आणि संबंधित खाते गोठवण्याची विनंती करा.',
      ],
      recommendedAuthority: 'भारतीय सायबर गुन्हे समन्वय केंद्र (I4C) / स्थानिक सायबर सेल',
      helpline: '1930 (राष्ट्रीय सायबर गुन्हे हेल्पलाइन)',
    },
    'topic-women': {
      title: 'महिला सुरक्षा, सन्मान आणि कौटुंबिक व कामाच्या ठिकाणच्या छळापासून संरक्षण',
      shortDescription:
        'कौटुंबिक हिंसाचार, कामाच्या ठिकाणी लैंगिक छळ (POSH), झिरो एफआयआरचा हक्क आणि मोफत कायदेशीर मदत.',
      fullExplanation:
        'भारतीय कायदे महिलांना मजबूत घटनात्मक संरक्षण देतात. यात कौटुंबिक हिंसाचार प्रतिबंधक कायदा २००५, कामाच्या ठिकाणी लैंगिक छळ प्रतिबंधक (POSH) कायदा २०१३, २६ आठवड्यांची सवेतन मातृत्व रजा, देशभरात कुठेही झिरो एफआयआर नोंदवण्याचा हक्क आणि नालसा (NALSA) तर्फे १००% मोफत कायदेशीर मदत समाविष्ट आहे.',
      primaryLaw: 'कौटुंबिक हिंसाचारापासून महिलांचे संरक्षण कायदा २००५ आणि POSH कायदा २०१३',
      keyRights: [
        'झिरो एफआयआर: गुन्हा कुठेही घडला असला तरी महिला भारतातील कोणत्याही पोलीस ठाण्यात एफआयआर नोंदवू शकते.',
        'अटकेचे नियम: सूर्यास्तानंतर आणि सूर्योदयापूर्वी दंडाधिकाऱ्यांच्या विशेष आदेशाशिवाय महिलेला अटक करता येत नाही, केवळ महिला पोलीसच अटक करू शकते.',
        'स्त्रीधनावर अधिकार: विवाहापूर्वी किंवा नंतर मिळालेले सर्व दागिने आणि मालमत्ता ही पूर्णपणे महिलेची असते.',
        'कामाच्या ठिकाणी संरक्षण: १० पेक्षा जास्त कर्मचारी असलेल्या प्रत्येक संस्थेत अंतर्गत तक्रार समिती (ICC) असणे बंधनकारक आहे.',
        'मोफत कायदेशीर मदत: नालसाच्या कलम १२ अंतर्गत मोफत वकील, कोर्ट फी माफी आणि कायदेशीर मार्गदर्शन.',
      ],
      whatToDoIfViolated: [
        'तातडीच्या वैद्यकीय व कायदेशीर मदतीसाठी सखी वन स्टॉप सेंटर (OSC) किंवा १८१ डायल करा.',
        'कामाच्या ठिकाणच्या तक्रारींसाठी ९० दिवसांच्या आत अंतर्गत तक्रार समितीकडे (ICC) लेखी तक्रार द्या.',
        'जिल्हा न्यायालयातील संरक्षण अधिकारी (Protection Officer) किंवा जिल्हा विधी सेवा प्राधिकरणाशी (DLSA) संपर्क साधा.',
      ],
      recommendedAuthority: 'राष्ट्रीय महिला आयोग / सखी वन स्टॉप सेंटर / DLSA',
      helpline: '181 / 7827170170 (महिला हेल्पलाइन)',
    },
    'topic-labour': {
      title: 'कामगार हक्क, वेतन संरक्षण आणि बेकायदेशीर कामावरून काढण्याविरुद्ध संरक्षण',
      shortDescription:
        'वेळेवर वेतन, ग्रॅच्युइटी हक्क, पीएफ जमा, नोटीस कालावधी आणि कामाच्या तासांचे नियम.',
      fullExplanation:
        'कामगार कायद्यांद्वारे कामगारांना पूर्ण संरक्षण दिले आहे. नियोक्त्यांनी ठरलेले वेतन वेळेवर देणे, पीएफ जमा करणे, सुरक्षित कामाची जागा पुरवणे आणि सलग ५ वर्षे सेवा पूर्ण झाल्यावर ग्रॅच्युइटी देणे कायदेशीररीत्या बंधनकारक आहे.',
      primaryLaw: 'वेतन संहिता, औद्योगिक विवाद कायदा आणि ग्रॅच्युइटी कायदा',
      keyRights: [
        'वेळेवर वेतन: प्रत्येक महिन्याच्या ७ किंवा १० तारखेपूर्वी पगार खात्यात जमा झाला पाहिजे.',
        'अंतिम हिशोब (F&F): राजीनामा दिल्यानंतर २ कामकाजाच्या दिवसांत सर्व थकबाकी दिली पाहिजे.',
        'ग्रॅच्युइटी: ५ वर्षे पूर्ण झाल्यावर प्रत्येक वर्षासाठी १५ दिवसांच्या वेतनाची खात्रीशीर ग्रॅच्युइटी.',
        'बेकायदेशीर कपातीस मनाई: वेतनातून मनमानी दंड किंवा बेकायदेशीर कपात करता येत नाही.',
      ],
      whatToDoIfViolated: [
        'व्यवस्थापनास नोंदणीकृत पोस्ट व ईमेलद्वारे औपचारिक मागणी पत्र (Demand Letter) पाठवा.',
        'श्रम सुविधा पोर्टलवर (shramsuvidha.gov.in) तक्रार नोंदवा.',
        'तडजोडीसाठी जिल्हा कामगार समेट अधिकाऱ्याकडे अर्ज करा.',
        'वेतनातून पीएफ कापून ईपीएफओमध्ये जमा केला नसल्यास epfigms.gov.in वर तक्रार करा.',
      ],
      recommendedAuthority: 'कामगार आयुक्त कार्यालय / कर्मचारी भविष्य निर्वाह निधी संघटना (EPFO)',
      helpline: '14434 (कामगार मंत्रालय हेल्पलाइन)',
    },
    'topic-housing': {
      title: 'भाडेकरू हक्क: डिपॉझिट परतावा, बेकायदेशीर घराबाहेर काढणे आणि सुविधा',
      shortDescription:
        'बेकायदेशीर बेदखलीपासून संरक्षण, सुरक्षा अनामत रक्कम (डिपॉझिट) मर्यादा, वीज आणि पाणी सुविधांचे रक्षण.',
      fullExplanation:
        'मॉडेल टेनन्सी ॲक्टनुसार, घरमालक २४ तासांच्या पूर्वसूचनेशिवाय भाड्याच्या घरात प्रवेश करू शकत नाही. घर रिकामे करण्यासाठी वीज किंवा पाणीपुरवठा खंडित करू शकत नाही. करार संपल्यावर अनामत रक्कम त्वरित परत करणे बंधनकारक आहे.',
      primaryLaw: 'मॉडेल भाडेकरू कायदा आणि राज्य भाडे नियंत्रण कायदे',
      keyRights: [
        'डिपॉझिट मर्यादा: निवासी घरासाठी जास्तीत जास्त २ महिन्यांचे भाडे आणि व्यावसायिक जागेसाठी १ महिन्याचे भाडे डिपॉझिट घेता येते.',
        'मूलभूत सुविधांचे रक्षण: वीज किंवा पाणी तोडणे हा कायदेशीर दखलपात्र गुन्हा आहे.',
        'तपासणीपूर्वी पूर्वसूचना: घरात येण्यापूर्वी घरमालकाने किमान २४ तास आधी नोटीस दिली पाहिजे.',
        'जबरदस्तीने घराबाहेर काढण्यास बंदी: न्यायालयाच्या आदेशाशिवाय भाडेकरूला जबरदस्तीने घराबाहेर काढता येत नाही.',
      ],
      whatToDoIfViolated: [
        'सुविधा बंद केल्यास स्थानिक पोलिसांकडे किंवा भाडे प्राधिकरणाकडे त्वरित तक्रार करा.',
        'डिपॉझिट परत न केल्यास वकिलामार्फत कायदेशीर नोटीस (Legal Notice) पाठवा.',
        'भाडे न्यायालयात अर्ज करा किंवा DLSA मध्यस्थी केंद्राची मदत घ्या.',
      ],
      recommendedAuthority: 'भाडे प्राधिकरण / भाडे न्यायालय / उपविभागीय दंडाधिकारी (SDM)',
      helpline: '15100 (DLSA विधी सेवा हेल्पलाइन)',
    },
    'topic-police': {
      title: 'पोलीस चौकशी आणि अटकेदरम्यान नागरिकांचे हक्क (डी.के. बसू मार्गदर्शक तत्त्वे)',
      shortDescription:
        'सर्वोच्च न्यायालयाचे ऐतिहासिक डीके बसू मार्गदर्शक तत्त्वे: अटकेची कारणे, झिरो एफआयआर आणि २४ तासांत न्यायालयात हजर करणे.',
      fullExplanation:
        'संविधानाच्या कलम २१ आणि २२ नुसार प्रत्येक नागरिकाला मूलभूत स्वातंत्र्य आहे. डी.के. बसू विरुद्ध पश्चिम बंगाल राज्य खटल्यात सर्वोच्च न्यायालयाने अटकेच्या वेळी पोलिसांनी पाळायची सक्तीची मार्गदर्शक तत्त्वे ठरवून दिली आहेत.',
      primaryLaw: 'भारतीय संविधान (कलम २१, २२) आणि BNSS / CrPC',
      keyRights: [
        'अटकेचे कारण जाणून घेण्याचा हक्क: पोलिसांनी नेमका गुन्हा आणि अटकेचे कारण त्वरित स्पष्ट केले पाहिजे.',
        'वकिलाचा सल्ला: आपल्या पसंतीच्या वकिलाचा सल्ला घेण्याचा व बचाव करण्याचा पूर्ण अधिकार.',
        'कुटुंबाला कळवणे: अटकेच्या ८-१२ तासांत नातेवाईक किंवा मित्राला पोलिसांनी माहिती दिली पाहिजे.',
        '२४ तासांचा नियम: अटक केलेल्या व्यक्तीला २४ तासांच्या आत जवळच्या दंडाधिकाऱ्यांसमोर हजर करणे बंधनकारक आहे.',
        'वैद्यकीय तपासणीचा हक्क: अटकेच्या वेळी आणि कोठडीत दर ४८ तासांनी स्वतंत्र डॉक्टरांकडून तपासणी मागू शकता.',
        'अटक मेमो (Arrest Memo): साक्षीदाराच्या उपस्थितीत रीतसर अटक मेमो तयार केला पाहिजे.',
      ],
      whatToDoIfViolated: [
        'पोलीस अधिकाऱ्याचे नाव आणि ओळखपत्र पाहण्याची मागणी करा.',
        'ताबडतोब कुटुंबाला कळवून नेमके पोलीस ठाणे कोणते ते सांगा.',
        'विनामूल्य ड्युटी वकील मिळवण्यासाठी मागणी करा (LADCS).',
        'कोठडीत मारहाण किंवा छळ झाला असल्यास दंडाधिकाऱ्यांसमोर हजर केल्यावर थेट तक्रार करा.',
      ],
      recommendedAuthority: 'न्यायिक दंडाधिकारी / राज्य मानवाधिकार आयोग / पोलीस अधीक्षक कार्यालय',
      helpline: '112 / 14433 (मानवाधिकार हेल्पलाइन)',
    },
    'topic-rti': {
      title: 'माहितीचा अधिकार (RTI): सरकारी पारदर्शकता आणि उत्तरदायित्व',
      shortDescription:
        'अवघ्या ₹१० शुल्कात आरटीआय अर्ज, ३० दिवसांत सक्तीचे उत्तर आणि माहिती आयोगाकडे अपील.',
      fullExplanation:
        'माहितीचा अधिकार कायदा २००५ प्रत्येक भारतीय नागरिकाला सरकारी खात्यांना जाब विचारण्याचा, सार्वजनिक कामांची तपासणी करण्याचा आणि अधिकृत कागदपत्रांच्या प्रती मिळवण्याचा अधिकार देतो. जन माहिती अधिकाऱ्यांनी ३० दिवसांत माहिती देणे बंधनकारक आहे (जीवित व स्वातंत्र्याचा प्रश्न असल्यास ४८ तासांत).',
      primaryLaw: 'माहितीचा अधिकार कायदा, २००५',
      keyRights: [
        '३० दिवसांत सक्तीचे उत्तर: मागितलेली माहिती ३० दिवसांच्या आत दिली पाहिजे.',
        'जीवित व स्वातंत्र्याचा नियम: तातडीची माहिती ४८ तासांच्या आत देणे बंधनकारक.',
        'किमान खर्च: केंद्रीय आरटीआय अर्ज शुल्क फक्त ₹१० आहे (दारिद्र्यरेषेखालील नागरिकांना मोफत).',
        'अधिकाऱ्यांवर दंड: विनाकारण विलंब केल्यास अधिकाऱ्यावर दिवसाला ₹२५० याप्रमाणे जास्तीत जास्त ₹२५,००० वैयक्तिक दंड.',
      ],
      whatToDoIfViolated: [
        'मुदत संपल्यापासून ३० दिवसांच्या आत प्रथम अपीलीय अधिकाऱ्याकडे (FAA) अपील दाखल करा.',
        'उत्तर न मिळाल्यास केंद्रीय किंवा राज्य माहिती आयोगाकडे द्वितीय अपील दाखल करा.',
      ],
      recommendedAuthority: 'केंद्रीय माहिती आयोग (CIC) / महाराष्ट्र राज्य माहिती आयोग',
      helpline: '011-26183027 (केंद्रीय माहिती आयोग)',
    },
    'topic-students': {
      title: 'विद्यार्थी हक्क: रॅगिंग विरोधी नियम, फी परतावा आणि मूळ शैक्षणिक कागदपत्रे',
      shortDescription:
        'युजीसी मार्गदर्शक तत्त्वे: सक्तीचा फी परतावा, मूळ प्रमाणपत्रे रोखून धरण्यास बंदी आणि रॅगिंगमुक्त परिसर.',
      fullExplanation:
        'विद्यापीठ अनुदान आयोग (UGC) आणि AICTE च्या नियमांनुसार महाविद्यालयांना विद्यार्थ्यांची मूळ गुणपत्रके किंवा प्रमाणपत्रे स्वतःकडे ठेवून घेण्याचा कोणताही कायदेशीर अधिकार नाही. प्रवेश रद्द केल्यास नियमानुसार फी परत करणे आणि रॅगिंग पूर्णपणे रोखणे बंधनकारक आहे.',
      primaryLaw: 'युजीसी फी परतावा नियम आणि रॅगिंग विरोधी नियम २००९',
      keyRights: [
        'मूळ कागदपत्रांचे रक्षण: कॉलेजेस मूळ प्रमाणपत्रे स्वतःकडे अडकवून ठेवू शकत नाहीत.',
        'फी परतावा हक्क: वेळेत प्रवेश रद्द केल्यास नियमानुसार प्रमाणबद्ध फी परत मिळण्याचा हक्क.',
        'रॅगिंगविरोधी संरक्षण: रॅगिंग हा गंभीर दखलपात्र गुन्हा आहे; दुर्लक्ष करणाऱ्या महाविद्यालयांची मान्यता रद्द होऊ शकते.',
        'तक्रार निवारण समिती: प्रत्येक उच्च शिक्षण संस्थेत विद्यार्थी तक्रार निवारण समिती (SGRC) असणे अनिवार्य आहे.',
      ],
      whatToDoIfViolated: [
        'युजीसीच्या e-Samadhan पोर्टलवर (samadhan.ugc.ac.in) तक्रार नोंदवा.',
        'रॅगिंगच्या घटनांसाठी २४x७ टोल फ्री क्रमांक १८००-१८०-५५२२ वर त्वरित संपर्क साधा.',
        'फी परत न केल्यास ग्राहक मंचात धाव घ्या.',
      ],
      recommendedAuthority: 'युजीसी ई-समाधान / राष्ट्रीय रॅगिंग विरोधी सेल',
      helpline: '1800-180-5522 (राष्ट्रीय रॅगिंग विरोधी टोल फ्री)',
    },
    'topic-seniors': {
      title: 'ज्येष्ठ नागरिक संरक्षण, मासिक देखभाल भत्ता आणि मालमत्ता संरक्षण',
      shortDescription:
        'एसडीएम देखभाल न्यायाधिकरण आदेश, पालकांकडे दुर्लक्ष केल्यास बक्षीसपत्र (Gift Deed) रद्द करणे.',
      fullExplanation:
        'पालक आणि ज्येष्ठ नागरिक देखभाल व कल्याण कायदा २००७ ज्येष्ठ नागरिकांना (६० वर्षे व अधिक) मुलांकडून मासिक निर्वाह भत्ता मिळवण्यासाठी वकिलाविरहित जलद प्रक्रिया उपलब्ध करून देतो. पालकांचा सांभाळ न केल्यास मुलांना दिलेली मालमत्ता परत घेण्याचा अधिकार न्यायाधिकरणाला आहे.',
      primaryLaw: 'पालक आणि ज्येष्ठ नागरिक देखभाल व कल्याण कायदा, २००७',
      keyRights: [
        'मासिक भत्त्याचा हक्क: अन्न, वस्त्र, निवारा आणि औषधोपचाराचा खर्च मुलांनी करणे कायदेशीर बंधनकारक आहे.',
        'मालमत्ता हस्तांतरण रद्द: कलम २३ नुसार पालकांकडे दुर्लक्ष केल्यास मुलांना दिलेले बक्षीसपत्र रद्द केले जाऊ शकते.',
        'जलद सुनावणी: एसडीएम न्यायाधिकरण ९० दिवसांच्या आत प्रकरणांचा निकाल लावते.',
        'ज्येष्ठांना बेवारस सोडणे गुन्हा: ज्येष्ठ पालकांना सोडून देणे हा कायदेशीर गुन्हा आहे.',
      ],
      whatToDoIfViolated: [
        'मोफत समुपदेशन व मदतीसाठी एल्डरलाइन १४५६७ वर कॉल करा.',
        'उपविभागीय दंडाधिकारी (SDM) / न्यायाधिकरणाकडे थेट अर्ज दाखल करा.',
        'जिल्हा समाजकल्याण अधिकारी किंवा DLSA कार्यालयाची मदत घ्या.',
      ],
      recommendedAuthority: 'देखभाल न्यायाधिकरण (SDM) / समाजकल्याण विभाग',
      helpline: '14567 (एल्डरलाइन राष्ट्रीय ज्येष्ठ नागरिक हेल्पलाइन)',
    },
  },

  Bengali: {
    'topic-consumer': {
      title: 'ক্রেতা সুরক্ষা, ত্রুটিপূর্ণ পণ্য ও পরিষেবার ঘাটতি',
      shortDescription:
        'ত্রুটিপূর্ণ পণ্য, বিভ্রান্তিকর বিজ্ঞাপন এবং অন্যায্য ব্যবসায়িক আচরণের বিরুদ্ধে আপনার আইনগত অধিকার।',
      fullExplanation:
        'ক্রেতা সুরক্ষা আইন ২০১৯ অনুযায়ী, প্রতিটি ভারতীয় উপভোক্তার সেবার ঘাটতি, অন্যায্য চুক্তি, অতিরিক্ত দাম নেওয়া এবং নিম্নমানের পণ্যের বিরুদ্ধে পূর্ণ আইনি অধিকার রয়েছে। আপনি স্থানীয় দোকান থেকে কেনাকাটা করুন বা অনলাইন প্ল্যাটফর্ম থেকে, ব্যবসায়ীরা প্রতিশ্রুত মান বজায় রাখতে বাধ্য।',
      primaryLaw: 'ক্রেতা সুরক্ষা আইন, ২০১৯ এবং ই-কমার্স বিধি, ২০২০',
      keyRights: [
        'নিরাপত্তার অধিকার: জীবন বা সম্পত্তির জন্য ক্ষতিকর পণ্য ও পরিষেবা থেকে সুরক্ষা।',
        'তথ্য জানার অধিকার: পণ্যের গুণমান, পরিমাণ, বিশুদ্ধতা ও সঠিক দাম জানার অধিকার।',
        'প্রতিকারের অধিকার: ত্রুটিপূর্ণ পণ্য বা সেবার ঘাটতির জন্য ক্ষতিপূরণ ও রিফান্ড।',
        'বিভ্রান্তিকর বিজ্ঞাপনের বিরুদ্ধে ব্যবস্থা: অসত্য প্রচারকারী কোম্পানি ও বিজ্ঞাপনদাতাদের জরিমানা।',
        'পণ্যের দায়বদ্ধতা: ত্রুটিপূর্ণ পণ্যের কারণে ক্ষতির জন্য প্রস্তুতকারক ও বিক্রেতা দায়ী।',
      ],
      whatToDoIfViolated: [
        'অর্ডার আইডি, বিল এবং অভিযোগের বিশদ বিবরণ সহ একটি লিখিত অভিযোগ প্রস্তুত করুন।',
        'জাতীয় ক্রেতা হেল্পলাইন ১৯১৫-এ কল করুন অথবা ৮৮০০০০১৯১৫ নম্বরে হোয়াটসঅ্যাপ করুন।',
        'consumerhelpline.gov.in-এ অভিযোগ জানান বা e-Daakhil (edaakhil.nic.in)-এ অনলাইন কেস দায়ের করুন।',
        '৫০ লাখ টাকা পর্যন্ত দাবি জেলা ক্রেতা কমিশনে নামমাত্র খরচে নিষ্পত্তি হয়।',
      ],
      recommendedAuthority: 'জেলা ক্রেতা বিরোধ নিষ্পত্তি কমিশন (ক্রেতা আদালত)',
      helpline: '1915 (জাতীয় ক্রেতা হেল্পলাইন)',
    },
    'topic-cyber': {
      title: 'সাইবার নিরাপত্তা, ডিজিটাল আর্থিক প্রতারণা ও অনলাইন হেনস্থা',
      shortDescription:
        'গোল্ডেন আওয়ারে টাকা উদ্ধার, ভুয়ো লোন অ্যাপ ব্ল্যাকমেল প্রতিরোধ এবং নিরাপদ অভিযোগ।',
      fullExplanation:
        'সাইবার অপরাধ আর্থিক জালিয়াতি, পরিচয় চুরি এবং অনলাইন হেনস্থার মাধ্যমে সাধারণ মানুষকে বিপদে ফেলে। তথ্যপ্রযুক্তি আইন ২০০০ এবং ভারতীয় ন্যায় সংহিতা অনুসারে বিনা অনুমতিতে ডিজিটাল অ্যাক্সেস, ব্যাংকিং ফিশিং এবং অনুমতি ছাড়া ব্যক্তিগত ছবি ছড়ানো কঠোর শাস্তিযোগ্য অপরাধ।',
      primaryLaw: 'তথ্যপ্রযুক্তি আইন, ২০০০ (ধারা ৪৩, ৬৬, ৬৭) এবং BNS',
      keyRights: [
        'গোল্ডেন আওয়ার ফ্রিজ: ঘটনার ২ ঘণ্টার মধ্যে ১৯৩০-এ কল করলে ব্যাংক লেনদেন সঙ্গে সঙ্গে স্থগিত করা যায়।',
        'ডিজিটাল গোপনীয়তার অধিকার: কোম্পানিগুলিকে আপনার ব্যক্তিগত তথ্য কঠোর সুরক্ষায় রাখতে হবে।',
        'তোলাবাজি থেকে সুরক্ষা: ভুয়ো লোন অ্যাপ বা বিকৃত ছবি দিয়ে ব্ল্যাকমেল করা কঠোর শাস্তিযোগ্য।',
        'বেনামে অভিযোগের অধিকার: মহিলারা এবং শিশুরা নাম প্রকাশ না করেই পোর্টালে অশ্লীল কন্টেন্টের অভিযোগ জানাতে পারেন।',
      ],
      whatToDoIfViolated: [
        'অননুমোদিত ব্যাংক লেনদেনের প্রথম ২ ঘণ্টার মধ্যে ১৯৩০ ডায়াল করুন।',
        'লেনদেনের ইউটিআর (UTR) নম্বর, ব্যাংক অ্যাকাউন্টের বিবরণ এবং স্ক্রিনশট সংগ্রহ করুন।',
        'cybercrime.gov.in পোর্টালে সঙ্গে সঙ্গে ই-অভিযোগ দায়ের করুন।',
        'চার্জ-ব্যাক শুরু করতে এবং সুবিধাভোগী অ্যাকাউন্ট ফ্রিজ করতে আপনার ব্যাংকে জানান।',
      ],
      recommendedAuthority: 'ভারতীয় সাইবার অপরাধ সমন্বয় কেন্দ্র (I4C) / স্থানীয় সাইবার থানা',
      helpline: '1930 (জাতীয় সাইবার আর্থিক প্রতারণা হেল্পলাইন)',
    },
    'topic-women': {
      title: 'নারী সুরক্ষা, মর্যাদা ও কর্মক্ষেত্রে হেনস্থা প্রতিরোধ',
      shortDescription:
        'গার্হস্থ্য হিংসা, কর্মক্ষেত্রে যৌন হেনস্থা (POSH), জিরো এফআইআর এবং বিনামূল্যে আইনি সহায়তা।',
      fullExplanation:
        'ভারতীয় আইন নারীদের বলিষ্ঠ সাংবিধানিক অধিকার দিয়েছে। গার্হস্থ্য হিংসা প্রতিরোধ আইন ২০০৫, কর্মক্ষেত্রে যৌন হেনস্থা প্রতিরোধ (POSH) আইন ২০১৩, ২৬ সপ্তাহের বেতনসহ মাতৃত্বকালীন ছুটি, দেশের যেকোনো থানায় জিরো এফআইআর করার অধিকার এবং নালসা (NALSA)-র মাধ্যমে সম্পূর্ণ বিনামূল্যে আইনি সাহায্য পাওয়ার অধিকার রয়েছে।',
      primaryLaw: 'গার্হস্থ্য হিংসা থেকে মহিলাদের সুরক্ষা আইন ২০০৫ এবং POSH আইন ২০১৩',
      keyRights: [
        'জিরো এফআইআর: ঘটনা যেখানেই ঘটুক, একজন মহিলা ভারতের যেকোনো থানায় এফআইআর করতে পারেন।',
        'গ্রেফতারের নিয়ম: সূর্যাস্তের পরে এবং সূর্যোদয়ের আগে মহিলা পুলিশ ছাড়া এবং ম্যাজিস্ট্রেটের বিশেষ নির্দেশ ছাড়া মহিলাকে গ্রেফতার করা যাবে না।',
        'স্ত্রীধনের অধিকার: বিয়ের আগে বা পরে পাওয়া সমস্ত গহনা ও উপহারের একমাত্র মালিক মহিলা নিজে।',
        'কর্মক্ষেত্রের সুরক্ষা: ১০ জনের বেশি কর্মচারী থাকলে প্রতিটি সংস্থায় অভ্যন্তরীণ অভিযোগ কমিটি (ICC) থাকা বাধ্যতামূলক।',
        'বিনামূল্যে আইনি সহায়তা: নালসা ধারা ১২ অনুযায়ী বিনামূল্যে আইনজীবী, কোর্ট ফি মকুব ও আইনি পরামর্শ।',
      ],
      whatToDoIfViolated: [
        'জরুরি চিকিৎসা ও আইনি সাহায্যের জন্য সখী ওয়ান স্টপ সেন্টার (OSC) বা ১৮১ নম্বরে কল করুন।',
        'কর্মক্ষেত্রের ঘটনার জন্য ৯০ দিনের মধ্যে অভ্যন্তরীণ কমিটির (ICC) কাছে লিখিত অভিযোগ দিন।',
        'জেলা আদালতের সুরক্ষা আধিকারিক বা জেলা আইনি পরিষেবা কর্তৃপক্ষের (DLSA) সাহায্য নিন।',
      ],
      recommendedAuthority: 'জাতীয় মহিলা কমিশন / সখী ওয়ান স্টপ সেন্টার / DLSA',
      helpline: '181 / 7827170170 (মহিলা হেল্পলাইন)',
    },
    'topic-labour': {
      title: 'শ্রমিক অধিকার, সময়মতো মজুরি এবং বেআইনি বরখাস্তের প্রতিকার',
      shortDescription:
        'সময়মতো বেতন পরিশোধ, গ্র্যাচুইটি দাবি, পিএফ জমা, নোটিশ পিরিয়ড এবং কাজের সময়ের নিয়মাবলী।',
      fullExplanation:
        'শ্রম আইন অনুযায়ী প্রত্যেক কর্মী সুরক্ষিত। নিয়োগকর্তারা চুক্তি অনুযায়ী সঠিক সময়ে বেতন দিতে, পিএফ জমা করতে, নিরাপদ কর্মপরিবেশ প্রদান করতে এবং ৫ বছর কাজের পর গ্র্যাচুইটি প্রদান করতে আইনত বাধ্য।',
      primaryLaw: 'মজুরি কোড, শিল্প বিরোধ আইন এবং গ্র্যাচুইটি প্রদান আইন',
      keyRights: [
        'সময়মতো বেতন: প্রতি মাসের ৭ বা ১০ তারিখের মধ্যে বেতন ব্যাংক অ্যাকাউন্টে জমা হতে হবে।',
        'চূড়ান্ত নিষ্পত্তি (F&F): ইস্তফার ২ কার্যদিবসের মধ্যে সমস্ত পাওনা পরিশোধ করতে হবে।',
        'গ্র্যাচুইটি: ৫ বছর নিরবচ্ছিন্ন কাজের পর প্রতি বছরের জন্য ১৫ দিনের বেতনের গ্র্যাচুইটি গ্যারান্টি।',
        'অন্যায় কর্তন নিষিদ্ধ: কর্মচারীর আয় থেকে অন্যায়ভাবে কোনো জরিমানা বা বেতন কাটা যাবে না।',
      ],
      whatToDoIfViolated: [
        'কর্তৃপক্ষকে রেজিস্টার্ড ডাক ও ইমেলের মাধ্যমে আনুষ্ঠানিক চিঠি (Demand Letter) পাঠান।',
        'শ্রম সুবিধা পোর্টালে (shramsuvidha.gov.in) অভিযোগ নথিভুক্ত করুন।',
        'আপসের জন্য জেলা শ্রম আপস আধিকারিকের (Labour Officer) কাছে আবেদন জানান।',
        'বেতন থেকে পিএফ কেটে ইপিএফও-তে জমা না দিলে epfigms.gov.in-এ অভিযোগ করুন।',
      ],
      recommendedAuthority: 'শ্রম কমিশনারের কার্যালয় / ইপিএফও (EPFO)',
      helpline: '14434 (শ্রম মন্ত্রক হেল্পলাইন)',
    },
    'topic-housing': {
      title: 'ভাড়াটেদের অধিকার: নিরাপত্তা আমানত, বেআইনি উচ্ছেদ ও নাগরিক সুবিধা',
      shortDescription:
        'বেআইনিভাবে উচ্ছেদের বিরুদ্ধে সুরক্ষা, সিকিউরিটি ডিপোজিটের সীমা, বিদ্যুৎ ও জল পরিষেবা রক্ষা।',
      fullExplanation:
        'মডেল ভাড়াটে আইন অনুযায়ী বাড়িওয়ালা ২৪ ঘণ্টার নোটিশ ছাড়া ভাড়া বাড়িতে ঢুকতে পারেন না। বাড়ি খালি করানোর জন্য জল বা বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা সম্পূর্ণ বেআইনি। চুক্তি শেষ হলে আমানত অর্থ অবিলম্বে ফেরত দিতে হবে।',
      primaryLaw: 'মডেল ভাড়াটে আইন এবং রাজ্য ভাড়া নিয়ন্ত্রণ আইন',
      keyRights: [
        'ডিপোজিটের সীমা: বাসস্থানের জন্য সর্বোচ্চ ২ মাসের ভাড়া এবং বাণিজ্যিক জায়গার জন্য ১ মাসের ভাড়া ডিপোজিট নেওয়া যায়।',
        'মৌলিক সুবিধা রক্ষা: বিদ্যুৎ বা জল সরবরাহ বন্ধ করা আইনত দণ্ডনীয় অপরাধ।',
        'পরিদর্শনের নোটিশ: বাড়িতে আসার আগে বাড়িওয়ালাকে অন্তত ২৪ ঘণ্টা আগে নোটিশ দিতে হবে।',
        'জোরপূর্বক উচ্ছেদ নিষিদ্ধ: আদালতের নির্দেশ ছাড়া ভাড়াটিয়াকে বলপূর্বক উচ্ছেদ করা যাবে না।',
      ],
      whatToDoIfViolated: [
        'সুবিধা বন্ধ করলে স্থানীয় থানায় বা ভাড়া নিয়ন্ত্রণ কর্তৃপক্ষের কাছে সঙ্গে সঙ্গে অভিযোগ করুন।',
        'ডিপোজিট ফেরত না দিলে আইনজীবীর মাধ্যমে লিগ্যাল নোটিশ পাঠান।',
        'ভাড়া আদালতে পিটিশন দায়ের করুন বা DLSA মধ্যস্থতা কেন্দ্রের সাহায্য নিন।',
      ],
      recommendedAuthority: 'ভাড়া কর্তৃপক্ষ / ভাড়া আদালত / মহকুমা শাসক (SDM)',
      helpline: '15100 (DLSA আইনি পরিষেবা হেল্পলাইন)',
    },
    'topic-police': {
      title: 'পুলিশি জিজ্ঞাসাবাদ ও গ্রেফতারের সময় নাগরিক অধিকার (ডি.কে. বসু নির্দেশিকা)',
      shortDescription:
        'সুপ্রিম কোর্টের ঐতিহাসিক ডিকে বসু নির্দেশিকা: গ্রেফতারের কারণ জানা, জিরো এফআইআর এবং ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেট হাজির।',
      fullExplanation:
        'সংবিধানের ২১ এবং ২২ নম্বর অনুচ্ছেদের অধীনে নাগরিকদের মৌলিক স্বাধীনতা সুরক্ষিত। ডি.কে. বসু বনাম পশ্চিমবঙ্গ রাজ্য মামলায় সুপ্রিম কোর্টের রায় অনুযায়ী পুলিশকে গ্রেফতারের সময় নির্দিষ্ট নিয়ম কঠোরভাবে মানতে হয়।',
      primaryLaw: 'ভারতের সংবিধান (অনুচ্ছেদ ২১, ২২) এবং BNSS / CrPC',
      keyRights: [
        'গ্রেফতারের কারণ জানার অধিকার: ঠিক কোন অপরাধে গ্রেফতার করা হচ্ছে তা পুলিশকে সঙ্গে সঙ্গে জানাতে হবে।',
        'আইনজীবীর সাহায্য: নিজের পছন্দের আইনজীবীর সঙ্গে পরামর্শ করার এবং আত্মপক্ষ সমর্থনের অধিকার।',
        'পরিবারকে জানানো: গ্রেফতারের ৮-১২ ঘণ্টার মধ্যে আত্মীয় বা বন্ধুকে পুলিশের জানাতে হবে।',
        '২৪ ঘণ্টার নিয়ম: গ্রেফতার ব্যক্তিকে ২৪ ঘণ্টার মধ্যে নিকটবর্তী বিচারবিভাগীয় ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে।',
        'স্বাস্থ্য পরীক্ষার অধিকার: গ্রেফতারের সময় এবং হেফাজতে প্রতি ৪৮ ঘণ্টায় চিকিৎসকের দ্বারা পরীক্ষার দাবি করা যায়।',
        'অ্যারেস্ট মেমো: সাক্ষীর উপস্থিতিতে পুলিশকে আনুষ্ঠানিক অ্যারেস্ট মেমো তৈরি করতে হবে।',
      ],
      whatToDoIfViolated: [
        'পুলিশ আধিকারিকের নেমপ্লেট ও পরিচয়পত্র দেখতে চান।',
        'অবিলম্বে পরিবারকে জানান এবং থানার সঠিক নাম ও অবস্থান বলে দিন।',
        'বিনামূল্যে ডিউটি আইনজীবীর সাহায্য চান (LADCS)।',
        'হেফাজতে নির্যাতন হলে ম্যাজিস্ট্রেটের সামনে প্রথম হাজিরার সময় সরাসরি জানান।',
      ],
      recommendedAuthority: 'বিচারবিভাগীয় ম্যাজিস্ট্রেট / রাজ্য মানবাধিকার কমিশন / এসপি অফিস',
      helpline: '112 / 14433 (মানবাধিকার হেল্পলাইন)',
    },
    'topic-rti': {
      title: 'তথ্যের অধিকার (RTI): সরকারি জবাবদিহিতা ও স্বচ্ছতা',
      shortDescription:
        'মাত্র ₹১০ ফিতে আরটিআই আবেদন, ৩০ দিনের মধ্যে বাধ্যতামূলক উত্তর এবং তথ্য কমিশনে আপিল।',
      fullExplanation:
        'তথ্য জানার অধিকার আইন ২০০৫ প্রত্যেক ভারতীয় নাগরিককে সরকারি দপ্তরকে প্রশ্ন করার, কাজ পরিদর্শন করার এবং নথির সার্টিফায়েড কপি পাওয়ার ক্ষমতা দেয়। তথ্য আধিকারিকরা ৩০ দিনের মধ্যে উত্তর দিতে বাধ্য (জীবন ও স্বাধীনতার বিষয় হলে ৪৮ ঘণ্টার মধ্যে)।',
      primaryLaw: 'তথ্য জানার অধিকার আইন, ২০০৫',
      keyRights: [
        '৩০ দিনে বাধ্যতামূলক উত্তর: চাওয়া তথ্য ৩০ দিনের মধ্যে সরবরাহ করতে হবে।',
        'জীবন ও স্বাধীনতার নিয়ম: জীবন সংক্রান্ত তথ্য ৪৮ ঘণ্টার মধ্যে প্রদান করতে হবে।',
        'স্বল্প খরচ: কেন্দ্রীয় আরটিআই আবেদন ফি মাত্র ₹১০ (দারিদ্র্যসীমার নিচে থাকা ব্যক্তিদের জন্য বিনামূল্যে)।',
        'আধিকারিকদের জরিমানা: বিনা কারণে দেরি করলে আধিকারিককে প্রতিদিন ₹২৫০ করে সর্বোচ্চ ₹২৫,০০০ জরিমানা।',
      ],
      whatToDoIfViolated: [
        'সময়সীমা শেষের ৩০ দিনের মধ্যে প্রথম আপিল কর্তৃপক্ষের (FAA) কাছে আপিল করুন।',
        'উত্তর না পেলে কেন্দ্রীয় বা রাজ্য তথ্য কমিশনে দ্বিতীয় আপিল দায়ের করুন।',
      ],
      recommendedAuthority: 'কেন্দ্রীয় তথ্য কমিশন (CIC) / রাজ্য তথ্য কমিশন',
      helpline: '011-26183027 (কেন্দ্রীয় তথ্য কমিশন)',
    },
    'topic-students': {
      title: 'ছাত্রছাত্রীদের অধিকার: র‍্যাগিং বিরোধী সুরক্ষা, ফি ফেরত ও মূল নথিপত্র',
      shortDescription:
        'ইউজিসি নির্দেশিকা: বাধ্যতামূলক ফি ফেরত, মূল সার্টিফিকেট আটকে রাখা নিষিদ্ধ এবং র‍্যাগিংমুক্ত পরিবেশ।',
      fullExplanation:
        'ইউজিসি (UGC) এবং এআইসিটিই-র নিয়ম অনুসারে কলেজগুলি কোনো অবস্থাতেই ছাত্রছাত্রীদের মূল মার্কশিট বা সার্টিফিকেট আটকে রাখতে পারে না। নির্দিষ্ট সময়ের মধ্যে ভর্তি বাতিল করলে ফি ফেরত দেওয়া এবং র‍্যাগিং সম্পূর্ণ বন্ধ রাখা বাধ্যতামূলক।',
      primaryLaw: 'ইউজিসি ফি ফেরত নিয়মাবলী এবং অ্যান্টি-র‍্যাগিং বিধিমালা ২০০৯',
      keyRights: [
        'মূল নথিপত্রের সুরক্ষা: কলেজ মূল সার্টিফিকেট আটকে রাখতে পারে না।',
        'ফি ফেরতের অধিকার: কাউন্সেলিংয়ের সময় ভর্তি বাতিল করলে নিয়মমাফিক ফি ফেরত পাওয়ার অধিকার।',
        'র‍্যাগিং বিরোধী সুরক্ষা: র‍্যাগিং একটি জামিন অযোগ্য অপরাধ; গাফিলতি করলে কলেজের অনুমোদন বাতিল হতে পারে।',
        'অভিযোগ নিষ্পত্তি সেল: প্রতিটি উচ্চশিক্ষা প্রতিষ্ঠানে ছাত্র অভিযোগ নিষ্পত্তি কমিটি (SGRC) থাকতে হবে।',
      ],
      whatToDoIfViolated: [
        'ইউজিসির e-Samadhan পোর্টালে (samadhan.ugc.ac.in) অভিযোগ দায়ের করুন।',
        'র‍্যাগিংয়ের ঘটনার জন্য ২৪x৭ টোল ফ্রি নম্বর ১৮০০-১৮০-৫৫২২-এ সঙ্গে সঙ্গে ফোন করুন।',
        'ফি ফেরত না দিলে ক্রেতা সুরক্ষা আদালতের সাহায্য নিন।',
      ],
      recommendedAuthority: 'ইউজিসি ই-সমাধান / জাতীয় অ্যান্টি-র‍্যাগিং সেল',
      helpline: '1800-180-5522 (জাতীয় অ্যান্টি-র‍্যাগিং টোল ফ্রি)',
    },
    'topic-seniors': {
      title: 'প্রবীণ নাগরিক সুরক্ষা, মাসিক ভরণপোষণ ও সম্পত্তি রক্ষার অধিকার',
      shortDescription:
        'এসডিএম ট্রাইব্যুনাল নির্দেশ, পিতা-মাতাকে অবহেলা করলে দানপত্র (Gift Deed) বাতিল ও স্বাস্থ্য সুরক্ষা।',
      fullExplanation:
        'পিতা-মাতা ও প্রবীণ নাগরিক ভরণপোষণ ও কল্যাণ আইন ২০০৭ প্রবীণ নাগরিকদের (৬০ বছর ও বেশি) সন্তানদের কাছ থেকে প্রতি মাসে ভরণপোষণ পাওয়ার দ্রুত ও খরচহীন ব্যবস্থা দেয়। সন্তানদের দেখাশোনা না করলে তাদের দেওয়া সম্পত্তি ফিরিয়ে নেওয়ার অধিকার ট্রাইব্যুনালের রয়েছে।',
      primaryLaw: 'পিতা-মাতা ও প্রবীণ নাগরিক ভরণপোষণ ও কল্যাণ আইন, ২০০৭',
      keyRights: [
        'মাসিক ভরণপোষণের অধিকার: সন্তানরা খাবার, পোশাক, বাসস্থান ও চিকিৎসা খরচ জোগাতে বাধ্য।',
        'সম্পত্তি হস্তান্তর বাতিল: ধারা ২৩ অনুযায়ী পিতা-মাতাকে অবহেলা করলে সন্তানদের দেওয়া সম্পত্তি বাতিল হতে পারে।',
        'দ্রুত নিষ্পত্তি: আইনজীবীর ঝামেলা ছাড়াই এসডিএম ট্রাইব্যুনাল ৯০ দিনের মধ্যে রায় দেয়।',
        'বৃদ্ধদের পরিত্যাগ করা অপরাধ: প্রবীণ নাগরিকদের অসহায় অবস্থায় ফেলে যাওয়া দণ্ডনীয় অপরাধ।',
      ],
      whatToDoIfViolated: [
        'বিনামূল্যে পরামর্শ ও সাহায্যের জন্য এল্ডারলাইন ১৪৫৬৭ নম্বরে কল করুন।',
        'মহকুমা শাসক (SDM) / ট্রাইব্যুনালের কাছে সাধারণ কাগজে আবেদন জমা দিন।',
        'জেলা সমাজকল্যাণ আধিকারিক বা DLSA অফিসের সাহায্য নিন।',
      ],
      recommendedAuthority: 'ভরণপোষণ ট্রাইব্যুনাল (SDM) / সমাজকল্যাণ দপ্তর',
      helpline: '14567 (এল্ডারলাইন জাতীয় প্রবীণ নাগরিক হেল্পলাইন)',
    },
  },

  Gujarati: {
    'topic-consumer': {
      title: 'ગ્રાહક સુરક્ષા, ખામીયુક્ત વસ્તુઓ અને સેવામાં ખામી',
      shortDescription:
        'ખામીયુક્ત માલ, ગેરમાર્ગે દોરતી જાહેરાતો અને અયોગ્ય વેપાર પદ્ધતિઓ સામે તમારા કાનૂની અધિકારો.',
      fullExplanation:
        'ગ્રાહક સુરક્ષા અધિનિયમ ૨૦૧૯ હેઠળ, દરેક ભારતીય ગ્રાહકને સેવામાં ખામી, અયોગ્ય કરાર, વધુ પડતા ભાવ વસૂલવા અને હલકી ગુણવત્તાવાળા માલ સામે કાનૂની રક્ષણ છે. તમે સ્થાનિક દુકાનમાંથી ખરીદી કરી હોય કે ઓનલાઇન સાઇટ પરથી, કંપનીઓ વચન મુજબ માલ-સેવા પૂરી પાડવા માટે બંધાયેલી છે.',
      primaryLaw: 'ગ્રાહક સુરક્ષા અધિનિયમ, ૨૦૧૯ અને ઇ-કોમર્સ નિયમો, ૨૦૨૦',
      keyRights: [
        'સલામતીનો અધિકાર: જીવન કે સંપત્તિ માટે જોખમી માલ અને સેવાઓ સામે રક્ષણ.',
        'માહિતી મેળવવાનો અધિકાર: માલની ગુણવત્તા, જથ્થો, શુદ્ધતા, ધોરણ અને સાચી કિંમતની માહિતી.',
        'નિવારણનો અધિકાર: ખામીયુક્ત માલ કે સેવાની ખામી સામે વળતર અને રિફંડ મેળવવાનો અધિકાર.',
        'ગેરમાર્ગે દોરતી જાહેરાતો સામે અધિકાર: ખોટી જાહેરાત કરતી કંપનીઓ પર ભારે દંડ.',
        'પ્રોડક્ટ લાયબિલિટી: ખામીયુક્ત પ્રોડક્ટથી થયેલા નુકસાન માટે ઉત્પાદક અને વિક્રેતા સંપૂર્ણ જવાબદાર.',
      ],
      whatToDoIfViolated: [
        'ઓર્ડર આઈડી, બિલ અને સમસ્યાની વિગતો સાથે લેખિત ફરિયાદ તૈયાર કરો.',
        'રાષ્ટ્રીય ગ્રાહક હેલ્પલાઇન ૧૯૧૫ પર કૉલ કરો અથવા ૮૮૦૦૦૦૧૯૧૫ પર વોટ્સએપ મેસેજ કરો.',
        'consumerhelpline.gov.in પર ફરિયાદ નોંધાવો અથવા e-Daakhil (edaakhil.nic.in) પર ઓનલાઇન કેસ દાખલ કરો.',
        '₹૫૦ લાખ સુધીના દાવાઓની સુનાવણી જિલ્લા ગ્રાહક આયોગમાં નજીવી ફી સાથે થાય છે.',
      ],
      recommendedAuthority: 'જિલ્લા ગ્રાહક તકરાર નિવારણ આયોગ (ગ્રાહક ફોરમ)',
      helpline: '1915 (રાષ્ટ્રીય ગ્રાહક હેલ્પલાઇન)',
    },
    'topic-cyber': {
      title: 'સાયબર સુરક્ષા, ડિજિટલ નાણાકીય છેતરપિંડી અને ગોપનીયતા',
      shortDescription:
        'ગોલ્ડન અવરમાં પૈસા પરત મેળવવા, નકલી લોન એપ બ્લેકમેલિંગ સામે રક્ષણ અને સલામત ફરિયાદ.',
      fullExplanation:
        'સાયબર ક્રાઈમ નાણાકીય છેતરપિંડી, ઓળખની ચોરી અને ઓનલાઇન પજવણી દ્વારા સામાન્ય નાગરિકોને નુકસાન પહોંચાડે છે. આઈટી એક્ટ ૨૦૦૦ અને ભારતીય ન્યાય સંહિતા હેઠળ અનધિકૃત એક્સેસ, ફિશિંગ અને સંમતિ વિના અંગત ફોટા વાયરલ કરવા ગંભીર ગુના છે.',
      primaryLaw: 'માહિતી ટેકનોલોજી અધિનિયમ, ૨૦૦૦ (કલમ ૪૩, ૬૬, ૬૭) અને BNS',
      keyRights: [
        'ગોલ્ડન અવર ફ્રીઝ: ઘટનાના ૨ કલાકમાં ૧૯૩૦ પર કૉલ કરવાથી બેંકિંગ ટ્રાન્સફર રોકી શકાય છે.',
        'ડિજિટલ ગોપનીયતાનો અધિકાર: કંપનીઓએ તમારા અંગત ડેટાને કડક સુરક્ષા સાથે સાચવવો પડશે.',
        'બ્લેકમેલિંગ સામે રક્ષણ: નકલી લોન એપ અથવા મોર્ફ કરેલા ફોટા વડે ધમકાવવું સખત સજાપાત્ર છે.',
        'ગુપ્ત રીતે ફરિયાદનો અધિકાર: મહિલાઓ અને બાળકો નામ જાહેર કર્યા વિના પોર્ટલ પર ફરિયાદ કરી શકે છે.',
      ],
      whatToDoIfViolated: [
        'અનધિકૃત બેંક ડેબિટના પ્રથમ ૨ કલાકમાં તરત ૧૯૩૦ ડાયલ કરો.',
        'ટ્રાન્ઝેક્શન યુટીઆર (UTR) નંબર, બેંક એકાઉન્ટ વિગતો અને સ્ક્રીનશોટ પુરાવા એકત્ર કરો.',
        'cybercrime.gov.in પોર્ટલ પર તાત્કાલિક ઈ-ફરિયાદ નોંધાવો.',
        'ચાર્જ-બેક શરૂ કરવા અને સંબંધિત એકાઉન્ટ ફ્રીઝ કરવા બેંકને જાણ કરો.',
      ],
      recommendedAuthority: 'ભારતીય સાયબર ક્રાઈમ કોઓર્ડિનેશન સેન્ટર (I4C) / સ્થાનિક સાયબર સેલ',
      helpline: '1930 (રાષ્ટ્રીય સાયબર ફ્રોડ હેલ્પલાઇન)',
    },
    'topic-women': {
      title: 'મહિલા સુરક્ષા, ગૌરવ અને કાર્યસ્થળે ઉત્પીડન સામે રક્ષણ',
      shortDescription:
        'ઘરેલું હિંસા, કાર્યસ્થળે જાતીય સતામણી (POSH), ઝીરો એફઆઈઆર અને મફત કાનૂની સહાય.',
      fullExplanation:
        'ભારતીય કાયદો મહિલાઓને મજબૂત બંધારણીય અધિકારો આપે છે. જેમાં ઘરેલું હિંસા અધિનિયમ ૨૦૦૫, કાર્યસ્થળે જાતીય સતામણી નિવારણ (POSH) અધિનિયમ ૨૦૧૩, ૨૬ અઠવાડિયાની પગાર સહિત પ્રસૂતિ રજા, ઝીરો એફઆઈઆર નોંધાવવાનો અધિકાર અને નાલસા (NALSA) દ્વારા ૧૦૦% મફત કાનૂની સહાય સામેલ છે.',
      primaryLaw: 'ઘરેલું હિંસાથી મહિલાઓનું સંરક્ષણ અધિનિયમ ૨૦૦૫ અને POSH અધિનિયમ ૨૦૧૩',
      keyRights: [
        'ઝીરો એફઆઈઆર: ગુનો ગમે ત્યાં બન્યો હોય, મહિલા ભારતના કોઈપણ પોલીસ સ્ટેશનમાં એફઆઈઆર કરાવી શકે છે.',
        'ધરપકડના નિયમો: સૂર્યાસ્ત પછી અને સૂર્યોદય પહેલાં મેજિસ્ટ્રેટના હુકમ વિના મહિલાની ધરપકડ ન થઈ શકે, માત્ર મહિલા પોલીસ જ ધરપકડ કરી શકે.',
        'સ્ત્રીધન પર અધિકાર: લગ્ન પહેલાં કે પછી મળેલા તમામ ઘરેણાં અને મિલકત પર માત્ર મહિલાનો જ હક છે.',
        'કાર્યસ્થળ રક્ષણ: ૧૦ થી વધુ કર્મચારીઓ ધરાવતી દરેક સંસ્થામાં આંતરિક ફરિયાદ સમિતિ (ICC) હોવી ફરજિયાત છે.',
        'મફત કાનૂની સહાય: કલમ ૧૨ નાલસા હેઠળ મફત વકીલ, કોર્ટ ફી માફી અને કાનૂની માર્ગદર્શન.',
      ],
      whatToDoIfViolated: [
        'તાત્કાલિક તબીબી અને કાનૂની મદદ માટે સખી વન સ્ટોપ સેન્ટર (OSC) અથવા ૧૮૧ પર કૉલ કરો.',
        'કાર્યસ્થળના મામલામાં ૯૦ દિવસમાં આંતરિક સમિતિને (ICC) લેખિત ફરિયાદ આપો.',
        'જિલ્લા કોર્ટમાં પ્રોટેક્શન ઓફિસર અથવા જિલ્લા કાનૂની સેવા સત્તામંડળનો (DLSA) સંપર્ક કરો.',
      ],
      recommendedAuthority: 'રાષ્ટ્રીય મહિલા આયોગ / સખી વન સ્ટોપ સેન્ટર / DLSA',
      helpline: '181 / 7827170170 (મહિલા હેલ્પલાઇન)',
    },
    'topic-labour': {
      title: 'કામદાર અધિકારો, સમયસર વેતન અને ગેરકાયદેસર છટણી સામે રક્ષણ',
      shortDescription:
        'સમયસર પગાર, ગ્રેચ્યુઇટી અધિકાર, પીએફ જમા, નોટિસ પિરિયડ અને કામના કલાકોના નિયમો.',
      fullExplanation:
        'શ્રમ કાયદાઓ કર્મચારીઓને સંપૂર્ણ રક્ષણ આપે છે. નોકરીદાતાઓએ નક્કી કરેલું વેતન સમયસર ચૂકવવું, પીએફ જમા કરાવવો, સલામત કાર્યસ્થળ આપવું અને ૫ વર્ષની સેવા પછી ગ્રેચ્યુઇટી આપવી કાયદેસર રીતે ફરજિયાત છે.',
      primaryLaw: 'વેતન સંહિતા, ઔદ્યોગિક વિવાદ અધિનિયમ અને ગ્રેચ્યુઇટી અધિનિયમ',
      keyRights: [
        'સમયસર પગાર: દર મહિનાની ૭ કે ૧૦ તારીખ પહેલાં પગાર ખાતામાં જમા થવો જોઈએ.',
        'સંપૂર્ણ હિસાબ (F&F): રાજીનામા પછી ૨ કામકાજના દિવસોમાં તમામ બાકી રકમ ચૂકવવી જોઈએ.',
        'ગ્રેચ્યુઇટી: ૫ વર્ષ પૂરા થયા પછી દર વર્ષ માટે ૧૫ દિવસના પગાર જેટલી ગ્રેચ્યુઇટી ગેરંટી.',
        'ગેરકાયદે કપાત પર પ્રતિબંધ: પગારમાંથી મનસ્વી દંડ કે ગેરકાયદે કપાત ન કરી શકાય.',
      ],
      whatToDoIfViolated: [
        'મેનેજમેન્ટને રજિસ્ટર્ડ પોસ્ટ અને ઈમેલ દ્વારા ડિમાન્ડ લેટર મોકલો.',
        'શ્રમ સુવિધા પોર્ટલ (shramsuvidha.gov.in) પર ફરિયાદ નોંધાવો.',
        'સમાધાન માટે જિલ્લા શ્રમ અધિકારીનો સંપર્ક કરો.',
        'પગારમાંથી પીએફ કપાયો હોય પણ ઇપીએફઓમાં જમા ન થયો હોય તો epfigms.gov.in પર ફરિયાદ કરો.',
      ],
      recommendedAuthority: 'શ્રમ કમિશનર કચેરી / કર્મચારી ભવિષ્ય નિધિ સંગઠન (EPFO)',
      helpline: '14434 (શ્રમ મંત્રાલય હેલ્પલાઇન)',
    },
    'topic-housing': {
      title: 'ભાડૂઆતના અધિકારો: ડિપોઝિટ પરત, ગેરકાયદેસર ખાલી કરાવવું અને સુવિધાઓ',
      shortDescription:
        'ગેરકાયદેસર રીતે કાઢી મૂકવા સામે રક્ષણ, ડિપોઝિટની મર્યાદા, વીજળી અને પાણીની સુવિધાઓનું રક્ષણ.',
      fullExplanation:
        'મોડેલ ટેનન્સી એક્ટ મુજબ, મકાનમાલિક ૨૪ કલાકની અગાઉથી નોટિસ આપ્યા વિના મકાનમાં પ્રવેશી શકતા નથી. મકાન ખાલી કરાવવા માટે વીજળી કે પાણી પુરવઠો કાપી શકતા નથી. ભાડૂઆતનો કરાર પૂરો થતાં જ ડિપોઝિટ તરત પરત કરવી પડે છે.',
      primaryLaw: 'મોડેલ ટેનન્સી એક્ટ અને રાજ્ય ભાડા નિયંત્રણ કાયદા',
      keyRights: [
        'ડિપોઝિટ મર્યાદા: રહેણાંક મકાન માટે વધુમાં વધુ ૨ મહિનાનું ભાડું અને વ્યવસાયિક જગ્યા માટે ૧ મહિનાનું ભાડું ડિપોઝિટ લઈ શકાય.',
        'મૂળભૂત સુવિધાઓનું રક્ષણ: વીજળી કે પાણી કાપવું એ કાયદેસરનો ગુનો છે.',
        'તપાસ પહેલાં નોટિસ: મકાન જોવા આવતા પહેલાં ઓછામાં ઓછી ૨૪ કલાક અગાઉ નોટિસ આપવી પડશે.',
        'બળજબરીથી ખાલી કરાવવા પર પ્રતિબંધ: કોર્ટના હુકમ વિના ભાડૂઆતને બળજબરીથી કાઢી શકાતો નથી.',
      ],
      whatToDoIfViolated: [
        'સુવિધાઓ બંધ કરે તો સ્થાનિક પોલીસ અથવા રેન્ટ ઓથોરિટી પાસે તાત્કાલિક ફરિયાદ કરો.',
        'ડિપોઝિટ પરત ન કરે તો વકીલ મારફતે લીગલ નોટિસ મોકલો.',
        'રેન્ટ કોર્ટમાં અરજી કરો અથવા DLSA મધ્યસ્થતા કેન્દ્રની મદદ લો.',
      ],
      recommendedAuthority: 'રેન્ટ ઓથોરિટી / રેન્ટ કોર્ટ / નાયબ કલેક્ટર (SDM)',
      helpline: '15100 (DLSA કાનૂની સેવા હેલ્પલાઇન)',
    },
    'topic-police': {
      title: 'પોલીસ પૂછપરછ અને ધરપકડ દરમિયાન નાગરિક અધિકારો (ડી.કે. બાસુ માર્ગદર્શિકા)',
      shortDescription:
        'સુપ્રીમ કોર્ટની ઐતિહાસિક ડીકે બાસુ ગાઇડલાઇન: ધરપકડના કારણો, ઝીરો એફઆઈઆર અને ૨૪ કલાકમાં મેજિસ્ટ્રેટ સમક્ષ હાજરી.',
      fullExplanation:
        'બંધારણની કલમ ૨૧ અને ૨૨ હેઠળ દરેક નાગરિકને મૂળભૂત સ્વતંત્રતા છે. ડી.કે. બાસુ વિ. પશ્ચિમ બંગાળ રાજ્ય કેસમાં સુપ્રીમ કોર્ટે ધરપકડ વખતે પોલીસે પાળવાના ફરજિયાત નિયમો નક્કી કર્યા છે.',
      primaryLaw: 'ભારતીય બંધારણ (કલમ ૨૧, ૨૨) અને BNSS / CrPC',
      keyRights: [
        'ધરપકડનું કારણ જાણવાનો અધિકાર: પોલીસે ગુનો અને ધરપકડનું કારણ તાત્કાલિક સ્પષ્ટ કરવું પડશે.',
        'વકીલની મદદ: પોતાની પસંદગીના વકીલની સલાહ લેવાનો અને બચાવ કરવાનો સંપૂર્ણ અધિકાર.',
        'પરિવારને જાણ કરવી: ધરપકડના ૮-૧૨ કલાકમાં સગાંસંબંધીને પોલીસે જાણ કરવી પડશે.',
        '૨૪ કલાકનો નિયમ: ધરપકડ કરાયેલ વ્યક્તિને ૨૪ કલાકમાં નજીકના મેજિસ્ટ્રેટ સમક્ષ હાજર કરવી ફરજિયાત છે.',
        'તબીબી તપાસનો અધિકાર: ધરપકડ વખતે અને કસ્ટડીમાં દર ૪૮ કલાકે સ્વતંત્ર ડૉક્ટર પાસે તપાસ કરાવી શકાય.',
        'ધરપકડ મેમો (Arrest Memo): સાક્ષીની હાજરીમાં કાયદેસર ધરપકડ મેમો બનાવવો જરૂરી છે.',
      ],
      whatToDoIfViolated: [
        'પોલીસ અધિકારીનું નેમપ્લેટ અને આઈડી કાર્ડ જોવાની માંગ કરો.',
        'પરિવારને તાત્કાલિક જાણ કરીને પોલીસ સ્ટેશનનું ચોક્કસ નામ જણાવો.',
        'મફત ડ્યુટી વકીલ મેળવવાની માંગણી કરો (LADCS).',
        'કસ્ટડીમાં ત્રાસ થયો હોય તો મેજિસ્ટ્રેટ સમક્ષ પહેલી હાજરી વખતે સીધી ફરિયાદ કરો.',
      ],
      recommendedAuthority: 'જ્યુડિશિયલ મેજિસ્ટ્રેટ / રાજ્ય માનવ અધિકાર આયોગ / એસપી કચેરી',
      helpline: '112 / 14433 (માનવ અધિકાર હેલ્પલાઇન)',
    },
    'topic-rti': {
      title: 'માહિતીનો અધિકાર (RTI): સરકારી પારદર્શિતા અને જવાબદેહી',
      shortDescription:
        'માત્ર ₹૧૦ ફીમાં આરટીઆઈ અરજી, ૩૦ દિવસમાં ફરજિયાત જવાબ અને માહિતી આયોગમાં અપીલ.',
      fullExplanation:
        'માહિતી અધિકાર અધિનિયમ ૨૦૦૫ દરેક નાગરિકને સરકારી વિભાગોને પ્રશ્નો પૂછવા, દસ્તાવેજો ચકાસવા અને પ્રમાણિત નકલો મેળવવાની સત્તા આપે છે. માહિતી અધિકારીઓએ ૩૦ દિવસમાં માહિતી આપવી ફરજિયાત છે (જીવન અને સ્વતંત્રતા અંગે ૪૮ કલાકમાં).',
      primaryLaw: 'માહિતી અધિકાર અધિનિયમ, ૨૦૦૫',
      keyRights: [
        '૩૦ દિવસમાં ફરજિયાત જવાબ: માંગેલી માહિતી ૩૦ દિવસમાં આપવી પડશે.',
        'જીવન અને સ્વતંત્રતાનો નિયમ: તાકીદની બાબતોમાં ૪૮ કલાકમાં માહિતી પૂરી પાડવી પડશે.',
        'ઓછો ખર્ચ: કેન્દ્રીય આરટીઆઈ અરજી ફી માત્ર ₹૧૦ છે (બીપીએલ નાગરિકો માટે તદ્દન મફત).',
        'અધિકારીઓ પર દંડ: વિલંબ માટે અધિકારી પર રોજના ₹૨૫૦ લેખે મહત્તમ ₹૨૫,૦૦૦ સુધીનો અંગત દંડ થઈ શકે.',
      ],
      whatToDoIfViolated: [
        'મુદત વીત્યાના ૩૦ દિવસમાં પ્રથમ અપીલ અધિકારી (FAA) સમક્ષ અપીલ કરો.',
        'જવાબ ન મળે તો કેન્દ્રીય અથવા રાજ્ય માહિતી આયોગમાં બીજી અપીલ કરો.',
      ],
      recommendedAuthority: 'કેન્દ્રીય માહિતી આયોગ (CIC) / ગુજરાત માહિતી આયોગ',
      helpline: '011-26183027 (કેન્દ્રીય માહિતી આયોગ)',
    },
    'topic-students': {
      title: 'વિદ્યાર્થી અધિકારો: રેગિંગ વિરોધી રક્ષણ, ફી રિફંડ અને મૂળ પ્રમાણપત્રો',
      shortDescription:
        'યુજીસી નિયમો: ફી પરત આપવી ફરજિયાત, મૂળ પ્રમાણપત્રો રોકી રાખવા પર પ્રતિબંધ અને રેગિંગ મુક્ત કેમ્પસ.',
      fullExplanation:
        'યુનિવર્સિટી ગ્રાન્ટ્સ કમિશન (UGC) અને AICTE ના નિયમો અનુસાર, કોલેજો વિદ્યાર્થીઓના મૂળ પ્રમાણપત્રો પોતાની પાસે રાખી શકતી નથી. પ્રવેશ રદ થાય તો નિયમ મુજબ ફી પરત કરવી અને રેગિંગ સંપૂર્ણપણે અટકાવવું ફરજિયાત છે.',
      primaryLaw: 'યુજીસી ફી રિફંડ નિયમો અને એન્ટિ-રેગિંગ રેગ્યુલેશન્સ ૨૦૦૯',
      keyRights: [
        'મૂળ દસ્તાવેજોનું રક્ષણ: કોલેજો પાસે અસલ માર્કશીટ રોકી રાખવાનો કોઈ કાનૂની અધિકાર નથી.',
        'ફી પરત મેળવવાનો અધિકાર: કાઉન્સિલિંગ દરમિયાન એડમિશન રદ કરાવે તો પ્રમાણસર ફી પાછી મેળવવાનો હક.',
        'રેગિંગ વિરોધી રક્ષણ: રેગિંગ ગંભીર બિનજામીનપાત્ર ગુનો છે; બેદરકાર કોલેજની માન્યતા રદ થઈ શકે છે.',
        'ફરિયાદ નિવારણ: દરેક ઉચ્ચ શિક્ષણ સંસ્થામાં સ્ટુડન્ટ ગ્રીવન્સ રિડ્રેસલ કમિટી (SGRC) હોવી ફરજિયાત છે.',
      ],
      whatToDoIfViolated: [
        'યુજીસીના e-Samadhan પોર્ટલ પર (samadhan.ugc.ac.in) ફરિયાદ નોંધાવો.',
        'રેગિંગની ઘટના માટે ૨૪x૭ ટોલ ફ્રી નંબર ૧૮૦૦-૧૮૦-૫૫૨૨ પર તાત્કાલિક કૉલ કરો.',
        'ફી પરત ન કરે તો ગ્રાહક સુરક્ષા ફોરમનો સંપર્ક કરો.',
      ],
      recommendedAuthority: 'યુજીસી ઈ-સમાધાન / રાષ્ટ્રીય એન્ટિ-રેગિંગ સેલ',
      helpline: '1800-180-5522 (રાષ્ટ્રીય એન્ટિ-રેગિંગ ટોલ ફ્રી)',
    },
    'topic-seniors': {
      title: 'વરિષ્ઠ નાગરિક સુરક્ષા, માસિક ભરણપોષણ અને મિલકત સુરક્ષા',
      shortDescription:
        'એસડીએમ મેન્ટેનન્સ ટ્રિબ્યુનલ હુકમ, માતાપિતાની ઉપેક્ષા કરનાર સંતાનોનું ગિફ્ટ ડીડ રદ કરવું.',
      fullExplanation:
        'માતાપિતા અને વરિષ્ઠ નાગરિકોના ભરણપોષણ અને કલ્યાણ અધિનિયમ ૨૦૦૭ વૃદ્ધોને (૬૦ વર્ષ કે તેથી વધુ) સંતાનો પાસેથી માસિક ભરણપોષણ મેળવવા માટે વકીલ વિનાની ઝડપી વ્યવસ્થા આપે છે. માતાપિતાની સારસંભાળ ન રાખે તો સંતાનોને આપેલી મિલકત પાછી લેવાની ટ્રિબ્યુનલ પાસે સત્તા છે.',
      primaryLaw: 'માતાપિતા અને વરિષ્ઠ નાગરિકોના ભરણપોષણ અને કલ્યાણ અધિનિયમ, ૨૦૦૭',
      keyRights: [
        'માસિક ભરણપોષણનો અધિકાર: સંતાનો ખોરાક, કપડાં, આશ્રય અને તબીબી ખર્ચ પૂરો પાડવા માટે બંધાયેલા છે.',
        'મિલકત ટ્રાન્સફર રદ: કલમ ૨૩ હેઠળ, માતાપિતાની ઉપેક્ષા થાય તો સંતાનોને આપેલી મિલકતનું ગિફ્ટ ડીડ રદ થઈ શકે છે.',
        'ઝડપી નિકાલ: એસડીએમ ટ્રિબ્યુનલ ૯૦ દિવસમાં કેસોનો નિકાલ કરે છે.',
        'વૃદ્ધોને તરછોડવા ગુનો: વરિષ્ઠ નાગરિકોને નિરાધાર છોડી દેવા એ સજાપાત્ર ગુનો છે.',
      ],
      whatToDoIfViolated: [
        'મફત કાઉન્સેલિંગ અને મદદ માટે એલ્ડરલાઇન ૧૪૫૬૭ પર કૉલ કરો.',
        'નાયબ કલેક્ટર (SDM) / મેન્ટેનન્સ ટ્રિબ્યુનલ સમક્ષ અરજી કરો.',
        'જિલ્લા સમાજ કલ્યાણ અધિકારી અથવા DLSA કચેરીની મદદ લો.',
      ],
      recommendedAuthority: 'મેન્ટેનન્સ ટ્રિબ્યુનલ (SDM) / સમાજ કલ્યાણ વિભાગ',
      helpline: '14567 (એલ્ડરલાઇન રાષ્ટ્રીય વરિષ્ઠ નાગરિક હેલ્પલાઇન)',
    },
  },

  Malayalam: {
    'topic-consumer': {
      title: 'ഉപഭോക്തൃ സംരക്ഷണം, ന്യൂനതയുള്ള സാധനങ്ങളും സേവന വീഴ്ചയും',
      shortDescription:
        'ന്യൂനതയുള്ള സാധനങ്ങൾ, തെറ്റിദ്ധരിപ്പിക്കുന്ന പരസ്യങ്ങൾ, അധാർമ്മിക വ്യാപാര രീതികൾ എന്നിവയ്‌ക്കെതിരായ നിങ്ങളുടെ അവകാശങ്ങൾ.',
      fullExplanation:
        'ഉപഭോക്തൃ സംരക്ഷണ നിയമം 2019 പ്രകാരം, ഓരോ ഇന്ത്യൻ ഉപഭോക്താവിനും സേവന വീഴ്ച, അന്യായമായ കരാറുകൾ, അമിതവില ഈടാക്കൽ, ഗുണനിലവారമില്ലാത്ത സാധനങ്ങൾ എന്നിവയ്‌ക്കെതിരെ പൂർണ്ണമായ നിയമപരിരക്ഷയുണ്ട്. ഓൺലൈൻ വഴിയോ കടകളിൽ നിന്നോ വാങ്ങിയാലും ഉറപ്പുനൽകിയ ഗുണനിലവാരം നൽകാൻ കമ്പനികൾ ബാധ്യസ്ഥരാണ്.',
      primaryLaw: 'ഉപഭോക്തൃ സംരക്ഷണ നിയമം, 2019 & ഇ-കൊമേഴ്‌സ് ചട്ടങ്ങൾ, 2020',
      keyRights: [
        'സുരക്ഷിതത്വത്തിനുള്ള അവകാശം: ജീവനോ സ്വത്തിനോ അപകടകരമായ ഉൽപ്പന്നങ്ങളിൽ നിന്നുള്ള സംരക്ഷണം.',
        'വിവരങ്ങൾ അറിയാനുള്ള അവകാശം: ഗുണനിലവാരം, അളവ്, ശുദ്ധി, കൃത്യമായ വില എന്നിവ അറിയാനുള്ള അവകാശം.',
        'പരിഹാരത്തിനുള്ള അവകാശം: ന്യൂനതയുള്ള സാധനങ്ങൾക്ക് നഷ്ടപരിഹാരവും റീഫണ്ടും ലഭിക്കാനുള്ള അവകാശം.',
        'തെറ്റിദ്ധരിപ്പിക്കുന്ന പരസ്യങ്ങൾക്കെതിരെയുള്ള അവകാശം: തെറ്റായ പരസ്യം നൽകുന്ന കമ്പനികൾക്ക് കനത്ത പിഴ.',
        'ഉൽപ്പന്ന ബാധ്യത: ന്യൂനതയുള്ള ഉൽപ്പന്നം മൂലമുണ്ടാകുന്ന നാശനഷ്ടങ്ങൾക്ക് നിർമ്മാതാവും വിൽപനക്കാരനും ഉത്തരവാദികൾ.',
      ],
      whatToDoIfViolated: [
        'ഓർഡർ ഐഡി, ബിൽ, പരാതി എന്നിവ ഉൾപ്പെടുത്തി രേഖാമൂലമുള്ള പരാതി തയ്യാറാക്കുക.',
        'ദേശീയ ഉപഭോക്തൃ ഹെൽപ്പ്‌ലൈനായ 1915-ൽ വിളിക്കുകയോ 8800001915 എന്ന നമ്പറിലേക്ക് വാട്‌സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യുക.',
        'consumerhelpline.gov.in-ൽ പരാതി നൽകുക അല്ലെങ്കിൽ e-Daakhil (edaakhil.nic.in) വഴി ഓൺലൈനായി കേസ് ഫയൽ ചെയ്യുക.',
        '₹50 ലക്ഷം വരെയുള്ള കേസുകൾ ജില്ലാ ഉപഭോക്തൃ കമ്മീഷൻ കുറഞ്ഞ ഫീസിൽ പരിഗണിക്കുന്നു.',
      ],
      recommendedAuthority: 'ജില്ലാ ഉപഭോക്തൃ തർക്ക പരിഹാര കമ്മീഷൻ (ഉപഭോക്തൃ കോടതി)',
      helpline: '1915 (ദേശീയ ഉപഭോക്തൃ ഹെൽപ്പ്‌ലൈൻ)',
    },
    'topic-cyber': {
      title: 'സൈബർ സുരക്ഷ, ഡിജിറ്റൽ സാമ്പത്തിക തട്ടിപ്പും സ്വകാര്യതയും',
      shortDescription:
        'ഗോൾഡൻ അവറിൽ പണം വീണ്ടെടുക്കൽ, വ്യാജ ലോൺ ആപ്പ് ഭീഷണി തടയൽ, സുരക്ഷിതമായ പരാതി നൽകൽ.',
      fullExplanation:
        'സൈബർ കുറ്റകൃത്യങ്ങൾ സാമ്പത്തിക തട്ടിപ്പുകൾ, ഐഡന്റിറ്റി മോഷണം, ഓൺലൈൻ ഉപദ്രവം എന്നിവയിലൂടെ ജനങ്ങളെ ബാധിക്കുന്നു. ഇൻഫർമേഷൻ ടെക്നോളജി ആക്ട് 2000, ഭാരതീയ ന്യായ സംഹിത എന്നിവ പ്രകാരം അനുമതിയില്ലാതെ അക്കൗണ്ടുകളിൽ പ്രവേശിക്കുക, ബാങ്ക് ഫിഷിംഗ്, അനുമതിയില്ലാതെ സ്വകാര്യ ചിത്രങ്ങൾ പ്രചരിപ്പിക്കുക എന്നിവ കഠിനമായ ശിക്ഷ ലഭിക്കുന്ന കുറ്റങ്ങളാണ്.',
      primaryLaw: 'ഇൻഫർമേഷൻ ടെക്‌നോളജി ആക്ട്, 2000 (സെക്ഷൻ 43, 66, 67) & BNS',
      keyRights: [
        'ഗോൾഡൻ അവർ ഫ്രീസ്: തട്ടിപ്പ് നടന്ന് 2 മണിക്കൂറിനുള്ളിൽ 1930 എന്ന നമ്പറിൽ വിളിച്ചാൽ ബാങ്ക് കൈമാറ്റം മരവിപ്പിക്കാം.',
        'ഡിജിറ്റൽ സ്വകാര്യതാ അവകാശം: നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ കമ്പനികൾ കർശന സുരക്ഷയോടെ സൂക്ഷിക്കണം.',
        'ഭീഷണിപ്പെടുത്തലിൽ നിന്നുള്ള സംരക്ഷണം: വ്യാജ ലോൺ ആപ്പുകൾ വഴിയോ മോർഫ് ചെയ്ത ഫോട്ടോകൾ വഴിയോ ഭീഷണിപ്പെടുത്തുന്നത് ക്രിമിനൽ കുറ്റമാണ്.',
        'പേര് വെളിപ്പെടുത്താതെ പരാതിപ്പെടാനുള്ള അവകാശം: സ്ത്രീകൾക്കും കുട്ടികൾക്കും പേര് രഹസ്യമാക്കി പോർട്ടലിൽ പരാതിപ്പെടാം.',
      ],
      whatToDoIfViolated: [
        'അനധികൃത ബാങ്ക് ഇടപാട് നടന്ന് ആദ്യ 2 മണിക്കൂറിനുള്ളിൽ 1930 എന്ന നമ്പറിൽ വിളിക്കുക.',
        'ഇടപാട് UTR നമ്പർ, ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ, സ്ക്രീൻഷോട്ടുകൾ എന്നിവ ശേഖരിക്കുക.',
        'cybercrime.gov.in പോർട്ടലിൽ ഉടൻ തന്നെ ഇ-പരാതി രജിസ്റ്റർ ചെയ്യുക.',
        'ചാർജ്-ബാക്ക് ആരംഭിക്കാനും അക്കൗണ്ട് മരവിപ്പിക്കാനും നിങ്ങളുടെ ബാങ്കിനോട് ആവശ്യപ്പെടുക.',
      ],
      recommendedAuthority: 'ഇന്ത്യൻ സൈബർ ക്രൈം കോർഡിനേഷൻ സെന്റർ (I4C) / ലോക്കൽ സൈബർ സെൽ',
      helpline: '1930 (ദേശീയ സൈബർ തട്ടിപ്പ് ഹെൽപ്പ്‌ലൈൻ)',
    },
    'topic-women': {
      title: 'സ്ത്രീ സുരക്ഷ, അന്തസ്സ്, ജോലിസ്ഥലത്തെ പീഡന പ്രതിരോധം',
      shortDescription:
        'ഗാർഹിക പീഡനം, ജോലിസ്ഥലത്തെ ലൈംഗിക അതിക്രമം (POSH), സീറോ എഫ്.ഐ.ആർ, സൗജന്യ നിയമസഹായം.',
      fullExplanation:
        'ഭരണഘടനയും നിയമങ്ങളും സ്ത്രീകൾക്ക് ശക്തമായ സംരക്ഷണം നൽകുന്നു. ഗാർഹിക പീഡന നിരോധന നിയമം 2005, ജോലിസ്ഥലത്തെ പീഡന പ്രതിരോധ നിയമം (POSH) 2013, 26 ആഴ്ചത്തെ ശമ്പളത്തോടുകൂടിയ പ്രസവാവധി, സീറോ എഫ്.ഐ.ആർ രജിസ്റ്റർ ചെയ്യാനുള്ള അവകാശം, നാൽസ (NALSA) വഴിയുള്ള 100% സൗജന്യ നിയമസഹായം എന്നിവ ഇതിൽ ഉൾപ്പെടുന്നു.',
      primaryLaw: 'ഗാർഹിക പീഡനത്തിൽ നിന്നുള്ള സ്ത്രീ സംരക്ഷണ നിയമം 2005 & POSH നിയമം 2013',
      keyRights: [
        'സീറോ എഫ്.ഐ.ആർ: കുറ്റകൃത്യം എവിടെ നടന്നാലും ഒരു സ്ത്രീക്ക് ഇന്ത്യയിലെ ഏത് പോലീസ് സ്റ്റേഷനിലും എഫ്.ഐ.ആർ രജിസ്റ്റർ ചെയ്യാം.',
        'അറസ്റ്റ് ചട്ടങ്ങൾ: സൂര്യാസ്തമയത്തിനു ശേഷവും സൂര്യോദയത്തിനു മുൻപും മജിസ്‌ട്രേറ്റിന്റെ ഉത്തരവില്ലാതെ സ്ത്രീയെ അറസ്റ്റ് ചെയ്യരുത്, വനിതാ പോലീസ് മാത്രമേ അറസ്റ്റ് ചെയ്യാവൂ.',
        'സ്ത്രീധന അവകാശം: വിവാഹത്തിന് മുൻപോ ശേഷമോ ലഭിച്ച എല്ലാ ആഭരണങ്ങളും സ്വത്തുക്കളും സ്ത്രീയുടെ സ്വന്തമാണ്.',
        'ജോലിസ്ഥലത്തെ സംരക്ഷണം: 10 ലധികം ജീവനക്കാരുള്ള എല്ലാ സ്ഥാപനങ്ങളിലും ആഭ്യന്തര പരാതി പരിഹാര സമിതി (ICC) ഉണ്ടായിരിക്കണം.',
        'സൗജന്യ നിയമസഹായം: നാൽസ സെക്ഷൻ 12 പ്രകാരം സൗജന്യ വക്കീൽ, കോടതി ഫീസ് ഇളവ്, നിയമോപദേശം.',
      ],
      whatToDoIfViolated: [
        'അടിയന്തര വൈദ്യസഹായത്തിനും നിയമസഹായത്തിനുമായി സഖി വൺ സ്റ്റോപ്പ് സെന്റർ (OSC) അല്ലെങ്കിൽ 181-ൽ വിളിക്കുക.',
        'ജോലിസ്ഥലത്തെ സംഭവങ്ങൾക്ക് 90 ദിവസത്തിനകം ആഭ്യന്തര സമിതിക്ക് (ICC) രേഖാമൂലം പരാതി നൽകുക.',
        'ജില്ലാ കോടതിയിലെ പ്രൊട്ടക്ഷൻ ഓഫീസറെയോ ജില്ലാ ലീഗൽ സർവീസസ് അതോറിറ്റിയെയോ (DLSA) സമീപിക്കുക.',
      ],
      recommendedAuthority: 'ദേശീയ വനിതാ കമ്മീഷൻ / സഖി വൺ സ്റ്റോപ്പ് സെന്റർ / DLSA',
      helpline: '181 / 7827170170 (വനിതാ ഹെൽപ്പ്‌ലൈൻ)',
    },
    'topic-labour': {
      title: 'തൊഴിലാളി അവകാശങ്ങൾ, വേതന സംരക്ഷണം, അന്യായമായ പിരിച്ചുവിടൽ',
      shortDescription:
        'കൃത്യമായ ശമ്പളം, ഗ്രാറ്റുവിറ്റി അവകാശം, പി.എഫ് നിക്ഷേപം, നോട്ടീസ് പിരീഡ്, പ്രവൃത്തിസമയ നിയമങ്ങൾ.',
      fullExplanation:
        'തൊഴിലാളി നിയമങ്ങൾ ജീവനക്കാർക്ക് പൂർണ്ണ സംരക്ഷണം നൽകുന്നു. തൊഴിലുടമകൾ ശമ്പളം കൃത്യസമയത്ത് നൽകാനും പി.എഫ് അടയ്ക്കാനും സുരക്ഷിതമായ ജോലിസ്ഥലം നൽകാനും 5 വർഷത്തെ സേവനത്തിന് ശേഷം ഗ്രാറ്റുവിറ്റി നൽകാനും നിയമപരമായി ബാധ്യസ്ഥരാണ്.',
      primaryLaw: 'വേതന കോഡ്, വ്യാവസായിക തർക്ക നിയമം & ഗ്രാറ്റുവിറ്റി നിയമം',
      keyRights: [
        'കൃത്യമായ ശമ്പളം: എല്ലാ മാസവും 7 അല്ലെങ്കിൽ 10 തീയതിക്ക് മുൻപായി ശമ്പളം നൽകണം.',
        'ഫുൾ & ഫൈനൽ സെറ്റിൽമെന്റ് (F&F): രാജി വെച്ച് 2 പ്രവൃത്തി ദിവസങ്ങൾക്കുള്ളിൽ എല്ലാ കുടിശ്ശികകളും നൽകണം.',
        'ഗ്രാറ്റുവിറ്റി: 5 വർഷത്തെ തുടർച്ചയായ സേവനത്തിന് ശേഷം ഓരോ വർഷത്തിനും 15 ദിവസത്തെ വേതനം ഗ്രാറ്റുവിറ്റിയായി ലഭിക്കും.',
        'അനധികൃതമായി ശമ്പളം പിടിക്കരുത്: ശമ്പളത്തിൽ നിന്ന് അന്യായമായ പിഴയോ കിഴിവുകളോ പാടില്ല.',
      ],
      whatToDoIfViolated: [
        'രജിസ്റ്റേർഡ് പോസ്റ്റ് വഴിയും ഇമെയിൽ വഴിയും മാനേജ്‌മെന്റിന് ഔദ്യോഗിക ഡിമാൻഡ് നോട്ടീസ് അയക്കുക.',
        'ശ്രം സുവിധ പോർട്ടലിൽ (shramsuvidha.gov.in) പരാതി നൽകുക.',
        'തർക്ക പരിഹാരത്തിനായി ജില്ലാ ലേബർ ഓഫീസറെ സമീപിക്കുക.',
        'ശമ്പളത്തിൽ നിന്ന് പി.എഫ് പിടിച്ചിട്ടും ഇപിഎഫ്ഒയിൽ അടച്ചില്ലെങ്കിൽ epfigms.gov.in-ൽ പരാതിപ്പെടുക.',
      ],
      recommendedAuthority: 'ലേബർ കമ്മീഷണർ ഓഫീസ് / എംപ്ലോയീസ് പ്രൊവിഡന്റ് ഫണ്ട് ഓർഗനൈസേഷൻ (EPFO)',
      helpline: '14434 (തൊഴിൽ മന്ത്രാലയ ഹെൽപ്പ്‌ലൈൻ)',
    },
    'topic-housing': {
      title: 'വാടകക്കാരുടെ അവകാശങ്ങൾ: ഡെപ്പോസിറ്റ് തിരികെ ലഭിക്കൽ, അന്യായ ഒഴിപ്പിക്കൽ',
      shortDescription:
        'അന്യായമായി ഒഴിപ്പിക്കുന്നതിനെതിരായ സംരക്ഷണം, ഡെപ്പോസിറ്റ് പരിധി, വൈദ്യുതി, കുടിവെള്ള സംരക്ഷണം.',
      fullExplanation:
        'മോഡൽ വാടക നിയമമനുസരിച്ച്, 24 മണിക്കൂർ മുൻകൂർ നോട്ടീസ് നൽകാതെ ഭൂവുടമയ്ക്ക് വീട്ടിൽ പ്രവേശിക്കാൻ കഴിയില്ല. ഒഴിപ്പിക്കാനായി വൈദ്യുതിയോ കുടിവെള്ളമോ വിച്ഛേദിക്കാൻ പാടില്ല. കാലാവധി കഴിയുമ്പോൾ ഡെപ്പോസിറ്റ് തുക ഉടൻ തിരികെ നൽകണം.',
      primaryLaw: 'മോഡൽ വാടക നിയമം & സംസ്ഥാന വാടക നിയന്ത്രണ നിയമങ്ങൾ',
      keyRights: [
        'ഡെപ്പോസിറ്റ് പരിധി: വീടുകൾക്ക് പരമാവധി 2 മാസത്തെ വാടകയും വാണിജ്യ കെട്ടിടങ്ങൾക്ക് 1 മാസത്തെ വാടകയും മാത്രമേ ഡെപ്പോസിറ്റായി വാങ്ങാവൂ.',
        'അടിസ്ഥാന സൗകര്യ സംരക്ഷണം: വൈദ്യുതിയോ വെള്ളമോ വിച്ഛേദിക്കുന്നത് ശിക്ഷാർഹമായ കുറ്റമാണ്.',
        'സന്ദർശനത്തിന് മുൻകൂർ നോട്ടീസ്: പരിശോധനയ്ക്കായി വരുന്നതിന് 24 മണിക്കൂർ മുൻപ് നോട്ടീസ് നൽകണം.',
        'ബലപ്രയോഗത്തിലൂടെയുള്ള ഒഴിപ്പിക്കൽ നിരോധനം: കോടതി ഉത്തരവില്ലാതെ വാടകക്കാരെ ബലമായി ഒഴിപ്പിക്കാൻ കഴിയില്ല.',
      ],
      whatToDoIfViolated: [
        'സൗകര്യങ്ങൾ വിച്ഛേദിച്ചാൽ ഉടൻ പോലീസിലോ റെന്റ് അതോറിറ്റിയിലോ പരാതി നൽകുക.',
        'ഡെപ്പോസിറ്റ് തടഞ്ഞുവെച്ചാൽ അഭിഭാഷകൻ മുഖേന ലീഗൽ നോട്ടീസ് അയക്കുക.',
        'റെന്റ് കോടതിയെ സമീപിക്കുകയോ ഡി.എൽ.എസ്.എ (DLSA) മധ്യസ്ഥത തേടുകയോ ചെയ്യുക.',
      ],
      recommendedAuthority: 'റെന്റ് അതോറിറ്റി / റെന്റ് കോടതി / സബ് ഡിവിഷണൽ മജിസ്‌ട്രേറ്റ് (SDM)',
      helpline: '15100 (DLSA ലീഗൽ സർവീസസ് ഹെൽപ്പ്‌ലൈൻ)',
    },
    'topic-police': {
      title: 'പോലീസ് ചോദ്യം ചെയ്യലിലും അറസ്റ്റിലും പൗരന്റെ അവകാശങ്ങൾ',
      shortDescription:
        'സുപ്രീം കോടതിയുടെ ചരിത്രപ്രസിദ്ധമായ ഡികെ ബസു മാർഗ്ഗനിർദ്ദേശങ്ങൾ: അറസ്റ്റിന്റെ കാരണം, സീറോ എഫ്.ഐ.ആർ, 24 മണിക്കൂർ മജിസ്‌ട്രേറ്റ് നിയമം.',
      fullExplanation:
        'ഭരണഘടനയുടെ അനുച്ഛേദം 21, 22 പ്രകാരം പൗരന്മാർക്ക് മൗലികാവകാശങ്ങളുണ്ട്. ഡി.കെ. ബസു കേസിൽ സുപ്രീം കോടതി പുറപ്പെടുവിച്ച മാർഗ്ഗനിർദ്ദേശങ്ങൾ പ്രകാരം അറസ്റ്റ് ചെയ്യുമ്പോൾ പോലീസ് പാലിക്കേണ്ട നിർബന്ധിത നിയമങ്ങളുണ്ട്.',
      primaryLaw: 'ഇന്ത്യൻ ഭരണഘടന (ആർട്ടിക്കിൾ 21, 22) & BNSS / CrPC',
      keyRights: [
        'അറസ്റ്റിന്റെ കാരണം അറിയാനുള്ള അവകാശം: ഏത് കുറ്റത്തിനാണ് അറസ്റ്റ് ചെയ്യുന്നതെന്ന് പോലീസ് ഉടൻ വ്യക്തമാക്കണം.',
        'അഭിഭാഷകന്റെ സഹായം: സ്വന്തം ഇഷ്ടപ്രകാരമുള്ള വക്കീലുമായി സംസാരിക്കാനും പ്രതിരോധിക്കാനും പൂർണ്ണ അവകാശം.',
        'കുടുംബത്തെ അറിയിക്കൽ: അറസ്റ്റ് ചെയ്ത് 8-12 മണിക്കൂറിനുള്ളിൽ ബന്ധുവിനെയോ സുഹൃത്തിനെയോ പോലീസ് വിവരം അറിയിക്കണം.',
        '24 മണിക്കൂർ നിർബന്ധിത നിയമം: അറസ്റ്റ് ചെയ്തയാളെ 24 മണിക്കൂറിനുള്ളിൽ അടുത്തുള്ള മജിസ്‌ട്രേറ്റിന് മുന്നിൽ ഹാജരാക്കണം.',
        'വൈദ്യപരിശോധനയ്ക്കുള്ള അവകാശം: അറസ്റ്റ് സമയത്തും കസ്റ്റഡിയിലുള്ളപ്പോഴും ഓരോ 48 മണിക്കൂറിലും സ്വതന്ത്ര ഡോക്ടറുടെ പരിശോധന ആവശ്യപ്പെടാം.',
        'അറസ്റ്റ് മെമ്മോ: സാക്ഷിയുടെ സാന്നിധ്യത്തിൽ ഔദ്യോഗിക അറസ്റ്റ് മെമ്മോ തയ്യാറാക്കണം.',
      ],
      whatToDoIfViolated: [
        'പോലീസ് ഉദ്യോഗസ്ഥന്റെ പേരും തിരിച്ചറിയൽ കാർഡും കാണിക്കാൻ ആവശ്യപ്പെടുക.',
        'ഉടൻ കുടുംബത്തെ വിളിച്ച് ഏത് പോലീസ് സ്റ്റേഷനാണെന്ന് കൃത്യമായി പറയുക.',
        'സൗജന്യ ഡ്യൂട്ടി വക്കീലിന്റെ സഹായം ആവശ്യപ്പെടുക (LADCS).',
        'കസ്റ്റഡിയിൽ മർദ്ദനമേറ്റിട്ടുണ്ടെങ്കിൽ മജിസ്‌ട്രേറ്റിന് മുന്നിൽ ഹാജരാക്കുമ്പോൾ നേരിട്ട് പറയുക.',
      ],
      recommendedAuthority: 'ജുഡീഷ്യൽ മജിസ്‌ട്രേറ്റ് / സംസ്ഥാന മനുഷ്യാവകാശ കമ്മീഷൻ / എസ്.പി ഓഫീസ്',
      helpline: '112 / 14433 (മനുഷ്യാവകാശ ഹെൽപ്പ്‌ലൈൻ)',
    },
    'topic-rti': {
      title: 'വിവരാവകാശ നിയമം (RTI): സർക്കാർ സുതാര്യതയും ഉത്തരവാദിത്തവും',
      shortDescription:
        'വെറും ₹10 ഫീസിൽ വിവരാവകാശ അപേക്ഷ, 30 ദിവസത്തിനുള്ളിൽ മറുപടി, വിവരാവകാശ കമ്മീഷനിൽ അപ്പീൽ.',
      fullExplanation:
        'വിവരാവകാശ നിയമം 2005 ഓരോ പൗരനും സർക്കാർ വകുപ്പുകളോട് ചോദ്യങ്ങൾ ചോദിക്കാനും രേഖകളുടെ സാക്ഷ്യപ്പെടുത്തിയ പകർപ്പുകൾ നേടാനും അധികാരം നൽകുന്നു. ഇൻഫർമേഷൻ ഓഫീസർമാർ 30 ദിവസത്തിനകം മറുപടി നൽകാൻ ബാധ്യസ്ഥരാണ് (ജീവനെയും സ്വാതന്ത്ര്യത്തെയും ബാധിക്കുന്നതാണെങ്കിൽ 48 മണിക്കൂറിനകം).',
      primaryLaw: 'വിവരാവകാശ നിയമം, 2005',
      keyRights: [
        '30 ദിവസത്തിനകം മറുപടി: ആവശ്യപ്പെട്ട വിവരം 30 ദിവസത്തിനുള്ളിൽ നൽകണം.',
        'ജീവനും സ്വാതന്ത്ര്യവും: അടിയന്തര വിവരങ്ങൾ 48 മണിക്കൂറിനകം നൽകണം.',
        'കുറഞ്ഞ ചിലവ്: കേന്ദ്ര വിവരാവകാശ അപേക്ഷാ ഫീസ് വെറും ₹10 മാത്രം (ബിപിഎൽ വിഭാഗക്കാർക്ക് തികച്ചും സൗജന്യം).',
        'ഉദ്യോഗസ്ഥർക്ക് പിഴ: കാരണമില്ലാതെ വൈകിപ്പിച്ചാൽ ഉദ്യോഗസ്ഥന് പ്രതിദിനം ₹250 നിരക്കിൽ പരമാവധി ₹25,000 വരെ പിഴ.',
      ],
      whatToDoIfViolated: [
        'കാലാവധി കഴിഞ്ഞ് 30 ദിവസത്തിനകം ഒന്നാം അപ്പീൽ അധികാരിക്ക് (FAA) അപ്പീൽ നൽകുക.',
        'മറുപടി ലഭിച്ചില്ലെങ്കിൽ കേന്ദ്ര അല്ലെങ്കിൽ സംസ്ഥാന വിവരാവകാശ കമ്മീഷനിൽ രണ്ടാം അപ്പീൽ നൽകുക.',
      ],
      recommendedAuthority: 'കേന്ദ്ര വിവരാവകാശ കമ്മീഷൻ (CIC) / കേരള വിവരാവകാശ കമ്മീഷൻ',
      helpline: '011-26183027 (കേന്ദ്ര വിവരാവകാശ കമ്മീഷൻ)',
    },
    'topic-students': {
      title: 'വിദ്യാർത്ഥി അവകാശങ്ങൾ: റാഗിംഗ് വിരുദ്ധ സംരക്ഷണം, ഫീസ് റീഫണ്ടും സർട്ടിഫിക്കറ്റുകളും',
      shortDescription:
        'യുജിസി മാർഗ്ഗനിർദ്ദേശങ്ങൾ: ഫീസ് തിരികെ നൽകൽ നിർബന്ധം, സർട്ടിഫിക്കറ്റുകൾ പിടിച്ചുവെക്കരുത്, റാഗിംഗ് വിമുക്ത ക്യാമ്പസ്.',
      fullExplanation:
        'യൂണിവേഴ്സിറ്റി ഗ്രാന്റ്സ് കമ്മീഷൻ (UGC), AICTE നിയമങ്ങൾ അനുസരിച്ച് കോളേജുകൾക്ക് ഒറിജിനൽ സർട്ടിഫിക്കറ്റുകൾ പിടിച്ചുവെക്കാൻ അധികാരമില്ല. പ്രവേശനം റദ്ദാക്കിയാൽ ചട്ടപ്രകാരം ഫീസ് തിരികെ നൽകാനും റാഗിംഗ് തടയാനും കോളേജുകൾ ബാധ്യസ്ഥരാണ്.',
      primaryLaw: 'യുജിസി ഫീസ് റീഫണ്ട് മാനദണ്ഡങ്ങളും ആന്റി-റാഗിംഗ് ചട്ടങ്ങളും 2009',
      keyRights: [
        'ഒറിജിനൽ രേഖകളുടെ സംരക്ഷണം: കോളേജുകൾക്ക് ഒറിജിനൽ സർട്ടിഫിക്കറ്റുകൾ തടഞ്ഞുവെക്കാൻ അവകാശമില്ല.',
        'ഫീസ് തിരികെ ലഭിക്കാനുള്ള അവകാശം: കൗൺസിലിംഗ് സമയത്ത് അഡ്മിഷൻ ഒഴിവാക്കിയാൽ ഫീസ് തിരികെ ലഭിക്കും.',
        'റാഗിംഗ് വിരുദ്ധ സംരക്ഷണം: റാഗിംഗ് ജാമ്യമില്ലാ കുറ്റമാണ്; വീഴ്ച വരുത്തുന്ന കോളേജുകളുടെ അംഗീകാരം റദ്ദാക്കാം.',
        'പരാതി പരിഹാര സമിതി: എല്ലാ ഉന്നത വിദ്യാഭ്യാസ സ്ഥാപനങ്ങളിലും സ്റ്റുഡന്റ്സ് ഗ്രീവൻസ് റിഡ്രസ്സൽ കമ്മിറ്റി (SGRC) ഉണ്ടായിരിക്കണം.',
      ],
      whatToDoIfViolated: [
        'യുജിസിയുടെ e-Samadhan പോർട്ടലിൽ (samadhan.ugc.ac.in) പരാതിപ്പെടുക.',
        'റാഗിംഗ് സംഭവങ്ങൾക്ക് ഉടൻ 24x7 ടോൾ ഫ്രീ നമ്പറായ 1800-180-5522-ൽ വിളിക്കുക.',
        'ഫീസ് തിരികെ നൽകാത്തതിനെതിരെ ഉപഭോക്തൃ കോടതിയെ സമീപിക്കുക.',
      ],
      recommendedAuthority: 'യുജിസി ഇ-സമാധാൻ / ദേശീയ ആന്റി-റാഗിംഗ് സെൽ',
      helpline: '1800-180-5522 (ദേശീയ ആന്റി-റാഗിംഗ് ടോൾ ഫ്രീ)',
    },
    'topic-seniors': {
      title: 'മുതിർന്ന പൗരന്മാരുടെ സംരക്ഷണം, പ്രതിമാസ ചെലവ് നൽകലും സ്വത്ത് സംരക്ഷണവും',
      shortDescription:
        'ആർഡിഒ ട്രൈബ്യൂണൽ ഉത്തരവുകൾ, മാതാപിതാക്കളെ ഉപേക്ഷിച്ചാൽ ഗിഫ്റ്റ് ഡീഡ് റദ്ദാക്കൽ, മുൻഗണനാ ആരോഗ്യ സംരക്ഷണം.',
      fullExplanation:
        'മാതാപിതാക്കളുടെയും മുതിർന്ന പൗരന്മാരുടെയും സംരക്ഷണവും ക്ഷേമവും നിയമം 2007 പ്രകാരം മുതിർന്ന പൗരന്മാർക്ക് (60 വയസ്സും അതിൽ കൂടുതലുമുള്ളവർ) മക്കളിൽ നിന്ന് പ്രതിമാസ ചെലവ് ലഭിക്കാൻ ലളിതമായ നിയമവഴിയുണ്ട്. മാതാപിതാക്കളെ സംരക്ഷിച്ചില്ലെങ്കിൽ മക്കൾക്ക് നൽകിയ സ്വത്ത് തിരിച്ചെടുക്കാൻ ട്രൈബ്യൂണലിന് അധികാരമുണ്ട്.',
      primaryLaw: 'മാതാപിതാക്കളുടെയും മുതിർന്ന പൗരന്മാരുടെയും സംരക്ഷണ നിയമം, 2007',
      keyRights: [
        'പ്രതിമാസ ചെലവ് ലഭിക്കാനുള്ള അവകാശം: ഭക്ഷണം, വസ്ത്രം, താമസം, ചികിത്സ എന്നിവ മക്കൾ നൽകണം.',
        'സ്വത്ത് കൈമാറ്റം റദ്ദാക്കൽ: സെക്ഷൻ 23 പ്രകാരം മാതാപിതാക്കളെ സംരക്ഷിച്ചില്ലെങ്കിൽ എഴുതിക്കൊടുത്ത സ്വത്ത് റദ്ദാക്കാം.',
        'വേഗത്തിലുള്ള വിചാരണ: വക്കീലന്മാരുടെ ആവശ്യമില്ലാതെ 90 ദിവസത്തിനകം ആർഡിഒ ട്രൈബ്യൂണൽ കേസ് തീർപ്പാക്കും.',
        'വയോധികരെ ഉപേക്ഷിക്കുന്നത് കുറ്റകരം: മുതിർന്നവരെ ഉപേക്ഷിക്കുന്നത് ശിക്ഷാർഹമായ ക്രിമിനൽ കുറ്റമാണ്.',
      ],
      whatToDoIfViolated: [
        'സൗജന്യ ഉപദേശത്തിനും സഹായത്തിനുമായി എൽഡർലൈൻ 14567 എന്ന നമ്പറിൽ വിളിക്കുക.',
        'സബ് ഡിവിഷണൽ മജിസ്‌ട്രേറ്റ് (SDM) / ട്രൈബ്യൂണലിന് നേരിട്ട് അപേക്ഷ നൽകുക.',
        'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസറുടെയോ DLSA ഓഫീസിന്റെയോ സഹായം തേടുക.',
      ],
      recommendedAuthority: 'മെയിന്റനൻസ് ട്രൈബ്യൂണൽ (SDM) / സാമൂഹ്യനീതി വകുപ്പ്',
      helpline: '14567 (എൽഡർലൈൻ ദേശീയ സീനിയർ സിറ്റിസൺ ഹെൽപ്പ്‌ലൈൻ)',
    },
  },
};

export const LOCALIZED_GLOSSARY_MAP: Record<
  SupportedLanguage,
  Record<string, LocalizedGlossaryContent>
> = {
  English: {
    'Cognizable Offence': {
      term: 'Cognizable Offence',
      nativeTerm: 'Cognizable Offence',
      simplifiedMeaning:
        'A serious offence (like theft, murder, cyber robbery) where police have the legal authority to arrest the accused without a court warrant and MUST register an FIR immediately.',
      practicalExample:
        'If someone snatches your phone or commits cyber financial theft, it is a cognizable offence.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'Non-Cognizable Offence (NCR)',
      nativeTerm: 'Non-Cognizable Offence (NCR)',
      simplifiedMeaning:
        'A minor offence (like verbal abuse, simple hurt) where police cannot arrest without a Magistrate’s warrant or start an investigation without court permission.',
      practicalExample:
        'Police will record a Non-Cognizable Report (NCR) and direct you to the Magistrate instead of filing an FIR.',
    },
    'Zero FIR': {
      term: 'Zero FIR',
      nativeTerm: 'Zero FIR',
      simplifiedMeaning:
        'An FIR that can be registered at ANY police station in India, regardless of where the incident happened. The station numbers it "0" and transfers it to the jurisdiction police station.',
      practicalExample:
        'If you travel from Mumbai to Delhi and face an incident, you can lodge a Zero FIR immediately in Delhi without traveling back.',
    },
    'Legal Notice': {
      term: 'Legal Notice',
      nativeTerm: 'Legal Notice',
      simplifiedMeaning:
        'A formal written communication sent to an opposing party informing them of your grievance, legal basis, and giving a deadline (usually 15 or 30 days) to rectify the issue before filing a court case.',
      practicalExample:
        'Sending a notice to a builder giving 15 days to deliver flat keys before moving to RERA.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'Bail (Anticipatory vs Regular)',
      nativeTerm: 'Bail',
      simplifiedMeaning:
        'Temporary release of an accused person awaiting trial. Anticipatory bail is obtained BEFORE arrest when arrest is feared; Regular bail is applied for AFTER being taken into custody.',
      practicalExample:
        'Section 438 CrPC / Sec 482 BNSS allows citizens fearing false arrest to approach the Sessions Court for advance protection.',
    },
    'Affidavit': {
      term: 'Affidavit',
      nativeTerm: 'Affidavit',
      simplifiedMeaning:
        'A written statement of facts confirmed by an oath or affirmation before an authorized notary or oath commissioner.',
      practicalExample:
        'Submitting a sworn declaration of lost documents or income certificate before an authority.',
    },
    'Sub-Judice': {
      term: 'Sub-Judice',
      nativeTerm: 'Sub-Judice',
      simplifiedMeaning:
        'A case or matter that is currently under trial or consideration before a court of law and pending final judgment.',
      practicalExample:
        'Matters that are sub-judice cannot be publicly adjudicated or interfered with by outside parties.',
    },
    'Vakalatnama': {
      term: 'Vakalatnama',
      nativeTerm: 'Vakalatnama',
      simplifiedMeaning:
        'A written document by which a client formally authorizes an advocate to represent them and plead on their behalf in court.',
      practicalExample:
        'Signing a vakalatnama when a DLSA legal aid advocate is assigned to your case.',
    },
  },

  Hindi: {
    'Cognizable Offence': {
      term: 'संज्ञेय अपराध (Cognizable Offence)',
      nativeTerm: 'संज्ञेय अपराध',
      simplifiedMeaning:
        'एक गंभीर अपराध (जैसे चोरी, डकैती, साइबर धोखाधड़ी) जिसमें पुलिस को बिना कोर्ट वारंट के आरोपी को गिरफ्तार करने का अधिकार होता है और अनिवार्य रूप से एफआईआर दर्ज करनी होती है।',
      practicalExample:
        'यदि कोई आपका मोबाइल छीन लेता है या ऑनलाइन वित्तीय ठगी करता है, तो यह संज्ञेय अपराध है।',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'असंज्ञेय अपराध (Non-Cognizable / NCR)',
      nativeTerm: 'असंज्ञेय अपराध',
      simplifiedMeaning:
        'एक साधारण अपराध (जैसे गाली-गलौज, मामूली हाथापाई) जिसमें पुलिस बिना मजिस्ट्रेट के वारंट के गिरफ्तार नहीं कर सकती और कोर्ट की अनुमति के बिना जांच शुरू नहीं कर सकती।',
      practicalExample:
        'पुलिस एफआईआर के बजाय गैर-संज्ञेय रिपोर्ट (NCR) दर्ज करेगी और आपको मजिस्ट्रेट के पास जाने का निर्देश देगी।',
    },
    'Zero FIR': {
      term: 'ज़ीरो एफआईआर (Zero FIR)',
      nativeTerm: 'ज़ीरो एफआईआर',
      simplifiedMeaning:
        'ऐसी एफआईआर जो घटना चाहे कहीं भी हुई हो, भारत के किसी भी पुलिस थाने में दर्ज कराई जा सकती है। थाना इसे "0" नंबर देकर संबंधित क्षेत्राधिकार वाले थाने को ट्रांसफर कर देता है।',
      practicalExample:
        'यदि दिल्ली यात्रा के दौरान आपके साथ कोई घटना होती है, तो आप वापस अपने गृह नगर जाकर भी वहां तुरंत ज़ीरो एफआईआर दर्ज करा सकते हैं।',
    },
    'Legal Notice': {
      term: 'कानूनी नोटिस (Legal Notice)',
      nativeTerm: 'कानूनी नोटिस',
      simplifiedMeaning:
        'विरोधी पक्ष को भेजा गया औपचारिक लिखित पत्र जिसमें आपकी शिकायत और कानूनी आधार बताया जाता है और कोर्ट केस करने से पहले समाधान हेतु 15 या 30 दिन का समय दिया जाता है।',
      practicalExample:
        'बिल्डर को फ्लैट की चाबी देने के लिए रेरा (RERA) जाने से पहले 15 दिन का कानूनी नोटिस भेजना।',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'ज़मानत: अग्रिम बनाम नियमित (Bail)',
      nativeTerm: 'ज़मानत',
      simplifiedMeaning:
        'मुकदमे की सुनवाई लंबित रहने तक आरोपी की अस्थायी रिहाई। गिरफ्तारी की आशंका होने पर अग्रिम जमानत (Anticipatory Bail) ली जाती है; हिरासत में लेने के बाद नियमित जमानत (Regular Bail) लगाई जाती है।',
      practicalExample:
        'झूठी गिरफ्तारी की आशंका होने पर नागरिक सत्र न्यायालय या उच्च न्यायालय से अग्रिम जमानत ले सकते हैं।',
    },
    'Affidavit': {
      term: 'शपथ पत्र / हलफ़नामा (Affidavit)',
      nativeTerm: 'हलफ़नामा',
      simplifiedMeaning:
        'किसी अधिकृत नोटरी या शपथ आयुक्त के समक्ष शपथ लेकर सत्यता की पुष्टि किया गया तथ्यों का लिखित बयान।',
      practicalExample:
        'खोए हुए दस्तावेजों या आय प्रमाण पत्र के लिए सरकारी विभाग में शपथ पत्र जमा करना।',
    },
    'Sub-Judice': {
      term: 'न्यायाधीन मामला (Sub-Judice)',
      nativeTerm: 'न्यायाधीन',
      simplifiedMeaning:
        'ऐसा मामला जो वर्तमान में किसी न्यायालय में विचाराधीन है और जिसका अंतिम फैसला अभी बाकी है।',
      practicalExample:
        'अदालत में चल रहे न्यायाधीन मामलों पर बाहरी व्यक्ति या मीडिया फैसला नहीं सुना सकते।',
    },
    'Vakalatnama': {
      term: 'वकालतनामा (Vakalatnama)',
      nativeTerm: 'वकालतनामा',
      simplifiedMeaning:
        'एक कानूनी दस्तावेज जिसके द्वारा मुवक्किल औपचारिक रूप से अपने वकील को अदालत में अपनी ओर से पैरवी करने का अधिकार देता है।',
      practicalExample:
        'जब डीएलएसए कानूनी सहायता केंद्र आपके केस के लिए वकील नियुक्त करता है, तो वकालतनामा पर हस्ताक्षर किए जाते हैं।',
    },
  },

  Kannada: {
    'Cognizable Offence': {
      term: 'ಗ್ರಾಹ್ಯ ಅಪರಾಧ (Cognizable Offence)',
      nativeTerm: 'ಗ್ರಾಹ್ಯ ಅಪರಾಧ',
      simplifiedMeaning:
        'ನ್ಯಾಯಾಲಯದ ವಾರಂಟ್ ಇಲ್ಲದೆಯೇ ಪೊಲೀಸರು ಆರೋಪಿಯನ್ನು ಬಂಧಿಸಬಹುದಾದ ಮತ್ತು ಕಡ್ಡಾಯವಾಗಿ ಎಫ್‌ಐಆರ್ ದಾಖಲಿಸಲೇಬೇಕಾದ ಗಂಭೀರ ಅಪರಾಧ (ಉದಾಹರಣೆಗೆ ಕಳ್ಳತನ, ಹಲ್ಲೆ, ಸೈಬರ್ ವಂಚನೆ).',
      practicalExample:
        'ಯಾರಾದರೂ ನಿಮ್ಮ ಮೊಬೈಲ್ ಕಸಿದುಕೊಂಡರೆ ಅಥವಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಹಣ ಲಪಟಾಯಿಸಿದರೆ ಅದು ಗ್ರಾಹ್ಯ ಅಪರಾಧ.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'ಅಗ್ರಾಹ್ಯ ಅಪರಾಧ (Non-Cognizable / NCR)',
      nativeTerm: 'ಅಗ್ರಾಹ್ಯ ಅಪರಾಧ',
      simplifiedMeaning:
        'ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಅವರ ವಾರಂಟ್ ಇಲ್ಲದೆ ಪೊಲೀಸರು ಬಂಧಿಸಲು ಸಾಧ್ಯವಾಗದ ಸಣ್ಣ ಅಪರಾಧ (ಬಾಯ್ದುಡುಕು ಮಾತು, ಸಣ್ಣ ಗಲಾಟೆ). ಇದರಲ್ಲಿ ಎಫ್‌ಐಆರ್ ಬದಲಿಗೆ ಎನ್‌ಸಿಆರ್ (NCR) ನೀಡಲಾಗುತ್ತದೆ.',
      practicalExample:
        'ಪೊಲೀಸರು ಎನ್‌ಸಿಆರ್ ದಾಖಲಿಸಿ ನ್ಯಾಯಾಲಯಕ್ಕೆ ಹೋಗಲು ಸೂಚಿಸುತ್ತಾರೆ.',
    },
    'Zero FIR': {
      term: 'ಜೀರೋ ಎಫ್‌ಐಆರ್ (Zero FIR)',
      nativeTerm: 'ಜೀರೋ ಎಫ್‌ಐಆರ್',
      simplifiedMeaning:
        'ಘಟನೆ ಎಲ್ಲಿಯೇ ನಡೆದಿದ್ದರೂ ಭಾರತದ ಯಾವುದೇ ಪೊಲೀಸ್ ಠಾಣೆಯಲ್ಲಿ ದಾಖಲಿಸಬಹುದಾದ ಎಫ್‌ಐಆರ್. ಠಾಣೆಯು ಇದಕ್ಕೆ "0" ಸಂಖ್ಯೆ ನೀಡಿ ನಂತರ ಸಂಬಂಧಪಟ್ಟ ಠಾಣೆಗೆ ವರ್ಗಾಯಿಸುತ್ತದೆ.',
      practicalExample:
        'ನೀವು ಪ್ರವಾಸದಲ್ಲಿದ್ದಾಗ ಘಟನೆ ನಡೆದರೆ, ನಿಮ್ಮ ಊರಿಗೆ ಮರಳಿದ ನಂತರವೂ ಹತ್ತಿರದ ಠಾಣೆಯಲ್ಲಿ ಜೀರೋ ಎಫ್‌ಐಆರ್ ದಾಖಲಿಸಬಹುದು.',
    },
    'Legal Notice': {
      term: 'ಕಾನೂನು ನೋಟಿಸ್ (Legal Notice)',
      nativeTerm: 'ಕಾನೂನು ನೋಟಿಸ್',
      simplifiedMeaning:
        'ವಿರೋಧಿ ಪಕ್ಷಕ್ಕೆ ಕಳುಹಿಸುವ ಔಪಚಾರಿಕ ಲಿಖಿತ ಎಚ್ಚರಿಕೆ ಪತ್ರ. ಕೋರ್ಟ್ ಕೇಸ್ ದಾಖಲಿಸುವ ಮುನ್ನ ಸಮಸ್ಯೆಯನ್ನು ಬಗೆಹರಿಸಲು 15 ಅಥವಾ 30 ದಿನಗಳ ಕಾಲಾವಕಾಶ ನೀಡಲಾಗುತ್ತದೆ.',
      practicalExample:
        'ಫ್ಲ್ಯಾಟ್ ಕೀ ನೀಡದ ಬಿಲ್ಡರ್‌ಗೆ ರೇರಾ (RERA) ಹೋಗುವ ಮುನ್ನ 15 ದಿನಗಳ ಲೀಗಲ್ ನೋಟಿಸ್ ಕಳುಹಿಸುವುದು.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'ಜಾಮೀನು: ನಿರೀಕ್ಷಣಾ vs ಸಾಮಾನ್ಯ (Bail)',
      nativeTerm: 'ಜಾಮೀನು',
      simplifiedMeaning:
        'ವಿಚಾರಣೆಗೆ ಬಾಕಿ ಇರುವ ಆರೋಪಿಯ ತಾತ್ಕಾಲಿಕ ಬಿಡುಗಡೆ. ಬಂಧನದ ಭಯವಿದ್ದಾಗ ಮುಂಚಿತವಾಗಿ ಪಡೆಯುವುದು ನಿರೀಕ್ಷಣಾ ಜಾಮೀನು; ಬಂಧನದ ನಂತರ ಕೋರ್ಟ್‌ನಿಂದ ಪಡೆಯುವುದು ಸಾಮಾನ್ಯ ಜಾಮೀನು.',
      practicalExample:
        'ಸುಳ್ಳು ಕೇಸ್ ದಾಖಲಾಗುವ ಭೀತಿಯಿದ್ದರೆ ಸೆಷನ್ಸ್ ನ್ಯಾಯಾಲಯದಿಂದ ನಿರೀಕ್ಷಣಾ ಜಾಮೀನು ಪಡೆಯಬಹುದು.',
    },
    'Affidavit': {
      term: 'ಪ್ರಮಾಣ ಪತ್ರ / ಅಫಿಡವಿಟ್ (Affidavit)',
      nativeTerm: 'ಪ್ರಮಾಣ ಪತ್ರ',
      simplifiedMeaning:
        'ಅಧಿಕೃತ ನೋಟರಿ ಅಥವಾ ಪ್ರಮಾಣ ಆಯುಕ್ತರ ಸಮ್ಮುಖದಲ್ಲಿ ಸತ್ಯವೆಂದು ದೃಢೀಕರಿಸಿ ಪ್ರಮಾಣ ಮಾಡುವ ಲಿಖಿತ ಹೇಳಿಕೆ.',
      practicalExample:
        'ಕಳೆದುಹೋದ ದಾಖಲೆಗಳಿಗೆ ಅಥವಾ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಕ್ಕಾಗಿ ಸರ್ಕಾರಕ್ಕೆ ಪ್ರಮಾಣ ಪತ್ರ ಸಲ್ಲಿಸುವುದು.',
    },
    'Sub-Judice': {
      term: 'ನ್ಯಾಯಾಲಯದ ವಿಚಾರಣೆಯಲ್ಲಿರುವ ವಿಷಯ (Sub-Judice)',
      nativeTerm: 'ವಿಚಾರಣಾಧೀನ',
      simplifiedMeaning:
        'ನ್ಯಾಯಾಲಯದಲ್ಲಿ ವಿಚಾರಣೆ ನಡೆಯುತ್ತಿರುವ ಮತ್ತು ಅಂತಿಮ ತೀರ್ಪು ಬಾಕಿ ಇರುವ ಪ್ರಕರಣ.',
      practicalExample:
        'ಕೋರ್ಟ್‌ನಲ್ಲಿ ವಿಚಾರಣೆ ನಡೆಯುತ್ತಿರುವ ವಿಷಯಗಳ ಬಗ್ಗೆ ಸಾರ್ವಜನಿಕವಾಗಿ ತೀರ್ಪು ನೀಡಲು ಬರುವುದಿಲ್ಲ.',
    },
    'Vakalatnama': {
      term: 'ವಕಾಲತ್ ನಾಮ (Vakalatnama)',
      nativeTerm: 'ವಕಾಲತ್ ನಾಮ',
      simplifiedMeaning:
        'ತನ್ನ ಪರವಾಗಿ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ವಾದಿಸಲು ವಕೀಲರಿಗೆ ಅಧಿಕಾರ ನೀಡಿ ಕ್ಲೈಂಟ್ ಸಹಿ ಮಾಡುವ ಅಧಿಕೃತ ಒಪ್ಪಂದ ಪತ್ರ.',
      practicalExample:
        'ಡಿಎಲ್‌ಎಸ್‌ಎ ವಕೀಲರು ನಿಮ್ಮ ಪರವಾಗಿ ವಾದಿಸಲು ನಿಯೋಜಿತರಾದಾಗ ವಕಾಲತ್ ನಾಮಕ್ಕೆ ಸಹಿ ಮಾಡಲಾಗುತ್ತದೆ.',
    },
  },

  Tamil: {
    'Cognizable Offence': {
      term: 'பிடியாணையின்றி கைது செய்யத்தக்க குற்றம் (Cognizable Offence)',
      nativeTerm: 'பிடியாணையின்றி கைது செய்யத்தக்க குற்றம்',
      simplifiedMeaning:
        'நீதிமன்ற வாரண்ட் இன்றியே காவல்துறையினர் குற்றவாளியைக் கைது செய்யக்கூடிய மற்றும் கட்டாயமாக எஃப்.ஐ.ஆர் பதிவு செய்ய வேண்டிய தீவிரக் குற்றம் (திருட்டு, இணைய மோசடி போன்றவை).',
      practicalExample:
        'உங்கள் செல்போன் பறிக்கப்பட்டாலோ அல்லது வங்கிக் கணக்கில் இணையத் திருட்டு நடந்தாலோ அது இத்தகைய குற்றமாகும்.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'பிடியாணை தேவைப்படும் சிறு குற்றம் (Non-Cognizable / NCR)',
      nativeTerm: 'என்சிஆர் (NCR)',
      simplifiedMeaning:
        'நீதிமன்ற வாரண்ட் இல்லாமல் காவல்துறை கைது செய்ய முடியாத சிறிய குற்றம் (வாய்மொழித் தகராறு போன்றவை). இதில் எஃப்.ஐ.ஆருக்குப் பதிலாக என்.சி.ஆர் பதிவு செய்யப்படும்.',
      practicalExample:
        'காவல்துறையினர் என்.சி.ஆர் பதிவு செய்து நீதிமன்றத்தை அணுகுமாறு அறிவுறுத்துவார்கள்.',
    },
    'Zero FIR': {
      term: 'ஜீரோ எஃப்.ஐ.ஆர் (Zero FIR)',
      nativeTerm: 'ஜீரோ எஃப்.ஐ.ஆர்',
      simplifiedMeaning:
        'சம்பவம் எங்கு நடந்திருந்தாலும் இந்தியாவில் உள்ள எந்தவொரு காவல் நிலையத்திலும் பதிவு செய்யப்படக்கூடிய எஃப்.ஐ.ஆர். பின்னர் இது சம்பந்தப்பட்ட காவல் நிலையத்திற்கு மாற்றப்படும்.',
      practicalExample:
        'வெளியூர் பயணத்தில் சம்பவம் நடந்தால், உங்கள் சொந்த ஊர் காவல் நிலையத்திலும் ஜீரோ எஃப்.ஐ.ஆர் பதிவு செய்யலாம்.',
    },
    'Legal Notice': {
      term: 'சட்ட அறிவிப்பு (Legal Notice)',
      nativeTerm: 'சட்ட அறிவிப்பு',
      simplifiedMeaning:
        'எதிர் தரப்பினருக்கு வழக்கறிஞர் மூலம் அனுப்பப்படும் முறையான கடிதம். நீதிமன்ற வழக்கு போடுவதற்கு முன் 15 அல்லது 30 நாட்கள் அவகாசம் தரப்படும்.',
      practicalExample:
        'வீட்டை ஒப்படைக்காத பில்டருக்கு ரேரா (RERA) செல்வதற்கு முன் 15 நாட்கள் சட்ட அறிவிப்பு அனுப்புவது.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'ஜாமீன்: முன்ஜாமீன் vs வழக்கமான ஜாமீன் (Bail)',
      nativeTerm: 'ஜாமீன்',
      simplifiedMeaning:
        'கைது செய்யப்படுவதற்கு முன்பே நீதிமன்றத்தில் பெறுவது முன்ஜாமீன் (Anticipatory Bail); கைது செய்யப்பட்ட பின்னர் நீதிமன்றத்தில் பெறுவது வழக்கமான ஜாமீன்.',
      practicalExample:
        'பொய் வழக்கில் கைது செய்யப்படலாம் என்ற அச்சம் இருந்தால் மாவட்ட முதன்மை அமர்வு நீதிமன்றத்தில் முன்ஜாமீன் பெறலாம்.',
    },
    'Affidavit': {
      term: 'பிரமாணப் பத்திரம் (Affidavit)',
      nativeTerm: 'பிரமாணப் பத்திரம்',
      simplifiedMeaning:
        'நோட்டரி பப்ளிக் முன்னிலையில் உண்மையென உறுதிமொழி கூறி கையொப்பமிட்டு வழங்கப்படும் எழுத்துப்பூர்வ ஆவணம்.',
      practicalExample:
        'தொலைந்துபோன ஆவணங்கள் அல்லது வருமானச் சான்றிதழுக்காக அரசுக்கு பிரமாணப் பத்திரம் தாக்கல் செய்வது.',
    },
    'Sub-Judice': {
      term: 'நீதிமன்ற விசாரணையில் உள்ள வழக்கு (Sub-Judice)',
      nativeTerm: 'விசாரணையில் உள்ள வழக்கு',
      simplifiedMeaning:
        'நீதிமன்றத்தில் விசாரணையில் உள்ள மற்றும் இறுதித் தீர்ப்பு நிலுவையில் உள்ள வழக்கு.',
      practicalExample:
        'நீதிமன்ற விசாரணையில் உள்ள வழக்குகளைப் பற்றி வெளிநபர்கள் தன்னிச்சையாக தீர்ப்பளிக்க முடியாது.',
    },
    'Vakalatnama': {
      term: 'வக்காலத்துநாமா (Vakalatnama)',
      nativeTerm: 'வக்காலத்துநாமா',
      simplifiedMeaning:
        'நீதிமன்றத்தில் தனது சார்பில் வழக்காட வழக்கறிஞருக்கு அதிகாரம் அளித்து கட்சிக்காரர் கையொப்பமிடும் சட்டப்பூர்வ ஆவணம்.',
      practicalExample:
        'டி.எல்.எஸ்.ஏ இலவச வழக்கறிஞர் நியமிக்கப்படும் போது வக்காலத்துநாமாவில் கையொப்பமிடுவர்.',
    },
  },

  Telugu: {
    'Cognizable Offence': {
      term: 'వారెంట్ లేకుండా అరెస్ట్ చేయదగిన తీవ్ర నేరం (Cognizable Offence)',
      nativeTerm: 'కాగ్నిజబుల్ నేరం',
      simplifiedMeaning:
        'కోర్టు వారెంట్ లేకుండానే పోలీసులు నిందితుడిని అరెస్టు చేయగల మరియు తప్పనిసరిగా ఎఫ్ఐఆర్ నమోదు చేయాల్సిన తీవ్రమైన నేరం (దొంగతనం, సైబర్ మోసం మొదలైనవి).',
      practicalExample:
        'మీ మొబైల్ ఫోన్ లాక్కున్నా లేదా బ్యాంక్ ఖాతా నుండి ఆన్‌లైన్‌లో డబ్బులు కొట్టేసినా అది కాగ్నిజబుల్ నేరం.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'వారెంట్ అవసరమైన చిన్న నేరం (Non-Cognizable / NCR)',
      nativeTerm: 'ఎన్‌సీఆర్ (NCR)',
      simplifiedMeaning:
        'కోర్టు అనుమతి లేదా వారెంట్ లేకుండా పోలీసులు అరెస్టు చేయలేని చిన్న నేరం (చిన్నపాటి గొడవలు). ఇందులో ఎఫ్ఐఆర్ బదులు ఎన్‌సీఆర్ ఇస్తారు.',
      practicalExample:
        'పోలీసులు ఎన్‌సీఆర్ నమోదు చేసి మేజిస్ట్రేట్ కోర్టుకు వెళ్లమని సూచిస్తారు.',
    },
    'Zero FIR': {
      term: 'జీరో ఎఫ్ఐఆర్ (Zero FIR)',
      nativeTerm: 'జీరో ఎఫ్ఐఆర్',
      simplifiedMeaning:
        'నేరం ఎక్కడ జరిగినా భారతదేశంలోని ఏ పోలీస్ స్టేషన్‌లోనైనా నమోదు చేయదగిన ఎఫ్ఐఆర్. తర్వాత దీనిని సంబంధిత పరిధిలోని స్టేషన్‌కు బదిలీ చేస్తారు.',
      practicalExample:
        'మీరు ప్రయాణంలో ఉన్నప్పుడు ఏదైనా జరిగితే, మీ స్వగ్రామానికి వచ్చిన తర్వాత కూడా జీరో ఎఫ్ఐఆర్ నమోదు చేయవచ్చు.',
    },
    'Legal Notice': {
      term: 'లీగల్ నోటీసు (Legal Notice)',
      nativeTerm: 'లీగల్ నోటీసు',
      simplifiedMeaning:
        'ఎదుటి పక్షానికి న్యాయవాది ద్వారా పంపే అధికారిక హెచ్చరిక పత్రం. కోర్టులో కేసు వేయడానికి ముందు సమస్య పరిష్కారానికి 15 లేదా 30 రోజుల గడువు ఇస్తారు.',
      practicalExample:
        'ఇంటి పత్రాలు ఇవ్వని బిల్డర్‌పై రెరాకు వెళ్లే ముందు 15 రోజుల లీగల్ నోటీసు పంపడం.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'బెయిల్: ముందస్తు vs సాధారణ బెయిల్ (Bail)',
      nativeTerm: 'బెయిల్',
      simplifiedMeaning:
        'అరెస్టు చేస్తారనే భయం ఉన్నప్పుడు ముందస్తుగా కోర్టు నుండి పొందేది ముందస్తు బెయిల్ (Anticipatory Bail); అరెస్టు అయిన తర్వాత పొందేది సాధారణ బెయిల్.',
      practicalExample:
        'తప్పుడు కేసులో అరెస్టు చేసే అవకాశముంటే సెషన్స్ కోర్టు నుండి ముందస్తు బెయిల్ పొందవచ్చు.',
    },
    'Affidavit': {
      term: 'అఫిడవిట్ / ప్రమాణ పత్రం (Affidavit)',
      nativeTerm: 'ప్రమాణ పత్రం',
      simplifiedMeaning:
        'నోటరీ లేదా కమిషనర్ సమక్షంలో నిజమని ప్రమాణం చేసి సంతకం చేసిన లిఖితపూర్వక వాంగ్మూలం.',
      practicalExample:
        'పోయిన సర్టిఫికెట్ల కోసం లేదా ఆదాయ ధృవీకరణ కోసం ప్రభుత్వానికి అఫిడవిట్ సమర్పించడం.',
    },
    'Sub-Judice': {
      term: 'కోర్టు విచారణలో ఉన్న అంశం (Sub-Judice)',
      nativeTerm: 'విచారణాధీనం',
      simplifiedMeaning:
        'ప్రస్తుతం న్యాయస్థానంలో విచారణలో ఉన్న మరియు తుది తీర్పు వెలువడని కేసు.',
      practicalExample:
        'కోర్టు పరిధిలో ఉన్న అంశాలపై బయటి వ్యక్తులు తీర్పులు చెప్పకూడదు.',
    },
    'Vakalatnama': {
      term: 'వకాలత్ నామా (Vakalatnama)',
      nativeTerm: 'వకాలత్ నామా',
      simplifiedMeaning:
        'కోర్టులో తన తరపున వాదించడానికి న్యాయవాదికి అధికారం ఇస్తూ క్లయింట్ సంతకం చేసే అధికారిక పత్రం.',
      practicalExample:
        'డీఎల్‌ఎస్ఏ ఉచిత న్యాయవాది మీ తరపున వాదించడానికి నియమించబడినప్పుడు వకాలత్‌నామాపై సంతకం చేస్తారు.',
    },
  },

  Marathi: {
    'Cognizable Offence': {
      term: 'दखलपात्र गुन्हा (Cognizable Offence)',
      nativeTerm: 'दखलपात्र गुन्हा',
      simplifiedMeaning:
        'असा गंभीर गुन्हा (उदा. चोरी, खंडणी, सायबर दरोडा) ज्यामध्ये पोलिसांना वॉरंटशिवाय आरोपीला अटक करण्याचा अधिकार असतो आणि एफआयआर नोंदवणे बंधनकारक असते.',
      practicalExample:
        'कोणी तुमचा मोबाईल हिसकावून नेला किंवा बँकेतून पैसे लंपास केले तर तो दखलपात्र गुन्हा ठरतो.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'अदखलपात्र गुन्हा (Non-Cognizable / NCR)',
      nativeTerm: 'अदखलपात्र गुन्हा',
      simplifiedMeaning:
        'असा किरकोळ गुन्हा (उदा. शिवीगाळ, किरकोळ भांडण) ज्यामध्ये पोलीस न्यायालयाच्या परवानगीशिवाय तपास किंवा अटक करू शकत नाहीत. यात एनसीआर (NCR) नोंदवला जातो.',
      practicalExample:
        'पोलीस एफआयआर ऐवजी एनसीआर नोंदवून दंडाधिकाऱ्यांकडे जाण्याचा सल्ला देतात.',
    },
    'Zero FIR': {
      term: 'झिरो एफआयआर (Zero FIR)',
      nativeTerm: 'झिरो एफआयआर',
      simplifiedMeaning:
        'घटना कुठेही घडली असली तरी भारतातील कोणत्याही पोलीस ठाण्यात नोंदवता येणारा एफआयआर. ठाणे याला "०" क्रमांक देऊन संबंधित पोलीस ठाण्याकडे वर्ग करते.',
      practicalExample:
        'प्रवासात घटना घडल्यास स्वतःच्या गावी परतल्यावरही जवळच्या ठाण्यात झिरो एफआयआर नोंदवता येतो.',
    },
    'Legal Notice': {
      term: 'कायदेशीर नोटीस (Legal Notice)',
      nativeTerm: 'कायदेशीर नोटीस',
      simplifiedMeaning:
        'विरोधी पक्षाला वकिलामार्फत पाठवलेली लेखी समज. कोर्टात जाण्यापूर्वी वाद मिटवण्यासाठी १५ किंवा ३० दिवसांची मुदत दिली जाते.',
      practicalExample:
        'फ्लॅटचा ताबा न देणाऱ्या बिल्डरला महारेराकडे जाण्यापूर्वी १५ दिवसांची कायदेशीर नोटीस पाठवणे.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'जामीन: अटकपूर्व vs नियमित (Bail)',
      nativeTerm: 'जामीन',
      simplifiedMeaning:
        'अटकेची शक्यता असताना आधीच न्यायालयातून मिळवलेला जामीन म्हणजे अटकपूर्व जामीन (Anticipatory Bail); अटकेनंतर मिळणारा जामीन म्हणजे नियमित जामीन.',
      practicalExample:
        'खोट्या गुन्ह्यात अटकेची भीती असल्यास सत्र न्यायालयातून अटकपूर्व जामीन मिळवता येतो.',
    },
    'Affidavit': {
      term: 'प्रतिज्ञापत्र / शपथपत्र (Affidavit)',
      nativeTerm: 'प्रतिज्ञापत्र',
      simplifiedMeaning:
        'अधिकृत नोटरी किंवा शपथ आयुक्तांसमोर खरे असल्याचे जाहीर केलेले लेखी प्रतिज्ञापत्र.',
      practicalExample:
        'गहाळ कागदपत्रांसाठी किंवा उत्पन्नाच्या दाखल्यासाठी शासनाकडे प्रतिज्ञापत्र सादर करणे.',
    },
    'Sub-Judice': {
      term: 'न्यायप्रविष्ट प्रकरण (Sub-Judice)',
      nativeTerm: 'न्यायप्रविष्ट',
      simplifiedMeaning:
        'सध्या न्यायालयात सुनावणी सुरू असलेले आणि अंतिम निकाल बाकी असलेले प्रकरण.',
      practicalExample:
        'न्यायप्रविष्ट प्रकरणांवर बाहेर कोणीही निकाल देऊ शकत नाही.',
    },
    'Vakalatnama': {
      term: 'वकालतनामा (Vakalatnama)',
      nativeTerm: 'वकालतनामा',
      simplifiedMeaning:
        'न्यायालयात आपल्या वतीने बाजू मांडण्यासाठी वकिलाला अधिकार देणारे अधिकृत दस्तऐवજ.',
      practicalExample:
        'डीएलएसएचे मोफत वकील नियुक्त झाल्यावर वकालतनाम्यावर स्वाक्षरी केली जाते.',
    },
  },

  Bengali: {
    'Cognizable Offence': {
      term: 'আমলযোগ্য অপরাধ (Cognizable Offence)',
      nativeTerm: 'আমলযোগ্য অপরাধ',
      simplifiedMeaning:
        'একটি গুরুতর অপরাধ (যেমন চুরি, খুন, সাইবার জালিয়াতি) যেখানে পুলিশ আদালতের ওয়ারেন্ট ছাড়াই গ্রেফতার করতে পারে এবং অবশ্যই এফআইআর করতে বাধ্য।',
      practicalExample:
        'কেউ আপনার ফোন ছিনতাই করলে বা ব্যাংক জালিয়াতি করলে তা আমলযোগ্য অপরাধ।',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'অ-আমলযোগ্য অপরাধ (Non-Cognizable / NCR)',
      nativeTerm: 'এনসিআর (NCR)',
      simplifiedMeaning:
        'একটি ছোটখাটো অপরাধ (যেমন গালিগালাজ, সামান্য মারামারি) যেখানে আদালতের নির্দেশ ছাড়া পুলিশ গ্রেফতার বা তদন্ত করতে পারে না। এখানে এনসিআর দেওয়া হয়।',
      practicalExample:
        'পুলিশ এফআইআরের বদলে এনসিআর লিখে ম্যাজিস্ট্রেটের কাছে যেতে নির্দেশ দেবে।',
    },
    'Zero FIR': {
      term: 'জিরো এফআইআর (Zero FIR)',
      nativeTerm: 'জিরো এফআইআর',
      simplifiedMeaning:
        'ঘটনা যেখানেই ঘটুক, ভারতের যেকোনো থানায় দায়ের করা যায় এমন এফআইআর। থানা এটিকে "০" নম্বর দিয়ে সংশ্লিষ্ট থানায় পাঠিয়ে দেয়।',
      practicalExample:
        'ভ্রমণের সময় কোনো ঘটনা ঘটলে নিজের এলাকায় ফিরেও জিরো এফআইআর করা যায়।',
    },
    'Legal Notice': {
      term: 'আইনি নোটিশ (Legal Notice)',
      nativeTerm: 'আইনি নোটিশ',
      simplifiedMeaning:
        'আইনজীবীর মাধ্যমে পাঠানো আনুষ্ঠানিক চিঠি, যাতে আদালতে মামলা করার আগে বিরোধ মেটাতে ১৫ বা ৩০ দিন সময় দেওয়া হয়।',
      practicalExample:
        'ফ্ল্যাট বুঝিয়ে না দেওয়া বিল্ডারকে রেরায় যাওয়ার আগে ১৫ দিনের আইনি নোটিশ পাঠানো।',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'জামিন: আগাম vs নিয়মিত (Bail)',
      nativeTerm: 'জামিন',
      simplifiedMeaning:
        'গ্রেফতারের আশঙ্কায় আদালত থেকে আগে নেওয়া জামিন হলো আগাম জামিন (Anticipatory Bail); গ্রেফতারের পর আদালত থেকে নেওয়া জামিন হলো নিয়মিত জামিন।',
      practicalExample:
        'মিথ্যা মামলায় গ্রেফতারের ভয় থাকলে দায়রা আদালত থেকে আগাম জামিন নেওয়া যায়।',
    },
    'Affidavit': {
      term: 'হলফনামা / অ্যাফিডেভিট (Affidavit)',
      nativeTerm: 'হলফনামা',
      simplifiedMeaning:
        'নোটারি বা ওথ কমিশনারের সামনে সত্য বলে শপথ নেওয়া একটি লিখিত বিবরণ।',
      practicalExample:
        'নথি হারিয়ে গেলে বা আয়ের প্রমাণের জন্য সরকারি দপ্তরে হলফনামা জমা দেওয়া।',
    },
    'Sub-Judice': {
      term: 'বিচারাধীন বিষয় (Sub-Judice)',
      nativeTerm: 'বিচারাধীন',
      simplifiedMeaning:
        'এমন একটি মামলা যা বর্তমানে আদালতে বিচারাধীন এবং যার চূড়ান্ত রায় এখনো হয়নি।',
      practicalExample:
        'বিচারাধীন বিষয়ে বাইরের কেউ রায় ঘোষণা করতে পারে না।',
    },
    'Vakalatnama': {
      term: 'ওকালতনামা (Vakalatnama)',
      nativeTerm: 'ওকালতনামা',
      simplifiedMeaning:
        'আদালতে নিজের পক্ষে সওয়াল করার জন্য আইনজীবীকে কর্তৃত্ব দিয়ে মক্কেলের স্বাক্ষর করা দলিল।',
      practicalExample:
        'ডিএলএসএ আইনজীবী নিযুক্ত হলে ওকালতনামায় স্বাক্ষর করা হয়।',
    },
  },

  Gujarati: {
    'Cognizable Offence': {
      term: 'ગંભીર ગુનો (Cognizable Offence)',
      nativeTerm: 'કોગ્નિઝેબલ ગુનો',
      simplifiedMeaning:
        'એવો ગંભીર ગુનો (જેમ કે ચોરી, સાયબર લૂંટ) જેમાં પોલીસ કોર્ટના વોરંટ વગર આરોપીની ધરપકડ કરી શકે છે અને ફરજિયાત એફઆઈઆર નોંધવી પડે છે.',
      practicalExample:
        'કોઈ તમારો મોબાઈલ આંચકી લે કે ઓનલાઈન પૈસા ઉપાડી લે તો તે કોગ્નિઝેબલ ગુનો છે.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'બિન-કોગ્નિઝેબલ ગુનો (Non-Cognizable / NCR)',
      nativeTerm: 'એનસીઆર (NCR)',
      simplifiedMeaning:
        'એવો સામાન્ય ગુનો (જેમ કે ગાળાગાળી, સામાન્ય બોલાચાલી) જેમાં પોલીસ મેજિસ્ટ્રેટના વોરંટ વગર ધરપકડ કે તપાસ કરી શકતી નથી. આમાં એનસીઆર નોંધાય છે.',
      practicalExample:
        'પોલીસ એફઆઈઆરને બદલે એનસીઆર નોંધીને કોર્ટમાં જવાની સલાહ આપશે.',
    },
    'Zero FIR': {
      term: 'ઝીરો એફઆઈઆર (Zero FIR)',
      nativeTerm: 'ઝીરો એફઆઈઆર',
      simplifiedMeaning:
        'ઘટના ગમે ત્યાં બની હોય, ભારતના કોઈપણ પોલીસ સ્ટેશનમાં નોંધાવી શકાતી એફઆઈઆર. સ્ટેશન તેને "૦" નંબર આપીને સંબંધિત સ્ટેશનમાં ટ્રાન્સફર કરે છે.',
      practicalExample:
        'પ્રવાસ દરમિયાન ઘટના બને તો પોતાના વતન પાછા આવીને પણ ઝીરો એફઆઈઆર નોંધાવી શકાય છે.',
    },
    'Legal Notice': {
      term: 'કાનૂની નોટિસ (Legal Notice)',
      nativeTerm: 'કાનૂની નોટિસ',
      simplifiedMeaning:
        'સામા પક્ષને વકીલ મારફતે મોકલાયેલી લેખિત ચેતવણી. કોર્ટ કેસ કરતા પહેલાં સમાધાન માટે ૧૫ કે ૩૦ દિવસની મુદત અપાય છે.',
      practicalExample:
        'ફ્લેટનો કબજો ન આપનાર બિલ્ડર સામે રેરામાં જતાં પહેલાં ૧૫ દિવસની લીગલ નોટિસ આપવી.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'જામીન: આગોતરા vs નિયમિત (Bail)',
      nativeTerm: 'જામીન',
      simplifiedMeaning:
        'ધરપકડની દહેશત હોય ત્યારે અગાઉથી મેળવાતા જામીન એટલે આગોતરા જામીન (Anticipatory Bail); ધરપકડ થયા પછી મેળવાતા જામીન એટલે નિયમિત જામીન.',
      practicalExample:
        'ખોટા કેસમાં ધરપકડનો ડર હોય તો સેશન્સ કોર્ટમાંથી આગોતરા જામીન મેળવી શકાય છે.',
    },
    'Affidavit': {
      term: 'સોગંદનામું (Affidavit)',
      nativeTerm: 'સોગંદનામું',
      simplifiedMeaning:
        'નોટરી સમક્ષ સાચું હોવાની ખાતરી આપીને સહી કરેલું લેખિત નિવેદન.',
      practicalExample:
        'ખોવાયેલા દસ્તાવેજો કે આવકના દાખલા માટે સરકારમાં સોગંદનામું રજૂ કરવું.',
    },
    'Sub-Judice': {
      term: 'અદાલતમાં વિચારાધીન કેસ (Sub-Judice)',
      nativeTerm: 'વિચારાધીન',
      simplifiedMeaning:
        'હાલમાં અદાલતમાં ચાલતો અને જેનો આખરી ચુકાદો બાકી હોય તેવો કેસ.',
      practicalExample:
        'અદાલતમાં ચાલતા કેસ પર બહારના લોકો પોતાનો ચુકાદો આપી શકતા નથી.',
    },
    'Vakalatnama': {
      term: 'વકાલતનામું (Vakalatnama)',
      nativeTerm: 'વકાલતનામું',
      simplifiedMeaning:
        'કોર્ટમાં પોતાના વતી દલીલ કરવા માટે વકીલને સત્તા આપતો પક્ષકારની સહીવાળો કાનૂની દસ્તાવેજ.',
      practicalExample:
        'ડીએલએસએ વકીલની નિમણૂક થાય ત્યારે વકાલતનામા પર સહી થાય છે.',
    },
  },

  Malayalam: {
    'Cognizable Offence': {
      term: 'വാറന്റില്ലാതെ അറസ്റ്റ് ചെയ്യാവുന്ന കുറ്റം (Cognizable Offence)',
      nativeTerm: 'കോഗ്നിസിബിൾ കുറ്റം',
      simplifiedMeaning:
        'കോടതി വാറന്റില്ലാതെ പോലീസിന് പ്രതിയെ അറസ്റ്റ് ചെയ്യാൻ അധികാരമുള്ളതും നിർബന്ധമായും എഫ്.ഐ.ആർ രജിസ്റ്റർ ചെയ്യേണ്ടതുമായ ഗൗരവമുള്ള കുറ്റം (മോഷണം, സൈബർ തട്ടിപ്പ് മുതലായവ).',
      practicalExample:
        'ആരെങ്കിലും നിങ്ങളുടെ മൊബൈൽ തട്ടിപ്പറിച്ചാലോ ഓൺലൈൻ സാമ്പത്തിക തട്ടിപ്പ് നടത്തിയാലോ അത് കോഗ്നിസിബിൾ കുറ്റമാണ്.',
    },
    'Non-Cognizable Offence (NCR)': {
      term: 'വാറന്റ് ആവശ്യമുള്ള ചെറിയ കുറ്റം (Non-Cognizable / NCR)',
      nativeTerm: 'എൻ.സി.ആർ (NCR)',
      simplifiedMeaning:
        'മജിസ്‌ട്രേറ്റിന്റെ അനുമതിയില്ലാതെ പോലീസിന് അറസ്റ്റ് ചെയ്യാനോ അന്വേഷിക്കാനോ കഴിയാത്ത ചെറിയ കുറ്റങ്ങൾ. ഇതിൽ എഫ്.ഐ.ആറിന് പകരം എൻ.സി.ആർ രേഖപ്പെടുത്തുന്നു.',
      practicalExample:
        'പോലീസ് എഫ്.ഐ.ആറിന് പകരം എൻ.സി.ആർ രേഖപ്പെടുത്തി മജിസ്‌ട്രേറ്റിനെ സമീപിക്കാൻ നിർദ്ദേശിക്കും.',
    },
    'Zero FIR': {
      term: 'സീറോ എഫ്.ഐ.ആർ (Zero FIR)',
      nativeTerm: 'സീറോ എഫ്.ഐ.ആർ',
      simplifiedMeaning:
        'സംഭവം എവിടെ നടന്നാലും ഇന്ത്യയിലെ ഏത് പോലീസ് സ്റ്റേഷനിലും രജിസ്റ്റർ ചെയ്യാവുന്ന എഫ്.ഐ.ആർ. പിന്നീട് ഇത് ബന്ധപ്പെട്ട പോലീസ് സ്റ്റേഷനിലേക്ക് മാറ്റും.',
      practicalExample:
        'യാത്രയ്ക്കിടയിൽ എന്തെങ്കിലും സംഭവിച്ചാൽ സ്വന്തം നാട്ടിൽ തിരിച്ചെത്തിയും സീറോ എഫ്.ഐ.ആർ രജിസ്റ്റർ ചെയ്യാം.',
    },
    'Legal Notice': {
      term: 'വക്കീൽ നോട്ടീസ് / ലീഗൽ നോട്ടീസ് (Legal Notice)',
      nativeTerm: 'ലീഗൽ നോട്ടീസ്',
      simplifiedMeaning:
        'എതിർകക്ഷിക്ക് വക്കീൽ മുഖേന അയക്കുന്ന ഔദ്യോഗിക കത്ത്. കോടതിയിൽ കേസ് ഫയൽ ചെയ്യുന്നതിന് മുൻപ് പരിഹാരത്തിനായി 15 അല്ലെങ്കിൽ 30 ദിവസം സമയം നൽകുന്നു.',
      practicalExample:
        'ഫ്ലാറ്റ് കൈമാറാത്ത നിർമ്മാതാവിന് റെറയിൽ (RERA) പോകുന്നതിന് മുൻപ് 15 ദിവസത്തെ ലീഗൽ നോട്ടീസ് അയക്കുന്നത്.',
    },
    'Bail (Anticipatory vs Regular)': {
      term: 'ജാമ്യം: മുൻകൂർ vs സാധാരണ ജാമ്യം (Bail)',
      nativeTerm: 'ജാമ്യം',
      simplifiedMeaning:
        'അറസ്റ്റ് ഭയക്കുമ്പോൾ മുൻകൂട്ടി കോടതിയിൽ നിന്ന് നേടുന്നതാണ് മുൻകൂർ ജാമ്യം (Anticipatory Bail); അറസ്റ്റിന് ശേഷം കോടതിയിൽ നിന്ന് നേടുന്നത് സാധാരണ ജാമ്യം.',
      practicalExample:
        'വ്യാജ കേസിൽ അറസ്റ്റിന് സാധ്യതയുണ്ടെങ്കിൽ സെഷൻസ് കോടതിയിൽ നിന്ന് മുൻകൂർ ജാമ്യം നേടാം.',
    },
    'Affidavit': {
      term: 'സത്യവാങ്മൂലം / അഫിഡവിറ്റ് (Affidavit)',
      nativeTerm: 'സത്യവാങ്മൂലം',
      simplifiedMeaning:
        'നോട്ടറിയുടെ സാന്നിധ്യത്തിൽ സത്യമാണെന്ന് ബോധിപ്പിച്ച് ഒപ്പിട്ടു നൽകുന്ന രേഖാമൂലമുള്ള പ്രസ്താവന.',
      practicalExample:
        'നഷ്ടപ്പെട്ട രേഖകൾക്കോ വരുമാന സർട്ടിഫിക്കറ്റിനോ സർക്കാരിലേക്ക് സത്യവാങ്മൂലം സമർപ്പിക്കുന്നത്.',
    },
    'Sub-Judice': {
      term: 'കോടതിയുടെ പരിഗണനയിലുള്ള കേസ് (Sub-Judice)',
      nativeTerm: 'സബ്-ജൂഡിസ്',
      simplifiedMeaning:
        'നിലവിൽ കോടതിയുടെ വിചാരണയിലുള്ളതും അന്തിമ വിധി വരാത്തതുമായ കേസ്.',
      practicalExample:
        'കോടതിയുടെ പരിഗണനയിലുള്ള കാര്യങ്ങളിൽ പുറത്തുനിന്നുള്ളവർക്ക് വിധി പറയാൻ കഴിയില്ല.',
    },
    'Vakalatnama': {
      term: 'വക്കാലത്ത് നാമ (Vakalatnama)',
      nativeTerm: 'വക്കാലത്ത് നാമ',
      simplifiedMeaning:
        'കോടതിയിൽ തനിക്ക് വേണ്ടി വാദിക്കാൻ അഭിഭാഷകന് അധികാരം നൽകി കക്ഷി ഒപ്പിട്ടു നൽകുന്ന ഔദ്യോഗിക രേഖ.',
      practicalExample:
        'ഡി.എൽ.എസ്.എ അഭിഭാഷകൻ കേസ് വാദിക്കാൻ എത്തുമ്പോൾ വക്കാലത്ത് നാമയിൽ ഒപ്പിടുന്നു.',
    },
  },
};

/**
 * Returns the localized LegalTopic list for the selected language.
 * Falls back to English for any missing field.
 */
export function getLocalizedLegalTopics(lang: SupportedLanguage): LegalTopic[] {
  const localizedDict = LOCALIZED_TOPICS_MAP[lang] || LOCALIZED_TOPICS_MAP['English'];

  return LEGAL_TOPICS.map((topic) => {
    const loc = localizedDict[topic.id];
    if (!loc) {
      return topic;
    }

    return {
      ...topic,
      title: loc.title || topic.title,
      shortDescription: loc.shortDescription || topic.shortDescription,
      fullExplanation: loc.fullExplanation || topic.fullExplanation,
      primaryLaw: loc.primaryLaw || topic.primaryLaw,
      keyRights: loc.keyRights && loc.keyRights.length ? loc.keyRights : topic.keyRights,
      whatToDoIfViolated:
        loc.whatToDoIfViolated && loc.whatToDoIfViolated.length
          ? loc.whatToDoIfViolated
          : topic.whatToDoIfViolated,
      recommendedAuthority: loc.recommendedAuthority || topic.recommendedAuthority,
      helpline: loc.helpline || topic.helpline,
    };
  });
}

/**
 * Returns the localized LegalTermGlossary list for the selected language.
 */
export function getLocalizedLegalGlossary(lang: SupportedLanguage): LegalTermGlossary[] {
  const localizedDict = LOCALIZED_GLOSSARY_MAP[lang] || LOCALIZED_GLOSSARY_MAP['English'];

  return LEGAL_GLOSSARY.map((item) => {
    const loc = localizedDict[item.term];
    if (!loc) {
      return item;
    }

    return {
      term: loc.term || item.term,
      hindiTerm: loc.nativeTerm || item.hindiTerm,
      simplifiedMeaning: loc.simplifiedMeaning || item.simplifiedMeaning,
      practicalExample: loc.practicalExample || item.practicalExample,
    };
  });
}
`;

fs.writeFileSync(OUTPUT_FILE, fullFileContent, 'utf8');
console.log('Successfully wrote', OUTPUT_FILE);
`;

fs.writeFileSync('build_full_translations.mjs', fullFileContent, 'utf8');
console.log('Generator script written to build_full_translations.mjs');
