import type { ConnectionStatus as Status }  from "../useChatSocket";

const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
    connecting: { label: "Connecting…", color: "bg-yellow-400" },
    open: { label: "Online", color: "bg-green-500" },
    closed: { label: "Disconnected", color: "bg-red-500" },
};

export function ConnectionStatus({ status }: { status: Status }) {
    const { label, color } = STATUS_CONFIG[status];
    return (
        <div className="flex items-center gap-2 text-sm text-taupe-700">
            <span className={`h-2 w-2 rounded-full ${color}`}/>
            {label}
        </div>
    )
}