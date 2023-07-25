import { useState } from 'react'

export const useToggle = (key, initialValue = false) => {
   const storedValue = localStorage.getItem(key)
   const initialValueFromStorage =
      storedValue !== null ? JSON.parse(storedValue) : initialValue
   const [isActive, setIsActive] = useState(initialValueFromStorage)

   const setActive = (whatIsActive) => {
      setIsActive(whatIsActive)
      localStorage.setItem(key, JSON.stringify(whatIsActive))
   }

   return { setActive, isActive }
}
