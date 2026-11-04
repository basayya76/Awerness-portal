# -*- coding: utf-8 -*-
import json

topics_data = {
  "English": {
    "topic-consumer": {
      "title": "Consumer Protection & Defective Goods/Services",
      "shortDescription": "Your statutory rights when you buy defective goods, face misleading advertisements, or suffer unfair trade practices.",
      "fullExplanation": "Under the Consumer Protection Act 2019, every Indian buyer is protected against deficiency in services, unfair contract terms, overcharging, and substandard goods. Whether you purchased from a local shop or an e-commerce platform, businesses are legally bound to deliver what they promised and cannot refuse refunds for deficient items or services.",
      "primaryLaw": "Consumer Protection Act, 2019 & E-Commerce Rules, 2020",
      "keyRights": [
        "Right to Safety: Protection against goods and services hazardous to life or property.",
        "Right to Information: Accurate facts on quantity, purity, potency, standard, and price.",
        "Right to Redressal: Compensation for defective goods, deficiency in service, or overpricing.",
        "Right against Misleading Ads: Celebrities and manufacturers face liability for false endorsements.",
        "Product Liability: Manufacturer and seller are liable for injury/damage caused by a defective product."
      ],
      "whatToDoIfViolated": [
        "Draft a formal written complaint with your order ID, bill, and specific grievance.",
        "Call the National Consumer Helpline at 1915 or send a WhatsApp to 8800001915.",
        "Register on consumerhelpline.gov.in or file a formal case on e-Daakhil (edaakhil.nic.in).",
        "Claims up to ₹50 Lakhs are heard at the District Consumer Commission with minimal filing fee."
      ],
      "recommendedAuthority": "District Consumer Disputes Redressal Commission",
      "helpline": "1915 (National Consumer Helpline)"
    },
    "topic-cyber": {
      "title": "Cyber Security, Digital Fraud & Online Harassment",
      "shortDescription": "How to recover frozen money within the 'Golden Hour', combat blackmail and fake loan apps, and report safely.",
      "fullExplanation": "Cybercrime affects millions through financial fraud, identity theft, unauthorized access, and cyber harassment. Under the Information Technology Act 2000 and Indian Penal Code / Bharatiya Nyaya Sanhita, unauthorized electronic access, phishing, and non-consensual sharing of intimate images are severe criminal offences punishable by rigorous imprisonment and fines.",
      "primaryLaw": "Information Technology Act, 2000 (Sec 43, 66, 67) & BNS",
      "keyRights": [
        "Golden Hour Freeze: Calling 1930 enables automated inter-bank holds on transiting funds.",
        "Right to Digital Privacy: Companies must protect your personal data with reasonable security.",
        "Right to Protection from Extortion: Blackmail via fake loan apps or morphed images is strictly punishable.",
        "Right to Anonymous Reporting: Women and children can report sexual content anonymously on the portal."
      ],
      "whatToDoIfViolated": [
        "Immediately dial 1930 within the first 2 hours of unauthorized bank debit.",
        "Collect transaction UTR numbers, account numbers, and unedited screenshot trails.",
        "Register an e-complaint on cybercrime.gov.in.",
        "Request your bank to initiate a chargeback and freeze corresponding beneficiary accounts."
      ],
      "recommendedAuthority": "Indian Cyber Crime Coordination Centre (I4C) / Local Cyber Cell",
      "helpline": "1930 (National Cyber Fraud Emergency)"
    },
    "topic-women": {
      "title": "Women's Safety, Dignity & Anti-Harassment Protections",
      "shortDescription": "Legal safeguards against domestic abuse, workplace harassment (POSH), zero-FIR rights, and unconditional free legal aid.",
      "fullExplanation": "Indian jurisprudence grants robust constitutional and statutory safeguards to women. This includes the right to a safe domestic household under PWDVA 2005, dignity at workplaces under the POSH Act 2013, 26 weeks paid maternity leave, right to register Zero FIR anywhere in India, and 100% free legal aid through NALSA irrespective of financial status.",
      "primaryLaw": "Protection of Women from Domestic Violence Act 2005 & POSH Act 2013",
      "keyRights": [
        "Zero FIR: A woman can lodge an FIR at ANY police station, regardless of territorial jurisdiction.",
        "Arrest Safeguards: A woman cannot be arrested before sunrise or after sunset without special magistrate orders, and only by a woman police officer.",
        "Right to Stridhan: All gifts, jewelry, and assets given before/during marriage belong exclusively to the woman.",
        "Workplace Protection: Any organization with 10+ employees must have an Internal Complaints Committee.",
        "Free Legal Aid: Absolute entitlement to free advocate, court fee exemption, and documentation under Sec 12 NALSA."
      ],
      "whatToDoIfViolated": [
        "Contact Sakhi One Stop Centre (OSC) or dial 181 for immediate medical, shelter, and legal support.",
        "For workplace matters, submit a written complaint to the ICC within 90 days.",
        "Approach the Protection Officer or District Legal Services Authority (DLSA) at the district court."
      ],
      "recommendedAuthority": "National Commission for Women / Sakhi OSC / DLSA",
      "helpline": "181 / 7827170170 (Women Helpline)"
    },
    "topic-labour": {
      "title": "Workers' Rights, Wage Protections & Wrongful Termination",
      "shortDescription": "Rules regarding timely salary release, gratuity entitlements, PF deposits, notice periods, and working hours limits.",
      "fullExplanation": "Employees and workmen in both formal and informal sectors are shielded by labor codes and acts. Employers are legally obligated to pay agreed wages on time, contribute matching provident fund (PF), provide safe and hygienic working premises, respect statutory notice periods, and disburse gratuity upon completion of 5 years of service.",
      "primaryLaw": "Code on Wages, Industrial Disputes Act & Payment of Gratuity Act",
      "keyRights": [
        "Timely Wage Payment: Salaries must be credited before the 7th or 10th of every calendar month.",
        "Full & Final Settlement: Employers must clear all undisputed dues within 2 working days of resignation/termination.",
        "Gratuity: Guaranteed 15 days wages per completed year of service after 5 continuous years.",
        "Prohibition of Unlawful Deductions: Arbitrary penalties cannot be subtracted from earnings."
      ],
      "whatToDoIfViolated": [
        "Send a formal demand letter via registered post and email to management.",
        "File a complaint on the Shram Suvidha portal (shramsuvidha.gov.in) or Samadhan portal.",
        "Approach the District Labour Conciliation Officer for conciliation proceedings.",
        "Lodge an EPF grievance at epfigms.gov.in if employee PF was deducted but not remitted to EPFO."
      ],
      "recommendedAuthority": "Office of the Labour Commissioner / EPFO",
      "helpline": "14434 (Ministry of Labour Helpline)"
    },
    "topic-housing": {
      "title": "Tenant & Landlord Rights: Deposits, Evictions & Amenities",
      "shortDescription": "Protection against unlawful eviction, caps on security deposits, preservation of electricity and water amenities.",
      "fullExplanation": "Rental relationships are governed by the Model Tenancy Act and State Rent Control Acts. Landlords cannot arbitrarily enter premises without 24-hour notice, cannot cut off water or electricity to coerce vacating, and must refund security deposits promptly upon lease completion after reasonable wear and tear adjustments.",
      "primaryLaw": "Model Tenancy Act & State Rent Control Legislations",
      "keyRights": [
        "Security Deposit Cap: Capped at maximum 2 months rent for residential and 1 month for commercial premises under modern guidelines.",
        "Essential Amenities Protection: Cutting electricity or water supply is a cognizable legal violation.",
        "Notice Before Entry: Landlord must give 24-hour prior notice to enter rented premises for inspection.",
        "Protection from Forceful Eviction: Eviction can only be executed through due legal process and court order."
      ],
      "whatToDoIfViolated": [
        "If amenities are cut off, report to local police immediately or approach the Rent Authority.",
        "Send a legal notice for wrongful withholding of security deposit.",
        "File a petition before the Rent Court or approach DLSA mediation."
      ],
      "recommendedAuthority": "Rent Authority / Rent Court / Sub-Divisional Magistrate",
      "helpline": "15100 (DLSA Legal Services Helpline)"
    },
    "topic-police": {
      "title": "Citizen Rights During Police Interaction & Arrest",
      "shortDescription": "Crucial Supreme Court DK Basu guidelines: rights upon arrest, zero FIR, grounds of arrest, and 24-hour magistrate rule.",
      "fullExplanation": "Every citizen has fundamental liberties protected by Article 21 and 22 of the Constitution. The landmark Supreme Court ruling in D.K. Basu v. State of West Bengal and Section 41-50 of CrPC / Bharatiya Nagarik Suraksha Sanhita establish mandatory rules that every police officer must strictly follow during detention or arrest.",
      "primaryLaw": "Constitution of India (Art 21, 22) & CrPC / BNSS",
      "keyRights": [
        "Right to Know Grounds of Arrest: Police must inform you immediately of the specific offence and reason.",
        "Right to Legal Counsel: You have the right to consult and be defended by a lawyer of your choice.",
        "Right to Inform Family: Police must notify one friend or relative within 8-12 hours of arrest.",
        "Mandatory 24-Hour Rule: Arrested person must be produced before the nearest Judicial Magistrate within 24 hours.",
        "Right to Medical Examination: You can demand an independent medical checkup at the time of arrest and every 48 hours in custody.",
        "Arrest Memo: Police must prepare a formal memo of arrest signed by at least one witness and the arrestee."
      ],
      "whatToDoIfViolated": [
        "Demand to see the police officer’s official name badge and identification.",
        "Inform family/friends immediately and disclose the exact police station location.",
        "Request the duty counsel provided by the Legal Aid Defense Counsel System (LADCS).",
        "If torture or illegal detention occurred, report directly to the Magistrate upon first production."
      ],
      "recommendedAuthority": "Judicial Magistrate / State Human Rights Commission (SHRC) / SP Office",
      "helpline": "112 / 14433 (NHRC Human Rights Helpline)"
    },
    "topic-rti": {
      "title": "Right to Information (RTI): Demanding Accountability",
      "shortDescription": "How to file a ₹10 RTI application, statutory 30-day response mandates, and appealing to Information Commissions.",
      "fullExplanation": "The Right to Information Act 2005 empowers every Indian citizen to question government departments, inspect public works, obtain certified copies of official documents, and demand transparency. Public Information Officers (PIOs) are legally bound to reply within 30 days, or 48 hours if the matter involves life and liberty.",
      "primaryLaw": "Right to Information Act, 2005",
      "keyRights": [
        "30-Day Mandatory Reply: Information must be supplied within 30 calendar days.",
        "Life and Liberty Rule: Urgent information concerning life/liberty must be provided within 48 hours.",
        "Affordable Access: Central RTI application fee is just ₹10 (free for Below Poverty Line citizens).",
        "Penalty on Errant Officers: PIOs face personal fines of ₹250 per day (up to ₹25,000) for unjustified delays."
      ],
      "whatToDoIfViolated": [
        "File First Appeal within 30 days of deadline expiry before the First Appellate Authority (FAA).",
        "If First Appeal is ignored or rejected, file Second Appeal with the Central or State Information Commission."
      ],
      "recommendedAuthority": "Central Information Commission (CIC) / State Information Commissions",
      "helpline": "011-26183027 (Central Information Commission)"
    },
    "topic-students": {
      "title": "Student Rights: Anti-Ragging, Fee Refunds & Documents",
      "shortDescription": "UGC guidelines on mandatory fee refunds, strict prohibition of holding original certificates, and zero-tolerance anti-ragging.",
      "fullExplanation": "Students and parents are protected against predatory practices by educational institutions. The University Grants Commission (UGC) and AICTE mandate that universities cannot withhold original certificates under any pretext, must refund fees if admission is withdrawn within prescribed periods, and must maintain 24x7 anti-ragging vigilance.",
      "primaryLaw": "UGC Fee Refund Norms & Anti-Ragging Regulations 2009",
      "keyRights": [
        "Original Documents: Colleges have NO legal right to retain original marksheets or certificates.",
        "Pro-Rata Fee Refund: Tiered refund policies protect students who switch colleges during counselling.",
        "Anti-Ragging Protection: Ragging is a criminal offence; institutions face derecognition for negligence.",
        "Right to Grievance Redressal: Every higher education institution must have a Student Grievance Redressal Committee (SGRC)."
      ],
      "whatToDoIfViolated": [
        "Lodge complaint on UGC e-Samadhan portal (samadhan.ugc.ac.in).",
        "For ragging incidents, call the 24x7 toll-free helpline at 1800-180-5522 immediately.",
        "Approach the District Consumer Forum for arbitrary fee forfeiture."
      ],
      "recommendedAuthority": "UGC e-Samadhan / National Anti-Ragging Cell",
      "helpline": "1800-180-5522 (National Anti-Ragging Toll Free)"
    },
    "topic-seniors": {
      "title": "Senior Citizen Protection & Maintenance Rights",
      "shortDescription": "Maintenance Tribunal orders under SDM, voiding gift deeds if children abandon parents, and healthcare priorities.",
      "fullExplanation": "The Maintenance and Welfare of Parents and Senior Citizens Act 2007 provides a fast-track, lawyer-free mechanism for parents and senior citizens (aged 60+) to demand monthly maintenance from children or legal heirs. The law empowers tribunals to evict abusive children and even cancel property transfers.",
      "primaryLaw": "Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
      "keyRights": [
        "Right to Monthly Maintenance: Children/heirs are legally bound to provide food, clothing, shelter, and medical care.",
        "Cancellation of Property Transfer: Under Section 23, property transferred to children can be revoked if they neglect parents.",
        "Summary Procedure: Tribunals headed by SDM decide cases within 90 days without complex civil court delays.",
        "Elder Abuse Penalty: Abandonment of senior citizens is a cognizable criminal offence."
      ],
      "whatToDoIfViolated": [
        "Call Elderline at 14567 for free counseling and field intervention.",
        "File an application before the Sub-Divisional Magistrate (SDM) / Maintenance Tribunal.",
        "Seek assistance from the District Social Welfare Officer or DLSA front office."
      ],
      "recommendedAuthority": "SDM Maintenance Tribunal / Social Welfare Department",
      "helpline": "14567 (Elderline National Senior Helpline)"
    }
  }
}

print("Base English loaded.")
