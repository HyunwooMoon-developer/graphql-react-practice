import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Get_Movies_Query } from '../queries/queries';
import MovieDetail from './MovieDetail';

const MovieList = () => {
  const { loading, data } = useQuery(Get_Movies_Query);
  const [selectedMovie, setSelectedMovie] = useState(null);
  if (loading) {
    return <p>Loading...</p>;
  }

  const renderMovies = () => {
    return data.movies.map((movie) => {
      return (
        <li
          className="list-group-item m-2 shadow-sm"
          style={{ cursor: 'pointer', borderRadius: '5px' }}
          key={movie.id}
          onClick={(e) => setSelectedMovie(movie.id)}
        >
          {movie.name}
        </li>
      );
    });
  };

  return (
    <div className="row h-100">
      <div className="col-md-7 p-4">
        <ul>{renderMovies()}</ul>
      </div>
      <div
        className="col-md-5 p-4 text-white"
        style={{ backgroundColor: '#457b9d' }}
      >
        <MovieDetail selectedMovie={selectedMovie} />
      </div>
    </div>
  );
};

export default MovieList;
