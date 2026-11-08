import test from 'node:test'
import assert from 'node:assert/strict'
import { systemPrompt } from '../src/prompt.js'

test('coordinator delegates with task contract and does not block for child replies', () => {
  const prompt = systemPrompt({ name: 'Lead', role: 'project', trace: 'Chief → Lead', children: [{ name: 'Coder', role: 'code' }] })
  assert.match(prompt, /original objective and source/)
  assert.match(prompt, /task-card reference if one exists/)
  assert.match(prompt, /Do not poll, sleep, or resend/)
  assert.match(prompt, /check all required parts/)
  assert.match(prompt, /never announce overall completion prematurely/)
  assert.doesNotMatch(prompt, /all in parallel, then wait/)
})

test('leaf verifies evidence without taking coordination role', () => {
  const prompt = systemPrompt({ name: 'Coder', role: 'code', trace: 'Chief → Coder', children: [] })
  assert.match(prompt, /Before claiming completion, verify the actual deliverable/)
  assert.match(prompt, /You have no children: do the work yourself/)
  assert.doesNotMatch(prompt, /You are a COORDINATOR/)
})
