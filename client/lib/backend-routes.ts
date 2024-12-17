export const BASE_URL = "http://localhost:8000";

export const authRoutes = {
  user_login: `${BASE_URL}/api/user/login`,
  super_admin_login: `${BASE_URL}/api/superadmin/login`,
};

export const superAdminRoutes = {
  add_admin: `${BASE_URL}/api/superadmin/create-admin`,

}