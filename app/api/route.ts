import { NextResponse } from "next/server";

type Todolist = {
    id: number;
    title: string;
    status : boolean;
}

let nextID = 0;
let todolist: Todolist[] = [];

export async function GET()
{
    return NextResponse.json(todolist, {status: 200});   
}

export async function POST(req: Request)
{
    try
    {
        const body = await req.json();

        if(body.title == undefined) return NextResponse.json({error: "Title missing"} , {status: 400});
        if(body.status == undefined) return NextResponse.json({error: "Status missing"} , {status: 400});

        const newTodolist: Todolist = {
            id : nextID,
            title: body.title,
            status: body.status
        }

        todolist.push(newTodolist);
        nextID++;
        return NextResponse.json(newTodolist, {status:201});
    }

    catch
    {
        return NextResponse.json({error: "Invalid request body"}, {status: 400})
    }
}

export async function PUT(req: Request)
{
    try
    {
        const body = await req.json();
        const {id, title, status} = body;

        if(body.id == undefined) return NextResponse.json({error: "ID missing"} , {status: 400});
        if(body.title == undefined) return NextResponse.json({error: "Title missing"} , {status: 400});
        if(body.status == undefined) return NextResponse.json({error: "Status missing"} , {status: 400});

       const updateTodo = todolist.find(items => items.id === id);
        
        if (!updateTodo)
        {
            return NextResponse.json({error:"Todolist not found"}, {status: 404});
        }

        updateTodo.id = id;
        updateTodo.title = title;
        updateTodo.status = status;
        
        return NextResponse.json(updateTodo, {status:200});
    }

    catch
    {
        return NextResponse.json({error: "Invalid request body"}, {status: 400});
    }
}

export async function DELETE(req: Request)
{
    try
    {
        const {id} = await req.json();

        const indexToDelete = todolist.findIndex(items => items.id === id);

        if(indexToDelete === -1)
        {
            return NextResponse.json({error: "Todolist not found"} , {status:404});
        }

        todolist.splice(indexToDelete,1);
        return NextResponse.json({message:"Delete Successful"}, {status:200})
    }
    
    catch
    {
        return NextResponse.json({error: "Invalid request body"}, {status:400});
    }
}

