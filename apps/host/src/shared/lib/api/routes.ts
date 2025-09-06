import { settings } from "../env";

export const ROUTES = {
  auth: {
    signUp: {
      path: "/api/auth/sign-up",
    },
    signIn: {
      path: "/api/auth/sign-in",
    },
    signOut: {
      path: "/api/auth/sign-out",
    },
    refreshAccessToken: {
      path: "/api/auth/refresh",
    },
    getProfile: {
      path: "/api/auth/profile",
    },
    getStats: {
      path: `/api/apartments/stats`,
    },
    sendActivationMail: {
      path: "/api/auth/activation-mail",
    },
    sendResetPasswordEmail: {
      path: "/api/auth/reset-password-mail",
    },
    resetPassword: {
      path: "/api/auth/reset-password",
    },
  },
  apartments: {
    findForUser: {
      path: "/api/apartments",
    },
    findForCollection: {
      path: "/api/apartments/for-collection",
    },
    findOne: (id: string) => ({
      path: `/api/apartments/${id}`,
    }),
    findForClient: (clientId: string) => ({
      path: `/api/apartments/${clientId}/for-client`,
    }),
    create: {
      path: "/api/apartments",
    },
    update: (id: string) => ({
      path: `/api/apartments/${id}`,
    }),
    toggleApartmentToCollection: (id: string) => ({
      path: `/api/apartments/${id}/toggle-collection`,
    }),
    delete: (id: string) => ({
      path: `/api/apartments/${id}`,
    }),
    getInfoFromAi: {
      path: `/api/apartments/ai`,
    },
  },
  clients: {
    findForUser: {
      path: "/api/clients",
    },
    findCollectionLink: (id: string) => ({
      path: `/api/clients/collection-link/${id}`,
    }),
    findOne: (id: string) => ({
      path: `/api/clients/${id}`,
    }),
    findClientStats: (id: string) => ({
      path: `/api/clients/${id}/stats`,
    }),
    create: {
      path: "/api/clients",
    },
    update: (id: string) => ({
      path: `/api/clients/${id}`,
    }),
    toggleCollectionToClient: (id: string) => ({
      path: `/api/clients/${id}/toggle-collection`,
    }),
    toggleApartmentToClient: (id: string) => ({
      path: `/api/clients/${id}/toggle-apartment`,
    }),
    seeApartment: (clientId: string, apartmentId: string) => ({
      path: `/api/clients/${clientId}/view/${apartmentId}`,
    }),
    delete: (id: string) => ({
      path: `/api/clients/${id}`,
    }),
  },
  collections: {
    findForUser: {
      path: "/api/collections",
    },
    findOne: (id: string) => ({
      path: `/api/collections/${id}`,
    }),
    create: {
      path: "/api/collections",
    },
    update: (id: string) => ({
      path: `/api/collections/${id}`,
    }),
    delete: (id: string) => ({
      path: `/api/collections/${id}`,
    }),
  },
  notifications: {
    findForUser: {
      path: "/api/notifications",
    },
    create: {
      path: "/api/notifications",
    },
    readForUser: {
      path: "/api/notifications",
    },
    readOneForUser: (id: string) => ({
      path: `/api/notifications/${id}`,
    }),
    deleteForUser: {
      path: "/api/notifications",
    },
    delete: (id: string) => ({
      path: `/api/notifications/${id}`,
    }),
  },
  s3: {
    upload: {
      path: "/api/s3/upload",
    },
    uploadMultiple: {
      path: "/api/s3/upload-multiple",
    },
    delete: {
      path: `/api/s3/delete`,
    },
  },
  users: {
    update: (id: string) => ({
      path: `/api/users/${id}`,
    }),
    toggleBan: (id: string) => ({
      path: `/api/users/${id}/toggle-ban`,
    }),
    delete: (id: string) => ({
      path: `/api/users/${id}`,
    }),
  },
  ws: settings.NEXT_PUBLIC_API_URL + "/ws",
};
