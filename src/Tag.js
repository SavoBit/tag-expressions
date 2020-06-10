import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener } from '@material-ui/core'
import { SubTag } from './SubTag'
import styles from './Tag.module.css'

export function Tag(
  {
    autofocus,
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
  const [editing, setEditing] = useState(!!newTag)
  const fieldInputRef = useRef(null)
  const operatorInputRef = useRef(null)
  const valueInputRef = useRef(null)

  useEffect(() => {
    if (autofocus) {
      fieldInputRef.current.focus()
    }
  }, [autofocus])

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
      setEditing(false)
    } else if (newTag && (field || operator || value)) {
      handleAddNewTag()
    }
  }

  let className = styles.Tag
  if (!editing) {
    className += ` ${styles.token}`
  }

  return (
    <ClickAwayListener onClickAway={handleTagFinish}>
      <div className={className} onFocus={() => setEditing(true)} {...divProps}>
        <SubTag
          ref={fieldInputRef}
          options={fields}
          value={field}
          active={editing}
          handleChange={handleFieldChange}
          handleSelection={handleFieldSelection}
        />
        <SubTag
          ref={operatorInputRef}
          options={operators}
          active={editing}
          value={operator}
          handleChange={handleOperatorChange}
          handleSelection={handleOperatorSelection}
        />
        <SubTag
          ref={valueInputRef}
          options={values}
          value={value}
          active={editing}
          handleChange={handleValueChange}
          handleSelection={handleValueSelection}
        />
        {handleDelete && <span className={styles.delete} onClick={() => handleDelete()}>x</span>}
      </div>
    </ClickAwayListener>
  )
}

Tag.prototype = {
  autofocus: PropTypes.bool,
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