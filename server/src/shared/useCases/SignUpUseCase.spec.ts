import { signUpUseCase } from ".";
import IUser from "../entities/interfaces/IUser";

describe("SignUpUseCase", () => {
  it("New User", async () => {
    const _user: IUser = {
      email: "jhlcandido@gmail.com",
      password: "1234",
      name: "Jonathan",
    };
    const _created_user = await signUpUseCase.execute(_user);

    expect(_created_user.user?.id).toBeTruthy();
    expect(_created_user.user?.email).toEqual(_user.email);
  });
});
