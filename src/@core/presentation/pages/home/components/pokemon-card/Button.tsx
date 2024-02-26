interface ButtonProps {
    disabled?: boolean;
    children?: string;
    onClick?: () => void;
}

export default function Button({ children, disabled, onClick }: ButtonProps) {
    return (
        <button id="pokemon__import__button" aria-label="pokemon__import__button" disabled={disabled} onClick={onClick}
            className="bg-purple-950 font-semibold p-2 w-full mt-2 rounded-full enabled:hover:bg-opacity-[0.3] disabled:bg-opacity-[0.3] transition-colors"
        >{children}</button>
    );
}