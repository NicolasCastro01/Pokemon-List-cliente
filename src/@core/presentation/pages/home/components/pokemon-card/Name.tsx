interface NameProps {
    children?: string;
}

export default function Name({ children }: NameProps) {
    return (
        <div id="pokemon__card__name"
            className="font-bold capitalize"
            aria-label="pokemon__card__name"
            data-testid="pokemon__card__name"
        >{children}</div>
    );
}