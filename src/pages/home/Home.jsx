import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useTheme } from '../../hooks/useTheme'

//styles
import styles from './Home.module.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

//components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {
  const { user } = useAuthContext()
  const { mode } = useTheme()
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )

  return (
    <Container className={`mx-auto my-5 ${styles.container}`}>
      <Row className="justify-content-between">
        <Col
          md={6}
          xs={12}
          className={`order-2 order-md-1 mt-md-2 mt-4 my-5 ${styles.content}`}
        >
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents} />}
          {!error && !documents && (
            <Spinner
              animation={mode === 'dark' ? 'border' : 'grow'}
              variant="success"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
        <Col
          md={4}
          xs={12}
          className={`order-1 order-md-2 mt-md-2 mt-4 ${styles.content}`}
        >
          <TransactionForm uid={user.uid} />
        </Col>
      </Row>
    </Container>
  )
}
