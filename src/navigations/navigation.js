import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./navigation.scss"

//Route
import PrivateRoute from './routes/private-route';
//Page
import { Login, Dashboard, Profile, Teacherprofile} from '../page';

export default class NavigationRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      authen: true,
      role: 'stident',
    }
  }
  render() {
    let { loading, role, authen } = this.state
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
                  authed={authen}
                  exact
                />
                <PrivateRoute component={Dashboard} path={`/dashboard`} authed={authen} exact />
                <PrivateRoute component={Profile} path={`/profile`} authed={authen} exact />
                <PrivateRoute component={Teacherprofile} path={`/Teacherprofile`} authed={authen} exact />
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