import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";
import { SongProvider } from "./context/SongContext";
import { SongPlayingProvider } from "./context/SongPlaying";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Work from "./pages/Work";
import { LanguageProvider } from "./context/LanguageContext";

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
        <LanguageProvider>
          <SongProvider>
            <SongPlayingProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                </Routes>
              </Layout>
            </SongPlayingProvider>
          </SongProvider>
        </LanguageProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
