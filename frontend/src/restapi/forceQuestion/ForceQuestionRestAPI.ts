import axios from 'axios';
import Cookies from 'universal-cookie';
import { EntityIdGenerator } from '../../components/atoms/idGenerator/EntityIdGenerator';
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
      await axios.post(
        `${currentConfig.baseUrl}/questions/${GROUP_ID}`,
        {},
        {},
      );
    },
  };
};
