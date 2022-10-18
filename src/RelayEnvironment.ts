/* eslint-disable @typescript-eslint/ban-ts-comment */
// your-app-name/src/RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { RelayDefaultHandlerProvider } from 'relay-runtime/lib/handlers/RelayDefaultHandlerProvider'

import fetchGraphQL from './graphql/fetchGraphql'

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchRelay(params: any, variables: any) {
  return fetchGraphQL(params.text, variables)
}

const env = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
  handlerProvider: RelayDefaultHandlerProvider,
})

//@ts-ignore
window.relayEnvironment = env
//@ts-ignore
window.debugRelayStore = () => env.getStore().getSource().toJSON()

// Export a singleton instance of Relay Environment configured with our network function:
export default env
