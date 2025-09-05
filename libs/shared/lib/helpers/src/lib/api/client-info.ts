export function getClientNamePhoneFromString(
  input = "",
  phoneRegex = /^\+?\d+$/,
) {
  try {
    const split = input?.trim().split(" ");
    const [name, phone] = [split?.slice(0, -1).join(" "), split?.at(-1)];
    const clientPhone =
      phone && phoneRegex.test(phone.replace(/[^\d\+]/g, "")) ? phone : "";

    const clientName = clientPhone
      ? name
      : [name, phone].filter(Boolean).join(" ");

    return [clientName, clientPhone];
  } catch {
    return ["", ""];
  }
}
