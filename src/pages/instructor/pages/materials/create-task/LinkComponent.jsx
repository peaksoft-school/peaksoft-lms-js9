import React, { useState } from 'react'
import styled from '@emotion/styled'
import { TiDeleteOutline } from 'react-icons/ti'
import { Input } from '../../../../../components/UI/input/Input'
import { Button } from '../../../../../components/UI/button/Button'
import { Modal } from '../../../../../components/UI/modal/Modal'
import { LinkIcon } from '../../../../../assets/icons/index'

const LinkComponent = ({ isModalOpen, setIsModalOpen, links, setLinks }) => {
   const [displayedText, setDisplayText] = useState('')
   const [linkText, setLinkText] = useState('')
   const closeModal = () => {
      setIsModalOpen(false)
      setLinkText('')
      setDisplayText('')
   }

   const addLink = () => {
      if (linkText && displayedText) {
         setLinks({
            name: displayedText,
            link: linkText,
         })
         closeModal()
      }
   }
   const deleteLink = () => {
      setLinks({
         name: '',
         link: '',
      })
   }
   return (
      <Container id="links">
         <div>
            {isModalOpen && (
               <Modal
                  handleClose={closeModal}
                  open={isModalOpen}
                  title="Добавить ссылку"
               >
                  <ModalBlock>
                     <div>
                        <StyledInput
                           placeholder="Отображаемый текст"
                           size="small"
                           value={displayedText}
                           onChange={(e) => setDisplayText(e.target.value)}
                        />
                        <StyledInput
                           placeholder="Вставьте ссылку"
                           size="small"
                           value={linkText}
                           onChange={(e) => setLinkText(e.target.value)}
                        />
                     </div>
                     <ModalButtonBlock>
                        <Button onClick={closeModal} variant="outlined">
                           Отмена
                        </Button>
                        <Button
                           type="submit"
                           variant="contained"
                           onClick={addLink}
                        >
                           Добавить
                        </Button>
                     </ModalButtonBlock>
                  </ModalBlock>
               </Modal>
            )}
         </div>
         {links?.name !== '' && links.link !== '' && (
            <LinkContainer>
               <LinkIcon />
               <LinkStyled href={links.link} target="_blank" rel="noreferrer">
                  {links?.name}
               </LinkStyled>
               <Delete onClick={() => deleteLink()} />
            </LinkContainer>
         )}
      </Container>
   )
}

export default LinkComponent

const LinkStyled = styled('a')`
   color: #005fc4;
   text-decoration: underline;
   display: flex;
   margin-left: 8px;
`
const Delete = styled(TiDeleteOutline)`
   font-size: 1.6rem;
   cursor: pointer;
   color: #555454;
`
const LinkContainer = styled('div')`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 0px;
`
const Container = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   margin-top: 2px;
`
// const IconWithLink = styled('div')`
//    display: flex;
//    flex-direction: row;
//    align-items: center;
//    gap: 8px;
//    width: 800px;
// `
const ModalBlock = styled('form')`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-end;
   gap: 10px;
`

const ModalButtonBlock = styled('div')`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: flex-end;
   gap: 10px;
`

const StyledInput = styled(Input)`
   & .MuiInputBase-root {
      width: 32vw;
      height: 42px;
      border-radius: 10px;
      margin-top: 0.629rem;
   }
`
