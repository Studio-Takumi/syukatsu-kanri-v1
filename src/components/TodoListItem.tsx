import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ApplicationWithDetails } from '@/types';
import { StatusBadge } from './statusBadge';

type TodoListItemProps = {
    application: ApplicationWithDetails;
    onCheck?: (applicationId: string) => void;
};

export const TodoListItem: React.FC<TodoListItemProps> = ({ application, onCheck }) => {
    const { company, currentStatus } = application;
    const displayName = company.company_name_short || company.company_name_official;

    // 日時表示の整形
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <TouchableOpacity onPress={() => onCheck?.(application.application_id)} className='flex-row items-center gap-2 p-2'>
            {/* チェックボックス */}
            <View className='h-5 w-5 rounded border-2 border-gray-400' />

            {/* 会社名 */}
            <Text className='flex-1 text-base font-medium text-gray-900'>{displayName}</Text>

            {/* ステータスバッジ */}
            {currentStatus && <StatusBadge status={currentStatus} size='sm' />}

            {/* 期限日付 */}
            {currentStatus?.datetime_1 && <Text className='text-sm text-gray-500'>{formatDate(currentStatus.datetime_1)}</Text>}
        </TouchableOpacity>
    );
};
