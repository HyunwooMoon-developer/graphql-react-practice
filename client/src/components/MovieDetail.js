import React from 'react';
import { useQuery } from '@apollo/client';
import { Get_Movie_Query } from '../queries/queries';

const MovieDetail = ({ selectedMovie }) => {
  const { loading, data, error } = useQuery(Get_Movie_Query, {
    skip: !selectedMovie,
    variables: { id: selectedMovie },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Something went wrong! <b /> {error.message}
      </div>
    );
  }

  const renderMovieDetail = () => {
    const { movie } = data || {};

    if (movie) {
      return (
        <div>
          <h2>{movie.name}</h2>
          <p>Genre : {movie.genre}</p>
          <p>Directed By : {movie.director.name}</p>
          <p>All movies by this Director : </p>
          <ul className="other-movies">
            {movie.director.movies.map((m) => {
              return <li key={m.id}>{m.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Please Select Movie</h3>
        </div>
      );
    }
  };
  return <div>{renderMovieDetail()}</div>;
};

export default MovieDetail;
