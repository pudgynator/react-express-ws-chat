import { useState } from "react";
import type { SubmitEvent } from "react";

type LoginScreenProps = {
    onJoin: (username: string) => void;
}

export function LoginScreen({ onJoin }:  LoginScreenProps) {
    const [name, setName] = useState("");

    function handleSumbit(e: SubmitEvent){
        e.preventDefault();
        if (name.trim()) {
            onJoin(name.trim());
        }
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <form 
                onSubmit={handleSumbit}
                className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-taupe-200 p-6 shadow-sm"
            >
                <h1 className="text-lg font-semibold text-taupe-900">
                    Join the chat
                </h1>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoFocus
                    className="rounded-full border border-taupe-300 px-4 py-2 text-sm outline-none focus:border-taupe-500"
                    />
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="rounded-full bg-taupe-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                    >
                    Join
                </button>
            </form>
        </div>
    )
}