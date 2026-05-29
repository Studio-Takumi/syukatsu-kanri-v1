import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { TodoListItem } from '@/components/TodoListItem';
import { dummyApplications } from '@/utils/dummyData';
import { ApplicationWithDetails } from '@/types';
import '../../global.css';

export const TodoListScreen: React.FC = () => {
    // TODO抽出: apply(未応募) または submission(要ES/要テスト) で is_checked: false
    const todoItems = dummyApplications.filter((app) => {
        if (!app.currentStatus) return false;
        const { status_category, is_checked } = app.currentStatus;
        return (status_category === 'apply' || status_category === 'submission') && !is_checked;
    });

    const handleCheck = (applicationId: string) => {
        console.log('Checked:', applicationId);
        // TODO: is_checkedをtrueに更新
    };

    return (
        <SafeAreaView>
            {/* ヘッダー */}
            <View className='border-b border-gray-200 p-4'>
                <Text className='text-xl font-bold text-gray-900'>TODO</Text>
            </View>

            {/* TODOリスト */}
            <FlatList data={todoItems} keyExtractor={(item) => item.application_id} renderItem={({ item }) => <TodoListItem application={item} onCheck={handleCheck} />} contentContainerClassName='p-2' />
        </SafeAreaView>
    );
};
