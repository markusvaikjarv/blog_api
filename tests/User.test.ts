import app from "../src/app";
const request = require("supertest"); // needs to be CommonJS import, for whatever reason

describe("/user - endpoint for register and login", () => {

  it("GET /user API Request", async () => {
    
    const result = await request(app).get("/user");
    expect(result.text).toEqual("/register to register or /login to log in");
    expect(result.statusCode).toEqual(200);
    
  })

  it("POST /user/register API Request - empty body", async () => {

    const result = await request(app).post("/user/register");
    expect(result.statusCode).toEqual(500);

  })

  it("POST /user/register API Request - already existing user", async () => {

    const userInfo = {
      "email": "example@mail.com",
      "name": "testuser",
      "password": "testpass"
    }  

    const result = await request(app).post("/user/register")
                          .send(userInfo)
                          .set('Accept', 'application/json')
                          .expect(500)

  })
  it("POST /user/login API Request - log in with right credentials", async () => {

    const userInfo = {
      "email": "example@mail.com",
      "password": "testpass"
    }
    const result = await request(app).post("/user/login")
                          .send(userInfo).set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(200)

    
  })
  it("POST /user/login API Request - log in with wrong password", async () => {

    const userInfo = {
      "email": "example@mail.com",
      "password": "wrongpass"
    }
    const result = await request(app).post("/user/login")
                          .send(userInfo).set('Accept', 'application/json')
                          .expect(401)

    
  })
  it("POST /user/login API Request - try to log in with wrong email", async () => {

    const userInfo = {
      "email": "example@wrongmail.com",
      "password": "wrongpass"
    }

    const result = await request(app).post("/user/login")
                          .send(userInfo).set('Accept', 'application/json')
                          .expect(404)
  })
})