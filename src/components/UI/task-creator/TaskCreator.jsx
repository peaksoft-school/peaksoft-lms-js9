/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from '@emotion/styled'
import { TiDeleteOutline } from 'react-icons/ti'
import TextareaAutosize from 'react-textarea-autosize'
import TextEditor from '../text-area/TextEditor'
import { TaskIcon, CodeTagIcon } from '../../../assets/icons'
import LinkComponent from './LinkComponent'
import PhotoGallery from './Photos'

const TaskCreate = ({
   selectedFiles,
   setArrayLinks,
   arraylinks,
   removeImage,
   setIsModalOpen,
   isModalOpen,
   images,
   setSelectedFile,
   handleEditorChange,
   setCode,
   code,
}) => {
   const handleTextareaChange = (event) => {
      setCode(event.target.value)
   }
   const deleteDocumentFile = (id) => {
      const fileToDelete = selectedFiles.find((file) => file.id === id)
      if (fileToDelete) {
         const updatedFiles = selectedFiles.filter((file) => file.id !== id)
         setSelectedFile(updatedFiles)
      }
   }
   return (
      <Block>
         <TextEditor variant="teacher" onEditorChange={handleEditorChange} />
         <LinkBlock>
            {selectedFiles.length > 0 && (
               <ul>
                  {selectedFiles.map((files, index) => {
                     return (
                        <DocumentName>
                           <TaskIcon />
                           <DocumentListName key={index}>
                              {files.name}
                           </DocumentListName>
                           <Delete
                              onClick={() => deleteDocumentFile(files.id)}
                           />
                        </DocumentName>
                     )
                  })}
                  <br />
               </ul>
            )}
         </LinkBlock>
         <LinkComponent
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            links={arraylinks}
            setLinks={setArrayLinks}
         />
         <div>
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
   )
}

export default TaskCreate

const IconWithLink = styled('div')`
   display: flex;
   align-items: center;
   gap: 8px;
   /* width: 70vw; */
`
const DocumentName = styled('div')`
   display: flex;
   align-items: center;
`
const DocumentListName = styled('li')`
   margin-left: 8px;
`
const StyledCodeInput = styled(TextareaAutosize)`
   width: 69.5vw;
   border-radius: 10px;
   min-height: 42px;
   max-height: 200px;
   border: 2px solid #d4d4d4;
   padding-left: 10px;
   ::placeholder {
      padding: 6px 0px 0px 10px;
      font-size: 1.2rem;
   }
`

const Block = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 20px;
   background-color: #fff;
   border: 2px solid #d4d4d4;
   border-radius: 6px;
   width: 75vw;
`
const LinkBlock = styled('div')`
   display: flex;
   flex-direction: column;
   color: #005fc4;
   text-decoration: underline;
`
const Delete = styled(TiDeleteOutline)`
   font-size: 1.5rem;
   cursor: pointer;
   color: #5f5c5c;
   margin-top: 2px;
`
