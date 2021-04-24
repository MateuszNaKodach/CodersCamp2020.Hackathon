import axios from 'axios';
import { PATH_BASE_URL } from '../../components/atoms/constants/apiPaths';
import { GROUP_ID } from '../../components/atoms/constants/ids';

export type ForceQuestionRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: ForceQuestionRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const ForceQuestionRestAPI = (config?: Partial<ForceQuestionRestApiConfig>) => {
  const currentConfig = {
    ...defaultConfig,
    config,
    baseUrl: process.env.REACT_APP_REST_API_BASE_URL ?? config?.baseUrl ?? defaultConfig.baseUrl,
  };
  return {
    async forceQuestion(): Promise<void> {
      await axios.post(`${currentConfig.baseUrl}/questions/force/${GROUP_ID}`, {}, {});
    },
    async forceQuiz(): Promise<void> {
      await axios.post(`${currentConfig.baseUrl}/current-question/${GROUP_ID}/forceStartQuiz`, {}, {});
    },
  };
};
