/* CarpQuest — all learning content lives here.
   Facts are written to be accurate at an introductory level; where a number
   is illustrative (lab simulations, breakpoints, amplicon sizes) the UI says so. */

const YT = (id, title, channel, topic) => ({ id, title, channel, topic });

const VIDEOS = {
  carpFarming: YT("ww2NqhoPh_c", "Large-size carp production technique (Rajshahi region)", "AhamedAquatechBD64", "Carps"),
  mixedFarm:   YT("2b7cmzwHQug", "Mixed carp farming: silver & black carp harvest", "fishmarketbd", "Carps"),
  aeromonas:   YT("lzyDSTfJWLk", "Fish pathogen: Aeromonas hydrophila", "fishpathogens.net", "Diseases"),
  eus:         YT("YRoxip6TVZc", "Epizootic Ulcerative Syndrome (EUS) in fish", "Aqua Farming Hub", "Diseases"),
  amr:         YT("1MlhG0FgeAI", "Why AMR in aquaculture matters for One Health", "WorldFish", "AMR"),
  pra:         YT("B49aV8mxOvE", "Participatory Rural Appraisal: tools for community engagement", "AIAEE", "Survey"),
  koch:        YT("xhLmZ3WMCt0", "Koch's Postulates", "Biology Professor", "Lab"),
  imvic:       YT("OxH0HQXaat8", "IMViC assay", "Mohammed Khider Abbas", "Lab"),
  kirby:       YT("QssXtJ1oeNc", "Kirby-Bauer disc diffusion method", "Bio-Resource", "Lab"),
  kirbyRead:   YT("hVCzTWlK4Y0", "Interpreting antibiotic disk diffusion results", "David Cummings", "Lab"),
  pcr:         YT("eNTkEuvCmKM", "PCR — amplify DNA for analysis (3D animation)", "Labster", "Molecular"),
  pcrPromega:  YT("DEMUA6Y8qME", "What is Polymerase Chain Reaction (PCR)?", "Promega Corporation", "Molecular"),
  qpcr:        YT("ZhEVgpNnvtU", "Real-time PCR — biology tutorial", "Joao's Lab", "Molecular"),
  qpcr1min:    YT("7a7HxKu6yKw", "qPCR in 1 minute", "Animated biology With Arpan", "Molecular"),
  gel:         YT("wjQZhV5mqtE", "Gel electrophoresis animation", "Shomu's Biology Academy", "Molecular"),
  s16:         YT("SM3YtWVneO8", "16S rRNA sequencing for bacterial identification", "Biotechnology Basics", "Molecular"),
  phyloCDC:    YT("QasuKryesOQ", "How to read a phylogenetic tree (Module 1.3)", "CDC", "Molecular"),
  phyloStart:  YT("SyQfGo_F4eg", "New to phylogenies? Tips, nodes, branches & the root", "DillonTheBiologist", "Molecular"),
};

