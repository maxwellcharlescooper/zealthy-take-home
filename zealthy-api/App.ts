import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import configRoutes from "./routes/config.routes";

dotenv.config();

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/admin/config", configRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
