import React from 'react'
import PropTypes from 'prop-types'
import { Condition } from './Condition'

export function NewCondition(
  {
    autofocus,
    selected,
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
    <Condition
      newTag
      selected={selected}
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

NewCondition.prototype = {
  fields: PropTypes.arrayOf(PropTypes.string),
  operators: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  autofocus: PropTypes.bool,
  selected: PropTypes.bool,
  field: PropTypes.string,
  value: PropTypes.string,
  operator: PropTypes.string,
  setTags: PropTypes.func,
  dispatch: PropTypes.func,
}