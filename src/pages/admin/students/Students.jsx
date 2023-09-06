import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Pagination, Stack, TableCell } from '@mui/material'
import Select from 'react-select/creatable'
import { Header } from '../../../components/UI/header/Header'
import {
   DeleteStudent,
   PutStudent,
   getAllStudents,
   postExcelFile,
   postNewStudents,
} from '../../../store/student/studentThunk'
import { IconButtons } from '../../../components/UI/button/IconButtons'
import { DeleteIcon, EditIcon } from '../../../assets/icons'
import AddNewStudentModal from './AddNewStudentModal'
import { ModalDeleteStudent } from './ModalDeleteStudent'
import { useToggle } from '../../../utils/hooks/general'
import { ModalEditStudent } from './ModalEditStudent'
import { Modal } from '../../../components/UI/modal/Modal'
import useGetAllGroup from '../../../utils/hooks/getAllGroup'
import { Button } from '../../../components/UI/button/Button'
import { Isloading } from '../../../components/UI/snackbar/Isloading'
import Table from '../../../components/UI/table/Table'
import { showSnackbar } from '../../../components/UI/snackbar/Snackbar'

export const Students = () => {
   const dispatch = useDispatch()
   const { students, isLoading } = useSelector((state) => state.students)

   const [getId, setId] = useState()
   const [studentData, setStudentData] = useState()
   const [IsEdit, setIsEdit] = useState(false)
   const [excelFile, setExcelFile] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null)
   const [selectedFormat, setSelectedFormat] = useState('')
   const [page, setPage] = useState(1)

   const { isActive: addedModal, setActive: setAddedModal } =
      useToggle('editmodalstudent')
   const { isActive: deleteModal, setActive: setDeleteModal } =
      useToggle('deletemodalstudent')
   const { groupOptions, selectedGroupID, setSelectedGroupID } =
      useGetAllGroup()

   useEffect(() => {
      dispatch(getAllStudents({ currentPage: page, pageSize: 10 }))
   }, [])

   const showModalHandler = () => {
      setAddedModal(!addedModal)
   }
   const closeModalHandler = () => setAddedModal('')
   const closeDeleteModalHandler = () => setDeleteModal('')

   const openModalDelete = (id) => {
      setDeleteModal(!deleteModal)
      setId(id)
   }
   const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0])
   }
   const handleSubmit = async () => {
      if (selectedFile) {
         const id = String(selectedGroupID.value)
         const formData = new FormData()
         formData.append('file', selectedFile)
         dispatch(postExcelFile({ formData, id, showSnackbar }))
      }
      setExcelFile(false)
   }
   const openExcelFileModal = () => {
      setExcelFile(true)
   }
   const closeExcelFileModal = () => {
      setExcelFile(false)
   }

   const addStudent = (data) => {
      dispatch(postNewStudents({ data, showSnackbar }))
   }
   const handleButtonClick = () => {
      document.getElementById('file-input').click()
   }
   const openEditModal = ({ id, data }) => {
      const firstName = data.fullName.split(' ')[0]
      const lastName = data.fullName.split(' ')[1]
      const dataStudent = {
         firstName,
         lastName,
         email: data.email,
         phoneNumber: data.phoneNumber,
         groupName: data.groupName,
         studyFormat: data.studyFormat,
      }
      setId(id)
      setStudentData(dataStudent)
      setIsEdit(true)
   }
   const deleteStudentHandler = () => {
      dispatch(DeleteStudent({ studentId: getId, showSnackbar }))
      setDeleteModal('')
   }
   const updateHandler = (data) => {
      dispatch(PutStudent({ studentId: getId, values: data, showSnackbar }))
   }
   const filteredStudents =
      selectedFormat.label === 'ALL' || selectedFormat === ''
         ? students
         : students.filter(
              (items) => items.studyFormat === selectedFormat.label
           )

   const columns = [
      { id: 'id', label: 'ID' },
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'groupName', label: 'Группа' },
      { id: 'studyFormat', label: 'Формат' },
      { id: 'phoneNumber', label: 'Номер телефона' },
      { id: 'email', label: 'E-mail' },
      { id: 'password', label: 'Пароль' },
      {
         id: 'action',
         label: 'Действия',
         render: (student) => (
            <StyledTableCell key={student.id}>
               <ButtonContainer>
                  <StyledIconContainer
                     onClick={() =>
                        openEditModal({ id: student.id, data: student })
                     }
                  >
                     <IconEditStyled />
                  </StyledIconContainer>
                  <StyledIconContainer
                     onClick={() => openModalDelete(student.id)}
                  >
                     <IconDeleteStyled />
                  </StyledIconContainer>
               </ButtonContainer>
            </StyledTableCell>
         ),
      },
   ]
   return (
      <div>
         {isLoading && <Isloading />}
         <div>
            <Header
               titlePage="Администратор"
               buttonContent="Добавить студента"
               conditionButton="Students"
               onClick={() => showModalHandler('add')}
               excelClick={openExcelFileModal}
               studyFormat={selectedFormat}
               setStudyFormat={setSelectedFormat}
            />
            {excelFile && (
               <Modal
                  title="Импорт Excel в БД"
                  open={excelFile}
                  onClose={closeExcelFileModal}
               >
                  <Container>
                     <StyledSelect
                        options={groupOptions}
                        value={selectedGroupID}
                        placeholder="Группа"
                        onChange={(selectedOption) => {
                           setSelectedGroupID(selectedOption)
                        }}
                     />
                     <FileUpload>
                        <input
                           id="file-input"
                           type="file"
                           accept=".xlsx, .xls"
                           style={{ display: 'none' }}
                           onChange={handleFileChange}
                        />
                        <input
                           type="text"
                           value={selectedFile ? selectedFile.name : ''}
                           placeholder="Выберите Excel файл для импорта"
                           readOnly
                        />

                        <Button variant="outlined" onClick={handleButtonClick}>
                           Обзор...
                        </Button>
                     </FileUpload>
                     <BtnContainer>
                        <Button
                           variant="outlined"
                           onClick={closeExcelFileModal}
                        >
                           Отмена
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                           Добавить
                        </Button>
                     </BtnContainer>
                  </Container>
               </Modal>
            )}
            <AddNewStudentModal
               open={addedModal === true}
               onClose={closeModalHandler}
               addNewData={addStudent}
            />
            <ModalDeleteStudent
               open={deleteModal === true}
               handleClose={closeDeleteModalHandler}
               deleteStudentHandler={deleteStudentHandler}
            />
            <ModalEditStudent
               open={IsEdit}
               onClose={() => setIsEdit(false)}
               upDateData={updateHandler}
               studentData={studentData}
            />
         </div>
         <StyledTableContainer>
            {students !== null ? (
               <div>
                  <Table
                     columns={columns}
                     data={filteredStudents}
                     itemsPerPage={10}
                  />
                  <StackStyled>
                     <Stack spacing={3}>
                        <Pagination
                           count={Math.ceil((students.length * 2) / 10)}
                           color="primary"
                           page={page}
                           onChange={(event, newPage) => {
                              setPage(newPage)
                              dispatch(
                                 getAllStudents({
                                    currentPage: newPage,
                                    pageSize: 10,
                                 })
                              )
                           }}
                        />
                     </Stack>
                  </StackStyled>
               </div>
            ) : (
               <p>some thing went wrong</p>
            )}
         </StyledTableContainer>
      </div>
   )
}

