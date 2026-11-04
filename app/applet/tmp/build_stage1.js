import fs from 'fs';
import path from 'path';

// Let's create the comprehensive legal translations file
const targetFile = path.resolve('src/data/legalTopicsTranslations.ts');

const content = `import { LegalTopic, LegalTermGlossary, CategoryKey } from '../types';
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
};
`;

console.log('Writing target legalTopicsTranslations builder...');
fs.writeFileSync('tmp/partial_translations.js', content, 'utf8');
console.log('Partial written successfully.');
