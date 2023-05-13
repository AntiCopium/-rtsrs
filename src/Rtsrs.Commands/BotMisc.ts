// deno-lint-ignore-file no-unused-vars
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import * as mod from 'https://deno.land/x/random@v1.1.2/Random.js';
import { botName, owner } from '../../configs.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { discordInvis, rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { snowflakeToTimestamp } from '../Rtsrs.Utils/helpers.ts';
import { createCommand, timenow } from './mod.ts';

createCommand({
  name: 'randomnumber',
  description: 'submits a random number from (range)',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: 'range',
      description: 'a range to go 1 to (range)',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction.data?.options === undefined) {
      return;
    }
    const int = interaction.data?.options[0].value;
    const number = new mod.Random();
    const n = number.int(1, int);

    const embed = new Embeds()
      .setTimestamp(timenow.getTime())
      .setTitle(`${botName} random number success`)
      .setDescription(`**Generated number**: ${n}\n\nRange: ${int}`)
      .setColor(rdomcolor())
      .setFooter(`${botName} bot`);
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: embed,
        },
      }
    );
  },
});

createCommand({
  name: 'ping',
  description: `notifys ${botName} erves to send ping request.`,
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    // const hasPerm = Boolean(interaction?.member?.permissions) && validatePermissions(interaction.member?.permissions, ["ADMINISTRATOR"]);
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);
    const day = format(new Date(), 'HH:mm');
    const embed = new Embeds()
      .setTitle(`${botName} current ping`)
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setDescription(`${ping} (ms)`)
      .setFooter(`${botName} bot`);
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: embed,
        },
      }
    );
  },
});

createCommand({
  name: `doa`,
  description: `${botName} has 1 in 8 chance of dead`,
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: `user`,
      description: `a user to test`,
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    const day = format(new Date(), `HH:mm`);
    if (interaction.data?.options === undefined) {
      return;
    }
    const user = interaction.data?.options[0].value;
    const embedDead = new Embeds()
      .setTitle(`${botName} dead or alive success`)
      .setTimestamp(timenow.getTime())
      .setColor(`#880808`)
      .setDescription(`<@${user}> \n \n result: 💀🔫 you died nigga`)
      .setFooter(`${botName} bot`);

    const embedAlive = new Embeds()
      .setTitle(`${botName} dead or alive success`)
      .setColor(`#125e94`)
      .setDescription(`<@${user}> \n \n result: 😮‍💨 alive`)
      .setFooter(`${botName} bot ${day}`);

    const r = new mod.Random().pick(
      embedAlive,
      embedAlive,
      embedAlive,
      embedAlive,
      embedAlive,
      embedAlive,
      embedAlive,
      embedDead
    );

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: r,
        },
      }
    );
  },
});

createCommand({
  name: `anime`,
  description: `Generates a random anime girl`,
  type: ApplicationCommandTypes.ChatInput,
  devOnly: false,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: `type`,
      description: `Type of generation`,
      required: true,
      choices: [
        {
          name: `RANDOM`,
          value: `RANDOM`,
        },
        {
          name: `MAID`,
          value: `MAID`,
        },
        {
          name: `WAIFU`,
          value: `WAIFU`,
        },
        {
          name: `SELFIE`,
          value: `SELFIE`,
        },
        {
          name: `MILKERS`,
          value: `MILKERS`,
        },
        {
          name: `UNIFORM`,
          value: `UNIFORM`,
        },
        {
          name: `ASS`,
          value: `ASS`,
        },
        {
          name: `ECCHI`,
          value: `ECCHI`,
        },
        {
          name: `HENTAI`,
          value: `HENTAI`,
        },
        {
          name: `ERO`,
          value: `ERO`,
        },
        {
          name: `TITS`,
          value: `TITS`,
        },
        {
          name: `MILF`,
          value: `MILF`,
        },
        {
          name: `ORAL`,
          value: `ORAL`,
        },
        {
          name: `CUM`,
          value: `CUM`,
        },
        {
          name: `LEWD`,
          value: `LEWD`,
        },
        {
          name: `LESBIAN`,
          value: `LESBIAN`,
        },
        {
          name: `SEXY`,
          value: `SEXY`,
        },
        {
          name: `HENTAI2`,
          value: `HENTAI2`,
        },
        {
          name: `BJ`,
          value: `BJ`,
        },
        {
          name: `BOOBS`,
          value: `BOOBS`,
        },
        {
          name: `PUSSY`,
          value: `PUSSY`,
        },
        {
          name: `HOLO`,
          value: `HOLO`,
        },
        {
          name: `NEKO`,
          value: `NEKO`,
        },
        {
          name: `ANAL`,
          value: `ANAL`,
        },
      ],
    },
  ],
  execute: async (Bot, interaction) => {
    const type = interaction.data?.options![0].value!;
    switch (type) {
      case `RANDOM`: {
        await axiod
          .get(`https://api.waifu.im/search`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`RANDOM Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `UNIFORM`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=uniform`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`UNIFORM Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `MAID`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=maid`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`MAID Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `WAIFU`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=waifu`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`WAIFU Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `SELFIE`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=selfies`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`SELFIE Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `MILKERS`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=oppai`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`MILKERS Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `ASS`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=ass`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`ASS Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `ECCHI`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=ecchi`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`ECCHI Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `HENTAI`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=hentai&gif=true`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`HENTAI Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `ERO`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=ero`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`ERO Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `TITS`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=paizuri`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`TITS Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `MILF`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=milf`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`MILF Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `ORAL`: {
        await axiod
          .get(`https://api.waifu.im/search/?included_tags=oral`)
          .then(async (response) => {
            const img = response.data[`images`][0][`url`];
            const embed = new Embeds()
              .setTitle(`ORAL Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `CUM`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/cum`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`CUM Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `LEWD`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/lewd`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`LEWD Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `LESBIAN`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/lesbian`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`LESBIAN Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `SEXY`: {
        if (interaction.user.id.toString() !== owner) return;
        await axiod
          .get(`http://api.nekos.fun:8080/api/feet`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`SEXY Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `HENTAI2`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/hentai`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`HENTAI2 Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `BJ`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/bj`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`BJ Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `BOOBS`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/boobs`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`BOOBS Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `PUSSY`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/pussy`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`PUSSY Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `HOLO`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/holo`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`HOLO Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `NEKO`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/neko`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`NEKO Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
      case `ANAL`: {
        await axiod
          .get(`http://api.nekos.fun:8080/api/anal`)
          .then(async (response) => {
            const img = response.data[`image`];
            const embed = new Embeds()
              .setTitle(`ANAL Generated`)
              .setImage(img)
              .setColor(discordInvis)
              .setTimestamp(timenow.getTime())
              .setFooter(`${botName} anime`);

            await Bot.helpers.sendInteractionResponse(
              interaction.id,
              interaction.token,
              {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                  embeds: embed,
                  flags: 64,
                },
              }
            );
          });
        break;
      }
    }
  },
});
