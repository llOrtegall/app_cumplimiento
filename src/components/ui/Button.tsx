import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ children, ...props }: Props) {
  return (
    <button className='bg-green-400 p-2 rounded-md font-semibold text-white hover:bg-green-500 focus:outline-none'
      {...props}>
      {children}
    </button>
  )
}