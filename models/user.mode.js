import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const userModel = sequelize.define("user", {
  userName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

userModel
  .sync({ alter: false })
  .then(() => console.log(`User model successfully created!`))
  .catch((err) =>
    console.log(`Error while syncing user model: ${err.message}`)
  );
