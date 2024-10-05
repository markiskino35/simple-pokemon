import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(async (response) => {
        const pokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image:
                details.data.sprites.other['official-artwork'].front_default, // Higher resolution image
            };
          })
        );
        setPokemonList(pokemons);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 w-full py-8'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-center capitalize'>
          Pokemon List
        </h1>
        {loading ? (
          <div class='flex-col gap-4 w-full flex items-center justify-center mt-6'>
            <div class='w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full'>
              <div class='w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full'></div>
            </div>
          </div>
        ) : (
          <>
            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
              {pokemonList.map((pokemon, index) => (
                <div class='w-60 h-80 bg-white rounded-3xl text-stone-800 p-4 flex flex-col items-start justify-center gap-3 shadow-md'>
                  <div
                    key={pokemon.name}
                    class='w-52 h-40 bg-sky-300 rounded-2xl flex justify-center items-center'
                  >
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className='w-32 h-32 mx-auto object-contain'
                    />
                  </div>
                  <div class=''>
                    <p class='font-extrabold capitalize'>{pokemon.name}</p>
                    <p class=' text-sm '>#{index + 1}</p>
                    <p class=''>Water</p>
                  </div>
                  <a
                    href={`/pokemon/${pokemon.name}`}
                    class='bg-sky-700 font-semibold p-2 px-6 rounded-xl hover:bg-sky-600 transition-colors text-white capitalize'
                  >
                    more info
                  </a>
                </div>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
