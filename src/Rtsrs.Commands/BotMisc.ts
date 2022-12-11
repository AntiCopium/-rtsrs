// deno-lint-ignore-file no-unused-vars
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import * as mod from 'https://deno.land/x/random@v1.1.2/Random.js';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
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
      .setTitle('rtsrs random number success')
      .setDescription(`**Generated number**: ${n}\n\nRange: ${int}`)
      .setColor(rdomcolor())
      .setFooter(`rtsrs bot`);
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
  description: 'notifys rtsrs erves to send ping request.',
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    // const hasPerm = Boolean(interaction?.member?.permissions) && validatePermissions(interaction.member?.permissions, ["ADMINISTRATOR"]);
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);
    const day = format(new Date(), 'HH:mm');
    const embed = new Embeds()
      .setTitle('rtsrs current ping')
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setDescription(`${ping} (ms)`)
      .setFooter(`rtsrs bot`);
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
  name: 'doa',
  description: 'rtsrs has 1 in 8 chance of dead',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'a user to test',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    const day = format(new Date(), 'HH:mm');
    if (interaction.data?.options === undefined) {
      return;
    }
    const user = interaction.data?.options[0].value;
    const embedDead = new Embeds()
      .setTitle('rtsrs dead or alive success')
      .setTimestamp(timenow.getTime())
      .setColor('#880808')
      .setDescription(`<@${user}> \n \n result: 💀🔫 you died nigga`)
      .setFooter(`rtsrs bot`);

    const embedAlive = new Embeds()
      .setTitle('rtsrs dead or alive success')
      .setColor('#125e94')
      .setDescription(`<@${user}> \n \n result: 😮‍💨 alive`)
      .setFooter(`rtsrs bot ${day}`);

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
