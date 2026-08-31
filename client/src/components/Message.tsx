import type { WSMessage } from "../types";

type MessageProps = {
    message: WSMessage;
    isOwn: boolean;
}

export function Message({ message, isOwn }: MessageProps) {
    if (message.type === 'system') {
        return (
            <div className="text-center text-xs text-taupe-400 my-2">
                {message.text}
            </div>
        )
    }
    return (
        <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`} >
            <div
                className={`max-w-[70%] rounded-2xl px4 py-2 text-sm
                    ${ isOwn 
                        ? 'bg-amber-700 text-white rounded-br-sm' 
                        : 'bg-amber-200 text-taupe-900 rounded-bl-sm'}
                `}
            >
                {!isOwn && (
                    <div className='text-xs font-semibold text-taupe-900 mb-0.5 px-2'>
                        {message.user}
                    </div>
                )}
                <div className="px-2">
                    {message.text}
                </div>
            </div>
        </div>
    )
}