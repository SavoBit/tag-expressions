import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener } from '@material-ui/core'
import { SubTag } from './SubTag'
import styles from './Tag.module.css'

export function OpTag(
  {
    newTag,
    options,
    value,
    handleChange,
    handleDelete,
    handleAddNewTag,
    ...divProps
  }) {
  const [editing, setEditing] = useState(!!newTag)
  const inputRef = useRef(null)

  const handleTagFinish = (shouldAdd) => {
    if (!newTag) {
      setEditing(false)
    } else if (newTag && shouldAdd) {
      handleAddNewTag()
    }
  }

  const handleSelection = (val) => {
    inputRef.current.blur()
    handleChange(val)
    handleTagFinish(true)
  }

  let className = styles.Tag
  if (!editing) {
    className += ` ${styles.token}`
  }

  return (
    <ClickAwayListener onClickAway={() => handleTagFinish(!!value)}>
      <div className={className} onFocus={() => setEditing(true)} {...divProps}>
        <SubTag
          ref={inputRef}
          options={options}
          value={value}
          active={editing}
          handleChange={handleChange}
          handleSelection={handleSelection}
        />
        {handleDelete && <span className={styles.delete} onClick={() => handleDelete()}>x</span>}
      </div>
    </ClickAwayListener>
  )
}

OpTag.prototype = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  newTag: PropTypes.bool,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAddNewTag: PropTypes.func,
}