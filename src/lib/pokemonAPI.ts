import { PokemonClient } from 'pokenode-ts';

class Client {
	api: PokemonClient;

	constructor() {
		this.api = new PokemonClient();
	}
}

const client = new Client();

export const getPokemonList = async (offset: number = 0, limit: number = 151) => {
	const result = await client.api.listPokemons(offset, limit);
	return result.results;
};

export const getPokemonByName = async (name: string) => {
	const result = await client.api.getPokemonByName(name);
	return result;
};
