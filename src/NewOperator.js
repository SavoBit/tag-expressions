import React from 'react'
import PropTypes from 'prop-types'
import { Operator } from './Operator'

export function NewOperator(
  {
    autofocus,
    options,
    value,
    dispatch,
  }) {

  const handleChange = (val) => { dispatch({ type: 'update-new-op', value: val }) }
  const handleAddNewTag = () => { dispatch({ type: 'add-new-op' }) }

  return (
    <Operator
      newTag
      autofocus={autofocus}
      value={value}
      options={options}
      handleChange={handleChange}
      handleAddNewTag={handleAddNewTag}
    />
  )
}

NewOperator.prototype = {
  autofocus: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  dispatch: PropTypes.func,
}