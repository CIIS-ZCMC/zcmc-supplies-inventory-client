import { create } from "zustand";
import { read, remove } from "../Services/RequestMethods";

const useUserHook = create((set) => ({
  user: null,
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
