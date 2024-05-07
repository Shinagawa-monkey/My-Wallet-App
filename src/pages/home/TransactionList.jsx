import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { currencyFormatter } from '../../hooks/utils'
import { useTheme } from '../../hooks/useTheme'

//styles
import styles from './Home.module.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import editIcon from '../../assets/edit.svg'

export default function TransactionList({ transactions }) {
  const { mode } = useTheme()

  // options for TimeStamp
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  // date used for TimeStamp
  let date

  transactions.forEach((transaction) => {
    date = transaction.createdAt.toDate().toLocaleDateString('en-US', options)
  })

  const { deleteDocument, updateDocument, response } =
    useFirestore('transactions')

  const [showName, setShowName] = useState(false)
  const [showAmount, setShowAmount] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [updatedName, setUpdatedName] = useState('')
  const [updatedAmount, setUpdatedAmount] = useState('')

  // for img to show name/amount conditionally
  const handleShowName = (id, name) => {
    setUpdatedName(name)
    setEditingId(id)
    setShowAmount(false)
    setShowName(true)
  }

  const handleShowAmount = (id, amount) => {
    setUpdatedAmount(amount)
    setEditingId(id)
    setShowAmount(true)
    setShowName(false)
  }

  // for btns
  const handleUpdateName = async (id) => {
    if (updatedName !== '') {
      const updates = {
        name: updatedName !== '' ? updatedName : transactions.name,
      }
      await updateDocument(id, updates)
      setEditingId(null)
    }
    handleCancelName()
  }

  const handleUpdateAmount = async (id) => {
    if (updatedAmount !== '') {
      const updates = {
        amount: updatedAmount !== '' ? updatedAmount : transactions.amount,
      }
      await updateDocument(id, updates)
      setEditingId(null)
    }
    handleCancelAmount()
  }

  // for cancel btn
  const handleCancelName = () => {
    setEditingId(null)
    setShowName(false)
  }

  const handleCancelAmount = () => {
    setEditingId(null)
    setShowAmount(false)
  }

  // Update state when transactions prop changes
  useEffect(() => {
    setUpdatedName('')
    setUpdatedAmount('')
    setEditingId(null)
  }, [transactions])

  return (
    <>
      {transactions.map((transaction) => (
        <Card
          className={`mb-4 ${
            mode === 'dark' ? styles['item-list-dark'] : styles['item-list']
          }`}
          key={transaction.id}
        >
          <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal">
              {showName && editingId === transaction.id && (
                <div className="mt-1">
                  <Form.Control
                    className={`mb-2 ${
                      mode === 'dark' ? styles['form-control-dark'] : ''
                    }`}
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder={transaction.name}
                    required
                  />

                  {editingId === transaction.id && !response.isPending && (
                    <>
                      <Button
                        type="submit"
                        className={`fw-semibold me-2 ${
                          mode === 'dark' ? styles['my-button'] : ''
                        }`}
                        variant={
                          mode === 'dark' ? 'outline-light' : 'outline-success'
                        }
                        size="md"
                        onClick={() => handleUpdateName(transaction.id)}
                      >
                        Update
                      </Button>

                      <Button
                        type="button"
                        className={`ms-2 ${
                          mode === 'dark' ? styles['delete-button'] : ''
                        }`}
                        variant={
                          mode === 'dark' ? 'outline-light' : 'outline-danger'
                        }
                        size="md"
                        onClick={handleCancelName}
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {editingId === transaction.id && response.isPending && (
                    <Button
                      type="submit"
                      size="md"
                      className={`fw-semibold ${
                        mode === 'dark' ? styles['my-button'] : ''
                      }`}
                      variant={
                        mode === 'dark' ? 'outline-light' : 'outline-success'
                      }
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
                </div>
              )}

              {(!showName || !(transaction.id === editingId)) && (
                <div className="me-2 fs-4">
                  {transaction.name}
                  <Image
                    className={`ms-2 mb-2 ${
                      mode === 'dark' ? styles['edit1-dark'] : styles.edit1
                    }`}
                    src={editIcon}
                    alt="Edit transaction name"
                    onClick={() =>
                      handleShowName(transaction.id, transaction.name)
                    }
                  />
                </div>
              )}

              {showAmount && editingId === transaction.id && (
                <div className="mt-1">
                  <Form.Control
                    className={`mt-1 mb-2 ${
                      mode === 'dark' ? styles['form-control-dark'] : ''
                    }`}
                    type="number"
                    value={updatedAmount}
                    onChange={(e) => setUpdatedAmount(e.target.value)}
                    placeholder={transaction.amount}
                    required
                  />

                  {editingId === transaction.id && !response.isPending && (
                    <>
                      <Button
                        type="submit"
                        className={`fw-semibold me-2 ${
                          mode === 'dark' ? styles['my-button'] : ''
                        }`}
                        variant={
                          mode === 'dark' ? 'outline-light' : 'outline-success'
                        }
                        size="md"
                        onClick={() => handleUpdateAmount(transaction.id)}
                      >
                        Update
                      </Button>

                      <Button
                        type="button"
                        className={`ms-2 ${
                          mode === 'dark' ? styles['delete-button'] : ''
                        }`}
                        variant={
                          mode === 'dark' ? 'outline-light' : 'outline-danger'
                        }
                        size="md"
                        onClick={handleCancelAmount}
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {editingId === transaction.id && response.isPending && (
                    <Button
                      type="submit"
                      size="md"
                      className={`fw-semibold ${
                        mode === 'dark' ? styles['my-button'] : ''
                      }`}
                      variant={
                        mode === 'dark' ? 'outline-light' : 'outline-success'
                      }
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
                </div>
              )}

              {(!showAmount || !(transaction.id === editingId)) && (
                <div className="d-flex align-items-baseline ms-auto fs-4 fw-semibold">
                  {currencyFormatter.format(`${transaction.amount}`)}
                  <Image
                    className={`ms-2 mb-2 ${
                      mode === 'dark' ? styles['edit1-dark'] : styles.edit1
                    }`}
                    src={editIcon}
                    alt="Edit transaction name"
                    onClick={() =>
                      handleShowAmount(transaction.id, transaction.amount)
                    }
                  />
                </div>
              )}

              <Button
                className={`ms-2 ${
                  mode === 'dark' ? styles['delete-button'] : ''
                }`}
                variant={mode === 'dark' ? 'outline-light' : 'outline-danger'}
                onClick={() => deleteDocument(transaction.id)}
                size="sm"
              >
                &times;
              </Button>
            </Card.Title>
            <Card.Text
              className={`fs-6 ${mode === 'dark' ? '' : 'text-secondary'} `}
            >
              {date}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
