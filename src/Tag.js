import React, { useState } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Subtag } from './SubTag'
import styles from './Tag.module.css'

const supportedOperator = ['==', '!=', '>', '<']
const FIELD_SUBTAG = 'FIELD'
const OPERATOR_SUBTAG = 'OPERATOR'
const VALUE_SUBTAG = 'VALUE'

export function Tag(
  {
    fields,
    values,
    field,
    value,
    operator,
    handleFieldChange,
    handleOperatorChange,
    handleValueChange,
    handleDelete,
    stayEditable,
    ...divProps
  }) {
  const [editing, setEditing] = useState(!!stayEditable)
  const [currentSubTag, setCurrentSubTag] = useState(FIELD_SUBTAG)

  // const handleSelectionFinish = () => {
  //   if (currentSubtag <= 1) {
  //     //focus next
  //     // update current sub tag
  //   }
  // }

  let className = styles.Tag
  if (!editing) {
    className += ` ${styles.token}`
  }

  return (
    <ClickAwayListener onClickAway={() => { if (!stayEditable) { setEditing(false) } }}>
      <div className={className} onFocus={() => setEditing(true)} {...divProps}>
        <Subtag
          options={fields}
          value={field}
          active={editing}
          handleChange={handleFieldChange}
          // setCurrentSubTag={setCurrentSubTag(FIELD_SUBTAG)}
        />
        <Subtag
          options={supportedOperator}
          active={editing}
          value={operator}
          handleChange={handleOperatorChange}
          // setCurrentSubTag={setCurrentSubTag(OPERATOR_SUBTAG)}
        />
        <Subtag
          options={values}
          value={value}
          active={editing}
          handleChange={handleValueChange}
          // setCurrentSubTag={setCurrentSubTag(VALUE_SUBTAG)}
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
}