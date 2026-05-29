import { StatusCategory } from '@/types';

/**
 * ステータスカテゴリごとの色設定（Tailwind CSS）
 * is_checkedの状態に応じて色を変える
 * unchecked: 濃い色, checked: 薄い色
 */
export const STATUS_COLORS: Record<StatusCategory, { unchecked: { bg: string; text: string }; checked: { bg: string; text: string } }> = {
    // 青: 未応募 / 応募済み
    apply: {
        unchecked: { bg: 'bg-blue-500', text: 'text-white' },
        checked: { bg: 'bg-blue-200', text: 'text-blue-900' },
    },
    // 緑: 要ES・要テスト / ES提出済・テスト提出済
    submission: {
        unchecked: { bg: 'bg-green-500', text: 'text-white' },
        checked: { bg: 'bg-green-200', text: 'text-green-900' },
    },
    // 黄色: 説明会・面接予定
    event: {
        unchecked: { bg: 'bg-yellow-400', text: 'text-yellow-900' },
        checked: { bg: 'bg-yellow-400', text: 'text-yellow-900' },
    },
    // オレンジ: 選考待ち / 選考通過
    selection: {
        unchecked: { bg: 'bg-orange-500', text: 'text-white' },
        checked: { bg: 'bg-orange-200', text: 'text-orange-900' },
    },
    // ピンク: 合格
    passed: {
        unchecked: { bg: 'bg-pink-500', text: 'text-white' },
        checked: { bg: 'bg-pink-500', text: 'text-white' },
    },
    // 黒: 選考落ち
    rejected: {
        unchecked: { bg: 'bg-slate-700', text: 'text-white' },
        checked: { bg: 'bg-slate-700', text: 'text-white' },
    },
};

/**
 * ステータスカテゴリの日本語表示名（デフォルト）
 * is_checkedに応じて表示を変える場合は別途処理
 */
export const STATUS_LABELS: Record<StatusCategory, { unchecked: string; checked: string }> = {
    apply: {
        unchecked: '未応募',
        checked: '応募済み',
    },
    submission: {
        unchecked: '要ES/要テスト',
        checked: 'ES提出済/テスト提出済',
    },
    event: {
        unchecked: '説明会・面接予定',
        checked: '説明会・面接予定',
    },
    selection: {
        unchecked: '選考待ち',
        checked: '選考通過',
    },
    passed: {
        unchecked: '合格',
        checked: '合格',
    },
    rejected: {
        unchecked: '選考落ち',
        checked: '選考落ち',
    },
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
export const TODO_STATUS_CATEGORIES: StatusCategory[] = ['not_applied', 'document_required'];
