import app from "../src/app";
const request = require("supertest"); // needs to be CommonJS import, for whatever reason

describe("/posts - endpoint for creating and reading posts", () => {
    let access_token: string = ""
    const invalid_access_token = "alidnaslidnalii.nvalid.token"
    it("POST /user/login API Request - getting fresh access token for further tests", async () => {
  
      const userInfo = {
        "email": "example@mail.com",
        "password": "testpass"
      }
  
      const result = await request(app).post("/user/login")
                            .send(userInfo).set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((response: any) => access_token = response.body.access_token)
    })
    it("POST /posts/create API Request - creating a post with invalid access token", async () => {
  
      const body = {
        "access_token": invalid_access_token,
        "post": "lorem ipsum..."
      }
  
      const result = await request(app).post("/posts/create")
                            .send(body).set('Accept', 'application/json')
                            .expect(401)
    })
    it("POST /posts/create API Request - creating a post with valid token but no post field", async () => {
  
      const body = {
        "access_token": access_token,
      }
  
      const result = await request(app).post("/posts/create")
                            .send(body).set('Accept', 'application/json')
                            .expect(500)
    })
  
  })