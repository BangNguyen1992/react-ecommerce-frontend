import styled from 'styled-components'
import React from 'react'
// import { ErrorResponse } from '@apollo/link-error'

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

function DisplayError({ error }: { error: any }) {
  if (!error || !error.message) return null
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((errorNetwork, i: React.Key) => (
      // eslint-disable-next-line react/no-array-index-key
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {errorNetwork.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  )
}

export default DisplayError
