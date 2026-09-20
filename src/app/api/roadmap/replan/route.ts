import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { skillId, failedCount } = body;

    const sanitizedSkillId = typeof skillId === 'string' && skillId.length > 0
      ? skillId.slice(0, 50).replace(/[^a-zA-Z0-9_-]/g, '')
      : 'sql';

    const safeFailedCount = typeof failedCount === 'number' && failedCount > 0
      ? Math.min(10, Math.floor(failedCount))
      : 2;

    const response = {
      agent: 'Adaptive Planner Agent',
      status: 'success',
      skillId: sanitizedSkillId,
      decision: {
        action: 'reinforce',
        trigger: `Observed ${safeFailedCount} consecutive failures on relational query JOIN logic.`,
        recoveryModule: {
          title: 'SQL JOIN Mastery & Visual Queries',
          durationMinutes: 45,
          objective: 'Reinforce relational joins with visual Venn diagrams and targeted interactive query challenges.'
        },
        scheduleAdjustment: {
          shiftedModules: ['Backend APIs with Node & Express'],
          daysShifted: 2
        },
        receipt: 'Why did my plan change receipt successfully generated.'
      }
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Internal error generating replanning schedule' }, { status: 500 });
  }
}
