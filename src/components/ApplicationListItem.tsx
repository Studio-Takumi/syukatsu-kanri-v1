import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ApplicationWithDetails } from "@/types";
import { StatusBadge } from "./statusBadge";

type ApplicationListItemProps = {
  application: ApplicationWithDetails;
  onPress?: () => void;
};

export const ApplicationListItem: React.FC<ApplicationListItemProps> = ({ application, onPress }) => {
  const { company, currentStatus } = application;
  const displayName = company.company_name_short || company.company_name_official;

  // 日時表示の整形
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <TouchableOpacity onPress={onPress} className='flex-row items-center p-2 gap-2'>
      {/* 企業ロゴ（仮） */}
      <View className='w-6 h-6 rounded-full bg-gray-300' />

      {/* 会社名 */}
      <View className='max-w-1/2 w-1/2'>
        <Text className='text-base font-medium text-gray-900'>{displayName}</Text>
      </View>

      {/* ステータスバッジ */}
      { currentStatus && (
        <View className='flex-row items-center gap-1'>
          <StatusBadge status={currentStatus} size='md' />

          {/* 日時表示 */}
          {currentStatus.datetime_1 && <Text className='text-xs text-gray-600'>{formatDate(currentStatus.datetime_1)}</Text>}
        </View>
      ) }
    </TouchableOpacity>
  );
};
