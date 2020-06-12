import React, { useState } from 'react'
import Proptypes from 'prop-types'
import { Popper, Paper } from '@material-ui/core'
import styles from './Tag.module.css'

function Option({ onSelection, highlight, children }) {
  let className = styles.option
  if (highlight) {
    className += ` ${styles.highlight}`
  }

  return (
    <div
      className={className}
      onMouseDown={(e) => { e.preventDefault() }}
      onMouseUp={onSelection}
    >
      {children}
    </div>
  )
}

function TagComp(
  {
    options = [],
    newTag,
    value,
    handleChange,
    handleSelection,
  }, ref) {
  const [active, setActive] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(undefined)

  const handleKeyDown = (e) => {
    const optionsLength = options.length
    switch (e.key) {
      case `ArrowUp`:
        if (selectedIndex === undefined || selectedIndex === 0) {
          setSelectedIndex(optionsLength - 1)
        } else {
          setSelectedIndex(selectedIndex - 1)
        }
        break
      case 'ArrowDown':
        if (selectedIndex === undefined || selectedIndex === optionsLength - 1) {
          setSelectedIndex(0)
        } else {
          setSelectedIndex(selectedIndex + 1)
        }
        break
      case 'Enter':
        handleSelection(options[selectedIndex] ?? '')
        setSelectedIndex(undefined)
        break
      case 'Escape':
        ref.current.blur()
        break
      default:
        break
    }
  }

  let className = styles.input
  if (!active && !newTag) {
    className += ` ${styles.idle}`
  }

  return (
    <div className={styles.AutoGrowInput} >
      <input
        ref={ref}
        className={className}
        value={value}
        type='text'
        onChange={e => { handleChange(e.target.value) }}
        onFocus={() => { setActive(true) }}
        onBlur={() => { setActive(false) }}
        onKeyDown={handleKeyDown}
        size={3}
      />
      <div className={styles.hidden}>{value}</div>
      <Popper
        anchorEl={ref.current}
        open={active}
      >
        <Paper>
          {
            options.filter(option => option.toLowerCase().includes(value.toLowerCase())).map((option, i) =>
              <Option
                key={i}
                highlight={i === selectedIndex}
                onSelection={() => { handleSelection(option) }}
              >
                {option}
              </Option>)
          }
        </Paper>
      </Popper>
    </div>
  )
}

TagComp.prototype = {
  options: Proptypes.arrayOf(Proptypes.string),
  newTag: Proptypes.bool,
  value: Proptypes.string,
  handleChange: Proptypes.func,
  handleSelection: Proptypes.func,
}

export const Tag = React.forwardRef(TagComp)