import axios from 'axios';
import { getAuthorizationTokenValue } from '../cookies';

export type QuestionsRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: QuestionsRestApiConfig = {
  baseUrl: 'http://localhost:5000/rest-api',
};

export const UserAccountsRestApi = (config?: Partial<QuestionsRestApiConfig>) => {
  const currentConfig = {
    ...defaultConfig,
    config,
    baseUrl: process.env.REACT_APP_REST_API_BASE_URL ?? config?.baseUrl ?? defaultConfig.baseUrl,
  };
  return {
    async postDisplayName(body: { userId: string; displayName: string }): Promise<void> {
      await axios.post(
        `${currentConfig.baseUrl}/user-accounts/${body.userId}/display-name`,
        { displayName: body.displayName },
        {
          headers: {
            Authorization: getAuthorizationTokenValue(),
          },
        },
      );
    },
    async getDisplayNameByUserId(userId: string): Promise<{ displayName: string } | undefined> {
      return await axios
        .get<{ displayName: string }>(`${currentConfig.baseUrl}/user-accounts/${userId}/display-name`, {
          headers: {
            Authorization: getAuthorizationTokenValue(),
          },
        })
        .then((r) => r.data)
        .catch(() => undefined);
    },
  };
};
