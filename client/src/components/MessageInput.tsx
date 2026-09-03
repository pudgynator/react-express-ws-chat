import { useEffect, useRef, useState } from "react";

type MessageInputProps = {
    onSend: (text: string) => void;
    onTyping: () => void;
    disabled: boolean;
}

export function MessageInput({ onSend, onTyping, disabled }: MessageInputProps) {
    const [text, setText] = useState('');

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!text.trim()) return;
        if(text.length > 500) return;
        onSend(text);
        setText('');
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!disabled) {
        inputRef.current?.focus();
      }
    }, [disabled]);

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-taupe-200 p-3"
        >
            <input 
                type="text" 
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    onTyping();
                }}
                placeholder="Type a message..."
                disabled={disabled}
                className="flex-1 rounded-full border border-taupe-300 px-4 py-2 text-sm outline-none focus:border-taupe-500 disabled:bg-taupe-100"
                ref={inputRef}
            />
            <span className="text-xs text-taupe-400 self-center">
                {text.length}/500
            </span>
            <button
                type='submit'
                disabled={disabled || !text.trim()}
                className="rounded-full bg-amber-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
                Send
            </button>
        </form>
    )
}