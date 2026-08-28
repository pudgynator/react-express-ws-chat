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
        <div className="flex flex-col w-max">
            <form 
                onSubmit={handleSumbit}
            >

            </form>
        </div>
    )
}