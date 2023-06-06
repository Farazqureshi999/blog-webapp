'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AuthPosts } from '../types/authPost'
import EditPost from './editPost'


const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data;
}


const MyPosts = ({  }) => {
    const {data,isLoading} = useQuery<AuthPosts>({queryFn:fetchAuthPosts,queryKey:['auth-posts']}) 
   
    if (isLoading) return <p>Loading...</p>
    console.log("Auth Posts",data)
    return (

    <div>
     {data?.posts.map(post => (
        <EditPost id={post.id} key={post.id} avatar={data.image} name={data.name} title={post.title} comment={post.comment} />
     ))}
    </div>
  )
}

export default MyPosts;