import styles from './NotFound.module.css'
import Button from 'react-bootstrap/Button'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import NotFoundLight from '../../assets/NotFoundLight.png'
import NotFoundDark from '../../assets/NotFoundDark.png'
import { useTheme } from '../../hooks/useTheme'

export default function NotFound() {
  const { mode } = useTheme()

  return (
    <div className={styles['page-body']}>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <div className="text-center">
          <img
            className="d-block mx-auto mb-2"
            src={mode === 'light' ? NotFoundLight : NotFoundDark}
            alt="Page Not Found Error"
            width="12%"
            height="12%"
          />
          <p className="fs-3">
            {' '}
            <span className="text-danger">Opps!</span> Something went wrong.
          </p>
          <p className="lead fw-semi-bold">
            The page you’re looking for doesn’t exist.
          </p>
          <LinkContainer to="/">
            <Button
              className={`w-100 my-3 fw-semibold ${
                mode === 'dark' ? styles['my-button'] : ''
              }`}
              size="md"
              variant={mode === 'dark' ? 'outline-light' : 'outline-success'}
            >
              Go Back
            </Button>
          </LinkContainer>
        </div>
      </div>
    </div>
  )
}
