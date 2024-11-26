import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender =false;

export const GET: APIRoute = async ({ params, request })=>{
   try {
    const id  = params.id;
    const client = await db.select().from(Clients).where(eq(Clients.id, +id!)).get();
    if(!client){
        return new Response(JSON.stringify({
            method: 'GET:id',
            error: 'Client not found'
        }), {
            status: 201,
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
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    })
   }
}

export const PATCH: APIRoute = async ({ params, request })=>{
    const id  = params.id ?? "";
    try {
        const {...body} = await request.json();
        await db.update(Clients).set({
            ...body
        }).where(eq(Clients.id, +id))
        return new Response(JSON.stringify({
            method: 'PATCH',
            id,
            ...body
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            method: 'PATCH',
            error: error
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}
export const DELETE: APIRoute = async ({ params, request })=>{
    const id = params.id;
    try {
        const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +id!));
        if(rowsAffected === 0){
            return new Response(JSON.stringify({
                status: 404,
                method: 'DELETE',
                error: 'Client not found'
            }), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return new Response(JSON.stringify({
            method: 'DELETE',
            id
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