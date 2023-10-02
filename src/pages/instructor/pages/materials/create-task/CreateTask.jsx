import React, { useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { isValid, format } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import { RiText } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import TaskCreate from './TaskCreator'
import { Button } from '../../../../../components/UI/button/Button'
import { Input } from '../../../../../components/UI/input/Input'
import {
   CodeTagIcon,
   LinkIcon,
   PhotoIcon,
   TaskIcon,
} from '../../../../../assets/icons'
import {
   postNewTask,
   putNewTask,
} from '../../../../../store/instructor/instructorThunk'
import { showSnackbar } from '../../../../../components/UI/snackbar/Snackbar'
import BasicDatePicker from '../../../../../components/UI/datapicker/DataPicker'
import { getGetByIdTaskLesson } from '../../../../../store/studentLayout/studentLayoutThunk'

const CreateTask = ({ variant }) => {
   const params = useParams()
   const navigate = useNavigate()
   const { taskById: el } = useSelector((state) => state.studentLayout)
   const [hoveredIcon, setHoveredIcon] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [editorContent, setEditorContent] = useState('')
   const [taskName, setTaskName] = useState('')
   const [code, setCode] = useState('')
   const [image, setImages] = useState(null)
   const [imageFile, setImagesFile] = useState(null)
   const [selectedFile, setSelectedFiles] = useState(null)
   const [dateValue, setDateValue] = useState(null)
   const documentFile = useRef(null)
   const fileInputRef = useRef(null)
   const dispatch = useDispatch()
   const [links, setLinks] = useState({})

   useEffect(() => {
      setTaskName(variant ? el?.taskName : '')
      setEditorContent(variant ? el?.text : '')
      setSelectedFiles(
         variant ? { fileLink: el?.fileLink, name: el?.fileName } : null
      )
      setImagesFile(variant ? el?.image : null)
      setImages(variant ? el?.image : null)
      setCode(variant ? el?.code : '')
      setDateValue(variant ? new Date(el?.deadline) : null)
      setLinks({
         name: variant ? el?.linkName : '',
         link: variant ? el?.link : '',
      })
   }, [el])

   useEffect(() => {
      if (variant) {
         dispatch(getGetByIdTaskLesson(params.taskid))
      }
   }, [])

   const disableButton = !taskName?.length > 0

   let formatDate = ''
   if (dateValue && isValid(new Date(dateValue))) {
      formatDate = format(new Date(dateValue), 'yyyy-MM-dd')
   }

   const handleFileChange = (event) => {
      const file = event.target.files[0]
      setImagesFile(file)
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setImages(imageUrl)
         fileInputRef.current.value = ''
      }
   }
   const handleEditorChange = (newContent) => {
      setEditorContent(newContent)
   }
   const handleFileInputChange = (event) => {
      const file = event.target.files[0]
      setSelectedFiles(file)
   }
   const handleTaskNameChange = (e) => {
      setTaskName(e.target.value)
   }
   const postNewTaskForStudent = () => {
      const formattedCode = code.replace(/ /g, '\n')

      const newTask = {
         TaskName: taskName,
         text: editorContent,
         fileName: selectedFile?.name || '',
         fileLink: selectedFile || '',
         linkName: links.name,
         link: links.link,
         image: imageFile || null,
         code: formattedCode,
         deadLine: formatDate,
      }
      dispatch(
         variant
            ? putNewTask({
                 newTask,
                 taskId: params.taskid,
                 showSnackbar,
                 navigate,
              })
            : postNewTask({
                 newTask,
                 lessonId: params.lessonid,
                 showSnackbar,
                 navigate,
              })
      )
   }

   const removeImage = () => {
      setImages(null)
      setImagesFile(null)
   }
   const handleFileInputClick = () => {
      documentFile.current.click()
   }
   const openModal = () => {
      setIsModalOpen(true)
   }
   return (
      <Container>
         <Title>{variant ? 'Редактировать задание' : 'Cоздать задание'}</Title>
         <InputContainer>
            <InputContainerSecond>
               <TitleInput
                  id="tInput"
                  style={{ width: '100%' }}
                  value={taskName}
                  onChange={handleTaskNameChange}
                  placeholder="Название задание"
               />
            </InputContainerSecond>
            <IconBlock>
               <IconContainer
                  onMouseEnter={() => setHoveredIcon('heading')}
                  onMouseLeave={() => setHoveredIcon(null)}
               >
                  <IconWrapper>
                     <label htmlFor="tInput">
                        <IconT />
                     </label>
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
                     <label htmlFor="codeInput">
                        <CodeTagIcon />
                     </label>
                  </IconWrapper>
                  {hoveredIcon === 'unorderedList' && (
                     <IconTooltip>Код</IconTooltip>
                  )}
               </IconContainer>
            </IconBlock>
         </InputContainer>
         <TaskCreate
            removeImage={removeImage}
            image={image}
            handleEditorChange={handleEditorChange}
            selectedFile={selectedFile}
            arraylinks={links}
            setArrayLinks={setLinks}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSelectedFile={setSelectedFiles}
            code={code}
            setCode={setCode}
            variant={variant}
         />
         <ButtonAndDataPicerContainer>
            <DataBlockBlock
               onDateChange={(date) => setDateValue(date)}
               value={dateValue}
            />
            <BtnContainer>
               <Button variant="outlined" onClick={() => {}}>
                  Отмена
               </Button>
               <Button
                  disabled={disableButton}
                  onClick={postNewTaskForStudent}
                  variant="contained"
                  type="submit"
               >
                  Сохранить
               </Button>
            </BtnContainer>
         </ButtonAndDataPicerContainer>
      </Container>
   )
}

export default CreateTask

const Container = styled('div')`
   display: flex;
   flex-direction: column;
   padding: 20px 20px 30px 20px;
   background-color: #fff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   margin-bottom: 50px;
   width: 100%;
`
const Title = styled('h3')`
   color: #0a06f7;
`
const InputContainerSecond = styled('div')`
   width: 82%;
`
const InputContainer = styled('div')`
   display: flex;
   align-items: center;
   width: 100%;
`
const ButtonAndDataPicerContainer = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: flex-end;
`
const BtnContainer = styled('div')`
   display: flex;
   justify-content: flex-end;
   gap: 10px;
   margin-top: 30px;
`
const TitleInput = styled(Input)`
   & .MuiInputBase-root {
      height: 37px;
      border-radius: 10px;
      margin: 20px 0px 20px 0px;
   }
`
const IconBlock = styled('div')`
   width: 18%;
   display: flex;
   gap: 15px;
   margin-left: 10px;
`
const DataBlockBlock = styled(BasicDatePicker)`
   height: 42px;
   .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
      padding: 8px 8px 8px 0px;
   }
`
const IconContainer = styled('div')`
   width: 100%;
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
