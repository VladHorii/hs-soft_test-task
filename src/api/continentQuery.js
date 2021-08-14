import { gql } from "@apollo/client";

export const LIST_CONTINENTS = gql`
  {
    continents {
      name
      countries {
        name
        languages {
          name
        }
      }
    }
  }
`;
