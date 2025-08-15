import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance, publicInstance } from "@/shared/lib/axios";

import { User } from "../model/user";
import { UserWithRelations } from "../model/user-with-relations";

export interface SignUpDto {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export interface SignUpResponse extends UserWithRelations {}

export interface SignInDto extends UserWithRelations {}

export interface SignInResponse {
  accessToken: string;
  user: UserWithRelations;
}

export interface SignOutResponse {
  ok?: boolean;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface ProfileResponse extends UserWithRelations {}

export interface SendActivationEmailResponse {
  message?: string;
  token?: string;
}

export interface SendResetPasswordEmailResponse {
  token: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  ok: boolean;
}

export interface UpdateUserDto extends Omit<SignUpDto, "password"> {}

export interface UpdateUserResponse extends UserWithRelations {}

export interface ToggleBanDto {
  isBanned?: boolean;
}

export interface ToggleBanResponse extends UserWithRelations {}
export interface DeleteUserResponse extends User {}

export class UserApi {
  static async signUp(data: SignUpDto) {
    const res = await publicInstance.post<SignUpResponse>(
      ROUTES.auth.signUp.path,
      data,
    );
    return res.data;
  }

  static async signIn(data: SignInDto) {
    const res = await publicInstance.post<SignInResponse>(
      ROUTES.auth.signIn.path,
      data,
    );
    return res.data;
  }

  static async signOut() {
    const res = await publicInstance.post<SignOutResponse>(
      ROUTES.auth.signOut.path,
    );
    return res.data;
  }

  static async refreshAccessToken() {
    const res = await publicInstance.post<RefreshResponse>(
      ROUTES.auth.refreshAccessToken.path,
    );
    return res.data;
  }

  static async getProfile() {
    const res = await authInstance.get<ProfileResponse>(
      ROUTES.auth.getProfile.path,
    );
    return res.data;
  }

  static async sendActivationMail() {
    const res = await authInstance.post<SendActivationEmailResponse>(
      ROUTES.auth.sendActivationMail.path,
    );
    return res.data;
  }

  static async sendResetPasswordEmail(email: string) {
    const res = await publicInstance.post<SendResetPasswordEmailResponse>(
      ROUTES.auth.sendResetPasswordEmail.path,
      {
        email,
      },
    );
    return res.data;
  }

  static async resetPassword(data: ResetPasswordDto) {
    const res = await publicInstance.post(ROUTES.auth.resetPassword.path, data);
    return res.data;
  }

  static async update(id: string, data: UpdateUserDto) {
    const res = await authInstance.put<UpdateUserResponse>(
      ROUTES.users.update(id).path,
      data,
    );
    return res.data;
  }

  static async toggleBan(id: string, data: ToggleBanDto) {
    const res = await authInstance.post<ToggleBanResponse>(
      ROUTES.users.toggleBan(id).path,
      data,
    );
    return res.data;
  }

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteUserResponse>(
      ROUTES.users.delete(id).path,
    );
    return res.data;
  }
}
