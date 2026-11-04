import {
  CategoryKey,
  Complaint,
  EmergencyContact,
  LegalAidService,
  LegalTermGlossary,
  LegalTopic,
} from '../types';

export const COMPLAINT_CATEGORIES: Record<
  CategoryKey,
  {
    subcategories: string[];
    recommendedAuthority: string;
    helpline: string;
    portalUrl: string;
    nextStepSummary: string;
    actionChecklist: string[];
  }
> = {
  'Consumer Rights': {
    subcategories: [
      'Defective Goods / Non-functional Appliance',
      'Deficiency in Services (Aviation, Hotel, Courier, Telecom)',
      'E-commerce Delivery Failure / Refund Withheld',
      'Overcharging / MRP Violation / Hidden Charges',
      'Misleading Advertisements & False Claims',
      'Medical Negligence / Hospital Overbilling',
      'Warranty / Guarantee Refusal',
    ],
    recommendedAuthority: 'District Consumer Disputes Redressal Commission / e-Daakhil Portal',
    helpline: '1915 (National Consumer Helpline)',
    portalUrl: 'https://edaakhil.nic.in',
    nextStepSummary:
      'Serve a formal written legal notice to the seller/provider with a 15-day deadline. If unanswered, file online on e-Daakhil or register a grievance with NCH (1915).',
    actionChecklist: [
      'Preserve tax invoice, warranty cards, delivery receipts, and payment transactions.',
      'Record all written communication with seller customer care (emails, chat transcripts).',
      'Send a formal 15-day notice specifying defect and required refund/replacement.',
      'Lodge grievance on National Consumer Portal (consumerhelpline.gov.in) or call 1915.',
      'File consumer case on e-Daakhil without hiring an advocate if value is under statutory threshold.',
    ],
  },
  'Cybercrime': {
    subcategories: [
      'UPI / Credit Card / Net Banking Financial Fraud',
      'Phishing / Lottery / Fake Job Scam',
      'Identity Theft / Impersonation / Fake Social Profile',
      'Cyber Stalking / Harassment / Online Threats',
      'Unauthorized Sextortion / Private Photo Leaks',
      'Ransomware / Data Breach / Malware',
      'SIM Swap Fraud',
    ],
    recommendedAuthority: 'National Cyber Crime Reporting Portal / Local Cyber Police Station',
    helpline: '1930 (Cyber Fraud Emergency Hotline)',
    portalUrl: 'https://cybercrime.gov.in',
    nextStepSummary:
      'Call 1930 IMMEDIATELY within the Golden Hour to freeze fraudulent bank transfers. Submit full digital evidence on cybercrime.gov.in.',
    actionChecklist: [
      'Dial 1930 immediately with bank account number, transaction ID, and UPI reference.',
      'Take uncropped screenshots of SMS, WhatsApp chats, fake URLs, and transaction receipts.',
      'Block your compromised debit/credit card and freeze net banking access.',
      'Do NOT delete chat history or call recordings with the scammer.',
      'File an official cyber complaint at cybercrime.gov.in and save the acknowledgement PDF.',
    ],
  },
  "Women's Rights": {
    subcategories: [
      'Sexual Harassment at Workplace (POSH)',
      'Dowry Demand / Harassment',
      'Denial of Maternity Benefits / Pregnancy Discrimination',
      'Stalking / Molestation in Public Places',
      'Right to Stridhan Withheld by In-Laws',
      'Cruelty by Husband or Relatives (Sec 498A / 85 BNS)',
      'Denial of Equal Remuneration',
    ],
    recommendedAuthority: 'National Commission for Women (NCW) / District Protection Officer / Sakhi One Stop Centre',
    helpline: '181 (Women in Distress) / 7827170170 (NCW 24x7)',
    portalUrl: 'http://ncw.nic.in',
    nextStepSummary:
      'Contact your local Sakhi One Stop Centre or call 181. For workplace harassment, approach the Internal Complaints Committee (ICC). Free legal representation is guaranteed under Section 12 NALSA.',
    actionChecklist: [
      'Approach the nearest One Stop Centre (OSC) for integrated medical, police, shelter, and legal support.',
      'For workplace matters, submit a formal written complaint to ICC within 3 months.',
      'Avail 100% free legal aid through District Legal Services Authority (DLSA) regardless of income.',
      'Reach Women Police Station or request Zero FIR at any nearby police station.',
    ],
  },
  'Domestic Violence': {
    subcategories: [
      'Physical Abuse / Assault',
      'Emotional / Verbal / Psychological Abuse',
      'Economic Abuse (Deprivation of Money, Food, Clothes, Shelter)',
      'Sexual Abuse in Domestic Relationship',
      'Illegal Eviction from Shared Household',
      'Threat of Violence Against Children',
    ],
    recommendedAuthority: 'Judicial Magistrate First Class via Protection Officer (PWDVA 2005) / Sakhi OSC',
    helpline: '181 (Women Helpline) / 112 (Police Emergency)',
    portalUrl: 'https://nalsa.gov.in',
    nextStepSummary:
      'Approach the Protection Officer or Service Provider under PWDVA 2005. You can obtain immediate Protection Orders, Residence Orders, and Interim Maintenance.',
    actionChecklist: [
      'Reach safety immediately; if in acute danger call 112 or 181.',
      'Obtain a Medical Examination Report (MLC) if physical injuries exist.',
      'File a Domestic Incident Report (DIR) with the local Protection Officer.',
      'Apply to Magistrate for ex-parte protection orders and right to reside in the shared household.',
      'Request free DLSA advocate for maintenance and child custody applications.',
    ],
  },
  'Labour/Employment': {
    subcategories: [
      'Unpaid Wages / Withheld Salary / Illegal Deductions',
      'Wrongful Termination without Statutory Notice',
      'Denial of Provident Fund (PF) / Gratuity / ESI',
      'Unsafe Working Conditions / Lack of PPE',
      'Excessive Work Hours / Unpaid Overtime',
      'Contract Labour Exploitation / Bonded Labour',
      'Discrimination or Retaliation at Workplace',
    ],
    recommendedAuthority: 'Office of the Labour Commissioner / Shram Suvidha Portal',
    helpline: '155214 / 14434 (Samadhan Portal)',
    portalUrl: 'https://shramsuvidha.gov.in',
    nextStepSummary:
      'Raise a grievance on the Shram Suvidha or Samadhan portal. Send demand notice to employer citing Payment of Wages Act or Industrial Disputes Act.',
    actionChecklist: [
      'Preserve appointment letter, payslips, bank statements, resignation/termination letters.',
      'Log overtime hours, badge punch records, and work emails showing active employment.',
      'Send a formal representation in writing to HR / Employer giving 15 days to settle dues.',
      'Lodge complaint with District Labour Conciliation Officer under the Industrial Disputes framework.',
      'Approach EPFO grievance portal (epfigms.gov.in) if PF deductions were made but not deposited.',
    ],
  },
  'Education/Student Rights': {
    subcategories: [
      'Ragging / Campus Harassment',
      'College Withholding Original Certificates / Degrees',
      'Refusal of Fee Refund upon Seat Cancellation',
      'Capitation Fee / Illegal Donation Demand',
      'Unfair Denial of Admission / RTE Violation',
      'Discriminatory Evaluation / Retaliation by Faculty',
      'Lack of Mandatory Infrastructure / Facilities',
    ],
    recommendedAuthority: 'UGC Anti-Ragging Cell / National Commission for Protection of Child Rights (NCPCR)',
    helpline: '1800-180-5522 (National Anti-Ragging Toll Free)',
    portalUrl: 'https://www.antiragging.in',
    nextStepSummary:
      'For ragging, report instantly to 1800-180-5522. For fee refunds or withheld documents, file a grievance on UGC e-Samadhan portal.',
    actionChecklist: [
      'For ragging, call the 24x7 toll-free helpline or email helpline@antiragging.in anonymously.',
      'Retain fee receipts, prospectus, admission letters, and correspondence with college management.',
      'Quote UGC Fee Refund Policy Guidelines which mandate full refund (minus nominal processing fee) for timely withdrawals.',
      'Colleges cannot legally withhold original certificates under UGC regulations.',
      'Escalate unresolved issues to State Higher Education Department or District Consumer Forum.',
    ],
  },
  'Property/Land': {
    subcategories: [
      'Encroachment / Illegal Possession of Land',
      'Builder Delay in Handover / Real Estate Fraud',
      'Title Dispute / Forged Sale Deed',
      'Boundary Dispute / Agricultural Land Row',
      'Inheritance / Partition Denial Among Heirs',
      'Land Acquisition Compensation Issue',
      'Unauthorized Construction in Neighborhood',
    ],
    recommendedAuthority: 'RERA (Real Estate Regulatory Authority) / Sub-Divisional Magistrate (SDM) / Civil Court',
    helpline: '15100 (Legal Aid Guidance)',
    portalUrl: 'https://rera.gov.in',
    nextStepSummary:
      'For builder delays or project deviations, file before State RERA. For agricultural/boundary disputes, file before SDM / Revenue Tehsildar.',
    actionChecklist: [
      'Gather Registry / Sale Deed, Mutation copy (Jamabandi/Khatauni), Encumbrance Certificate (EC).',
      'Obtain certified copies of revenue maps and demarcation reports from the Tehsildar.',
      'If builder project is registered, search RERA quarterly reports and file an online complaint.',
      'Apply to SDM under Section 145 CrPC if there is imminent threat of breach of peace.',
      'Consult DLSA panel advocate for partition or title declaration suit.',
    ],
  },
  'Family Dispute': {
    subcategories: [
      'Maintenance Claim (Sec 125 CrPC / Sec 144 BNSS)',
      'Child Custody & Visitation Rights',
      'Restitution of Conjugal Rights / Separation',
      'Mutual or Contested Divorce Consultation',
      'Guardianship and Ward Disputes',
      'Elderly Parent Maintenance by Children',
    ],
    recommendedAuthority: 'District Family Court / DLSA Mediation & Conciliation Centre',
    helpline: '15100 (NALSA Citizen Mediation Helpline)',
    portalUrl: 'https://nalsa.gov.in',
    nextStepSummary:
      'Approach the DLSA Mediation Center for peaceful pre-litigation settlement. Women, children, and low-income families are entitled to free legal counsel.',
    actionChecklist: [
      'Consider pre-litigation mediation at DLSA before filing adversarial court petitions.',
      'Prepare marriage certificate, proof of income, bank statements, and children educational expenses.',
      'Wives and minor children can claim interim maintenance immediately under Sec 125 CrPC / BNSS.',
      'All family court proceedings offer in-camera hearing options to protect privacy.',
    ],
  },
  'Financial Fraud': {
    subcategories: [
      'Ponzi Scheme / Multi-Level Marketing Scam',
      'Unauthorized Loan App Harassment / Blackmail',
      'Stock Market / Crypto Tip Scam',
      'Insurance Mis-selling / Claim Rejection',
      'Bank Refusing Unauthorized Debit Reversal',
      'Cheque Bounce (Sec 138 NI Act)',
    ],
    recommendedAuthority: 'Reserve Bank of India (RBI) Ombudsman / SEBI SCORES / IRDAI Bima Bharosa',
    helpline: '14440 (RBI Helpline) / 1930 (Cyber Fraud)',
    portalUrl: 'https://cms.rbi.org.in',
    nextStepSummary:
      'For banking failures, complain to the RBI Banking Ombudsman (cms.rbi.org.in). For loan shark harassment, report to cyber police and local police immediately.',
    actionChecklist: [
      'For loan apps, do NOT pay ransom; revoke contacts/media permissions on your smartphone.',
      'Lodge formal complaint with your bank within 3 working days to retain Zero Liability protection under RBI circular.',
      'For insurance rejection, file with the Insurance Ombudsman (cioins.co.in) within 1 year.',
      'For cheque bounce, statutory legal notice must be issued strictly within 30 days of memo.',
    ],
  },
  'Government Service': {
    subcategories: [
      'Bribery Demand / Corruption by Public Servant',
      'RTI Application Ignored / Denied Unlawfully',
      'Delay in Caste, Income, Domicile Certificate',
      'Pension / Gratuity Withheld Unlawfully',
      'Passport / Aadhaar / Ration Card Service Denial',
      'Civic Maladministration / Road & Water Failure',
    ],
    recommendedAuthority: 'CPGRAMS (Central Grievance Portal) / State Lokayukta / Anti-Corruption Bureau',
    helpline: '1800-11-0031 (CPGRAMS Helpline)',
    portalUrl: 'https://pgportal.gov.in',
    nextStepSummary:
      'Lodge a grievance on pgportal.gov.in (CPGRAMS). For RTI refusal, file First Appeal within 30 days before the Departmental First Appellate Authority.',
    actionChecklist: [
      'Register grievance on CPGRAMS which mandates a 21-30 day redressal timeline by ministries.',
      'For corruption/bribery, contact the State Vigilance / ACB or CBI without paying bribes.',
      'For RTI, file First Appeal if no response arrives within 30 days of RTI filing.',
      'Approach State Lokayukta or Chief Minister Citizen Helpline for state-level apathy.',
    ],
  },
  'Senior Citizen Rights': {
    subcategories: [
      'Neglect / Abandonment by Adult Children or Relatives',
      'Property Transfer Revocation due to Non-maintenance',
      'Elder Abuse (Physical, Psychological, Financial)',
      'Denial of Old Age Pension / Healthcare Benefits',
      'Banking Discrimination / Digital Exclusion',
    ],
    recommendedAuthority: 'Maintenance Tribunal under SDM (Senior Citizens Act 2007) / Elderline',
    helpline: '14567 (Elderline National Helpline)',
    portalUrl: 'https://socialjustice.gov.in',
    nextStepSummary:
      'Call 14567 (Elderline). Apply to the SDM Maintenance Tribunal under the 2007 Act. Gift deeds can be legally declared void if children fail to provide basic needs.',
    actionChecklist: [
      'Call Elderline 14567 for immediate rescue, emotional support, and legal guidance.',
      'File application before the SDM Maintenance Tribunal; proceedings do not require expensive lawyers.',
      'Tribunal has statutory power to order monthly maintenance up to ₹10,000+ per month.',
      'Section 23 allows cancellation of property gift deeds if transferee fails to provide amenities.',
    ],
  },
  'Disability Rights': {
    subcategories: [
      'Lack of Physical Accessibility in Public Infrastructure',
      'Denial of Reasonable Accommodation at Workplace',
      'Discrimination in Education / Denial of Inclusive Admission',
      'Denial of Scribe / Compensatory Time in Exams',
      'Delay in UDID Card Issuance',
      'Violation of 4% Public Sector Reservation Quota',
    ],
    recommendedAuthority: 'Court of Chief Commissioner for Persons with Disabilities (CCPD) / State Commissioner',
    helpline: '011-20892280 (CCPD) / 15100',
    portalUrl: 'https://ccdisabilities.nic.in',
    nextStepSummary:
      'File complaint before the State Commissioner or CCPD under RPwD Act 2016. RPwD Act mandates penalties for discrimination and barrier-free access.',
    actionChecklist: [
      'Keep Disability Certificate / UDID Card details handy.',
      'Record photos/videos demonstrating lack of accessibility or written denial of accommodation.',
      'Submit written representation to institution or employer citing RPwD Act 2016 provisions.',
      'Lodge formal grievance with State Commissioner for Persons with Disabilities.',
      'Free legal aid is an unconditional entitlement for persons with disabilities under NALSA.',
    ],
  },
  'Housing/Tenancy': {
    subcategories: [
      'Illegal Eviction / Threat to Throw Belongings',
      'Landlord Withholding Security Deposit Unreasonably',
      'Arbitrary Rent Hike Violating Agreement',
      'Disconnection of Water / Electricity / Essential Amenities',
      'Tenant Refusing to Vacate after Lease Expiry',
      'RWA Discrimination (Single tenants, Food choices, Pet owners)',
    ],
    recommendedAuthority: 'Rent Authority / Rent Court / Model Tenancy Tribunal / Police for Amenities',
    helpline: '15100 (DLSA Tenancy Advice)',
    portalUrl: 'https://mohua.gov.in',
    nextStepSummary:
      'A landlord CANNOT cut off electricity or water to force eviction. File an urgent complaint with the Rent Authority or local magistrate.',
    actionChecklist: [
      'Maintain stamped registered rent agreement, rent payment receipts, bank transactions.',
      'Essential services (water, power) cannot be cut off; police can be summoned immediately.',
      'Send a formal demand letter for refund of security deposit with deduction breakdown demand.',
      'RWA bylaws cannot override fundamental constitutional rights or national tenancy laws.',
      'Approach Rent Court or DLSA mediation for peaceful resolution.',
    ],
  },
  'Criminal Matter': {
    subcategories: [
      'Police Refusal to Register FIR',
      'Assault / Battery / Physical Harm',
      'Theft / Burglary / Robbery',
      'Criminal Intimidation / Death Threats',
      'Wrongful Confinement / Illegal Detention',
      'Hit and Run / Road Accident Negligence',
    ],
    recommendedAuthority: 'Superintendent of Police (SP) / Judicial Magistrate (Sec 156(3) CrPC / Sec 175(3) BNSS)',
    helpline: '112 (Police Emergency)',
    portalUrl: 'https://ncrb.gov.in',
    nextStepSummary:
      'If the local SHO refuses to register an FIR for a cognizable offence, send the complaint by registered post to the SP. If still unaddressed, apply to the Magistrate.',
    actionChecklist: [
      'Police must register an FIR for cognizable offences (Lalita Kumari Supreme Court judgment).',
      'If police refuse, apply to the District SP/DCP in writing under CrPC / BNSS provisions.',
      'You are entitled to a free, signed copy of the FIR immediately upon registration.',
      'If arrested, you have the right to inform a friend/relative and be produced before a judge in 24 hrs.',
      'Avail DLSA duty counsel present at every criminal court.',
    ],
  },
  'Other': {
    subcategories: [
      'General Civil Grievance',
      'Environmental Pollution / Illegal Tree Cutting',
      'Animal Cruelty / Pet Harassment',
      'Defamation / Reputation Damage',
      'Uncategorized Citizen Rights Matter',
    ],
    recommendedAuthority: 'District Legal Services Authority (DLSA) / National Green Tribunal (NGT) / Lok Adalat',
    helpline: '15100 (NALSA Citizen Helpline)',
    portalUrl: 'https://nalsa.gov.in',
    nextStepSummary:
      'Describe your situation in full. Our desk will route your matter to the suitable District Legal Services Authority or administrative body.',
    actionChecklist: [
      'Organize a chronological summary of events with supporting documents.',
      'Reach out to your local District Court DLSA front office for free initial counseling.',
      'Explore pre-litigation settlement through Lok Adalat for quick, stamp-duty-free remedies.',
    ],
  },
};

