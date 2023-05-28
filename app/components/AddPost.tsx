'use client'
import {FC, useState} from 'react'

interface AddPostProps {}

const AddPost : FC < AddPostProps > = ({}) => {
    const [title,
        setTitle] = useState('');
    const [isDisabled,setDisabled] = useState(false)
    return (
        <form  className='p-8 my-8 bg-white rounder-md'>
            <div className='flex flex-col my-4'>
                <textarea
                    className='p-4 my-2 text-lg bg-gray-200 rounded-md'
                    name="title"
                    id=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Whats on your mind'></textarea>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <p className={`font-bold text-sm ${title.length > 300 ? 'text-red-700':'text-gray-700'}`}>{`${title.length}/300`}</p>
                <button
                 disabled={isDisabled}
                    className='px-6 py-2 text-sm text-white bg-teal-600 rounded-xl disabled:opacity-25'
                    type='submit'
                >Create a post</button>
            </div>
        </form>
    )
}

export default AddPost;