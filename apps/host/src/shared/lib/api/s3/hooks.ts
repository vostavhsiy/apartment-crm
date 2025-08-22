import { useMutation } from "@tanstack/react-query";

import { S3Api, UploadFileDto } from "./api";

export function useUploadFile() {
  return useMutation({
    mutationFn: (data: UploadFileDto) => S3Api.uploadFile(data),
  });
}

export function useDeleteFile() {
  return useMutation({
    mutationFn: (url: string) => S3Api.delete(url),
  });
}
