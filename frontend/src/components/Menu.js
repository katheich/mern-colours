import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import { Link, withRouter } from 'react-router-dom'

import '../styles/components/Menu.scss'

import Auth from '../lib/Auth'

function MenuBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleAccountModal() {
    props.handleAccountOpen()
    handleClose()
  }

  function handleLogout() {
    Auth.logout()
    props.history.push('/')
    setAnchorEl(null)
  }

  return (
    <div id="menu">
      <IconButton id="menu-button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <ArrowBackIosOutlinedIcon className="icon" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/"><HomeOutlinedIcon /></Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/colours"><ListAltOutlinedIcon /></Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/colours/new"><AddCircleOutlineOutlinedIcon /></Link>
        </MenuItem>
        {!Auth.isAuthorized() && <MenuItem onClick={handleAccountModal}>
          <AccountCircleOutlinedIcon />
        </MenuItem>}
        {Auth.isAuthorized() && <MenuItem>
          <a onClick={() => handleLogout()}><ExitToAppOutlinedIcon /></a>
        </MenuItem>}
      </Menu>
    </div>
  )
}

export default withRouter(MenuBar)