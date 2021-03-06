import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home, TagsGrid } from './Pages';
import AddUrlForm from './Components/AddUrlForm';
import { Grommet, Grid, Box, Nav, Header, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';
import { Tag, Link as LinkIcon, Edit, Login as LoginIcon } from 'grommet-icons';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from "react-redux";
import { store } from "./App/store";

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/v1',
  cache: new InMemoryCache()
});

function App() {

  const submitLogin = function () {
    const loginPassCode = prompt('What is your pass code ?');
    if (!loginPassCode) return;
    console.log({loginPassCode});
    return;
  };

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Grommet full theme={grommet}>
          <Router>
            <Grid
              rows={['auto', 'flex']}
              columns={['auto', 'flex']}
              areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'content', start: [0, 1], end: [1, 1] }
              ]}
            >
              <Box
                gridArea="header"
                background="brand"
                direction="row"
                justify="between"
                align="center"
              >
                <Header pad="medium" flex={true} style={{minHeight: 76}}>
                  <h2 className="margin-none">
                    <Link to="/" className="main-link">Links Manager</Link>
                    {/* <Anchor title="Links Manager" href="/" color="white">Links Manager</Anchor> */}
                  </h2>
                  {/* <Link to="#" style={{color:'#fff', textDecoration: 'none'}} onClick={() => submitLogin()}>
                    Login
                  </Link> */}
                  <Nav direction="row" alignSelf="center">
                    <Link to="/links-manager">
                      <Edit />
                    </Link>
                    {/* <Link to="/add-url">
                      <LinkIcon />
                    </Link> */}
                    <Link to="/login">
                      <LoginIcon />
                    </Link>
                    {/* <Anchor title="Create Topics and Tags" href="/tags" color="white" icon={<Tag />} hoverIndicator />
                    <Anchor title="Add a New Link" href="/add-url" color="white" icon={<LinkIcon />} hoverIndicator /> */}
                  </Nav>
                </Header>
              </Box>
              <Box gridArea="content">
                <Switch>
                  <Route path="/add-url">
                    <AddUrlForm />
                  </Route>
                  <Route path="/links-manager">
                    <TagsGrid />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Box>
            </Grid>
          </Router>
        </Grommet>
      </ApolloProvider>
    </Provider>
  );
}

export default App;