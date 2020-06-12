import React, { useState } from 'react'
import Proptypes from 'prop-types'
import { Popper, Paper } from '@material-ui/core'
import styles from './Tag.module.css'

function TagComp(
  {
    options = [],
    newTag,
    value,
    handleChange,
    handleSelection,
  }, ref) {
  const [active, setActive] = useState(false)
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
        size={3}
      />
      <div className={styles.hidden}>{value}</div>
      <Popper
        anchorEl={ref.current}
        open={active}
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

TagComp.prototype = {
  options: Proptypes.arrayOf(Proptypes.string),
  newTag: Proptypes.bool,
  value: Proptypes.string,
  handleChange: Proptypes.func,
  handleSelection: Proptypes.func,
}

export const Tag = React.forwardRef(TagComp)