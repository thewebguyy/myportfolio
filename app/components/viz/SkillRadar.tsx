'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

/**
 * Skill Radar Chart Component
 * Interactive visualization of technical proficiency across different domains
 * Demonstrates data visualization skills and design sensibility
 */
export function SkillRadar() {
  const chartRef = useRef<ChartJS<'radar'>>(null)

  // Skill categories and proficiency levels (0-100)
  const skillData = {
    labels: [
      'Frontend (React/Next.js)',
      'Backend (Node.js/Express)',
      'Databases (PostgreSQL/Redis)',
      'System Design & Architecture',
      'AI/ML Integration',
      'DevOps & Cloud (Vercel/AWS)',
    ],
    datasets: [
      {
        label: 'Core Mastery',
        data: [95, 90, 85, 80, 75, 70],
        backgroundColor: 'rgba(234, 179, 124, 0.2)',
        borderColor: 'rgba(234, 179, 124, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(234, 179, 124, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(234, 179, 124, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Actively Learning',
        data: [50, 45, 55, 70, 85, 60],
        backgroundColor: 'rgba(35, 150, 127, 0.2)',
        borderColor: 'rgba(35, 150, 127, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(35, 150, 127, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(35, 150, 127, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          display: false,
          stepSize: 20,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          circular: true,
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          padding: 15,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 20,
          font: {
            size: 13,
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(234, 179, 124, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.r}%`
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
  }

  // Detailed skill breakdown
  const skillBreakdown = [
    {
      category: 'Core Mastery',
      color: 'primary',
      skills: [
        { name: 'React & Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Node.js & Express', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'REST APIs', level: 95 },
        { name: 'WebSockets', level: 85 },
      ],
    },
    {
      category: 'Currently Exploring',
      color: 'secondary',
      skills: [
        { name: 'Edge Computing', level: 60 },
        { name: 'AI Agents', level: 70 },
        { name: 'WebAssembly', level: 50 },
        { name: 'Rust', level: 45 },
        { name: 'GraphQL', level: 65 },
        { name: 'Microservices', level: 75 },
      ],
    },
  ]

  return (
    <section className="section bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Technical Proficiency
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Tech Stack <span className="gradient-text">Visualization</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive breakdown of my technical expertise across different domains.
            Hover over the chart to see detailed proficiency levels.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-12"
          >
            <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
              <Radar ref={chartRef} data={skillData} options={options} />
            </div>

            {/* Chart Legend Enhancement */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-gray-400">
                    <strong className="text-white">Core Mastery:</strong> Production-ready skills
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-gray-400">
                    <strong className="text-white">Learning:</strong> Actively exploring
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Skill Breakdown */}
          <div className="space-y-8">
            {skillBreakdown.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.1 }}
                className="glass rounded-2xl p-6 lg:p-8"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      group.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                  {group.category}
                </h3>

                <div className="space-y-4">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span
                          className={`text-sm font-semibold ${
                            group.color === 'primary' ? 'text-primary' : 'text-secondary'
                          }`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                          className={`absolute left-0 top-0 h-full rounded-full ${
                            group.color === 'primary'
                              ? 'bg-gradient-to-r from-primary to-primary-light'
                              : 'bg-gradient-to-r from-secondary to-secondary-light'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Certifications/Learning Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border-primary/30"
            >
              <h4 className="text-lg font-semibold mb-4 text-white">2026 Learning Roadmap</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Deep dive into <strong>Edge Computing</strong> patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Building production <strong>AI Agents</strong> with LangChain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Exploring <strong>Green Coding</strong> practices for sustainability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Advanced <strong>System Design</strong> patterns for scale</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Interactive Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            💡 <strong className="text-gray-400">Pro tip:</strong> Hover over the radar chart 
            to see exact proficiency percentages for each domain
          </p>
        </motion.div>
      </div>
    </section>
  )
}