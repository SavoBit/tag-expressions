import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener, Box } from '@material-ui/core'
import { Tag } from './Tag'
import styles from './TagExpression.module.css'

export function Condition(
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
  const fieldInputRef = useRef(null)
  const operatorInputRef = useRef(null)
  const valueInputRef = useRef(null)

  const [fieldInitialized, setFieldInitialized] = useState(false);
  const [operatorInitialized, setOperatorInitialized] = useState(false);

  const showOperatorInput = !newTag || fieldInitialized
  const showValueInput = !newTag || operatorInitialized

  useEffect(() => {
    if (autofocus) {
      console.log('auto focus')
      fieldInputRef.current.focus()
    }
  }, [autofocus])

  useEffect(() => {
    if (newTag && showValueInput)
      valueInputRef.current.focus()
  }, [newTag, showValueInput])

  useEffect(() => {
    if (newTag && showOperatorInput)
      operatorInputRef.current.focus()
  }, [newTag, showOperatorInput])

  const handleFieldSelection = (val) => {
    fieldInputRef.current.blur()
    handleFieldChange(val)
    if (newTag) {
      setFieldInitialized(true)
    } else {
      handleTagFinish()
    }
  }

  const handleOperatorSelection = (val) => {
    operatorInputRef.current.blur()
    handleOperatorChange(val)
    if (newTag) {
      setOperatorInitialized(true)
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


  return (
    <ClickAwayListener onClickAway={handleTagFinish}>
      <div className={styles.Tag}  {...divProps}>
        <Tag
          ref={fieldInputRef}
          newTag={newTag && !field}
          options={fields}
          value={field}
          handleChange={handleFieldChange}
          handleSelection={handleFieldSelection}
        />
        <Box display={showOperatorInput ? 'block' : 'none'}>
          <Tag
            ref={operatorInputRef}
            options={operators}
            value={operator}
            handleChange={handleOperatorChange}
            handleSelection={handleOperatorSelection}
          />
        </Box>
        <Box display={showValueInput ? 'block' : 'none'}>
          <Tag
            ref={valueInputRef}
            options={values}
            value={value}
            handleChange={handleValueChange}
            handleSelection={handleValueSelection}
          />
        </Box>
        {handleDelete && <span className={styles.delete} onClick={() => handleDelete()}>x</span>}
      </div>
    </ClickAwayListener >
  )
}

Condition.prototype = {
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