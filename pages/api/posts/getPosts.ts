import type {NextApiRequest,NextApiResponse} from 'next';

import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
){
    if(req.method === 'GET'){
       
        //Fetch All Post

        try {
            const data = await prisma.post.findMany({
                include:{
                    user:true,
                    comment:true
                },
                orderBy:{
                    createdAt:'desc'
                }
            })
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({error:'Error Fetching Posts'})
        }

    }
}