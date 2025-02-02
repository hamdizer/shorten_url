import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import mongoose from "mongoose";
import urlRoutes from "./routes/url.routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sample API",
      version: "1.0.0",
      description: "API Documentation for a Shoten URL Express App",
    },
  },
  apis: ["./src/controllers/*.ts"],
};
app.use(
  cors({
    origin: ["http://localhost:3000", "https://shorten-url-front.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
/**
 * @swagger
 * /hello:
 *   get:
 *     description: Shorten URL
 *     responses:
 *       200:
 *         description: Success
 */
app.use("/api", urlRoutes);
app.use(bodyParser.json());

mongoose
  .connect(
    `${process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener"}`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Error connecting to MongoDB:", err));

app.listen(5000, () =>
  console.log(
    `Server running on ${process.env.BASE_URL || "http://localhost:5000"}`
  )
);
