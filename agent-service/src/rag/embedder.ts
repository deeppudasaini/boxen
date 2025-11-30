import { OpenAIEmbeddings } from '@langchain/openai';

export class Embedder {
  private model: OpenAIEmbeddings;

  constructor() {
    this.model = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small', // Cost-effective and high performance
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
