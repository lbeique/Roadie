import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'
import Link from 'next/link'
import RatingStars from '../components/RatingStars';

export default function Home() {
  const { user } = useContext(AuthContext);

  const [movies, setMovies] = useState([])

  function averageRating(ratings) {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  }

  useEffect(() => {
    axios
      .get('https://0oeo5enpn6.execute-api.us-west-1.amazonaws.com/movies')
      .then((response) => {
        setMovies(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function renderStars(average) {
    const fullStars = Math.floor(average);
    const halfStar = average - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={index} className="text-yellow-400">
              &#x2605;
            </span>
          ))}
        {halfStar ? (
          <span className="text-yellow-400">&#x00BD;</span>
        ) : null}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={index + fullStars + halfStar} className="text-gray-600">
              &#x2605;
            </span>
          ))}
      </>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4">
      <h1 className="text-4xl title dark:title-dark">Welcome To Roadie!</h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl p-4">Serverless Because It's Fun!</h2>
        {user && (
          <Link className="flex mt-6 mb-6 w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href="/movie">Add Movie</Link>
        )}
        <ul className="flex flex-wrap justify-center gap-8">
          {movies.map((movie) => {
            const avgRating = averageRating(movie.Ratings);

            return (
              <li
                key={movie.Movie.Id}
                className="movie-card flex flex-col items-center justify-center p-4 border border-gray-300 rounded shadow-md hover:shadow-xl transition-all max-w-[234px]"
              >
                {user ? (
                  <Link href={`/movie/${movie.Movie.Id}`}>
                    <Image
                      src={movie.Movie.PosterURL}
                      alt={movie.Movie.Name}
                      width={200}
                      height={300}
                    />
                    <h3 className="text-xl mt-4 text-center text-yellow-300">{movie.Movie.Name}</h3>
                    <p className="text-lg">{movie.Movie.Director}</p>
                    <p className="text-lg">{movie.Movie.Genre}</p>
                    <p className="text-lg">{movie.Movie.ReleaseDate}</p>
                    <div className="flex items-center">
                      <RatingStars movieId={movie.Movie.Id} userId={user?.Sub} currentRating={avgRating} />
                      <span className="text-lg ml-2">{avgRating.toFixed(1)}</span>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <Image
                      src={movie.Movie.PosterURL}
                      alt={movie.Movie.Name}
                      width={200}
                      height={300}
                    />
                    <h3 className="text-xl mt-4 text-center text-yellow-300">{movie.Movie.Name}</h3>
                    <p className="text-lg">{movie.Movie.Director}</p>
                    <p className="text-lg">{movie.Movie.Genre}</p>
                    <p className="text-lg">{movie.Movie.ReleaseDate}</p>
                    <div className="flex items-center">
                      <RatingStars movieId={movie.Movie.Id} userId={user?.Sub} currentRating={avgRating} />
                      <span className="text-lg ml-2">{avgRating.toFixed(1)}</span>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  )
}