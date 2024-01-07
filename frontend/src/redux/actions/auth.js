import { AUTH } from "../actionsTypes";
import * as api from "../api/index";

export const signin = (data2, navigate) => async (dispath) => {
  try {
    const { data } = await api.signIn(data2);

    dispath({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signinGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    // login user
    const { data } = await api.signInGoogle(accessToken);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
