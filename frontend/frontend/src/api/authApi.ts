import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const sendOtp = (email: string) =>
  API.post("/auth/send-otp", { email });

export const verifyOtp = (email: string, otp: string) =>
  API.post("/auth/verify-otp", { email, otp });