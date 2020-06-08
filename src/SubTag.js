import React, { useState, useRef } from 'react'
import Proptypes from 'prop-types'
import styles from './Subtag.module.css'
import { Popper, Paper } from '@material-ui/core'

function SubtagComp(
  {
    options = [],
    value,
    active,
    handleChange,
    handleSelection,
    setCurrentSubTag
  }, ref) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  let className = styles.input
  if (!active) {
    className += ` ${styles.idle}`
  }
  return (
    <div className={styles.AutoGrowInput} ref={anchorRef}>
      <input
        ref={ref}
        className={className}
        value={value}
        type='text'
        onChange={e => { handleChange(e.target.value) }}
        onFocus={() => { setOpen(true); setCurrentSubTag && setCurrentSubTag() }}
        onBlur={() => setOpen(false)}
        size={3}
      />
      <div className={styles.hidden}>{value}</div>
      <Popper
        disablePortal
        anchorEl={anchorRef.current}
        open={open}
      >
        <Paper>
          {
            options.map((option, i) =>
              <div
                key={i}
                className={styles.option}
                onMouseDown={(e) => { e.preventDefault() }}
                onMouseUp={() => {handleSelection(option)}}
              >
                {option}
              </div>)
          }
        </Paper>
      </Popper>
    </div>
  )
}

SubtagComp.prototype = {
  options: Proptypes.arrayOf(Proptypes.string),
  value: Proptypes.string,
  active: Proptypes.string,
  handleChange: Proptypes.func,
  handleSelection: Proptypes.func,
  setCurrentSubTag: Proptypes.func,
}

export const SubTag = React.forwardRef(SubtagComp)