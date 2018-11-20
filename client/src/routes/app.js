import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Switch, Route, Redirect } from 'react-router';
import App from '../pages/app'

export default (store) => {

  const routes = (
    <Router history={store.history}>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/app"/>
        )}/>
        <Route path="/app" component={App} />
      </Switch>
    </Router>
  )
  return routes
}