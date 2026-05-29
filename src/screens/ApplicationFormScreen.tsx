import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { ApplicationWithDetails, StatusCategory } from '@/types';
import { STATUS_COLORS } from '@/utils/constants';
import '../../global.css';

type ApplicationFormScreenProps = {
    application?: ApplicationWithDetails;
    onSave?: (data: any) => void;
    onCancel?: () => void;
};

export const ApplicationFormScreen: React.FC<ApplicationFormScreenProps> = ({ application, onSave, onCancel }) => {
    // 企業情報
    const [companyName, setCompanyName] = useState(application?.company.company_name_official || '');
    const [agentName, setAgentName] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventUrl, setEventUrl] = useState('');
    const [myPageUrl, setMyPageUrl] = useState('');

    // ステータス情報
    const [statusCategory, setStatusCategory] = useState<StatusCategory>('apply');
    const [statusName, setStatusName] = useState('未応募');
    const [datetime1, setDatetime1] = useState('');
    const [datetime2, setDatetime2] = useState('');
    const [memo, setMemo] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [showStatusPicker, setShowStatusPicker] = useState(false);

    const statusOptions: { value: StatusCategory; label: string; defaultName: string }[] = [
        { value: 'apply', label: '応募', defaultName: '未応募' },
        { value: 'submission', label: '要ES・テスト', defaultName: '要ES' },
        { value: 'event', label: '説明会・面接', defaultName: '説明会' },
        { value: 'selection', label: '選考待ち・通過', defaultName: '選考待ち' },
        { value: 'passed', label: '合格・内定', defaultName: '合格' },
        { value: 'rejected', label: '選考落ち', defaultName: '選考落ち' },
    ];

    const handleStatusCategoryChange = (category: StatusCategory) => {
        setStatusCategory(category);
        const option = statusOptions.find((opt) => opt.value === category);
        if (option) {
            setStatusName(option.defaultName);
        }
        setShowStatusPicker(false);
    };

    const getStatusColors = () => {
        return STATUS_COLORS[statusCategory][isChecked ? 'checked' : 'unchecked'];
    };

    const getPlaceholders = () => {
        switch (statusCategory) {
            case 'apply':
                return { datetime1: '応募期限', datetime2: '応募日', checked: '応募済み', datetime2Enabled: true, checkboxEnabled: true };
            case 'submission':
                return { datetime1: '提出期限', datetime2: '提出日', checked: '提出済み', datetime2Enabled: true, checkboxEnabled: true };
            case 'event':
                return { datetime1: '予定日', datetime2: '', checked: '', datetime2Enabled: false, checkboxEnabled: false };
            case 'selection':
                return { datetime1: '通知日', datetime2: '', checked: '通知済み', datetime2Enabled: false, checkboxEnabled: true };
            case 'passed':
                return { datetime1: '通知日', datetime2: '', checked: '', datetime2Enabled: false, checkboxEnabled: false };
            case 'rejected':
                return { datetime1: '通知日', datetime2: '', checked: '', datetime2Enabled: false, checkboxEnabled: false };
            default:
                return { datetime1: '日付1', datetime2: '日付2', checked: '完了済み', datetime2Enabled: true, checkboxEnabled: true };
        }
    };

    const handleSave = () => {
        const data = {
            companyName,
            agentName,
            eventName,
            eventUrl,
            myPageUrl,
        };
        onSave?.(data);
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {/* ヘッダー */}
            <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
                <TouchableOpacity onPress={onCancel}>
                    <Text className='text-base font-medium text-blue-500'>キャンセル</Text>
                </TouchableOpacity>
                <Text className='text-lg font-bold text-gray-900'>{application ? '編集' : '新規作成'}</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text className='text-base font-medium text-blue-500'>保存</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className='flex-1 p-4'>
                {/* 企業情報 */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium text-gray-700'>会社名</Text>
                    <TextInput value={companyName} onChangeText={setCompanyName} placeholder='会社名' className='mb-3 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                    <Text className='text-sm font-medium text-gray-700'>エージェント名</Text>
                    <TextInput value={agentName} onChangeText={setAgentName} placeholder='エージェント名' className='mb-3 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                    <Text className=' text-sm font-medium text-gray-700'>イベント名</Text>
                    <TextInput value={eventName} onChangeText={setEventName} placeholder='イベント名' className='mb-3 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                    <Text className=' text-sm font-medium text-gray-700'>イベントURL</Text>
                    <TextInput value={eventUrl} onChangeText={setEventUrl} placeholder='https://example.com' className='mb-3 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                    <Text className=' text-sm font-medium text-gray-700'>マイページURL</Text>
                    <TextInput value={myPageUrl} onChangeText={setMyPageUrl} placeholder='https://example.com' className='mb-3 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                </View>

                {/* ステータス */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium text-gray-700'>ステータス</Text>

                    {/* セレクトボックスとテキストボックス */}
                    <View className='mb-3 flex-row items-center gap-2'>
                        <TouchableOpacity onPress={() => setShowStatusPicker(true)} className='flex-1 rounded border border-gray-300 bg-white p-3'>
                            <View className={`${getStatusColors().bg} rounded-full px-3 py-1`}>
                                <Text className={`${getStatusColors().text} text-center text-sm font-medium`}>{statusName}</Text>
                            </View>
                        </TouchableOpacity>
                        <TextInput value={statusName} onChangeText={setStatusName} placeholder='ステータス名' className='flex-1 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                    </View>

                    {/* カスタムピッカーモーダル */}
                    <Modal visible={showStatusPicker} transparent animationType='fade' onRequestClose={() => setShowStatusPicker(false)}>
                        <TouchableOpacity onPress={() => setShowStatusPicker(false)} className='flex-1 items-center justify-center bg-black/50'>
                            <View className='w-4/5 rounded-lg bg-white p-4'>
                                {statusOptions.map((option) => {
                                    const colors = STATUS_COLORS[option.value][false ? 'checked' : 'unchecked'];
                                    return (
                                        <TouchableOpacity key={option.value} onPress={() => handleStatusCategoryChange(option.value)} className='mb-2 items-center rounded p-3'>
                                            <View className={`${colors.bg} rounded-full px-4 py-2`}>
                                                <Text className={`${colors.text} text-sm font-medium`}>{option.label}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </TouchableOpacity>
                    </Modal>

                    {/* 日付1と日付2 */}
                    <View className='mb-3 flex-row items-center gap-2'>
                        <TextInput value={datetime1} onChangeText={setDatetime1} placeholder={getPlaceholders().datetime1} className='w-1/2 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />
                        <TextInput
                            value={datetime2}
                            onChangeText={setDatetime2}
                            placeholder={getPlaceholders().datetime2}
                            editable={getPlaceholders().datetime2Enabled}
                            className={`w-1/2 rounded border-b border-gray-300 p-3 text-base ${getPlaceholders().datetime2Enabled ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'}`}
                        />
                    </View>

                    {/* メモ */}
                    <TextInput value={memo} onChangeText={setMemo} placeholder='メモ' className='mb-3 rounded border-b border-gray-300 bg-white p-3 text-base text-gray-900' />

                    {/* チェックボックス */}
                    {getPlaceholders().checkboxEnabled && (
                        <TouchableOpacity onPress={() => setIsChecked(!isChecked)} className='mb-3 flex-row items-center gap-2'>
                            <View className={`h-6 w-6 items-center justify-center rounded border-2 ${isChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-400 bg-white'}`}>
                                {isChecked && <Text className='text-base font-bold text-white'>✓</Text>}
                            </View>
                            <Text className='text-base text-gray-900'>{getPlaceholders().checked}</Text>
                        </TouchableOpacity>
                    )}

                    {/* プラスボタン */}
                    <TouchableOpacity className='items-center rounded border-2 border-dashed border-gray-400 p-3'>
                        <Text className='text-2xl text-gray-600'>+</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