const ARTICLES = [
  { t: "Fishing in Bangladesh (overview)", u: "https://en.wikipedia.org/wiki/Fishing_in_Bangladesh", src: "Wikipedia", topic: "Carps" },
  { t: "Department of Fisheries, Bangladesh — statistics & yearbooks", u: "https://fisheries.gov.bd/", src: "DoF Bangladesh", topic: "Carps" },
  { t: "FAO country profile: Bangladesh fisheries & aquaculture", u: "https://www.fao.org/fishery/en/countrysector/bgd", src: "FAO", topic: "Carps" },
  { t: "The State of World Fisheries and Aquaculture 2024", u: "https://openknowledge.fao.org/handle/20.500.14283/cd0683en", src: "FAO", topic: "Carps" },
  { t: "Indian major carps", u: "https://en.wikipedia.org/wiki/Indian_major_carp", src: "Wikipedia", topic: "Carps" },
  { t: "Rohu (Labeo rohita)", u: "https://en.wikipedia.org/wiki/Rohu", src: "Wikipedia", topic: "Carps" },
  { t: "Catla", u: "https://en.wikipedia.org/wiki/Catla", src: "Wikipedia", topic: "Carps" },
  { t: "Mrigal carp", u: "https://en.wikipedia.org/wiki/Mrigal_carp", src: "Wikipedia", topic: "Carps" },
  { t: "Silver carp", u: "https://en.wikipedia.org/wiki/Silver_carp", src: "Wikipedia", topic: "Carps" },
  { t: "Grass carp", u: "https://en.wikipedia.org/wiki/Grass_carp", src: "Wikipedia", topic: "Carps" },
  { t: "Bighead carp", u: "https://en.wikipedia.org/wiki/Bighead_carp", src: "Wikipedia", topic: "Carps" },
  { t: "Common carp", u: "https://en.wikipedia.org/wiki/Common_carp", src: "Wikipedia", topic: "Carps" },
  { t: "Aeromonas hydrophila", u: "https://en.wikipedia.org/wiki/Aeromonas_hydrophila", src: "Wikipedia", topic: "Diseases" },
  { t: "Review: pathogenicity of A. hydrophila & mitigation in aquaculture (2023)", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10018484/", src: "PMC", topic: "Diseases" },
  { t: "A hypervirulent A. hydrophila pathotype in warm-water fishes", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5067525/", src: "PMC", topic: "Diseases" },
  { t: "Epizootic ulcerative syndrome", u: "https://en.wikipedia.org/wiki/Epizootic_ulcerative_syndrome", src: "Wikipedia", topic: "Diseases" },
  { t: "Why rohu is susceptible to Aphanomyces invadans", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7658212/", src: "PMC", topic: "Diseases" },
  { t: "A rapid real-time (qPCR) assay for Aphanomyces invadans", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10270590/", src: "PMC", topic: "Diseases" },
  { t: "Columnaris disease", u: "https://en.wikipedia.org/wiki/Columnaris", src: "Wikipedia", topic: "Diseases" },
  { t: "Edwardsiella tarda", u: "https://en.wikipedia.org/wiki/Edwardsiella_tarda", src: "Wikipedia", topic: "Diseases" },
  { t: "Argulus (fish louse)", u: "https://en.wikipedia.org/wiki/Argulus", src: "Wikipedia", topic: "Diseases" },
  { t: "Ichthyophthirius multifiliis (white spot)", u: "https://en.wikipedia.org/wiki/Ichthyophthirius_multifiliis", src: "Wikipedia", topic: "Diseases" },
  { t: "Cyprinid herpesvirus 3 (KHV)", u: "https://en.wikipedia.org/wiki/Cyprinid_herpesvirus_3", src: "Wikipedia", topic: "Diseases" },
  { t: "Participatory rural appraisal", u: "https://en.wikipedia.org/wiki/Participatory_rural_appraisal", src: "Wikipedia", topic: "Survey" },
  { t: "Koch's postulates", u: "https://en.wikipedia.org/wiki/Koch%27s_postulates", src: "Wikipedia", topic: "Lab" },
  { t: "IMViC tests", u: "https://en.wikipedia.org/wiki/IMViC", src: "Wikipedia", topic: "Lab" },
  { t: "Disk diffusion test", u: "https://en.wikipedia.org/wiki/Disk_diffusion_test", src: "Wikipedia", topic: "Lab" },
  { t: "Mueller–Hinton agar", u: "https://en.wikipedia.org/wiki/Mueller%E2%80%93Hinton_agar", src: "Wikipedia", topic: "Lab" },
  { t: "CLSI — standards for susceptibility testing", u: "https://clsi.org/", src: "CLSI", topic: "Lab" },
  { t: "Histopathology", u: "https://en.wikipedia.org/wiki/Histopathology", src: "Wikipedia", topic: "Lab" },
  { t: "H&E stain", u: "https://en.wikipedia.org/wiki/H%26E_stain", src: "Wikipedia", topic: "Lab" },
  { t: "Polymerase chain reaction", u: "https://en.wikipedia.org/wiki/Polymerase_chain_reaction", src: "Wikipedia", topic: "Molecular" },
  { t: "Real-time PCR", u: "https://en.wikipedia.org/wiki/Real-time_polymerase_chain_reaction", src: "Wikipedia", topic: "Molecular" },
  { t: "A basic guide to real-time PCR in microbial diagnostics", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5288344/", src: "PMC", topic: "Molecular" },
  { t: "Gel electrophoresis", u: "https://en.wikipedia.org/wiki/Gel_electrophoresis", src: "Wikipedia", topic: "Molecular" },
  { t: "16S ribosomal RNA", u: "https://en.wikipedia.org/wiki/16S_ribosomal_RNA", src: "Wikipedia", topic: "Molecular" },
  { t: "NCBI BLAST", u: "https://blast.ncbi.nlm.nih.gov/Blast.cgi", src: "NCBI", topic: "Molecular" },
  { t: "NCBI GenBank", u: "https://www.ncbi.nlm.nih.gov/genbank/", src: "NCBI", topic: "Molecular" },
  { t: "MEGA — Molecular Evolutionary Genetics Analysis", u: "https://www.megasoftware.net/", src: "MEGA", topic: "Molecular" },
  { t: "Phylogenetic tree", u: "https://en.wikipedia.org/wiki/Phylogenetic_tree", src: "Wikipedia", topic: "Molecular" },
  { t: "Virulence factor", u: "https://en.wikipedia.org/wiki/Virulence_factor", src: "Wikipedia", topic: "Molecular" },
  { t: "Aerolysin", u: "https://en.wikipedia.org/wiki/Aerolysin", src: "Wikipedia", topic: "Molecular" },
  { t: "Antimicrobial resistance", u: "https://en.wikipedia.org/wiki/Antimicrobial_resistance", src: "Wikipedia", topic: "AMR" },
  { t: "AMR in aquaculture: risk mitigation within One Health (2024)", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11311770/", src: "PMC", topic: "AMR" },
  { t: "FAO — Antimicrobial resistance", u: "https://www.fao.org/antimicrobial-resistance/en/", src: "FAO", topic: "AMR" },
  { t: "FAO — One Health", u: "https://www.fao.org/one-health/en", src: "FAO", topic: "AMR" },
  { t: "WHO — One Health", u: "https://www.who.int/health-topics/one-health", src: "WHO", topic: "AMR" },
  { t: "WorldFish", u: "https://www.worldfishcenter.org/", src: "WorldFish", topic: "AMR" },
];

/* ---------- Slide 1 context: the carps ---------- */
const CARPS = [
  { id: "rohu", name: "Rohu", bn: "রুই · Rui", sci: "Labeo rohita", origin: "Native (Indian major carp)", zone: ["column"], feed: "Column feeder — plankton, plant matter and detritus", fact: "Bangladesh's favourite table fish. It's the 'R' in the classic rohu-catla-mrigal polyculture.", disease: "Highly susceptible to EUS and Aeromonas infections.", color: "#c2410c" },
  { id: "catla", name: "Catla", bn: "কাতলা · Katla", sci: "Catla catla (Labeo catla)", origin: "Native (Indian major carp)", zone: ["surface"], feed: "Surface feeder — mainly zooplankton", fact: "Recognisable by its huge head and upturned mouth, built for skimming the surface.", disease: "Gill parasites (e.g. Myxobolus cysts) and bacterial gill problems are common.", color: "#4d7c0f" },
  { id: "mrigal", name: "Mrigal", bn: "মৃগেল · Mrigel", sci: "Cirrhinus mrigala", origin: "Native (Indian major carp)", zone: ["bottom"], feed: "Bottom feeder — detritus, decaying organic matter", fact: "Cleans up the pond floor. Together, the three Indian major carps use the whole water column.", disease: "Bottom feeding exposes it to sediment-borne bacteria and poor-water stress.", color: "#7c3aed" },
  { id: "silver", name: "Silver carp", bn: "সিলভার কার্প", sci: "Hypophthalmichthys molitrix", origin: "Exotic (Chinese carp)", zone: ["surface"], feed: "Surface filter feeder — phytoplankton", fact: "Its gill rakers act like a fine sieve that strains algae from the water.", disease: "Often shows haemorrhagic septicaemia: red patches on the head, belly and fin bases.", color: "#0369a1" },
  { id: "bighead", name: "Bighead carp", bn: "বিগহেড কার্প", sci: "Hypophthalmichthys nobilis", origin: "Exotic (Chinese carp)", zone: ["surface", "column"], feed: "Filter feeder — mostly zooplankton", fact: "A close cousin of silver carp with an even bigger head (hence the name).", disease: "The haemorrhagic heads in this project's photos look like bighead or silver carp.", color: "#0f766e" },
  { id: "grass", name: "Grass carp", bn: "গ্রাস কার্প", sci: "Ctenopharyngodon idella", origin: "Exotic (Chinese carp)", zone: ["column", "surface"], feed: "Herbivore — aquatic weeds and grass", fact: "Farmers feed it cut grass and banana leaves. It keeps weeds down.", disease: "Prone to gill rot and parasite loads when overstocked.", color: "#15803d" },
  { id: "common", name: "Common carp", bn: "কার্পিও · Carpio", sci: "Cyprinus carpio", origin: "Exotic", zone: ["bottom"], feed: "Bottom omnivore — worms, insect larvae, detritus", fact: "Stirs up the bottom while it forages, which recycles nutrients into the water.", disease: "The main host of koi herpesvirus (KHV, CyHV-3) worldwide.", color: "#a16207" },
  { id: "kalibaus", name: "Kalibaus", bn: "কালিবাউশ", sci: "Labeo calbasu", origin: "Native", zone: ["bottom"], feed: "Bottom feeder — detritus and benthic organisms", fact: "A dark native carp often stocked with the major carps.", disease: "Shares the EUS susceptibility of other native labeonins.", color: "#334155" },
];

const BD_STATS = [
  { v: 4.9, suf: "M t", label: "Total fish production per year (≈, FY 2022–23)", src: "DoF Yearbook" },
  { v: 58, suf: "%", label: "of fish production comes from aquaculture (≈)", src: "DoF" },
  { v: 60, suf: "%", label: "of animal protein in Bangladeshi diets comes from fish (≈)", src: "DoF" },
  { v: 12, suf: "%", label: "of the population rely on fisheries for some or all of their livelihood (≈)", src: "DoF" },
];

/* ---------- Slide 2 justification ---------- */
const JUSTIFICATION = [
  {
    id: "econ", icon: "coins", title: "High economic losses & threat to food security",
    short: "Outbreaks kill fish overnight, and carp feed millions.",
    body: [
      "One outbreak can wipe out months of feed and labour in a few days. You can see this in the mass-mortality photo from the slide.",
      "Survivors grow slowly, look unhealthy and sell for less. Treatment costs eat into thin margins.",
      "Carps are among the cheapest animal proteins for rural households, so pond losses quickly become nutrition losses.",
      "Globally, the World Bank (2014) put disease losses in aquaculture at more than US$6 billion a year.",
    ],
    img: "assets/img/mass-mortality.jpg", cap: "Mass mortality on a pond bank (from the slide deck).",
  },
  {
    id: "diag", icon: "microscope", title: "Limits of conventional diagnosis",
    short: "Eyes and culture plates alone can't tell look-alike pathogens apart.",
    body: [
      "Farmers and feed-shop advisers usually go by visible signs. But red spots, ulcers and dropsy can come from several different pathogens.",
      "Culture and biochemical tests are slow (days) and struggle with taxonomically messy groups like Aeromonas.",
      "Few district labs have PCR or sequencing. Without them, outbreaks go unrecorded and the same mistakes repeat.",
      "A wrong diagnosis leads to the wrong treatment: money wasted and resistance selected.",
    ],
    img: "assets/img/biochem-tubes.jpg", cap: "Biochemical tests: informative but slow and sometimes ambiguous.",
  },
  {
    id: "amr", icon: "shield", title: "Mitigating AMR in aquatic ecosystems",
    short: "Guess-treating with antibiotics breeds resistant bacteria.",
    body: [
      "Antibiotics are often bought over the counter and added to ponds without a confirmed diagnosis.",
      "Pond water carries drug residues and resistance genes into rivers, to other animals and to people. This is a One Health problem.",
      "Knowing the exact pathogen and its antibiogram (AST profile) makes targeted, minimal treatment possible.",
      "The MAR index from this project flags farms where antibiotic pressure is high.",
    ],
    img: "assets/img/ast-plate.jpg", cap: "Antibiotic susceptibility plate: clear zones show where the drug stops growth.",
  },
  {
    id: "policy", icon: "landmark", title: "Policy alignment & capacity building",
    short: "Evidence that fits national AMR, fisheries and SDG goals.",
    body: [
      "Supports Bangladesh's national action plan on AMR containment and fisheries-sector disease management.",
      "Contributes to SDG 2 (Zero Hunger), SDG 3 (Good Health) and SDG 14 (Life Below Water).",
      "Builds a baseline molecular database of local pathogen strains that future surveillance and vaccine work can use.",
      "Trains researchers in molecular diagnostics and strengthens BFRI's lab capacity.",
    ],
    img: "assets/img/culture-plate.jpg", cap: "Building lab capacity, one plate at a time.",
  },
];

/* ---------- Slides 3–4 objectives & outputs ---------- */
const OBJECTIVES = [
  { id: "o1", code: "Obj. i", text: "To investigate the clinical and pathological characteristics of diseases affecting cultured carps", plain: "What does the disease look like, outside and inside the fish?", methods: ["survey", "sampling", "histo", "challenge"], outputs: ["e1"] },
  { id: "o2", code: "Obj. ii", text: "To isolate and identify the major pathogens associated with diseased carps", plain: "Which microbe is actually causing it?", methods: ["prep", "media", "subculture", "identify", "biochem", "qpcr", "pcr", "ast"], outputs: ["e2"] },
  { id: "o3", code: "Obj. iii", text: "To determine the molecular diversity and genetic characteristics of the identified pathogens", plain: "How are the local strains related to each other and to strains elsewhere?", methods: ["molid", "seq", "phylo"], outputs: ["e3", "e4"] },
  { id: "o4", code: "Obj. iv", text: "To analyze the virulence-associated genes of major bacterial pathogens affecting cultured carps", plain: "Which weapons (toxins, enzymes) do these bacteria carry?", methods: ["pcr", "molid", "challenge"], outputs: ["e3", "e5"] },
];

const OUTPUTS = [
  { id: "e1", text: "Clinical & pathological profiles of major carp diseases", icon: "clipboard" },
  { id: "e2", text: "Isolation and identification of major carp pathogens", icon: "flask" },
  { id: "e3", text: "Molecular characterization, genetic diversity and virulence gene profiles of major bacterial pathogens", icon: "dna" },
  { id: "e4", text: "Baseline molecular database of carp pathogens in Bangladesh", icon: "database" },
  { id: "e5", text: "Evidence-based strategies for disease diagnosis, surveillance and control", icon: "target" },
];

/* ---------- Disease atlas ---------- */
const DISEASES = [
  { id: "mas", name: "Motile Aeromonas Septicaemia (MAS)", aka: "Haemorrhagic septicaemia, 'red disease', dropsy", agent: "Aeromonas hydrophila, A. veronii, A. caviae", type: "Bacterium", gram: "Gram-negative motile rod", signs: ["haem", "ulcer", "eye", "belly", "fin", "scale"], season: "Warm months and sudden temperature swings, especially after heavy rain or with poor water", hosts: "All carps, especially silver, bighead and rohu", note: "Aeromonads live in every pond. They cause disease when fish are stressed (crowding, low oxygen, ammonia, handling), so they are 'opportunistic'.", link: "https://en.wikipedia.org/wiki/Aeromonas_hydrophila" },
  { id: "eus", name: "Epizootic Ulcerative Syndrome (EUS)", aka: "Red-spot disease, 'kshoto rog'", agent: "Aphanomyces invadans (oomycete water mould), often with secondary bacteria", type: "Oomycete", gram: "Aseptate hyphae (not a true fungus)", signs: ["ulcer", "haem"], season: "Cool season (roughly Dec–Feb) when water temperature drops. It reached Bangladesh in 1988.", hosts: "Rohu, mrigal, kalibaus, snakeheads, catfish. Chinese carps and tilapia are notably resistant.", note: "Hyphae invade muscle and trigger granulomas, which leave deep 'hole-in-the-side' ulcers. It is a WOAH-listed disease.", link: "https://en.wikipedia.org/wiki/Epizootic_ulcerative_syndrome" },
  { id: "col", name: "Columnaris", aka: "Saddleback, gill rot, cotton-wool disease", agent: "Flavobacterium columnare", type: "Bacterium", gram: "Gram-negative, long thin gliding rods", signs: ["gill", "fin", "saddle"], season: "Warm water, high organic load, handling stress", hosts: "Catla, grass carp, rohu and many others", note: "Forms yellow, flat, root-like (rhizoid) colonies on low-nutrient media such as Shieh or Anacker–Ordal agar.", link: "https://en.wikipedia.org/wiki/Columnaris" },
  { id: "edw", name: "Edwardsiellosis", aka: "Emphysematous putrefactive disease", agent: "Edwardsiella tarda / E. piscicida", type: "Bacterium", gram: "Gram-negative rod, oxidase-negative, H₂S-positive", signs: ["ulcer", "belly", "haem"], season: "Warm water, organic pollution", hosts: "Common carp, other carps, catfish", note: "Gas-filled, foul-smelling abscesses in the muscle. It is zoonotic, so handle carefully.", link: "https://en.wikipedia.org/wiki/Edwardsiella_tarda" },
  { id: "pse", name: "Pseudomonas septicaemia", aka: "Red-spot (bacterial), fin rot", agent: "Pseudomonas fluorescens, P. putida", type: "Bacterium", gram: "Gram-negative rod, oxidase-positive, non-fermenter", signs: ["haem", "fin", "scale"], season: "Cooler water and after handling or transport", hosts: "Silver carp, rohu, common carp", note: "Makes a fluorescent green-yellow pigment that glows under UV light.", link: "https://en.wikipedia.org/wiki/Pseudomonas_fluorescens" },
  { id: "arg", name: "Argulosis", aka: "Fish lice", agent: "Argulus spp. (branchiuran crustacean)", type: "Parasite", gram: "Visible to the naked eye, 5–10 mm", signs: ["flash", "haem", "ulcer"], season: "Year-round, peaking in warm months", hosts: "All carps", note: "The louse pierces skin to feed. The wounds become entry points for Aeromonas.", link: "https://en.wikipedia.org/wiki/Argulus" },
  { id: "ich", name: "White spot disease (Ich)", aka: "Ichthyophthiriasis", agent: "Ichthyophthirius multifiliis (ciliate protozoan)", type: "Parasite", gram: "Single-celled ciliate living under the skin", signs: ["spots", "flash", "gill"], season: "Cool-to-mild temperatures, crowded nurseries", hosts: "Fry and fingerlings of all carps", note: "Each white dot is a parasite under the epidermis, like a grain of salt on the fish.", link: "https://en.wikipedia.org/wiki/Ichthyophthirius_multifiliis" },
  { id: "khv", name: "Koi herpesvirus disease (KHVD)", aka: "CyHV-3 infection", agent: "Cyprinid herpesvirus 3", type: "Virus", gram: "dsDNA virus, cannot be cultured on agar", signs: ["gill", "eye"], season: "Water roughly 16–25 °C", hosts: "Common carp and koi only", note: "Causes sunken eyes and severe gill necrosis. Only molecular tests (PCR or qPCR) can confirm it. WOAH-listed.", link: "https://en.wikipedia.org/wiki/Cyprinid_herpesvirus_3" },
];

const SIGNS = {
  haem:  { label: "Haemorrhage", desc: "Red patches or streaks under the skin or at fin bases: blood leaking from damaged vessels, usually a sign of septicaemia." },
  ulcer: { label: "Ulcers / lesions", desc: "Open sores. Shallow ones point to bacteria; deep, crater-like ones in winter suggest EUS." },
  eye:   { label: "Exophthalmia (pop-eye)", desc: "Bulging eyes from fluid or gas behind the eye. Sunken eyes are typical of KHV instead." },
  belly: { label: "Abdominal dropsy", desc: "Swollen belly full of fluid (ascites) when the kidney and blood vessels fail. Scales may stick out like a pine cone." },
  fin:   { label: "Fin & tail rot", desc: "Frayed, whitish or eroded fins as bacteria destroy the tissue." },
  gill:  { label: "Gill necrosis", desc: "Pale, mottled or rotting gills. The fish gasps at the surface." },
  scale: { label: "Scale loss", desc: "Raised or missing scales leave the skin open to more infection." },
  spots: { label: "White spots", desc: "Pin-head white dots on skin and fins: the classic sign of Ich." },
  flash: { label: "Flashing / rubbing", desc: "Fish rub against the bottom or jump. Usually caused by parasite irritation." },
  saddle:{ label: "Saddleback lesion", desc: "A pale band around the body near the dorsal fin, typical of columnaris." },
};

/* hotspots on the fish SVG (coordinates in a 600x300 viewBox) */
const HOTSPOTS = [
  { id: "eye",   x: 105, y: 128, r: 18, signs: ["eye"], part: "Eye", look: "Check for bulging, cloudiness, bleeding around the orbit, or sunken eyes." },
  { id: "gill",  x: 172, y: 150, r: 22, signs: ["gill", "haem"], part: "Gills & operculum", look: "Lift the gill cover: healthy gills are bright red. Pale, brown or eroded gills are a warning sign." },
  { id: "mouth", x: 50,  y: 150, r: 15, signs: ["haem"], part: "Mouth & head", look: "Red mouth and head are common in haemorrhagic septicaemia (see the slide photo)." },
  { id: "body",  x: 300, y: 125, r: 30, signs: ["haem", "ulcer", "scale", "saddle", "spots"], part: "Skin & scales", look: "Look for red patches, ulcers, raised scales, white spots and a pale saddle-shaped band." },
  { id: "belly", x: 280, y: 200, r: 26, signs: ["belly", "haem"], part: "Belly", look: "Is it swollen or soft? Is there red discolouration? Dropsy and ascites show here first." },
  { id: "fin",   x: 520, y: 150, r: 26, signs: ["fin", "haem"], part: "Fins & tail", look: "Check the edges for fraying, whitish margins and bleeding at the fin bases." },
  { id: "behav", x: 400, y: 70,  r: 20, signs: ["flash", "gill"], part: "Behaviour", look: "Gasping at the surface, flashing, lethargy, loss of appetite, swimming alone." },
];

const CASES = [
  { story: "January, Mymensingh. Water is 18 °C. Rohu and mrigal have deep, crater-like red ulcers on the flanks, but the silver carp in the same pond look fine.", options: ["eus", "mas", "ich", "khv"], answer: "eus", why: "Cool season, deep ulcers, and the Chinese carps are spared: classic EUS. Confirm with histology (granulomas plus aseptate hyphae) or Aphanomyces invadans PCR." },
  { story: "July, after three days of heavy rain. Silver carp have red heads, bleeding at the fin bases, bulging eyes and swollen bellies. The lab sees Gram-negative motile rods, oxidase positive.", options: ["col", "mas", "arg", "edw"], answer: "mas", why: "Haemorrhage, exophthalmia and dropsy after a stressful weather swing, with oxidase-positive motile rods, points to Motile Aeromonas Septicaemia." },
  { story: "Catla in a crowded, warm pond have brownish-yellow rotting gills and a pale band around the back. Long thin rods glide under the microscope. Colonies are yellow and root-like.", options: ["col", "pse", "ich", "eus"], answer: "col", why: "Gill rot, a saddleback lesion, gliding rods and rhizoid yellow colonies are the textbook signs of Flavobacterium columnare." },
  { story: "Fish keep flashing and jumping. Close up, you see 5 mm flat, disc-shaped creatures stuck to the skin, each with a small red wound.", options: ["ich", "arg", "mas", "khv"], answer: "arg", why: "Visible disc-shaped crustaceans are Argulus (fish lice). Treat the lice early because their wounds invite Aeromonas." },
  { story: "Newly introduced koi and common carp die in large numbers at 22 °C. Their eyes are sunken and their gills badly necrotic. Nothing grows on the agar plates.", options: ["khv", "col", "mas", "eus"], answer: "khv", why: "Species-restricted mass mortality, sunken eyes, gill necrosis and a negative culture suggest a virus: KHV. Only PCR or qPCR can confirm it." },
  { story: "Common carp have foul-smelling, gas-filled swellings in the muscle. The isolate is oxidase-negative and gives black-centred colonies on SS agar.", options: ["edw", "pse", "mas", "col"], answer: "edw", why: "Gas-filled putrid abscesses with an oxidase-negative, H₂S-positive isolate is Edwardsiella tarda." },
  { story: "A crowded nursery: fingerlings are covered in tiny white grains, like salt, on the skin and fins, and they rub against the bottom.", options: ["ich", "eus", "arg", "pse"], answer: "ich", why: "Salt-grain white spots on fry in a crowded nursery are Ichthyophthirius multifiliis (white spot)." },
];

/* ---------- Activity 1: survey ---------- */
const SURVEY_STEPS = [
  { n: 1, title: "Selection of study area", detail: "Choose freshwater aquaculture hubs where carp farming is concentrated, for example Mymensingh, Jashore, Rajshahi, Bogura and Cumilla. Sites are usually chosen purposively, based on production volume and outbreak reports.", tip: "A good study area covers different farm sizes and culture systems, so the results represent the whole sector." },
  { n: 2, title: "Data sources", detail: "Primary data comes straight from farmers. Secondary data comes from DoF reports, extension booklets, published papers and online material. Primary data shows real practice; secondary data gives context and lets you cross-check.", tip: "Triangulation: when three sources agree, you can trust the finding." },
  { n: 3, title: "Questionnaire survey", detail: "A structured, pre-tested questionnaire is used in face-to-face interviews. It covers farm profile, stocking, water management, which diseases farmers recognise, when outbreaks happen, treatments used (including antibiotics) and losses.", tip: "Pre-test with 5–10 farmers to catch confusing questions before the real survey." },
  { n: 4, title: "Participatory Rural Appraisal (PRA)", detail: "Group tools that let farmers lead: focus group discussions, key informant interviews, seasonal calendars of disease, problem ranking and pond/resource maps. They capture community knowledge a questionnaire misses.", tip: "PRA turns farmers from 'respondents' into co-researchers." },
  { n: 5, title: "Data management", detail: "Responses are coded, entered into a spreadsheet or SPSS/R, double-checked for entry errors, cleaned (outliers, missing values) and stored securely, anonymised.", tip: "Clean data is quiet work, but it decides whether the analysis can be trusted." },
  { n: 6, title: "Data analysis", detail: "Descriptive statistics (frequencies, percentages, means), knowledge scores, and tests of association such as chi-square or logistic regression, for example 'does training predict better disease recognition?'.", tip: "Results then point the lab team to the diseases and regions to sample first." },
];

const PRA_TOOLS = [
  { name: "Focus group discussion (FGD)", icon: "users", what: "6–10 farmers discuss guided questions together.", gives: "Shared experience of outbreaks and treatments, and local disease names." },
  { name: "Key informant interview (KII)", icon: "mic", what: "In-depth talk with well-informed people: extension officers, feed dealers, hatchery owners.", gives: "The expert view and hidden practices, such as which drugs are actually sold." },
  { name: "Seasonal calendar", icon: "calendar", what: "Farmers mark on a 12-month grid when each problem occurs.", gives: "Disease seasonality, for example EUS in winter and MAS in the monsoon." },
  { name: "Problem ranking", icon: "list", what: "Pairwise or matrix ranking of farm problems.", gives: "Which diseases farmers think matter most economically." },
  { name: "Resource / pond mapping", icon: "map", what: "The community draws ponds, canals and water sources on paper or the ground.", gives: "How water and disease might spread between farms." },
  { name: "Transect walk", icon: "footprints", what: "Researchers and farmers walk across the area, observing and asking questions.", gives: "First-hand view of pond conditions and biosecurity gaps." },
];

const QUESTIONS_GAME = [
  { q: "Don't you agree that antibiotics are bad for fish?", good: false, why: "Leading: it pushes the farmer toward 'yes'. Ask instead: 'What do you think about using antibiotics in ponds?'" },
  { q: "In the last 12 months, in which months did you see dead fish in your pond?", good: true, why: "Clear time frame, concrete event and easy to recall. It also feeds the seasonal analysis." },
  { q: "How often do you see ulcers and red gills?", good: false, why: "Double-barrelled: ulcers and red gills are two different signs. Split it into two questions." },
  { q: "Have you observed exophthalmia in your stock?", good: false, why: "Jargon. Use plain words or show a picture: 'Have you seen fish with bulging eyes?'" },
  { q: "When fish showed red spots, what did you do first? (tick all that apply)", good: true, why: "Behaviour-based and multi-select. It captures real treatment practice." },
  { q: "Do you have disease often?", good: false, why: "Vague: 'disease' and 'often' mean different things to different people. Name the signs and a time frame." },
  { q: "Who do you usually ask for advice when fish get sick? (feed dealer / DoF officer / neighbour / other)", good: true, why: "Clear options plus 'other'. It maps the information network farmers rely on." },
  { q: "You don't use banned drugs, do you?", good: false, why: "Leading and threatening, so people give the socially desirable answer. Ask neutrally and promise anonymity." },
];

/* ---------- Activity 2: lab pipeline (slide 8) ---------- */
const PIPELINE = [
  { id: "sampling", label: "Sample collection", col: 0, row: 2, lane: "field", what: "Moribund (dying) and clinically sick fish are collected from affected farms. Signs are recorded with photos, and water quality (temperature, DO, pH, ammonia) is noted.", why: "Live, sick fish give the freshest pathogens. Dead fish fill up quickly with contaminants.", how: "Keep fish alive or on ice. Label farm, date, species and signs. Aim to reach the lab within hours.", video: null },
  { id: "prep", label: "Sample preparation", col: 1, row: 2, lane: "field", what: "Aseptic necropsy: swabs and tissue from kidney, liver, spleen, gill and lesions. Part goes to culture, part to DNA extraction, part to formalin for histology.", why: "The internal organs (especially kidney) of a septicaemic fish carry the real pathogen; the skin carries passers-by.", how: "Sterilise the surface with 70% ethanol, open with sterile tools and streak kidney swabs directly.", video: null },
  { id: "qpcr", label: "Quantitative analysis (qPCR)", col: 2, row: 0, lane: "mol", what: "Real-time PCR that measures how much target DNA (pathogen load) is in the tissue, using fluorescence each cycle.", why: "Fast and sensitive. It detects pathogens that won't grow on plates (viruses, Aphanomyces) and quantifies them.", how: "Extracted DNA + primers (+ probe) + master mix. Read the Ct value against a standard curve.", video: "qpcr" },
  { id: "pcr0", label: "Qualitative analysis (conventional PCR)", col: 2, row: 1, lane: "mol", what: "End-point PCR answers yes or no: is the target DNA present? The result is read as a band on an agarose gel.", why: "Cheap, robust confirmation directly from tissue.", how: "Run ~30–35 cycles, then electrophoresis with a DNA ladder and positive and negative controls.", video: "pcr" },
  { id: "media", label: "Inoculation on selective media", col: 2, row: 3, lane: "culture", what: "Tissue is streaked onto media that favour certain bacteria, such as Rimler–Shotts (Aeromonas), Pseudomonas agar, SS agar (Edwardsiella) or Shieh agar (Flavobacterium), plus general TSA.", why: "Selective media suppress contaminants. Differential media make the suspect colony change colour.", how: "Streak for isolated colonies and incubate at about 28–30 °C for 24–48 h.", video: null },
  { id: "subculture", label: "Single colony subculture", col: 3, row: 3, lane: "culture", what: "One well-isolated colony is picked and re-streaked until the culture is pure.", why: "All downstream tests assume a single organism. Mixed cultures give nonsense.", how: "Pick with a sterile loop, re-streak 2–3 times and keep stocks in glycerol at −80 °C.", video: null },
  { id: "identify", label: "Identification of bacterial isolates", col: 4, row: 3, lane: "culture", what: "The pure isolate enters the identification hub: phenotype, molecular identity, resistance and pathogenicity.", why: "Combining methods (polyphasic identification) gives a confident name.", how: "Branches into biochemical tests, AST, molecular ID and the challenge test.", video: null },
  { id: "biochem", label: "Biochemical tests", col: 5, row: 2, lane: "culture", what: "Gram stain, oxidase, catalase, motility, indole, MR-VP, citrate, TSI/H₂S, O/F glucose and similar tests (or an API 20E kit) build a metabolic fingerprint.", why: "Cheap first-pass ID that every lab can do.", how: "See the Mystery Isolate game below.", video: "imvic" },
  { id: "ast", label: "Antibiotic susceptibility test", col: 5, row: 3, lane: "culture", what: "Kirby–Bauer disc diffusion on Mueller–Hinton agar. The zone of inhibition around each disc is measured in mm.", why: "Tells farmers which drugs will still work, and measures AMR (MAR index).", how: "0.5 McFarland lawn, antibiotic discs, about 28 °C for aquatic bacteria, then read against CLSI breakpoints.", video: "kirby" },
  { id: "molid", label: "Molecular identification", col: 5, row: 4, lane: "mol", what: "DNA is extracted from the pure isolate for sequencing and targeted PCRs.", why: "DNA identifies the organism more reliably than biochemistry.", how: "Boiling or kit extraction, then a quality check by spectrophotometer.", video: null },
  { id: "challenge", label: "Challenge test (pathogenicity)", col: 5, row: 1, lane: "culture", what: "Healthy fish are injected with the isolate to see whether it reproduces the disease (Koch's postulates).", why: "Proves the isolate is a cause, not a bystander. It also allows an LD₅₀ estimate.", how: "IP injection of a known CFU dose against PBS controls. Observe for 7–14 days, then re-isolate and confirm.", video: "koch" },
  { id: "seq", label: "DNA sequencing (16S rRNA gene)", col: 6, row: 4, lane: "mol", what: "The ~1,500 bp 16S rRNA gene is amplified with universal primers (27F/1492R) and Sanger-sequenced.", why: "The universal 'barcode' of bacteria. Compare it to GenBank with BLAST.", how: "PCR, clean-up, sequencing, trimming, then BLAST for percent identity.", video: "s16" },
  { id: "pcr", label: "PCR (species-specific & virulence genes)", col: 6, row: 5, lane: "mol", what: "Targeted primers detect species markers (e.g. gyrB for Aeromonas species) and virulence genes such as aerA, hlyA, act and ser.", why: "Shows what weapons each strain carries (Objective iv).", how: "Multiplex or single-plex PCR, then a gel read against a ladder.", video: "gel" },
  { id: "histo", label: "Histopathological analysis", col: 6, row: 1, lane: "culture", what: "Fixed tissues are processed, thin-sectioned and H&E stained to see tissue damage under the microscope.", why: "Links the pathogen to real lesions, such as EUS granulomas, gill hyperplasia or kidney necrosis.", how: "10% formalin, alcohol dehydration, xylene, paraffin, 5 µm sections, H&E, microscopy.", video: null },
  { id: "phylo", label: "Phylogenetic analysis", col: 7, row: 4, lane: "mol", what: "Sequences are aligned with reference strains and built into a tree (e.g. MEGA, Neighbor-Joining or Maximum Likelihood, 1,000 bootstraps).", why: "Reveals genetic diversity and relationships (Objective iii). Are Bangladeshi strains unique?", how: "Align (MUSCLE/ClustalW), choose a model, build the tree, then read the bootstrap support.", video: "phyloCDC" },
];
const PIPE_LINKS = [
  ["sampling", "prep"], ["prep", "qpcr"], ["prep", "pcr0"], ["prep", "media"], ["media", "subculture"], ["subculture", "identify"],
  ["identify", "biochem"], ["identify", "ast"], ["identify", "molid"], ["identify", "challenge"], ["challenge", "histo"],
  ["molid", "seq"], ["molid", "pcr"], ["seq", "phylo"],
];

const MEDIA = [
  { id: "rs", name: "Rimler–Shotts (RS) agar", target: "Aeromonas", look: "Yellow colonies (maltose fermentation)", color: "#e8c547", colony: "#f5d000", bg: "#b8742a" },
  { id: "ss", name: "Salmonella–Shigella (SS) agar", target: "Edwardsiella tarda", look: "Colourless colonies with black centres (H₂S)", color: "#e7a3a0", colony: "#222", bg: "#e7a3a0" },
  { id: "pse", name: "Pseudomonas / cetrimide agar", target: "Pseudomonas fluorescens", look: "Green-yellow pigment that fluoresces under UV", color: "#bde3c9", colony: "#9be15d", bg: "#d6eedb" },
  { id: "shieh", name: "Shieh / Anacker–Ordal agar", target: "Flavobacterium columnare", look: "Flat, yellow, spreading rhizoid (root-like) colonies", color: "#f3e7c7", colony: "#f2b705", bg: "#efe3c1" },
  { id: "tsa", name: "Tryptic soy agar (TSA)", target: "Most bacteria (general purpose)", look: "Cream, round colonies. Not selective, so contaminants grow too.", color: "#efe6cf", colony: "#f4ecd8", bg: "#e8dbb6" },
];

/* Mystery isolate biochemistry (simplified teaching profiles) */
const BIOTESTS = [
  { id: "gram", name: "Gram stain", pos: "Gram +", neg: "Gram −" },
  { id: "ox", name: "Oxidase", pos: "+ (purple)", neg: "− (no colour)" },
  { id: "cat", name: "Catalase", pos: "+ (bubbles)", neg: "− (no bubbles)" },
  { id: "ind", name: "Indole (Kovács)", pos: "+ (red ring)", neg: "− (yellow ring)" },
  { id: "h2s", name: "H₂S (TSI/SS)", pos: "+ (black)", neg: "−" },
  { id: "of", name: "O/F glucose", pos: "Fermentative", neg: "Oxidative / inert" },
  { id: "uv", name: "Fluorescent pigment (UV)", pos: "+ (glows)", neg: "−" },
];
const ORGANISMS = [
  { id: "aero", name: "Aeromonas hydrophila", p: { gram: 0, ox: 1, cat: 1, ind: 1, h2s: 0, of: 1, uv: 0 } },
  { id: "edw", name: "Edwardsiella tarda", p: { gram: 0, ox: 0, cat: 1, ind: 1, h2s: 1, of: 1, uv: 0 } },
  { id: "pse", name: "Pseudomonas fluorescens", p: { gram: 0, ox: 1, cat: 1, ind: 0, h2s: 0, of: 0, uv: 1 } },
  { id: "flavo", name: "Flavobacterium columnare", p: { gram: 0, ox: 1, cat: 1, ind: 0, h2s: 1, of: 0, uv: 0 } },
  { id: "strep", name: "Streptococcus sp.", p: { gram: 1, ox: 0, cat: 0, ind: 0, h2s: 0, of: 1, uv: 0 } },
];

/* AST — illustrative breakpoints (zone diameter mm). Real work uses current CLSI M100 / VET03–VET04 tables. */
const AST_DISCS = [
  { code: "AMP10", name: "Ampicillin 10 µg", zone: 6, s: 17, r: 13, note: "Aeromonas is intrinsically ampicillin-resistant, which is why ampicillin is added to some Aeromonas selective media." },
  { code: "TE30", name: "Tetracycline 30 µg", zone: 10, s: 15, r: 11, note: "Oxytetracycline is widely used in ponds, so resistance is common." },
  { code: "SXT25", name: "Trimethoprim-sulfa 25 µg", zone: 13, s: 16, r: 10, note: "In the intermediate zone: may work at higher exposure, but it's unreliable." },
  { code: "CIP5", name: "Ciprofloxacin 5 µg", zone: 31, s: 26, r: 21, note: "A critically important human antibiotic. Keeping it effective matters for One Health." },
  { code: "C30", name: "Chloramphenicol 30 µg", zone: 22, s: 18, r: 12, note: "Susceptible, but chloramphenicol is banned for food animals in many countries, including Bangladesh." },
  { code: "CN10", name: "Gentamicin 10 µg", zone: 18, s: 15, r: 12, note: "Susceptible." },
];

/* Virulence genes (mainly Aeromonas) */
const GENES = [
  { id: "aerA", name: "aerA", product: "Aerolysin", cls: "Toxin", fn: "Pore-forming toxin. Punches holes in red blood cells and tissue cells, causing haemorrhage and cell death.", bp: 309 },
  { id: "hlyA", name: "hlyA", product: "Haemolysin", cls: "Toxin", fn: "Lyses red blood cells and helps release iron for the bacterium.", bp: 592 },
  { id: "act", name: "act", product: "Cytotoxic enterotoxin", cls: "Toxin", fn: "Aerolysin-related toxin that damages the intestine and kills cells. Strongly linked to virulence.", bp: 232 },
  { id: "alt", name: "alt", product: "Heat-labile cytotonic enterotoxin", cls: "Toxin", fn: "Raises fluid secretion in the gut.", bp: 442 },
  { id: "ast", name: "ast", product: "Heat-stable cytotonic enterotoxin", cls: "Toxin", fn: "Heat-stable gut toxin, often found alongside alt.", bp: 331 },
  { id: "ser", name: "ser", product: "Serine protease", cls: "Enzyme", fn: "Digests tissue proteins and activates pro-aerolysin into active aerolysin.", bp: 211 },
  { id: "lip", name: "lip", product: "Lipase", cls: "Enzyme", fn: "Breaks down host lipids and membranes for nutrients.", bp: 247 },
  { id: "ela", name: "ahyB / ela", product: "Elastase", cls: "Enzyme", fn: "Degrades elastin in vessel walls and connective tissue, adding to the bleeding.", bp: 513 },
  { id: "fla", name: "fla", product: "Polar flagellin", cls: "Motility & adhesion", fn: "Builds the flagellum used to swim to and stick onto host tissue.", bp: 608 },
  { id: "ascV", name: "ascV", product: "Type III secretion system", cls: "Secretion", fn: "A molecular syringe that injects effector proteins into fish cells. Common in highly virulent strains.", bp: 750 },
];

/* Phylogeny toy dataset (hypothetical isolates) */
const TREE = {
  name: "", children: [
    { name: "", bs: 100, children: [
      { name: "", bs: 98, children: [
        { name: "", bs: 87, children: [ { name: "A. hydrophila ATCC 7966ᵀ", ref: true }, { name: "Isolate BD-03", iso: true } ] },
        { name: "", bs: 76, children: [ { name: "A. dhakensis (Dhaka)", ref: true }, { name: "Isolate BD-01", iso: true } ] },
      ]},
      { name: "", bs: 94, children: [
        { name: "", bs: 91, children: [ { name: "A. veronii", ref: true }, { name: "Isolate BD-02", iso: true }, { name: "Isolate BD-05", iso: true } ] },
        { name: "A. caviae", ref: true },
      ]},
    ]},
    { name: "Vibrio cholerae (outgroup)", ref: true, out: true },
  ],
};

/* ---------- Slide 9: work schedule (Jul 2026 – Jun 2027) ---------- */
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const GANTT = [
  { n: 1, label: "Cross-sectional study in selected freshwater aquaculture regions", short: "Field survey", from: 0, to: 8, slot: 1, detail: "Questionnaire and PRA with carp farmers. It covers both the monsoon (MAS season) and winter (EUS season)." },
  { n: 2, label: "Sampling of fish from disease-affected farms & bacterial isolation", short: "Sampling & isolation", from: 0, to: 8, slot: 2, detail: "Runs in parallel with the survey. Survey leads point the team to outbreak farms to sample." },
  { n: 3, label: "Biochemical tests of the isolated pathogens", short: "Biochemistry", from: 4, to: 9, slot: 3, detail: "Begins once enough pure isolates are banked (from November)." },
  { n: 4, label: "PCR", short: "PCR", from: 5, to: 8, slot: 4, detail: "Species-specific and virulence-gene PCR, plus 16S sequencing of confirmed isolates." },
  { n: 5, label: "Data analysis & draft writing", short: "Analysis & writing", from: 10, to: 11, slot: 5, detail: "Combine the survey, lab and molecular data. Build the phylogeny, profiles and final report." },
];

/* ---------- Knowledge graph ---------- */
const GRAPH_GROUPS = {
  project:  { label: "Project",    color: "var(--g-project)" },
  host:     { label: "Host fish",  color: "var(--g-host)" },
  pathogen: { label: "Pathogen",   color: "var(--g-pathogen)" },
  disease:  { label: "Disease",    color: "var(--g-disease)" },
  sign:     { label: "Clinical sign", color: "var(--g-sign)" },
  method:   { label: "Method",     color: "var(--g-method)" },
  gene:     { label: "Gene",       color: "var(--g-gene)" },
  concept:  { label: "Concept",    color: "var(--g-concept)" },
};

const GRAPH_NODES = [
  ["proj", "Carp Disease Project", "project", "Investigation and molecular characterization of diseases affecting cultured carps in Bangladesh (BFRI, 2026–27)."],
  ["obj1", "Obj i · Clinical & pathology", "project", "Characterise the clinical signs and tissue lesions of carp diseases."],
  ["obj2", "Obj ii · Isolate & identify", "project", "Isolate and identify the major pathogens from diseased carps."],
  ["obj3", "Obj iii · Molecular diversity", "project", "Determine the genetic diversity and relationships of the pathogens."],
  ["obj4", "Obj iv · Virulence genes", "project", "Profile the virulence-associated genes of the bacterial pathogens."],
  ["act1", "Activity 1 · Farmer survey", "project", "Survey of farmers' knowledge of carp diseases (questionnaire + PRA)."],
  ["act2", "Activity 2 · Lab investigation", "project", "Isolation and identification of infectious pathogens in IMCs."],
  ["db", "Baseline molecular database", "project", "Expected output: a reference set of sequences and profiles of carp pathogens in Bangladesh."],
  ["strat", "Diagnosis & control strategy", "project", "Expected output: evidence-based strategies for diagnosis, surveillance and control."],
  ["rohu", "Rohu", "host", "Labeo rohita, a column-feeding Indian major carp."],
  ["catla", "Catla", "host", "Catla catla, a surface-feeding Indian major carp."],
  ["mrigal", "Mrigal", "host", "Cirrhinus mrigala, a bottom-feeding Indian major carp."],
  ["silver", "Silver carp", "host", "Hypophthalmichthys molitrix, a phytoplankton filter feeder."],
  ["common", "Common carp", "host", "Cyprinus carpio, a bottom omnivore and the host of KHV."],
  ["grass", "Grass carp", "host", "Ctenopharyngodon idella, a herbivore."],
  ["aero", "Aeromonas hydrophila", "pathogen", "Gram-negative motile rod, the leading bacterial pathogen of carps."],
  ["aver", "Aeromonas veronii", "pathogen", "A close relative of A. hydrophila. Hard to tell apart by 16S alone."],
  ["apha", "Aphanomyces invadans", "pathogen", "The oomycete that causes EUS."],
  ["flavo", "Flavobacterium columnare", "pathogen", "Gliding bacterium that causes columnaris."],
  ["edwp", "Edwardsiella tarda", "pathogen", "Oxidase-negative, H₂S-positive rod. Zoonotic."],
  ["pseu", "Pseudomonas fluorescens", "pathogen", "Fluorescent, oxidase-positive non-fermenter."],
  ["argp", "Argulus", "pathogen", "Fish louse, a crustacean parasite."],
  ["ichp", "Ichthyophthirius", "pathogen", "Ciliate that causes white spot."],
  ["khvp", "CyHV-3 (KHV)", "pathogen", "Herpesvirus of common carp and koi."],
  ["mas", "MAS", "disease", "Motile Aeromonas Septicaemia: haemorrhages, ulcers, dropsy."],
  ["eus", "EUS", "disease", "Epizootic Ulcerative Syndrome, a cool-season ulcer disease."],
  ["col", "Columnaris", "disease", "Gill rot and saddleback lesions."],
  ["edw", "Edwardsiellosis", "disease", "Putrefactive gas-filled abscesses."],
  ["pse", "Pseudomonas septicaemia", "disease", "Haemorrhagic septicaemia by Pseudomonas."],
  ["arg", "Argulosis", "disease", "Fish lice infestation."],
  ["ich", "White spot", "disease", "Ichthyophthiriasis."],
  ["khv", "KHV disease", "disease", "Mass mortality of common carp and koi."],
  ["s_haem", "Haemorrhage", "sign", "Red patches from leaking vessels."],
  ["s_ulcer", "Ulcers", "sign", "Open skin lesions."],
  ["s_eye", "Pop-eye", "sign", "Exophthalmia."],
  ["s_belly", "Dropsy", "sign", "Fluid-swollen abdomen."],
  ["s_gill", "Gill necrosis", "sign", "Rotting, pale gills."],
  ["s_fin", "Fin rot", "sign", "Eroded fins."],
  ["s_spot", "White spots", "sign", "Salt-grain dots."],
  ["survey", "Questionnaire", "method", "Structured farmer interviews."],
  ["pra", "PRA tools", "method", "FGD, KII, seasonal calendar, ranking, mapping."],
  ["media", "Selective media", "method", "RS, SS, Shieh, cetrimide agar."],
  ["biochem", "Biochemical tests", "method", "Gram, oxidase, IMViC, TSI, O/F."],
  ["ast", "AST (disc diffusion)", "method", "Kirby–Bauer antibiotic susceptibility."],
  ["qpcr", "qPCR", "method", "Real-time quantitative PCR."],
  ["pcr", "Conventional PCR", "method", "End-point PCR read on a gel."],
  ["seq", "16S rRNA sequencing", "method", "Universal bacterial barcode gene."],
  ["blast", "BLAST", "method", "Compares a sequence with GenBank."],
  ["phylo", "Phylogenetics", "method", "Tree-building from aligned sequences."],
  ["chal", "Challenge test", "method", "Experimental infection to prove pathogenicity."],
  ["histo", "Histopathology", "method", "H&E-stained tissue sections."],
  ["g_aerA", "aerA", "gene", "Aerolysin, a pore-forming toxin."],
  ["g_hly", "hlyA", "gene", "Haemolysin."],
  ["g_act", "act", "gene", "Cytotoxic enterotoxin."],
  ["g_ser", "ser", "gene", "Serine protease."],
  ["g_fla", "fla", "gene", "Flagellin."],
  ["amr", "Antimicrobial resistance", "concept", "Bacteria surviving drugs that once killed them."],
  ["onehealth", "One Health", "concept", "Human, animal and environmental health are linked."],
  ["mar", "MAR index", "concept", "Resistant antibiotics ÷ antibiotics tested. Above 0.2 means high antibiotic pressure."],
  ["koch", "Koch's postulates", "concept", "Criteria to prove a microbe causes a disease."],
  ["ct", "Ct value", "concept", "qPCR cycle where fluorescence crosses the threshold. Lower Ct means more DNA."],
  ["stress", "Stress & water quality", "concept", "Low DO, ammonia, temperature swings and crowding trigger outbreaks."],
  ["food", "Food security", "concept", "Fish supplies much of Bangladesh's animal protein."],
  ["poly", "Carp polyculture", "concept", "Stocking species that use different water layers."],
];

const GRAPH_LINKS = [
  ["proj", "obj1"], ["proj", "obj2"], ["proj", "obj3"], ["proj", "obj4"], ["proj", "act1"], ["proj", "act2"], ["proj", "food"],
  ["obj3", "db"], ["obj4", "strat"], ["obj1", "strat"], ["obj2", "db"],
  ["act1", "survey"], ["act1", "pra"], ["obj1", "act1"], ["obj1", "histo"], ["obj1", "chal"],
  ["act2", "media"], ["act2", "biochem"], ["act2", "ast"], ["act2", "qpcr"], ["act2", "pcr"], ["act2", "seq"], ["act2", "chal"], ["act2", "histo"],
  ["obj2", "media"], ["obj2", "biochem"], ["obj2", "qpcr"], ["obj3", "seq"], ["obj3", "phylo"], ["obj4", "pcr"],
  ["seq", "blast"], ["seq", "phylo"], ["qpcr", "ct"], ["chal", "koch"], ["ast", "mar"], ["ast", "amr"], ["amr", "onehealth"], ["mar", "amr"],
  ["poly", "rohu"], ["poly", "catla"], ["poly", "mrigal"], ["poly", "silver"], ["poly", "grass"], ["poly", "common"], ["proj", "poly"],
  ["aero", "mas"], ["aver", "mas"], ["apha", "eus"], ["flavo", "col"], ["edwp", "edw"], ["pseu", "pse"], ["argp", "arg"], ["ichp", "ich"], ["khvp", "khv"],
  ["mas", "s_haem"], ["mas", "s_ulcer"], ["mas", "s_eye"], ["mas", "s_belly"], ["mas", "s_fin"],
  ["eus", "s_ulcer"], ["col", "s_gill"], ["col", "s_fin"], ["edw", "s_belly"], ["pse", "s_haem"], ["pse", "s_fin"],
  ["arg", "s_haem"], ["ich", "s_spot"], ["khv", "s_gill"], ["khv", "s_eye"],
  ["eus", "rohu"], ["eus", "mrigal"], ["mas", "silver"], ["mas", "rohu"], ["col", "catla"], ["col", "grass"], ["khv", "common"], ["edw", "common"],
  ["aero", "g_aerA"], ["aero", "g_hly"], ["aero", "g_act"], ["aero", "g_ser"], ["aero", "g_fla"], ["aver", "g_aerA"], ["aver", "g_act"],
  ["obj4", "g_aerA"], ["pcr", "g_aerA"], ["pcr", "g_act"],
  ["media", "aero"], ["media", "edwp"], ["media", "flavo"], ["biochem", "aero"], ["biochem", "pseu"],
  ["qpcr", "khvp"], ["qpcr", "apha"], ["histo", "eus"], ["seq", "aero"], ["seq", "aver"],
  ["stress", "mas"], ["stress", "col"], ["stress", "eus"], ["stress", "ich"], ["ich", "rohu"], ["arg", "mas"],
  ["amr", "aero"], ["food", "poly"],
];

/* ---------- Flashcards ---------- */
const FLASHCARDS = [
  ["Carps", "What are the three Indian major carps (IMCs)?", "Rohu (Labeo rohita), Catla (Catla catla) and Mrigal (Cirrhinus mrigala)."],
  ["Carps", "Why stock several carp species together (polyculture)?", "Each species feeds in a different layer (surface, column, bottom), so the pond's food is used efficiently with little competition."],
  ["Carps", "Which carp is the surface zooplankton feeder?", "Catla, with its large head and upturned mouth."],
  ["Carps", "Which carp is the main host of koi herpesvirus?", "Common carp (Cyprinus carpio) and its ornamental form, koi."],
  ["Diseases", "What causes Motile Aeromonas Septicaemia?", "Motile Aeromonas species, mainly A. hydrophila and A. veronii, usually triggered by stress."],
  ["Diseases", "What causes EUS?", "The oomycete (water mould) Aphanomyces invadans."],
  ["Diseases", "Which season does EUS strike in Bangladesh?", "The cool season, roughly December to February, when water temperature drops."],
  ["Diseases", "Which carps resist EUS?", "Chinese carps such as silver and grass carp (tilapia too). Rohu and mrigal are susceptible."],
  ["Diseases", "What is exophthalmia?", "Pop-eye: bulging eyes caused by fluid or gas behind the eye."],
  ["Diseases", "What is dropsy?", "A fluid-filled, swollen abdomen (ascites), often with raised 'pine-cone' scales."],
  ["Diseases", "What does a saddleback lesion suggest?", "Columnaris, caused by Flavobacterium columnare."],
  ["Diseases", "Why are Aeromonas infections called 'opportunistic'?", "Aeromonads live in every pond and cause disease mostly when fish are stressed or injured."],
  ["Survey", "What does PRA stand for?", "Participatory Rural Appraisal: group tools where communities analyse their own situation."],
  ["Survey", "Name three PRA tools.", "Focus group discussion, key informant interview, seasonal calendar (also problem ranking, mapping, transect walk)."],
  ["Survey", "Primary vs secondary data?", "Primary data is collected first-hand (here, from farmers). Secondary data comes from existing sources (reports, booklets, papers)."],
  ["Survey", "What is a double-barrelled question?", "A question that asks two things at once, e.g. 'ulcers and red gills', so the answer is ambiguous."],
  ["Lab", "Why sample moribund rather than dead fish?", "Dead fish are quickly invaded by contaminants. Live, sick fish still carry the real pathogen in pure form."],
  ["Lab", "What does a selective medium do?", "It suppresses unwanted organisms so the target can grow. Differential media also change colour to flag the target."],
  ["Lab", "Why subculture a single colony?", "To get a pure culture. Every later test assumes only one organism."],
  ["Lab", "Rimler–Shotts agar is used for…?", "Isolating Aeromonas, which forms yellow colonies."],
  ["Lab", "What does a positive oxidase test look like?", "A purple or blue colour within seconds, meaning the bacterium has cytochrome c oxidase."],
  ["Lab", "What does IMViC stand for?", "Indole, Methyl red, Voges–Proskauer, Citrate (the 'i' is for pronunciation)."],
  ["Lab", "What does the red ring in an indole test mean?", "Indole is present (positive): the bacterium breaks down tryptophan. The ring forms with Kovács reagent."],
  ["Lab", "Kirby–Bauer test uses which agar?", "Mueller–Hinton agar, with a lawn standardised to 0.5 McFarland."],
  ["Lab", "What is a zone of inhibition?", "The clear ring around an antibiotic disc where bacteria could not grow. A bigger ring means more susceptible."],
  ["Lab", "How is the MAR index calculated?", "Number of antibiotics the isolate resists ÷ number tested. Above 0.2 suggests a high-risk, antibiotic-exposed source."],
  ["Lab", "What do Koch's postulates require?", "Find the microbe in diseased hosts, isolate it pure, reproduce the disease in healthy hosts, and re-isolate the same microbe."],
  ["Lab", "Why include a PBS-injected control group in a challenge test?", "To show that the injection itself, or handling, doesn't cause the disease or deaths."],
  ["Lab", "What do haematoxylin and eosin stain?", "Haematoxylin stains nuclei blue-purple. Eosin stains cytoplasm and connective tissue pink."],
  ["Molecular", "qPCR vs conventional PCR?", "qPCR measures fluorescence every cycle and can quantify DNA. Conventional PCR gives a yes/no band on a gel at the end."],
  ["Molecular", "What is a Ct value?", "The cycle at which fluorescence crosses the threshold. A lower Ct means more starting DNA."],
  ["Molecular", "About how many cycles separate a 10-fold dilution in qPCR?", "About 3.3 cycles (at 100% efficiency), because 2³·³ ≈ 10."],
  ["Molecular", "SYBR Green vs TaqMan probe?", "SYBR Green binds any double-stranded DNA (cheap, needs a melt curve). TaqMan probes bind one specific sequence."],
  ["Molecular", "Why is the 16S rRNA gene used for bacterial ID?", "All bacteria have it. Conserved regions allow universal primers, and variable regions (V1–V9) distinguish taxa."],
  ["Molecular", "Common universal 16S primers?", "27F and 1492R, which amplify about 1,500 bp."],
  ["Molecular", "Limitation of 16S for Aeromonas?", "Aeromonas species share very similar 16S sequences, so genes like gyrB or rpoD are needed to resolve species."],
  ["Molecular", "What is BLAST?", "NCBI's tool that compares your sequence with GenBank and reports the best matches with percent identity."],
  ["Molecular", "What does a bootstrap value on a tree mean?", "The percentage of resampled trees that support a branch. 70% or more is usually considered good support."],
  ["Molecular", "What does aerA encode?", "Aerolysin, a pore-forming toxin that causes haemolysis and tissue damage."],
  ["Molecular", "Does carrying a virulence gene prove a strain is virulent?", "No. The gene must also be expressed. The challenge test confirms real pathogenicity."],
  ["AMR", "What is One Health?", "The idea that human, animal and environmental health are interconnected and must be managed together."],
  ["AMR", "How does pond antibiotic use affect people?", "It selects resistant bacteria and genes that spread through water, food and handling to humans."],
  ["Timeline", "When does the PCR work run?", "December 2026 to March 2027."],
  ["Timeline", "Which activities run across the whole first 9 months?", "The cross-sectional field survey and the fish sampling and isolation (Jul–Mar)."],
];

/* ---------- Quizzes ---------- */
const QUIZ = [
  { t: "Carps", q: "Which species is a bottom feeder?", a: ["Catla", "Silver carp", "Mrigal", "Grass carp"], c: 2, e: "Mrigal feeds on detritus at the pond bottom." },
  { t: "Carps", q: "'IMC' in the slides stands for…", a: ["Integrated Molecular Characterization", "Indian Major Carps", "Infectious Microbial Colonies", "Inland Marine Culture"], c: 1, e: "Activity 2 studies pathogens in IMCs: rohu, catla and mrigal." },
  { t: "Carps", q: "Why is polyculture efficient?", a: ["All species eat the same pellet", "Species use different water layers and foods", "It prevents all disease", "It needs no fertiliser"], c: 1, e: "Niche partitioning: surface, column and bottom feeders share the pond without competing." },
  { t: "Justification", q: "Which is NOT one of the four justifications on slide 2?", a: ["Economic losses & food security", "Limits of conventional diagnostics", "Mitigating AMR", "Developing a fish vaccine"], c: 3, e: "The four are economics/food security, diagnostic limits, AMR and policy/capacity building." },
  { t: "Justification", q: "Why does a precise diagnosis help fight AMR?", a: ["It lets farmers use more antibiotics", "It enables targeted treatment instead of guesswork", "It kills resistant genes", "It isn't related"], c: 1, e: "Knowing the pathogen and its antibiogram avoids blind, unnecessary antibiotic use." },
  { t: "Objectives", q: "Objective iii is about…", a: ["Farmer knowledge", "Molecular diversity & genetic characteristics", "Clinical signs", "Pond water quality"], c: 1, e: "Obj iii is answered by 16S sequencing and phylogenetics." },
  { t: "Objectives", q: "Which method directly answers Objective iv (virulence genes)?", a: ["Questionnaire", "PCR for virulence genes", "Selective media", "Seasonal calendar"], c: 1, e: "Targeted PCR detects genes such as aerA, hlyA, act and ser." },
  { t: "Diseases", q: "Deep ulcers in rohu during winter, while silver carp are unaffected, most likely mean…", a: ["MAS", "EUS", "KHV", "White spot"], c: 1, e: "EUS is a cool-season disease, and Chinese carps are resistant." },
  { t: "Diseases", q: "Aphanomyces invadans is a…", a: ["Bacterium", "Virus", "Oomycete (water mould)", "Crustacean"], c: 2, e: "It is an oomycete, related to algae, not a true fungus." },
  { t: "Diseases", q: "Bulging eyes are called…", a: ["Ascites", "Exophthalmia", "Hyperplasia", "Septicaemia"], c: 1, e: "Exophthalmia, or pop-eye." },
  { t: "Diseases", q: "Which pathogen cannot be grown on agar plates?", a: ["Aeromonas hydrophila", "Edwardsiella tarda", "Cyprinid herpesvirus 3", "Pseudomonas fluorescens"], c: 2, e: "Viruses need living cells. Use PCR or qPCR (or cell culture) instead." },
  { t: "Diseases", q: "A pale saddle-shaped band near the dorsal fin suggests…", a: ["Columnaris", "Argulosis", "EUS", "KHV"], c: 0, e: "The saddleback lesion is typical of Flavobacterium columnare." },
  { t: "Survey", q: "Which is a PRA tool?", a: ["Gel electrophoresis", "Seasonal calendar", "BLAST", "Gram stain"], c: 1, e: "Seasonal calendars let farmers map when diseases occur." },
  { t: "Survey", q: "'How often do you see ulcers and red gills?' is a poor question because it is…", a: ["Leading", "Double-barrelled", "Too short", "Open-ended"], c: 1, e: "It asks about two different signs at once." },
  { t: "Survey", q: "Reports, booklets and internet materials are…", a: ["Primary data", "Secondary data", "PRA tools", "Biochemical data"], c: 1, e: "Slide 5 lists them as secondary data. Farmers are the primary source." },
  { t: "Lab", q: "Why pick a single colony and subculture it?", a: ["To make more colours", "To obtain a pure culture", "To kill contaminants with heat", "To measure DNA"], c: 1, e: "All identification tests assume a single, pure organism." },
  { t: "Lab", q: "On Rimler–Shotts agar, Aeromonas typically forms…", a: ["Black colonies", "Yellow colonies", "Green fluorescent colonies", "No growth"], c: 1, e: "Maltose fermentation turns Aeromonas colonies yellow." },
  { t: "Lab", q: "Which organism is oxidase-negative and H₂S-positive?", a: ["Aeromonas hydrophila", "Pseudomonas fluorescens", "Edwardsiella tarda", "Flavobacterium columnare"], c: 2, e: "Edwardsiella tarda: oxidase −, H₂S + (black colonies)." },
  { t: "Lab", q: "In the Kirby–Bauer test, a LARGER zone of inhibition means the bacterium is…", a: ["More resistant", "More susceptible", "Dead already", "Contaminated"], c: 1, e: "A larger clear zone means the antibiotic stopped growth farther from the disc." },
  { t: "Lab", q: "An isolate resists 3 of 10 antibiotics tested. Its MAR index is…", a: ["0.03", "0.3", "3", "30"], c: 1, e: "MAR = 3/10 = 0.3, which is above 0.2 and so a high-risk source." },
  { t: "Lab", q: "The challenge test is mainly done to…", a: ["Measure DNA quantity", "Confirm the isolate actually causes disease", "Test farmer knowledge", "Stain tissues"], c: 1, e: "It fulfils Koch's postulates by reproducing the disease in healthy fish." },
  { t: "Lab", q: "In H&E staining, nuclei appear…", a: ["Pink", "Blue-purple", "Green", "Black"], c: 1, e: "Haematoxylin stains nuclei blue-purple. Eosin stains cytoplasm pink." },
  { t: "Molecular", q: "A sample with Ct 18 compared with Ct 28 has…", a: ["Less target DNA", "About 1,000× more target DNA", "The same amount", "No DNA"], c: 1, e: "10 cycles is about 2¹⁰ ≈ 1,000-fold more starting template." },
  { t: "Molecular", q: "Conventional PCR results are usually read by…", a: ["Fluorescence each cycle", "Agarose gel electrophoresis", "Colony colour", "Zone diameter"], c: 1, e: "Bands are compared against a DNA ladder." },
  { t: "Molecular", q: "The 16S rRNA gene is about…", a: ["150 bp", "1,500 bp", "15,000 bp", "1.5 million bp"], c: 1, e: "About 1,500 bp, with nine variable regions." },
  { t: "Molecular", q: "BLAST returns 99.8% identity to A. hydrophila. The best interpretation is…", a: ["Definitely A. hydrophila", "Aeromonas, but confirm species with gyrB/rpoD", "Not a bacterium", "A virus"], c: 1, e: "Aeromonas species have very similar 16S, so use housekeeping genes for species-level calls." },
  { t: "Molecular", q: "In a phylogenetic tree, two isolates that share a recent branch point are…", a: ["Distantly related", "Closely related", "Identical by definition", "Outgroups"], c: 1, e: "A shared recent common ancestor means close relationship." },
  { t: "Molecular", q: "aerA encodes…", a: ["Flagellin", "Aerolysin toxin", "16S rRNA", "Antibiotic resistance"], c: 1, e: "Aerolysin is a pore-forming haemolytic toxin." },
  { t: "Molecular", q: "Fun fact: which Aeromonas species is named after Bangladesh's capital?", a: ["A. veronii", "A. caviae", "A. dhakensis", "A. bengalensis"], c: 2, e: "A. dhakensis was first described from isolates collected in Dhaka." },
  { t: "Timeline", q: "When does data analysis & draft writing happen?", a: ["Jul–Sep 2026", "Nov 2026–Apr 2027", "May–Jun 2027", "Dec 2026–Mar 2027"], c: 2, e: "The final two months of the 2026–27 work year." },
  { t: "Timeline", q: "Biochemical tests run from…", a: ["Jul to Mar", "Nov to Apr", "Dec to Mar", "May to Jun"], c: 1, e: "Nov 2026 to Apr 2027, starting once isolates are banked." },
];

const GLOSSARY = [
  ["Ascites", "Fluid build-up in the abdomen."], ["Bootstrap", "Resampling test of support for tree branches."], ["CFU", "Colony-forming unit, a count of viable bacteria."],
  ["Ct / Cq", "qPCR threshold cycle."], ["Epizootic", "A disease outbreak in an animal population (the animal 'epidemic')."], ["Granuloma", "A ball of immune cells walling off an invader (e.g. EUS hyphae)."],
  ["Haemolysis", "Destruction of red blood cells."], ["LD₅₀", "Dose that kills 50% of test animals."], ["McFarland standard", "A turbidity reference for bacterial density (0.5 ≈ 1.5×10⁸ CFU/mL)."],
  ["Moribund", "Dying. These are the best fish to sample."], ["Necropsy", "Post-mortem examination of an animal."], ["Oomycete", "A fungus-like 'water mould'."],
  ["Pathogenicity", "The ability to cause disease."], ["Septicaemia", "Infection spread through the bloodstream."], ["Virulence", "The degree of pathogenicity: how severe the disease is."],
  ["Zoonotic", "Can pass from animals to humans."], ["Amplicon", "The DNA fragment copied by PCR."], ["Primer", "A short DNA piece that marks where PCR starts copying."],
];

/* ---------- Gamification ---------- */
const LEVELS = [
  { xp: 0, name: "Fish Egg", emoji: "🥚" },
  { xp: 100, name: "Fry", emoji: "🐟" },
  { xp: 250, name: "Fingerling", emoji: "🐠" },
  { xp: 500, name: "Juvenile Carp", emoji: "🎏" },
  { xp: 850, name: "Adult Carp", emoji: "🐡" },
  { xp: 1300, name: "Fish Doctor", emoji: "🩺" },
  { xp: 1900, name: "Master Pathologist", emoji: "🏆" },
];

const BADGES = [
  { id: "first", name: "First Splash", desc: "Explore 3 sections", icon: "💧" },
  { id: "explorer", name: "Pond Explorer", desc: "Visit every section", icon: "🧭" },
  { id: "pond", name: "Pond Architect", desc: "Place every carp in its feeding layer", icon: "🏞️" },
  { id: "calc", name: "Number Cruncher", desc: "Use the outbreak-loss calculator", icon: "🧮" },
  { id: "inspector", name: "Fish Inspector", desc: "Inspect every body region of the fish", icon: "🔍" },
  { id: "doctor", name: "Fish Doctor", desc: "Solve 5 diagnosis cases", icon: "🩺" },
  { id: "surveyor", name: "Survey Designer", desc: "Judge all the questionnaire questions", icon: "📝" },
  { id: "pipeline", name: "Pipeline Pro", desc: "Open every step of the lab workflow", icon: "🧪" },
  { id: "hunter", name: "Microbe Hunter", desc: "Identify 3 mystery isolates", icon: "🦠" },
  { id: "ast", name: "Zone Reader", desc: "Read the antibiotic plate", icon: "💊" },
  { id: "pcr", name: "Cycle Master", desc: "Read a Ct value correctly", icon: "📈" },
  { id: "gel", name: "Gel Whisperer", desc: "Score the virulence gel", icon: "🧬" },
  { id: "tree", name: "Tree Climber", desc: "Answer the phylogeny puzzle", icon: "🌳" },
  { id: "time", name: "Time Keeper", desc: "Scrub through all 12 months", icon: "📅" },
  { id: "graph", name: "Connector", desc: "Explore 15 knowledge-graph nodes", icon: "🕸️" },
  { id: "cards", name: "Memory Bank", desc: "Master 20 flashcards", icon: "🃏" },
  { id: "quiz", name: "Quiz Ace", desc: "Score 80%+ on a quiz round", icon: "🎯" },
  { id: "boss", name: "Boss Slayer", desc: "Beat the Boss Battle", icon: "⚔️" },
  { id: "watcher", name: "Binge Learner", desc: "Open 3 videos", icon: "🎬" },
];

const SECTIONS = [
  { id: "home", label: "Start", slide: "Slide 1" },
  { id: "carps", label: "Meet the Carps", slide: "Slide 1" },
  { id: "why", label: "Justification", slide: "Slide 2" },
  { id: "objectives", label: "Objectives & Outputs", slide: "Slides 3–4" },
  { id: "atlas", label: "Disease Atlas", slide: "Background" },
  { id: "survey", label: "Activity 1: Survey", slide: "Slides 5–7" },
  { id: "lab", label: "Activity 2: Lab", slide: "Slide 8" },
  { id: "molecular", label: "Molecular Lab", slide: "Slide 8" },
  { id: "timeline", label: "Work Schedule", slide: "Slide 9" },
  { id: "graph", label: "Knowledge Graph", slide: "All" },
  { id: "flashcards", label: "Flashcards", slide: "All" },
  { id: "quiz", label: "Quiz Arena", slide: "All" },
  { id: "library", label: "Library", slide: "All" },
];
