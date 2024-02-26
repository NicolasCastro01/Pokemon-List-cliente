import { ReactElement } from "react";

interface PokemonListProps {
    children?: ReactElement | ReactElement[] | string;
    ariaLabel?: string;
}

export default function PokemonList({ children, ariaLabel }: PokemonListProps) {
    return (
        <ul id="home__pokemons__list" aria-label={ariaLabel} data-testid="home__pokemons__list"
            className="
                flex 
                overflow-x-scroll 
                justify-start 
                items-start 
                gap-4 
                w-full 
                border-2 
                border-[#C8C8C8] 
                rounded-3xl 
                mt-8 
                p-6
            "
        >
            {children}
        </ul>
    );
}