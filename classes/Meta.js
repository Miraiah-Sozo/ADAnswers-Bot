/* eslint-disable no-console */
"use strict";

const { MessageActionRow, MessageButton } = require("discord.js");
const config = require("../utils/config.json");
const commands = require("../utils/commands");
const { footerMessages } = require("../utils/messages");
const { Time } = require("./FunctionClasses/Time");
const { Log } = require("./FunctionClasses/Log");
const Global = require("../utils/constants");

const NOW = new Date();
const metaMessageObject = {
  "lastrestart": `The last restart was on <t:${Date.parse(NOW) / 1000}>.`,
  "suggest": `Submit an issue on [GitHub](https://github.com/earthernsence/ADAnswers-Bot/issues) to suggest more commands, or to report a bug with the bot!`,
  "invite": `If, for whatever reason, you wish to invite me to your server, go to [this link](https://discord.com/oauth2/authorize?client_id=830197123378053172&permissions=2147560512&scope=applications.commands%20bot).`,
  // eslint-disable-next-line max-len
  "contributing": `If you are interested in contributing to the bot, check out both information files at [this readme](https://github.com/earthernsence/ADAnswers-Bot#readme) and [this readme](https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme)`,
  // eslint-disable-next-line max-len
  "alldata": `If you want to see all data for the bot, go to [SQLite Viewer](https://inloop.github.io/sqlite-viewer/) and put in [this file](https://github.com/earthernsence/ADAnswers-Bot/blob/main/database.sqlite) for command usage data or [this file](https://github.com/earthernsence/ADAnswers-Bot/blob/main/timeTags.sqlite) for data on when commands are used (${Time.timezone}) from the bot's repository.`
};

class Meta {
  constructor(info) {
    this.page = info.page;
    this.message = info.message;
    this.id = info.id;
    this.person = `${this.message.user.username}#${this.message.user.discriminator}`;
    this.expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
  }

