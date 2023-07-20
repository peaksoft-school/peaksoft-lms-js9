import React, { useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor, EditorState, RichUtils, SelectionState } from 'draft-js'
import styled from '@emotion/styled'
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiOutlineUnorderedList, AiOutlineOrderedList } from 'react-icons/ai'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
   PiTextItalic,
   PiTextUnderline,
   PiTextB,
   PiTextAaBold,
} from 'react-icons/pi'
// eslint-disable-next-line import/no-extraneous-dependencies
import { RiText } from 'react-icons/ri'
import { IconButton } from '@mui/material'

const TextEditor = () => {
   const [hoveredIcon, setHoveredIcon] = useState(null)
   const [editorState, setEditorState] = useState(EditorState.createEmpty())

   const handleEditorStateChange = (newState) => {
      setEditorState(newState)
   }

   const handleInlineStyleClick = (style) => {
      const selectionState = editorState.getSelection()
      if (selectionState.isCollapsed()) {
         const contentState = editorState.getCurrentContent()
         const currentBlock = contentState.getBlockForKey(
            selectionState.getStartKey()
         )
         const startOffset = 0
         const endOffset = currentBlock.getLength()
         const newSelection = SelectionState.createEmpty(
            selectionState.getStartKey()
         ).merge({
            anchorOffset: startOffset,
            focusOffset: endOffset,
         })
         const newEditorState = EditorState.forceSelection(
            editorState,
            newSelection
         )
         setEditorState(RichUtils.toggleInlineStyle(newEditorState, style))
      } else {
         setEditorState(RichUtils.toggleInlineStyle(editorState, style))
      }
   }

   const handleListStyleClick = (style) => {
      const selectionState = editorState.getSelection()
      if (selectionState.isCollapsed()) {
         const contentState = editorState.getCurrentContent()
         const currentBlock = contentState.getBlockForKey(
            selectionState.getStartKey()
         )
         const startOffset = 0
         const endOffset = currentBlock.getLength()
         const newSelection = SelectionState.createEmpty(
            selectionState.getStartKey()
         ).merge({
            anchorOffset: startOffset,
            focusOffset: endOffset,
         })
         const newEditorState = EditorState.forceSelection(
            editorState,
            newSelection
         )
         setEditorState(RichUtils.toggleBlockType(newEditorState, style))
      } else {
         setEditorState(RichUtils.toggleBlockType(editorState, style))
      }
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
      setEditorState(capitalizeFirstLetter(editorState))
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
            <IconButton>
               <IconT />
            </IconButton>
            <ListContainer>
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
   max-width: 300px;
   position: absolute;
   top: -40px;
   left: 50%;
   transform: translateX(-50%);
   background-color: #5c6064;
   color: #fffefe;
   padding: 8px;
   border-radius: 8px;
   z-index: 5;
   opacity: 0.3;
   transition: opacity 0.3s ease-in-out;
`
const IconContainer = styled('div')`
   position: relative;
`
const Container = styled('div')`
   width: 600px;
   margin: 30px auto;
   padding: 20px;
`

const IconBlock = styled('div')`
   width: 300px;
   display: flex;
   gap: 15px;
   margin-left: 28px;
`

const IconWrapper = styled('span')`
   cursor: pointer;
`

const ListContainer = styled('div')`
   width: 650px;
   border: 1px solid #ccc;
   padding: 10px;

   ul {
      list-style: disc;
      margin-left: 20px;
   }

   ol {
      list-style: decimal;
      margin-left: 20px;
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
