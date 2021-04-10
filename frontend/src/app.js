import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import './styles/root.scss'

import MenuBar from './components/Menu'
import AccountModal from './components/AccountModal'
import Home from './components/Home'
import ColourIndex from './components/ColourIndex'
import SingleColour from './components/SingleColour'
import EditColour from './components/EditColour'

const App = () => {

  const [accountOpen, setAccountOpen] = useState(false)

  const handleAccountOpen = () => {
    setAccountOpen(true)
  }

  const handleAccountClose = () => {
    setAccountOpen(false)
  }

  return (<BrowserRouter>
    <CssBaseline />
    <MenuBar handleAccountOpen={handleAccountOpen} />
    <AccountModal accountOpen={accountOpen} handleAccountClose={handleAccountClose} />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/colours' component={ColourIndex} />
      <Route exact path='/colours/:id' component={SingleColour} />
      <Route exact path='/colours/:id/edit' component={EditColour} />
    </Switch>
  </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
