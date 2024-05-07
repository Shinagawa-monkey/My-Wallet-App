import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    //log the user in
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      //dispatch login section
      dispatch({ type: 'LOGIN', payload: res.user })

      //update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(err.message)
        }
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, error, isPending }
}
