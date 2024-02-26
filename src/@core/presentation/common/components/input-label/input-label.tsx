import { ChangeEvent, ReactElement } from "react";

export interface InputLabelProps extends Partial<HTMLElement & HTMLInputElement> {
    label: string;
    ariaLabel: string;
    ariaInput: string;
    id?: string;
    htmlFor?: string;
    value: string;
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactElement;
    dataTestId?: string;
};

export default function InputLabel({
    label,
    ariaInput,
    ariaLabel,
    htmlFor,
    id,
    onInput,
    type,
    required,
    icon,
    dataTestId
}: InputLabelProps) {
    return (
        <>
            <label id={id} htmlFor={htmlFor} aria-label={ariaLabel}
                className="font-bold"
            >{label}</label>
            <div className="flex items-center gap-2">
                {icon && <span>{icon}</span>}
                <input id={id} aria-label={ariaInput} onInput={onInput} type={type} required={required} data-testid={dataTestId}
                    className="outline-none rounded-full text-black p-2 font-semibold"
                />
            </div>
        </>
    );
}