const phone = /^(0|84)(3|5|7|8|9)([0-9]{8})$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const password = /(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/;
const URL =
    /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,}(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=\u0080-\uFFFF]*)$/;

export const regexService = {
    phone,
    email,
    password,
    URL,
};
