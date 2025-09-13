import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId()

  return (
    <div className='w-full'>
      <label className="" htmlFor={id}>
        {label}
      </label>
      <input type={type} className={`${className}`} ref={ref} {...props} id={id} />
    </div>
  )
})

export default Input
