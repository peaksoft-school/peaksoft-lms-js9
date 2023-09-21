import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { RiText } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import TaskCreate from '../../../../../../components/UI/task-creator/TaskCreator'
import { Button } from '../../../../../../components/UI/button/Button'
import { Input } from '../../../../../../components/UI/input/Input'
import {
   CodeTagIcon,
   LinkIcon,
   PhotoIcon,
   TaskIcon,
} from '../../../../../../assets/icons'
import { postNewTask } from '../../../../../../store/instructor/instructorThunk'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'

const CreateTask = ({ lessonId }) => {
   const [hoveredIcon, setHoveredIcon] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [editorContent, setEditorContent] = useState('')
   const [taskName, setTaskName] = useState('')
   const [code, setCode] = useState('')
   const [links, setLinks] = useState([])
   const [images, setImages] = useState([])
   const [selectedFile, setSelectedFiles] = useState([])
   const documentFile = useRef(null)
   const fileInputRef = useRef(null)
   const dispatch = useDispatch()
   const { lesson } = useSelector((state) => state.lesson)

   const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setImages([...images, imageUrl])
         localStorage.setItem('image', JSON.stringify([...images, imageUrl]))

         fileInputRef.current.value = ''
      }
   }
   const handleEditorChange = (newContent) => {
      setEditorContent(newContent)
   }
   const handleTaskNameChange = (e) => {
      setTaskName(e.target.value)
   }
   const postNewTaskForStudent = () => {
      const formattedCode = code.replace(/ /g, '\n')

      const newTask = {
         TaskName: taskName,
         name: editorContent,
         text: formattedCode,
         deadLine: `'2023-09-21',`,
      }
      dispatch(postNewTask({ newTask, lessonId, showSnackbar }))
      console.log('lessonId: ', lessonId)
      console.log('lesson: ', lesson)
   }

   const removeImage = (index) => {
      const updatedImages = images.filter((_, i) => i !== index)
      setImages(updatedImages)
   }
   const handleFileInputClick = () => {
      documentFile.current.click()
   }
   const handleFileInputChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         const fileId = uuidv4()
         file.id = fileId
         setSelectedFiles([...selectedFile, file])
      }
   }
   const openModal = () => {
      setIsModalOpen(true)
   }
   return (
      <Container>
         <Title>Cоздать задание</Title>
         <InputContainer>
            <TitleInput
               value={taskName}
               onChange={handleTaskNameChange}
               placeholder="Название задание"
            />
            <IconBlock>
               <IconContainer
                  onMouseEnter={() => setHoveredIcon('heading')}
                  onMouseLeave={() => setHoveredIcon(null)}
               >
                  <IconWrapper>
                     <IconT />
                  </IconWrapper>
                  {hoveredIcon === 'heading' && (
                     <IconTooltip>Текстовое поле</IconTooltip>
                  )}
               </IconContainer>
               <IconContainer
                  onMouseEnter={() => setHoveredIcon('italic')}
                  onMouseLeave={() => setHoveredIcon(null)}
               >
                  <IconWrapper onClick={handleFileInputClick}>
                     <TaskIcon />
                  </IconWrapper>
                  <input
                     type="file"
                     ref={documentFile}
                     style={{ display: 'none' }}
                     onChange={handleFileInputChange}
                     multiple
                  />
                  {hoveredIcon === 'italic' && (
                     <IconTooltip>Прикрепить файл</IconTooltip>
                  )}
               </IconContainer>
               <IconContainer
                  onMouseEnter={() => setHoveredIcon('underline')}
                  onMouseLeave={() => setHoveredIcon(null)}
               >
                  <IconWrapper onClick={() => fileInputRef.current.click()}>
                     <PhotoIcon />
                  </IconWrapper>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleFileChange}
                     style={{ display: 'none' }}
                     ref={fileInputRef}
                  />
                  {hoveredIcon === 'underline' && (
                     <IconTooltip>Добавить картинку</IconTooltip>
                  )}
               </IconContainer>
               <IconContainer
                  onMouseEnter={() => setHoveredIcon('bold')}
                  onMouseLeave={() => setHoveredIcon(null)}
               >
                  <IconWrapper onClick={openModal}>
                     <LinkIcon />
                  </IconWrapper>
                  {hoveredIcon === 'bold' && (
                     <IconTooltip>Вставить ссылку</IconTooltip>
                  )}
               </IconContainer>
               <IconContainer
                  onMouseEnter={() => setHoveredIcon('unorderedList')}
                  onMouseLeave={() => setHoveredIcon(null)}
               >
                  <IconWrapper>
                     <CodeTagIcon />
                  </IconWrapper>
                  {hoveredIcon === 'unorderedList' && (
                     <IconTooltip>Код</IconTooltip>
                  )}
               </IconContainer>
            </IconBlock>
         </InputContainer>
         <TaskCreate
            removeImage={removeImage}
            images={images}
            handleEditorChange={handleEditorChange}
            selectedFiles={selectedFile}
            arraylinks={links}
            setArrayLinks={setLinks}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSelectedFile={setSelectedFiles}
            code={code}
            setCode={setCode}
         />
         <BtnContainer>
            <Button variant="outlined" onClick={() => {}}>
               Отмена
            </Button>
            <Button
               onClick={postNewTaskForStudent}
               variant="contained"
               type="submit"
            >
               Сохранить
            </Button>
         </BtnContainer>
      </Container>
   )
}

export default CreateTask

const Container = styled('div')`
   display: flex;
   flex-direction: column;
   padding: 20px 20px 30px 20px;
   background-color: #fff;
   border: 2px solid #d4d4d4;
   border-radius: 6px;
   margin-bottom: 50px;
   width: 78.5vw;
`
const Title = styled('h3')`
   color: #0a06f7;
`
const InputContainer = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 87%;
`
const BtnContainer = styled('div')`
   display: flex;
   justify-content: flex-end;
   gap: 10px;
   margin-top: 30px;
`
const TitleInput = styled(Input)`
   & .MuiInputBase-root {
      width: 60.5vw;
      height: 37px;
      border-radius: 10px;
      margin: 20px 0px 20px 0px;
   }
`
const IconBlock = styled('div')`
   width: 30vw;
   display: flex;
   gap: 15px;
   margin-left: 10px;
`
const IconContainer = styled('div')`
   position: relative;
`
const IconWrapper = styled('span')`
   cursor: pointer;
`
const IconT = styled(RiText)`
   font-size: 1.6rem;
`
const IconTooltip = styled('div')`
   position: absolute;
   width: auto;
   text-align: center;
   bottom: 100%;
   transform: translateX(-30%);
   background-color: #686c70e7;
   color: #fffefe;
   padding: 8px;
   border-radius: 8px;
   z-index: 5;
   transition: opacity 0.3s ease-in-out;
`
