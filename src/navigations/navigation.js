import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./navigation.scss"

//Route
import PrivateRoute from './routes/private-route';
//Page
import { Login, Dashboard, Profile, Add, ConfrimToSubmit } from '../page';
//api
import { POST, GET } from '../api'

export default class NavigationRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      authen: true,
      role: 't1',
    }
  }
  render() {
    let { loading, role, authen } = this.state

    const onLogin = async() => {
      try {
        await POST("/authen/login", { user_no: '001', id_card: '1349900820377'})
      } catch(err) {
        console.log(err)
      }
    }

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
                <PrivateRoute component={Add} path={`/add`} authed={authen} exact />
                <PrivateRoute component={ConfrimToSubmit} path={`/confirm`} authed={authen} exact />
                
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