export const LEGAL_TOPICS: LegalTopic[] = [
  {
    id: 'topic-consumer',
    category: 'Consumer Rights',
    title: 'Consumer Rights & Protection Against Unfair Practices',
    shortDescription:
      'Understand your 6 fundamental rights as a buyer, product liability, 30-day refunds, and how to file on e-Daakhil without a lawyer.',
    fullExplanation:
      'Under the Consumer Protection Act 2019, every citizen who buys goods or hires services has enforceable legal rights. This includes protection against hazardous goods, complete information about quality and price, access to competitive choices, right to be heard before consumer forums, and right to seek redressal against unfair trade practices or misleading advertisements.',
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
      'Call the National Consumer Helpline at 1915 or send a WhatsApp to 8800001915.',
      'Register on consumerhelpline.gov.in or file a formal case on e-Daakhil (edaakhil.nic.in).',
      'Claims up to ₹50 Lakhs are heard at the District Consumer Commission with minimal filing fee.',
    ],
    recommendedAuthority: 'District Consumer Disputes Redressal Commission',
    officialPortal: 'https://edaakhil.nic.in',
    helpline: '1915',
    iconName: 'ShoppingBag',
  },
  {
    id: 'topic-cyber',
    category: 'Cybercrime',
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
    officialPortal: 'https://cybercrime.gov.in',
    helpline: '1930',
    iconName: 'ShieldAlert',
  },
  {
    id: 'topic-women',
    category: "Women's Rights",
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
    officialPortal: 'http://ncw.nic.in',
    helpline: '181 / 7827170170',
    iconName: 'HeartHandshake',
  },
  {
    id: 'topic-labour',
    category: 'Labour/Employment',
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
    officialPortal: 'https://shramsuvidha.gov.in',
    helpline: '14434',
    iconName: 'Briefcase',
  },
  {
    id: 'topic-housing',
    category: 'Housing/Tenancy',
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
    officialPortal: 'https://mohua.gov.in',
    helpline: '15100',
    iconName: 'Home',
  },
  {
    id: 'topic-police',
    category: 'Criminal Matter',
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
    officialPortal: 'https://nhrc.nic.in',
    helpline: '112 / 14433 (NHRC)',
    iconName: 'Scale',
  },
  {
    id: 'topic-rti',
    category: 'Government Service',
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
    officialPortal: 'https://rtionline.gov.in',
    helpline: '011-26183027 (CIC)',
    iconName: 'FileText',
  },
  {
    id: 'topic-students',
    category: 'Education/Student Rights',
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
    officialPortal: 'https://samadhan.ugc.ac.in',
    helpline: '1800-180-5522',
    iconName: 'GraduationCap',
  },
  {
    id: 'topic-seniors',
    category: 'Senior Citizen Rights',
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
    officialPortal: 'https://socialjustice.gov.in',
    helpline: '14567 (Elderline)',
    iconName: 'Users',
  },
];

