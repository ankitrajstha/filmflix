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
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <button
        className="absolute left-5 sm:left-10 top-1/2 transform -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-2"
        onClick={handlePrev}
      >
        <img src="src/assets/left.svg" alt="Left" />
      </button>
      <div className="absolute top-[204px] left-[174px] text-white px-2 max-w-full sm:max-w-[1043px]">
        <h1 className="text-[90px] sm:text-5xl mb-2 sm:mb-4 font-roboto">
          {movie?.title}
        </h1>

        <div className="flex items-center gap-1">
          <img src="src/assets/Add.svg" alt="" />
          <img src="src/assets/Play.svg" alt="" />
        </div>
        <p className="text-sm sm:text-lg text-[#CCCCCC]">{movie?.overview}</p>
      </div>

      <button
        className="absolute right-5 sm:right-10 top-1/2 transform -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-2"
        onClick={handleNext}
      >
        <img src="src/assets/right.svg" alt="Right" />
      </button>
    </section>
  );
};

export default Banner;
