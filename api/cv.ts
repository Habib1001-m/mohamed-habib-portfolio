const CV_LINES = {
  onePage: [
    "Mohamed Habib",
    "Full-Stack Developer & Product Builder",
    "Cairo, Egypt | mohamedhabib49.mh@gmail.com | +20 112 696 2972",
    "Portfolio: mohamed-habib-portfolio-opal.vercel.app",
    "GitHub: github.com/Habib1001-m | LinkedIn: linkedin.com/in/mohamed-habib49",
    "",
    "Professional Summary",
    "Full-Stack Developer and Product Builder focused on privacy-first tools, bilingual web products,",
    "automation workflows, and practical AI-assisted internal systems. Background combines technical",
    "support, digital marketing, and self-directed software development to build useful, maintainable",
    "systems around real workflows.",
    "",
    "Core Skills",
    "Frontend: TypeScript, React, Vite, Tailwind CSS, Three.js, Next.js, RTL/LTR interfaces",
    "Backend/Infra: Python, FastAPI-style APIs, PostgreSQL, Redis, Docker, GitHub Actions, Vercel",
    "Automation/AI: Workflow automation, AI-assisted workflows, MCP-style tooling, memory patterns",
    "Product/Ops: Product thinking, technical documentation, SEO, email marketing, analytics, support",
    "",
    "Selected Work",
    "QuickShed v0.7.0 - Privacy-first browser utility product",
    "Built around client-side processing, bilingual Arabic/English usage, and practical text/data workflows.",
    "Technologies: Next.js, TypeScript, Tailwind CSS, PWA, Browser APIs | quickshed.vercel.app",
    "",
    "Mohamed Habib Portfolio - Bilingual personal portfolio",
    "Built with React, TypeScript, Vite, Tailwind CSS, Three.js, GitHub Actions, and Vercel.",
    "Improved through audit-driven sprints: mobile nav, language persistence, metadata, and links.",
    "",
    "SIEVE Research OS - Evidence-based decision workflow",
    "Designed to organize screening, evaluation, governance, evidence trails, and decision gates.",
    "",
    "Experience",
    "Product Builder & Independent Developer | Self-Employed, Cairo | 2022 - Present",
    "Digital Marketing Specialist | Freelance, Egypt | Nov 2020 - Present",
    "Senior Technical Support Specialist | Orange, Egypt | Jan 2016 - Jan 2020",
    "",
    "Education & Certifications",
    "BA, English / Language Arts Teacher Education, Faculty of Arts, 2009",
    "Udacity Digital Marketing Professional Nanodegree | Microsoft Networking & Telecommunications",
    "MCITP | MCTS | Social Media Marketing & Email Marketing",
  ],
  detailed: [
    "Mohamed Habib",
    "Full-Stack Developer & Product Builder",
    "Cairo, Egypt | mohamedhabib49.mh@gmail.com | +20 112 696 2972",
    "Portfolio: mohamed-habib-portfolio-opal.vercel.app",
    "GitHub: github.com/Habib1001-m | LinkedIn: linkedin.com/in/mohamed-habib49",
    "",
    "Professional Summary",
    "Full-Stack Developer and Product Builder focused on privacy-first tools, bilingual web products, automation",
    "workflows, and practical AI-assisted internal systems. Technical support taught me how systems fail, how",
    "users struggle, and why reliability matters. Digital marketing taught me how people think, how attention",
    "works, and why useful products need clear communication.",
    "",
    "Today, I build practical digital systems: browser-based tools, bilingual web products, evidence-based",
    "research workflows, local AI-assisted tooling, and private backend/data workflow experiments.",
    "",
    "Technical Skills",
    "Frontend: TypeScript, React, Vite, Tailwind CSS, Three.js, Next.js, Responsive UI, RTL/LTR interfaces",
    "Backend & APIs: Python, FastAPI-style APIs, REST API design, data processing, backend workflow design",
    "Databases & Infrastructure: PostgreSQL, Redis, Docker, GitHub, GitHub Actions, Vercel, deployments",
    "Automation & AI: Workflow automation, MCP-style tooling, local AI workflows, memory systems, agents",
    "Product & Ops: Product thinking, technical documentation, evidence workflows, SEO, analytics, support",
    "",
    "Selected Projects",
    "QuickShed v0.7.0 | Privacy-first browser-based utility product | quickshed.vercel.app",
    "- Built a privacy-first browser utility product for developers and technical users.",
    "- Designed around bilingual Arabic/English usage and fast access to practical developer utilities.",
    "- Technologies: Next.js, TypeScript, Tailwind CSS, PWA, Browser APIs.",
    "",
    "Mohamed Habib Portfolio | Bilingual personal portfolio",
    "- Built a modern SPA using React, TypeScript, Vite, Tailwind CSS, and Three.js.",
    "- Implemented Arabic/English language support with RTL/LTR direction handling.",
    "- Used GitHub Actions and Vercel deployment workflow; improved through audit-driven sprints.",
    "",
    "SIEVE Research OS | Evidence-based research and decision workflow",
    "- Designed a workflow concept for organizing research, screening, evaluation, and governance.",
    "- Structured complex research into phases, criteria, evidence trails, and decision gates.",
    "",
    "AI-assisted Workflow Systems | Internal tooling and workflow experiments",
    "- Explored ways to make AI tools useful inside structured workflows rather than isolated chat sessions.",
    "- Focused on traceability, decision support, and practical automation.",
    "",
    "Private Event-driven Research Systems | Backend/data workflow experiments",
    "- Explored backend workflow patterns using Python and FastAPI-style architecture.",
    "- Worked with queue, caching, database thinking, recoverability, and observable process design.",
    "",
    "Professional Experience",
    "Product Builder & Independent Developer | Self-Employed, Cairo, Egypt | 2022 - Present",
    "- Built bilingual web products and internal systems across automation and AI-assisted workflows.",
    "- Used product thinking and systems reliability thinking to build around real workflows rather than demos.",
    "",
    "Digital Marketing Specialist | Freelance, Egypt | Nov 2020 - Present",
    "- Worked across content strategy, SEO/SMO, email marketing, analytics, and digital campaign execution.",
    "",
    "Senior Technical Support Specialist | Orange, Egypt | Jan 2016 - Jan 2020",
    "- Troubleshot network, hardware, software, and access issues; provided remote support.",
  ],
};

const escapePdf = (value: string) => value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const buildPdf = (lines: string[], title: string) => {
  const contentLines = [
    "BT",
    "/F1 16 Tf",
    "48 790 Td",
    `(${escapePdf(title)}) Tj`,
    "0 -28 Td",
    "/F1 9.5 Tf",
    ...lines.map((line) => {
      const safe = line.length > 110 ? `${line.slice(0, 107)}...` : line;
      return `(${escapePdf(safe)}) Tj 0 -14 Td`;
    }),
    "ET",
  ];

  const stream = contentLines.join("\n");
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${Buffer.byteLength(stream, "ascii")} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += object;
  }

  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
};

export default function handler(req: any, res: any) {
  const type = req.query?.type === "detailed" ? "detailed" : "onePage";
  const title = type === "detailed" ? "Mohamed Habib - Detailed CV" : "Mohamed Habib - One Page CV";
  const filename = type === "detailed" ? "Mohamed_Habib_Detailed_CV.pdf" : "Mohamed_Habib_One_Page_CV.pdf";
  const pdf = buildPdf(CV_LINES[type], title);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).send(Buffer.from(pdf, "ascii"));
}
