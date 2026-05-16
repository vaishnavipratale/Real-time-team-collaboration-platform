// Simple utility for opening a login modal or redirecting to login
export interface LoginModalPayload {
  reason?: string;
  source?: string;
}

export const LOGIN_MODAL_EVENT = "open-login-modal";

export const triggerLoginModal = (payload: LoginModalPayload = {}) => {
  window.dispatchEvent(
    new CustomEvent(LOGIN_MODAL_EVENT, {
      detail: payload,
    })
  );
};
