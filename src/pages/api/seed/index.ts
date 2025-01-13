import prisma from '@/database';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { db } from 'astro:db';
import { v4 as UUID } from 'uuid';

const clients = [
    { id: UUID(), name: 'John Doe', age: 29, is_active: true },
    { id: UUID(), name: 'Jane Smith', age: 34, is_active: false },
    { id: UUID(), name: 'Michael Johnson', age: 45, is_active: true },
    { id: UUID(), name: 'Emily Davis', age: 22, is_active: false },
    { id: UUID(), name: 'William Brown', age: 31, is_active: true },
    { id: UUID(), name: 'Sophia Wilson', age: 27, is_active: false },
    { id: UUID(), name: 'James Garcia', age: 38, is_active: true },
    { id: UUID(), name: 'Olivia Miller', age: 41, is_active: false },
    { id: UUID(), name: 'Daniel Martinez', age: 36, is_active: true },
    { id: UUID(), name: 'Ava Anderson', age: 25, is_active: false },
  ];
export const GET:APIRoute = async({params, request})=>{

    await prisma.clients.deleteMany()
    await prisma.post.deleteMany()
    await prisma.clients.createMany({
        data: clients
    })
    //const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
    const posts = await getCollection('blog')
    const postData = posts.map((post)=>({
        id: post.id,
        title: post.data.title,
        likes: Math.round(Math.random()*100)
    }))
    await prisma.post.createMany({
        data: postData
    }) 

    return new Response('seeded Database success!',{status:200})
}