import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(request) {
  const { question } = await request.json()

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Answer this question in 2-3 sentences: ${question}`
      }
    ],
    model: 'llama-3.1-8b-instant',
  })

  const answer = completion.choices[0]?.message?.content || 'No answer found.'

  return Response.json({ answer })
}