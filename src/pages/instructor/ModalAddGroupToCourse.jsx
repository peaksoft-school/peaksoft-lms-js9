import React from 'react'
import { Modal } from '../../components/UI/modal/Modal'
import { Input } from '../../components/UI/input/Input'
import { Button } from '../../components/UI/button/Button'

export const ModalAddGroupToCourse = ({ open, handleClose }) => {
   return (
      <Modal
         title="Добавить группу в курс"
         open={open}
         handleClose={handleClose}
      >
         <Input />
         <Button>Отмена</Button>
         <Button>Добавить</Button>
      </Modal>
   )
}
