import emailjs from '@emailjs/browser'

export const EnviarCorreo = async (email, codigo) => {
  const ServerID = 'SidgotechServerid'
  const TemplateID = 'template_u0b244e'
  const PublicKey = 'iSr7Pd9VXatQCXVJZ'
  const UserID = 'iSr7Pd9VXatQCXVJZ' // Reemplaza con tu User ID de EmailJS

  emailjs.init(PublicKey)

  try {
    const params = {
      name: 'angel', // en futuro poner nombre del usuario logeado
      Email: email, // Reemplaza con el nombre del destinatario si es necesario
      from_name: 'SIDGOTECH', // Reemplaza con tu nombre o nombre de la empresa
      recipient: email,
      message: codigo
    }

    const response = await emailjs.send(ServerID, TemplateID, params, UserID)

    if (response.text === 'OK') {
      const notify = SuccessNotifications(
        'El correo fue enviado correctamente a ' + email
      )
      notify()
    } else {
      const notify = ErrorNotifications(
        'Error al enviar el correo: ',
        response.text
      )
      notify()
    }
  } catch (error) {
    const notify = ErrorNotifications('Error al enviar el correo: ', error)
    notify()
  }
}