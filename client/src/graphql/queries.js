import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query GetPeople {
    people {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        price
        year
      }
    }
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query GetPersonWithCars($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        price
        year
      }
    }
  }
`;
