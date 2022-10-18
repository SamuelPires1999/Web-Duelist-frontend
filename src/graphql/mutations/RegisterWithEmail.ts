import { graphql } from 'relay-runtime'

export const RegisterWithEmail = graphql`
  mutation RegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
    RegisterWithEmailMutation(input: $input) {
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
