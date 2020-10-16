import { signUseCase } from ".";

describe("UserCases", () => {
  it("Authorize Valid User", async () => {
    const _authorization = await signUseCase.execute({
      email: "isa@gmail.com",
      password: "1234",
    });

    const { user, token, authorized } = _authorization;

    expect(token).not.toBeNull();
    expect(authorized).toBeTruthy();
    expect(user).toHaveProperty("id");
  });

  it("Authorize Invalid Password", async () => {
    const _authorization = await signUseCase.execute({
      email: "isa@gmail.com",
      password: "123456",
    });

    const { user, token, authorized } = _authorization;

    expect(token).not.toBeTruthy();
    expect(authorized).not.toBeTruthy();
    expect(user).toBeNull();
  });

  it("Authorize Invalid Email", async () => {
    const _authorization = await signUseCase.execute({
      email: "isa1@gmail.com",
      password: "1234",
      name: "",
    });

    const { user, token, authorized } = _authorization;

    expect(token).not.toBeTruthy();
    expect(authorized).not.toBeTruthy();
    expect(user).toBeNull();
  });
});
