type AuthUser = {
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: string;
};

export const useAuthToken = (): AuthUser => {
  try {
    const raw = localStorage.getItem("nivaara_auth_user");
    const user = raw ? JSON.parse(raw) : {};
    const firstName = user.first_name || user.firstname;
    const lastName = user.last_name || user.lastname;
    const fullName =
      user.name || `${firstName || ""} ${lastName || ""}`.trim() || undefined;

    return {
      name: fullName,
      email: user.email,
      phone: user.phone || user.mobile,
      role: user.role,
      firstname: firstName,
      lastname: lastName,
    };
  } catch {
    return {};
  }
};
