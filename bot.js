const Discord = require("discord.js");
const bot = new Discord.Client()
const request = require('request');
const channelid = "";
const refresh = 10;
const maxPlayers = '64';
const wyspaName = 'Wyspa 1';
const token = "";
const wyspaIp = "";
const wyspaOff = "Wyspa OFF"

bot.on('ready', async () => {
    console.log("Zalogowano");
    setInterval(async () => {
        const channel = bot.channels.find('id', channelid);
        if (channel) {
            await request(`http://${wyspaIp}/info.json`, async (error) => {
                if (error) {
                    channel.setName(wyspaOff);
                    bot.user.setActivity(wyspaOff, {
                        type: 'WATCHING',
                    });
                } else {
                    await request(`http://${wyspaIp}/players.json`, async (error, response, playerss) => {
                        let players = JSON.parse(playerss);
                        channel.setName(`${wyspaName}: ${players.length}-${maxPlayers}`);
                        bot.user.setActivity(`${players.length}/${maxPlayers} graczy`, {
                            type: 'PLAYING',
                        });
                    });
                }
            });
        } else {
            console.log(`Nie znaleziono kanału ${channelid}`);
        }
    }, refresh * 1000);
});

bot.login(token);
