import { Op } from "sequelize";
import { masterModel } from "../models/master.model.js";
import { formateDate } from "../utils/utilis.js";
import XLSX from "xlsx";

export const uploadFile = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      raw: false,
    });

    const formatDateToISO = (dateStr) => {
      if (!dateStr || typeof dateStr !== "string") return null;
      const [day, month, year] = dateStr.split("/");
      return new Date(`${year}-${month}-${day}`).toISOString();
    };

    const transformed = data.map((d) => ({
      ...d,
      day: formatDateToISO(d.Day),
      age: d.Age,
      gender: d.Gender,
    }));

    await masterModel.bulkCreate(transformed);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCharts = async (req, res) => {
  try {
    const { age, gender, startDate, endDate } = req.query;

    let query = { where: {} };

    if (age) {
      query.where.age = age;
    }
    if (gender) {
      query.where.gender = gender;
    }
    if (startDate && endDate) {
      const formatStartDate = formateDate(startDate);
      const formatEndDate = formateDate(endDate);

      query.where.day = {
        [Op.between]: [formatStartDate, formatEndDate],
      };
    }

    const data = await masterModel.findAll(query);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
