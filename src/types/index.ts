// ========================================
// 基本型定義
// ========================================

/**
 * 応募種別
 */
export type ApplicationType = 'internship' | 'full_time';

/**
 * ステータスカテゴリ
 * NOTE: 仕様変更の可能性あり（選考通過などが追加されるかも）
 */
export type StatusCategory =
  | 'not_applied'           // 未応募
  | 'document_required'     // 要ES/要テスト
  | 'event_scheduled'       // 説明会予定/面接予定
  | 'in_selection'          // 選考中
  | 'rejected'              // 選考落ち
  | 'passed'                // 合格
  | 'offer_accepted'        // 内定承諾
  | 'offer_declined'        // 内定辞退
  | 'withdrawn';            // 応募辞退

// ========================================
// データベースモデル型
// ========================================

/**
 * 企業マスタ
 */
export interface Company {
  company_id: string;
  company_name_official: string;
  company_name_short?: string;
  logo_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

/**
 * エージェントマスタ
 */
export interface Agent {
  agent_id: string;
  agent_name: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

/**
 * 応募情報
 */
export interface Application {
  application_id: string;
  user_id: string;
  company_id: string;
  agent_id?: string;
  application_type: ApplicationType;
  event_url?: string;
  mypage_url?: string;
  notes?: string;
  is_visible: boolean;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * ステータス情報
 */
export interface Status {
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
}

/**
 * ユーザープロフィール
 */
export interface UserProfile {
  user_id: string;
  display_name?: string;
  university_name?: string;
  graduation_year?: number;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// ========================================
// 画面表示用の拡張型
// ========================================

/**
 * 企業情報＋現在のステータスを含む応募情報（一覧画面用）
 */
export interface ApplicationWithDetails extends Application {
  company: Company;
  agent?: Agent;
  currentStatus?: Status;
}

/**
 * TODO項目（TODO画面用）
 */
export interface TodoItem {
  application_id: string;
  company: Company;
  status: Status;
  deadline?: string;
}
