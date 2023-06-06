'use client'
import {FC, useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-hot-toast'

interface AddPostProps {}

const AddPost : FC < AddPostProps > = ({}) => {
    const [title,
        setTitle] = useState('');
    const [isDisabled,
        setDisabled] = useState(false)
        const queryClient = useQueryClient()
   const [toastPostID,setToastPostID] = useState<string>('');

    // Create a post
    const {mutate} = useMutation(async(title : string) => await axios.post('/api/posts/addPost', {title}), {
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error
                    ?.response
                        ?.data, {id: toastPostID})
            }

            setDisabled(false)

        },
        onSuccess: (data) => {
            toast.success("Post has been made",{id:toastPostID})
            queryClient.invalidateQueries(["posts"])
            setTitle('');
            setDisabled(false);
            
        }
    })

    const submitPost = async(e : React.FormEvent) => {
        e.preventDefault();
        setToastPostID(toast.loading("Creating Your Post...", {id: toastPostID}))
        setDisabled(true);
        mutate(title)
    }
    return (
        <form
            method='POST'
            onSubmit={submitPost}
            className='p-8 my-8 bg-white rounder-md'>
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
                <p
                    className={`font-bold text-sm ${title.length > 300
                    ? 'text-red-700'
                    : 'text-gray-700'}`}>{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className='px-6 py-2 text-sm text-white bg-teal-600 rounded-xl disabled:opacity-25'
                    type='submit'>Create a post</button>
            </div>
        </form>
    )
}

export default AddPost;