import { render, screen } from "@testing-library/react";
import PokemonList from "./pokemon-list";

const makeSut = () => {
    render(<PokemonList />);
}

describe('PokemonList', () => {
    describe('Render', () => {
        it('should render pokemon list', () => {
            makeSut();
            const list = screen.getByTestId('home__pokemons__list');

            expect(list).toBeInTheDocument();
        });
    });
});