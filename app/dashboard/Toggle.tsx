'use client'
import { FC } from 'react'

interface ToggleProps {
   deletePost: () => void
   setToggle: (toggle:boolean) => void
}

const Toggle: FC<ToggleProps> = ({ deletePost,setToggle }) => {
  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full bg-black/50">
        <div className="absolute flex flex-col gap-6 p-8 transform -translate-x-1/2 bg-white rounded-lg top-1/2 left-1/2 -transform-y-1/2">
            <h2 className='text-xl'>
                Are you sure you want to delete the post?
            </h2>
            <h3 className='text-sm text-red-600'>
                Pressing the delete button will permenantly delete your post
            </h3>
            <button onClick={deletePost} className='px-4 py-2 text-sm text-white bg-red-600'>
                Delete Post
            </button>
        </div>
    </div>
  )
}

export default Toggle;