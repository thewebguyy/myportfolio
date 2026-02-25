/**
 * Environment Variable Validation
 * Ensures all required environment variables are present and correctly formatted
 */

export const validateEnv = () => {
    const required = [
        'OPENAI_API_KEY',
    ]

    const missing = required.filter((key) => !process.env[key])

    if (missing.length > 0) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
        } else {
            console.warn(`Warning: Missing environment variables for local development: ${missing.join(', ')}`)
        }
    }

    // Public variables that should have defaults or be checked
    const publicVars = {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'olabodewebdesigns02@gmail.com',
    }

    return {
        isProduction: process.env.NODE_ENV === 'production',
        ...publicVars,
    }
}

export const env = validateEnv()
