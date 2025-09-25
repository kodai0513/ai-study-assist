import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { askAiAboutStudy } from '../../services/geminiService';
import { ulid } from 'ulid';

// メッセージの型定義
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export const AiChatPopup: React.FC = () => {
  // --- State管理 ---
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'こんにちは！何かお手伝いできることはありますか？', sender: 'ai' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- メッセージ末尾への自動スクロール用 ---
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- イベントハンドラ ---
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };
    setInputValue('');
    setIsLoading(true);

    const loadingMessageId = ulid() + '-ai';
    const loadingMessage: Message = {
      id: loadingMessageId,
      text: '回答を生成中です...',
      sender: 'ai',
    };
    setMessages((prev) => [...prev, userMessage, loadingMessage])

    try {
        const answer = await askAiAboutStudy(inputValue);
        const aiResponse: Message = {
            id: Date.now().toString() + 'ai',
            text: answer,
            sender: 'ai',
        };
        setMessages((prevMessages) => 
          prevMessages.filter((msg) => msg.id !== loadingMessageId)
        );
        setMessages((prev) => [...prev, aiResponse]);
    } catch(error) {
        // エラーが発生した場合も、ローディングメッセージをエラー表示に書き換える
        setMessages((prevMessages) => 
            prevMessages.map((msg) => 
            msg.id === loadingMessageId ? { ...msg, text: 'エラーが発生しました。' } : msg
            )
        );
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {/* チャットウィンドウ */}
      <div
        // h-full を h-screen に変更し、pb-4 を追加
        className={`fixed top-0 right-0 h-screen pb-4 w-full max-w-md bg-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">AIアシスタント</h3>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* メッセージ表示エリア */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 text-white
                  ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-slate-600'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 入力フォーム */}
        <div className="p-4 mb-24 border-t border-slate-700">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="メッセージを入力..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full disabled:bg-slate-500"
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* AIチャット起動ボタン */}
      <button
        onClick={() => setIsOpen(true)}
        // bottom-6 を bottom-24 に変更して位置を上げます
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </>
  );
};