import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { promises as fs } from 'fs';
import { join } from 'path';

const promptPath = join(process.cwd(), 'app', 'api', 'chat', 'flogviewer-ai-assistant.system.prompt.xml');

function readPromptFile() {
  try {
      const fsSync = require('fs');
      return fsSync.readFileSync(promptPath, 'utf-8');
  } 
  catch (error) {
      console.error('Failed to read system prompt:', error);
      return 'only mention there was an error loading flogviewer information';
  }
}

const fLogViewerSystemPrompt = readPromptFile();
console.log(`@prompt: ${fLogViewerSystemPrompt}`);
console.log(`@prompt length: ${fLogViewerSystemPrompt.length}`);
//const model = 'anthropic/claude-sonnet-4.5';
//const model = 'gemini-2.0-flash-lite';
const model_g = 'gemini-2.0-flash';
const model = 'openai/gpt-5.1';

//export type MyMessage = UIMessage<unknown>;

export async function POST(req: Request) {

  const { messages }: { messages: UIMessage[] } = await req.json();
  //console.log('messages', JSON.stringify(messages, null, 2));
  const result = streamText({
    model: model,
    system: fLogViewerSystemPrompt,
    messages: convertToModelMessages(messages),
  });
//  console.log('result', JSON.stringify(result, null, 2));
  return result.toUIMessageStreamResponse();
}