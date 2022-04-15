const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5346630091:AAHkv7LR8aepwE5RKlUCCh0J13P5CzsFrks'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const playAgain = async (chatId) => {
    await bot.sendMessage(chatId, 'Now I say you number from 0 to 9. You need guess it')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Guess', gameOptions);
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
          return playAgain(chatId)
        }
        return bot.sendMessage(chatId, 'I dont understand you')

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        if (data === '/again') {
            return playAgain(chatId)
        }
        else if (data === chats[chatId]) {
          return bot.sendMessage(chatId, `Congratulation!!!It's ${chats[chatId]}`, againOptions)
        } else {
          return bot.sendMessage(chatId, `You lose :(, it was ${chats[chatId]}`, againOptions)
        }
    })

}

start()