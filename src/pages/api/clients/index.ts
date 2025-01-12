import prisma from "@/database";
import type { APIRoute } from "astro";
import {v4 as UUID} from "uuid";

export const prerender = false;

export const GET: APIRoute = async ({ params, request })=>{
    const clients = await prisma.clients.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return new Response(JSON.stringify(clients), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const POST: APIRoute = async ({ params, request })=>{
    try {
        const {id, ...body} = await request.json();
        const client = await prisma.clients.create({
            data: {
                ...body,
                id: UUID()
            }
        }
        )
        return new Response(JSON.stringify({
            method: 'POST',
            client
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            method: 'POST',
            error: error
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
   
}