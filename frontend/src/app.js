import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Home from './components/Home'
import ColourIndex from './components/ColourIndex'

const App = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/colours' component={ColourIndex} />
    </Switch>
  </BrowserRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
