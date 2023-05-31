import type {NextApiRequest,NextApiResponse} from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
){
    if(req.method === 'POST'){
        const session = await getServerSession(req,res,authOptions)
        if(!session) return res.status(401).json({message:'Please signin to make a post'})
        console.log(req.body.title)
        const title:string = req.body.title;

        if(title.length > 300) return res.status(403).json({message:'Please write a shorter post'})

        if (title.length < 1) return res.status(403).json({message:'Please enter a title'})

        //Get User

        const prismaUser = await prisma.user.findUnique({
            where:{email:session.user?.email as string}
        })
        
        //Create Post

        try {
            const result = await prisma.post.create({
                data:{
                        title,
                        userId:prismaUser?.id as string
                    },
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({error:'Error occur in database'})
        }

    }
}