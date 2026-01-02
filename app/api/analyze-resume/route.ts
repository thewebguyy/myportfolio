import { NextRequest, NextResponse } from 'next/server'
import { openai, RESUME_ANALYZER_PROMPT, handleOpenAIError } from '@/lib/openai'

/**
 * AI Resume Analyzer API Route
 * 
 * Analyzes resume text for skill overlap and collaboration opportunities
 * Uses GPT-4 for semantic analysis and gap identification
 * 
 * @route POST /api/analyze-resume
 * @body { resumeText?: string } or FormData with 'resume' file
 * @returns { analysis: AnalysisResult }
 */
export async function POST(request: NextRequest) {
  try {
    let resumeText = ''

    // Check if request is multipart/form-data (file upload)
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData()
      const file = formData.get('resume') as File
      
      if (!file) {
        return NextResponse.json(
          { error: 'No resume file provided.' },
          { status: 400 }
        )
      }

      // Extract text from file
      resumeText = await extractTextFromFile(file)
      
    } else {
      // Handle JSON request
      const body = await request.json()
      resumeText = body.resumeText
    }

    // Validate input
    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide resume text.' },
        { status: 400 }
      )
    }

    if (resumeText.length < 100) {
      return NextResponse.json(
        { error: 'Resume text is too short. Please provide at least 100 characters.' },
        { status: 400 }
      )
    }

    if (resumeText.length > 10000) {
      return NextResponse.json(
        { error: 'Resume text is too long. Please limit to 10,000 characters.' },
        { status: 400 }
      )
    }

    // Call OpenAI API for analysis
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: RESUME_ANALYZER_PROMPT,
        },
        {
          role: 'user',
          content: `Analyze this resume and compare it with Olabode's profile:

Resume text:
"""
${resumeText}
"""

Return ONLY a JSON object (no markdown, no code blocks) with this exact structure:
{
  "matchScore": 0-100,
  "strengths": ["skill1", "skill2", "skill3"],
  "gaps": ["skill1", "skill2"],
  "collaborationOpportunities": [
    "Specific area 1 where you could collaborate",
    "Specific area 2 where you could collaborate",
    "Specific area 3 where you could collaborate"
  ],
  "reasoning": "2-3 sentences explaining the overall match and potential synergies"
}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    })

    // Parse AI response
    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) {
      throw new Error('Empty response from OpenAI')
    }

    const analysis = JSON.parse(rawResponse)

    // Validate response structure
    if (
      typeof analysis.matchScore !== 'number' ||
      !Array.isArray(analysis.strengths) ||
      !Array.isArray(analysis.gaps) ||
      !Array.isArray(analysis.collaborationOpportunities) ||
      typeof analysis.reasoning !== 'string'
    ) {
      throw new Error('Invalid AI response structure')
    }

    // Ensure match score is within valid range
    analysis.matchScore = Math.max(0, Math.min(100, analysis.matchScore))

    // Return analysis
    return NextResponse.json({
      analysis: {
        matchScore: analysis.matchScore,
        strengths: analysis.strengths.slice(0, 8), // Limit to 8 strengths
        gaps: analysis.gaps.slice(0, 5), // Limit to 5 gaps
        collaborationOpportunities: analysis.collaborationOpportunities.slice(0, 4), // Limit to 4 opportunities
        reasoning: analysis.reasoning,
      },
    })

  } catch (error: any) {
    console.error('Resume analysis error:', error)

    // Handle OpenAI-specific errors
    const errorMessage = handleOpenAIError(error)

    return NextResponse.json(
      { 
        error: errorMessage,
        suggestion: 'Try simplifying your resume text or contact me directly to discuss collaboration.'
      },
      { status: error.status || 500 }
    )
  }
}

/**
 * Extract text from uploaded file
 * Supports PDF and DOCX formats
 */
async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type

  // For PDF files
  if (fileType === 'application/pdf') {
    // In production, use a library like pdf-parse or pdfjs-dist
    // For now, we'll provide a helpful error message
    return `
      NOTE: This is a demo implementation. In production, this would extract text from PDF.
      
      For now, please paste your resume text directly in the input field, or
      contact me at olabodewebdesigns02@gmail.com to discuss collaboration opportunities.
      
      Technical Skills Example:
      - Frontend: React, TypeScript, Next.js
      - Backend: Node.js, Python, PostgreSQL
      - Cloud: AWS, Vercel, Docker
      - AI/ML: TensorFlow, OpenAI API
    `
  }

  // For DOCX files
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // In production, use a library like mammoth or docx
    return `
      NOTE: This is a demo implementation. In production, this would extract text from DOCX.
      
      For now, please paste your resume text directly in the input field, or
      contact me at olabodewebdesigns02@gmail.com to discuss collaboration opportunities.
    `
  }

  // For plain text files
  if (fileType === 'text/plain') {
    return await file.text()
  }

  throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.')
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}