export type LoginRequest = {
    email: string,
    password: string,
};

export type LoginResponse = {
    status: number,
    message: string,
};

export type ChangePasswordRequest = {
    email: string,
    password: string,
    newPassword: string,
};

export type ChangePasswordResponce = {
    status: number,
    message: string,
};

export type SendMessageRequest = {
    name: string,
    email: string,
    message: string,
};

export type SendMessageResponce = {
    status: number,
    message: string,
};

export type GetProjectsRequest = {
params: {
        page: number;
        perPage: number;
        sortBy?: string;
        sortOrder?: string
  }
}

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
  data: Project[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type GetProjectByIdRequest = {
    params: {
        projectId:string
    }
}
export type GetProjectByIdResponce = Project;



