/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFlight = /* GraphQL */ `
  mutation CreateFlight(
    $input: CreateFlightInput!
    $condition: ModelFlightConditionInput
  ) {
    createFlight(input: $input, condition: $condition) {
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
export const updateFlight = /* GraphQL */ `
  mutation UpdateFlight(
    $input: UpdateFlightInput!
    $condition: ModelFlightConditionInput
  ) {
    updateFlight(input: $input, condition: $condition) {
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
export const deleteFlight = /* GraphQL */ `
  mutation DeleteFlight(
    $input: DeleteFlightInput!
    $condition: ModelFlightConditionInput
  ) {
    deleteFlight(input: $input, condition: $condition) {
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
