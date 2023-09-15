/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { TiDeleteOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import TextEditor from '../text-area/TextEditor'
import { TaskIcon, CodeTagIcon, PhotoIcon } from '../../../assets/icons'
import LinkComponent from './LinkComponent'
import PhotoGallery from './Photos'
import { Input } from '../input/Input'

const TaskCreate = () => {
   const [code, setCode] = useState('')
   const [IsDelete, setDelete] = useState(false)
   const [isShowedLink, setShowedLink] = useState(false)
   const [images, setImages] = useState(() => {
      const savedImg = localStorage.getItem('image')
      return savedImg ? JSON.parse(savedImg) : []
   })
   const [selectedFile, setSelectedFiles] = useState([])
   const documentFile = useRef(null)
   const fileInputRef = useRef(null)

   const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setImages([...images, imageUrl])
         localStorage.setItem('image', JSON.stringify([...images, imageUrl]))

         fileInputRef.current.value = ''
      }
   }
   const removeImage = (index) => {
      const updatedImages = images.filter((_, i) => i !== index)
      setImages(updatedImages)
   }
   const handleTextareaChange = (event) => {
      setCode(event.target.value)
   }

   const handleFileInputClick = () => {
      documentFile.current.click()
   }
   const handleFileInputChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         setSelectedFiles([...selectedFile, file])
      }
   }

   const handleUnshowedLink = () => {
      setShowedLink(true)
   }
   useEffect(() => {
      localStorage.setItem('image', JSON.stringify(images))
   }, [images])
   return (
      <Container>
         <Block>
            <TextEditor />
            {isShowedLink && (
               <LinkBlock>
                  <IconWithLink
                     onMouseEnter={() => setDelete(true)}
                     onMouseLeave={() => setDelete(false)}
                  >
                     <TaskIcon />
                     <StyledLink onClick={handleFileInputClick}>
                        Название файла формат
                     </StyledLink>
                     {IsDelete && <Delete onClick={handleUnshowedLink} />}
                  </IconWithLink>
                  <input
                     type="file"
                     ref={documentFile}
                     style={{ display: 'none' }}
                     onChange={handleFileInputChange}
                     multiple
                  />
                  {selectedFile.length > 0 && (
                     <ul>
                        {selectedFile.map((files, index) => {
                           return <li key={index}>{files.name}</li>
                        })}
                        <p>{selectedFile.name}</p>
                        <br />
                     </ul>
                  )}
               </LinkBlock>
            )}
            <LinkComponent />
            <div>
               <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
               />
               <PhotoIcon onClick={() => fileInputRef.current.click()} />
               <PhotoGallery removeImage={removeImage} images={images} />
            </div>
            <IconWithLink>
               <CodeTagIcon />
               <StyledCodeInput
                  value={code}
                  onChange={handleTextareaChange}
                  placeholder="Вставьте код"
                  size="small"
               />
            </IconWithLink>
         </Block>
      </Container>
   )
}

export default TaskCreate

const IconWithLink = styled('div')`
   display: flex;
   align-items: center;
   gap: 8px;
`
const StyledCodeInput = styled(Input)`
   width: 965px;
   & .MuiInputBase-root {
      height: 42px;
      border-radius: 10px;
      margin-top: 0.629rem;
   }
`
const Container = styled('div')`
   display: flex;
   flex-direction: column;
   padding: 30px;
   background-color: #fff;
   border: 2px solid black;
   border-radius: 6px;
   margin-left: 14%;
   margin-top: 150px;
   margin-right: 20px;
`

const Block = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 20px;
   background-color: #fff;
   border: 2px solid black;
   border-radius: 6px;
`
const LinkBlock = styled('div')`
   display: flex;
   flex-direction: column;
   padding: 40px 10px;
   color: #005fc4;
   text-decoration: underline;
`
const StyledLink = styled(Link)`
   color: #005fc4;
   text-decoration: underline;
   display: block;
   cursor: pointer;
`
const Delete = styled(TiDeleteOutline)`
   font-size: 1.6rem;
   cursor: pointer;
   color: #555454;
   margin: 0;
`
