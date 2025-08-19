import { getLCItem, setLCItem } from "./local-storage";

export const LC_MAIL_PASSWORD_EXPIRE = "LC_MAIL_PASSWORD_EXPIRE";

export const setPasswordMailExpire = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 2);

  setLCItem(LC_MAIL_PASSWORD_EXPIRE, date);
};

export const getPasswordMailExpireTimeDiff = () => {
  const expire = getLCItem(LC_MAIL_PASSWORD_EXPIRE, true);
  console.log(expire);
  const expireDate = new Date(expire);
  if (!expire || isNaN(expireDate.getDate())) return null;
  const date = new Date();
  const diff = expireDate.getTime() - date.getTime();
  return Math.ceil(diff / 1000);
};
