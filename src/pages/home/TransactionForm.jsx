import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useTheme } from '../../hooks/useTheme'

//styles
import styles from './Home.module.css'

export default function TransactionForm({ uid }) {
  const { mode } = useTheme()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validate the amount field
    if (isNaN(amount) || amount < 0) {
      setError('Please enter a valid positive number for the amount field.')
      return
    }
    // Add the document to Firestore
    addDocument({ uid, name, amount }).catch((error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error adding document:', error)
      }
      setName('')
      setAmount('')
      setError('')
    })
  }

  //reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
      setError('')
    } else if (response.error) {
      setError('Error adding transaction: ' + response.error)
    }
  }, [response])

  return (
    <>
      <Form
        className={`rounded p-4 ${
          mode === 'dark' ? styles['form-dark'] : styles.form
        }`}
        onSubmit={handleSubmit}
      >
        <h1 className="fs-4 mb-4 fw-bolder text-center">Add a Transaction</h1>

        <Form.Group className="mb-3" controlId="formBasicTransactionName">
          <Form.Label>Transaction name</Form.Label>
          <Form.Control
            className={`${mode === 'dark' ? styles['form-control-dark'] : ''}`}
            type="text"
            placeholder="Item name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTransactionAmount">
          <Form.Label>Amount ($)</Form.Label>
          <Form.Control
            className={`${mode === 'dark' ? styles['form-control-dark'] : ''}`}
            type="number"
            placeholder="Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="mt-2">{error}</p>
        </Form.Group>

        <Button
          type="submit"
          className={`w-100 my-3 fw-semibold ${
            mode === 'dark' ? styles['my-button'] : ''
          }`}
          variant={mode === 'dark' ? 'outline-light' : 'outline-success'}
          size="md"
        >
          Add Transaction
        </Button>
      </Form>
    </>
  )
}