export const LEGAL_AID_SERVICES: LegalAidService[] = [
  {
    id: 'aid-nalsa',
    name: 'National Legal Services Authority (NALSA)',
    shortName: 'NALSA',
    type: 'Statutory Body',
    description:
      'Apex statutory body established under the Legal Services Authorities Act, 1987 to provide free, competent legal services to weaker sections and organize Lok Adalats for amicable settlement.',
    eligibility:
      'Women & Children, SC/ST members, Industrial workmen, Persons with disabilities, Victims of trafficking/disaster, Persons in custody, and citizens with annual income below statutory limits (₹3 Lakhs in most states).',
    contactNumber: '15100 (National Legal Aid Toll-Free)',
    website: 'https://nalsa.gov.in',
    address: 'B-Block, Additional Office Complex, Supreme Court of India, New Delhi',
    servicesOffered: [
      'Free advocate assignment for Supreme Court, High Courts, and District Courts',
      'Payment of court fees, process fees, and advocate honorarium',
      'Preparation of petitions, legal notices, appeals, and paper books',
      'Pre-litigation mediation and Lok Adalat dispute settlement',
    ],
    charges: '100% Free',
  },
  {
    id: 'aid-dlsa',
    name: 'District Legal Services Authority (DLSA)',
    shortName: 'DLSA Front Offices',
    type: 'Statutory Body',
    description:
      'Functional front offices situated inside every District Court complex in India, staffed by Legal Aid Defense Counsel System (LADCS) lawyers and Para-Legal Volunteers (PLVs).',
    eligibility:
      'All eligible citizens under Section 12 of the Legal Services Authorities Act, including any woman, child, or undertrial prisoner.',
    contactNumber: '15100 / Local District Court Office',
    website: 'https://nalsa.gov.in',
    address: 'Present at every District Court Complex across all 750+ districts of India',
    servicesOffered: [
      'Walk-in legal counseling and guidance',
      'Drafting of applications, bail bonds, and affidavits',
      'Assigning panel advocates for criminal defense and civil suits',
      'Assistance in filing Domestic Violence DIR reports',
    ],
    charges: '100% Free',
  },
  {
    id: 'aid-telelaw',
    name: 'Tele-Law: Reaching the Unreached',
    shortName: 'Tele-Law Scheme',
    type: 'Government Scheme',
    description:
      'Pioneering initiative by the Department of Justice and Ministry of Law & Justice connecting citizens directly to panel lawyers via video conferencing and telephone at Common Service Centres (CSCs).',
    eligibility: 'Free for Section 12 beneficiaries; nominal fee of ₹30 for general category citizens.',
    contactNumber: '14999 (Tele-Law Helpline)',
    website: 'https://www.tele-law.in',
    address: 'Available at 4,00,000+ Gram Panchayat Common Service Centres (CSCs)',
    servicesOffered: [
      'Pre-litigation legal advice via video conference',
      'Advice in local regional languages',
      'Documentation review and expert guidance on government schemes',
      'Seamless referral to DLSA if formal litigation is needed',
    ],
    charges: 'Free for Eligible Persons',
  },
  {
    id: 'aid-nyayabandhu',
    name: 'Nyaya Bandhu (Pro Bono Legal Services)',
    shortName: 'Nyaya Bandhu',
    type: 'Government Scheme',
    description:
      'Platform created by the Department of Justice to link practicing advocates willing to offer pro bono legal representation directly with registered marginalized litigants.',
    eligibility: 'Citizens qualifying for legal aid under Section 12 of LSA Act.',
    contactNumber: '011-23383381',
    website: 'https://www.probono-doj.in',
    address: 'Department of Justice, Jaisalmer House, New Delhi',
    servicesOffered: [
      'Direct pairing with seasoned High Court and Supreme Court pro bono advocates',
      'Dedicated mobile app for tracking case representation',
      'Legal drafting and courtroom argument support',
    ],
    charges: '100% Free',
  },
  {
    id: 'aid-sakhi',
    name: 'Sakhi One Stop Centre (OSC)',
    shortName: 'Sakhi Centres',
    type: 'Emergency Cell',
    description:
      'Centrally sponsored initiative under Ministry of Women & Child Development providing integrated support (medical aid, police assistance, psycho-social counseling, legal aid, and temporary shelter) to women affected by violence.',
    eligibility: 'Any woman facing violence, domestic cruelty, sexual assault, or emotional distress.',
    contactNumber: '181 (24x7 Women Helpline)',
    website: 'https://wcd.nic.in',
    address: 'Over 700 One Stop Centres established across all Indian districts',
    servicesOffered: [
      'Emergency medical examination and treatment',
      'Filing of police complaints and FIR assistance on premises',
      'Immediate temporary shelter for up to 5 days',
      'Direct interface with DLSA legal aid lawyers',
    ],
    charges: '100% Free',
  },
  {
    id: 'aid-edaakhil',
    name: 'e-Daakhil Portal for Consumer Grievances',
    shortName: 'e-Daakhil',
    type: 'Tribunal',
    description:
      'Digital filing platform launched by the National Consumer Disputes Redressal Commission (NCDRC) allowing citizens to file consumer complaints online without visiting physical courts.',
    eligibility: 'Any consumer aggrieved by defective products, fraudulent trade practices, or service deficiency.',
    contactNumber: '1915 (Consumer Helpline)',
    website: 'https://edaakhil.nic.in',
    address: 'National Consumer Disputes Redressal Commission, New Delhi',
    servicesOffered: [
      'Online case registration before District, State, and National Consumer Commissions',
      'E-payment of nominal court fees',
      'Virtual hearing notifications and case status tracking',
      'No advocate mandatory; citizens can argue their own cases',
    ],
    charges: 'Nominal Fee',
  },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-112',
    number: '112',
    title: 'National All-in-One Emergency Hotline',
    subtitle: 'Police, Fire, Medical, Disaster Rapid Response',
    availability: '24x7 Toll Free · All Network Operators',
    applicableFor: 'Immediate danger to life, assault, theft, domestic violence, road accidents',
    icon: 'PhoneCall',
    actionGuide: [
      'Stay calm and clearly state your exact physical location and landmark.',
      'Specify the nature of emergency: Police, Ambulance, or Fire.',
      'Keep the line open; GPS triangulation is dispatched automatically.',
    ],
  },
  {
    id: 'em-1930',
    number: '1930',
    title: 'Cyber Financial Fraud Emergency',
    subtitle: 'Citizen Financial Cyber Fraud Reporting System',
    availability: '24x7 Toll Free · Priority Golden Hour Call Line',
    applicableFor: 'Unauthorized UPI, debit card, net banking, or fraudulent account transfers',
    icon: 'ShieldAlert',
    actionGuide: [
      'Call IMMEDIATELY within 2 hours of the fraudulent transaction.',
      'Keep bank name, account number, debit card digits, and transaction ID ready.',
      'Portal alerts nodal banking officers to freeze transit funds before scammer withdrawal.',
    ],
  },
  {
    id: 'em-181',
    number: '181',
    title: 'Women in Distress Helpline',
    subtitle: 'Ministry of Women and Child Development',
    availability: '24x7 Toll Free · Confidential Counseling & Rescue',
    applicableFor: 'Domestic violence, sexual harassment, stalking, dowry cruelty, rescue support',
    icon: 'HeartHandshake',
    actionGuide: [
      'Connects instantly with trained female counselors and Sakhi One Stop Centre teams.',
      'Can dispatch emergency police van or mobile medical response team to your location.',
      'Arranges immediate safe transit and temporary shelter accommodation.',
    ],
  },
  {
    id: 'em-15100',
    number: '15100',
    title: 'NALSA Free Legal Aid Toll-Free Helpline',
    subtitle: 'National Legal Services Authority Legal Desk',
    availability: 'Mon - Sat (9:30 AM - 6:00 PM) · Free Legal Guidance',
    applicableFor: 'Free lawyer requirement, bail queries, family dispute mediation, court case aid',
    icon: 'Scale',
    actionGuide: [
      'Speak to a legal expert who evaluates your matter and grounds for free representation.',
      'Get routed directly to your local District Legal Services Authority (DLSA) front office.',
      'Receive guidance on documentation and eligibility under Section 12 of LSA Act.',
    ],
  },
  {
    id: 'em-1098',
    number: '1098',
    title: 'Childline Emergency Service',
    subtitle: 'National Child Protection Emergency Service',
    availability: '24x7 Toll Free · Emergency Outreach for Children',
    applicableFor: 'Child abuse, child labour, child marriage, runaway or abandoned children',
    icon: 'Users',
    actionGuide: [
      'Report any child in distress or facing danger/exploitation.',
      'Anonymous reporting is supported; field units are dispatched within 60 minutes.',
      'Coordinates with Child Welfare Committees (CWC) and District Child Protection Units.',
    ],
  },
  {
    id: 'em-14567',
    number: '14567',
    title: 'Elderline: Senior Citizen Helpline',
    subtitle: 'Ministry of Social Justice and Empowerment',
    availability: '8:00 AM to 8:00 PM Daily · Dedicated to Senior Citizens',
    applicableFor: 'Elder abuse, abandonment by children, maintenance disputes, emotional support',
    icon: 'Heart',
    actionGuide: [
      'Field officers assist senior citizens in filing petitions under Senior Citizens Act 2007.',
      'Provides immediate emotional counseling, rescue from abandonment, and legal guidance.',
    ],
  },
  {
    id: 'em-1915',
    number: '1915',
    title: 'National Consumer Helpline (NCH)',
    subtitle: 'Department of Consumer Affairs',
    availability: 'Mon - Sat (8:00 AM - 8:00 PM) · Multi-lingual Support',
    applicableFor: 'Defective products, online shopping fraud, travel refund denial, warranty disputes',
    icon: 'ShoppingBag',
    actionGuide: [
      'Register consumer complaints directly against 1000+ converged companies.',
      'NCH directly contacts company grievance officers for out-of-court resolution.',
      'If unresolved, provides docket details for one-click e-Daakhil court filing.',
    ],
  },
];

