import { render, screen } from "@testing-library/react";
import Card from "./Card";

const makeSut = () => {
    render(<Card />);
}

describe('PokemonCard', () => {
    describe('Render', () => {
        it('should render pokemon card', () => {
            makeSut();

            const card = screen.getByTestId("pokemon__card");

            expect(card).toBeInTheDocument();
        });
    });
});
