import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSelectedMovie } from "../store/movieSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const { movies, selectedMovie } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  const movie = selectedMovie || movies[0];

  const handleNext = () => {
    const currentIndex = movies.findIndex((m) => m.id === selectedMovie?.id);
    const nextIndex = (currentIndex + 1) % movies.length;
    dispatch(setSelectedMovie(movies[nextIndex]));
  };

  const handlePrev = () => {
    const currentIndex = movies.findIndex((m) => m.id === selectedMovie?.id);
    const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
    dispatch(setSelectedMovie(movies[prevIndex]));
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <button
        className="absolute top-1/2 left-5 -translate-y-1/2"
        onClick={handlePrev}
      >
        <img src="src/assets/left.svg" alt="Left Arrow" />
      </button>
      <div className="absolute top-[205px] left-[174px] text-white px-2">
        <h1 className="text-3xl sm:text-5xl mb-2 sm:mb-4">{movie?.title}</h1>
        <p className="text-sm sm:text-lg">{movie?.overview}</p>
      </div>
      <button
        className="absolute top-1/2 right-5 -translate-y-1/2"
        onClick={handleNext}
      >
        <img src="src/assets/right.svg" alt="Right Arrow" />
      </button>
    </section>
  );
};

export default Banner;
