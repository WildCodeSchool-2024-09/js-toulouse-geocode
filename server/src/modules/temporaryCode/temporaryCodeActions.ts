import type { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { uid } from "uid";
import temporaryCodeRepository from "./temporaryCodeRepository";

const sendMail = async (code: string, email: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_SECRET_KEY,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mot de passe oublié Geocode",
    text: `Bonjour, voici votre code : ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const temporaryCodes = await temporaryCodeRepository.read(
      Number.parseInt(id),
    );
    res.status(201).json(temporaryCodes);
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await temporaryCodeRepository.delete(Number.parseInt(id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const code = uid(8);
    if (!email) {
      res.sendStatus(400);
    }
    sendMail(code, email);
    await temporaryCodeRepository.create(code, Number.parseInt(id));
    setTimeout(async () => {
      await temporaryCodeRepository.delete(Number.parseInt(id));
    }, 1000 * 10);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export default {
  add,
  read,
  destroy,
};
