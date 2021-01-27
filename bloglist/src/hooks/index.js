import { useState } from 'react'

const useField = (type, label, id) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  const tfStyle = {
    width: '100%'
  }

  return {
    type,
    value,
    onChange,
    label,
    id,
    reset,
    required: true,
    style: tfStyle
  }
}

export default useField
