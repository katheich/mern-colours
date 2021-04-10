import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import Auth from '../lib/Auth'

import '../styles/components/AccountForm.scss'

const AccountModal = ({ accountOpen, handleAccountClose }) => {

  const [purpose, setPurpose] = useState('register')
  const [values, setValues] = useState({
    showPassword: false,
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handlePurpose = (prop) => {
    setPurpose(prop)
  }

  function handleSubmit(e) {
    const data = {
      email: values.email,
      password: values.password
    }

    e.preventDefault()

    if (purpose === 'register') {
      data.username = values.username
      data.passwordConfirmation = values.passwordConfirmation

      axios.post('/api/register', data)
        .then(() => handlePurpose('login'))
        .catch(err => setErrors({ ...errors, ...err.response.data }))
    }

    if (purpose === 'login') {
      console.log(data)
      axios.post('/api/login', data)
        .then(resp => {
          Auth.setToken(resp.data.token)
          handleAccountClose()
        })
        .catch(err => setErrors({ ...errors, ...err.response.data }))
    }

  }

  return (<Modal
    open={accountOpen}
    onClose={handleAccountClose}
    className="modal"
  >
    <Paper className="modal-content " elevation={1} id="account-form">
      <h2>{purpose === 'register' ? 'Create New Account' : 'Login'}</h2>
      {purpose === 'register' && <div>
        Already have an account? Click <span className="link" onClick={() => handlePurpose('login')}>here</span> to login instead.
      </div>}
      {purpose === 'login' && <div>
        Don&apos;t have an account yet? Click <span className="link" onClick={() => handlePurpose('register')}>here</span> to register instead.
      </div>}
      {purpose === 'register' && <TextField
        label="Username"
        onChange={handleChange('username')}
      />}
      <TextField
        label="Email"
        onChange={handleChange('email')}
      />
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {purpose === 'register' && <FormControl>
        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
        <Input
          id="confirm-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.passwordConfirmation}
          onChange={handleChange('passwordConfirmation')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>}

      <Button onClick={e => handleSubmit(e)}>
        <div className="rainbow-text">
          {purpose === 'register' ? 'Complete registration' : 'Login'}
        </div>
      </Button>
      {errors.message && <small className="help is-danger">
        {errors.message}
      </small>}
    </Paper>
  </Modal>)
}


export default AccountModal