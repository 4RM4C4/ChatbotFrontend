import React, { useState, useEffect } from 'react'
import { Container, Col, Button, Form } from 'react-bootstrap'

import SushiChat from './SushiChat.jsx'
import loginUserService from '../services/loginUser'
import SignUpUser from './SignUpUser.jsx' 

function LoginUser({ setErrorMessage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [signUp, setSignUp] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginUserService.loginPost({
        email, password,
      })
      window.localStorage.setItem('loggedSushiUser', JSON.stringify(loginUser))
      setUser(loginUser)
      setEmail('')
      setPassword('')
    } catch (exception) {
      const ErrorMessageObject = {
        message: 'Wrong email or Password.',
        status: 'nok',
      }
      setErrorMessage(ErrorMessageObject)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSushiUser')
    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      setUser(loginUser)
    }
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event)
    }
  }
  if (signUp !== null) {
    return <SignUpUser setErrorMessage={setErrorMessage} setSignUp={setSignUp} />
  }
  if (user === null) {
    return (
      <Container className="text-white border border-white p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <Col className="d-inline-block">
          <Form.Group controlId="loginOut" className="mb-3">
            <Form.Label className="mb-0" style={{ fontSize: '2em' }}>Log in to application</Form.Label>
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="Email" autoComplete="email" value={email} onChange={({ target }) => setEmail(target.value)} style={{ backgroundColor: 'black', color: 'white' }} />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="Password" autoComplete="current-password" value={password}
              onChange={({ target }) => setPassword(target.value)}
              onKeyDown={handleKeyDown}
              style={{ backgroundColor: 'black', color: 'white' }} />
          </Form.Group>
          <Button variant="dark" onClick={handleLogin} className="mt-3">Login</Button>
          <Form.Group>
            <Form.Label
              className="mb-0"
              style={{ fontSize: '0.8em', cursor: 'pointer', color: '#007bff' }}
              onClick={() => setSignUp('signUp')}
            >
              No te encuentras registrado? <span style={{ textDecoration: 'underline' }}>Regístrate aquí.</span>
            </Form.Label>
          </Form.Group>
        </Col>
      </Container>
    )
  }

  return <SushiChat setErrorMessage={setErrorMessage} setUser={setUser} />
}

export default LoginUser
