import { render, screen } from "@testing-library/react";
import Button from "./Button";

const makeSut = () => {
    render(<Button />);
}

describe('PokemonCardButton', () => {
    describe('Render', () => {
        it('should render', () => {
            makeSut();
            const button = screen.getByRole("button", {
                name: 'pokemon__import__button'
            });

            expect(button).toBeInTheDocument();
        })
    });
});