import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { Tag } from './Tag'
import { NewTag } from './NewTag'
import styles from './TagExpression.module.css'
import { OpTag } from './OpTag'
import { NewOpTag } from './NewOpTag'

const initialState = {
  cnt: 11,
  tags: {
    allIds: [1, 2, 3], byId: {
      1: { id: 1, type: 'cond', field: '1', operator: '2', value: '3' },
      2: { id: 2, type: 'op', value: 'AND' },
      3: { id: 3, type: 'cond', field: '1', operator: '2', value: '3' },
    }
  },
  newTag: { field: '', operator: '', value: '' },
  newOp: { value: '' },
  autofocus: false,
}

function reducer(state, action) {
  const value = action?.value
  const id = action?.id
  const { tags: { allIds, byId }, newTag, newOp, cnt } = state;

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
        tags: { allIds: [...allIds, cnt], byId: { ...byId, [cnt]: { type: 'cond', id: cnt, ...newTag } } },
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
        tags: { allIds: [...allIds, cnt], byId: { ...byId, [cnt]: { type: 'op', id: cnt, ...newOp } } },
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
        }
      }
    }
    default:
      return state
  }
}

export function TagExpression({ fields, operators, values, ops }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tags: { allIds, byId }, newTag, newOp, autofocus } = state;
  const lastTagId = allIds.slice(-1)[0]
  const lastTagType = lastTagId ? byId[lastTagId]?.type : 'tag'

  return (
    <div className={styles.TagExpression}>
      {
        allIds.map(tagId => {
          const tag = byId[tagId]
          if (tag.type === 'cond') {
            return (
              <Tag
                key={tag.id}
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
              <OpTag
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
      {
        lastTagType === 'cond' ?
          <NewOpTag
            autofocus={autofocus}
            options={ops}
            value={newOp.value}
            dispatch={dispatch}
          /> :
          <NewTag
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
  )
}

TagExpression.prototype = {
  fields: PropTypes.arrayOf(PropTypes.string),
  operators: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  ops: PropTypes.arrayOf(PropTypes.string)
}