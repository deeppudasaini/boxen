import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

export class Embedder {
  private model: GoogleGenerativeAIEmbeddings;

  constructor() {
    this.model = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY!,
      modelName: 'text-embedding-004',
    });
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    if (!texts.length) return [];
    return this.model.embedDocuments(texts);
  }

  async embedQuery(text: string): Promise<number[]> {
    return this.model.embedQuery(text);
  }
}
