// utils/validation.ts

export const isEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPhone = (phone: string) => {
  return /^[6-9]\d{9}$/.test(phone);
};

export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === "";
};