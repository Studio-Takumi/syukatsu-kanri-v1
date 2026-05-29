/**
 * 企業マスタ
 */
export type Company = {
    company_id: string;
    company_name_official: string;
    company_name_short?: string;
    logo_url?: string;
    website_url?: string;
    created_at: string;
    updated_at: string;
};
