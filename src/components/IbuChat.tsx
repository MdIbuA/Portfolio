/**
 * Ibu AI Chat Component
 * 
 * DESIGN PRINCIPLE: Frontend ONLY handles UI. Backend owns AI behavior.
 * 
 * This component demonstrates:
 * - Clean API integration
 * - No AI logic in frontend
 * - Session management
 * - Proper error handling
 * - Professional UX
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IbuChat.css';

// Types matching backend API contract
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
}

interface ChatRequest {
    question: string;
    session_id?: string;
}

interface ChatResponse {
    assistant: string;  // Always "Ibu"
    answer: string;
    timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const SESSION_STORAGE_KEY = 'ibu_session_id';

export function IbuChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(() => {
        // Get or create session ID
        let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (!id) {
            id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem(SESSION_STORAGE_KEY, id);
        }
        return id;
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initial greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: "Hi! I'm Ibu, Mohamed's AI assistant. Feel free to ask me about his skills, experience, or projects!",
            }]);
        }
    }, [isOpen]);

    const clearChat = () => {
        // 1. Reset messages to just the greeting
        setMessages([{
            role: 'assistant',
            content: "Hi! I'm Ibu, Mohamed's AI assistant. Feel free to ask me about his skills, experience, or projects!",
        }]);

        // 2. Clear input
        setInput('');

        // 3. Generate new session ID for a fresh start
        const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
        setSessionId(newSessionId);
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Call backend API - NO AI LOGIC HERE
            const requestBody: ChatRequest = {
                question: userMessage.content,
                session_id: sessionId
            };

            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get response from Ibu');
            }

            const data: ChatResponse = await response.json();

            // Backend controls the assistant name and behavior
            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: data.answer,
                timestamp: data.timestamp
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';

            // Show error as a message
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Sorry, I encountered an error: ${errorMessage}`,
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const suggestedQuestions = [
        "What technologies does Mohamed know?",
        "Tell me about his AI projects",
        "What's his experience with full-stack development?",
        "What certifications does he have?",
    ];

    return (
        <>
            {/* Tooltip Greeting */}
            <AnimatePresence>
                {!isOpen && isHovered && (
                    <motion.div
                        className="ibu-tooltip"
                        initial={{ opacity: 0, scale: 0.9, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        Hi! I'm Ibu 👋
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                className="ibu-fab"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Chat with Ibu"
            >
                <div className="ibu-avatar">
                    <img src="/ibu-avatar.png" alt="Ibu" className="ibu-icon-img" />
                    {!isOpen && <span className="ibu-pulse"></span>}
                </div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="ibu-chat-container"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="ibu-header">
                            <div className="ibu-header-content">
                                <div className="ibu-avatar-small">
                                    <img src="/ibu-avatar.png" alt="Ibu" />
                                </div>
                                <div>
                                    <h3>Ibu</h3>
                                    <p>Mohamed's AI Assistant</p>
                                </div>
                            </div>
                            <div className="ibu-header-actions">
                                <button
                                    className="ibu-clear"
                                    onClick={clearChat}
                                    title="Clear History"
                                    aria-label="Clear chat history"
                                >
                                    🗑️
                                </button>
                                <button
                                    className="ibu-close"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close chat"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="ibu-messages">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`ibu-message ${msg.role}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="ibu-avatar-tiny">
                                            <img src="/ibu-avatar.png" alt="Ibu" />
                                        </div>
                                    )}
                                    <div className="ibu-message-content">
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    className="ibu-message assistant"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="ibu-avatar-tiny">
                                        <img src="/ibu-avatar.png" alt="Ibu" />
                                    </div>
                                    <div className="ibu-message-content ibu-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions (show when no messages) */}
                        {messages.length <= 1 && !loading && (
                            <div className="ibu-suggestions">
                                <p className="ibu-suggestions-label">Try asking:</p>
                                {suggestedQuestions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        className="ibu-suggestion-chip"
                                        onClick={() => {
                                            setInput(q);
                                            setTimeout(sendMessage, 100);
                                        }}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="ibu-input-container">
                            <input
                                type="text"
                                className="ibu-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything about Mohamed..."
                                disabled={loading}
                            />
                            <button
                                className="ibu-send"
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                aria-label="Send message"
                            >
                                {loading ? '⏳' : '➤'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default IbuChat;
