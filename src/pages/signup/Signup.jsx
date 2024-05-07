import { useState, useEffect, useRef } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useTheme } from '../../hooks/useTheme'

//styles
import styles from './Signup.module.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(false)
  const { signup, isPending, error } = useSignup()
  const confirmRef = useRef()

  const { mode } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!passwordMismatch) {
      signup(email, password, displayName)
    }
  }

  useEffect(() => {
    if (password && confirmRef.current.value.length > 0) {
      setPasswordMismatch(password !== confirmPassword)
    } else {
      setPasswordMismatch(false)
    }
  }, [password, confirmPassword])

  return (
    <div
      className={`my-auto ${
        mode === 'dark' ? styles['signup-form-dark'] : styles['signup-form']
      }`}
    >
      <Form onSubmit={handleSubmit} className="mb-4">
        <h1 className="fs-2 fw-bolder text-center">Signup</h1>

        <Form.Group className="mb-3" controlId="formBasicDisplayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            className={`${mode === 'dark' ? styles['form-control-dark'] : ''}`}
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setDisplayName(e.target.value.trim())}
            value={displayName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className={`${mode === 'dark' ? styles['form-control-dark'] : ''}`}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={`${mode === 'dark' ? styles['form-control-dark'] : ''}`}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={`${mode === 'dark' ? styles['form-control-dark'] : ''}`}
            type="password"
            placeholder="Confirm your password"
            ref={confirmRef}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            disabled={password === ''}
          />
          {passwordMismatch && (
            <Form.Text
              id="passwordConfirmationErrorBlock"
              className="error"
              muted
            >
              Passwords do not match. Please check again!
            </Form.Text>
          )}
        </Form.Group>

        {!isPending && (
          <Button
            type="submit"
            className={`w-100 my-3 fw-semibold ${
              mode === 'dark' ? styles['my-button'] : ''
            }`}
            variant={mode === 'dark' ? 'outline-light' : 'outline-success'}
            size="md"
          >
            Sign Up
          </Button>
        )}

        {isPending && (
          <Button
            type="submit"
            className={`w-100 my-3 fw-semibold ${
              mode === 'dark' ? styles['my-button'] : ''
            }`}
            variant={mode === 'dark' ? 'outline-light' : 'outline-success'}
            size="md"
            disabled
          >
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading
          </Button>
        )}
        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}
