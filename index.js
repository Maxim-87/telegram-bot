const TelegramApi = require('node-telegram-bot-api')

const token = '5346630091:AAHkv7LR8aepwE5RKlUCCh0J13P5CzsFrks'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const start = () => {

    bot.setMyCommands([
    {command: '/start', description: 'Greeting message'},
    {command: '/info', description: 'Get information about commands'},
    {command: '/play', description: 'lets play'},
])

    bot.on('message', async msg => {

        const text = msg.text
        const chatId = msg.chat.id
        console.log(msg)

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/192/1.webp')
            return bot.sendMessage(chatId, `Hello let's introduce`)
        } else if (text === 'как дела?') {
            return bot.sendMessage(chatId, 'Not bad. And you?')
        } else if (text === '/play') {
            await bot.sendMessage(chatId, 'Now I say you number from 0 to 9. You need guess it')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Guess');
        }
        return bot.sendMessage(chatId, 'I dont understand you')

    })
}

start()