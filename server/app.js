// THIRD PARTY PACKAGE
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// API ROUTE
const clientRoute = require("./routes/clientRoutes");
const providerRoute = require("./routes/providerRoutes");

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const API_PORT = process.env.NODE_PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clients Manager API",
      version: "1.0.0",
      description:
        "A simple express library API for manage clients and providers for clients",
    },
    servers: [
      {
        url: `http://localhost:${API_PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// EXPRESS APP
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// GLOBAL MIDDLEWARE
app.use(cors());
if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));
app.use(express.json());

// Redirect the home to clients routes
app.get("/", (req, res) => res.redirect("/api/v1/clients"));
app.use("/api/v1/clients", clientRoute);
app.use("/api/v1/providers", providerRoute);

// Handle error for all unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// Express application
module.exports = app;
