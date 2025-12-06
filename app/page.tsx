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
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            className="w-full p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl dark:bg-zinc-900"
            value={input}
            placeholder={placeHolder}
            onChange={e => setInput(e.currentTarget.value)} />
        </form>
      </div>
    </div>
  );
}