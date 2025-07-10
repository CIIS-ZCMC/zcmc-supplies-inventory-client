import { create } from "zustand";
import { read, remove } from "../Services/RequestMethods";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";
const useUserHook = create((set) => ({
  user: null,
  userData: [],
  moduleData: [],
  autoLogout: false,
  usersList: [],
  userRoles: [],
  setAutoLogout: (boolean) => {
    set({ autoLogout: boolean });
  },
  getUsers: async () => {
    try {
      const response = await inventory_api.get(`/users`);
      set({ usersList: response.data.data, userRoles: response.data.roles });
      return response;
    } catch (error) {
      return error;
    }
  },
  manageRole: async (data) => {
    try {
      const response = await inventory_api.post(`/manageRole`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  saveUser: async (data) => {
    try {
      const response = await inventory_api.post(`/saveUser`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  updateUser: async (data) => {
    try {
      const response = await inventory_api.post(`/updateUser`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  signIn: async (credentials) => {
    try {
      const response = await inventory_api.post(`/${API.SIGN_IN}`, credentials);
      set({ userData: response.data.user });
      set({ moduleData: response.data.module });
      return response;
    } catch (error) {
      return error;
    }
  },
  reAuthenticate: async () => {
    try {
      const response = await inventory_api.post(`/${API.REAUTHENTICATE}`);
      set({ userData: response.data.user });
      set({ moduleData: response.data.module });
      return response;
    } catch (error) {
      return error;
    }
  },
  logOut: async () => {
    try {
      const response = await inventory_api.post(`/${API.LOGOUT}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  authenticate: (token, params, callBack) => {
    read({
      url: "/authenticate",
      token: token,
      param: params,
      success: (res) => {
        set(() => ({ user: res.user }));

        callBack(200, res.message);
      },
      failed: callBack,
    });
  },
  sessionValidation: (token, callBack) => {
    read({
      url: "/session-validation",
      token: token,
      success: (res) => {
        set(() => ({ user: res.user }));

        callBack(200, res.message);
      },
      failed: callBack,
    });
  },
  signOut: (callBack) => {
    remove({
      url: "signout",
      success: (res) => {
        set(() => ({ user: null }));

        callBack(200, res.message);
      },
      failed: callBack,
    });
  },
}));

export default useUserHook;
