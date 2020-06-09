import React from 'react'
import PropTypes from 'prop-types'
import { OpTag } from './OpTag'

export function NewOpTag(
  {
    options,
    value,
    dispatch,
  }) {

  const handleChange = (val) => { dispatch({ type: 'update-new-op', value: val }) }
  const handleAddNewTag = () => { dispatch({ type: 'add-new-op' }) }

  return (
    <OpTag
      newTag
      value={value}
      options={options}
      handleChange={handleChange}
      handleAddNewTag={handleAddNewTag}
    />
  )
}

NewOpTag.prototype = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  dispatch: PropTypes.func,
}