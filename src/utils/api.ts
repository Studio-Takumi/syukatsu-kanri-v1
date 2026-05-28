/**
 * API設定
 * Go APIのベースURLと共通fetch関数
 */

// TODO: 本番環境では環境変数から読み込む
const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api'  // 開発環境
  : 'https://api.syukatsu-kanri.com/api';  // 本番環境（仮）

/**
 * API共通fetch関数
 */
export const apiFetch = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

/**
 * API エンドポイント定義
 */
export const API_ENDPOINTS = {
  // 応募情報
  applications: {
    getAll: '/applications',
    getById: (id: string) => `/applications/${id}`,
    create: '/applications',
    update: (id: string) => `/applications/${id}`,
    delete: (id: string) => `/applications/${id}`,
    bulkCreate: '/applications/bulk',
  },

  // AI自動入力
  ai: {
    extract: '/ai/extract',
  },

  // 企業マスタ
  companies: {
    search: '/companies',
    getById: (id: string) => `/companies/${id}`,
  },

  // エージェントマスタ
  agents: {
    getAll: '/agents',
    getById: (id: string) => `/agents/${id}`,
  },

  // お知らせ
  announcements: {
    getAll: '/announcements',
  },
};
