import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance } from "@/shared/lib/axios";
import { S3BucketFolders } from "@apartment-crm/types";

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
    const res = await authInstance.post<UploadFileResponse>(
      ROUTES.s3.upload.path,
      data,
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
