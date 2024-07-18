import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSelectedMovie } from "../store/movieSlice";

const Carousel = () => {
  const dispatch = useDispatch();
  const { movies, selectedMovie } = useSelector((state) => state.movies);
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    let scrollInterval;
    if (!isHovered) {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft += 2;
        }
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="absolute bottom-0 h-[326px] w-full overflow-x-scroll whitespace-nowrap scrollbar-hide z-10 overflow-y-hidden"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-10 p-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`inline-block rounded-xl border-2 border-white cursor-pointer transition-all delay-75 ${
              selectedMovie?.id === movie.id ? "transform -translate-y-8" : ""
            }`}
            onClick={() => dispatch(setSelectedMovie(movie))}
          >
            <div className="w-40 h-60 sm:w-[190px] sm:h-[235px] relative rounded overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover border-2 border-white rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
