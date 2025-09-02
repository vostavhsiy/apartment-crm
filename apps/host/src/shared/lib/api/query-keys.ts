export const APARTMENT_QUERY_KEYS = {
  apartments: ["apartments", "list"],
  apartment: (id: string) => ["apartments", "item", id],
};

export const CLIENT_QUERY_KEYS = {
  clients: ["clients", "list"],
  client: (id: string) => ["clients", "item", id],
};

export const COLLECTION_QUERY_KEYS = {
  collections: ["collections", "list"],
  collection: (id: string) => ["collections", "item", id],
};

export const NOTIFICATION_QUERY_KEYS = {
  notifications: ["notifications", "list"],
};

export const USER_QUERY_KEYS = {
  profile: ["user", "profile"],
  stats: ["user", "stats"],
};
