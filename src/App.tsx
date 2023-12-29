import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Songs from "./pages/Songs";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_HOST}`,
});

const authLink = setContext((_, { headers }) => {
  const token = `${import.meta.env.VITE_PERMANENT_AUTH_TOKEN}`;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
