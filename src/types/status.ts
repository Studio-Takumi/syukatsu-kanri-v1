/**
 * ステータスカテゴリ（論理的なステータス）
 * is_checkedと組み合わせて使用
 *
 * 例:
 * - apply + is_checked:false → 未応募
 * - apply + is_checked:true → 応募済み
 * - submission + is_checked:false → 要ES/要テスト
 * - submission + is_checked:true → ES提出済/テスト提出済
 */
export type StatusCategory =
    | 'apply' // 未応募 / 応募済み（is_checkedで判定）
    | 'submission' // 要ES・要テスト / ES提出済・テスト提出済（is_checkedで判定）
    | 'event' // 説明会・面接予定
    | 'selection' // 選考待ち / 選考通過（is_checkedで判定）
    | 'passed' // 合格
    | 'rejected'; // 選考落ち

/**
 * ステータス情報
 */
export type Status = {
    status_id: string;
    application_id: string;
    status_category: StatusCategory;
    status_name: string;
    is_checked: boolean;
    datetime_1?: string;
    datetime_2?: string;
    location_or_link?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};
