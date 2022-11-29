import { UserTokenModel } from "./UserTokenModel";

export type AppContextType = {
  currentUser: UserTokenModel | null;
  userModifier: (user: UserTokenModel | null) => void;
};
