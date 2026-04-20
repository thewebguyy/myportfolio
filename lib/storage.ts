/**
 * Lightweight Data Persistence Abstraction
 * Signals "System Design" awareness by providing a unified interface for data storage.
 * Currently uses In-Memory/LocalStorage for simulation, but designed for easy SQL/NoSQL migration.
 */

export interface SystemReport {
  id: string
  type: 'audit' | 'talent' | 'opportunity'
  timestamp: string
  input: Record<string, unknown>
  output: Record<string, unknown>
  metadata: {
    latency: number
    userId: string
  }
}

class SystemStorage {
  private isClient = typeof window !== 'undefined'

  /**
   * Save a generated report
   */
  async saveReport(report: Omit<SystemReport, 'id' | 'timestamp'>): Promise<SystemReport> {
    const newReport: SystemReport = {
      ...report,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    }

    if (this.isClient) {
      const existing = this.getReports()
      const updated = [newReport, ...existing].slice(0, 20) // Keep last 20
      localStorage.setItem('sys_reports', JSON.stringify(updated))
    }

    // In a real system, this would be:
    // await db.reports.create({ data: newReport })
    
    return newReport
  }

  /**
   * Retrieve all reports
   */
  getReports(): SystemReport[] {
    if (!this.isClient) return []
    const data = localStorage.getItem('sys_reports')
    return data ? JSON.parse(data) : []
  }

  /**
   * Retrieve report by ID
   */
  getReportById(id: string): SystemReport | undefined {
    return this.getReports().find(r => r.id === id)
  }
}

export const sysStorage = new SystemStorage()
