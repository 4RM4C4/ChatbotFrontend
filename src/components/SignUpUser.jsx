import React, { useState, useEffect } from 'react'
import { Container, Col, Button, Form } from 'react-bootstrap'
import signUpUserService from '../services/signUpUser'

function SignUpUser({ setErrorMessage, setSignUp }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      await signUpUserService.signUpPost({
        nombre,
        email,
        password,
      })
      setSignUp(null)
      setNombre('')
      setEmail('')
      setPassword('')
    } catch (exception) { 
      const ErrorMessageObject = {
        message: exception.response.data,
        status: 'nok',
      }
      setErrorMessage(ErrorMessageObject)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Container className="text-white border border-white p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', marginBottom: '20px', textAlign: 'center' }}>
      <Col className="d-inline-block">
        <Form.Group controlId="loginOut" className="mb-3">
          <Form.Label className="mb-0" style={{ fontSize: '2em' }}>Sign up to application</Form.Label>
        </Form.Group>
        <Form.Group controlId="nombre" className="mt-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="Nombre" autoComplete="nombre" value={nombre} onChange={({ target }) => setNombre(target.value)} style={{ backgroundColor: 'black', color: 'white' }} />
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="Email" autoComplete="email" value={email} onChange={({ target }) => setEmail(target.value)} style={{ backgroundColor: 'black', color: 'white' }} />
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="Password" autoComplete="current-password" value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{ backgroundColor: 'black', color: 'white' }}
          />
        </Form.Group>
        <Button variant="dark" onClick={handleSignUp} className="mt-3">SignUp</Button>
      </Col>
    </Container>
  )
}

export default SignUpUser
