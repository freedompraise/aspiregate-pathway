/** AspireGate Services Limited — study destinations data */

export const DESTINATION_TAGS = [
  "pr-friendly",
  "stem",
  "low-tuition",
  "english-speaking",
  "business",
  "fast-masters",
  "europe",
  "skilled-migration",
] as const;

export type DestinationTag = (typeof DESTINATION_TAGS)[number];

export type Destination = {
  name: string;
  slug: string;
  postStudyStrength: string;
  settlementOutlook: string;
  bestFor: string;
  strengths: string[];
  shortfalls: string[];
  postStudyOptions: string;
  settlementExplanation: string;
  bestFitStudentProfile: string;
  tags: DestinationTag[];
  /** For side-by-side comparison row */
  tuitionLevel: string;
  languageConsiderations: string;
  /** One line for cards and quiz */
  keyCaution: string;
  /** Opening line — careful, non-guarantee language */
  whyStrongOption: string;
  whenNotIdeal: string;
};

export const destinations: Destination[] = [
  {
    name: "United Kingdom",
    slug: "uk",
    postStudyStrength: "Good, but changing",
    settlementOutlook: "Moderate",
    bestFor: "Fast master’s, global recognition, career exposure",
    strengths: [
      "Respected universities and strong global recognition.",
      "Many one-year master’s degrees and English-language education.",
      "Large international labour market and familiar route for many families.",
    ],
    shortfalls: [
      "High total cost: tuition, living costs, visa fees, health surcharge, and proof of funds.",
      "Long-term settlement usually depends on securing eligible skilled employment after graduation.",
    ],
    postStudyOptions:
      "The Graduate visa may allow eligible graduates to stay after study. Published settings describe 2 years if the application is made on or before 31 December 2026, 18 months if made on or after 1 January 2027, and 3 years for PhD or doctoral graduates. Many students then aim to move into a Skilled Worker route. Indefinite leave to remain for people on a Skilled Worker, T2, or Tier 2 visa is generally described as a 5-year qualifying period, subject to eligibility and the rules in force when you apply.",
    settlementExplanation:
      "Moderate overall outlook for settlement, depending on your profile, funding, and immigration rules in force when you apply. Stronger when you can secure sponsored skilled work after graduation and plan visa steps carefully.",
    bestFitStudentProfile:
      "Students who want a fast, respected qualification, can fund the journey realistically, and have clear career plans toward skilled employment.",
    tags: ["english-speaking", "business", "stem", "fast-masters", "europe"],
    tuitionLevel: "Typically high overall (tuition, living costs, visa-related fees, and proof of funds).",
    languageConsiderations: "Wide range of programmes taught in English; daily life and work are primarily English.",
    keyCaution: "Total cost and proof-of-funds requirements can be substantial; settlement usually needs a skilled-employment pathway.",
    whyStrongOption:
      "May be a strong option if you want a shorter master’s timeline, global recognition, and English-medium study with post-study options for eligible graduates under current rules.",
    whenNotIdeal:
      "May be less ideal if long-term settlement is your main goal without a realistic plan for skilled work after study, or if the full cost profile is beyond your funding and sponsorship situation.",
  },
  {
    name: "Canada",
    slug: "canada",
    postStudyStrength: "Very strong",
    settlementOutlook: "Strong",
    bestFor: "Students seeking PR-friendly pathways",
    strengths: [
      "Strong education system and multicultural society.",
      "Structured post-study work options for eligible programmes and institutions.",
      "Study, Canadian work experience, and permanent residence pathways can connect for eligible profiles.",
    ],
    shortfalls: [
      "More selective rules: school and programme choice must qualify for post-study work benefits.",
      "Proof of funds, programme fit, and a clear long-term strategy matter from day one.",
    ],
    postStudyOptions:
      "Eligible graduates from certain designated learning institutions may apply for a Post-Graduation Work Permit. Canadian work experience after graduation may help a graduate qualify for permanent residence. Express Entry manages skilled immigration applications, including the Canadian Experience Class for skilled workers with Canadian work experience. School, programme, and rules at the time you apply all matter.",
    settlementExplanation:
      "Generally favourable settlement outlook for eligible profiles who choose the right school, course, province, and career path and meet requirements when they apply.",
    bestFitStudentProfile:
      "Students who want PR pathways alongside study, have strong funds, employable courses, and a long-term career plan.",
    tags: ["pr-friendly", "stem", "english-speaking", "skilled-migration", "business"],
    tuitionLevel: "Varies by institution and programme; overall study and living costs still require solid funding.",
    languageConsiderations: "English-medium study is widely available; French can matter in some provinces for work and integration.",
    keyCaution: "Not every programme or institution qualifies for post-study work — programme choice must align with immigration intent.",
    whyStrongOption:
      "May be a strong option if you want post-study work aligned with study and a structured pathway to explore permanent residence when you meet eligibility requirements.",
    whenNotIdeal:
      "May be less ideal if funds are very limited, your programme or institution does not support your work or immigration goals, or you are unwilling to plan province, course, and career together from the start.",
  },
  {
    name: "United States",
    slug: "usa",
    postStudyStrength: "Strong for top/STEM students",
    settlementOutlook: "Competitive",
    bestFor: "Research, STEM, scholarships, global careers",
    strengths: [
      "World-leading universities, research, and innovation hubs.",
      "Scholarship and pathway options in STEM, business, law, medicine, and technology.",
      "Strong global career exposure for competitive applicants.",
    ],
    shortfalls: [
      "Can be very expensive depending on school and funding.",
      "Visa interviews require a clear academic plan, funding story, and credible intent.",
      "Permanent residence is often employer-driven and competitive compared with some other countries.",
    ],
    postStudyOptions:
      "F-1 students may use Optional Practical Training for temporary employment directly related to their major. STEM graduates may also qualify for a 24-month STEM OPT extension under current rules. Permanent residence usually needs an eligible pathway such as employer sponsorship, an employment-based category, family sponsorship, or another qualifying route.",
    settlementExplanation:
      "Settlement outlook is competitive — often moderate to difficult compared with Canada or Germany. It is stronger for highly skilled and STEM-oriented profiles who can secure an employer-backed or other qualifying pathway.",
    bestFitStudentProfile:
      "High-achieving students with scholarship potential, STEM or research interests, or ambitions in global industries.",
    tags: ["stem", "english-speaking", "business", "skilled-migration"],
    tuitionLevel: "Often high at many institutions; scholarships and aid vary widely by profile and programme.",
    languageConsiderations: "Study and professional life are primarily English for most international students.",
    keyCaution: "Costs and visa scrutiny can be intense; long-term stay is not automatic and depends on future eligibility.",
    whyStrongOption:
      "May be a strong option if you want research depth, STEM strength, and global employers that recruit from US campuses — with realistic funding and visa preparation.",
    whenNotIdeal:
      "May be less ideal if you need predictable, lower-cost study, or if long-term settlement without employer sponsorship is your primary expectation.",
  },
  {
    name: "Ireland",
    slug: "ireland",
    postStudyStrength: "Good",
    settlementOutlook: "Moderate",
    bestFor: "Tech, business, pharma, English-speaking EU route",
    strengths: [
      "English-language education with access to the EU environment.",
      "Strong links to multinationals in technology, finance, and pharmaceuticals.",
      "Attractive for students who want Europe without studying in another language for the degree.",
    ],
    shortfalls: [
      "Smaller labour market than the UK, Canada, or USA.",
      "Housing can be expensive and competitive, especially in Dublin.",
    ],
    postStudyOptions:
      "Ireland’s Third Level Graduate Programme may allow eligible graduates to stay after study. Stamp 1G allows graduates to look for employment, and master’s graduates may receive a further 12 months subject to conditions. Long-term residency is not automatic after five years of living in Ireland: applicants generally need at least 60 months of registration based on employment permits.",
    settlementExplanation:
      "Moderate settlement outlook. It is stronger if you move from graduate permission into an employment permit and maintain qualifying residence.",
    bestFitStudentProfile:
      "Students who want an English-speaking EU country with strong tech, finance, and pharma links and realistic job-search plans.",
    tags: ["english-speaking", "europe", "business", "stem", "fast-masters"],
    tuitionLevel: "Moderate to high for many programmes; living costs in major cities can add pressure.",
    languageConsiderations: "Degree programmes are widely available in English; Irish employers often use English in multinational sectors.",
    keyCaution: "Smaller job market and housing pressure in Dublin can affect how quickly you convert study into stable work.",
    whyStrongOption:
      "May be a strong option if you want English-medium study inside the EU and access to tech, finance, and pharma employers — with a clear plan for internships and job search.",
    whenNotIdeal:
      "May be less ideal if you assume automatic long-term residence after study, or if you need a very large labour market from day one.",
  },
  {
    name: "Germany",
    slug: "germany",
    postStudyStrength: "Strong",
    settlementOutlook: "Strong",
    bestFor: "Low tuition, STEM, engineering, technical careers",
    strengths: [
      "Excellent for engineering, IT, manufacturing, research, and sciences.",
      "Many public universities have low or no tuition compared with several other major destinations.",
      "Skilled-employment residence routes after qualified work can support long-term planning for eligible profiles.",
    ],
    shortfalls: [
      "Admission standards and course matching expectations can be strict.",
      "German language skills often matter for jobs and daily life even when the degree is in English.",
    ],
    postStudyOptions:
      "Non-EU graduates of German higher education institutions may apply for a residence permit of up to 18 months to look for qualified employment. During that period graduates may take any type of job, but the permit is not renewable. Longer-term stay usually means moving into a skilled-worker residence route or EU Blue Card after qualified employment, then a settlement permit if requirements are met.",
    settlementExplanation:
      "Generally strong settlement outlook for students who complete employable courses, integrate, and build German language skills over time, subject to eligibility.",
    bestFitStudentProfile:
      "Academically strong, budget-conscious students interested in technical or skilled careers who are willing to learn German over time.",
    tags: ["low-tuition", "stem", "europe", "pr-friendly", "skilled-migration"],
    tuitionLevel: "Often lower at public universities (programme-dependent); living costs and blocked accounts still matter.",
    languageConsiderations: "English-taught degrees exist; German is often important for internships, jobs, and integration.",
    keyCaution: "Admission rigour and language expectations can surprise students who only prepare academically in English.",
    whyStrongOption:
      "May be a strong option if you want affordable public-university routes, STEM depth, and a skilled-employment-led path to longer-term residence when you qualify.",
    whenNotIdeal:
      "May be less ideal if you are unwilling to invest in German for work and life, or if your academic background does not meet strict admission and course-fit expectations.",
  },
  {
    name: "Australia",
    slug: "australia",
    postStudyStrength: "Good, but rules are tighter",
    settlementOutlook: "Strong if occupation fits",
    bestFor: "Lifestyle, employability, skilled migration",
    strengths: [
      "Respected universities and a strong international student experience.",
      "Temporary graduate work routes for eligible students under current settings.",
      "Skilled migration pathways where your occupation and course choices align with demand lists.",
    ],
    shortfalls: [
      "High tuition, living costs, visa fees, and proof-of-funds requirements.",
      "Visa settings have tightened; course and institution choice must align with rules and skilled lists.",
    ],
    postStudyOptions:
      "The Temporary Graduate visa (subclass 485) may allow eligible international students to live, study, and work temporarily after completing their studies. Permanent skilled visas are for people who fill skill shortages and, if granted, confer permanent residence. Outcomes depend on occupation, points, and the rules in force when you apply.",
    settlementExplanation:
      "Settlement outlook can be strong when your course and occupation align with skilled migration needs; outcomes depend on your profile and current immigration settings.",
    bestFitStudentProfile:
      "Students who want a strong English-speaking destination with work exposure and possible skilled migration, and who choose courses aligned with demand.",
    tags: ["english-speaking", "stem", "skilled-migration", "pr-friendly", "business"],
    tuitionLevel: "Typically high tuition and living costs; proof-of-funds requirements are substantial.",
    languageConsiderations: "Study and most professional settings use English for international students.",
    keyCaution: "Rules and occupation lists change — course choice must be checked against your migration intent, not only rankings.",
    whyStrongOption:
      "May be a strong option if you want English-medium study, graduate work rights for eligible students, and a skilled migration story built around occupation demand.",
    whenNotIdeal:
      "May be less ideal if your course does not align with skilled lists you care about, or if the funding requirement is beyond what you can document and sustain.",
  },
  {
    name: "France",
    slug: "france",
    postStudyStrength: "Good",
    settlementOutlook: "Moderate to strong",
    bestFor: "Affordable Europe, business, arts, hospitality, engineering",
    strengths: [
      "Affordable public education and strong business and engineering schools.",
      "Cultural exposure and access to the wider European market.",
      "Can be less saturated than some Anglo destinations for certain profiles.",
    ],
    shortfalls: [
      "French language ability is often important for internships, jobs, and integration even when programmes are in English.",
    ],
    postStudyOptions:
      "Eligible graduates who completed qualifying French higher education diplomas may access a job-seeker or new-business-creator residence route. An EU long-term resident card may be available after at least 5 years of regular, uninterrupted residence, alongside resources, health coverage, and integration conditions.",
    settlementExplanation:
      "Moderate to strong outlook when you learn French, secure skilled work, and maintain continuous legal residence according to current rules.",
    bestFitStudentProfile:
      "Students who want affordable European education, business or creative exposure, and are willing to invest in French language skills.",
    tags: ["low-tuition", "europe", "business", "stem"],
    tuitionLevel: "Often relatively affordable at public institutions; Paris and private grandes écoles vary.",
    languageConsiderations: "English-taught programmes exist; French is often important for internships, jobs, and daily life.",
    keyCaution: "Career traction often depends on French proficiency even when your degree is delivered in English.",
    whyStrongOption:
      "May be a strong option if you want European exposure, business or creative strength, and a tuition profile that is often gentler than several Anglo destinations — with a plan to learn French.",
    whenNotIdeal:
      "May be less ideal if you want a fully English workplace and social life from day one without investing in French.",
  },
  {
    name: "United Arab Emirates",
    slug: "uae",
    postStudyStrength: "Limited traditional PR",
    settlementOutlook: "Limited, but strong long-term residence for eligible profiles",
    bestFor: "Safety, proximity, business, international campuses",
    strengths: [
      "International branch campuses and strong business exposure.",
      "Safety, modern infrastructure, and proximity for many regional students.",
      "Growing economy with finance, hospitality, technology, and entrepreneurship opportunities.",
    ],
    shortfalls: [
      "Not the strongest traditional permanent-residence story compared with Canada, Germany, or Australia.",
      "Long-term stay is usually linked to employment, business, investment, family, or special long-term visa categories.",
    ],
    postStudyOptions:
      "The Golden Visa is a long-term residence visa for eligible categories, allowing foreign talents to live, work, or study and access specific benefits. Outstanding students and top university graduates may qualify for 5- or 10-year categories depending on eligibility. Long-term stay is otherwise usually tied to employment, business, investment, or family sponsorship.",
    settlementExplanation:
      "Traditional permanent residence is limited. Long-term residence can still be realistic through employment, business, investment, family sponsorship, or a Golden Visa route if you meet the criteria.",
    bestFitStudentProfile:
      "Students prioritising safety, proximity, business exposure, and international education without relying on classic PR-first planning.",
    tags: ["business", "english-speaking"],
    tuitionLevel: "Varies widely by campus and partner university; living costs can be high in major cities.",
    languageConsiderations: "Many programmes are English-medium; Arabic can be useful for some roles and local integration.",
    keyCaution: "Long-term stay usually depends on visas tied to work, business, or special categories — not a classic PR ladder.",
    whyStrongOption:
      "May be a strong option if you want global campus networks, business intensity, and regional proximity — with a visa plan that matches employment or entrepreneurship goals.",
    whenNotIdeal:
      "May be less ideal if your primary objective is a conventional PR pathway similar to Canada or Australia without alternative residence strategies.",
  },
  {
    name: "Spain",
    slug: "spain",
    postStudyStrength: "Good",
    settlementOutlook: "Moderate to strong",
    bestFor: "Affordable Europe, business, hospitality, engineering, Spanish-speaking careers",
    strengths: [
      "A broad range of universities and a growing number of programmes taught in English.",
      "Living and tuition costs can be lower than in the UK, USA, Canada, or Australia.",
      "Study inside the European Union, with international and cultural exposure.",
    ],
    shortfalls: [
      "Spanish is often important for employment, networking, daily life, and long-term integration even when the degree is in English.",
      "The labour market can be competitive — graduation does not automatically lead to a job.",
    ],
    postStudyOptions:
      "Eligible higher-education graduates may apply for a residence authorisation of up to 24 months to search for suitable employment or develop a business project. That job-search authorisation itself does not permit employment; once suitable work is found, the graduate must move to the appropriate work and residence status. For EU long-term residence, Spain generally requires five years of qualifying legal residence. Time spent under a study authorisation may count at 50% of its duration if the applicant is in qualifying residence status when applying.",
    settlementExplanation:
      "Moderate to strong outlook for graduates who learn Spanish, secure appropriate employment, and successfully move from study into qualifying residence.",
    bestFitStudentProfile:
      "Students who want an affordable European study experience, are willing to develop Spanish, and intend to move into skilled employment after graduation.",
    tags: ["low-tuition", "europe", "business"],
    tuitionLevel: "Often lower than the UK, USA, Canada, or Australia; costs still vary by city and institution.",
    languageConsiderations: "English-taught programmes are increasing; Spanish is often important for work, daily life, and integration.",
    keyCaution: "The job-search residence authorisation does not itself allow employment — you must switch status once you have suitable work.",
    whyStrongOption:
      "May be a strong option if you want relatively affordable European study in business, hospitality, engineering, technology, tourism, or the sciences, and you are willing to build Spanish alongside the qualification.",
    whenNotIdeal:
      "May be less ideal if you want a fully English workplace from day one, or if you expect graduation alone to produce a job and long-term residence.",
  },
  {
    name: "Malta",
    slug: "malta",
    postStudyStrength: "Moderate",
    settlementOutlook: "Moderate",
    bestFor: "English-speaking EU route, healthcare, business, hospitality",
    strengths: [
      "A smaller, more manageable study environment than many larger European countries.",
      "English is widely used in education and professional life.",
      "European exposure without immediately studying in another language.",
    ],
    shortfalls: [
      "A relatively small labour market, so jobs can be more limited than in Germany, France, or the UK.",
      "Programmes need a realistic link to employment, and career planning should start early.",
    ],
    postStudyOptions:
      "Non-EU students who complete a Maltese qualification at MQF Level 5 or above may apply for a 9-month post-study residence permit to look for employment or establish a business related to their studies. The permit does not automatically allow full-time work; a graduate who secures employment normally needs to move to the appropriate Single Permit or employment authorisation. Long-term residence generally needs five years of qualifying legal and continuous residence, plus stable resources, accommodation, and integration. Time spent solely on a student or vocational-training permit does not currently count towards that five-year requirement.",
    settlementExplanation:
      "Moderate outlook. A post-study route exists, but students normally need to move into employment residence before building qualifying time towards long-term status.",
    bestFitStudentProfile:
      "Students who want an English-speaking EU destination, a smaller study environment, and are realistic about the size of the labour market.",
    tags: ["english-speaking", "europe", "business"],
    tuitionLevel: "Often more manageable than larger Western European capitals; confirm programme fees and living costs for your city.",
    languageConsiderations: "English is widely used in education and professional life.",
    keyCaution: "The 9-month post-study permit does not automatically allow full-time work, and student time does not count toward the five-year long-term residence clock.",
    whyStrongOption:
      "May be a strong option if you want English-medium study inside the EU in healthcare, business, hospitality, tourism, technology, or professional services, with a plan to move quickly into qualifying employment.",
    whenNotIdeal:
      "May be less ideal if you need a large labour market immediately, or if you expect student residence alone to count toward long-term status.",
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    postStudyStrength: "Limited for Nigerian students",
    settlementOutlook: "Limited",
    bestFor: "Affordable Asian education, business, IT, engineering, international campuses",
    strengths: [
      "Universities and international branch campuses at costs that can be considerably lower than the UK, USA, Canada, or Australia.",
      "English is widely used in higher education, including business, computing, engineering, hospitality, healthcare-related subjects, and technology.",
      "Multicultural exposure and access to a growing Asian economy.",
    ],
    shortfalls: [
      "Post-study opportunities are not equally available to all nationalities. This is especially important for Nigerian students.",
      "A 12-month Graduate Pass exists for eligible international graduates who complete a bachelor’s degree or higher, but Nigeria is not currently on the official list of eligible nationalities.",
      "Permanent residence is a high-level immigration privilege, not an automatic study-to-settlement route.",
    ],
    postStudyOptions:
      "Students eligible for the Graduate Pass may remain for 12 months after graduation and work part-time in permitted sectors without employer sponsorship. Nigerian students should not assume they will receive that pass under current rules. For graduates who are not eligible, longer-term employment normally depends on an employer-sponsored status such as an Employment Pass. Malaysia revised Employment Pass salary policy from 1 June 2026, so sponsorship and salary eligibility matter. Permanent residence through the Entry Permit system is not a straightforward extension of student status.",
    settlementExplanation:
      "Limited overall, and particularly limited for Nigerian students under the current Graduate Pass rules. Choose Malaysia for study value, not as an easy settlement pathway.",
    bestFitStudentProfile:
      "Students who want affordable English-medium education and Asian exposure, and who already have a clear plan for what happens after graduation.",
    tags: ["low-tuition", "english-speaking", "business", "stem"],
    tuitionLevel: "Often considerably lower than the UK, USA, Canada, or Australia, depending on campus and programme.",
    languageConsiderations: "Most higher-education courses are taught in English.",
    keyCaution: "Nigerian students are not currently on the Graduate Pass nationality list — do not assume a one-year post-study work route.",
    whyStrongOption:
      "May be a strong option if affordability, English-medium study, and Asian career exposure matter more than a migration pathway.",
    whenNotIdeal:
      "May be less ideal if you are choosing a destination mainly to stay and settle after graduation, especially as a Nigerian applicant under current Graduate Pass rules.",
  },
  {
    name: "Singapore",
    slug: "singapore",
    postStudyStrength: "Strong for highly skilled graduates",
    settlementOutlook: "Competitive",
    bestFor: "Technology, finance, engineering, research, Asian career exposure",
    strengths: [
      "Internationally respected universities and a highly developed economy.",
      "Strong links with multinational companies in technology, finance, engineering, and research.",
      "Exposure to one of Asia’s leading commercial and innovation centres.",
    ],
    shortfalls: [
      "Admission, living costs, and access to professional employment are highly competitive.",
      "Completing a qualification does not automatically give an unrestricted post-study work visa.",
      "Work passes have salary and eligibility requirements, including the points-based COMPASS assessment for most Employment Pass applications.",
    ],
    postStudyOptions:
      "Graduates of recognised Singapore Institutes of Higher Learning may apply for a Long-Term Visit Pass to seek employment. The recognised list includes institutions such as the National University of Singapore, Nanyang Technological University, Singapore Management University, and other approved institutions. Once suitable employment is secured, the employer may need an Employment Pass or S Pass depending on the role, salary, and profile. Holders of an Employment Pass or S Pass are among the categories that may apply for permanent residence, but eligibility to apply does not mean PR is granted.",
    settlementExplanation:
      "Competitive. Strong career opportunities exist for highly skilled graduates, but Singapore is not a simple or guaranteed study-to-PR destination.",
    bestFitStudentProfile:
      "Academically competitive students pursuing technology, finance, engineering, research, business, data, biotechnology, or other high-skilled careers.",
    tags: ["stem", "english-speaking", "business", "skilled-migration"],
    tuitionLevel: "Can be demanding once tuition and living costs are combined; funding needs a realistic plan.",
    languageConsiderations: "Higher education and professional life are primarily English for most international students.",
    keyCaution: "Post-study work depends on a recognised institution and then on salary and pass rules — a degree alone is not an unrestricted work visa.",
    whyStrongOption:
      "May be a strong option if you have a strong academic profile and want high-level exposure to Asian and global industries in technology, finance, engineering, or research.",
    whenNotIdeal:
      "May be less ideal if you need a predictable, lower-cost route or a straightforward path from study to permanent residence.",
  },
];

