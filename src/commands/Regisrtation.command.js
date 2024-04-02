const ChatHandle = require("../core/chats/chat-handle");
const SessionRegistration = require("../session/session.registration");
const Command = require("./command.class");

class RegisrtationCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    // this.bot.onText(/\/form/, (msg) => {
    this.bot.onText(/\/registration/, (msg) => {
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      let isCheckUserName = this.checkUserName(chatId, chatUsername);
      // проверка заполнено ли имя
      if (!isCheckUserName) {
        return;
      }

      new ChatHandle(this.bot).logoutChat(chatId);

      let {step, message, option} = new SessionRegistration(msg, this.bot).createSession();
      this.requestMessage(chatId, message, option);      
      return;
    });
  }
}

module.exports = RegisrtationCommand;
