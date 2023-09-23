import React, { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { AiOutlineUnorderedList, AiOutlineOrderedList } from 'react-icons/ai'
import {
   PiTextItalic,
   PiTextUnderline,
   PiTextB,
   PiTextAaBold,
} from 'react-icons/pi'
import { RiText } from 'react-icons/ri'
import styled from '@emotion/styled'
import { IconButtons } from '../button/IconButtons'

const TextEditor = ({ onEditorChange, variant }) => {
   const [hoveredIcon, setHoveredIcon] = useState(null)
   const [editorState, setEditorState] = useState(EditorState.createEmpty())
   // const [editorText, setEditorText] = useState('') // Состояние для текста
   const [editorStyles, setEditorStyles] = useState({}) // Состояние для стилей

   const handleEditorStateChange = (newState) => {
      setEditorState(newState)
      const plainText = newState.getCurrentContent().getPlainText()
      onEditorChange(plainText, editorStyles) // Передача и стилей, и текста
   }

   const handleInlineStyleClick = (style) => {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, style)
      setEditorState(newEditorState)
      const newStyles = newEditorState.getCurrentInlineStyle()
      setEditorStyles(newStyles.toJS()) // Обновление стилей
   }

   const handleListStyleClick = (style) => {
      const newEditorState = RichUtils.toggleBlockType(editorState, style)
      setEditorState(newEditorState)
      // Необходимо проверить тип текущего блока и соответствующим образом обновить стили
      const contentState = newEditorState.getCurrentContent()
      const blockType = contentState
         .getBlockForKey(newEditorState.getSelection().getStartKey())
         .getType()
      setEditorStyles({ ...editorStyles, [blockType]: true })
   }

   const capitalizeFirstLetter = (editorState) => {
      const contentState = editorState.getCurrentContent()
      const selectionState = editorState.getSelection()
      const startKey = selectionState.getStartKey()
      const startOffset = selectionState.getStartOffset()
      const blockWithStart = contentState.getBlockForKey(startKey)
      const startBlockText = blockWithStart.getText()
      const selectedText = startBlockText.slice(
         startOffset,
         selectionState.getEndOffset()
      )

      const capitalizedText =
         selectedText.charAt(0).toUpperCase() + selectedText.slice(1)

      const newContentState = contentState.merge({
         blockMap: contentState.getBlockMap().set(
            startKey,
            blockWithStart.merge({
               text:
                  startBlockText.slice(0, startOffset) +
                  capitalizedText +
                  startBlockText.slice(selectionState.getEndOffset()),
            })
         ),
         selectionBefore: selectionState,
         selectionAfter: selectionState.merge({
            anchorOffset: startOffset,
            focusOffset: startOffset + capitalizedText.length,
         }),
      })

      return EditorState.push(editorState, newContentState, 'apply-entity')
   }
   const handleCapitalizeClick = () => {
      const newEditorState = capitalizeFirstLetter(editorState)
      setEditorState(newEditorState)
      const plainText = newEditorState.getCurrentContent().getPlainText()
      onEditorChange(plainText, editorStyles) // Передача и стилей, и текста
   }

   return (
      <Container>
         <IconBlock>
            <IconContainer
               onMouseEnter={() => setHoveredIcon('heading')}
               onMouseLeave={() => setHoveredIcon(null)}
            >
               <IconWrapper onClick={handleCapitalizeClick}>
                  <IconAa />
               </IconWrapper>
               {hoveredIcon === 'heading' && (
                  <IconTooltip>Заголовок</IconTooltip>
               )}
            </IconContainer>
            <IconContainer
               onMouseEnter={() => setHoveredIcon('italic')}
               onMouseLeave={() => setHoveredIcon(null)}
            >
               <IconWrapper onClick={() => handleInlineStyleClick('ITALIC')}>
                  <IconI />
               </IconWrapper>
               {hoveredIcon === 'italic' && <IconTooltip>Курсив</IconTooltip>}
            </IconContainer>
            <IconContainer
               onMouseEnter={() => setHoveredIcon('underline')}
               onMouseLeave={() => setHoveredIcon(null)}
            >
               <IconWrapper onClick={() => handleInlineStyleClick('UNDERLINE')}>
                  <IconU />
               </IconWrapper>
               {hoveredIcon === 'underline' && (
                  <IconTooltip>Подчеркнутый</IconTooltip>
               )}
            </IconContainer>
            <IconContainer
               onMouseEnter={() => setHoveredIcon('bold')}
               onMouseLeave={() => setHoveredIcon(null)}
            >
               <IconWrapper onClick={() => handleInlineStyleClick('BOLD')}>
                  <IconB />
               </IconWrapper>
               {hoveredIcon === 'bold' && <IconTooltip>Жирный</IconTooltip>}
            </IconContainer>
            <IconContainer
               onMouseEnter={() => setHoveredIcon('unorderedList')}
               onMouseLeave={() => setHoveredIcon(null)}
            >
               <IconWrapper
                  onClick={() => handleListStyleClick('unordered-list-item')}
               >
                  <IconMarkerList />
               </IconWrapper>
               {hoveredIcon === 'unorderedList' && (
                  <IconTooltip>Маркированный список</IconTooltip>
               )}
            </IconContainer>
            <IconContainer
               onMouseEnter={() => setHoveredIcon('orderedList')}
               onMouseLeave={() => setHoveredIcon(null)}
            >
               <IconWrapper
                  onClick={() => handleListStyleClick('ordered-list-item')}
               >
                  <IconNumberList />
               </IconWrapper>
               {hoveredIcon === 'orderedList' && (
                  <IconTooltip>Нумерованный список</IconTooltip>
               )}
            </IconContainer>
         </IconBlock>
         <InputBlock>
            {variant === 'teacher' && (
               <IconButtonContainer>
                  <IconT />
               </IconButtonContainer>
            )}
            <ListContainer variant={variant}>
               <Editor
                  editorState={editorState}
                  onChange={handleEditorStateChange}
               />
            </ListContainer>
         </InputBlock>
      </Container>
   )
}

