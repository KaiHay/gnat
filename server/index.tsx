//structure of database
//id, text, completed, createdAt
//start with getting all todos
import { initTRPC } from "@trpc/server";
import { z } from "zod";

// Define Todo and Contract types
const TodoSchema = z.object({
    id: z.string(),
    text: z.string(),
    completed: z.boolean(),
    createdAt: z.date(),
    reward: z.number(),
});

const ContractSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    todos: z.array(TodoSchema),
    reward: z.number(),
    type: z.enum(["daily", "weekly", "monthly"]),
    deadline: z.date(),
    completed: z.boolean(),
    createdAt: z.date(),
});

type Todo = z.infer<typeof TodoSchema>;
type Contract = z.infer<typeof ContractSchema>;

let contracts: Contract[] = [
    {
        id: '1',
        title: 'Daily Self Care',
        description: 'Basic daily health and wellness tasks',
        reward: 50,
        type: 'daily',
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(),
        todos: [
            { id: '1-1', text: 'Brush teeth', completed: false, createdAt: new Date(), reward: 5 },
            { id: '1-2', text: 'Drink water', completed: false, createdAt: new Date(), reward: 3 },
            { id: '1-3', text: 'Take vitamins', completed: false, createdAt: new Date(), reward: 2 },
        ],
    },
    {
        id: '2',
        title: 'Weekly Project Milestone',
        description: 'Complete a major feature for your project',
        reward: 200,
        type: 'weekly',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(),
        todos: [
            { id: '2-1', text: 'Plan the feature', completed: false, createdAt: new Date(), reward: 20 },
            { id: '2-2', text: 'Build the UI', completed: false, createdAt: new Date(), reward: 40 },
            { id: '2-3', text: 'Add functionality', completed: false, createdAt: new Date(), reward: 60 },
            { id: '2-4', text: 'Test everything', completed: false, createdAt: new Date(), reward: 30 },
        ],
    },
    {
        id: '3',
        title: 'Monthly Learning Goal',
        description: 'Master a new technology or framework',
        reward: 500,
        type: 'monthly',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(),
        todos: [
            { id: '3-1', text: 'Read documentation', completed: false, createdAt: new Date(), reward: 50 },
            { id: '3-2', text: 'Build a sample project', completed: false, createdAt: new Date(), reward: 100 },
            { id: '3-3', text: 'Write a blog post about it', completed: false, createdAt: new Date(), reward: 75 },
            { id: '3-4', text: 'Teach someone else', completed: false, createdAt: new Date(), reward: 125 },
        ],
    },
];

const t = initTRPC.create();

export const appRouter = t.router({
    getContracts: t.procedure.query(() => contracts),

    toggleContractTodo: t.procedure
        .input(z.object({ contractId: z.string(), todoId: z.string() }))
        .mutation(({ input }) => {
            contracts = contracts.map((contract) => {
                if (contract.id !== input.contractId) return contract;
                const todos = contract.todos.map((todo) =>
                    todo.id === input.todoId ? { ...todo, completed: !todo.completed } : todo
                );
                const completed = todos.every((todo) => todo.completed);
                return { ...contract, todos, completed };
            });
            return contracts.find((c) => c.id === input.contractId);
        }),
});

export type AppRouter = typeof appRouter;

