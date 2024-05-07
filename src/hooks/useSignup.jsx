import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      //console.log(res.user);

      if (!res) {
        throw new Error(
          'We could not complete your sign up. Please try again after some time!'
        )
      }

      //add display name to user
      await res.user.updateProfile({ displayName })

      //dispatch login action
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
    return () => {
      // console.log('The page is unmounted')
      setIsCancelled(true)
    }
  }, [])

  return { error, isPending, signup }
}