  rows(disabled, person) {
    return [
      new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("primary-previous-page")
            .setEmoji("◀️")
            .setDisabled(disabled)
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("primary-next-page")
            .setEmoji("▶️")
            .setDisabled(disabled)
            .setStyle("PRIMARY"),
        ),
      new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setLabel("See all commands")
            .setURL("https://earthernsence.github.io/ADAnswers-Bot/docs/"),
          new MessageButton()
            .setStyle("LINK")
            .setLabel("GitHub repository")
            .setURL("https://github.com/earthernsence/ADAnswers-Bot"),
          new MessageButton()
            .setStyle("SECONDARY")
            .setDisabled(true)
            .setLabel(disabled ? `Time expired` : `Requested by ${person}.`)
            .setCustomId("secondary-info-button")
        )
    ];
  }

  getStatus(ping) {
    if (ping >= 200) return `Very high ping! ${ping}ms`;
    if (ping >= 175) return `High ping! ${ping}ms`;
    if (ping >= 150) return `Relatively high ping! ${ping}ms`;
    if (ping >= 125) return `Slightly above average ping! ${ping}ms`;
    if (ping >= 100) return `Average ping! ${ping}ms`;
    if (ping >= 75) return `Below average ping! ${ping}ms`;
    if (ping >= 50) return `Very good ping! ${ping}ms`;
    return `Incredible ping! ${ping}ms`;
  }

  async tagStuff() {
    const timeData = await this.manageBottomAndTopCommands("TimeTags", "hour", true);
    const usageData = await this.manageBottomAndTopCommands("Tags", "name", true);
    const userData = await this.manageBottomAndTopCommands("UserTags", "name", false);
    return {
      top5commands: usageData.top5commands,
      bottom5commands: usageData.bottom5commands,
      top5hours: timeData.top5commands,
      bottom5hours: timeData.bottom5commands,
      requests: usageData.requests,
      successes: usageData.successes,
      top5users: userData.top5commands,
      bottom5users: userData.bottom5commands
    };
  }

  async fieldsArray() {
    const tagStuff = await this.tagStuff();
    return [
      [
        { name: "Bot version", value: config.version, inline: true },
        { name: "Last restart", value: metaMessageObject.lastrestart, inline: true },
        // eslint-disable-next-line max-len
        { name: "Uptime", value: `The bot has been up for ${Time.dhmsFromMS(this.message.client.uptime).clock}, (${Time.decimalTime(true, Time.newDate(), this.message.client.uptime)} 10h time)`, inline: true },
        { name: "Status", value: `Pong! ${this.getStatus(this.message.client.ws.ping)}`, inline: true },
        { name: "Suggest", value: metaMessageObject.suggest, inline: true },
        { name: "Invite", value: metaMessageObject.invite, inline: true },
        { name: "Contributing", value: metaMessageObject.contributing, inline: true },
        { name: "Time", value: Time.getTime(), inline: true }
      ],
      [
        { name: "Total amount of commands", value: `${commands.all.length}`, inline: true },
        { name: "Total requests/successses", value: `Requests: ${tagStuff.requests}\nSuccesses: ${tagStuff.successes}`, inline: true },
        { name: "Top 5 used commands", value: `${tagStuff.top5commands}`, inline: true },
        { name: "Bottom 5 used commands", value: `${tagStuff.bottom5commands}`, inline: true },
        { name: "All data", value: metaMessageObject.alldata, inline: true },
        { name: `Top 5 active hours (${Time.timezone})`, value: `${tagStuff.top5hours}`, inline: true },
        { name: `Bottom 5 active hours (${Time.timezone})`, value: `${tagStuff.bottom5hours}`, inline: true },
        { name: "Top 5 users", value: `${tagStuff.top5users}`, inline: true },
        { name: "Bottom 5 users", value: `${tagStuff.bottom5users}`, inline: true },
      ]
    ];
  }

  async manageBottomAndTopCommands(database, secondAttribute, shift) {
    const tagsMatchedWithTimesUsed = {};
    const tagList = await Global[database].findAll({ attributes: ["timesUsed", secondAttribute] });
    tagList.map(t => Object.assign(tagsMatchedWithTimesUsed, { [t[secondAttribute]]: t.timesUsed }));
    const sorted = Object.values(tagsMatchedWithTimesUsed).sort((a, b) => b - a);
    const requests = sorted[0];
    const successes = sorted[1];
    if (shift) sorted.shift();
    if (shift) sorted.shift();
    let top5commands = [];
    let bottom5commands = [];
    for (let i = 0; i < 5; i++) {
      const b = Object.entries(tagsMatchedWithTimesUsed).find(a => a[1] === sorted[0]);
      top5commands.push(b);
      delete tagsMatchedWithTimesUsed[b[0]];
      sorted.shift();
    }
    for (let i = 0; i < 5; i++) {
      const b = Object.entries(tagsMatchedWithTimesUsed).find(a => a[1] === sorted[sorted.length - 1]);
      bottom5commands.push(b);
      delete tagsMatchedWithTimesUsed[b[0]];
      sorted.pop();
    }
    bottom5commands = bottom5commands.map(a => `${a[0]}: ${a[1]}`).reverse().join("\n");
    top5commands = top5commands.map(a => `${a[0]}: ${a[1]}`).join("\n");
    return {
      requests,
      successes,
      bottom5commands,
      top5commands,
    };
  }

  getHelpDescription(disabled) {
    return `Information about the bot.\nExpire${disabled ? "d" : "s"} <t:${this.expirationTimestamp}:R> at <t:${this.expirationTimestamp}:T>`;
  }

  getFooter() {
    return `This superfluous bot was created by @earth#1337.\n${footerMessages.next(false)}`;
  }

  async embedObject(disabled) {
    const f = await this.fieldsArray();
    if (this.page < f.length + 1 || this.page === 69) {
      const hex = this.page === 69 ? "696969" : Math.round(this.page / f.length * 255).toString(16).repeat(3);
      return {
        color: `#${hex}`,
        title: `Meta (p${this.page}/${f.length})`,
        description: this.getHelpDescription(disabled),
        fields: f[this.page - 1],
        timestamp: new Date(),
        footer: {
          text: this.getFooter()
        }
      };
    }
    return {
      color: `#11aa22`,
      title: `Something is terribly wrong`,
      description: `Something has gone terribly wrong. This meta page does not exist.`
    };
  }

  pageChange(page) {
    let p = page;
    if (p === 1) p = 2;
    else if (p === 2) p = 1;
    return p;
  }

  async actualMessage(disabled, person) {
    return { embeds: [await this.embedObject(disabled)], components: this.rows(disabled, person), ephemeral: false };
  }

  async send() {
    const filter = i => (i.customId.startsWith("primary") || i.customId.startsWith("secondary")) && i.user.id === this.message.user.id;
    // Works for 60 seconds.
    const collector = this.message.channel.createMessageComponentCollector({ filter, time: 60000 });
    this.message.reply(await this.actualMessage(false, this.person)).then(() => {

      collector.on("collect", async i => {
        if (i.user.id !== this.message.user.id) return;
        try {
          if (i.customId === "primary-next-page") {
            this.page = this.pageChange(this.page);
            await i.update(await this.actualMessage(false, this.person));
          } else if (i.customId === "primary-previous-page") {
            this.page = this.pageChange(this.page);
            await i.update(await this.actualMessage(false, this.person));
          }
        } catch (error) {
          this.message.reply(`Bot ran into an error idk how to fix itm`);
          const moreInfo = `From: ${this.message.author.username}#${this.message.author.discriminator}
                             Content: ${this.message.content}
                             Attempted command: meta
                             Channel type: ${this.message.channel.type}
                             Time: ${Date()}
                             URL: ${this.message.channel.type === "DM" ? "N/A" : `${this.message.url}`}`;
          Log.info(moreInfo);
          Global.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
          Global.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
          message.channel.send(`ADAnswersBot has ran into an error, ${error}.`);
          Log.error(error);
        }
      });
      collector.on("end", async() => {
        this.message.editReply(await this.actualMessage(true, this.person));
      });
    });
  }
}

module.exports = { Meta };