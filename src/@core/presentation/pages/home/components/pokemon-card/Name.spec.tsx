import { render, screen } from "@testing-library/react";
import Name from "./Name";

const makeSut = () => {
    render(<Name />);
}

describe('PokemonCardName', () => {
    describe('Render', () => {
        it('should render pokemon card name', () => {
            makeSut();

            const name = screen.getByTestId('pokemon__card__name');

            expect(name).toBeInTheDocument();
        });
    });
});