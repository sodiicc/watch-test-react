import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Loader from './Loader'

const VALID_EMAIL = 'admin@gmail.com'
const VALID_NAME = 'admin'
const VALID_PASSWORD = 'password'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    setError('')
  }, [email, name, password])

  const loginMock = data => {
    const status = validation(data)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (status.field) {
          case '':
            resolve({ status: 200, message: 'Login Success' })
            break
          case 'email':
            reject({ status: 500, message: 'Email is not valid' })
            break
          default:
            reject({ status: 400, message: 'Name or Password is wrong' })
        }
      }, 1000)
    })
  }

  const validation = data => {
    const status = { field: '' }
    if (data.email !== VALID_EMAIL) status.field = 'email'
    else if (data.name !== VALID_NAME) status.field = 'name'
    else if (data.password !== VALID_PASSWORD) status.field = 'password'
    return status
  }

  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const onFormSubmit = event => {
    event.preventDefault()
    const data = {
      email,
      name,
      password,
    }
    setLoaded(false)
    loginMock(data).then(() => {
      resetForm()
      navigate('/success')
    }).catch(error => {
      setError(error.message)
    }).finally(() => setLoaded(true))
  }

  const resetForm = () => {
    setEmail('')
    setName('')
    setPassword('')
    setError('')
  }

  const validateForm = () => {
    if (!email.trim()) return 'Email can not be empty'
    if (!name.trim()) return 'Name can not be empty'
    if (!password.trim()) return 'Password can not be empty'
    return ''
  }

  return (
    <div className='registration'>
      {
        loaded ? null : <Loader />
      }
      <p>Valid email is - <b>{VALID_EMAIL}</b></p>
      <p>Valid name is - <b>{VALID_NAME}</b></p>
      <p>Valid password is - <b>{VALID_PASSWORD}</b></p>
      <form>
        <h2>Login Form</h2>
        <p className='error'>{error}</p>
        <div className='space-between block'>
          <label for='email'>Email</label>
          <input
            placeholder="Email"
            aria-label="LogEmailin"
            type="text"
            name="email"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div className='space-between block'>
          <label for='name'>Name</label>
          <input
            placeholder="Name"
            aria-label="Name"
            type="text"
            name="name"
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div className='space-between block'>
          <label for='password'>Password</label>
          <input
            type="text"
            name="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className='block buttons'>
          <button disabled={!!validateForm()} type="submit" onClick={onFormSubmit} title={validateForm()}>Submit</button>
          <button type="button" onClick={resetForm}>Clean</button>
        </div>
      </form>
    </div>
  )
}
