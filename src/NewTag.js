import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from './Tag'

export function NewTag(
  {
    autofocus,
    fields,
    operators,
    values,
    field,
    value,
    operator,
    dispatch,
  }) {

  const handleFieldChange = (val) => { dispatch({ type: 'update-new-field', value: val }) }
  const handleOperatorChange = (val) => { dispatch({ type: 'update-new-operator', value: val }) }
  const handleValueChange = (val) => { dispatch({ type: 'update-new-value', value: val }) }
  const handleAddNewTag = () => { dispatch({ type: 'add-new-tag' }) }

  return (
    <Tag
      newTag
      autofocus={autofocus}
      fields={fields}
      operators={operators}
      values={values}
      field={field}
      operator={operator}
      value={value}
      handleFieldChange={handleFieldChange}
      handleOperatorChange={handleOperatorChange}
      handleValueChange={handleValueChange}
      handleAddNewTag={handleAddNewTag}
    />
  )
}

NewTag.prototype = {
  fields: PropTypes.arrayOf(PropTypes.string),
  operators: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  autofocus: PropTypes.bool,
  field: PropTypes.string,
  value: PropTypes.string,
  operator: PropTypes.string,
  setTags: PropTypes.func,
  dispatch: PropTypes.func,
}