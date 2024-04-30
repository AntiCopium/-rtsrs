import Embeds from "https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts";
import * as mod from "https://deno.land/x/random@v1.1.2/Random.js";
import { botName } from "../../configs.ts";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from "../../deps.ts";
import {
  addToUserBalance,
  getBalance,
  subtractToUserBalance,
} from "../Rtsrs.Currency/wallet.ts";
import { rdomcolor } from "../Rtsrs.Utils/colors.ts";
import { createCommand, timenow } from "./mod.ts";
import { CooldownManager } from "../Rtsrs.Utils/cooldown.ts";
import {
  addToInventory,
  createNewInventory,
  readInventory,
  stringToInventoryItem,
} from "../Rtsrs.Currency/inventory.ts";
const cooldownManager = new CooldownManager();

createCommand({
  name: "currency",
  description: "Currency Module",
  type: ApplicationCommandTypes.ChatInput,
  devOnly: false,
  options: [
    {
      type: ApplicationCommandOptionTypes.SubCommand,
      name: "balance",
      description: "Check your balance",
      options: [],
    },
    {
      type: ApplicationCommandOptionTypes.SubCommand,
      name: "addcoins",
      description: "Add coins to a user's balance",
      options: [
        {
          type: ApplicationCommandOptionTypes.User,
          name: "user",
          description: "user to add",
          required: true,
        },
        {
          type: ApplicationCommandOptionTypes.Number,
          name: "amount",
          description: "amount to add",
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.SubCommand,
      name: "removecoins",
      description: "Add coins to a user's balance",
      options: [
        {
          type: ApplicationCommandOptionTypes.User,
          name: "user",
          description: "user to add",
          required: true,
        },
        {
          type: ApplicationCommandOptionTypes.Number,
          name: "amount",
          description: "amount to remove",
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.SubCommand,
      name: "beg",
      description: "beg for coins",
      options: [],
    },
  ],

  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.user?.id === undefined) return;
    if (interaction.user === undefined) return;
    const ctxOptions = interaction.data?.options[0].options!; // current options of subcommand

    // ------------BALANCE------------
    if (interaction.data?.options[0].name === "balance") {
      const userToFetchBalance = interaction.user.id;
      const userUsername = interaction.user.username;
      const balance = await getBalance(userToFetchBalance);
      const embed = new Embeds()
        .setColor(rdomcolor())
        .setTimestamp(timenow.getTime())
        .setTitle(`${userUsername}'s Current Balance`)
        .setDescription(
          `*Your balance always changes...*\n\n>>> ***Balance:*** *${balance}*$\n ***Daily Income:*** *Not Done*\n ***Bank:***  *TODO*\n \n *Hint: you can use /beg to beg for money.*`,
        )
        .setFooter(`${botName} • User Balance`);
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            embeds: embed,
          },
        },
      );
    }

    // ------------END BALANCE------------
    // ~
    // ------------ADD COINS--------------

    if (interaction.data?.options[0].name === "addcoins") {
      const hasPerm = Boolean(interaction?.member?.permissions) &&
        validatePermissions(interaction.member?.permissions!, [
          `MANAGE_NICKNAMES`,
        ]);
      if (hasPerm === false) return;
      const userToAdd = ctxOptions[0].value!;
      const amount = ctxOptions[1].value!;
      const balance = await addToUserBalance(userToAdd, amount);
      const embed = new Embeds()
        .setColor(rdomcolor())
        .setTimestamp(timenow.getTime())
        .setTitle(`${userToAdd}'s New  Balance`)
        .setDescription(
          `*Your balance always changes*\n\n>>> ***Balance:*** *${balance}*$\n ***Daily Income:*** *Not Done*\n \n *Hint: you can use /beg to beg for money.*`,
        )
        .setFooter(`${botName} • User Balance`);
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            embeds: embed,
          },
        },
      );
    }
    // ------------END ADD COINS------------
    // ~
    // ------------REMOVE COINS--------------

    if (interaction.data?.options[0].name === "removecoins") {
      const userToRemove = ctxOptions[0].value!;
      const amount = ctxOptions[1].value!;
      const userUsername = interaction.user.username;
      const balance = await subtractToUserBalance(userToRemove, amount);
      const embed = new Embeds()
        .setColor(rdomcolor())
        .setTimestamp(timenow.getTime())
        .setTitle(`${userUsername}'s New  Balance`)
        .setDescription(
          `*Your balance always changes*\n\n>>> ***Balance:*** *${balance}*$\n ***Daily Income:*** *Not Done*\n \n *Hint: you can use /beg to beg for money.*`,
        )
        .setFooter(`${botName} • User Balance`);
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            embeds: embed,
          },
        },
      );
    }
    // ------------END REMOVE COINS------------
    // ~
    // ------------BEG------------

    if (interaction.data?.options[0].name === "beg") {
      const userId = interaction.user?.id;
      const commandName = "beg";
      const cooldownTime = 180; // seconds

      if (userId === undefined) return;
      if (cooldownManager.isOnCooldown(String(userId), commandName)) {
        const cooldownSeconds = Math.ceil(
          (cooldownManager.cooldowns.get(`${userId}-${commandName}`)! -
            Date.now()) / 1000,
        );
        const embedcooled = new Embeds()
          .setTitle(`Cooldown`)
          .setTimestamp(timenow.getTime())
          .setColor("#bf2c2c")
          .setDescription(
            `Please wait ${cooldownSeconds} second(s) before using this command again.`,
          )
          .setFooter(`${botName} • Cooldown`);
        await Bot.helpers.sendInteractionResponse(
          interaction.id,
          interaction.token,
          {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              embeds: embedcooled,
              flags: 64,
            },
          },
        );
        return;
      }

      const userUsername = interaction.user.username;
      const r = new mod.Random().pick(
        100,
        500,
        50,
        50,
        50,
        25,
        25,
        25,
        25,
        25,
        150,
        150,
        150,
        165,
        200,
        200,
        200,
        200,
        200,
        345,
        345,
        345,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      );
      const balance = await addToUserBalance(userId, r);

      const embed = new Embeds()
        .setColor(rdomcolor())
        .setTimestamp(timenow.getTime())
        .setTitle(`${userUsername} Begged and begged`)
        .setDescription(
          `You have earned: *${r}* \n ** NEW BALANCE:${balance} **`,
        )
        .setFooter(`${botName} • User Balance`);

      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            embeds: embed,
            flags: 64,
          },
        },
      );

      cooldownManager.setCooldown(String(userId), commandName, cooldownTime);
    }
  },
});
