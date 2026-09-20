import { NextResponse } from 'next/server';
import { INITIAL_AGENT_RUNS } from '@/data/seedData';

export async function GET() {
  return NextResponse.json({
    activeAgents: 9,
    runs: INITIAL_AGENT_RUNS
  });
}
