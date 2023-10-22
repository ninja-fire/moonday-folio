import { object, string, array } from 'yup';
import TelegramBot from 'node-telegram-bot-api';
import assert from 'assert';

const token = process.env.TG_TOKEN;
const chatId = process.env.TG_CHAT_ID;
assert(token, 'token is missing');
assert(chatId, 'chatId is missing');
const bot = new TelegramBot(token, {polling: false});
const contactSchema = object({
    name: string().optional().min(3).max(256),
    text: string().optional().min(3).max(1024),
    email: string().email().required().min(3).max(256),
    needs: array().of(string().min(3).max(128)).required()
});


export default async (req, context) => {
    if (req.method !== 'POST') {
        return Response.json({
            error: 'Invalid request method'
        }, {
            status: 400,
        });
    }
    if (req.headers.get('Content-type') !== 'application/json') {
        return Response.json({
            error: 'Invalid request type'
        }, {
            status: 400,
        });
    }
    const contactData = await req.json();
    console.info('contactData', contactData);
    let parsedContactData
    let parseContactErrors = []
    try {
        parsedContactData = await contactSchema.validate(
            contactData,
            { strict: true },
        );

        console.log(parsedContactData);
    } catch (error) {
        parseContactErrors = error.errors
    }

    if (parseContactErrors.length > 0) {
        return Response.json({
            errors: parseContactErrors
        });
    }

    try {
        const response = await bot.sendMessage(chatId, JSON.stringify(parsedContactData, null, 2));
        console.log('response', response);
        assert(response.message_id, 'invalid tg response')

    } catch (error) {
        console.error('error telegram send message', error);
        return Response.json({
            status: 'internal server error'
        }, {
            status: 500,
        });
    }

    return Response.json({
        status: 'Success'
    });
};
