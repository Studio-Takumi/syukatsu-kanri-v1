/**
 * ユーザープロフィール
 */
export type UserProfile = {
    user_id: string;
    display_name?: string;
    university_name?: string;
    graduation_year?: number;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
};
