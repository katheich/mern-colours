import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import './styles/root.scss'

import MenuBar from './components/Menu'
import Home from './components/Home'
import ColourIndex from './components/ColourIndex'

const App = () => (

  <BrowserRouter>
    <CssBaseline />
    <MenuBar />
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
