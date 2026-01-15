import { NextResponse } from "next/server";

const API_TOKEN = "3EXc82xXg69i690pWP4tMUWZ7F0dUX9a0KPDXLTOGDKRjubYjxbqgS4ED8dUVOj0";

export function authenticate(req: Request)
{
    const authHeader = req.headers.get("authorization")

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        return NextResponse.json({error:"Unauthorized"}, {status:401});
    }

    const token = authHeader.replace("Bearer ", "");

    if(token !== API_TOKEN)
    {
        return NextResponse.json({error: "Invalid Token"}, {status:401});
    }

    return null;
}