/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react'
import { styled } from '@mui/material'
import uploadImage from '../../../assets/image/uploadimage.png'

export const UploadImage = ({ onImageUpload, imageEditValue }) => {
   const inputRef = useRef(null)
   const [image, setImage] = useState(imageEditValue || '')

   const handleClick = () => {
      inputRef.current.click()
   }

   const handleChange = (e) => {
      const file = e.target.files[0]
      setImage(file)
      onImageUpload(file)
   }

   return (
      <Container>
         <label htmlFor="file" onClick={handleClick}>
            {image ? (
               <Img
                  src={
                     typeof image === 'string'
                        ? image
                        : URL.createObjectURL(image)
                  }
                  alt="image"
               />
            ) : (
               <Img src={uploadImage} alt="defaultimage" />
            )}
            <input
               id="file"
               style={{ display: 'none' }}
               type="file"
               ref={inputRef}
               onChange={handleChange}
            />
         </label>
      </Container>
   )
}
const Container = styled('div')`
   width: 9vw;
   height: 15vh;
   border-radius: 0.9rem;
   display: flex;
   justify-content: center;
   overflow: hidden;
`

const Img = styled('img')`
   height: 15vh;
`
