import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Silicon Lab - Home"
      className="flex w-fit items-center space-x-2 rounded-md bg-apple-card/30 p-1 px-2"
    >
      <img width={24} height={24} src="/favicon.svg" alt="" />
      <span className="text-sm font-black tracking-wide">
        SILICON<span className="text-[10px] uppercase text-apple-blue">LAB</span>
      </span>
    </Link>
  );
}