import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { rawText, fileType } = body;

    // Security & Input Validation
    if (rawText && typeof rawText !== 'string') {
      return NextResponse.json({ error: 'rawText must be a string' }, { status: 400 });
    }
    if (rawText && rawText.length > 100000) {
      return NextResponse.json({ error: 'Payload exceeds maximum length of 100KB' }, { status: 413 });
    }

    const allowedFileTypes = ['pdf', 'docx', 'txt', 'markdown', 'json'];
    const sanitizedFileType = typeof fileType === 'string' && allowedFileTypes.includes(fileType.toLowerCase())
      ? fileType.toLowerCase()
      : 'txt';

    // Simulate Profile Agent parsing & evidence collection
    const extractedData = {
      agent: 'Profile Agent',
      status: 'success',
      confidence: 0.88,
      sourceFormat: sanitizedFileType,
      experienceYears: 1.5,
      skills: [
        {
          name: 'JavaScript (ES6+)',
          estimatedLevel: 0.78,
          confidence: 0.88,
          evidence: 'Built responsive client web applications using ES6 async/await, closures, and modular JS.'
        },
        {
          name: 'React.js',
          estimatedLevel: 0.62,
          confidence: 0.82,
          evidence: 'Built interactive frontend components utilizing React hooks (useState, useEffect, useContext).'
        },
        {
          name: 'Node.js & Express',
          estimatedLevel: 0.41,
          confidence: 0.65,
          evidence: 'Created basic Express REST endpoints returning mock JSON data.'
        },
        {
          name: 'SQL & Relational DB',
          estimatedLevel: 0.34,
          confidence: 0.70,
          evidence: 'Understands basic SELECT and WHERE queries on SQLite; no foreign keys or indexing demonstrated.'
        },
        {
          name: 'System Design & Scalability',
          estimatedLevel: 0.18,
          confidence: 0.55,
          evidence: 'Single-server deployments; no experience with load balancers, caching, or DB replication.'
        }
      ]
    };

    return NextResponse.json(extractedData);
  } catch {
    return NextResponse.json({ error: 'Internal error processing profile analysis' }, { status: 500 });
  }
}
