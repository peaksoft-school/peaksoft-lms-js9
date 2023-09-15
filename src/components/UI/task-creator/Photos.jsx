import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '../button/Button'

const PhotoGallery = ({ removeImage, images }) => {
   const [showDeleteButton, setShowDeleteButton] = useState(false)
   return (
      <div>
         <GalleryContainer>
            {images?.map((image, index) => (
               <ImageContainer
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onMouseEnter={() => setShowDeleteButton(true)}
                  onMouseLeave={() => setShowDeleteButton(false)}
               >
                  <Image src={image} alt={`Image ${index}`} />
                  {showDeleteButton && (
                     <StyledButton
                        onClick={() => removeImage(index)}
                        variant="danger"
                     >
                        Удалить
                     </StyledButton>
                  )}
               </ImageContainer>
            ))}
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
