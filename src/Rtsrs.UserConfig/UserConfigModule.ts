import Embeds from "https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts";
import { botName, configs } from "../../configs.ts";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from "../../deps.ts";
import { createCommand } from "../Rtsrs.Commands/mod.ts";
import { timenow } from "../Rtsrs.Commands/mod.ts#0.ts.ts";
import { rdomcolor } from "../Rtsrs.Utils/colors.ts";
import { UserConfigOptions, UserConfigSettings } from "./mod.ts";

createCommand({
  name: "config",
  description: "User Config",
  type: ApplicationCommandTypes.ChatInput,
  devOnly: false,
  options: [
    {
      type: ApplicationCommandOptionTypes.SubCommand,
      name: "messagelogs",
      description: "Enable or disable message deletion logs",
      options: [
        {
          type: ApplicationCommandOptionTypes.String,
          name: "choice",
          description: "Enable message deletion logs",
          required: true,
          choices: [
            {
              name: "Enable",
              value: "enable",
            },
            {
              name: "Disable",
              value: "disable",
            },
          ],
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.SubCommand,
      name: "allownsfw",
      description: "Enable or disable NSFW",
      options: [
        {
          type: ApplicationCommandOptionTypes.String,
          name: "choice",
          description: "Enable or disable NSFW",
          required: true,
          choices: [
            {
              name: "Enable",
              value: "enable",
            },
            {
              name: "Disable",
              value: "disable",
            },
          ],
        },
      ],
    },
    {
      name: "allowwelcomer",
      description: "toggles welcome",
      type: ApplicationCommandOptionTypes.SubCommand,
      options: [
        {
          type: ApplicationCommandOptionTypes.String,
          name: "option",
          description: "option to toggle",
          required: true,
          choices: [
            {
              name: "Enable",
              value: "enable",
            },
            {
              name: "Disable",
              value: "disable",
            },
          ],
        },
      ],
    },
  ],

  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.user?.id === undefined) return;
    if (interaction.user === undefined) return;
    const ctxOptions = interaction.data?.options[0].options!; // current options of subcommand

    // ------------MESSAGE DELETION LOGS------------
    if (interaction.data?.options[0].name === "messagelogs") {
      const hasPerm = Boolean(interaction?.member?.permissions) &&
        validatePermissions(interaction.member?.permissions!, [
          `ADMINISTRATOR`,
        ]);
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
          `**MODERATOR:** <@${interaction.user.id}>\n >>> **OPTION:** ${interaction
            .data?.options[0].value!}`,
        );
      await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
        embeds: embed,
      });

      if (ctxOptions[0].value! === "enable") {
        UserConfigSettings.set(
          UserConfigOptions.MessageDeletionLogSetting,
          true,
        );

        const jsonData = JSON.stringify(
          Object.fromEntries(UserConfigSettings),
          null,
          2,
        );

        Deno.writeTextFileSync(
          "./src/Rtsrs.UserConfig/rtsrs.config.json",
          jsonData,
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
          },
        );
      } else if (ctxOptions[0].value === "disable") {
        UserConfigSettings.set(
          UserConfigOptions.MessageDeletionLogSetting,
          false,
        );

        const jsonData = JSON.stringify(
          Object.fromEntries(UserConfigSettings),
          null,
          2,
        );

        Deno.writeTextFileSync(
          "./src/Rtsrs.UserConfig/rtsrs.config.json",
          jsonData,
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
          },
        );
      }
    }
    if (interaction.data?.options[0].name === "allownsfw") {
      const hasPerm = Boolean(interaction?.member?.permissions) &&
        validatePermissions(interaction.member?.permissions!, [
          `ADMINISTRATOR`,
        ]);
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
          `**MODERATOR:** <@${interaction.user.id}>\n >>> **OPTION:** ${interaction
            .data?.options[0].value!}`,
        );
      await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
        embeds: embed,
      });

      if (ctxOptions[0].value! === "enable") {
        UserConfigSettings.set(UserConfigOptions.AllowNSFWSetting, true);

        const jsonData = JSON.stringify(
          Object.fromEntries(UserConfigSettings),
          null,
          2,
        );

        Deno.writeTextFileSync(
          "./src/Rtsrs.UserConfig/rtsrs.config.json",
          jsonData,
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
          },
        );
      } else if (ctxOptions[0].value! === "disable") {
        UserConfigSettings.set(UserConfigOptions.AllowNSFWSetting, false);

        const jsonData = JSON.stringify(
          Object.fromEntries(UserConfigSettings),
          null,
          2,
        );

        Deno.writeTextFileSync(
          "./src/Rtsrs.UserConfig/rtsrs.config.json",
          jsonData,
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
          },
        );
      }
    }
    // ------------WELCOME------------
    if (interaction.data?.options[0].name === "allowwelcomer") {
      const hasPerm = Boolean(interaction?.member?.permissions) &&
        validatePermissions(interaction.member?.permissions!, [
          `ADMINISTRATOR`,
        ]);
      if (hasPerm === false) return;

      if (interaction.data?.options === undefined) return;
      const embed = new Embeds()
        .setTitle(`CONFIG: WELCOMER`)
        .setTimestamp(timenow.getTime())
        .setColor(rdomcolor())
        .setFooter(`${botName} • Welcomer Config`)
        .setDescription(
          `**MODERATOR:** <@${interaction.user.id}>\n >>> **OPTION:** ${interaction
            .data?.options[0].value!}`,
        );
      await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
        embeds: embed,
      });

      if (ctxOptions[0].value! === "enable") {
        UserConfigSettings.set(
          UserConfigOptions.AllowWelcomeMessageSetting,
          true,
        );

        const jsonData = JSON.stringify(
          Object.fromEntries(UserConfigSettings),
          null,
          2,
        );

        try {
          Deno.writeTextFileSync(
            "./src/Rtsrs.UserConfig/rtsrs.config.json",
            jsonData,
          );
        } catch (error) {
          console.log(error);
        }

        await Bot.helpers.sendInteractionResponse(
          interaction.id,
          interaction.token,
          {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: `welcomer enabled`,
              flags: 64,
            },
          },
        );
      } else if (ctxOptions[0].value === "disable") {
        UserConfigSettings.set(
          UserConfigOptions.AllowWelcomeMessageSetting,
          false,
        );

        const jsonData = JSON.stringify(
          Object.fromEntries(UserConfigSettings),
          null,
          2,
        );

        try {
          await Deno.writeTextFileSync(
            "./src/Rtsrs.UserConfig/rtsrs.config.json",
            jsonData,
          );
        } catch (error) {
          console.log(error);
        }

        await Bot.helpers.sendInteractionResponse(
          interaction.id,
          interaction.token,
          {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: `welcomer disabled`,
              flags: 64,
            },
          },
        );
      }
    }
  },
});
