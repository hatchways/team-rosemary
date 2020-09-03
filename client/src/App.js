import React, { Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SigninPage from './user/pages/SignInPage';
import Login from './user/pages/Login';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

//Lazy loading or code splitting
const SignUpPage = React.lazy(() => import('./user/pages/SignUpPage'));
const Signup = React.lazy(() => import('./user/pages/Signup'));
const Home = React.lazy(() => import('./pages/Home'));

const App = () => {
    const { token, login, logout, userId, userName } = useAuth();

    let routes;
    if (!token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    {/* <SigninPage /> */}
                    <Login />
                </Route>

                <Route path="/signup">
                    {/* <SignUpPage /> */}
                    <Signup />
                </Route>

                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/dashboard">
                    {/* <Dashboard /> */}
                    <Home />
                </Route>
                <Redirect to="/dashboard" />
            </Switch>
        );

    }
    return (

        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                userName: userName,
                login: login,
                logout: logout,
            }}
        >
            <BrowserRouter><Suspense fallback={<div className="center"><LoadingSpinner asOverlay></LoadingSpinner></div>}>{routes}</Suspense></BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;