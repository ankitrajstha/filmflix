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
    <section className="relative w-full h-screen">
      <div className="absolute inset-0 bg-[#0D1924]"></div>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white px-4 max-w-full sm:max-w-[1043px]">
            <h1 className="text-4xl sm:text-6xl mb-4 font-roboto">
              {movie?.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <img src="src/assets/Add.svg" alt="Add" />
              <img src="src/assets/Play.svg" alt="Play" />
            </div>
            <p className="text-base sm:text-lg text-[#CCCCCC]">
              {movie?.overview}
            </p>
          </div>
        </div>
      </div>
      <button
        className="absolute left-5 sm:left-10 top-1/2 transform -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-2"
        onClick={handlePrev}
      >
        <img src="src/assets/left.svg" alt="Left" />
      </button>
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
