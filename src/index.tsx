import { createBrowserHistory } from 'history';
import React, { FC, ReactElement, Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { Redirect, Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import AllProviders from './context/AllProviders';
import MainLayout from './layouts/MainLayout';
import NotFoundScreen from './screens/404/NotFoundScreen';
import AboutScreen from './screens/about/AboutScreen';
import CommitsScreen from './screens/commits/CommitsScreen';
import ConfigScreen from './screens/config/ConfigScreen';
import GraphsScreen from './screens/graphs/GraphsScreen';
import HomeScreen from './screens/home/HomeScreen';
import LoadingScreen from './screens/loading/LoadingScreen';
import DataScreen from './screens/upload/DataScreen';
import GlobalStyle from './styles/GlobalStyle';
import './types/svg';

const history = createBrowserHistory();

const App: FC = (): ReactElement => (
  <Router history={history}>
    <AllProviders>
      <GlobalStyle />

      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path="/" render={(): ReactElement => <HomeScreen />} />
          <Route exact path="/404" render={(): ReactElement => <NotFoundScreen />} />
          <Route>
            <MainLayout>
              <Switch>
                <Route exact path="/data" render={(): ReactElement => <DataScreen />} />
                <Route exact path="/config" render={(): ReactElement => <ConfigScreen />} />
                <Route exact path="/graphs" render={(): ReactElement => <GraphsScreen />} />
                <Route exact path="/commits" render={(): ReactElement => <CommitsScreen />} />
                <Route exact path="/about" render={(): ReactElement => <AboutScreen />} />
                <Route render={(): ReactElement => <Redirect to="/404" />} />
              </Switch>
            </MainLayout>
          </Route>
        </Switch>
      </Suspense>
    </AllProviders>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
