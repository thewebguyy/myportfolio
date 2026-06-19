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
   * Environment-safe UUID generator.
   * Prefers globalThis.crypto.randomUUID (browser + modern Node),
   * falls back to a Math.random UUID v4 for Jest / older runtimes.
   */
  private generateId(): string {
    const globalCrypto = (globalThis as Record<string, unknown>).crypto as Crypto | undefined
    if (globalCrypto && typeof globalCrypto.randomUUID === 'function') {
      return globalCrypto.randomUUID()
    }
    // Fallback UUID v4 — sufficient for test environments and local storage simulation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * Save a generated report
   */
  async saveReport(report: Omit<SystemReport, 'id' | 'timestamp'>): Promise<SystemReport> {
    const newReport: SystemReport = {
      ...report,
      id: this.generateId(),
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
