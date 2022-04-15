const TelegramApi = require('node-telegram-bot-api')

const token = '5346630091:AAHkv7LR8aepwE5RKlUCCh0J13P5CzsFrks'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Play again', callback_data: '/again'}]
        ]
    })
}

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
            return bot.sendMessage(chatId, 'Guess', gameOptions);
        }
        return bot.sendMessage(chatId, 'I dont understand you')

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        if (data === chats[chatId]) {
          return bot.sendMessage(chatId, `Congratulation!!!It's ${chats[chatId]}`, againOptions)
        } else {
          return bot.sendMessage(chatId, `You lose :(, it was ${chats[chatId]}`, againOptions)
        }
    })

}

start()