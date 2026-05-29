import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { dummyApplications } from '@/utils/dummyData';
import { STATUS_COLORS } from '@/utils/constants';
import '../../global.css';

export const CalendarScreen: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // 月の最初の日と最後の日を取得
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 曜日のオフセット（日曜日=0）
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // カレンダーのセル配列を作成
    const calendarDays: (number | null)[] = [];
    // 前月の空白
    for (let i = 0; i < startDayOfWeek; i++) {
        const prevMonthDay = new Date(year, month, -startDayOfWeek + i + 1).getDate();
        calendarDays.push(prevMonthDay);
    }
    // 今月の日付
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }
    // 次月の空白（7の倍数になるまで）
    const remainingCells = 7 - (calendarDays.length % 7);
    if (remainingCells < 7) {
        for (let i = 1; i <= remainingCells; i++) {
            calendarDays.push(i);
        }
    }

    // その日のイベントを取得
    const getEventsForDay = (day: number) => {
        const targetDate = new Date(year, month, day);
        return dummyApplications.filter((app) => {
            if (!app.currentStatus?.datetime_1) return false;
            const eventDate = new Date(app.currentStatus.datetime_1);
            return eventDate.getFullYear() === targetDate.getFullYear() && eventDate.getMonth() === targetDate.getMonth() && eventDate.getDate() === targetDate.getDate();
        });
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {/* ヘッダー */}
            <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
                <TouchableOpacity onPress={goToPreviousMonth} className='rounded bg-gray-100 px-4 py-2'>
                    <Text className='text-base font-medium text-gray-700'>{'<'}</Text>
                </TouchableOpacity>
                <Text className='text-xl font-bold text-gray-900'>
                    {year}年{month + 1}月
                </Text>
                <TouchableOpacity onPress={goToNextMonth} className='rounded bg-gray-100 px-4 py-2'>
                    <Text className='text-base font-medium text-gray-700'>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/* 曜日ヘッダー */}
                <View className='flex-row border-b border-gray-300'>
                    {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                        <View key={index} className='flex-1 items-center p-2'>
                            <Text className='text-sm font-medium text-gray-600'>{day}</Text>
                        </View>
                    ))}
                </View>

                {/* カレンダーグリッド */}
                <View className='flex-row flex-wrap'>
                    {calendarDays.map((day, index) => {
                        const isCurrentMonth = (index >= startDayOfWeek && index < startDayOfWeek + daysInMonth) || false;
                        const events = isCurrentMonth && day ? getEventsForDay(day) : [];
                        const dayOfWeek = index % 7;
                        const isSaturday = dayOfWeek === 6;
                        const isSunday = dayOfWeek === 0;

                        // 日付の色を決定
                        let dateColor = isCurrentMonth ? 'text-gray-900' : 'text-gray-400';
                        if (isCurrentMonth) {
                            if (isSunday) dateColor = 'text-red-500';
                            else if (isSaturday) dateColor = 'text-blue-500';
                        }

                        return (
                            <TouchableOpacity key={index} className='h-24 w-[calc(100%/7)] border-b border-r border-gray-200'>
                                {/* 日付 */}
                                <Text className={`text-center text-sm ${dateColor}`}>{day}</Text>

                                {/* イベント表示 */}
                                {events.slice(0, 2).map((event) => {
                                    const status = event.currentStatus;
                                    if (!status) return null;
                                    const colors = STATUS_COLORS[status.status_category][status.is_checked ? 'checked' : 'unchecked'];
                                    const companyName = event.company.company_name_short || event.company.company_name_official;
                                    return (
                                        <View key={event.application_id} className={`${colors.bg} mt-1 rounded px-1`}>
                                            <Text className={`${colors.text} text-[10px] font-bold`} numberOfLines={1}>
                                                {companyName} {status.status_name}
                                            </Text>
                                        </View>
                                    );
                                })}
                                {/* 3件以上ある場合 */}
                                {events.length > 2 && <Text className='mt-1 text-xs text-gray-500'>+{events.length - 2}件</Text>}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
