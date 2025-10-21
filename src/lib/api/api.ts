import axios from 'axios';
import { ENV_VARS } from '@/constants/envVars';
import { getEnvVar } from '@/app/utils/getEnvVar';

export const nextServer = axios.create({
  baseURL: getEnvVar(ENV_VARS.FRONT_BASE_URL) + 'api',
  withCredentials: true,
});