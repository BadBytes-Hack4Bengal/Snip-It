import { createContext, Dispatch, SetStateAction } from "react";

interface IAuthDetails {
  loggedIn: boolean,
  token: string;
  username: string,
}

const AuthContext = createContext<[IAuthDetails, Dispatch<SetStateAction<IAuthDetails>>]>([
  {
    loggedIn: false,
    token: "",
    username: ""
  },
  () => {
    console.error("Auth context uninitialized!");
  }
]);

export { type IAuthDetails };
export default AuthContext;
