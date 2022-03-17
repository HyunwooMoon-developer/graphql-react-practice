import { gql } from '@apollo/client';

const Get_Directors_Query = gql`
  {
    directors {
      name
      id
    }
  }
`;

const Get_Movies_Query = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

const Add_Movie_Mutation = gql`
  mutation ($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      name
      id
    }
  }
`;

const Get_Movie_Query = gql`
  query ($id: ID) {
    movie(id: $id) {
      id
      name
      genre
      director {
        id
        name
        age
        movies {
          name
          id
        }
      }
    }
  }
`;

export {
  Get_Directors_Query,
  Get_Movie_Query,
  Get_Movies_Query,
  Add_Movie_Mutation,
};
