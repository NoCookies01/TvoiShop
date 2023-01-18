using System;
using TeleSharp.TL;
using TLSharp.Core;
using TLSharp;
using Telegram.Bot;
using Telegram.Bot.Exceptions;
//using Telegram.Bot.Extensions.Polling;
using T = Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using System.Threading;
using System.Threading.Tasks;
using TelegramClient = TLSharp.Core.TelegramClient;
using WTelegram;
using Telegram.Bot.Polling;
using TL;
using Telegram.Bot.Types;
using System.Diagnostics;

namespace TvoiShop.Telegram.Bot
{
    public class BotManager
    {
        private TelegramBotClient _botClient;
        private Client _client;
        private string _code = "";
        private Task<string> _codeTask;

        static string Config(string what)
        {
            switch (what)
            {
                case "api_id": return "20790770";
                case "api_hash": return "b71211aa7cf9d79bf41d1b8623c668a6";
                case "phone_number": return "+380977903314";
                case "verification_code":
                    var code = "a";
                    return code;
                case "first_name": return "John";      // if sign-up is required
                case "last_name": return "Doe";        // if sign-up is required
                case "password": return "secret!";     // if user has enabled 2FA
                default: return null;                  // let WTelegramClient decide the default config
            }
        }

        async Task<string> DoLogin(string loginInfo, Client client, string code="") // (add this method to your code)
        {
            int verificationCodeCount = 0;
            bool stop = false;
            while (client.User == null && !stop)
            {
                var reason = await client.Login(loginInfo);

                switch (reason) // returns which config is needed to continue login
                {
                    case "verification_code":
                        loginInfo = code;
                        if (verificationCodeCount > 0) return reason;
                        verificationCodeCount++;
                        break; 
                    default: loginInfo = null; break;
                }
            }
            return "";
        }

        public async Task Connect(int apiId, string apiHash)
        {
            

        }

        public async Task<bool> LoginWith(string code = "")
        {
            using var client = new WTelegram.Client(20790770, "b71211aa7cf9d79bf41d1b8623c668a6");
            //var myself = await _client.LoginUserIfNeeded();
            var result = await DoLogin("+380977903314", client, code);

            return result == "" || result == null;
        }
        public async Task SendMessage(string message)
        {
            /*_botClient = new TelegramBotClient("5377841386:AAEs9bs462z4R29IZI73hRej2jPFCmTUeDo");


            var currentUser = await _botClient.GetMeAsync();

            using var cts = new CancellationTokenSource();


            // StartReceiving does not block the caller thread. Receiving is done on the ThreadPool.
            var receiverOptions = new ReceiverOptions
            {
                AllowedUpdates = { } // receive all update types
            };
            _botClient.StartReceiving(
                HandleUpdateAsync,
                HandleErrorAsync,
                receiverOptions,
                cancellationToken: cts.Token);

            var me = await _botClient.GetMeAsync();

            Console.WriteLine($"Start listening for @{me.Username}");

            // Send cancellation request to stop bot
            cts.Cancel();*/
            using var client = new WTelegram.Client(20790770, "b71211aa7cf9d79bf41d1b8623c668a6");
            //var myself = await _client.LoginUserIfNeeded();
            await DoLogin("+380977903314", client);
            var chats = await client.Messages_GetAllDialogs();
            var text2 = message;
            await client.SendMessageAsync(chats.users.Values.First(v => v.username == "demyanzv").ToInputPeer(), text2);
        }

        async Task HandleUpdateAsync(ITelegramBotClient botClient, T.Update update, CancellationToken cancellationToken)
        {
            // Only process Message updates: https://core.telegram.org/bots/api#message
            if (update.Type != UpdateType.Message)
                return;
            // Only process text messages
            if (update.Message!.Type != MessageType.Text)
                return;

            var chatId = update.Message.Chat.Id;
            var messageText = update.Message.Text;
            _code = messageText;

            Console.WriteLine($"Received a '{messageText}' message in chat {chatId}.");

            if (_client.UserId == 0)
            {
                await botClient.SendTextMessageAsync(
                    chatId: chatId,
                    text: "I shlould be logged",
                    cancellationToken: cancellationToken);
                return;
            }

            await botClient.SendTextMessageAsync(
                chatId: chatId,
                text: "I am logged",
                cancellationToken: cancellationToken);
        }

        Task HandleErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
        {
            var ErrorMessage = exception switch
            {
                ApiRequestException apiRequestException
                    => $"Telegram API Error:\n[{apiRequestException.ErrorCode}]\n{apiRequestException.Message}",
                _ => exception.ToString()
            };

            Console.WriteLine(ErrorMessage);
            return Task.CompletedTask;
        }
    }
}