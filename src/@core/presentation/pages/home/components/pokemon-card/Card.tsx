import { ReactElement } from "react";

interface CardProps {
    children?: ReactElement | ReactElement[];
}

export default function Card({ children }: CardProps) {
    return (
        <li id="pokemon__card" aria-label="pokemon__card" data-testid="pokemon__card"
            className="flex flex-col w-[135px] h-[196px] justify-between items-center gap-2 border-2 border-[#C8C8C8] shadow-2xl rounded-[1.25rem] p-4"
        >
            {children}
        </li>
    );
}