import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export class Chunker {
  private splitter: RecursiveCharacterTextSplitter;

  constructor(chunkSize: number = 1000, chunkOverlap: number = 200) {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
  }

  async splitText(text: string): Promise<string[]> {
    if (!text) return [];
    return this.splitter.splitText(text);
  }
}