export type PriorityId = "pr" | "affordable" | "fastMasters" | "stem" | "english" | "business" | "europe";

export const PRIORITY_OPTIONS: { id: PriorityId; label: string; helper: string; slugs: string[] }[] = [
  {
    id: "pr",
    label: "Strong PR pathway",
    helper: "You want post-study work and routes to explore permanent residence when you qualify.",
    slugs: ["canada", "germany", "australia", "ireland"],
  },
  {
    id: "affordable",
    label: "Affordable tuition",
    helper: "You need tuition and total cost of study to stay as sensible as possible for your budget.",
    slugs: ["germany", "france", "spain", "malaysia"],
  },
  {
    id: "fastMasters",
    label: "Fast master’s degree",
    helper: "You want to graduate and re-enter the workforce quickly where one-year-style options exist.",
    slugs: ["uk", "ireland", "france", "australia"],
  },
  {
    id: "stem",
    label: "STEM & research opportunities",
    helper: "Labs, publications, and employers who care about technical depth matter most to you.",
    slugs: ["usa", "germany", "canada", "singapore"],
  },
  {
    id: "english",
    label: "English-speaking country",
    helper: "You want your degree — and everyday study life — primarily in English.",
    slugs: ["uk", "canada", "ireland", "australia"],
  },
  {
    id: "business",
    label: "Business & entrepreneurship",
    helper: "You care about markets, founders, finance, and building a career with global or regional reach.",
    slugs: ["uae", "france", "spain", "malta"],
  },
  {
    id: "europe",
    label: "European study route",
    helper: "You want a European base, EU context where relevant, and a different rhythm from only Anglo destinations.",
    slugs: ["germany", "france", "spain", "ireland"],
  },
];

