import Embeds from "https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts";
import * as mod from "https://deno.land/x/random@v1.1.2/Random.js";
import { botName } from "../../configs.ts";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import {
  addToUserBalance,
  getBalance,
  subtractToUserBalance,
} from "../Rtsrs.Currency/wallet.ts";
import { rdomcolor } from "../Rtsrs.Utils/colors.ts";
import { createCommand, timenow } from "./mod.ts";

createCommand({
  name: "inventory",
  description: "ur current inventory",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    const user = interaction.user.id;

    const currentInv = await readInventory(user);

    console.log(currentInv, interaction.user.id);

    // TODO: I  need to create an inventory table and stoer the players inventory inside
    // and then create it if its  not there it will display every item for the
    // command and the price. and also make item raritys and uses
    // and also make it so that you can buy items not sell them

    const embed = new Embeds()
      .setFooter(`${botName} • User Inventory`)
      .setColor(rdomcolor())
      .setTimestamp(timenow.getTime())
      .setTitle(`${interaction.user.username}'s Current Inventory`)
      .setDescription("**TODO**");
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
  },
});

createCommand({
  name: "additems",
  description: "adds items to user inventory",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "amount",
      description: "amount of items",
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "user",
      description: "user to add",
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: "item",
      description: "item to add",
      required: true,
      choices: [
        {
          name: "Nail",
          value: "Nail",
        },
        {
          name: "Cards",
          value: "Cards",
        },
        {
          name: "Keys",
          value: "Keys",
        },
        {
          name: "Gun",
          value: "Gun",
        },
        {
          name: "Knife",
          value: "Knife",
        },
        {
          name: "Tape",
          value: "Tape",
        },
        {
          name: "Lock",
          value: "Lock",
        },
      ],
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction.user === undefined) return;
    if (interaction.data?.options === undefined) return;

    const amount = interaction.data?.options[0].value!;
    const userToGiveItem = interaction.data?.options[1].value!;
    const item = interaction.data?.options[2].value!;

    console.log("Before: " + [...await readInventory(userToGiveItem)]);

    await addToInventory(userToGiveItem, stringToInventoryItem(item), amount);

    console.log("After: " + [...await readInventory(userToGiveItem)]);

    const embed = new Embeds()
      .setFooter(`${botName} • User Inventory`)
      .setColor(rdomcolor())
      .setTimestamp(timenow.getTime())
      .setTitle(`${interaction.user.username}'s Current Inventory`)
      .setDescription("**TODO**");
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
  },
});

createCommand({
  name: "bal",
  description: "ur current balance",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    if (interaction.user === undefined) return;
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
  },
});
createCommand({
  name: "addcoins",
  description: "adds more to ur  current balance",
  type: ApplicationCommandTypes.ChatInput,
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
  execute: async (Bot, interaction) => {
    if (interaction.user === undefined) return;
    if (interaction.data?.options === undefined) return;
    const userToAdd = interaction.data.options[0].value!;
    const amount = interaction.data.options[1].value!;
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
  },
});

createCommand({
  name: "removecoins",
  description: "adds more to ur  current balance",
  type: ApplicationCommandTypes.ChatInput,
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
  execute: async (Bot, interaction) => {
    if (interaction.user === undefined) return;
    if (interaction.data?.options === undefined) return;
    const userToAdd = interaction.data.options[0].value!;
    const amount = interaction.data.options[1].value!;
    const userUsername = interaction.user.username;
    const balance = await subtractToUserBalance(userToAdd, amount);
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
  },
});

import { CooldownManager } from "../Rtsrs.Utils/cooldown.ts";
import {
  addToInventory,
  createNewInventory,
  readInventory,
  stringToInventoryItem,
} from "../Rtsrs.Currency/inventory.ts";
const cooldownManager = new CooldownManager();

createCommand({
  name: "beg",
  description: "beg for money",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
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
  },
});
