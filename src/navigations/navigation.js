import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./navigation.scss"

//Route
import PrivateRoute from './routes/private-route';
//Login
import Login from '../page';

export default class NavigationRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    render() {
        let { loading } = this.state
        if (loading) {
            return <div><p>Loading</p></div>
        } else {
            return (
                <Router>
                <Suspense fallback={<div className='h1'>Loading...</div>}>
                <div className="navigation-body">
                  <Switch>
                    {/* --------- student ------------ */}
                    <PrivateRoute
                      component={Login}
                      path={'/'}
                    //   authed={authen}
                      exact
                    />
                    {/* --------- another ------------ */}
                    <Route path='/' component={Login} />
                  </Switch>
                </div>
              </Suspense>
            </Router>
    
            )
        }
    }
}