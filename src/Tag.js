import React, { useState, useRef, useEffect } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import PropTypes from 'prop-types'
import { SubTag } from './SubTag'
import styles from './Tag.module.css'

const supportedOperator = ['==', '!=', '>', '<']
const FIELD_SUBTAG = 'FIELD'
const OPERATOR_SUBTAG = 'OPERATOR'
const VALUE_SUBTAG = 'VALUE'

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
  const [currentSubTag, setCurrentSubTag] = useState(FIELD_SUBTAG)
  const fieldInputRef = useRef(null)
  const operatorInputRef = useRef(null)
  const valueInputRef = useRef(null)

  const handleTagFinish = () => {
    if (!stayEditable) {
      setEditing(false)
    } else {
      handleAddNewTag()
      fieldInputRef.current.focus()
    }
  }

  const handleSubTagFinish = () => {
    if (currentSubTag === FIELD_SUBTAG) {
      operatorInputRef.current.focus()
    } else if (currentSubTag === OPERATOR_SUBTAG) {
      valueInputRef.current.focus()
    } else if (currentSubTag === VALUE_SUBTAG) {
      valueInputRef.current.blur()
      handleTagFinish()
    }
  }

  const handleClickOutside = () => {
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
    <ClickAwayListener onClickAway={() => handleClickOutside()}>
      <div className={className} onFocus={() => setEditing(true)} {...divProps}>
        <SubTag
          ref={fieldInputRef}
          options={fields}
          value={field}
          active={editing}
          handleChange={handleFieldChange}
          handleSelectionFinish={handleSubTagFinish}
          setCurrentSubTag={() => setCurrentSubTag(FIELD_SUBTAG)}
        />
        <SubTag
          ref={operatorInputRef}
          options={supportedOperator}
          active={editing}
          value={operator}
          handleChange={handleOperatorChange}
          handleSelectionFinish={handleSubTagFinish}
          setCurrentSubTag={() => setCurrentSubTag(OPERATOR_SUBTAG)}
        />
        <SubTag
          ref={valueInputRef}
          options={values}
          value={value}
          active={editing}
          handleChange={handleValueChange}
          handleSelectionFinish={handleSubTagFinish}
          setCurrentSubTag={() => setCurrentSubTag(VALUE_SUBTAG)}
        />
        {handleDelete && <span className={styles.delete} onClick={() => handleDelete()}>x</span>}
      </div>
    </ClickAwayListener >
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