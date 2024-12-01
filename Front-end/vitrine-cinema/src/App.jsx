import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [valueCategory, setValueCategory] = useState([]);
  const [movies, setMovies] = useState([]);
  const inputSearch = useRef();
  const [searchData, setSearchData] = useState([]);
  const API_KEY = "4d1e786585330f2ecc7c17fe00fc824b";

  const listCategory = async () => {
    try {
      const categorys = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
      );

      const filteredGenres = categorys.data.genres.slice(0, 5);
      setValueCategory(filteredGenres);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  const listMovies = async (genre) => {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=pt-BR`
      );

      const filteredMovies = movies.data.results.slice(0, 20);

      setMovies(filteredMovies);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  const searchMovie = async (searchMovie) => {
    const dataSerac = searchMovie.current.value;

    try {
      const dataSearch = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${dataSerac}&language=pt-BR`
      );

      const filteredSerach = dataSearch.data.results.slice(0, 5);

      setSearchData(filteredSerach);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  useEffect(() => {
    listCategory();
    listMovies(valueCategory);
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="flex items-center max-w-7xl mx-auto flex-col h-lvh gap-8 p-5">
        <h3 className="text-center text-3xl uppercase">CineFilme</h3>

        <div className="flex justify-center gap-2">
          <input
            type="search"
            className="h-10 shadow-md rounded-full p-4"
            placeholder="Pesquise por filmes"
            ref={inputSearch}
            onChange={() => searchMovie(inputSearch)}
          />
          <button
            className="bg-blue-500 w-24 rounded-full text-white text-sm active:scale-95"
            onClick={() => searchMovie(inputSearch)}
          >
            Pesquisar
          </button>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex justify-between">
            <span>Filmes</span>
            <select onChange={(e) => listMovies(e.target.value)}>
              {valueCategory.length > 0 &&
                valueCategory.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-4">
            {searchData.length > 0 
              ? searchData.map((search, index) => (
                  <div
                    className="rounded-lg overflow-hidden shadow-lg relative"
                    key={index}
                  >
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center animate-pulse">
                      <span className="text-white">
                        {Math.floor(search.vote_average)}
                      </span>
                    </div>

                    <div className="w-52 h-72">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${search.poster_path}`}
                        alt=""
                        className="w-52 h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col p-1">
                      <p className="font-bold break-words overflow-wrap break-word w-48">
                        {search.title}
                      </p>

                      <span className="text-slate-400 font-bolg">
                        {search.release_date}
                      </span>
                    </div>
                  </div>
                ))
              : movies.map((movie, index) => (
                  <div
                    className="rounded-lg overflow-hidden shadow-lg relative"
                    key={index}
                  >
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center animate-pulse">
                      <span className="text-white">
                        {Math.floor(movie.vote_average)}
                      </span>
                    </div>

                    <div className="w-52 h-72">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt=""
                        className="w-52 h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col p-1">
                      <p className="font-bold break-words overflow-wrap break-word w-48">
                        {movie.title}
                      </p>

                      <span className="text-slate-400 font-bolg">
                        {movie.release_date}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
