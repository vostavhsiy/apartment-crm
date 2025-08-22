import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance } from "@/shared/lib/axios";
import { S3BucketFolders } from "@apartment-crm/types";

import { getFormDataFromObject } from "../../utils";

export interface UploadFileDto {
  file: File;
  folder?: S3BucketFolders;
}

export type UploadFileResponse = {
  url: string;
  key: string;
} | null;

export interface DeleteFileResponse {
  ok?: boolean;
}

export class S3Api {
  static async uploadFile(data: UploadFileDto) {
    const formData = getFormDataFromObject(data);
    const res = await authInstance.post<UploadFileResponse>(
      ROUTES.s3.upload.path,
      formData,
    );
    return res.data;
  }

  static async delete(url: string) {
    const res = await authInstance.delete<DeleteFileResponse>(
      ROUTES.s3.delete.path,
      { params: { url } },
    );
    return res.data;
  }
}
