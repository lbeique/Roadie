import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const MovieId = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState(null);
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [posterURL, setPosterURL] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://0oeo5enpn6.execute-api.us-west-1.amazonaws.com/movies/${id}`)
        .then((response) => {
          setMovie(response.data);
          setName(response.data.Movie.Name);
          setDirector(response.data.Movie.Director);
          setGenre(response.data.Movie.Genre);
          setReleaseDate(response.data.Movie.ReleaseDate);
          setPosterURL(response.data.Movie.PosterURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`https://0oeo5enpn6.execute-api.us-west-1.amazonaws.com/movies/${id}`, {
        Name: name,
        Director: director,
        Genre: genre,
        ReleaseDate: releaseDate,
        PosterURL: posterURL,
      });
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="flex flex-col items-center p-4 min-w-[300px]">
        <Image src={movie.Movie.PosterURL} alt={movie.Movie.Name} width={200} height={300} />
        <h3 className="text-xl mt-4 text-center text-yellow-300">{movie.Movie.Name}</h3>
        <p className="text-lg">{movie.Movie.Director}</p>
        <p className="text-lg">{movie.Movie.Genre}</p>
        <p className="text-lg">{movie.Movie.ReleaseDate}</p>
      </div>
      <div className="p-4 min-w-[300px]">
        <h2 className="text-2xl text-center font-bold leading-9 tracking-tight text-white-700">Edit Movie</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-white-700">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="director" className="block text-sm font-medium leading-6 text-white-700">
            Director
          </label>
          <input
            name="director"
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="genre" className="block text-sm font-medium leading-6 text-white-700">
            Genre
          </label>
          <input
            name="genre"
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="releaseDate" className="block text-sm font-medium leading-6 text-white-700">
            Release Date
          </label>
          <input
            name="releaseDate"
            type="text"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="posterURL" className="block text-sm font-medium leading-6 text-white-700">
            Poster URL
          </label>
          <input
            name="posterURL"
            type="text"
            placeholder="Poster URL"
            value={posterURL}
            onChange={(e) => setPosterURL(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieId;