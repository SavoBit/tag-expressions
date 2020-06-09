import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener } from '@material-ui/core'
import { SubTag } from './SubTag'
import styles from './Tag.module.css'

const supportedOperator = ['==', '!=', '>', '<']

export function Tag(
  {
    stayEditable,
    fields,
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
  const [editing, setEditing] = useState(!!stayEditable)
  const fieldInputRef = useRef(null)
  const operatorInputRef = useRef(null)
  const valueInputRef = useRef(null)

  const handleFieldSelection = (val) => {
    fieldInputRef.current.blur()
    handleFieldChange(val)
    if (stayEditable) {
      operatorInputRef.current.focus()
    }
  }

  const handleOperatorSelection = (val) => {
    operatorInputRef.current.blur()
    handleOperatorChange(val)
    if (stayEditable) {
      valueInputRef.current.focus()
    }
  }

  const handleValueSelection = (val) => {
    valueInputRef.current.blur()
    handleValueChange(val)
    if (stayEditable) {
      handleTagFinish()
    }
    if (field && operator) {
      fieldInputRef.current.focus()
    }
  }

  const handleTagFinish = () => {
    if (!stayEditable) {
      setEditing(false)
    } else if (stayEditable && (field || operator || value)) {
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
          options={supportedOperator}
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
  fields: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  field: PropTypes.string,
  value: PropTypes.string,
  stayEditable: PropTypes.bool,
  operator: PropTypes.string,
  handleFieldChange: PropTypes.func,
  handleOperatorChange: PropTypes.func,
  handleValueChange: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAddNewTag: PropTypes.func,
}