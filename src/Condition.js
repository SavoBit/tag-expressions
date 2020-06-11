import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener } from '@material-ui/core'
import { Tag } from './Tag'
import styles from './TagExpression.module.css'

// TODO
// some similar logic between tag and optag can be wrapped in a custom hook
export function Condition(
  {
    autofocus,
    selected,
    newTag,
    fields,
    operators,
    values,
    field,
    value,
    operator,
    handleFieldChange,
    handleOperatorChange,
    handleValueChange,
    handleDelete,
    handleAddNewTag,
    ...divProps
  }) {
  const fieldInputRef = useRef(null)
  const operatorInputRef = useRef(null)
  const valueInputRef = useRef(null)

  useEffect(() => {
    if (autofocus) {
      fieldInputRef.current.focus()
    }
  }, [autofocus])

  useEffect(() => {
    if (newTag && selected) {
      fieldInputRef.current.focus()
    } else if (newTag && !selected) {
      fieldInputRef.current.blur()
    }
  }, [newTag, selected])

  const handleFieldSelection = (val) => {
    fieldInputRef.current.blur()
    handleFieldChange(val)
    if (newTag) {
      operatorInputRef.current.focus()
    } else {
      handleTagFinish()
    }
  }

  const handleOperatorSelection = (val) => {
    operatorInputRef.current.blur()
    handleOperatorChange(val)
    if (newTag) {
      valueInputRef.current.focus()
    } else {
      handleTagFinish()
    }

  }

  const handleValueSelection = (val) => {
    valueInputRef.current.blur()
    handleValueChange(val)
    handleTagFinish()
  }

  const handleTagFinish = () => {
    if (!newTag) {
    } else if (newTag && (field || operator || value)) {
      handleAddNewTag()
    }
  }

  let className = styles.Tag
  if (selected) {
    className += ` ${styles.selected}`
  }

  return (
    <ClickAwayListener onClickAway={handleTagFinish}>
      <div className={className}  {...divProps}>
        <Tag
          ref={fieldInputRef}
          options={fields}
          value={field}
          handleChange={handleFieldChange}
          handleSelection={handleFieldSelection}
        />
        <Tag
          ref={operatorInputRef}
          options={operators}
          value={operator}
          handleChange={handleOperatorChange}
          handleSelection={handleOperatorSelection}
        />
        <Tag
          ref={valueInputRef}
          options={values}
          value={value}
          handleChange={handleValueChange}
          handleSelection={handleValueSelection}
        />
        {handleDelete && <span className={styles.delete} onClick={() => handleDelete()}>x</span>}
      </div>
    </ClickAwayListener>
  )
}

Condition.prototype = {
  autofocus: PropTypes.bool,
  selected: PropTypes.bool,
  fields: PropTypes.arrayOf(PropTypes.string),
  operators: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  field: PropTypes.string,
  value: PropTypes.string,
  newTag: PropTypes.bool,
  operator: PropTypes.string,
  handleFieldChange: PropTypes.func,
  handleOperatorChange: PropTypes.func,
  handleValueChange: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAddNewTag: PropTypes.func,
}