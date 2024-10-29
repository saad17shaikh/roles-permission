import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();

// Middleware to parse incoming JSON requests
// This allows the server to accept and work with JSON data in requests (req.body)
app.use(express.json());

// Middleware to parse URL-encoded data (like form submissions)
// `extended: true` allows for rich objects and arrays to be encoded into the URL-encoded format.
// The `limit: "16kb"` limits the size of the request body to 16 kilobytes, preventing large payloads.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from the "public" directory
// This allows the server to serve files like HTML, CSS, images, or JavaScript
app.use(express.static("public"));

// Middleware to enable Cross-Origin Resource Sharing (CORS)
// `credentials: true` allows cookies to be sent and accepted from the client.
// `origin` specifies which domains are allowed to access the API. By default, it's `process.env.CORS_ORIGIN` or `*` (all domains).
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "*",
  })
);

// Middleware to parse cookies from the incoming requests
// This allows the server to read cookies sent by the client in the request headers
app.use(cookieParser());

// IMPORT  ROUTES
import superAdminRoute from "../routes/superadmin.routes";
import userRoute from "../routes/user.routes"
app.use("/api/superadmin", superAdminRoute);
app.use("/api/user", userRoute);
