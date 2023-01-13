import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo/initApollo";

import "./App.css";
import Homepage from "./screens/home/Homepage";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
