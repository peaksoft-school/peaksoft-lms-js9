import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
   getGetByIdTaskLesson,
   getGetResultTaskLesson,
   postTaskLesson,
} from '../../../../store/studentLayout/studentLayoutThunk'
import TextEditor from '../../../../components/UI/text-area/TextEditor'
import { Input } from '../../../../components/UI/input/Input'
import { Button } from '../../../../components/UI/button/Button'
import { ImportIcon } from '../../../../assets/icons'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const TaskPage = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const {
      taskById: el,
      taskResult,
      isLoading,
   } = useSelector((state) => state.studentLayout)

   const { id } = useSelector((state) => state.auth)
   const [editorContent, setEditorContent] = useState('')
   const [comment, setComment] = useState('')
   const [fileSend, setFileSend] = useState('')
   const [fileName, setFileName] = useState('')
   const fileInputRef = useRef(null)

   useEffect(() => {
      dispatch(getGetByIdTaskLesson(+params.taskid))
   }, [])
   useEffect(() => {
      dispatch(getGetResultTaskLesson(+params.taskid))
   }, [])

   const handleChange = (e) => {
      const fil = e.target.files[0]
      setFileSend(fil)
      const file = fileInputRef.current.files[0]
      if (file) {
         setFileName(file.name)
      }
   }

   const handleEditorChange = (newContent) => {
      setEditorContent(newContent)
   }
   const commentChahgeHandler = (e) => {
      setComment(e.target.value)
   }
   const submitTaskHandler = (e) => {
      e.preventDefault()
      const data = {
         text: editorContent,
         file: fileSend,
         comment,
      }
      dispatch(
         postTaskLesson({
            data,
            taskId: +params.taskid,
            studentId: id,
            showSnackbar,
         })
      )
   }

   const db = taskResult?.point
   const getBackgroundColor = () => {
      switch (true) {
         case db >= 0 && db <= 3:
            return '#db3700'
         case db >= 4 && db <= 6:
            return '#FF9F0A'
         case db >= 7 && db <= 10:
            return '#36AC0C'
         default:
            return '#ff891b'
      }
   }
   const backgroundColor = getBackgroundColor()
   return (
      <Container>
         {isLoading && <Isloading />}
         <ContainerTask>
            <h2>Задание учителя</h2>
            <ContainerTaskNameAndDeadline>
               <h4>{el.taskName}</h4>
               <div>
                  <h4>
                     <big>Срок cдачи : </big>
                     {el.deadline}
                  </h4>
               </div>
            </ContainerTaskNameAndDeadline>
            <p>{el.text}</p>
         </ContainerTask>
         <ContainerTaskSend>
            {taskResult.send ? (
               <div>
                  <ContainerYourTask>
                     <h2>Ваша задача</h2>
                     <Input value={taskResult?.text} multiline rows={4} />
                     <a
                        href={taskResult?.file}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        {taskResult?.file}
                     </a>
                  </ContainerYourTask>
                  <ContainerReviewed backgroundColor={backgroundColor}>
                     <h2>
                        {taskResult.taskAnswerStatus === 'REVIEWED'
                           ? 'Расматиравется'
                           : 'Успешно принято'}
                     </h2>
                     {!taskResult.point ? (
                        ''
                     ) : (
                        <h2>{taskResult.point} баллов из 10</h2>
                     )}
                  </ContainerReviewed>
               </div>
            ) : (
               <div>
                  <ContainerTextEditor>
                     <ContainerSendFile>
                        <h2>Отправить задание</h2>
                        <label htmlFor="file">
                           <Button
                              variant="outlined"
                              onClick={() => fileInputRef.current.click()}
                           >
                              Загрузить файл
                              <ImportIcon />
                           </Button>
                           <input
                              id="file"
                              type="file"
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                              onChange={handleChange}
                           />
                        </label>
                     </ContainerSendFile>
                     <main>
                        <TextEditor
                           variant="student"
                           onEditorChange={handleEditorChange}
                        />
                     </main>
                     <p>{fileName}</p>
                     <ContainerInputBtn>
                        <div>
                           <InputStyled
                              value={comment}
                              onChange={commentChahgeHandler}
                              placeholder="Коментарий к заданию"
                           />
                        </div>
                        <Button
                           disabled={!editorContent && !fileSend}
                           onClick={submitTaskHandler}
                        >
                           Отправить
                        </Button>
                     </ContainerInputBtn>
                  </ContainerTextEditor>
               </div>
            )}
         </ContainerTaskSend>
      </Container>
   )
}

const ContainerReviewed = styled('div')`
   padding: 1rem;
   border-radius: 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: ${(props) => props.backgroundColor};
   h2 {
      color: #fff;
   }
`
const Container = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 5px;
`
const ContainerTaskNameAndDeadline = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const ContainerSendFile = styled('div')`
   display: flex;
   align-items: end;
   justify-content: space-between;
   position: relative;
   h2 {
      margin-bottom: 1rem;
   }
   Button {
      display: flex;
      gap: 0.5rem;
      position: absolute;
      right: 0%;
      top: 40%;
      svg {
         width: 1.2rem;
         path {
            fill: #1f6ed4;
         }
      }
   }
`
const ContainerYourTask = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 0.8rem;
   margin-bottom: 1rem;
   & .MuiFormControl-root {
      display: flex;
      width: 100%;
   }
   Input {
      width: 100%;
      height: 10rem;
   }
   a {
      color: #394ae6;
      text-decoration: underline;
   }
`
const ContainerTask = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 0.8rem;
   width: 100%;
   p {
      height: 26vh;
      overflow-y: scroll;
      line-height: 2rem;
   }
`
const ContainerTextEditor = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 1rem;
   margin-top: 0.5rem;
   main {
      display: flex;
      width: 100%;
   }
`
const ContainerInputBtn = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 20px;
   div {
      width: 100%;
   }
`

const InputStyled = styled(Input)`
   input {
      height: 29px;
   }
`

const ContainerTaskSend = styled('div')`
   margin-top: 20px;
`
