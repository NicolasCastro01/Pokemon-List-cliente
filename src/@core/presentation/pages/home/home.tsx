'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { PokemonData } from "~/@core/domain";
import { makeRemoteLoadPokemon, makeRemoteLoadPokemonList, makeRemoteSendPokemon } from "~/@core/main";
import { SearchIcon } from "../../common";
import { PokemonCard, PokemonListTag } from "./components";

export default function Home() {
    const router = useRouter();
    const findAllPokemonUseCase = useMemo(() => makeRemoteLoadPokemonList(), [makeRemoteLoadPokemonList]);
    const findPokemonUseCase = useMemo(() => makeRemoteLoadPokemon(), [makeRemoteLoadPokemon]);
    const sendPokemonUseCase = useMemo(() => makeRemoteSendPokemon(), [makeRemoteSendPokemon]);
    const [search, setSearch] = useState<string>('');
    const [searchPokemons, setSearchPokemons] = useState<PokemonData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pokemonsImported, setPokemonsImported] = useState<PokemonData[]>([]);
    const [pokemonFound, setPokemonFound] = useState<PokemonData>({
        name: '',
        imageUrl: ''
    });

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    async function importPokemon() {
        setIsLoading(true);

        await sendPokemonUseCase.exec({ name: pokemonFound.name, image_url: pokemonFound.imageUrl });

        setIsLoading(false);

        loadPokemonsImported();
    }

    function handlePokemonCard() {
        if (pokemonFound.name.length === 0) {
            return 'No Pokemon found! :C';
        }

        return (<PokemonCard.Card>
            <Image
                id="pokemon__card__image"
                width={80}
                height={80}
                src={pokemonFound.imageUrl}
                alt={pokemonFound.name}
                aria-label="pokemon__card__image"
                className="max-w-[80px] max-h-[80px]"
            />
            <PokemonCard.Name>{pokemonFound.name}</PokemonCard.Name>
            <PokemonCard.Button onClick={importPokemon} disabled={isLoading}>Import</PokemonCard.Button>
        </PokemonCard.Card>);
    }

    function handlePokemonsImportedCards() {
        if (searchPokemons.length === 0) {
            return 'Empty.'
        }

        return searchPokemons.map(({ name, imageUrl }, index) => (
            <PokemonCard.Card key={index}>
                <Image
                    id="pokemon__card__image"
                    width={80}
                    height={80}
                    src={imageUrl}
                    alt={name}
                    aria-label="pokemon__card__image"
                    className="max-w-[80px] max-h-[80px]"
                />
                <PokemonCard.Name>{name}</PokemonCard.Name>
                <PokemonCard.Button disabled>Imported</PokemonCard.Button>
            </PokemonCard.Card>
        ));
    }

    function filterPokemons(pokemonSearch: string) {
        const temp = pokemonsImported.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonSearch.toLowerCase()));
        setSearchPokemons(temp);
    }

    const loadPokemonsImported = useCallback(async () => {
        const pokemonsImported = await findAllPokemonUseCase.exec();

        setPokemonsImported(pokemonsImported);
        setSearchPokemons(pokemonsImported);
    }, [findAllPokemonUseCase]);

    async function findPokemon() {
        if (search.length === 0) return;

        setIsLoading(true);

        const pokemon = await findPokemonUseCase.exec({ pokemonName: search.toLocaleLowerCase() });

        setPokemonFound(pokemon);

        setIsLoading(false);
    }

    function logout() {
        localStorage.clear();
        router.push('/login');
    }

    useEffect(() => {
        const tokenIsNull = !Boolean(JSON.parse(localStorage.getItem('auth-token') as string)["token"]);
        if (tokenIsNull) {
            alert('Unauthorized! Please signin.');
            router.push('/login');
        }

        loadPokemonsImported();
    }, [loadPokemonsImported, router]);

    return (
        <main id="home__page" aria-label="home__page" className="flex min-h-screen flex-col items-center p-6">
            <header id="home__header" aria-label="home__header"
                className="flex items-center justify-between w-2/4"
            >
                <h1 id="home__title" aria-label="home__title" className="font-extrabold text-4xl">Poke<span className="text-purple-950">Hub</span> | Home</h1>
                <button id="logout__button" aria-label="logout__button" disabled={isLoading} onClick={() => logout()}
                    className="outline-none rounded-full py-2 px-4 mt-4 bg-red-950 enabled:hover:bg-opacity-[0.3] transition-colors"
                >logout</button>
            </header>

            <section id="home__container__pokemon__features" aria-label="home__container__pokemon__features"
                className="flex flex-col items-center justify-evenly w-full mt-2"
            >
                <div id="pokemon__search__container" aria-label="pokemon__search__container"
                    className="flex flex-col items-center w-2/4"
                >
                    <div className="flex items-center gap-2 mt-16">
                        <SearchIcon fill="#fff" />
                        <input id="home__search__input" type="text" aria-label="home__search__input" placeholder="Pokemon name..."
                            className="rounded-full p-2 text-black outline-none"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event)}
                            onBlur={() => findPokemon()}
                            disabled={isLoading}
                        />
                    </div>

                    <PokemonListTag ariaLabel="pokemons__list">
                        {handlePokemonCard()}
                    </PokemonListTag>
                </div>

                <div id="pokemon__imported_container" aria-label="pokemon__importted_container"
                    className="flex flex-col justify-center w-2/4"
                >

                    <div id="pokemon__imported__header" aria-label="pokemon__imported__header"
                        className="flex justify-between"
                    >
                        <p id="pokemon__imported__title" aria-label="pokemon__importted__title"
                            className="font-bold text-2xl mt-16"
                        >Pokemons imported</p>
                        <div className="flex items-center gap-2 mt-16">
                            <SearchIcon fill="#fff" />
                            <input id="home__search__input" type="text" aria-label="home__search__importted__pokemon__input" placeholder="Pokemon name..."
                                className="rounded-full p-2 text-black outline-none"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => filterPokemons(event.target.value)}
                            />
                        </div>
                    </div>
                    <PokemonListTag
                        ariaLabel="pokemons__list__imported"
                    >
                        {handlePokemonsImportedCards()}
                    </PokemonListTag>
                </div>
            </section>
        </main>
    );
}