import Image from 'next/image';
import { FC, useState } from 'react'
import Toggle from './Toggle';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface EditPostProps {
  id:string;
  avatar:string;
  name:string;
  title:string;
  comment?:{
    id:string;
    postId:string;
    userId:string;
  }[] | undefined
}

const EditPost: FC<EditPostProps> = ({avatar,name,title,comment,id  }) => {
    // Toggle
    const [toggle,setToggle] = useState(false)
  
      const {mutate} = useMutation(
        async (id:string) => await axios.delete('/api/posts/deletePost',{data:id}),
        {
          onError: (error) => {
             console.log(error)
          },
          onSuccess: (data) => {
             console.log(data)
          }
        }
      )

      const deletePost = () =>{
        mutate(id);
      }
    return (
   <>
    <div className='p-8 my-8 bg-white rounded-lg '>
        <div className='flex items-center gap-2'>
            <Image width={32} height={32} src={avatar} alt="avatar"/>
            <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
            <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-gray-700">
                {comment?.length} Comments
            </p>
            <button onClick={(e) => {
              setToggle(true)
            }} className='text-sm font-bold text-red-500'>Delete</button>
        </div>
    </div>
    {toggle && (
      <Toggle deletePost={deletePost} setToggle={setToggle}/>
    )}
    
   </>
  )
}

export default EditPost;