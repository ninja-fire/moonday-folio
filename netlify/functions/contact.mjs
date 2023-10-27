import { object, string, array } from 'yup';
import TelegramBot from 'node-telegram-bot-api';
import assert from 'assert';

const token = process.env.TG_TOKEN;
const chatId = process.env.TG_CHAT_ID;
const needs = {
    branding: '👁️',
    print: '🖼️',
    social: '🌟',
    app: '🖥️',
    website: '💎',
    metaverse: '👽',
    consulting: '🛠️',
}
assert(token, 'token is missing');
assert(chatId, 'chatId is missing');
const bot = new TelegramBot(token, {polling: false});
const contactSchema = object({
    name: string().optional().min(3).max(256),
    text: string().optional().min(3).max(8000),
    email: string().email().required().min(3).max(256),
    needs: array().of(string().oneOf(Object.keys(needs))).required()
});
    


function capitalizeFLetter(text) {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
}


export default async (req, context) => {
    if (req.method !== 'POST') {
        return Response.json({
            status: 'Error',
            error: 'Invalid request method'
        }, {
            status: 400,
        });
    }
    if (req.headers.get('Content-type') !== 'application/json') {
        return Response.json({
            status: 'Error',
            error: 'Invalid request type'
        }, {
            status: 400,
        });
    }
    const contactData = await req.json();
    // console.info('contactData', contactData);
    let parsedContactData
    let parseContactErrors = []
    try {
        parsedContactData = await contactSchema.validate(
            contactData,
            { strict: true },
        );

        // console.log('parsedContactData', parsedContactData);
    } catch (error) {
        parseContactErrors = error.errors
    }

    if (parseContactErrors.length > 0) {
        return Response.json({
            status: 'Error',
            errors: parseContactErrors
        });
    }

    try {
        let message = `✨ Nouveau client ✨\n\nEmail: ${parsedContactData.email}`;

        if (parsedContactData.name) {
            message += `\nName: ${parsedContactData.name}`;
        }

        if (parsedContactData.text) {
            message += `\nText: ${parsedContactData.text}`;
        }

        if (parsedContactData.needs.length > 0) {
            message += `\nNeeds: ${parsedContactData.needs.reduce((acc, need, i) => {
                return `\n   ${needs[need]} ${capitalizeFLetter(need)}${acc}`;
            }, ``)}`;
        }

        console.log('message', message);

        const response = await bot.sendMessage(chatId, message, {
            disable_web_page_preview: true,
            // parse_mode: 'MarkdownV2',
        });
        // console.log('response', response);
        assert(response.message_id, 'invalid tg response')

    } catch (error) {
        console.error('error telegram send message', error);
        return Response.json({
            status: 'Internal server error'
        }, {
            status: 500,
        });
    }

    return Response.json({
        status: 'Success'
    });
};
