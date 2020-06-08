import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Tag } from './Tag'

export function NewTag(
  {
    fields,
    values,
    field,
    value,
    operator,
    dispatch,
  }) {
  const id = useRef(0)

  const handleFieldChange = (val) => { dispatch({ type: 'update-new-field', value: val }) }
  const handleOperatorChange = (val) => { dispatch({ type: 'update-new-operator', value: val }) }
  const handleValueChange = (val) => { dispatch({ type: 'update-new-value', value: val }) }
  const handleAddNewTag = useCallback(() => {
    dispatch(
      {
        type: 'add-new-tag',
        id: id.current,
      }
    )
    id.current += 1
  }, [dispatch])

  return (
    <Tag
      fields={fields}
      values={values}
      field={field}
      operator={operator}
      value={value}
      stayEditable={true}
      handleFieldChange={handleFieldChange}
      handleOperatorChange={handleOperatorChange}
      handleValueChange={handleValueChange}
      handleAddNewTag={handleAddNewTag}
    />
  )
}

NewTag.prototype = {
  fields: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  field: PropTypes.string,
  value: PropTypes.string,
  operator: PropTypes.string,
  setTags: PropTypes.func,
  dispatch: PropTypes.func,
}