export const GOAL_SECTIONS: { title: string; description: string; slugs: string[] }[] = [
  {
    title: "Strong PR pathway after study",
    description:
      "Explore countries where post-study work and skilled routes are often part of the conversation — always subject to your profile and current rules.",
    slugs: ["canada", "germany", "australia"],
  },
  {
    title: "Fast qualification + work exposure",
    description: "Shorter master’s options and graduate work permission can help you move from classroom to CV faster when you qualify.",
    slugs: ["uk", "ireland"],
  },
  {
    title: "STEM & research + global career",
    description: "Heavyweight research ecosystems and STEM employers that recruit internationally — competitiveness varies by programme and funding.",
    slugs: ["usa", "germany", "canada", "singapore"],
  },
  {
    title: "Affordable European study",
    description: "Public-university savings and European mobility — often paired with language investment outside the classroom.",
    slugs: ["germany", "france", "spain"],
  },
  {
    title: "Strong European settlement potential",
    description: "European routes where skilled work and longer-term residence are part of the conversation — still subject to language, employment, and current rules.",
    slugs: ["germany", "spain", "france"],
  },
  {
    title: "English-speaking EU study route",
    description: "Study in English inside the European Union, then plan a realistic move into employment residence.",
    slugs: ["ireland", "malta"],
  },
  {
    title: "Business, hospitality and tourism",
    description: "Destinations often discussed for business exposure, hospitality, tourism, and regional or European career markets.",
    slugs: ["uae", "france", "spain", "malta"],
  },
  {
    title: "Technology and finance",
    description: "Hubs with multinational employers in technology, finance, and related professional careers.",
    slugs: ["usa", "uk", "ireland", "singapore"],
  },
  {
    title: "Affordable Asian education",
    description: "Lower-cost English-medium study and Asian exposure. For Nigerian students, Malaysia is a study choice — not a current Graduate Pass route.",
    slugs: ["malaysia"],
  },
  {
    title: "High-skilled Asian career exposure",
    description: "Competitive universities and employers in technology, finance, engineering, and research. Permanent residence is possible to apply for, not guaranteed.",
    slugs: ["singapore"],
  },
  {
    title: "Study mainly for affordability, not migration",
    description: "Choose this path when tuition and living costs matter more than a post-study settlement plan.",
    slugs: ["malaysia"],
  },
  {
    title: "Long-term migration planning",
    description: "Think study, occupation fit, and work rights as one timeline — outcomes depend on eligibility and policy changes.",
    slugs: ["canada", "germany", "australia", "spain"],
  },
];

