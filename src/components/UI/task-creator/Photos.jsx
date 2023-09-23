import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '../button/Button'

const PhotoGallery = ({ image, removeImage }) => {
   const [showDeleteButton, setShowDeleteButton] = useState(false)
   return (
      <div>
         <GalleryContainer>
            <ImageContainer
               onMouseEnter={() => setShowDeleteButton(true)}
               onMouseLeave={() => setShowDeleteButton(false)}
            >
               {image !== null && <Image src={image} alt="Image" />}

               {showDeleteButton && (
                  <StyledButton onClick={removeImage} variant="danger">
                     Удалить
                  </StyledButton>
               )}
            </ImageContainer>
         </GalleryContainer>
      </div>
   )
}

export default PhotoGallery

const StyledButton = styled(Button)`
   position: absolute;
   top: 45%;
   left: 23vw;
   z-index: 0;
`

const GalleryContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
   padding: 20px;
`

const ImageContainer = styled.div`
   position: relative;
   width: 100%;
   display: flex;
   flex-direction: column;
`

const Image = styled.img`
   width: 55vw;
   height: 100%;
   object-fit: cover;
   border-radius: 10px;
`
