import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useTheme } from '../../hooks/useTheme'

//styles
import styles from './Login.module.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

export default function Login() {
  const { mode } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password);
    login(email, password)
  }

  return (
    <div className={styles['login-form']}>
      <Form onSubmit={handleSubmit}>
        <h1 className="fs-2 mb-4 fw-bolder text-center">Login</h1>

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

        {!isPending && (
          <Button
            type="submit"
            className={`w-100 my-3 fw-semibold ${
              mode === 'dark' ? styles['my-button'] : ''
            }`}
            variant={mode === 'dark' ? 'outline-light' : 'outline-success'}
            size="md"
          >
            Login
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
