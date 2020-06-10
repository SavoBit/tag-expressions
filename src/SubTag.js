import React, { useState } from 'react'
import Proptypes from 'prop-types'
import { Popper, Paper } from '@material-ui/core'
import styles from './Subtag.module.css'

function SubtagComp(
  {
    options = [],
    value,
    active,
    handleChange,
    handleSelection,
  }, ref) {
  const [open, setOpen] = useState(false)
  let className = styles.input
  if (!active) {
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
        onFocus={() => { setOpen(true); console.log('open', options) }}
        onBlur={() => setOpen(false)}
        size={3}
      />
      <div className={styles.hidden}>{value}</div>
      <Popper
        anchorEl={ref.current}
        open={open}
      >
        <Paper>
          {
            options.map((option, i) =>
              <div
                key={i}
                className={styles.option}
                onMouseDown={(e) => { e.preventDefault() }}
                onMouseUp={() => { handleSelection(option) }}
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
}

export const SubTag = React.forwardRef(SubtagComp)