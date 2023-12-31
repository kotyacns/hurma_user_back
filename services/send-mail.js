import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

export default async ({
  subject,
  to = [],
  attachments = [],
  templateId,
  templateProps = {},
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      tls: true,
      debug: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          layoutsDir: 'templates/',
          defaultLayout: false,
          partialsDir: 'templates/',
        },
        viewPath: 'templates/',
        extName: '.hbs',
      })
    )

    const recipients = to.join(', ')

    const result = await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipients,
      subject,
      template: templateId,
      context: templateProps,
      attachments,
    })

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}
