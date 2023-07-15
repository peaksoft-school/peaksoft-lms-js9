import React from 'react'

export const Radio = ({ checked, onChange, label, value }) => {
   return (
      <label>
         <input
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
         />
         {label}
      </label>
   )
}
