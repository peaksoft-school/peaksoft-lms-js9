/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { Modal } from '../modal/Modal'
import { LinkIcon } from '../../../assets/icons/index'

const LinkComponent = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [IsDelete, setDelete] = useState(false)
   const [isShowedLink, setShowedLink] = useState(false)
   const [linkText, setLinkText] = useState('')
   const [displayText, setDisplayText] = useState('')
   const [links, setLinks] = useState(() => {
      const savedLinks = localStorage.getItem('links')
      return savedLinks ? JSON.parse(savedLinks) : []
   })

   const openModal = () => {
      setIsModalOpen(true)
   }
   const handleUnshowedLink = () => {
      setShowedLink(true)
   }

   const closeModal = () => {
      setIsModalOpen(false)
      setLinkText('')
      setDisplayText('')
   }

   const addLink = () => {
      if (linkText && displayText) {
         const newLink = { linkText, displayText }
         setLinks([...links, newLink])
         localStorage.setItem('links', JSON.stringify([...links, newLink]))
         closeModal()
      }
   }
   useEffect(() => {
      localStorage.setItem('links', JSON.stringify(links))
   }, [links])

   return (
      <Container id="links">
         {isShowedLink && (
            <div>
               <IconWithLink
                  onMouseEnter={() => setDelete(true)}
                  onMouseLeave={() => setDelete(false)}
               >
                  <LinkIcon />
                  <StyledLink to="#" onClick={openModal}>
                     Название ссылки
                  </StyledLink>
                  {IsDelete && <Delete onClick={handleUnshowedLink} />}
               </IconWithLink>
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
                              value={displayText}
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
         )}
         {links.map((link, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
               <LinkStyled
                  href={link.linkText}
                  target="_blank"
                  rel="noreferrer"
               >
                  {link.displayText}
               </LinkStyled>
            </div>
         ))}
      </Container>
   )
}

export default LinkComponent

const StyledLink = styled(Link)`
   color: #005fc4;
   text-decoration: underline;
`
const LinkStyled = styled('a')`
   color: #005fc4;
   text-decoration: underline;
   display: block;
`
const Delete = styled(TiDeleteOutline)`
   font-size: 1.6rem;
   cursor: pointer;
   color: #555454;
`
const Container = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   margin-top: 2px;
`
const IconWithLink = styled('div')`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 8px;
   width: 800px;
`
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
