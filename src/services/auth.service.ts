import { User, UserManager, WebStorageStateStore } from "oidc-client";
import { userManagerConfig } from "@/config/oidc-config";

export default class AuthService {
  private userManager: UserManager;

  constructor() {
    this.userManager = new UserManager({
      ...userManagerConfig,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    });
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public getAccessToken(): Promise<string> {
    return this.userManager.getUser().then((data: any) => {
      return data.access_token;
    });
  }
}
