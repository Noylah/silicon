export default function Logo() {
    return (
        <div className="flex space-x-2 px-2 p-1 items-center bg-apple-card/30 w-fit rounded-md">
            <img width={24} src="/favicon.svg"/>
            <div className="flex items-baseline gap-1">
                <span className="font-black text-sm tracking-wide">SILICON<span className="text-[10px] uppercase text-apple-blue">LAB</span></span>
            </div>
        </div>
    );
}