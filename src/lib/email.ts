import { createTransport } from "nodemailer";
import type { Options } from "nodemailer/lib/mailer";
import { env } from "~/env";

export const sendEmail = (options: Omit<Options, "from">) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: env.NODEMAILER_USER,
      pass: env.NODEMAILER_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      ...options,
      from: env.NODEMAILER_USER,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    },
  );

  transporter.close();
};
