
import { GoogleGenAI } from "@google/genai";
import { StudySession, StudyStats } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY as string });

export const generateAiComment = async (stats: StudyStats, session: StudySession): Promise<string> => {
  const totalMinutes = stats.totalMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const mins = Math.floor(totalMinutes % 60);
  const timeString = hours > 0 ? `${hours}時間${mins}分` : `${mins}分`;

  const systemInstruction = `
    あなたはフレンドリーで、とても褒め上手な学習パートナーAIです。
    ユーザーの学習データに基づいて、回答を生成してください。
  `;
  const prompt = `
    以下の学習データを見て、ユーザーを元気づけるようなポジティブな応援コメントを、日本語で3文程度で書いてください。
    データの中から具体的な数字（合計時間やセッション回数など）を一つか二つ引用して、パーソナライズされた内容にしてください。

    # 今までの学習データ:
    - 合計学習時間: ${timeString}
    - 完了セッション回数: ${stats.totalSessions}
    - 学習テーマの内訳: ${JSON.stringify(stats.themeBreakdown)}
    - 日々の学習時間（分）: ${JSON.stringify(stats.dailyStats)}

    # 今回の学習データ:
    - 合計学習時間: ${timeString}
    - 完了セッション回数: ${stats.totalSessions}
    - 学習テーマの内訳: ${session.theme}
    - 学習時間（分）: ${JSON.stringify({ [session.date]: session.duration })}
  `;


  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text ?? "";
  } catch (error) {
    console.error("Error calling Gemini API for summary:", error);
    throw new Error("Failed to generate summary from AI.");
  }
}

export const askAiAboutStudy = async (question: string): Promise<string> => {

  // AIの役割を定義するシステム指示
  const systemInstruction = `
    あなたは優秀なアシスタントAIです。
    提供されたユーザーの学習データに関する質問に、データに基づいて正確に答えてください。
  `;

  // AIに渡すプロンプト本体
  const prompt = `
    以下の学習データを背景情報として、ユーザーからの質問に答えてください。
    答えは提供されたデータに記載されている事実にのみ基づいてください。
    もし情報がデータ内に存在しない場合は、「データからは分かりませんでした」と正直に回答してください。

    ---
    # ユーザーの質問:
    ${question}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    // レスポンスがnullやundefinedの場合も考慮して空文字を返す
    return response.text ?? "";
  } catch (error) {
    console.error("Error calling Gemini API for question:", error);
    throw new Error("Failed to get an answer from AI.");
  }
};