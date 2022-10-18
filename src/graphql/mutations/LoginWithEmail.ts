import { graphql } from 'relay-runtime'

export const LoginWithEmail = graphql`
  mutation LoginWithEmailMutation($input: UserLoginWithEmailInput!) {
    LoginWithEmailMutation(input: $input) {
      token
      me {
        name
        email
        _id
        createdAt
        updatedAt
      }
      error
      success
    }
  }
`
