import React, { useRef, useState } from 'react'
import { styled } from '@mui/material'
import uploadImage from '../../../assets/image/uploadimage.png'

export const UploadImage = ({ onImageUpload }) => {
   const inputRef = useRef(null)
   const [image, setImage] = useState('')

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
         <label htmlFor="file" onSubmit={handleClick}>
            {image ? (
               <Img src={URL.createObjectURL(image)} alt="newimage" />
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
   width: 18vw;
   height: 15vh;
   border-radius: 0.9rem;
   overflow: hidden;
   display: flex;
   justify-content: center;
`

const Img = styled('img')`
   height: 15vh;
`
