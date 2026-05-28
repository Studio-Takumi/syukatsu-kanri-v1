import { StatusCategory } from '@/types';

/**
 * ステータスカテゴリごとの色設定（Tailwind CSS）
 * NOTE: 仕様変更の可能性あり
 */
export const STATUS_COLORS: Record<StatusCategory, { base: string; checked: string }> = {
  not_applied: {
    base: 'bg-gray-500',
    checked: 'bg-gray-300',
  },
  document_required: {
    base: 'bg-green-500',
    checked: 'bg-green-300',
  },
  event_scheduled: {
    base: 'bg-blue-500',
    checked: 'bg-blue-300',
  },
  in_selection: {
    base: 'bg-yellow-500',
    checked: 'bg-yellow-300',
  },
  rejected: {
    base: 'bg-red-500',
    checked: 'bg-red-300',
  },
  passed: {
    base: 'bg-pink-500',
    checked: 'bg-pink-300',
  },
  offer_accepted: {
    base: 'bg-purple-500',
    checked: 'bg-purple-300',
  },
  offer_declined: {
    base: 'bg-orange-500',
    checked: 'bg-orange-300',
  },
  withdrawn: {
    base: 'bg-gray-500',
    checked: 'bg-gray-300',
  },
};

/**
 * ステータスカテゴリの日本語表示名
 */
export const STATUS_LABELS: Record<StatusCategory, string> = {
  not_applied: '未応募',
  document_required: '要ES/要テスト',
  event_scheduled: '説明会・面接予定',
  in_selection: '選考中',
  rejected: '選考落ち',
  passed: '合格',
  offer_accepted: '内定承諾',
  offer_declined: '内定辞退',
  withdrawn: '応募辞退',
};

/**
 * 応募種別の日本語表示名
 */
export const APPLICATION_TYPE_LABELS = {
  internship: 'インターン',
  full_time: '本選考',
} as const;

/**
 * TODO抽出条件に含めるステータスカテゴリ
 */
export const TODO_STATUS_CATEGORIES: StatusCategory[] = [
  'not_applied',
  'document_required',
];
