import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const masterModel = sequelize.define("master", {
  day: { type: DataTypes.DATE },
  age: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  A: { type: DataTypes.INTEGER },
  B: { type: DataTypes.INTEGER },
  C: { type: DataTypes.INTEGER },
  D: { type: DataTypes.INTEGER },
  E: { type: DataTypes.INTEGER },
  F: { type: DataTypes.INTEGER },
});

masterModel
  .sync({ alter: false })
  .then(() => console.log(`Master model created!`))
  .catch((err) =>
    console.log(`Error while creating master model: ${err.message}`)
  );
