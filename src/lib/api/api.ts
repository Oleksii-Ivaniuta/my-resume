import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
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
  UpdateProjectResponse,
} from "@/types/apiTypes";

export const nextServer = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"] + "api",
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

export const sendMessage = async (data: SendMessageRequest) => {
  const res = await nextServer.post<SendMessageResponse>("/send-mail", data);
  return res;
};

export const getProjects = async (params: GetProjectsRequest) => {
  const res = await nextServer.get<GetProjectsResponse>("/projects", { params });
  return res.data;
};

export const getProjectById = async (projectId: string) => {
  const res = await nextServer.get<GetProjectByIdResponse>(
    `/projects/${projectId}`
  );
  return res;
};


export const changePassword = async (data: ChangePasswordRequest) => {
  const res = await nextServer.post<ChangePasswordResponse>(
    '/auth/change-password', data
  );
  return res;
};



export const checkSession = async () => {
  const res = await nextServer.get<{ authenticated: boolean }>("/status/");
  return res.data.authenticated;
};



async function refresh() {
  try {
    const refresh = await nextServer.post("/auth/refresh");
    if (refresh.status === 200) {
      return true;
    }
    console.log("refresh failed:");
  } catch (e) {
    console.log("refresh failed:", (e as Error).message);
    return false;
  }
}

async function requestWithAutoRefresh<T>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const res = await nextServer.request<T>(config);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      const ok = await refresh();
      if (!ok) throw err;
      const retry = await nextServer.request<T>(config);
      return retry.data;
    }
    throw err;
  }
}

export const createProject = async (data: FormData) => {
  return requestWithAutoRefresh<CreateProjectResponse>({
    method: "POST",
    url: "/projects",
    data,
  });
};

export const deleteProjectById = async (projectId: string) => {
  return requestWithAutoRefresh<DeleteProjectByIdResponse>({
    method: "DELETE",
    url: `/projects/${projectId}`,
  });
};

export const updateProjectById = async (projectId: string, data: FormData) => {
  return requestWithAutoRefresh<UpdateProjectResponse>({
    method: "PATCH",
    url: `/projects/${projectId}`,
    data,
  });
};
