import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID,
      authToken = process.env.TWILIO_TOKEN,
      twilioNumber = process.env.TWILIO_NUMBER,
      twilioMensagerService = process.env.TWILIO_MESSAGER_SERVICE;
export async function sendWhatsapp(mensaje, target) {
      const client = twilio(accountSid, authToken);

      client.messages
            .create({
                  from: `whatsapp:${twilioNumber}`,
                  body: mensaje,
                  to: `whatsapp:${target}`,
            })
            .then((message) => logger.info(message.sid));
}
export async function sendSms(mensaje, target) {
      const client = twilio(accountSid, authToken);
      client.messages
            .create({
                  body: mensaje,
                  messagingServiceSid: twilioMensagerService,
                  to: target,
            })
            .then((message) => logger.info(message.sid));
}