export const LEGAL_GLOSSARY: LegalTermGlossary[] = [
  {
    term: 'Cognizable Offence',
    hindiTerm: 'संज्ञेय अपराध',
    simplifiedMeaning:
      'A serious offence (like theft, murder, rape) where police have the legal authority to arrest the accused without a court warrant and MUST register an FIR immediately.',
    practicalExample:
      'If someone snatches your phone or commits cyber financial theft, it is a cognizable offence.',
  },
  {
    term: 'Non-Cognizable Offence (NCR)',
    hindiTerm: 'असंज्ञेय अपराध',
    simplifiedMeaning:
      'A minor offence (like verbal abuse, simple hurt) where police cannot arrest without a Magistrate’s warrant or start an investigation without court permission.',
    practicalExample:
      'Police will record a Non-Cognizable Report (NCR) and direct you to the Magistrate instead of filing an FIR.',
  },
  {
    term: 'Zero FIR',
    hindiTerm: 'ज़ीरो एफआईआर',
    simplifiedMeaning:
      'An FIR that can be registered at ANY police station in India, regardless of where the incident happened. The station numbers it "0" and transfers it to the jurisdiction police station.',
    practicalExample:
      'If you travel from Mumbai to Delhi and face an incident, you can lodge a Zero FIR immediately in Delhi without traveling back.',
  },
  {
    term: 'Legal Notice',
    hindiTerm: 'कानूनी नोटिस',
    simplifiedMeaning:
      'A formal written communication sent to an opposing party informing them of your grievance, legal basis, and giving a deadline (usually 15 or 30 days) to rectify the issue before filing a court case.',
    practicalExample:
      'Sending a notice to a builder giving 15 days to deliver flat keys before moving to RERA.',
  },
  {
    term: 'Bail (Anticipatory vs Regular)',
    hindiTerm: 'ज़मानत',
    simplifiedMeaning:
      'Temporary release of an accused person awaiting trial. Anticipatory bail is obtained BEFORE arrest when arrest is feared; Regular bail is applied for AFTER being taken into custody.',
    practicalExample:
      'Section 438 CrPC / Sec 482 BNSS allows citizens fearing false arrest to approach the Sessions Court for advance protection.',
  },
  {
    term: 'Affidavit',
    hindiTerm: 'शपथ पत्र (हलफ़नामा)',
    simplifiedMeaning:
      'A written statement of facts confirmed by an oath or affirmation before an authorized notary or oath commissioner.',
    practicalExample:
      'Submitting a sworn declaration of lost documents or income certificate before an authority.',
  },
  {
    term: 'Sub-Judice',
    hindiTerm: 'न्यायाधीन',
    simplifiedMeaning:
      'A case or matter that is currently under trial or consideration before a court of law and pending final judgment.',
    practicalExample:
      'Matters that are sub-judice cannot be publicly adjudicated or interfered with by outside parties.',
  },
  {
    term: 'Vakalatnama',
    hindiTerm: 'वकालतनामा',
    simplifiedMeaning:
      'A written document by which a client formally authorizes an advocate to represent them and plead on their behalf in court.',
    practicalExample:
      'Signing a vakalatnama when a DLSA legal aid advocate is assigned to your case.',
  },
];

