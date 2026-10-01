import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || !question.trim()) {
      return Response.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `Answer this question in 2-3 sentences: ${question}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 150,
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ||
      "No answer found.";

    return Response.json({ answer });
  } catch (error) {
    console.error("Groq API Error:", error);

    return Response.json(
      { error: "Failed to generate answer" },
      { status: 500 }
    );
  }
}
