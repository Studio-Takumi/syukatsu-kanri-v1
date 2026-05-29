import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { ApplicationListItem } from '@/components/ApplicationListItem';
import { dummyApplications } from '@/utils/dummyData';
import { ApplicationWithDetails } from '@/types';
import '../../global.css';

export const CompanyListScreen: React.FC = () => {
    const handleItemPress = (application: ApplicationWithDetails) => {
        console.log('Selected:', application.company.company_name_short);
        // TODO: 詳細画面へ遷移
    };

    return (
        <SafeAreaView>
            {/* ヘッダー */}
            <View className='border-b border-gray-200 p-4'>
                <Text className='text-xl font-bold text-gray-900'>応募状況</Text>
            </View>

            {/* 応募リスト */}
            <FlatList data={dummyApplications} keyExtractor={(item) => item.application_id} renderItem={({ item }) => <ApplicationListItem application={item} onPress={() => handleItemPress(item)} />} contentContainerClassName='p-2' />
        </SafeAreaView>
    );
};
