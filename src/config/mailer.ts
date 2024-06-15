import nodemailer from "nodemailer";
import { config } from "./config";

const enviroment = config[process.env.NODE_ENV || "desarrollo"];
const { host, port, email, password } = enviroment.email;

export const transporter = nodemailer.createTransport({
  //   host: "smtp-mail.outlook.com",
  port,
  secure: false,
  service: "hotmail",
  auth: {
    user: email,
    pass: password,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("puede enviar correo electrónico");
  })
  .catch((error) => {
    console.log("Error al enviar correos", error);
  });
