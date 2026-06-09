import {MonitorCog} from 'lucide-react'

export default function Logo() {
    return (
        <div className="flex space-x-2 px-2 p-1 items-center bg-apple-card/30 w-fit rounded-md">
            <MonitorCog className="w-5 h-5 text-apple-blue"/>
            <div className="flex items-baseline gap-1">
                <span className="font-black text-sm tracking-tight">SILICON</span>
            </div>
        </div>
    );
}