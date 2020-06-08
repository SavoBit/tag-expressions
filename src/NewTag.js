import React, { useEffect, useRef } from 'react'
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
  const tagEl = useRef(null)
  const cnt = useRef(0)

  useEffect(() => {
    const handleAddNewTag = (event) => {
      const clickOutside = tagEl.current && !tagEl.current.contains(event.target)
      const notEmpty = field || operator || value
      if (clickOutside && notEmpty) {
        dispatch(
          {
            type: 'add-new-tag',
            id: cnt.current,
            value: { field, operator, value, id: cnt.current }
          }
        )
        cnt.current += 1
      }
    }
    document.addEventListener('click', handleAddNewTag, true)
    return () => {
      document.removeEventListener('click', handleAddNewTag, true)
    }
  }, [dispatch, field, operator, value])

  const handleFieldChange = (val) => { dispatch({ type: 'update-new-field', value: val }) }
  const handleOperatorChange = (val) => { dispatch({ type: 'update-new-operator', value: val }) }
  const handleValueChange = (val) => { dispatch({ type: 'update-new-value', value: val }) }

  return (
    <div ref={tagEl}>
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
      />
    </div>
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