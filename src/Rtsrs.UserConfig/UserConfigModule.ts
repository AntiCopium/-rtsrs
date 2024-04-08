import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { botName, configs } from '../../configs.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from '../../deps.ts';
import { createCommand } from '../Rtsrs.Commands/mod.ts';
import { timenow } from '../Rtsrs.Commands/mod.ts#0.ts.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { UserConfigOptions, UserConfigSettings } from './mod.ts';

createCommand({
  name: 'messagelogs',
  description: 'toggles message deletion logs',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'option',
      description: 'option to toggle',
      required: true,
      choices: [
        {
          name: 'enable',
          value: 'enable',
        },
        {
          name: 'disable',
          value: 'disable',
        },
      ],
    },
  ],
  execute: async (Bot, interaction) => {
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, [`ADMINISTRATOR`]);
    if (hasPerm === false) return;

    if (interaction.data?.options === undefined) {
      return;
    }
    const embed = new Embeds()
      .setTitle(`CONFIG: MESSAGE DELETION LOGS`)
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setFooter(`${botName} • Message Deletion Log Config`)
      .setDescription(
        `**MODERATOR:** <@${
          interaction.user.id
        }>\n >>> **OPTION:** ${interaction.data?.options[0].value!}`
      );
    await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
      embeds: embed,
    });

    if (interaction.data?.options[0].value! === 'enable') {
      UserConfigSettings.set(UserConfigOptions.MessageDeletionLogSetting, true);

      const jsonData = JSON.stringify(
        Object.fromEntries(UserConfigSettings),
        null,
        2
      );

      await Deno.writeTextFileSync(
        './src/Rtsrs.UserConfig/rtsrs.config.json',
        jsonData
      );

      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `message deletion logs enabled`,
            flags: 64,
          },
        }
      );
    } else if (interaction.data?.options[0].value === 'disable') {
      UserConfigSettings.set(
        UserConfigOptions.MessageDeletionLogSetting,
        false
      );

      const jsonData = JSON.stringify(
        Object.fromEntries(UserConfigSettings),
        null,
        2
      );

      await Deno.writeTextFileSync(
        './src/Rtsrs.UserConfig/rtsrs.config.json',
        jsonData
      );

      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `message deletion logs disabled`,
            flags: 64,
          },
        }
      );
    }
  },
});

createCommand({
  name: 'allownsfw',
  description: 'toggles nsfw commands',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'option',
      description: 'option to toggle',
      required: true,
      choices: [
        {
          name: 'enable',
          value: 'enable',
        },
        {
          name: 'disable',
          value: 'disable',
        },
      ],
    },
  ],
  execute: async (Bot, interaction) => {
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, [`ADMINISTRATOR`]);
    if (hasPerm === false) return;

    if (interaction.data?.options === undefined) {
      return;
    }
    const embed = new Embeds()
      .setTitle(`CONFIG: NSFW RESTRICTION`)
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setFooter(`${botName} • Message Deletion Log Config`)
      .setDescription(
        `**MODERATOR:** <@${
          interaction.user.id
        }>\n >>> **OPTION:** ${interaction.data?.options[0].value!}`
      );
    await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
      embeds: embed,
    });

    if (interaction.data?.options[0].value! === 'enable') {
      UserConfigSettings.set(UserConfigOptions.AllowNSFWSetting, true);

      const jsonData = JSON.stringify(
        Object.fromEntries(UserConfigSettings),
        null,
        2
      );

      await Deno.writeTextFileSync(
        './src/Rtsrs.UserConfig/rtsrs.config.json',
        jsonData
      );

      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `nsfw commands enabled`,
            flags: 64,
          },
        }
      );
    } else if (interaction.data?.options[0].value === 'disable') {
      UserConfigSettings.set(UserConfigOptions.AllowNSFWSetting, false);

      const jsonData = JSON.stringify(
        Object.fromEntries(UserConfigSettings),
        null,
        2
      );

      await Deno.writeTextFileSync(
        './src/Rtsrs.UserConfig/rtsrs.config.json',
        jsonData
      );

      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `nsfw commands disabled`,
            flags: 64,
          },
        }
      );
    }
  },
});
