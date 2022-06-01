/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFlight = /* GraphQL */ `
  query GetFlight($id: ID!) {
    getFlight(id: $id) {
      id
      name
      date
      time
      price
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const listFlights = /* GraphQL */ `
  query ListFlights(
    $filter: ModelFlightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        date
        time
        price
        from
        to
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
