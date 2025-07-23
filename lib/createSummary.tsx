import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeText(cvText: string): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes resumes/CVs.",
        },
        {
          role: "user",
          content: `Please summarize the following CV text:\n\n${cvText}. Make sure to highlight key skills, experiences and qualifications. the summary should highlight the most relevant information for a hiring manager. Keep the summary within 100 and 150 words however it should be covering all the important aspects of the CV.`,
        },
      ],
      temperature: 0.3,
    });

    const summary = response.choices[0].message.content;
    return summary || "Summary could not be generated.";
  } catch (error) {
    console.error("Summary error:", error);
    return null;
  }
}
