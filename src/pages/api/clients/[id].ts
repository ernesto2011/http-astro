import prisma from "@/database";
import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender =false;
const finClientById = async(id: string)=>{
  try {
    const client = await prisma.clients.findUnique({
        where: {
            id
        }
    })
    return client;
  } catch (error) {
    console.log(error);
    
    return null;
  }  
}

export const GET: APIRoute = async ({ params, request })=>{
   try {
    const id = params.id;
    const client = await finClientById(id??'')
    if(!client){
        return new Response(JSON.stringify({
            method: 'GET:id',
            error: 'Client not found'
        }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return new Response(JSON.stringify(client), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
   } catch (error) {
    return new Response(JSON.stringify({
        method: 'GET',
        error: error
    }), {
        status: 400,
        headers: {
            'Content-Type': 'application/json'
        }
    })
   }
}

export const PATCH: APIRoute = async ({ params, request })=>{
    const idUser  = params.id ?? "";
    try {
        const client = await finClientById(idUser)
        if(!client){
            return new Response(JSON.stringify({
                error: 'Client not found'
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const {id,...body} = await request.json();
        const clientUpdate = prisma.clients.update({
            where: {
                id
            },
            data: body
            
        })
        return new Response(JSON.stringify({
            method: 'PATCH',
            id,
            clientUpdate
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}
export const DELETE: APIRoute = async ({ params, request })=>{
    const id = params.id;
    try {
        const client = await finClientById(id??'')
        if(!client){
            return new Response(`client not found with id: ${id}`)
        }
        const clientDelete = await prisma.clients.delete({
            where: {
                id
            }
        })

        return new Response(JSON.stringify({
            msg:'Client deleted success',
            client: clientDelete
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            method: 'DELETE',
            error: error
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}