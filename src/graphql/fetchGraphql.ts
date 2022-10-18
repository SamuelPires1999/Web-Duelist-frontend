/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchGraphQL(text: string, variables?: any) {
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      authorization: `${localStorage.getItem('AUTH-TOKEN')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  return await response.json()
}

export default fetchGraphQL
