
import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID,
      authToken = process.env.TWILIO_TOKEN,
      twilioNumber = process.env.TWILIO_NUMBER,
      twilioMensagerService = process.env.TWILIO_MESSAGER_SERVICE;
export async function sendWhatsApp(message, target) {
      const client = twilio(accountSid, authToken);

      /* const opts = ; */
      client.messages
            .create({
                  from: `whatsapp:${twilioNumber}`,
                  body: message,
                  to: `whatsapp:${target}`,
            })
            .then((message) => logger.info(message.sid));
}
export async function sendSms(mmessage, target) {
      const client = twilio(accountSid, authToken);
      client.messages
            .create({
                  body: message,
                  messagingServiceSid: twilioMensagerService,
                  to: target,
            })
            .then((message) => logger.info(message.sid));
}