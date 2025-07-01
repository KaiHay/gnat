import { create } from 'zustand';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    reward: number;
}

interface TodoStore {
    todos: Todo[];
    contracts: Contract[];
    earnings: number;
    biggestContract: Contract | null;
    addContract: (contract: Contract) => void;
    completeContract: (id: string) => void;
    deleteContract: (id: string) => void;
    clearCompletedContracts: () => void;
    getEarnings: () => number;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
    toggleContractTodo: (contractId: string, todoId: string) => void;
}

export interface Contract {
    id: string;
    title: string;
    description: string;
    todos: Todo[];
    reward: number;
    type: "daily" | "weekly" | "monthly";
    deadline: Date;
    completed: boolean;
    createdAt: Date;
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [
        { id: '1', text: 'Learn React Native', completed: false, createdAt: new Date(), reward: 10 },
        { id: '2', text: 'Build todo app', completed: true, createdAt: new Date(), reward: 25 },
        { id: '3', text: 'Add tRPC later', completed: false, createdAt: new Date(), reward: 15 },
    ],

    contracts: [
        {
            id: '1',
            title: 'Daily Self Care',
            description: 'Basic daily health and wellness tasks',
            reward: 50,
            type: 'daily',
            deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
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
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
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
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            completed: false,
            createdAt: new Date(),
            todos: [
                { id: '3-1', text: 'Read documentation', completed: false, createdAt: new Date(), reward: 50 },
                { id: '3-2', text: 'Build a sample project', completed: false, createdAt: new Date(), reward: 100 },
                { id: '3-3', text: 'Write a blog post about it', completed: false, createdAt: new Date(), reward: 75 },
                { id: '3-4', text: 'Teach someone else', completed: false, createdAt: new Date(), reward: 125 },
            ],
        },
    ],

    earnings: 0,
    biggestContract: null,

    addContract: (contract: Contract) =>
        set((state) => ({
            contracts: [...state.contracts, contract],
        })),

    completeContract: (id: string) =>
        set((state) => ({
            contracts: state.contracts.map((contract) =>
                contract.id === id ? { ...contract, completed: true } : contract
            ),
        })),

    deleteContract: (id: string) =>
        set((state) => ({
            contracts: state.contracts.filter((contract) => contract.id !== id),
        })),

    clearCompletedContracts: () =>
        set((state) => ({
            contracts: state.contracts.filter((contract) => !contract.completed),
        })),

    getEarnings: () => {
        // This will be implemented later
        return 0;
    },

    addTodo: (text: string) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now().toString(),
                    text,
                    completed: false,
                    createdAt: new Date(),
                    reward: 5, // Default reward
                },
            ],
        })),

    toggleTodo: (id: string) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })),

    deleteTodo: (id: string) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),

    clearCompleted: () =>
        set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
        })),

    toggleContractTodo: (contractId: string, todoId: string) =>
        set((state) => {
            let earnings = state.earnings;
            let biggestContract = state.biggestContract;

            const contracts = state.contracts.map((contract) => {
                if (contract.id !== contractId) return contract;

                const todos = contract.todos.map((todo) =>
                    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
                );
                const wasCompleted = contract.completed;
                const nowCompleted = todos.every((todo) => todo.completed);

                // Only add earnings if contract just became completed
                if (!wasCompleted && nowCompleted) {
                    earnings += contract.reward;
                    if (!biggestContract || contract.reward > biggestContract.reward) {
                        biggestContract = { ...contract, todos, completed: true };
                    }
                }

                return { ...contract, todos, completed: nowCompleted };
            });

            return { contracts, earnings, biggestContract };
        }),
})); 