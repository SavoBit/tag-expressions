import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener } from '@material-ui/core'
import { Tag } from './Tag'
import styles from './TagExpression.module.css'

export function Operator(
  {
    autofocus,
    newTag,
    options,
    value,
    handleChange,
    handleDelete,
    handleAddNewTag,
    ...divProps
  }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autofocus) {
      inputRef.current.focus()
    }
  }, [autofocus])

  const handleTagFinish = (shouldAdd) => {
    if (newTag && shouldAdd) {
      handleAddNewTag()
    }
  }

  const handleSelection = (val) => {
    inputRef.current.blur()
    handleChange(val)
    handleTagFinish(true)
  }

  return (
    <ClickAwayListener onClickAway={() => handleTagFinish(!!value)}>
      <div className={styles.Tag} {...divProps}>
        <Tag
          ref={inputRef}
          newTag={newTag && !value}
          options={options}
          value={value}
          handleChange={handleChange}
          handleSelection={handleSelection}
        />
        {handleDelete && <span className={styles.delete} onClick={() => handleDelete()}>x</span>}
      </div>
    </ClickAwayListener>
  )
}

Operator.prototype = {
  autofocus: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  newTag: PropTypes.bool,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAddNewTag: PropTypes.func,
}