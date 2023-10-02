/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from '@emotion/styled'
import { TiDeleteOutline } from 'react-icons/ti'
import TextareaAutosize from 'react-textarea-autosize'
import TextEditor from '../../../../../components/UI/text-area/TextEditor'
import { TaskIcon, CodeTagIcon } from '../../../../../assets/icons'
import LinkComponent from './LinkComponent'
import PhotoGallery from './Photos'

const TaskCreate = ({
   selectedFile,
   setArrayLinks,
   arraylinks,
   removeImage,
   setIsModalOpen,
   isModalOpen,
   image,
   setSelectedFile,
   handleEditorChange,
   setCode,
   code,
   variant,
}) => {
   const handleTextareaChange = (event) => {
      setCode(event.target.value)
   }

   const deleteDocumentFile = () => {
      setSelectedFile(
         variant
            ? {
                 fileLink: null,
                 fileName: null,
              }
            : null
      )
   }
   return (
      <Block>
         <TextEditor variant="teacher" onEditorChange={handleEditorChange} />
         <LinkBlock>
            {variant ? (
               <div>
                  {selectedFile?.fileLink !== null && (
                     <DocumentName>
                        <TaskIcon />
                        <DocumentListName>
                           {selectedFile?.name}
                        </DocumentListName>
                        <Delete onClick={deleteDocumentFile} />
                     </DocumentName>
                  )}
               </div>
            ) : (
               <div>
                  {selectedFile !== null && (
                     <DocumentName>
                        <TaskIcon />
                        <DocumentListName>
                           {selectedFile?.name}
                        </DocumentListName>
                        <Delete onClick={deleteDocumentFile} />
                     </DocumentName>
                  )}
               </div>
            )}
         </LinkBlock>
         <LinkComponent
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            links={arraylinks}
            setLinks={setArrayLinks}
         />
         <div>
            <PhotoGallery removeImage={removeImage} image={image} />
         </div>
         <IconWithLink>
            <CodeTagIcon />
            <StyledCodeInput
               id="codeInput"
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
   width: 100%;
`
const DocumentName = styled('div')`
   display: flex;
   align-items: center;
`
const DocumentListName = styled('li')`
   margin-left: 8px;
`
const StyledCodeInput = styled(TextareaAutosize)`
   width: 100%;
   border-radius: 10px;
   min-height: 42px;
   max-height: 200px;
   border: 1px solid #d4d4d4;
   padding-left: 10px;
   padding: 8px 0px 0px 10px;
   font-size: 1rem;
`

const Block = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 20px;
   background-color: #fff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   width: 100%;
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