export type QuizBudget = "low" | "medium" | "high";
export type QuizPr = "yes" | "no";
export type QuizField = "stem" | "business" | "healthcare" | "arts" | "general";
/** Yes = English-only preferred; No = open to other languages */
export type QuizLanguage = "yes" | "no";
export type QuizFastMasters = "yes" | "no";

export type QuizAnswers = {
  budget: QuizBudget | null;
  pr: QuizPr | null;
  field: QuizField | null;
  language: QuizLanguage | null;
  fastMasters: QuizFastMasters | null;
};

function toInternalLanguage(a: QuizLanguage | null): "english_only" | "open" | null {
  if (a === "yes") return "english_only";
  if (a === "no") return "open";
  return null;
}

const slugOrder = destinations.map((d) => d.slug);

export function scoreDestinationsForQuiz(answers: QuizAnswers): Map<string, number> {
  const scores = new Map<string, number>();
  for (const slug of slugOrder) scores.set(slug, 0);

  const add = (slug: string, points: number) => {
    scores.set(slug, (scores.get(slug) ?? 0) + points);
  };

  const langPref = toInternalLanguage(answers.language);

  if (answers.pr === "yes") {
    ["canada", "germany", "australia"].forEach((s) => add(s, 4));
    ["spain", "france"].forEach((s) => add(s, 2));
    ["uk", "usa", "ireland", "malta", "singapore"].forEach((s) => add(s, 1));
    add("malaysia", -2);
  }

  if (answers.budget === "low") {
    ["germany", "france", "spain", "malaysia"].forEach((s) => add(s, 4));
    ["malta", "ireland"].forEach((s) => add(s, 1));
    add("uk", -1);
    add("usa", -2);
    add("australia", -2);
    add("singapore", -1);
    add("uae", 1);
  } else if (answers.budget === "medium") {
    ["canada", "ireland", "germany", "spain", "malta"].forEach((s) => add(s, 1));
  } else if (answers.budget === "high") {
    ["usa", "uk", "australia", "singapore"].forEach((s) => add(s, 2));
  }

  if (answers.field === "stem") {
    ["usa", "germany", "singapore"].forEach((s) => add(s, 4));
    ["canada", "australia"].forEach((s) => add(s, 3));
    add("uk", 2);
    add("ireland", 2);
    add("spain", 1);
    add("malaysia", 1);
  } else if (answers.field === "business") {
    ["uae", "france", "uk", "spain", "malta"].forEach((s) => add(s, 4));
    ["canada", "usa", "australia", "singapore", "malaysia"].forEach((s) => add(s, 2));
  } else if (answers.field === "healthcare") {
    ["australia", "ireland", "uk", "canada", "usa", "malta"].forEach((s) => add(s, 2));
    add("germany", 1);
    add("malaysia", 1);
  } else if (answers.field === "arts") {
    ["france", "uk", "usa", "spain"].forEach((s) => add(s, 3));
    add("germany", 1);
  } else if (answers.field === "general") {
    ["canada", "uk", "ireland", "spain"].forEach((s) => add(s, 1));
  }

  if (langPref === "english_only") {
    ["uk", "canada", "ireland", "australia", "usa", "malta", "singapore"].forEach((s) => add(s, 3));
    add("malaysia", 2);
    add("uae", 1);
    add("germany", -1);
    add("france", -1);
    add("spain", -1);
  }

  if (answers.fastMasters === "yes") {
    add("uk", 4);
    add("ireland", 4);
    add("france", 1);
  }

  return scores;
}

