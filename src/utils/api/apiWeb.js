//@ts-check

const GOOGLE_SHEETS_KEY_USERS = process.env.GOOGLE_SHEETS_KEY_USERS;
const GOOGLE_SHEETS_KEY_ORDERS = process.env.GOOGLE_SHEETS_KEY_ORDERS;
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
// const BOT_API_TOKEN = process.env.BOT_API_TOKEN;

// const BOT_API_URL = process.env.BOT_API_URL;
const fetch = require("node-fetch");

class ApiWeb {
  constructor(bot) {
    this.bot = bot;
  }

  requestMessageOnApi(chatId, message, option = {}) {
    setTimeout(async () => {
      await this.bot.sendMessage(chatId, message, option);
    }, 1000);
  }

  requestError(message) {
    console.error("Ошибка:", message);
    if (!TELEGRAMM_ADMIN_CHAT) {
      return;
    }
    this.requestMessageOnApi(TELEGRAMM_ADMIN_CHAT, message, {});
  }

  async postData(postData, url) {
    try {
      const { tlgId } = postData;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "1837857hgh232d37f49268c4c0fa062b3",
        },
        body: JSON.stringify(postData),
      });

      let { status } = response;

      console.log(status);

      if (status != 200) {
        console.error("Ошибка сервера", status);
        this.requestMessageOnApi(tlgId, `Ошибка сервера ${status}`, {});
        this.requestError(status);
      }
    } catch (error) {
      this.requestError(JSON.stringify(postData));
    }
  }

  // стартовая
  async botCommandStart(tlgId) {
    let url = "http://devbot.e-feedback.ru/api/bot/command/start";
    const post = { tlgId: tlgId };
    this.postData(post, url);
  }

  // начать оформлять заявку
  async botCommandOrder(tlgId) {
    let url = "http://devbot.e-feedback.ru/api/bot/command/order";
    const post = { tlgId: tlgId };
    this.postData(post, url);
  }

  // очистить оформление заявка и сбросить чаты
  async botCommandClear(tlgId) {
    let url = "http://devbot.e-feedback.ru/api/bot/command/clear";
    const post = { tlgId: tlgId };
    this.postData(post, url);
  }

  // последние 4 заказа получить кнопки
  async botCommandChats(tlgId) {
    let url = "http://devbot.e-feedback.ru/api/bot/command/chats";
    const post = { tlgId: tlgId };
    this.postData(post, url);
  }

  // войти в чат по номеру заказа
  async botButtonsChat(tlgId, numberOrder) {
    let url = "http://devbot.e-feedback.ru/api/bot/buttons/chat";
    const post = { tlgId: tlgId, numberOrder: numberOrder };
    this.postData(post, url);
  }

  // отправить вариант для заказа
  async botButtonsOrderVariant(tlgId, orderVariant) {
    let url = "http://devbot.e-feedback.ru/api/bot/buttons/order/variant";
    const post = { tlgId: tlgId, orderVariant: orderVariant };
    this.postData(post, url);
  }

  // уточнить быстрый статус
  async botButtonsOrderStatus(tlgId, numberOrder) {
    let url = "http://devbot.e-feedback.ru/api/bot/buttons/order/status";
    const post = { tlgId: tlgId, numberOrder: numberOrder };
    this.postData(post, url);
  }

  // запросить другой вопрос по заказу
  async botButtonsOrderNumber(tlgId, numberOrder) {
    let url = "http://devbot.e-feedback.ru/api/bot/buttons/order/number";
    const post = { tlgId: tlgId, numberOrder: numberOrder };
    this.postData(post, url);
  }

  // любое сообщение
  async botMessage(tlgId, message, deleMessage, messageId) {
    let url = "http://devbot.e-feedback.ru/api/bot/message";
    const post = { tlgId: tlgId, message: message, deleMessage: deleMessage, messageId: messageId};
    this.postData(post, url);
  }

  // согласование сообщений
  async botButtonsApprove(tlgId, messageId, statusApprove ) {
    let url = "http://devbot.e-feedback.ru/api/bot/buttons/approve";
    const post = { tlgId: tlgId, messageId: messageId, statusApprove: statusApprove };
    this.postData(post, url);
  }
  // быстрая заявка, с авто заполнением некоторых шагов
     
     async botButtonsOrderFast(tlgId, pendingId) {
      let url = "http://devbot.e-feedback.ru/api/bot/buttons/order/fast";
      const post = { tlgId: tlgId, pendingId: pendingId };
      this.postData(post, url);
}
}
module.exports = ApiWeb;