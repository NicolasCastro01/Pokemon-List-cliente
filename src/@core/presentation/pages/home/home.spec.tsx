import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoadPokemon, LoadPokemonList, UserCredentialsContext as UserCredentialsContextType } from "~/@core/domain";
import { UserCredentialsContext } from "~/@core/infra";
import { makeRemoteLoadPokemon } from "~/@core/main";
import { HomePage } from "./";

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

const pokemonApiResponse = {
  name: 'charizard',
  imageUrl: 'https://raw.githubusercontent.com/api/pokemon'
} as LoadPokemon.Response;

const pokemonImportedApiReponse = [
  {
    name: 'charizard',
    image_url: 'https://raw.githubusercontent.com/api/pokemon'
  },
  {
    name: 'bulbasaur',
    image_url: 'https://raw.githubusercontent.com/api/pokemon'
  }
] as LoadPokemonList.ApiResponse;

jest.mock('~/@core/main', () => ({
  makeRemoteLoadPokemon: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(pokemonApiResponse)
  })),
  makeRemoteLoadPokemonList: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(pokemonImportedApiReponse)
  })),
  makeRemoteSendPokemon: jest.fn(() => ({
    exec: jest.fn()
  })),
}));

const defaultContextState = {
  contextState: {
    email: 'teste@verum.com',
    token: '3123123'
  },
  setContextState: jest.fn()
} as UserCredentialsContextType;

const makeSut = () => {
  render(
    <UserCredentialsContext.Provider value={{
      contextState: defaultContextState.contextState,
      setContextState: defaultContextState.setContextState
    }}>
      <HomePage />
    </UserCredentialsContext.Provider>
  );
}

describe("HomeComponent", () => {
  describe("Render", () => {
    beforeAll(() => {
      window.alert = jest.fn();
      localStorage.getItem = jest.fn();
      localStorage.clear = jest.fn();
      JSON.parse = jest.fn().mockReturnValue({ email: '', token: '' });
    });

    it("should render", async () => {
      makeSut();
      const homeComponent = screen.getByRole("main", {
        name: "home__page"
      });
      expect(homeComponent).toBeInTheDocument();
    });
  })
});

describe("Listing", () => {
  it("should list all pokemons imported from database local", async () => {
    makeSut();
    await waitFor(() => {
      const pokemonList = screen.getByRole("list", {
        name: 'pokemons__list__imported'
      });
      expect(pokemonList.childNodes).toHaveLength(2);
    });
  });
});

describe("Interactions", () => {
  it("should fill find pokemon input search", () => {
    makeSut();
    const pokemonName = 'charizard';

    const inputSearchPokemon = screen.getByRole("textbox", {
      name: 'home__search__input'
    }) as HTMLInputElement;

    fireEvent.change(inputSearchPokemon, { target: { value: pokemonName } });

    expect(inputSearchPokemon.value).toBe(pokemonName);
  });

  it("should find a pokemn searching using input on blur", () => {
    makeSut();
    const pokemonName = 'charizard';

    const inputSearchPokemon = screen.getByRole("textbox", {
      name: 'home__search__input'
    }) as HTMLInputElement;

    fireEvent.change(inputSearchPokemon, { target: { value: pokemonName } });

    expect(inputSearchPokemon.value).toBe(pokemonName);

    act(() => {
      inputSearchPokemon.onblur = jest.fn();

      fireEvent.blur(inputSearchPokemon);

      expect(inputSearchPokemon.onblur).toHaveBeenCalled();
    });
  });
  it("should not find a pokemn searching using input on blur when search input is null", () => {
    makeSut();
    const pokemonName = '';

    const inputSearchPokemon = screen.getByRole("textbox", {
      name: 'home__search__input'
    }) as HTMLInputElement;

    fireEvent.change(inputSearchPokemon, { target: { value: pokemonName } });

    expect(inputSearchPokemon.value).toBe(pokemonName);

    act(() => {
      inputSearchPokemon.onblur = jest.fn();

      const spynUseCase = jest.spyOn(makeRemoteLoadPokemon(), 'exec');

      fireEvent.blur(inputSearchPokemon);

      expect(spynUseCase).not.toHaveBeenCalled();
      expect(inputSearchPokemon.onblur).toHaveBeenCalled();
    });
  });

  it("should logout user when logout button is clicked", () => {
    makeSut();
    const logoutButton = screen.getByRole("button", {
      name: 'logout__button'
    }) as HTMLButtonElement;

    logoutButton.onclick = jest.fn();

    fireEvent.click(logoutButton);

    expect(logoutButton.onclick).toHaveBeenCalled();
  });

  it("should fill search pokemon imported input", async () => {
    makeSut();
    const pokemonName = 'charizard';

    const inputSearchPokemon = screen.getByRole("textbox", {
      name: 'home__search__importted__pokemon__input'
    }) as HTMLInputElement;

    inputSearchPokemon.onchange = jest.fn();

    act(() => {
      fireEvent.change(inputSearchPokemon, { target: { value: pokemonName } });

      expect(inputSearchPokemon.onchange).toHaveBeenCalled();
    })
  });

  it("should import a pokemon from list", async () => {
    makeSut();
    const pokemonName = 'charizard';

    const inputSearchPokemon = screen.getByRole("textbox", {
      name: 'home__search__input'
    }) as HTMLInputElement;

    fireEvent.change(inputSearchPokemon, { target: { value: pokemonName } });

    expect(inputSearchPokemon.value).toBe(pokemonName);

    act(() => {
      fireEvent.blur(inputSearchPokemon);
    });

    await waitFor(async () => {
      const pokemonListFromApi = screen.getByRole("list", {
        name: 'pokemons__list'
      });

      expect(pokemonListFromApi).toBeInTheDocument();

      const buttonImport = pokemonListFromApi.querySelector('li>button#pokemon__import__button') as HTMLButtonElement;

      buttonImport.onclick = jest.fn();

      fireEvent.click(buttonImport);

      expect(buttonImport.onclick).toHaveBeenCalled();
    });

  })
});