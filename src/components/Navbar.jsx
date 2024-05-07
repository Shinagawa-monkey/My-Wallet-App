//import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import ThemeSelector from './ThemeSelector'
import { Greeting } from './Greeting'
import { useTheme } from '../hooks/useTheme'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavItem from 'react-bootstrap/NavItem'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import { useState, useEffect } from 'react'

//styles
import styles from './Navbar.module.css'
import logo from '../assets/logo.svg'

export default function Navigationbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { greeting } = Greeting()
  const { mode } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991.98)
    }
    // Set initial state and attach the event listener
    handleResize()
    window.addEventListener('resize', handleResize)
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Navbar
      style={{ backgroundColor: '#effaf0' }}
      variant={mode === 'dark' ? 'dark' : 'light'}
      bg={mode === 'dark' ? 'success' : ''}
      expand="lg"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <Image
              src={logo}
              className={`d-none d-sm-inline-block align-top me-3 
              ${mode === 'dark' ? styles['img-dark'] : styles.img}`}
              alt="Wallet with money"
            />
            <h1
              className={`d-inline-block fs-3 fw-bold mb-0 ${styles['nav-header']}`}
            >
              My Wallet
            </h1>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav
            className={
              isMobile
                ? 'align-items-lg-center mt-2'
                : 'align-items-lg-center mt-lg-0'
            }
          >
            {!user && (
              <>
                <Nav.Item className="mb-2 mb-lg-0">
                  <LinkContainer to="/login">
                    <Nav.Link
                      className={`fs-4 ${styles['nav-btn-link']}`}
                      aria-label="Login"
                    >
                      Login
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>

                <Nav.Item className="mb-2 mb-lg-0">
                  <LinkContainer to="/signup">
                    <Nav.Link
                      className={`fs-4 ${styles['nav-btn-link']}`}
                      aria-label="Signup"
                    >
                      Signup
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </>
            )}

            {user && (
              <>
                <NavItem className={`mb-2 mb-lg-0 ${styles['nav-btn-link']}`}>
                  <h2
                    className={`fs-4 me-3  mb-0 ${styles['nav-header']} ${
                      mode === 'dark' ? 'text-light' : ''
                    }`}
                  >
                    {greeting}
                    {user.displayName}!
                  </h2>
                </NavItem>
                <Nav.Item className={`mb-2 mb-lg-0 ${styles['nav-btn-link']}`}>
                  <Button
                    className={`fw-semibold ${
                      mode === 'dark' ? styles['my-button'] : ''
                    }`}
                    variant={
                      mode === 'dark' ? 'outline-light' : 'outline-success'
                    }
                    size="md"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </Nav.Item>
              </>
            )}

            <NavItem className={`ms-lg-3 ${styles['nav-btn-link']}`}>
              <ThemeSelector />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
