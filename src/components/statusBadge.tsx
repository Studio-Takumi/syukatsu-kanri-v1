import React from 'react';
import { View, Text } from 'react-native';
import { Status } from '@/types';
import { STATUS_COLORS } from '@/utils/constants';

type StatusBadgeProps = {
    status: Status;
    size?: 'sm' | 'md' | 'lg';
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
    // is_checkedに応じて色を選択
    const colors = STATUS_COLORS[status.status_category][status.is_checked ? 'checked' : 'unchecked'];

    // サイズごとのスタイル
    const sizeStyles = {
        sm: 'px-2 py-0.5',
        md: 'px-3 py-1',
        lg: 'px-4 py-1.5',
    };

    const textSizeStyles = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return (
        <View className={`${colors.bg} ${sizeStyles[size]} rounded-full`}>
            <Text className={`${colors.text} ${textSizeStyles[size]} font-medium`}>{status.status_name}</Text>
        </View>
    );
};
