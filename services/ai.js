const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

async function callAnthropic(prompt, maxTokens = 200) {
  const headers = {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };
  const resp = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const data = await resp.json();
  return data.content?.[0]?.text || '';
}

export async function fetchDailyQuote() {
  const raw = await callAnthropic(
    'Give me one short inspirational quote centered on discipline, protecting your time, or personal growth. Respond with only valid JSON, no markdown: {"text": "quote here", "author": "Author Name"}'
  );
  const q = JSON.parse(raw.replace(/```json|```/g, '').trim());
  if (!q.text || !q.author) throw new Error('Invalid quote response');
  return q;
}
