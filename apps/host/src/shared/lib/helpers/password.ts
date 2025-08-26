import { getLCItem, setLCItem } from "./local-storage";

export const LC_MAIL_PASSWORD_EXPIRE = "LC_MAIL_PASSWORD_EXPIRE";
export const LC_MAIL_ACTIVATION_EXPIRE = "LC_MAIL_ACTIVATION_EXPIRE";

export const setMailExpire = (activation?: boolean) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 2);

  setLCItem(
    !activation ? LC_MAIL_PASSWORD_EXPIRE : LC_MAIL_ACTIVATION_EXPIRE,
    date,
  );
};

export const getMailExpireTimeDiff = (activation?: boolean) => {
  const expire = getLCItem(
    !activation ? LC_MAIL_PASSWORD_EXPIRE : LC_MAIL_ACTIVATION_EXPIRE,
    true,
  );
  const expireDate = new Date(expire);
  if (!expire || isNaN(expireDate.getDate())) return null;
  const date = new Date();
  const diff = expireDate.getTime() - date.getTime();
  return Math.ceil(diff / 1000);
};
