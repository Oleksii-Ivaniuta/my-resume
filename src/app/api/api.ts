import axios from 'axios';
import { getEnvVar } from '../../utils/getEnvVar';
import { ENV_VARS } from '@/constants/envVars';

export const api = axios.create({
  baseURL: getEnvVar(ENV_VARS.BACK_BASE_URL),
  withCredentials: true,
});