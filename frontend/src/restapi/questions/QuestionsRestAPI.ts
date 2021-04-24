import axios from 'axios';
import Cookies from 'universal-cookie';
import {EntityIdGenerator} from "../../components/atoms/idGenerator/EntityIdGenerator";

export type QuestionsRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: QuestionsRestApiConfig = {
  baseUrl: 'http://localhost:5000/rest-api',
};
const cookies = new Cookies();

const getAuthorizationTokenValue = () => `${cookies.get('authenticationToken').value}`;
const getAuthorizedUserId = () => `${cookies.get('currentUser').userId}`;


export const QuestionsRestApi = (config?: Partial<QuestionsRestApiConfig>) => {
  const currentConfig = {
    ...defaultConfig,
    config,
    baseUrl: process.env.REACT_APP_REST_API_BASE_URL ?? config?.baseUrl ?? defaultConfig.baseUrl,
  };
  return {
    // getRegisteredPlayersIds(tournamentId: string): Promise<TournamentRegistrationsDto> {
    //   return axios
    //     .get<TournamentRegistrationsDto>(`${currentConfig.baseUrl}/tournament-registrations/${tournamentId}`)
    //     .then((res) => res.data);
    // },
    // async postPlayersForTournament(body: { tournamentId: string; playerId: string }): Promise<void> {
    //   await axios.post(`${currentConfig.baseUrl}/tournament-registrations/${body.tournamentId}/players`, body);
    // },
    // async closeTournamentRegistration(tournamentId: string): Promise<void> {
    //   await axios.post(`${currentConfig.baseUrl}/tournament-registrations/${tournamentId}/close`, null, { params: { tournamentId } });
    // },
    // getAllTournamentsRegistrations(): Promise<TournamentRegistrationsListDto> {
    //   return axios.get<TournamentRegistrationsListDto>(`${currentConfig.baseUrl}/tournament-registrations/`).then((res) => res.data);
    // },
    // async createTournament(body: { tournamentId: string }): Promise<void> {
    //   const cookies = new Cookies();
    //   await axios.post(`${currentConfig.baseUrl}/tournament-registrations`, body, {
    //     headers: {
    //       Authorization: `${JSON.parse(cookies.get('authenticationToken')).value}`,
    //     },
    //   });
    // },
    async postQuestion(body: { groupId: string, text: string }): Promise<void> {
      await axios.post(`${currentConfig.baseUrl}/questions/${getAuthorizedUserId()}`, {...body, questionId: EntityIdGenerator.generate()}, {
        headers: {
          Authorization: getAuthorizationTokenValue(),
        },
      });
    },
  };
};
