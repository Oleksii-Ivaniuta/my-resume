import axios from "axios";
import { ENV_VARS } from "@/constants/envVars";
import { getEnvVar } from "@/utils/getEnvVar";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectByIdResponse,
  GetProjectByIdResponse,
  GetProjectsRequest,
  GetProjectsResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SendMessageRequest,
  SendMessageResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "@/types/apiTypes";

export const nextServer = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BASE_URL'] + "api",
  withCredentials: true,
});

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post<LogoutResponse>("/auth/logout");
  return res.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const res = await nextServer.post<ChangePasswordResponse>(
    "/auth/change-password",
    data
  );
  return res.data;
};

export const refresh = async () => {
  const res = await nextServer.post("/auth/refresh");
  return res;
};

export const sendMessage = async (data: SendMessageRequest) => {
  const res = await nextServer.post<SendMessageResponse>("/send-mail", data);
  console.log(res);
  return res;
};

export const getProjects = async (params: GetProjectsRequest) => {
  const res = await nextServer.get<GetProjectsResponse>("/projects", params);
  return res;
};

export const createProject = async (data: CreateProjectRequest) => {
  const res = await nextServer.post<CreateProjectResponse>("/projects", data);
  return res;
};

export const getProjectById = async (projectId: string) => {
  const res = await nextServer.get<GetProjectByIdResponse>(
    `/projects/${projectId}`
  );
  return res;
};

export const deleteProjectById = async (projectId: string) => {
  const res = await nextServer.delete<DeleteProjectByIdResponse>(
    `/projects/${projectId}`
  );
  return res;
};

export const updateProjectById = async (
  projectId: string,
  data: UpdateProjectRequest
) => {
  const res = await nextServer.patch<UpdateProjectResponse>(
    `/projects/${projectId}`,
    data
  );
  return res;
};
