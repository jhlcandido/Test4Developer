import request from "supertest";
import app from "../../app";

describe("SessionController", () => {
  it("Authorize Valid User", async () => {
    await request(app)
      .post("/signup")
      .send({
        name: "Isamara",
        email: "isa@gmail.com",
        password: "1234",
      })
      .expect(200);

    const response = await request(app)
      .post("/authorize")
      .send({
        email: "isa@gmail.com",
        password: "1234",
      })
      .expect(200);

    const { user, token } = response.body;

    expect(token).not.toBeNull();
    expect(user).toHaveProperty("_id");
  });

  it("Authorize Invalid Password", async () => {
    const response = await request(app)
      .post("/authorize")
      .send({
        email: "isa@gmail.com",
        password: "123456",
      })
      .expect(401);

    const { message } = response.body;

    expect(message).toEqual("password inválido");
  });

  it("Authorize Invalid Email", async () => {
    const response = await request(app)
      .post("/authorize")
      .send({
        email: "isa1@gmail.com",
        password: "1234",
      })
      .expect(401);

    const { message } = response.body;

    expect(message).toEqual("email inválido");
  });
});
