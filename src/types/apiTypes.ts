export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: number;
  message: string;
};

export type LogoutResponse = {
  status: number
    message?: string;
}

export type ChangePasswordRequest = {
  email: string;
  password: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  status: number;
  message: string;
};

export type SendMessageRequest = {
  name: string;
  email: string;
  message: string;
};

export type SendMessageResponse = {
  status: number;
  message: string;
};

export type GetProjectsRequest = {
    page: number;
    perPage: number;
    sortBy?: string;
    sortOrder?: string;
};

export type Project = {
  _id: string;
  name: string;
  order: number;
  descriptionEn: string;
  descriptionUk: string;
  descriptionPt: string;
  photoUrl?: string;
  liveUrl: string;
  frontCodeUrl?: string;
  backCodeUrl?: string;
  techStack: string;
  typeEn: string;
  typeUk: string;
  typePt: string;
  roleEn: string;
  roleUk: string;
  rolePt: string;
  createdAt: string;
  updatedAt: string;
};

export type GetProjectsResponse = {
  data: {
      data: Project[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  }

};

export type GetProjectByIdRequest = {
  params: {
    projectId: string;
  };
};

export type GetProjectByIdResponse = { data: Project };

export type CreateProjectRequest = {
  name: string;
  order: number;
  descriptionEn: string;
  descriptionUk: string;
  descriptionPt: string;
  photo?: File;
  liveUrl: string;
  frontCodeUrl?: string;
  backCodeUrl?: string;
  techStack: string;
  typeEn: string;
  typeUk: string;
  typePt: string;
  roleEn: string;
  roleUk: string;
  rolePt: string;
};

export type CreateProjectResponse = Project;

export type UpdateProjectRequest = {
  name?: string;
  order?: number;
  descriptionEn?: string;
  descriptionUk?: string;
  descriptionPt?: string;
  photo?: File;
  liveUrl?: string;
  frontCodeUrl?: string;
  backCodeUrl?: string;
  techStack?: string;
  typeEn?: string;
  typeUk?: string;
  typePt?: string;
  roleEn?: string;
  roleUk?: string;
  rolePt?: string;
};

export type UpdateProjectResponse = Project;

export type DeleteProjectByIdResponse = {
    status: number;
}