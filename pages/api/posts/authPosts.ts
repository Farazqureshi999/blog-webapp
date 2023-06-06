import type {NextApiRequest,NextApiResponse} from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
){
    if(req.method === 'GET'){
        const session = await getServerSession(req,res,authOptions)
        if(!session) return res.status(401).json({message:'Please signin'})
       
        console.log("user",session.user?.email)
        
        //Get Auth User Post
        try {
            const data = await prisma.user.findUnique({
                where:{
                    email:session.user?.email as string
                },
                include:{
                   posts:{
                     orderBy:{
                        createdAt:'desc'
                     }
                   },
                   comment:true
                }
            })
            console.log("the data...",data)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({error:'Error occur in database'})
        }

    }
}