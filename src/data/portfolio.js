export const portfolioConfig = {
  personal: {
    name: "ilhamddy",
    initials: "IM",
    role: "Frontend Developer & IT Consultant",
    bio: "Saya adalah seorang Frontend Developer & IT Consultant yang berpengalaman dalam membangun produk digital dari nol hingga siap rilis. Saya menggabungkan kemampuan teknis dengan pemahaman bisnis untuk menghasilkan solusi yang relevan, cepat, dan berdampak.",
    detailedBio: [
      "Saya adalah seorang Frontend Developer & IT Consultant yang berpengalaman dalam membangun produk digital dari nol hingga siap rilis. Dengan lebih dari 3 tahun pengalaman, saya menggabungkan kemampuan teknis dengan pemahaman bisnis untuk menghasilkan solusi yang relevan dan berdampak.",
      "Berbasis di Indonesia, saya bekerja dengan klien lokal dan internasional — mulai dari startup hingga perusahaan enterprise — untuk memastikan produk digital mereka tampil optimal di semua platform."
    ],
    availability: "Open to Work",
    location: "Indonesia",
    email: "hello@ilhamddy.com",
    phone: "+62 812 3456 7890",
    phoneUrl: "https://wa.me/6281234567890",
    stats: [
      { num: "3+", label: "Tahun Exp" },
      { num: "40+", label: "Proyek" },
      { num: "20+", label: "Klien" },
    ],
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/in/ilhamddy", desc: "Koneksi profesional" },
      { label: "GitHub", href: "https://github.com/ilhamddy", desc: "Proyek open-source" },
      { label: "Instagram", href: "https://instagram.com/ilhamddy", desc: "Galeri aktivitas" },
    ]
  },
  
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],

  skills: [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "HTML/CSS"] },
    { category: "Tools", items: ["Git", "Figma", "VS Code", "Vercel", "Postman"] },
    { category: "Consulting", items: ["IT Strategy", "System Analysis", "Network Setup", "Tech Audit"] },
  ],

  experiences: [
    {
      year: "2023 – Sekarang",
      role: "Frontend Developer & IT Consultant",
      company: "Freelance",
      desc: "Membangun solusi web modern dan memberikan konsultasi IT untuk berbagai klien bisnis.",
    },
    {
      year: "2022 – 2023",
      role: "Frontend Developer",
      company: "Startup Teknologi",
      desc: "Mengembangkan antarmuka pengguna yang responsif dan performa tinggi menggunakan React dan Next.js.",
    },
    {
      year: "2021 – 2022",
      role: "Junior Web Developer",
      company: "Digital Agency",
      desc: "Membantu membangun landing page dan dashboard untuk klien dari berbagai industri.",
    },
  ],

  services: [
    {
      no: "01",
      title: "Frontend Development",
      desc: "Membangun antarmuka web yang modern, cepat, dan responsif menggunakan teknologi terkini. Dari landing page sederhana hingga aplikasi web yang kompleks.",
      features: [
        "React & Next.js Development",
        "Responsive & Mobile-First Design",
        "Performance Optimization",
        "Component Library Integration",
        "SEO-Friendly Architecture",
        "Tailwind CSS Styling",
      ],
    },
    {
      no: "02",
      title: "IT Consulting",
      desc: "Membantu bisnis Anda membuat keputusan teknologi yang tepat. Dari audit sistem hingga perencanaan infrastruktur digital jangka panjang.",
      features: [
        "IT Strategy & Roadmap",
        "System Architecture Review",
        "Technology Stack Selection",
        "Digital Transformation",
        "Network & Infrastructure",
        "Security Assessment",
      ],
    },
    {
      no: "03",
      title: "Web Design & UI/UX",
      desc: "Merancang tampilan visual yang menarik dan intuitif. Fokus pada pengalaman pengguna yang seamless dan estetika brand yang konsisten.",
      features: [
        "UI Design & Prototyping",
        "User Experience Research",
        "Brand Visual Identity",
        "Design System Creation",
        "Figma Wireframing",
        "Responsive Layouts",
      ],
    },
    {
      no: "04",
      title: "Maintenance & Support",
      desc: "Memastikan produk digital Anda terus berjalan optimal. Layanan pemeliharaan rutin, update fitur, dan penanganan bug secara cepat.",
      features: [
        "Regular Code Maintenance",
        "Bug Fixing & Debugging",
        "Feature Updates",
        "Performance Monitoring",
        "Security Patches",
        "Technical Documentation",
      ],
    },
  ],

  process: [
    { step: "01", title: "Discovery", desc: "Memahami kebutuhan, tujuan, dan target pengguna proyek Anda." },
    { step: "02", title: "Planning", desc: "Merancang arsitektur, timeline, dan strategi pengembangan." },
    { step: "03", title: "Design", desc: "Membuat wireframe dan desain visual yang sesuai brand." },
    { step: "04", title: "Build", desc: "Pengembangan produk dengan standar kode yang bersih dan maintainable." },
    { step: "05", title: "Test", desc: "Quality assurance menyeluruh di berbagai perangkat dan browser." },
    { step: "06", title: "Launch", desc: "Deployment dan monitoring pasca rilis untuk memastikan performa optimal." },
  ],

  categories: ["All", "Web App", "Landing Page", "IT Consulting", "E-Commerce"],

  projects: [
    {
      id: 1,
      title: "Dashboard Analytics",
      category: "Web App",
      year: "2024",
      client: "Startup Fintech",
      desc: "Dashboard analitik real-time untuk monitoring performa bisnis dengan visualisasi data interaktif.",
      tech: ["Next.js", "Tailwind", "Recharts", "TypeScript"],
      image: "/projects/dashboard-analytics.svg",
      color: "bg-night-bordeaux-800 text-night-bordeaux-50 dark:bg-dark-cyan-900 dark:text-dark-cyan-100",
      size: "large",
    },
    {
      id: 2,
      title: "Brand Identity Site",
      category: "Landing Page",
      year: "2024",
      client: "Creative Agency",
      desc: "Landing page premium yang mencerminkan identitas brand dengan animasi yang halus dan konversi tinggi.",
      tech: ["React", "Framer Motion", "Tailwind"],
      image: "/projects/brand-identity-site.svg",
      color: "bg-night-bordeaux-100 border border-night-bordeaux-300 text-night-bordeaux-950 dark:bg-dark-cyan-800 dark:border-dark-cyan-600 dark:text-dark-cyan-50",
      size: "normal",
    },
    {
      id: 3,
      title: "Enterprise Infra Setup",
      category: "IT Consulting",
      year: "2024",
      client: "Perusahaan Manufaktur",
      desc: "Perencanaan dan implementasi infrastruktur IT untuk perusahaan dengan 200+ karyawan.",
      tech: ["Network Architecture", "Cloud Setup", "Security"],
      image: "/projects/enterprise-infra-setup.svg",
      color: "bg-night-bordeaux-200 border border-night-bordeaux-400 text-night-bordeaux-950 dark:bg-dark-cyan-700 dark:border-dark-cyan-500 dark:text-dark-cyan-50",
      size: "normal",
    },
    {
      id: 4,
      title: "Online Store Platform",
      category: "E-Commerce",
      year: "2023",
      client: "Fashion Brand",
      desc: "Platform e-commerce lengkap dengan sistem manajemen produk, pembayaran, dan dashboard admin.",
      tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      image: "/projects/online-store-platform.svg",
      color: "bg-night-bordeaux-700 text-night-bordeaux-50 dark:bg-dark-cyan-950 dark:text-dark-cyan-100",
      size: "large",
    },
    {
      id: 5,
      title: "SaaS Onboarding Flow",
      category: "Web App",
      year: "2023",
      client: "Tech Startup",
      desc: "Alur onboarding multi-step yang meningkatkan user activation rate hingga 40%.",
      tech: ["React", "Tailwind", "Zustand"],
      image: "/projects/saas-onboarding-flow.svg",
      color: "bg-night-bordeaux-50 border border-night-bordeaux-300 text-night-bordeaux-900 dark:bg-dark-cyan-900 dark:border-dark-cyan-700 dark:text-dark-cyan-100",
      size: "normal",
    },
    {
      id: 6,
      title: "Company Profile Redesign",
      category: "Landing Page",
      year: "2023",
      client: "Firma Hukum",
      desc: "Redesain total website perusahaan dengan pendekatan modern dan profesional.",
      tech: ["Next.js", "Sanity CMS", "Tailwind"],
      image: "/projects/company-profile-redesign.svg",
      color: "bg-night-bordeaux-300 border border-night-bordeaux-500 text-night-bordeaux-950 dark:bg-dark-cyan-800 dark:border-dark-cyan-500 dark:text-dark-cyan-50",
      size: "normal",
    },
  ],
  heroSlides: [
    {
      tagline: "Frontend Development",
      titleLine1: "WE CRAFT MODERN",
      titleLine2: "DIGITAL VALUE",
      desc: "Membangun solusi web modern dan performa tinggi menggunakan React dan Next.js dengan visual estetis yang memukau klien.",
      ctaText: "Lihat Karya",
      ctaLink: "/portfolio"
    },
    {
      tagline: "IT Consulting",
      titleLine1: "ALIGNING SYSTEM &",
      titleLine2: "BUSINESS LOGIC",
      desc: "Memberikan rekomendasi teknologi yang tepat untuk efisiensi bisnis, audit arsitektur sistem, dan manajemen infrastruktur digital.",
      ctaText: "Diskusi Strategi",
      ctaLink: "/contact"
    },
    {
      tagline: "UI/UX Design",
      titleLine1: "CREATING SEAMLESS",
      titleLine2: "USER JOURNEYS",
      desc: "Merancang wireframe, mockup, dan prototype dengan detail presisi tinggi untuk memastikan konversi pengguna yang maksimal.",
      ctaText: "Lihat Layanan",
      ctaLink: "/services"
    }
  ]
};
