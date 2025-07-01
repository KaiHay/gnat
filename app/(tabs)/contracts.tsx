import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTodoStore } from '../../lib/todo-store';

export default function ContractsScreen() {
    const { contracts } = useTodoStore();

    return (
        <ScrollView className="flex-1 bg-gray-50 p-5">
            <Text className="text-3xl font-bold text-center mb-2">📋 Contracts</Text>
            <Text className="text-gray-600 text-center mb-6">{contracts.length} contracts available</Text>

            {contracts.map((contract) => (
                <View key={contract.id} className="bg-white p-4 rounded-2xl mb-6 shadow-md">
                    <Text className="text-xl font-bold mb-1">{contract.title}</Text>
                    <Text className="text-gray-500 mb-2">{contract.description}</Text>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-lg font-bold text-green-600">💰 ${contract.reward}</Text>
                        <Text className="text-xs text-blue-500 uppercase">{contract.type}</Text>
                    </View>
                    <Text className="text-xs text-gray-400 mb-1">
                        {contract.todos.length} tasks • Due {contract.deadline.toLocaleDateString()}
                    </Text>
                    <View className="mt-2">
                        {contract.todos.map((todo) => (
                            <View key={todo.id} className="flex-row items-center mb-1">
                                <Text className={`mr-2 ${todo.completed ? 'text-green-500' : 'text-gray-400'}`}>
                                    {todo.completed ? '✔️' : '⬜️'}
                                </Text>
                                <Text className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                    {todo.text}
                                </Text>
                                <Text className="text-xs text-yellow-600 font-bold ml-2">${todo.reward}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
