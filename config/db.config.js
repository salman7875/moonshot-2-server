import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const checkDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`DB Connected Successfully!`);
  } catch (err) {
    console.log(`Error while connecting DB: ${err.message}`);
  }
};
