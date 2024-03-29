
const ChatHandle = require("../core/chats/chat-handle");
//const optionButtonChats = require("../utils/option/option_button_chats");
const Command = require("./command.class");

class LogOutChatsCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.onText(/\/logoutchat/, async (msg) => {
      try {
        const chatId = msg.chat.id;
        const chatUsername = msg.chat.username;
        let isCheckUserName = this.checkUserName(chatId, chatUsername);
        // проверка заполнено ли имя
        if (!isCheckUserName) {
          return;
        }

        const logout = await new ChatHandle(this.bot).logoutChat(chatId);

        const {status, message } = logout;

        this.requestMessage(chatId, message, {});
        return;
      } catch (e) {
        console.error(e);
      }
    });
  }
}

module.exports = LogOutChatsCommand;