import { create } from 'zustand';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

interface TodoStore {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [
        { id: '1', text: 'Learn React Native', completed: false, createdAt: new Date() },
        { id: '2', text: 'Build todo app', completed: true, createdAt: new Date() },
        { id: '3', text: 'Add tRPC later', completed: false, createdAt: new Date() },
    ],

    addTodo: (text: string) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now().toString(),
                    text,
                    completed: false,
                    createdAt: new Date(),
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
})); 