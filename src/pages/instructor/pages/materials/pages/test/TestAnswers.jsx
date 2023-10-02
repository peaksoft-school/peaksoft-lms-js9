import React, { useEffect, useState } from 'react'
import { FormControlLabel, Switch, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
   getTestResultForInstructor,
   postIsAcceptedThunk,
} from '../../../../../../store/test/testThunk'
import { getByIdInstructor } from '../../../../../../store/courses/coursesThunk'
import { getTestNameLesson } from '../../../../../../store/studentLayout/studentLayoutThunk'
import Table from '../../../../../../components/UI/table/Table'
import { Modal } from '../../../../../../components/UI/modal/Modal'
import { Input } from '../../../../../../components/UI/input/Input'
import { Button } from '../../../../../../components/UI/button/Button'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'
import { useToggle } from '../../../../../../utils/hooks/general'
import { Isloading } from '../../../../../../components/UI/snackbar/Isloading'

export const TestAnswers = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useSelector((state) => state.auth)
   const { courses } = useSelector((state) => state.courses)
   const { testsName } = useSelector((state) => state.studentLayout)
   const { testResult, isLoading } = useSelector((state) => state.test)
   const [valueText, setValueText] = useState('Ответы больше не принимаются.')
   const { isActive, setActive } = useToggle('modalaccepted')

   const boole = !testResult.accepted

   useEffect(() => {
      dispatch(getTestNameLesson(params.lessonid))
      dispatch(getTestResultForInstructor(params.testid))
      dispatch(getByIdInstructor(id))
   }, [])

   const getCourseName = courses.find((el) => el.id === +params.id)
   const getTestName = testsName.find((el) => el.testId === +params.testid)

   const acceptChangeHandler = (e) => {
      const target = e.target.checked
      if (!target) {
         setActive(!isActive)
      } else {
         const data = {
            text: '',
            accept: false,
         }
         dispatch(
            postIsAcceptedThunk({ id: params.testid, data, showSnackbar })
         )
      }
   }

   const closeModalHandler = () => {
      setActive('')
   }

   const sendTextHandler = (e) => {
      e.preventDefault()
      const data = {
         text: valueText,
         accept: true,
      }
      dispatch(postIsAcceptedThunk({ id: params.testid, data, showSnackbar }))
      setActive('')
   }

   const columnsTableTest = [
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'correctAnswers', label: 'Правильных ответов' },
      { id: 'inCorrectAnswers', label: 'Неправильных ответов' },
      { id: 'point', label: 'Баллы' },
   ]
   return (
      <>
         {isLoading && <Isloading />}
         <ContainerNavigate>
            <button
               className="buttonOne"
               onClick={() => navigate(-1)}
               type="button"
            >
               {getTestName?.testName}
            </button>
            <div>
               <button onClick={() => navigate('/')} type="button">
                  Мои курсы
               </button>
               {'>'}
               <button
                  onClick={() =>
                     navigate(
                        `/instructor/mycoursesins/${getCourseName?.id}/materials`
                     )
                  }
                  type="button"
               >
                  {getCourseName?.courseName}
               </button>
               {'>'}
               <button type="button">Тест</button>
               {'>'}
               <button
                  className="buttonTwo"
                  onClick={() => navigate(-1)}
                  type="button"
               >
                  {getTestName?.testName}
               </button>
            </div>
         </ContainerNavigate>
         <Container>
            <ContainerAccept
               style={{
                  backgroundColor: boole ? '#36ac0c1a' : '#C91E1E1A',
                  color: boole ? '#36ac0c' : '#C91E1E',
               }}
            >
               <p>Ответов {testResult.quantityOfTestAnswer}</p>
               <main>
                  <p>Ответы {boole ? '' : 'не'} принимаются</p>
                  <FormControlLabel
                     onChange={acceptChangeHandler}
                     control={<IOSSwitch sx={{ m: 1 }} checked={boole} />}
                  />
               </main>
            </ContainerAccept>
            {testResult.testResultsListOFStudents &&
            testResult.testResultsListOFStudents?.length > 0 ? (
               <Table
                  data={testResult.testResultsListOFStudents}
                  columns={columnsTableTest}
               />
            ) : (
               <ContainerNotFound>
                  <p>Ответы {boole ? '' : 'не'} принимаются</p>
               </ContainerNotFound>
            )}
         </Container>
         <Modal
            title="Сообщение для студентов"
            open={isActive}
            handleClose={closeModalHandler}
         >
            <form onSubmit={sendTextHandler}>
               <InputStyled
                  value={valueText}
                  onChange={(e) => setValueText(e.target.value)}
               />
               <ButtonContainer>
                  <ButtonStyled variant="outlined" onClick={closeModalHandler}>
                     Отмена
                  </ButtonStyled>
                  <ButtonStyled
                     disabled={!valueText.trim().length > 0}
                     type="submit"
                  >
                     Отправить
                  </ButtonStyled>
               </ButtonContainer>
            </form>
         </Modal>
      </>
   )
}
const Container = styled('div')`
   margin-top: 20px;
`
const InputStyled = styled(Input)(() => ({
   '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
      width: '24vw',
   },
}))
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   gap: '0.62rem',
   width: '100%',
   marginTop: '20px',
}))
const ButtonStyled = styled(Button)(() => ({
   height: '2.625rem',
}))

const ContainerNotFound = styled('div')`
   padding: 20px;
   background-color: #fff;
   border-radius: 10px;
   border: 1px solid #d4d4d4;
   text-align: center;
   p {
      color: #70757a;
   }
`
const ContainerAccept = styled('div')`
   border-radius: 10px;
   border: 1px solid #d4d4d4;
   padding: 20px;
   margin: 20px 0;
   display: flex;
   align-items: center;
   justify-content: space-between;
   main {
      display: flex;
      align-items: center;
      gap: 1rem;
   }
   .css-j204z7-MuiFormControlLabel-root {
      margin-right: 0;
   }
`
const ContainerNavigate = styled('div')`
   display: flex;
   align-items: end;
   gap: 10px;
   div {
      display: flex;
      align-items: start;
      gap: 5px;
      color: #8d949e;
      font-size: 1rem;
   }
   .buttonOne {
      cursor: pointer;
      color: var(--black, #292929);
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
   }
   .buttonTwo {
      color: #1f6ed4;
   }
   button {
      cursor: pointer;
      background-color: none;
      border: none;
      color: #8d949e;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
   }
`
const IOSSwitch = styled((props) => (
   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
   width: 42,
   height: 26,
   padding: 0,
   '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
         transform: 'translateX(16px)',
         color: '#fff',
         '& + .MuiSwitch-track': {
            backgroundColor:
               theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
            opacity: 1,
            border: 0,
         },
         '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
         },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
         color: '#33cf4d',
         border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
         color:
            theme.palette.mode === 'light'
               ? theme.palette.grey[100]
               : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
         opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
   },
   '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
   },
   '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#C91E1E' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
         duration: 500,
      }),
   },
}))