export function getQuizRecommendations(
  answers: QuizAnswers,
): { destination: Destination; score: number; reason: string }[] {
  const scores = scoreDestinationsForQuiz(answers);
  const ranked = destinations
    .map((d) => ({ destination: d, score: scores.get(d.slug) ?? 0 }))
    .sort((a, b) => b.score - a.score);

  const topScore = ranked[0]?.score ?? 0;
  const withinBand = ranked.filter((r, index) => index < 6 && r.score >= topScore - 5);
  const picked =
    withinBand.length >= 3 ? withinBand.slice(0, 3) : ranked.slice(0, Math.min(3, Math.max(2, ranked.length)));

  return picked.map(({ destination, score }) => ({
    destination,
    score,
    reason: buildQuizReason(destination.slug, answers, score),
  }));
}

function buildQuizReason(slug: string, answers: QuizAnswers, score: number): string {
  const lang = toInternalLanguage(answers.language);
  const parts: string[] = [];
  if (answers.pr === "yes" && ["canada", "germany", "australia", "spain"].includes(slug)) {
    parts.push("often discussed when students want post-study work and to explore settlement routes for eligible profiles");
  }
  if (answers.budget === "low" && ["germany", "france", "spain", "malaysia"].includes(slug)) {
    parts.push("may fit a tighter budget better than many high-tuition Anglo destinations, depending on programme and city");
  }
  if (answers.field === "stem" && ["usa", "germany", "canada", "australia", "singapore"].includes(slug)) {
    parts.push("may suit STEM and research ambitions where your grades, portfolio, and funding align");
  }
  if (answers.field === "business" && ["uae", "france", "uk", "spain", "malta"].includes(slug)) {
    parts.push("may align with business, finance, hospitality, or entrepreneurship exposure you described");
  }
  if (answers.field === "healthcare" && ["australia", "ireland", "uk", "canada", "usa", "malta"].includes(slug)) {
    parts.push("may support healthcare and life-science career corridors you are considering");
  }
  if (answers.field === "arts" && ["france", "uk", "usa", "spain"].includes(slug)) {
    parts.push("may offer creative and cultural depth worth comparing for arts-oriented goals");
  }
  if (lang === "english_only" && ["uk", "canada", "ireland", "australia", "usa", "malta", "singapore", "malaysia"].includes(slug)) {
    parts.push("may match an English-first study and early-career preference");
  }
  if (lang === "open" && ["germany", "france", "spain"].includes(slug)) {
    parts.push("may reward openness to a second language alongside English-taught degree options");
  }
  if (answers.fastMasters === "yes" && ["uk", "ireland"].includes(slug)) {
    parts.push("may fit a faster master’s timeline where one-year-style programmes suit your plan");
  }
  if (parts.length === 0) {
    parts.push(
      score >= 3
        ? "may still deserve a place on your comparison list alongside favourites you already have in mind"
        : "is worth comparing side by side before you decide — outcomes always depend on your profile and current rules",
    );
  }
  return parts.slice(0, 2).join(" — ") + ".";
}

export function destinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsBySlugs(slugs: string[]): Destination[] {
  return slugs.map((s) => destinationBySlug(s)).filter((d): d is Destination => Boolean(d));
}

export function getShortlistForPriority(id: PriorityId): Destination[] {
  const opt = PRIORITY_OPTIONS.find((o) => o.id === id);
  if (!opt) return [];
  return getDestinationsBySlugs(opt.slugs).slice(0, 4);
}

export const TAG_LABELS: Record<DestinationTag, string> = {
  "pr-friendly": "PR pathway",
  stem: "STEM & research",
  "low-tuition": "Affordable tuition",
  "english-speaking": "English-speaking",
  business: "Business",
  "fast-masters": "Fast master’s",
  europe: "Europe",
  "skilled-migration": "Skilled visas",
};
