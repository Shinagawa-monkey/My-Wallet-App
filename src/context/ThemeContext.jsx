//Context creates a Context object; it lets me to pass a value deep into the component tree without explicitly threading it through every component
//Provider  allows consuming components to subscribe to context changes aka passes the current context value to the tree below; any component can read it, no matter how deep it is and I don't need to manually pass it to the component in the middle
//contextType reads the current context value from the closest matching Provider above it in the tree

import { createContext, useReducer } from 'react'

//this const will retur a new context object which is stored in ThemeContext
export const ThemeContext = createContext()

//Context Provider component will wrap any part of the component tree to provide it with the value of the context
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: 'light',
  })

  const changeMode = (mode) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
