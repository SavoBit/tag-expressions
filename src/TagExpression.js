import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { Condition } from './Condition'
import { NewCondition } from './NewCondition'
import styles from './TagExpression.module.css'
import { Operator } from './Operator'
import { NewOperator } from './NewOperator'
import { newCondition, newOperator } from './utils'

const initialState = {
  cnt: 11,
  tags: {
    allIds: [1, 2, 3],
    byId: {
      1: newCondition(1, 'name', '==', 'john'),
      2: newOperator(2, 'AND'),
      3: newCondition(3, 'age', '!=', '11'),
    }
  },
  newTag: { field: '', operator: '', value: '' },
  newOp: { value: '' },
  autofocus: false,
  selectedIndx: -1,
  selectedSubIndex: -1,
}

function reducer(state, action) {
  const value = action?.value
  const id = action?.id
  const { tags: { allIds, byId }, newTag, newOp, cnt, selectedIndx, selectedSubIndex } = state;

  switch (action.type) {
    case 'update-new-field':
      return { ...state, newTag: { ...newTag, field: value } }
    case 'update-new-operator':
      return { ...state, newTag: { ...newTag, operator: value } }
    case 'update-new-value':
      return { ...state, newTag: { ...newTag, value: value } }
    case 'add-new-tag':
      return {
        ...state,
        tags: {
          allIds: [...allIds, cnt],
          byId: {
            ...byId,
            [cnt]: newCondition(cnt, newTag.field, newTag.operator, newTag.value)
          }
        },
        newTag: { field: '', operator: '', value: '' },
        autofocus: true,
        cnt: cnt + 1
      }
    case 'update-tag-field':
      return {
        ...state,
        tags: {
          ...state.tags,
          byId: { ...state.tags.byId, [id]: { ...byId[id], field: value } }
        }
      }
    case 'update-tag-operator':
      return {
        ...state,
        tags: {
          ...state.tags,
          byId: { ...state.tags.byId, [id]: { ...byId[id], operator: value } }
        }
      }
    case 'update-tag-value':
      return {
        ...state,
        tags: {
          ...state.tags,
          byId: { ...state.tags.byId, [id]: { ...byId[id], value: value } }
        }
      }
    case 'add-new-op':
      return {
        ...state,
        tags: {
          allIds: [...allIds, cnt],
          byId: {
            ...byId,
            [cnt]: newOperator(cnt, newOp.value)
          }
        },
        newOp: { value: '' },
        autofocus: true,
        cnt: cnt + 1
      }
    case 'update-new-op':
      return {
        ...state,
        newOp: { value: value },
      }
    case 'update-op':
      return {
        ...state,
        tags: {
          ...state.tags,
          byId: { ...state.tags.byId, [id]: { ...byId[id], value: value } }
        }
      }
    case 'delete-tag': {
      //eslint-disable-next-line
      const { [id]: _, ...otherTags } = byId
      return {
        ...state,
        tags: {
          allIds: allIds.filter(curr => curr !== id),
          byId: otherTags
        },
        autofocus: false,
      }
    }
    case 'enable-select':
      return {
        ...state,
        selectedIndx: allIds.length,
        selectedSubIndex: 0,
      }
    case 'disable-select':
      return {
        ...state,
        selectedIndx: -1,
        selectedSubIndex: -1,
      }
    case 'select-left': {
      let newSelectedIndex
      let newSelectedSubIndex
      if (selectedIndx === 0 && selectedSubIndex === 0) {
        newSelectedIndex = 0
        newSelectedSubIndex = 0
      } else if (selectedSubIndex === 0) {
        newSelectedIndex = selectedIndx - 1
        const newSelectedItemId = allIds[newSelectedIndex]
        newSelectedSubIndex = byId[newSelectedItemId].dataLength - 1
      } else {
        newSelectedIndex = selectedIndx
        newSelectedSubIndex = selectedSubIndex - 1
      }
      console.log(newSelectedIndex, newSelectedSubIndex)
      return {
        ...state,
        selectedIndx: newSelectedIndex,
        selectedSubIndex: newSelectedSubIndex
      }
    }
    case 'select-right': {
      let newSelectedIndex
      let newSelectedSubIndex
      if (selectedIndx === allIds.length) {
        newSelectedIndex = selectedIndx
        newSelectedSubIndex = selectedSubIndex
      } else if (selectedSubIndex === byId[allIds[selectedIndx]].dataLength - 1) {
        newSelectedIndex = selectedIndx + 1
        newSelectedSubIndex = 0
      } else {
        newSelectedIndex = selectedIndx
        newSelectedSubIndex = selectedSubIndex + 1
      }
      console.log(newSelectedIndex, newSelectedSubIndex)
      return {
        ...state,
        selectedIndx: newSelectedIndex,
        selectedSubIndex: newSelectedSubIndex,
      }
    }
    default:
      return state
  }
}

export function TagExpression({ fields, operators, values, ops }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tags: { allIds, byId }, newTag, newOp, autofocus, selectedIndx, selectedSubIndex } = state;
  const lastTagId = allIds.slice(-1)[0]
  const lastTagType = lastTagId ? byId[lastTagId]?.type : 'cond'

  const handleKeyDown = (e) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowLeft':
        if (selectedIndx >= 0 && selectedIndx <= allIds.length) {
          dispatch({ type: 'select-left' })
        }
        break;
      case 'ArrowRight':
        if (selectedIndx >= 0 && selectedIndx <= allIds.length) {
          dispatch({ type: 'select-right' })
        }
        break;
      case 'Escape':
        dispatch({ type: 'disable-select' })
        break
      default:
        break;
    }
  }

  return (
    <div
      className={styles.TagExpression}
      onKeyDown={handleKeyDown}
    >
      {
        allIds.map((tagId, i) => {
          const tag = byId[tagId]
          if (tag.type === 'cond') {
            return (
              <Condition
                key={tag.id}
                selectedItem={i === selectedIndx ? selectedSubIndex : -1}
                fields={fields}
                operators={operators}
                values={values}
                field={tag.field}
                operator={tag.operator}
                value={tag.value}
                handleFieldChange={(val) => dispatch({ type: 'update-tag-field', id: tagId, value: val })}
                handleOperatorChange={(val) => dispatch({ type: 'update-tag-operator', id: tagId, value: val })}
                handleValueChange={(val) => dispatch({ type: 'update-tag-value', id: tagId, value: val })}
                handleDelete={() => dispatch({ type: 'delete-tag', id: tagId })}
              />
            )
          } else {
            return (
              <Operator
                key={tag.id}
                options={ops}
                value={tag.value}
                handleChange={(val) => dispatch({ type: 'update-op', id: tagId, value: val })}
                handleDelete={() => dispatch({ type: 'delete-tag', id: tagId })}
              />
            )
          }

        })
      }
      <div onClick={() => dispatch({ type: 'enable-select' })} >
        {
          lastTagType === 'cond' ?
            <NewOperator
              autofocus={autofocus}
              options={ops}
              value={newOp.value}
              dispatch={dispatch}
            /> :
            <NewCondition
              autofocus={autofocus}
              fields={fields}
              operators={operators}
              values={values}
              dispatch={dispatch}
              field={newTag.field}
              operator={newTag.operator}
              value={newTag.value}
            />
        }
      </div>
    </div >
  )
}

TagExpression.prototype = {
  fields: PropTypes.arrayOf(PropTypes.string),
  operators: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  ops: PropTypes.arrayOf(PropTypes.string)
}