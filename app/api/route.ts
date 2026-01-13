import { NextResponse } from "next/server";

type TaskStatus = "TODO" | "HOLD" | "IN PROGRESS" | "COMPLETE";

type Todo = {
    uniqueid: number;
    title: string;
    assignee: string;
    duedate: string;
    status : TaskStatus;
}

let todolist: Todo[] = [];

export async function GET() {
    return NextResponse.json(todolist, {status: 200});   
}