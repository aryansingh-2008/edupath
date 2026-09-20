'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { Bot, Send, User, ArrowRight } from 'lucide-react';

export const AIMentorView: React.FC = () => {
  const { chatMessages, sendChatMessage, setActiveTab, profile } = useEduPath();
  const [inputText, setInputText] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const promptSuggestions = [
    'Why did my plan change?',
    'What should I learn today?',
    'Why is SQL important for my goal?',
    'Can I skip React?',
    'What project should I build next?'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-180px)] min-h-[550px]">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Contextual AI Mentor</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Telemetry Ingested
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Aware of your {profile.targetRole} target, active gaps, and practice errors.
            </p>
          </div>
        </div>
      </div>

      
      <div className="flex-1 bg-[#0f172a] rounded-2xl p-4 md:p-6 border border-slate-800 overflow-y-auto space-y-4">
        {chatMessages.map(msg => {
          const isMentor = msg.sender === 'mentor';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isMentor ? 'justify-start' : 'justify-end'}`}
            >
              {isMentor && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 text-xs shadow-md shadow-blue-600/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed space-y-2.5 ${
                  isMentor
                    ? 'bg-slate-900 border border-slate-800 text-slate-200'
                    : 'bg-blue-600 text-white font-medium ml-auto'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.suggestedAction && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Recommended Action:</span>
                    <button
                      onClick={() => {
                        if (msg.suggestedAction?.toLowerCase().includes('roadmap') || msg.suggestedAction?.toLowerCase().includes('recovery') || msg.suggestedAction?.toLowerCase().includes('change')) {
                          setActiveTab('path');
                        } else if (msg.suggestedAction?.toLowerCase().includes('practice') || msg.suggestedAction?.toLowerCase().includes('quiz')) {
                          setActiveTab('practice');
                        } else if (msg.suggestedAction?.toLowerCase().includes('skill')) {
                          setActiveTab('skills');
                        } else if (msg.suggestedAction?.toLowerCase().includes('project')) {
                          setActiveTab('projects');
                        }
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition"
                    >
                      <span>{msg.suggestedAction}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {!isMentor && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">Suggested:</span>
        {promptSuggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => sendChatMessage(sug)}
            className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 whitespace-nowrap transition"
          >
            {sug}
          </button>
        ))}
      </div>

      
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={`Ask anything about your path to ${profile.targetRole}...`}
          className="flex-1 bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm transition flex items-center gap-1.5 shadow-md shadow-blue-600/30"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Mentor</span>
        </button>
      </form>
    </div>
  );
};
