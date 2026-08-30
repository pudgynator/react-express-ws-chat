import { useState } from "react";

type MessageInputProps = {
    onSend: (text: string) => void;
    disabled: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
    const [text, setText] = useState('');

    function handleSumbit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!text.trim()) return;
        onSend(text);
        setText('');
    }
    return (
        <form 
            onSubmit={handleSumbit}
            className="flex gap-2 border-t border-taupe-200 p-3"
        >
            <input 
                type="text" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                disabled={disabled}
                className="flex-1 rounded-full border border-taupe-300 px-4 py-2 text-sm outline-none focus:border-taupe-500 disabled:bg-taupe-100"
            />
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