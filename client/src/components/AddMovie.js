import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Get_Directors_Query,
  Add_Movie_Mutation,
  Get_Movies_Query,
} from '../queries/queries';

const AddMovie = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [addMovie] = useMutation(Add_Movie_Mutation);
  const { data, loading, error } = useQuery(Get_Directors_Query);
  console.log(data);
  console.log(directorId);

  const renderDirectors = () => {
    if (loading) {
      return <option disabled>Loading...</option>;
    }
    if (error) {
      return <option disabled>Something went wrong!</option>;
    }
    return data.directors.map((director) => {
      return <option key={director.id}>{director.name}</option>;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && genre && directorId) {
      addMovie({
        variables: {
          name,
          genre,
          directorId,
        },
        refetchQueries: [{ query: Get_Movies_Query }],
      });
    } else {
      alert('You can not add empty form');
    }
  };

  return (
    <form
      className="offset-md-9 offset-sm-6 col-sm-6 col-md-3 bg-white p-3 fixed-bottom"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="movie-name">Movie Name : </label>
        <input
          className="form-control mt-1"
          type="text"
          id="movie-name"
          name="movie-name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="genre">Genre : </label>
        <input
          className="form-control mt-11"
          type="text"
          id="genre"
          name="genre"
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column mt-2">
        <label htmlFor="director">Director</label>
        <select
          className="custom-select py-2"
          name="director"
          id="director"
          onChange={(e) => setDirectorId(e.target.value)}
        >
          <option>Select a Director</option>
          {renderDirectors()}
        </select>
      </div>
      <div className="d-flex form-group mt-3 justify-content-center">
        <button className="btn btn-primary px-4" type="submit">
          Add New Movie
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
