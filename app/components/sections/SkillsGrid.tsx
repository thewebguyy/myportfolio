'use client'

import { motion } from 'framer-motion'

const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: "primary" },
      { name: "TypeScript", level: "primary" },
      { name: "Tailwind CSS", level: "primary" },
      { name: "Framer Motion", level: "proficient" },
      { name: "Redux / Zustand", level: "proficient" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: "primary" },
      { name: "Python / FastAPI", level: "proficient" },
      { name: "PostgreSQL", level: "primary" },
      { name: "Redis", level: "primary" },
      { name: "MongoDB", level: "proficient" }
    ]
  },
  {
    category: "Infrastructure & DevOps",
    items: [
      { name: "Docker & Kubernetes", level: "proficient" },
      { name: "AWS / Google Cloud", level: "proficient" },
      { name: "CI/CD Pipelines", level: "primary" },
      { name: "Terraform", level: "learning" },
      { name: "Nginx", level: "proficient" }
    ]
  },
  {
    category: "AI & Integrations",
    items: [
      { name: "OpenAI API", level: "primary" },
      { name: "LangChain", level: "proficient" },
      { name: "Vector Databases", level: "proficient" },
      { name: "Prompt Engineering", level: "primary" },
      { name: "LLM Orchestration", level: "proficient" }
    ]
  },
  {
    category: "Tooling",
    items: [
      { name: "Git / GitHub", level: "primary" },
      { name: "Jest / Cypress", level: "proficient" },
      { name: "Postman", level: "primary" },
      { name: "Sentry", level: "proficient" },
      { name: "Vercel", level: "primary" }
    ]
  },
  {
    category: "Currently exploring",
    items: [
      { name: "Rust", level: "learning" },
      { name: "WebAssembly", level: "learning" },
      { name: "Solidity", level: "learning" },
      { name: "GraphQL Engine", level: "learning" }
    ]
  }
]

export function SkillsGrid() {
  return (
    <section id="skills" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label mb-4 block"
          >
            Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 text-white mb-4"
          >
            How I build
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {SKILLS.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-sans font-medium text-[16px] text-white border-l-2 border-primary pl-3 mb-6">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3">
                    <div 
                      className={`w-1 h-1 rounded-full ${
                        skill.level === 'primary' ? 'bg-primary' : 
                        skill.level === 'proficient' ? 'bg-secondary' : 
                        'bg-surface-2'
                      }`}
                    />
                    <span className="font-mono text-[13px] text-text-secondary">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[14px] text-text-muted mt-20"
        >
          5 years of production experience. Always learning.
        </motion.p>
      </div>
    </section>
  )
}
