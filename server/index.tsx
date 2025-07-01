//structure of database
//id, text, completed, createdAt
//start with getting all todos
import { initTRPC } from "@trpc/server";
import { z } from "zod";

let todos = [
    {id: 1, text: "Buy groceries", completed: true, createdAt: new Date()},
    {id:2, text: "build a todo app", completed: false, createdAt: new Date()},
    {id: 3, text: "add trpc to the todo app", completed: false, createdAt: new Date()},
];

const t = initTRPC.create();

export const appRouter = t.router({
    getTodos: t.procedure.query(() => {
        return todos;
    }),
    