const StyledTableContainer = styled('div')`
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   align-content: space-between;
   justify-content: center;
   width: 100%;
`
const StackStyled = styled('div')`
   display: flex;
   flex-direction: column;
   margin-top: 1rem;
   margin-left: 40%;
`

const StyledTableCell = styled(TableCell)`
   padding: 0px;
`
const StyledIconContainer = styled(IconButtons)`
   padding-left: 2px;
   padding-right: 2px;
`
const ButtonContainer = styled('div')`
   display: flex;
   padding-left: 17px;
`
const IconDeleteStyled = styled(DeleteIcon)`
   width: 18px;
`
const IconEditStyled = styled(EditIcon)`
   color: blue;
   width: 18px;
`
const BtnContainer = styled('div')`
   display: flex;
   justify-content: flex-end;
   gap: 10px;
   margin-top: 10px;
`
const StyledSelect = styled(Select)`
   .css-13cymwt-control {
      width: 100%;
      padding: 2px 8px 2px 1px;
      font-size: 16px;
      border-radius: 10px;
   }
   .css-t3ipsp-control {
      border-radius: 10px;
   }
   .css-1u9des2-indicatorSeparator {
      width: 0px;
   }
`
const Container = styled('form')`
   display: flex;
   flex-direction: column;
   align-items: space-between;
   width: 440px;
`
const FileUpload = styled('div')`
   display: flex;
   margin-top: 12px;
   gap: 10px;
   input {
      font-size: 15px;
      padding-left: 10px;
      width: 330px;
      height: 42px;
      border-radius: 10px;
      border: solid 1px rgba(212, 212, 212, 1);
   }
   Button {
      background-color: #ffffff;
      border: solid 1px rgba(55, 114, 255, 1);
      border-radius: 8px;
      height: 42px;
   }
`
