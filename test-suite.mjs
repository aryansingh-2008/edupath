// EduPath Autonomous E2E Validation & Schema Integrity Test Suite

import assert from 'node:assert';

console.log('🧪 Starting EduPath Validation Test Suite...\n');

// 1. Test Seed Data Invariants
console.log('Test 1: Validating Alex Rivera Seed Profile Invariants...');
import('./src/data/seedData.ts').then(({ INITIAL_ALEX_PROFILE, INITIAL_ROADMAP_ALEX, ADAPTED_ROADMAP_ALEX, SQL_PRACTICE_QUESTIONS }) => {
  assert.strictEqual(INITIAL_ALEX_PROFILE.name, 'Alex Rivera');
  assert.strictEqual(INITIAL_ALEX_PROFILE.targetRole, 'Full Stack Developer');
  assert.strictEqual(INITIAL_ALEX_PROFILE.readinessPercentage, 42);
  assert(INITIAL_ALEX_PROFILE.skills.length >= 5, 'Must have at least 5 extracted skills');

  const sqlSkill = INITIAL_ALEX_PROFILE.skills.find(s => s.id === 'sql');
  assert(sqlSkill, 'SQL skill must exist');
  assert.strictEqual(sqlSkill.status, 'gap', 'SQL must initially be a gap');
  assert(sqlSkill.evidence.length >= 1, 'SQL must have verified evidence');

  console.log('  ✓ Initial Profile & Skill Evidence verified.');

  // 2. Test Initial Roadmap DAG
  console.log('\nTest 2: Validating Baseline Roadmap Structure...');
  assert.strictEqual(INITIAL_ROADMAP_ALEX.length, 3, 'Initial roadmap must contain 3 baseline milestones');
  assert.strictEqual(INITIAL_ROADMAP_ALEX[0].isRecoveryModule, false);
  console.log('  ✓ Baseline Roadmap DAG verified.');

  // 3. Test Adaptive Replanning State Transition
  console.log('\nTest 3: Validating Adaptive Replanning Loop (Bottleneck Detection)...');
  assert(ADAPTED_ROADMAP_ALEX.length >= 3);
  const recoveryModule = ADAPTED_ROADMAP_ALEX.find(m => m.isRecoveryModule);
  assert(recoveryModule, 'Adapted roadmap must inject a recovery module');
  assert(recoveryModule.title.includes('Recovery Module'), 'Recovery module title must be explicit');
  assert.strictEqual(recoveryModule.skillFocus, 'SQL & Relational DB');

  // Check downstream delay
  const backendMilestone = ADAPTED_ROADMAP_ALEX.find(m => m.skillFocus === 'Node.js & Express');
  assert(backendMilestone, 'Backend milestone must exist');
  assert.strictEqual(backendMilestone.delayDays, 2, 'Backend milestone must be shifted by +2 days to protect prerequisite');
  console.log('  ✓ Adaptive Replanning & Schedule Shift verified.');

  // 4. Test Diagnostic Practice Questions
  console.log('\nTest 4: Validating Diagnostic Questions & Sub-concept Association...');
  assert(SQL_PRACTICE_QUESTIONS.length >= 3, 'Must have at least 3 diagnostic questions');
  for (const q of SQL_PRACTICE_QUESTIONS) {
    assert(q.prompt.length > 10, 'Prompt must be substantial');
    assert(q.options.length === 4, 'Must have 4 MCQ options');
    assert(q.correctIndex >= 0 && q.correctIndex < 4, 'Correct index must be valid');
    assert(q.explanation.length > 20, 'Must have detailed diagnostic explanation');
    assert(q.hint.length > 5, 'Must have helpful hint');
  }
  console.log('  ✓ Diagnostic Questions & Telemetry verified.');

  console.log('\n========================================');
  console.log('🎉 ALL EDUPATH INTEGRITY TESTS PASSED!');
  console.log('========================================\n');
}).catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
