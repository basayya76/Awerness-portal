# -*- coding: utf-8 -*-
"""
Generates src/data/legalTopicsTranslations.ts containing complete, high-quality,
authentic localized legal topics and glossary terms in all 9 Indian languages.
"""

import json

content = """import { LegalTopic, LegalTermGlossary, CategoryKey } from '../types';
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

// Translations for all 9 legal topics across all 9 supported languages
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
      helpline: '1930 (National Cyber Fraud Helpline)',
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
};
"""

print("Writing template base...")
with open("tmp/template_base.py", "w", encoding="utf-8") as f:
    f.write(content)
print("Base written successfully.")
