import { create } from "zustand";
import { read, remove } from "../Services/RequestMethods";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";
const useUserHook = create((set) => ({
  user: null,
  signIn: async (credentials) => {
    try {
      const response = await inventory_api.post(`/${API.SIGN_IN}`, credentials);
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
  reAuthenticate: async () => {
    try {
      const response = await inventory_api.post(`/${API.REAUTHENTICATE}`);

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
