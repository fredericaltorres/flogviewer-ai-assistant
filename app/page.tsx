// https://github.com/fredericaltorres/flogviewer-ai-assistant.git
// VERCEL: https://vercel.com/frederics-projects-2db7024f/flogviewer-ai-assistant
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Message, Wrapper } from './components';

const placeHolder = "Ask me anything about fLogViewer";
const defaultInput = "Show me how to query an Azure Storage account?";

export default function Chat() {

  const [input, setInput] = useState(defaultInput);
  const { messages, sendMessage, setMessages } = useChat(); // https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat#usechat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  function clearMessages2() {
    setInput('');
    setMessages([]);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col h-screen w-full ml-2 mr-4">
      <div className="flex-1 overflow-y-auto w-full stretch p-4">
        {messages.map(message => (
          <Message key={message.id} role={message.role} parts={message.parts} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full stretch p-4">
        <form onSubmit={e => { e.preventDefault(); sendMessage({ text: input }); setInput(''); }}>
          <input
            className="w-3/4 block mx-auto p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl dark:bg-zinc-900"
            value={input}
            placeholder={placeHolder}
            onChange={e => setInput(e.currentTarget.value)} />
        </form>

        <button onClick={() => clearMessages2()} className="mt-4 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors block mx-auto text-sm font-medium">
          Clear
        </button>

      </div>
    </div>
  );
}