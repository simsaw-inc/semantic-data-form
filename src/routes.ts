import Home from "./containers/Home";
import * as React from "react";
import {ComponentPropsWithRef, ElementType, ExoticComponent} from "react";

export enum Path {
    Home = '/',
    Login = '/login',
    ComplexForm = '/complex-form',
    TermsAndConditions = '/terms-conditions',
}

export interface Route {
    path: string;
    component: React.ComponentClass | React.FunctionComponent | ExoticComponent<ComponentPropsWithRef<ElementType>>;
    exact?: boolean;
}

export interface RouteItem extends Route {
    routes?: Array<Route>
    topDrawerRoutes?: Array<Route>
}

const routes: Array<RouteItem> = [
    {
        path: Path.Home,
        component: Home,
        exact: true
    },
    {
        path: Path.Login,
        component: React.lazy(() => import('./containers/Login')),
        exact: true
    },
    {
        path: Path.ComplexForm,
        component: React.lazy(() => import('./containers/ComplexForm')),
        exact: true
    },
    {
        path: Path.TermsAndConditions,
        component: React.lazy(() => import('./containers/TermsAndConditions')),
        exact: true
    },
    {
        path: "*", component: React.lazy(() => import('./containers/NoMatch')),
        exact: true
    },
];


export default routes;


