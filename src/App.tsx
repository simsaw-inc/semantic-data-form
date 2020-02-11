import * as React from 'react';
import {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import routes, {RouteItem} from './routes';

const loadingRoute = (
    <Dimmer active page inverted>
        <Loader content="Loading..." inverted/>
    </Dimmer>
);


function RouteWithSubRoutes(route: RouteItem) {
    return (
        <Route
            exact={route.exact}
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component
                    {...props}
                    // @ts-ignore
                    routes={route.routes}
                    topDrawerRoutes={route.topDrawerRoutes}
                />
            )}
        />
    );
}

const App = () => {
    return (
        <Container>
          <Router>
            <Suspense fallback={loadingRoute}>
              <Switch>
                {
                  routes.map((route, idx) => <RouteWithSubRoutes key={idx} {...route} />)
                }
              </Switch>
            </Suspense>
          </Router>
        </Container>
    )
};

export default App;
