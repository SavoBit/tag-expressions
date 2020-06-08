import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { Tag } from './Tag'
import styles from './TagExpression.module.css'
import { NewTag } from './NewTag'

const initialState = {
  tags: { allIds: [], byId: {} },
  newTag: { field: '', operator: '', value: '' }
}

function reducer(state, action) {
  const value = action?.value
  const id = action?.id
  const { tags: { allIds, byId }, newTag } = state;

  switch (action.type) {
    case 'update-new-field':
      return { ...state, newTag: { ...newTag, field: value } }
    case 'update-new-operator':
      return { ...state, newTag: { ...newTag, operator: value } }
    case 'update-new-value':
      return { ...state, newTag: { ...newTag, value: value } }
    case 'add-new-tag':
      return {
        tags: { allIds: [...allIds, id], byId: { ...byId, [id]: { id, ...newTag } } },
        newTag: { field: '', operator: '', value: '' }
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

export function TagExpression({ fields, values }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tags: { allIds, byId }, newTag } = state;
  console.log(state)

  return (
    <div className={styles.TagExpression}>
      {
        allIds.map(tagId => {
          const tag = byId[tagId]
          return (
            < Tag
              key={tag.id}
              fields={fields}
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
        })
      }
      <NewTag
        fields={fields}
        values={values}
        dispatch={dispatch}
        field={newTag.field}
        operator={newTag.operator}
        value={newTag.value}
      />
    </div>
  )
}

TagExpression.prototype = {
  fields: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string)
}