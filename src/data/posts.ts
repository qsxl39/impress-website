// src/data/posts.ts
export interface Post {
  id: number
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  image: string
  tags: string[]
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'The Golden Age of Cassette Futurism',
    date: '2099-03-15',
    author: 'Commander Alex Novak',
    excerpt: 'Exploring the tactile joy of analog data storage in a digital world...',
    content:
      "In an era dominated by seamless data streams and intangible cloud storage, there's a growing movement rediscovering the charm of cassette tapes. Not just for music, but as a medium for data. Cassette Futurism imagines a world where this 80s tech evolved, offering high-capacity, durable storage with a unique aesthetic. We delve into the modding community, the challenges of magnetic tape in the 22nd century, and the philosophical implications of tangible data.",
    image: './assets/images/post1.jpg',
    tags: ['analog', 'retro tech', 'data storage'],
  },
  {
    id: 2,
    title: 'CRT Monitors: More Than Just Nostalgia?',
    date: '2099-04-02',
    author: 'Dr. Evelyn Reed',
    excerpt: 'The warm glow and deep blacks of CRTs find new life in specialized fields...',
    content:
      'While flat panels dominate the consumer market, Cathode Ray Tube technology persists. Its near-zero latency and superior black levels make it ideal for retro gaming, specialized medical imaging, and even some high-frequency trading visualization. We explore the physics behind the electron gun, the challenges of manufacturing and maintaining CRTs, and interview artisans who still repair these glass behemoths.',
    image: './assets/images/post2.jpg',
    tags: ['display tech', 'crt', 'retro gaming', 'hardware'],
  },
  {
    id: 3,
    title: "Navigating the Neon Seas: A Guide to Neo-Tokyo's Undernet",
    date: '2099-04-21',
    author: 'Cipher',
    excerpt: 'Beyond the gleaming corporate networks lies a hidden digital world...',
    content:
      'The official city network is bright and controlled, but the Undernet pulses with raw data, pirate broadcasts, and encrypted communications. This guide provides the essential tools and protocols for navigating these hidden digital channels, from accessing hidden forums to understanding the etiquette of the data streams. Disclaimer: Exploration is at your own risk.',
    image: './assets/images/post3.jpg',
    tags: ['cyberpunk', 'networking', 'neo-tokyo', 'digital underground'],
  },
  // ... (Add the other 7 posts here following the same structure)
  {
    id: 4,
    title: 'Synthesizers of the Star Lanes',
    date: '2099-05-10',
    author: 'Melody Astra',
    excerpt: 'The sounds that score the journeys between worlds...',
    content:
      "From the haunting theremin echoes in asteroid fields to the complex polyrhythms of Jovian trade hubs, spaceship crews have always relied on music. We explore the evolution of portable synthesizers designed for zero-G environments, the unique sonic palettes inspired by deep space phenomena, and the most popular 'star shanties' of the current cycle.",
    image: './assets/images/post4.jpg',
    tags: ['music', 'synthesizers', 'space travel', 'sound design'],
  },
  {
    id: 5,
    title: 'The Aesthetics of Abandoned Space Stations',
    date: '2099-05-28',
    author: 'Rust Walker',
    excerpt: 'Finding beauty in the decaying orbits and silent corridors...',
    content:
      'Derelict orbital platforms and forgotten moon bases hold a unique, melancholic beauty. This photo-essay captures the interplay of advanced, aging technology with the silence of the void. We examine the textures of micrometeorite impacts on solar panels, the frozen condensation patterns on viewports, and the ghosts of human presence in forgotten hab-modules.',
    image: './assets/images/post5.jpg',
    tags: ['exploration', 'space stations', 'photography', 'decay'],
  },
  {
    id: 6,
    title: 'Powering the Future with Retro-Nuclear',
    date: '2099-06-12',
    author: 'Dr. Aris Thorne',
    excerpt: 'Revisiting mid-20th-century atomic designs for decentralized power...',
    content:
      "While fusion remains the long-term goal, compact, reliable fission reactors based on surprisingly old designs are revolutionizing local power grids. These 'AtomPacks,' inspired by concepts from the 1950s and 60s, offer decades of power for off-grid settlements and deep-space probes. We discuss the safety innovations, the fuel cycle, and the retro-cool design language making nuclear power popular again.",
    image: './assets/images/post6.jpg',
    tags: ['energy', 'nuclear power', 'engineering', 'retro design'],
  },
  {
    id: 7,
    title: 'Vacuum Tube Computing in the Quantum Age',
    date: '2099-07-01',
    author: 'Professor Emeritus Edgar Kline',
    excerpt: 'Why glowing glass valves still have a place in high-radiation environments...',
    content:
      "Modern processors are miracles of miniaturization, but incredibly vulnerable to cosmic rays and electromagnetic pulses. For critical systems in deep space or hazardous environments, vacuum tube technology offers unparalleled resilience. We look at modern 'nuvistor' tubes, hybrid tube-solid state systems, and the surprising computational power achievable with this century-old tech.",
    image: './assets/images/post7.jpg',
    tags: ['computing', 'vacuum tubes', 'hardware', 'space tech', 'resilience'],
  },
  {
    id: 8,
    title: 'Chrome Dreams: The Resurgence of Analog Vehicles',
    date: '2099-07-19',
    author: 'Gearhead Gary',
    excerpt: 'In an age of autonomous pods, some prefer the feel of the wheel...',
    content:
      'Automated transport networks are efficient, but lack soul. A subculture is thriving, restoring and customizing ground vehicles – hovercars, mag-lev bikes, even wheeled classics. They value manual control, the roar of unconventional engines (fusion-converted turbines, anyone?), and the sheer style of polished chrome and custom bodywork. Join us at the Wasteland Rally.',
    image: './assets/images/post8.jpg',
    tags: ['vehicles', 'cyberpunk', 'customization', 'analog', 'transport'],
  },
  {
    id: 9,
    title: 'Holographic Interfaces: Beyond the Sci-Fi Tropes',
    date: '2099-08-05',
    author: 'Interface Architect Lena Petrova',
    excerpt: 'Moving from flashy visuals to practical, tactile holographic controls...',
    content:
      "Early holography was all style, no substance. Modern 'hapti-grams' provide tactile feedback, allowing for intuitive manipulation of 3D data and controls. We explore the underlying laser and acoustic technologies, the design principles for effective holographic UIs, and applications ranging from starship navigation bridges to remote surgery.",
    image: './assets/images/post9.jpg',
    tags: ['interface design', 'holography', 'ui/ux', 'future tech'],
  },
  {
    id: 10,
    title: 'The Philosophy of Rewritable Realities',
    date: '2099-08-22',
    author: 'Thinker Unit 734',
    excerpt: 'If memory and perception can be edited, what is the self?',
    content:
      'Advanced neural interfaces allow for the editing and augmentation of memories and sensory input, creating personalized realities. While offering therapeutic benefits and unparalleled entertainment, this raises profound questions. If our past can be curated and our present filtered, where does the authentic self reside? We explore the ethics, the potential, and the paradoxes of rewritable consciousness.',
    image: './assets/images/post10.jpg',
    tags: ['philosophy', 'cybernetics', 'consciousness', 'ethics', 'future studies'],
  },
]
