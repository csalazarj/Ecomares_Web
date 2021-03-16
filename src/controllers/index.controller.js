const indexCtrl = {};
const nodemailer = require("nodemailer");
const Category = require("../models/Category");
// const transporter = require("../config/mailer");

indexCtrl.renderIndex = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("index", { categories });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.renderBlog = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("blog", { categories });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.renderContact = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("contact", { categories });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.sendEmail = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;
    contentHTML = `<h2>Información de usuario</h2>
                  <ul>
                    <li>Nombre: ${firstname} ${lastname}</li>
                    <li>correo: ${email}</li>
                    <li>célular: ${phone}</li>
                  </ul>
                  <p>Mensaje: ${message}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSW,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: '"EcomaresServer" <csalazarj@unal.edu.co>', // sender address
      to: "csalazar.red@gmail.com", // list of receivers
      subject: "Contacto por página web", // Subject line
      html: contentHTML,
    });
    console.log("Message sent", info.messageId);
    res.send("received");
  } catch (error) {
    emailStatus = error;
    // return res.status(400).json({ message: "Algo ha fallado!" });
    res.send(error.message);
  }
};

module.exports = indexCtrl;
