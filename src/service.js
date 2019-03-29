const TelegramBot = require('node-telegram-bot-api')
const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

const bot = new TelegramBot(config.telegram.token, { polling: true })
bot.on('error', err => {
  console.error(err)
  process.exit(1)
})

bot.on('message', msg => {
  console.log('>>> telegram')
  console.log(msg)
})

router.post('/keel/deployment', async ctx => {
  console.log('>>>', ctx.url)
  console.log(ctx.request.body)

  const { message } = ctx.request.body

  await bot.sendMessage(config.telegram.defaultChannel, message, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  })
  ctx.body = { success: true }
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.http.port)
