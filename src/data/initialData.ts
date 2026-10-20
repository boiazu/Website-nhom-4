import { Member, Project, Inquiry } from '../types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    name: 'Elena Vance',
    title: 'Senior Principal Architect',
    accessLevel: 'Director',
    status: 'Active',
    avatar: '/src/assets/images/member_avatar_elena_1792481273066.jpg',
    department: 'Architecture',
    location: 'Zurich & Milan',
    email: 'elena.vance@aureliaguild.design',
    phone: '+41 44 215 8900',
    bio: 'Pioneering structural timber and parametric envelopes that synthesize alpine geology with bioclimatic precision.',
    extendedBio: 'Elena Vance has spearheaded monumental civic and residential commissions across Central Europe for over fourteen years. Educated at ETH Zurich and Harvard GSD, she fuses organic tactile materials with high-tolerance robotic timber joinery. Her work focuses on climate-adaptive facades that breathe with ambient thermodynamic shifts.',
    skills: ['Bioclimatic Engineering', 'Robotic Timber Joinery', 'Parametric Modeling', 'Urban Morphology', 'Sustainable Masterplanning'],
    projectIds: ['proj-1', 'proj-3'],
    achievements: [
      { year: '2025', title: 'Pritzker European Gold Laureate', organization: 'Architectural Institute of Europe' },
      { year: '2023', title: 'Timber Innovation Fellow', organization: 'ETH Zurich Sustainable Lab' },
      { year: '2021', title: 'Best Public Pavilion', organization: 'Venice Architecture Biennale' }
    ],
    quote: 'Architecture must not conquer nature; it must become the resonance chamber in which nature reveals its quietest geometry.',
    joinDate: 'March 2018'
  },
  {
    id: 'mem-2',
    name: 'Marcus Thorne',
    title: 'Director of Computational Design',
    accessLevel: 'Director',
    status: 'Active',
    avatar: '/src/assets/images/member_avatar_marcus_1792481273346.jpg',
    department: 'Computational Design',
    location: 'London & New York',
    email: 'marcus.thorne@aureliaguild.design',
    phone: '+44 20 7946 0912',
    bio: 'Developing algorithmic synthesis engines and spatial generative lattices for next-generation architectural materiality.',
    extendedBio: 'Marcus leads the Guild\'s Computational Intelligence Unit. Previously a visiting researcher at MIT Media Lab, he pioneered generative structural topology optimization that eliminates 42% of embedded concrete mass while multiplying torsional rigidity. He is widely recognized for translating mathematical fractals into habitable spatial realities.',
    skills: ['Algorithmic Topology Optimization', 'Generative Acoustics', 'Computational Geometry', 'C++ / Rust Spatial Engines', 'Photonic Lattice Design'],
    projectIds: ['proj-2', 'proj-3'],
    achievements: [
      { year: '2024', title: 'Computational Design Master Award', organization: 'Royal Institute of British Architects' },
      { year: '2022', title: 'SIGGRAPH Spatial Innovation Prize', organization: 'ACM SIGGRAPH' }
    ],
    quote: 'When mathematics becomes structure, geometry dissolves the line between synthetic invention and organic growth.',
    joinDate: 'January 2019'
  },
  {
    id: 'mem-3',
    name: 'Kaelen Mori',
    title: 'Lead Spatial Acoustician & Sensory Architect',
    accessLevel: 'Senior Principal',
    status: 'In Field',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    department: 'Spatial & Acoustic',
    location: 'Kyoto, Japan',
    email: 'kaelen.mori@aureliaguild.design',
    phone: '+81 75 320 4411',
    bio: 'Sculpting auditory resonance, psychoacoustic reverberation, and silence in contemporary sacred and civic spaces.',
    extendedBio: 'Trained at Tokyo University of the Arts and IRCAM Paris, Kaelen designs experiential acoustic volumes where micro-perforated timber panels and porous basalt stone calibrate sound wave dispersion. Her installations heighten human presence through subtle frequency modulation.',
    skills: ['Acoustic Wavefield Synthesis', 'Sonic Material Profiling', 'Spatial Reverberation Modeling', 'Psychoacoustic Tuning', 'Ceramic Resonance Tiles'],
    projectIds: ['proj-1', 'proj-4'],
    achievements: [
      { year: '2024', title: 'Grand Prix for Spatial Sound', organization: 'Kyoto Cultural Foundation' },
      { year: '2020', title: 'Sonic Architecture Fellowship', organization: 'IRCAM Paris' }
    ],
    quote: 'Silence is not the absence of sound, but the exact balance where space learns to listen to its inhabitant.',
    joinDate: 'June 2020'
  },
  {
    id: 'mem-4',
    name: 'Dr. Seraphina Voss',
    title: 'Head of Sustainable Material Science',
    accessLevel: 'Senior Principal',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
    department: 'Sustainable Materials',
    location: 'Stockholm & Berlin',
    email: 'seraphina.voss@aureliaguild.design',
    phone: '+46 8 410 7720',
    bio: 'Synthesizing mycelium composites, bio-mineralized basalt, and carbon-negative binding matrices.',
    extendedBio: 'Dr. Voss holds a doctorate in Biomimetic Chemistry from Max Planck Institute. Her lab develops structural biocomposites with negative cradle-to-gate carbon footprints that petrify into stone-hard fireproof envelopes under atmospheric humidity.',
    skills: ['Bio-Mineralization', 'Mycelium Structural Panels', 'Life Cycle Carbon Audit', 'Basalt Fiber Compositions', 'Self-Healing Bio-Concrete'],
    projectIds: ['proj-1', 'proj-2'],
    achievements: [
      { year: '2025', title: 'Global Circular Economy Medal', organization: 'Nordic Clean Design Forum' },
      { year: '2023', title: 'Green Chemistry Breakthrough', organization: 'European Science Council' }
    ],
    quote: 'The materials of our future are not mined from the earth; they are cultivated in rhythm with it.',
    joinDate: 'November 2021'
  },
  {
    id: 'mem-5',
    name: 'Julian St. Claire',
    title: 'Creative Strategy & Guild Curator',
    accessLevel: 'Lead Architect',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    department: 'Creative Strategy',
    location: 'Paris & Geneva',
    email: 'julian.stclaire@aureliaguild.design',
    phone: '+33 1 42 68 5500',
    bio: 'Curating institutional commissions, spatial narrative choreography, and philosophical positioning for the Guild.',
    extendedBio: 'Julian brings eighteen years of editorial curation, high-level museum stewardship, and strategic patronage advisory. He orchestrates the philosophical dialog between our patrons, municipal governments, and the Guild\'s experimental engineering units.',
    skills: ['Commission Curation', 'Spatial Dramaturgy', 'Monograph Publishing', 'Cultural Patronage Strategy', 'Institutional Governance'],
    projectIds: ['proj-3', 'proj-4'],
    achievements: [
      { year: '2024', title: 'Chevalier des Arts et des Lettres', organization: 'Ministry of Culture, France' },
      { year: '2021', title: 'Excellence in Architectural Curation', organization: 'Centre Pompidou' }
    ],
    quote: 'True luxury is uncompromising longevity—spaces that grow more resonant with every passing century.',
    joinDate: 'September 2019'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Solarium Alpine Pavilion',
    tagline: 'Continuous curved glulam shell and triple-glazed alpine sanctuary overlooking Lake Brienz.',
    category: 'Sustainable Architecture',
    status: 'Active Commission',
    progress: 82,
    leadMemberId: 'mem-1',
    contributorIds: ['mem-3', 'mem-4'],
    location: 'Bernese Oberland, Switzerland',
    client: 'Helvetia Alpine Heritage Trust',
    year: '2026',
    coverImage: '/src/assets/images/project_solarium_1792481271537.jpg',
    description: 'An organic curved timber and high-transmittance glass pavilion designed as an alpine retreat and acoustic observatory. Engineered to withstand high snow loads through continuous hyperbolic paraboloid curved glulam arches while harvesting 115% of annual thermal demand via passive geothermal bedrock loops.',
    milestones: [
      { id: 'm-1', title: 'Sub-structure geothermal bedrock anchors', completed: true, dueDate: 'Completed Jan 2026' },
      { id: 'm-2', title: 'Robotic precision glulam arch erection', completed: true, dueDate: 'Completed Mar 2026' },
      { id: 'm-3', title: 'Curved argon-insulated facade installation', completed: true, dueDate: 'Completed Apr 2026' },
      { id: 'm-4', title: 'Acoustic micro-slat calibration & interior stone', completed: false, dueDate: 'Target: Nov 2026' },
      { id: 'm-5', title: 'Patron commissioning & handover', completed: false, dueDate: 'Target: Dec 2026' }
    ],
    updates: [
      { id: 'u-1', date: 'October 14, 2026', author: 'Elena Vance', note: 'Triple-curved perimeter glazing passed strict -30°C thermal deflection tests in Lucerne chamber. Zero condensation registered.' },
      { id: 'u-2', date: 'September 28, 2026', author: 'Kaelen Mori', note: 'Acoustic chamber tuning completed for the lakeside salon; reverberation time calibrated to an intimate 0.85s.' }
    ],
    deliverables: ['Hyperbolic timber glulam frame', 'Zero-emission geothermal heating', 'Custom acoustic timber interior', 'Patron viewing terrace']
  },
  {
    id: 'proj-2',
    title: 'Axon Spatial Computing Interface',
    tagline: 'Precision forged titanium and optic glass spatial interaction instrument for architecture ateliers.',
    category: 'Spatial Computing',
    status: 'Detailed Engineering',
    progress: 68,
    leadMemberId: 'mem-2',
    contributorIds: ['mem-4'],
    location: 'Zurich & San Francisco',
    client: 'Axon Spatial Systems AG',
    year: '2026–2027',
    coverImage: '/src/assets/images/project_spatial_1792481272316.jpg',
    description: 'A revolutionary spatial hardware object engineered in titanium alloy and optical sapphire crystal. Designed specifically for architects and volumetric sculptors to manipulate 1:1 holographic structural simulations with haptic micro-vibrational feedback.',
    milestones: [
      { id: 'm-21', title: 'Haptic actuator resonance optimization', completed: true, dueDate: 'Completed Feb 2026' },
      { id: 'm-22', title: 'Micro-OLED optical prism alignment', completed: true, dueDate: 'Completed Jun 2026' },
      { id: 'm-23', title: 'Ergonomic counterweight headband testing', completed: false, dueDate: 'Target: Nov 2026' },
      { id: 'm-24', title: 'Volume production validation run (PVT)', completed: false, dueDate: 'Target: Feb 2027' }
    ],
    updates: [
      { id: 'u-21', date: 'October 08, 2026', author: 'Marcus Thorne', note: 'Firmware latency between spatial gaze tracking and volumetric surface deformation reduced to 3.2 milliseconds.' }
    ],
    deliverables: ['Titanium unibody chassis', 'Dual 4K micro-OLED optical modules', 'Magnetic haptic interaction wand', 'Spatial OS architecture suite']
  },
  {
    id: 'proj-3',
    title: 'The Monolith Civic Auditorium',
    tagline: 'Monolithic basalt stone and brass civic assembly hall for musical performances and council deliberations.',
    category: 'Civic Pavilion',
    status: 'Schematic Design',
    progress: 45,
    leadMemberId: 'mem-1',
    contributorIds: ['mem-2', 'mem-5'],
    location: 'Reykjavik, Iceland',
    client: 'Nordic Cultural Senate',
    year: '2026–2028',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'Carved out of local volcanic basalt and finished with brushed marine-grade brass, this 850-seat civic auditorium features an adjustable acoustic shell capable of morphing physical volume for chamber music or spoken parliamentary debate.',
    milestones: [
      { id: 'm-31', title: 'Acoustic shell volume geometry simulation', completed: true, dueDate: 'Completed Jul 2026' },
      { id: 'm-32', title: 'Basalt quarry selection & structural testing', completed: false, dueDate: 'Target: Nov 2026' },
      { id: 'm-33', title: 'Municipal environmental permitting approval', completed: false, dueDate: 'Target: Jan 2027' }
    ],
    updates: [
      { id: 'u-31', date: 'October 12, 2026', author: 'Julian St. Claire', note: 'Public presentation to Reykjavik Architectural Council received unanimous unanimous approval for phase 2 detailing.' }
    ],
    deliverables: ['850-seat acoustic concert hall', 'Motorized kinetic brass reflectors', 'Natural daylight light-well atrium']
  },
  {
    id: 'proj-4',
    title: 'Kyoto Biophilic Tea Pavilion & Sanctuary',
    tagline: 'Charred cedar Yakisugi, tatami acoustic mats, and moss stone water courtyard.',
    category: 'Biophilic Interiors',
    status: 'Final Fabrication',
    progress: 94,
    leadMemberId: 'mem-3',
    contributorIds: ['mem-5'],
    location: 'Higashiyama, Kyoto',
    client: 'Murata Cultural Trust',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'A serene contemplation sanctuary uniting 400-year-old traditional joinery with micro-perforated acoustic baffling. Rainwater cascades down tuned bronze chains to generate specific relaxing white noise frequencies inside the tearoom.',
    milestones: [
      { id: 'm-41', title: 'Traditional carpentry dry-fit assembly', completed: true, dueDate: 'Completed Apr 2026' },
      { id: 'm-42', title: 'Yakisugi charring process verification', completed: true, dueDate: 'Completed Aug 2026' },
      { id: 'm-43', title: 'Water acoustics courtyard tuning', completed: true, dueDate: 'Completed Sep 2026' },
      { id: 'm-44', title: 'Grand tea master dedication ceremony', completed: false, dueDate: 'Target: Nov 2026' }
    ],
    updates: [
      { id: 'u-41', date: 'October 18, 2026', author: 'Kaelen Mori', note: 'Bronze chain rain harmonics tuned to 432Hz fundamental resonance. Final lighting controls installed.' }
    ],
    deliverables: ['Artisan charred Yakisugi pavilion', 'Bronze chain water soundscape', 'Woven acoustic tatami flooring']
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    referenceNumber: 'AUR-2026-0941',
    name: 'Lord Alistair Sterling',
    email: 'sterling.family.office@sterlingholdings.co.uk',
    organization: 'Sterling Heritage Foundation',
    serviceType: 'Sustainable Architecture',
    targetMemberId: 'mem-1',
    targetProjectId: 'proj-1',
    budget: '$5M - $10M',
    urgency: 'Medium (Next 3–6 Months)',
    message: 'We are acquiring a 14-hectare coastal promontory in the Scottish Hebrides and wish to commission a private climate-resilient observatory and residential wing similar to the Solarium Pavilion.',
    status: 'Under Consideration',
    createdAt: '2026-10-18T14:32:00Z',
    internalNotes: 'Elena Vance reviewed preliminary brief; site survey to be scheduled in November.'
  },
  {
    id: 'inq-2',
    referenceNumber: 'AUR-2026-0942',
    name: 'Chiara Valenti',
    email: 'c.valenti@fondazione-triennale.it',
    organization: 'Milan Triennale Biennale Committee',
    serviceType: 'Spatial Computing',
    targetMemberId: 'mem-2',
    targetProjectId: 'proj-2',
    budget: '$1M - $2.5M',
    urgency: 'Immediate (Next 30 Days)',
    message: 'Inviting Aurelia Guild to create the centerpiece interactive spatial pavilion for the 2027 Triennale di Milano, focusing on tactile computational matter.',
    status: 'Pending Review',
    createdAt: '2026-10-19T09:15:00Z',
    internalNotes: 'Requires review by Marcus and Julian.'
  }
];

export const AVATAR_PRESETS = [
  {
    id: 'av-elena',
    label: 'Elena Vance (Studio)',
    url: '/src/assets/images/member_avatar_elena_1792481273066.jpg'
  },
  {
    id: 'av-marcus',
    label: 'Marcus Thorne (Director)',
    url: '/src/assets/images/member_avatar_marcus_1792481273346.jpg'
  },
  {
    id: 'av-3',
    label: 'Architectural Minimalist',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'av-4',
    label: 'Materials Scientist',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'av-5',
    label: 'Curator & Strategist',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'av-6',
    label: 'Kinetic Sculptor',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'av-7',
    label: 'Nordic Envelope Designer',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80'
  }
];
