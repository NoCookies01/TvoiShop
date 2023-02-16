using System;
using Telegram.Bot;
using Telegram.Bot.Exceptions;
//using Telegram.Bot.Extensions.Polling;
using T = Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using System.Threading;
using System.Threading.Tasks;
using WTelegram;
using Telegram.Bot.Polling;
using TL;
using Telegram.Bot.Types;
using System.Diagnostics;

namespace TvoiShop.Telegram.Bot
{
    public class BotManager
    {
        async Task<string> DoLogin(string? loginInfo, Client client, string code="") // (add this method to your code)
        {
            int verificationCodeCount = 0;
            bool stop = false;
            while (client.User == null && !stop)
            {
                var reason = await client.Login(loginInfo);

                switch (reason) // returns which config is needed to continue login
                {
                    case "email":
                    case "email_verification_code":
                    case "password":
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
    }
}