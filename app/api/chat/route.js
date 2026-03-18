import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { message, mode, language } = await request.json();

    const langInstruction =
      language === 'hindi'
        ? 'IMPORTANT: Respond entirely in Hindi (Devanagari script). Use simple Hindi that common people can understand.'
        : language === 'telugu'
        ? 'IMPORTANT: Respond entirely in Telugu (తెలుగు లిపి). Use simple Telugu that common people in Telangana and Andhra Pradesh can understand.'
        : 'Respond in English.';

    const systemPrompts = {
      qa: `You are Firm Law AI, an expert Indian legal assistant. ${langInstruction} Answer legal questions clearly and simply based on Indian law. Always cite relevant Indian Acts, sections, and case laws. Explain in simple language non-lawyers can understand. Structure your answer with clear headings. Focus only on Indian law.`,
      student: `You are Firm Law AI, an expert Indian law tutor. ${langInstruction} Help law students by explaining legal concepts clearly with examples. Provide case law with Facts, Held, and Legal Principle. Give exam-focused answers. Reference Indian Acts and landmark judgments.`,
      draft: `You are Firm Law AI, an expert at drafting Indian legal documents. ${langInstruction} When given details, draft professional legal documents. Use proper legal language and format. Include all necessary legal elements. Reference relevant Indian laws.`,
    };

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompts[mode] || systemPrompts.qa },
        { role: "user", content: message },
      ],
      max_tokens: 1024,
    });

    const response = completion.choices[0].message.content;
    return Response.json({ response });

  } catch (error) {
    console.error("FIRM LAW ERROR:", error);
    return Response.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}