export const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Visakhapatnam'],
  'Assam': ['Baksa', 'Barpeta', 'Cachar', 'Darrang', 'Dibrugarh', 'Guwahati', 'Kamrup', 'Nagaon', 'Silchar'],
  'Bihar': ['Bhagalpur', 'Gaya', 'Muzaffarpur', 'Nalanda', 'Patna', 'Purnia', 'Rohtas', 'Vaishali'],
  'Delhi (NCT)': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'South Delhi', 'South West Delhi', 'West Delhi'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Rajkot', 'Surat', 'Vadodara'],
  'Haryana': ['Ambala', 'Faridabad', 'Gurugram', 'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Sonipat'],
  'Karnataka': ['Bengaluru Urban', 'Bengaluru Rural', 'Belagavi', 'Ballari', 'Dakshina Kannada', 'Hubballi-Dharwad', 'Mysuru', 'Tumakuru'],
  'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thiruvananthapuram', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Rewa', 'Sagar', 'Ujjain'],
  'Maharashtra': ['Ahmednagar', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Kolhapur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nashik', 'Pune', 'Thane'],
  'Odisha': ['Balasore', 'Bhadrak', 'Cuttack', 'Ganjam', 'Khordha (Bhubaneswar)', 'Puri', 'Sambalpur'],
  'Punjab': ['Amritsar', 'Bathinda', 'Jalandhar', 'Ludhiana', 'Mohali (SAS Nagar)', 'Patiala'],
  'Rajasthan': ['Ajmer', 'Alwar', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Vellore'],
  'Telangana': ['Hyderabad', 'Karimnagar', 'Khammam', 'Medchal-Malkajgiri', 'Nalgonda', 'Nizamabad', 'Warangal'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Ayodhya', 'Bareilly', 'Ghaziabad', 'Gorakhpur', 'Kanpur Nagar', 'Lucknow', 'Meerut', 'Noida (Gautam Buddha Nagar)', 'Varanasi'],
  'West Bengal': ['Birbhum', 'Darjeeling', 'Hooghly', 'Howrah', 'Kolkata', 'North 24 Parganas', 'Paschim Bardhaman', 'South 24 Parganas'],
  'Other States & UTs': ['Chandigarh', 'Goa', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Ladakh', 'Puducherry', 'Uttarakhand'],
};

export const INITIAL_DEMO_COMPLAINTS: Complaint[] = [
  {
    id: 'NYA-2026-104829',
    fullName: 'Sunita Sharma',
    mobileNumber: '9876543210',
    email: 'sunita.sharma@example.com',
    state: 'Delhi (NCT)',
    district: 'New Delhi',
    cityTown: 'Connaught Place',
    preferredLanguage: 'English',
    category: 'Consumer Rights',
    subcategory: 'E-commerce Delivery Failure / Refund Withheld',
    incidentDate: '2026-08-14',
    incidentLocation: 'Online E-commerce Platform',
    subject: 'Refusal of ₹42,999 refund for undelivered laptop',
    detailedDescription:
      'Ordered a laptop on a major e-commerce portal on August 10th. The courier marked it delivered on August 14th without delivering to my address or requesting an OTP. Customer support refused refund claiming package was delivered. Raised ticket #EC-98213.',
    amountInvolved: '₹42,999',
    oppositeParty: 'QuickCart Retail Pvt Ltd & SwiftLogistics',
    previousReferenceNo: 'TKT-EC-98213',
    evidenceFiles: [
      { id: 'f-1', name: 'Invoice_Aug10.pdf', size: '240 KB', type: 'application/pdf', category: 'Receipt' },
      { id: 'f-2', name: 'Delivery_Status_Screenshot.png', size: '1.2 MB', type: 'image/png', category: 'Screenshot' },
    ],
    consentGiven: true,
    status: 'Under Review',
    timelineStep: 'In Progress',
    createdAt: '2026-08-16T10:30:00Z',
    updatedAt: '2026-08-18T14:15:00Z',
    nextRecommendedStep:
      'Grievance forwarded to National Consumer Helpline (NCH Docket #NCH-2026-8812). If seller fails to refund within 7 working days, e-Daakhil filing docket will be finalized.',
    recommendedAuthority: 'National Consumer Helpline (1915) & District Consumer Forum',
    officialPortalUrl: 'https://consumerhelpline.gov.in',
    authorityHelpline: '1915',
    history: [
      {
        step: 'Complaint Submitted',
        status: 'Submitted',
        date: '2026-08-16 10:30 AM',
        title: 'Complaint Registered',
        description: 'Citizen registered grievance with payment transaction and order slips attached.',
        actor: 'Citizen Portal',
      },
      {
        step: 'In Progress',
        status: 'Under Review',
        date: '2026-08-17 11:00 AM',
        title: 'Review by Legal Assistance Desk',
        description: 'Verified invoice and non-delivery claim. Case categorized under Consumer Protection E-Commerce Rules 2020.',
        actor: 'Nyaya Sahaya Review Cell',
      },
      {
        step: 'In Progress',
        status: 'Under Review',
        date: '2026-08-18 02:15 PM',
        title: 'NCH Docket Dispatched',
        description: 'Notice of query sent to e-commerce nodal grievance officer requesting OTP delivery audit report.',
        actor: 'Case Officer V. Nair',
      },
    ],
  },
  {
    id: 'NYA-2026-449102',
    fullName: 'Rajesh Kumar Verma',
    mobileNumber: '9123456780',
    email: 'rajesh.verma@example.com',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    cityTown: 'Koramangala',
    preferredLanguage: 'English',
    category: 'Cybercrime',
    subcategory: 'UPI / Credit Card / Net Banking Financial Fraud',
    incidentDate: '2026-09-02',
    incidentLocation: 'Bengaluru (Online / Phone call)',
    subject: 'Phishing call pretending to be electricity board caused ₹65,000 unauthorized UPI debit',
    detailedDescription:
      'Received an urgent SMS warning power disconnection unless bill was verified via APK link. Called the number, clicked link, phone screen went blank and 3 unauthorized UPI debits of ₹25,000, ₹25,000, and ₹15,000 occurred to a merchant account.',
    amountInvolved: '₹65,000',
    oppositeParty: 'Unknown scammer (Number: +91-9812903821 / Beneficiary VPA: scammer@paytm)',
    previousReferenceNo: 'POL-CYB-2026-4819',
    evidenceFiles: [
      { id: 'f-3', name: 'Bank_Statement_Debits.pdf', size: '420 KB', type: 'application/pdf', category: 'PDF' },
      { id: 'f-4', name: 'SMS_Threat_Screenshot.jpg', size: '850 KB', type: 'image/jpeg', category: 'Screenshot' },
    ],
    consentGiven: true,
    status: 'Referred',
    timelineStep: 'Escalated',
    createdAt: '2026-09-02T15:20:00Z',
    updatedAt: '2026-09-04T09:00:00Z',
    nextRecommendedStep:
      'Golden hour alert initiated with 1930. Matter referred to Central Cyber Police station and beneficiary bank nodal officer for debit freeze.',
    recommendedAuthority: 'National Cyber Crime Reporting Portal / Karnataka Cyber Police Cell',
    officialPortalUrl: 'https://cybercrime.gov.in',
    authorityHelpline: '1930',
    history: [
      {
        step: 'Complaint Submitted',
        status: 'Submitted',
        date: '2026-09-02 03:20 PM',
        title: 'Emergency Cyber Grievance Registered',
        description: 'Reported unauthorized UPI transaction within 40 minutes of occurrence.',
        actor: 'Citizen Portal',
      },
      {
        step: 'In Progress',
        status: 'Under Review',
        date: '2026-09-02 03:45 PM',
        title: '1930 Integration Activated',
        description: 'Citizen guided to provide UTR numbers for inter-bank transaction freeze protocol.',
        actor: 'Cyber Response Desk',
      },
      {
        step: 'Escalated',
        status: 'Referred',
        date: '2026-09-04 09:00 AM',
        title: 'Escalated to Cyber Crime Cell',
        description: 'Formal reference dispatched to Cyber Police Station, Bengaluru under Section 66D IT Act.',
        actor: 'Sr. Legal Counselor A. Kulkarni',
      },
    ],
  },
  {
    id: 'NYA-2026-782390',
    fullName: 'Ananya Deshmukh',
    mobileNumber: '9988776655',
    email: 'ananya.deshmukh@example.com',
    state: 'Maharashtra',
    district: 'Pune',
    cityTown: 'Kothrud',
    preferredLanguage: 'Marathi',
    category: 'Housing/Tenancy',
    subcategory: 'Landlord Withholding Security Deposit Unreasonably',
    incidentDate: '2026-07-01',
    incidentLocation: 'Pune, Maharashtra',
    subject: 'Landlord refused ₹60,000 security deposit return after peaceful handover',
    detailedDescription:
      'Vacated 2BHK flat after completion of 11-month registered lease with 1 month notice. Video handover showed spotless condition. Landlord deducted ₹60,000 entire deposit citing fictional painting charges.',
    amountInvolved: '₹60,000',
    oppositeParty: 'Mr. Rameshwar Patil (Landlord)',
    previousReferenceNo: 'NOT-DLSA-2026-31',
    evidenceFiles: [
      { id: 'f-5', name: 'Registered_Lease_Agreement.pdf', size: '1.8 MB', type: 'application/pdf', category: 'PDF' },
      { id: 'f-6', name: 'Handover_Walkthrough_Video.mp4', size: '4.5 MB', type: 'video/mp4', category: 'Video' },
    ],
    consentGiven: true,
    status: 'Resolved',
    timelineStep: 'Resolved',
    createdAt: '2026-07-05T11:00:00Z',
    updatedAt: '2026-07-28T16:30:00Z',
    nextRecommendedStep:
      'Matter successfully resolved through DLSA Pre-Litigation Mediation. Mutual settlement signed; ₹52,000 refunded directly to citizen bank account.',
    recommendedAuthority: 'Pune District Legal Services Authority (DLSA) Mediation Centre',
    officialPortalUrl: 'https://nalsa.gov.in',
    authorityHelpline: '15100',
    history: [
      {
        step: 'Complaint Submitted',
        status: 'Submitted',
        date: '2026-07-05 11:00 AM',
        title: 'Complaint Registered',
        description: 'Tenancy deposit dispute registered with lease copy and handover proof.',
        actor: 'Citizen Portal',
      },
      {
        step: 'In Progress',
        status: 'Under Review',
        date: '2026-07-08 10:15 AM',
        title: 'Legal Notice Drafted',
        description: 'Formal legal demand notice prepared citing Model Tenancy Act principles.',
        actor: 'Nyaya Sahaya Legal Team',
      },
      {
        step: 'Escalated',
        status: 'Referred',
        date: '2026-07-15 02:00 PM',
        title: 'Referred to DLSA Mediation',
        description: 'Parties summoned before Pune District Court Pre-litigation Mediation Bench.',
        actor: 'DLSA Secretary',
      },
      {
        step: 'Resolved',
        status: 'Resolved',
        date: '2026-07-28 04:30 PM',
        title: 'Mutual Settlement Reached',
        description: 'Landlord agreed to return ₹52,000 after minor ₹8,000 deep cleaning adjustment. Case closed with settlement deed.',
        actor: 'DLSA Mediator Advocate Joshi',
      },
    ],
  },
];
