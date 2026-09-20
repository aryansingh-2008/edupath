import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { prompt, targetRole, readinessScore } = body;

    // Security & Input Validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required and must be a non-empty string' }, { status: 400 });
    }
    if (prompt.length > 2000) {
      return NextResponse.json({ error: 'Prompt exceeds maximum character limit of 2000' }, { status: 400 });
    }

    const sanitizedRole = typeof targetRole === 'string' && targetRole.trim().length > 0
      ? targetRole.slice(0, 80).replace(/[<>&"]/g, '')
      : 'Full Stack Developer';

    const numericReadiness = typeof readinessScore === 'number' && !isNaN(readinessScore)
      ? Math.max(0, Math.min(100, Math.round(readinessScore)))
      : 42;

    let reply = `I'm tracking your roadmap for ${sanitizedRole}. You're currently at ${numericReadiness}% readiness.`;
    let action = "Start Today's Mission";

    const cleanPrompt = prompt.toLowerCase();
    if (cleanPrompt.includes('change') || cleanPrompt.includes('adapt')) {
      reply = `Your roadmap adapted because our Adaptive Planner observed repeated difficulty with SQL JOIN queries in practice. A 45-minute recovery module was scheduled to cement your fundamentals before moving to backend APIs.`;
      action = 'Inspect Injected Module';
    } else if (cleanPrompt.includes('sql')) {
      reply = `SQL is critical because 8 out of 10 Full Stack competencies require relational persistence. Your resume showed basic queries, so mastering JOINs is your fastest path to unblocking backend development.`;
      action = 'Practice SQL Lab';
    }

    return NextResponse.json({
      agent: 'Mentor Agent',
      reply,
      suggestedAction: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch {
    return NextResponse.json({ error: 'Internal error processing chat prompt' }, { status: 500 });
  }
}
