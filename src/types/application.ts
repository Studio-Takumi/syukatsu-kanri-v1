/**
 * 応募種別
 */
export type ApplicationType = 'internship' | 'full_time';

/**
 * 応募情報
 */
export type Application = {
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
};
