import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import urlRoutes from "../../routes/url.routes";
import URL from "../../models/url.model";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", urlRoutes);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://shorten-url-front.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
describe("URL Shortening Service E2E Tests", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    await mongoose.connect(
      `${process.env.MONGO_URI}` || "mongodb://localhost:27017/url-shortener"
    );
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("should shorten a URL and return the shortened URL", async () => {
    const response = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "https://example.com" });

    expect(response.status).toBe(200);
    //   expect(response.body.shortenedUrl).toBe('http://localhost:5000/abc1234');
  });

  it("should return 400 for invalid URL", async () => {
    const response = await request(app)
      .post("/api/shorten")
      .send({ shortCode: "invalid-url" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Shortened URL not found");
  });

  it("should redirect to the original URL when shortened ID is accessed", async () => {
    const urlResponse = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "https://example.com" });

    const shortenedId = urlResponse.body.shortenedUrl.split("/").pop();

    const redirectResponse = await request(app)
      .get(`/api/${shortenedId}`)
      .expect(302); // Expect a redirect (302 status)
    expect(redirectResponse.header.location).toBe("https://example.com");
  });

  it("should return 404 for non-existent shortened ID", async () => {
    const response = await request(app).get("/api/nonexistent-id").expect(404);

    expect(response.body.message).toBe("Shortened URL not found");
  });
});
