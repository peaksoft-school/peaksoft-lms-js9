import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import uploadImage from '../../../assets/image/uploadimage.png'

export const UploadImage = ({ onImageUpload, imageEditValue }) => {
   const [image, setImage] = useState(imageEditValue || '')

   const handleChange = (e) => {
      const file = e.target.files[0]
      setImage(file)
      onImageUpload(file)
   }

   const handleDrop = (acceptedFiles) => {
      setImage(acceptedFiles[0])
      onImageUpload(acceptedFiles[0])
   }

   const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: 'image/*',
   })

   return (
      <Container {...getRootProps()} onClick={(e) => e.stopPropagation()}>
         <label htmlFor="file">
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
               onChange={handleChange}
               {...getInputProps()}
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
   cursor: pointer;
`

const Img = styled('img')`
   height: 15vh;
`
