import { Application } from './application';
import { Company } from './company';
import { Agent } from './agent';
import { Status } from './status';

/**
 * 企業情報＋現在のステータスを含む応募情報（一覧画面用）
 */
export type ApplicationWithDetails = Application & {
    company: Company;
    agent?: Agent;
    currentStatus?: Status;
};

/**
 * TODO項目（TODO画面用）
 */
export type TodoItem = {
    application_id: string;
    company: Company;
    status: Status;
    deadline?: string;
};
