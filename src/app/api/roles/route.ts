import { NextResponse } from 'next/server';

export async function GET() {
  const roles = [
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      coreSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'System Design', 'Docker'],
      benchmarkWeights: { SQL: 0.80, React: 0.80, 'Node.js': 0.75, 'System Design': 0.70 }
    },
    {
      id: 'data-science',
      title: 'Data Scientist',
      coreSkills: ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Statistics', 'Tableau'],
      benchmarkWeights: { Python: 0.90, SQL: 0.85, Pandas: 0.85, 'Scikit-Learn': 0.80 }
    },
    {
      id: 'cloud-ai',
      title: 'Cloud AI Architect',
      coreSkills: ['AWS', 'Docker', 'Kubernetes', 'pgvector', 'RAG / LLM Orchestration', 'Microservices'],
      benchmarkWeights: { AWS: 0.90, 'pgvector': 0.80, 'RAG': 0.85, Microservices: 0.90 }
    }
  ];

  return NextResponse.json({ roles });
}