export default TextEditor

const IconTooltip = styled('div')`
   position: absolute;
   width: auto;
   bottom: 100%;
   transform: translateX(-50%);
   background-color: #5c6064e7;
   color: #fffefe;
   padding: 8px;
   border-radius: 8px;
   z-index: 5;
   transition: opacity 0.3s ease-in-out;
`
const IconContainer = styled('div')`
   position: relative;
`
const IconButtonContainer = styled(IconButtons)`
   padding: 8px 8px 8px 0px;
`
const Container = styled('div')`
   width: 100%;
   padding: 20px 0px 20px 0px;
`

const IconBlock = styled('div')`
   width: 300px;
   display: flex;
   gap: 15px;
   margin-left: 20px;
`

const IconWrapper = styled('span')`
   cursor: pointer;
`

const ListContainer = styled('div')`
   width: 100%;
   border: 1px solid #ccc;
   border-radius: 10px;
   padding: 10px;
   border-radius: 10px;
   height: ${(props) => (props.variant === 'student' ? '230px' : '')};
   max-height: 230px;
   overflow-y: scroll;
   ul {
      li {
         list-style: disc;
         margin-left: 20px;
      }
   }
   ol {
      li {
         list-style: decimal;
         margin-left: 20px;
      }
   }
`

const InputBlock = styled('div')`
   display: flex;
   align-items: flex-start;
`

const IconAa = styled(PiTextAaBold)`
   font-size: 1.6rem;
`

const IconI = styled(PiTextItalic)`
   font-size: 1.6rem;
`

const IconU = styled(PiTextUnderline)`
   font-size: 1.6rem;
`

const IconB = styled(PiTextB)`
   font-size: 1.6rem;
`

const IconT = styled(RiText)`
   font-size: 1.6rem;
`

const IconMarkerList = styled(AiOutlineUnorderedList)`
   font-size: 1.6rem;
`

const IconNumberList = styled(AiOutlineOrderedList)`
   font-size: 1.6rem;
`
