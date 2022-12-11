// deno-lint-ignore-file prefer-const no-unused-vars
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { configs, owner } from '../../configs.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from '../../deps.ts';
import { Bot } from '../../rtsrs.ts';
import * as dbs from '../Rtsrs.Database/mod.ts';
import {
  dbChangeData,
  dbDel,
  dbHasValue,
  getdbValue,
} from '../Rtsrs.Database/mod.ts';
import * as clr from '../Rtsrs.Utils/colors.ts';
import { discordInvis, rdomcolor } from '../Rtsrs.Utils/colors.ts';
import log from '../Rtsrs.Utils/logger.ts';
import { MillitoMin, minToMilli } from '../Rtsrs.Utils/timeconvert.ts';
import * as tablesvio from '../Rtsrs.Violation/ViolationManager.ts';
import {
  addCase,
  addViolation,
  CaseType,
  CheckCurrentCase,
  KickCase,
  KickCurrentCase,
  KickViolations,
  TimeoutCase,
  TimeoutCurrentCase,
  TimeoutViolations,
  ViolationType,
  WarnCase,
  WarnCurrentCase,
  WarnViolations,
} from '../Rtsrs.Violation/ViolationManager.ts';
import { createCommand, timenow } from './mod.ts';

createCommand({
  name: 'ban',
  description: 'bans a user',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'level',
      description: 'level of timeout',
      required: true,
      choices: [
        {
          name: 'LOW',
          value: 'LOW',
        },
        {
          name: 'MED',
          value: 'MED',
        },
        {
          name: 'HIGH',
          value: 'HIGH',
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'reason',
      description: 'Provide reason',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'A user',
      required: true,
    },
  ],

  execute: async (Bot, interaction) => {
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, ['BAN_MEMBERS']);
    if (hasPerm === false) return;
    if (interaction?.data?.options === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.user?.id === undefined) return;
    if (interaction.data.options[2].value?.toString() === '999433568151421048')
      return;
    const reason = interaction.data?.options[1].value!;
    const guildID = interaction.guildId!;
    const moderator = interaction.user.id!;
    const userToBan = interaction.data?.options[2].value?.toString()!;
    const level = interaction.data.options[0].value!;

    const embed = new Embeds()
      .setTitle(`ACTION: BAN`)
      .setTimestamp(timenow.getTime())
      .setColor(discordInvis)
      .setFooter(`rtsrs • Timeout Case ${TimeoutCurrentCase}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToBan}>\n**REASON:** ${reason}`
      );
    try {
      await Bot.helpers.banMember(guildID, userToBan, {
        reason: reason.toString(),
      });
    } catch (_err) {
      return;
    }
    const when = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const memberBan = new Embeds()
      .setTitle('LOG: USER BAN ADD')
      .setColor('#80780f')
      .setTimestamp(timenow.getTime())
      .setDescription(
        `**WHEN (EST):** ${when}\n **MODERATOR:** <@${moderator}\n>>>> **MEMBER_ID:** ${userToBan}\n**USERNAME:** <@${userToBan}>`
      );

    await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
      embeds: memberBan,
    });

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
  name: 'kick',
  description: 'kicks a user',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'level',
      description: 'level of kick',
      required: true,
      choices: [
        {
          name: 'LOW',
          value: 'LOW',
        },
        {
          name: 'MED',
          value: 'MED',
        },
        {
          name: 'HIGH',
          value: 'HIGH',
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'reason',
      description: 'Provide reason',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'A user',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    /* CHECKS */
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, ['KICK_MEMBERS']);
    if (hasPerm === false) return;
    if (interaction?.data?.options === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.user?.id === undefined) return;
    if (interaction.data.options[2].value?.toString() === '999433568151421048')
      return;
    /* INFORMATION NEEDED */
    const reason = interaction.data?.options[1].value!;
    const userToKick = interaction.data?.options[2].value!;
    const guildID = interaction.guildId!;
    // const userToKickUsername =
    const level = interaction.data.options[0].value!;
    const moderator = interaction.user.id!;
    const when = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const embed = new Embeds()
      .setTitle(`KICKED  👋🏿`)
      .setColor(discordInvis)
      .setTimestamp(timenow.getTime())
      .setFooter(`rtsrs • Kick Case ${KickCurrentCase}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToKick}> \n **REASON:** ${reason}`
      );

    try {
      await Bot.helpers.kickMember(
        guildID,
        userToKick.toString(),
        reason.toString()
      );
    } catch (_err) {
      return;
    }

    const data = `**TYPE:** KICK \n **LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToKick}> \n **REASON:** ${reason}\n**WHEN:** ${when}`;
    await CheckCurrentCase(CaseType.KickCase);
    await addCase(data, CaseType.KickCase);
    await addViolation(userToKick, ViolationType.KickViolation);

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
  name: 'warn',
  description: 'warns a user',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'level',
      description: 'level of warn',
      required: true,
      choices: [
        {
          name: 'LOW',
          value: 'LOW',
        },
        {
          name: 'MED',
          value: 'MED',
        },
        {
          name: 'HIGH',
          value: 'HIGH',
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'reason',
      description: 'Provide reason',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'A user',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    /* CHECKS */
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, [
        'MANAGE_MESSAGES',
      ]);
    if (hasPerm === false) return;
    if (interaction?.data?.options === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.user?.id === undefined) return;
    if (interaction.data.options[2].value?.toString() === '999433568151421048')
      return;
    /* INFORMATION NEEDED */
    const reason = interaction.data?.options[1].value!;
    const userToWarn = interaction.data?.options[2].value!;
    // const userToWarnUsername =
    const level = interaction.data.options[0].value!;
    const moderator = interaction.user.id!;
    const when = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const data = `**TYPE:** WARN \n **LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToWarn}> \n **REASON:** ${reason}\n**WHEN:** ${when}`;
    await CheckCurrentCase(CaseType.WarnCase);
    await addCase(data, CaseType.WarnCase);
    await addViolation(userToWarn, ViolationType.WarnViolation);

    const embed = new Embeds()
      .setTimestamp(timenow.getTime())
      .setTitle(`ACTION: WARN`)
      .setColor(discordInvis)
      .setFooter(`rtsrs • Warn Case ${WarnCurrentCase}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToWarn}> \n **REASON:** ${reason}`
      );

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
  name: 'timeout',
  description: 'mutes a user',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'level',
      description: 'level of timeout',
      required: true,
      choices: [
        {
          name: 'LOW',
          value: 'LOW',
        },
        {
          name: 'MED',
          value: 'MED',
        },
        {
          name: 'HIGH',
          value: 'HIGH',
        },
      ],
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'reason',
      description: 'Provide reason',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'A user',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.Number,
      name: 'mintime',
      description: 'A time limit in min',
      required: true,
    },
  ],

  execute: async (Bot, interaction) => {
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, ['MUTE_MEMBERS']);
    if (hasPerm === false) return;
    if (interaction?.data?.options === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.user?.id === undefined) return;
    if (interaction.data.options[2].value?.toString() === '999433568151421048')
      return;
    const reason = interaction.data?.options[1].value!;
    const guildID = interaction.guildId!;
    const moderator = interaction.user.id!;
    const userToMute = interaction.data?.options[2].value?.toString()!;
    const timeinMin = interaction.data?.options[3].value!;
    const level = interaction.data.options[0].value!;
    const when = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const data = `**TYPE:** TIMEOUT \n **LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason} \n **WHEN:** ${when}`;

    await CheckCurrentCase(CaseType.TimeoutCase);
    await addCase(data, CaseType.TimeoutCase);
    await addViolation(userToMute, ViolationType.TimeoutViolation);

    const embed = new Embeds()
      .setTitle(`ACTION: TIMEOUT`)
      .setTimestamp(timenow.getTime())
      .setColor(discordInvis)
      .setFooter(`rtsrs • Timeout Case ${TimeoutCurrentCase}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason}`
      );
    try {
      await Bot.helpers.editMember(guildID, userToMute, {
        communicationDisabledUntil: Date.now() + minToMilli(timeinMin),
      });
    } catch (_err) {
      return;
    }

    const memberTimeout = new Embeds()
      .setTitle('LOG: TIMEDOUT')
      .setColor('#80780f')
      .setTimestamp(timenow.getTime())
      .setDescription(
        `**WHEN (EST):** ${when}\n **MODERATOR:** <@${moderator}\n>>>> **MEMBER_ID:** ${userToMute}\n**USERNAME:** <@${userToMute}>`
      );

    await Bot.helpers.sendMessage(configs.BOT_MOD_CMD_LOG_CHANNEL, {
      embeds: memberTimeout,
    });

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
  name: 'violations',
  description: 'reviews violations',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'user',
      required: true,
    },
    // {
    //   type: ApplicationCommandOptionTypes.String,
    //   name: 'table',
    //   description: 'What Tables to Search from',
    //   required: true,
    //   choices: [
    //     {
    //       name: 'WarnViolations',
    //       value: 'WarnViolations',
    //     },
    //     {
    //       name: 'TimeoutViolations',
    //       value: 'TimeoutViolations',
    //     },
    //   ],
    // },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    const user = interaction.data.options[0].value!;
    const channelID = interaction.channelId?.toString()!;

    let data2 = JSON.stringify(
      await getdbValue(user.toString(), WarnViolations)
    );

    let data1 = JSON.stringify(
      await getdbValue(user.toString(), TimeoutViolations)
    );

    let data3 = JSON.stringify(
      await getdbValue(user.toString(), KickViolations)
    );

    const day = format(new Date(), 'HH:mm');
    let StartEmbed = new Embeds()
      .setTitle(`Violations`)
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setDescription(`>>> Page 0 of 3 Click *next page*`)
      .setFooter(`rtsrs • Page 0 of 3`);

    let embed1 = new Embeds()
      .setTitle(`Violations Timeout`)
      .setColor(rdomcolor())
      .setDescription(
        `**Timeout Violations Cases for <@${user}>.** \n \n >>> **Case Numbers: ${data1}** \n \n *Hint: you can use /case (casenumber) for more info*`
      )
      .setFooter(`rtsrs • Violations for <@${user}> • ${day}`)
      .addEmbed()
      .setTitle(`Violations Warn`)
      .setColor(rdomcolor())
      .setDescription(
        `**Warn Violations Cases for <@${user}>.** \n \n >>> **Case Numbers: ${data2}** \n \n *Hint: you can use /case (casenumber) for more info*`
      )
      .setFooter(`rtsrs • Violations for <@${user}> • ${day}`)
      .addEmbed()
      .setFooter(`rtsrs • Violations for <@${user}> • ${day}`)
      .setTitle(`Violations Kick`)
      .setColor(rdomcolor())
      .setDescription(
        `**Kick Violations Cases for <@${user}>.** \n \n >>> **Case Numbers: ${data3}** \n \n *Hint: you can use /case (casenumber) for more info*`
      );

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          flags: 64,
          embeds: embed1,
        },
      }
    );
  },
});

createCommand({
  name: 'case',
  description: 'reviews a timeout case',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: 'casenumber',
      description: 'Case number',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'table',
      description: 'What Tables to Search from',
      required: true,
      choices: [
        {
          name: 'WarnViolations',
          value: 'WarnViolations',
        },
        {
          name: 'TimeoutViolations',
          value: 'TimeoutViolations',
        },
        {
          name: 'KickCases',
          value: 'KickCases',
        },
      ],
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    let embed = new Embeds();
    const number = interaction.data.options[0].value!;
    const table = interaction.data.options[1].value!;
    console.log(table);

    if (table === 'TimeoutViolations') {
      if ((await dbHasValue(number.toString(), TimeoutCase)) === false) {
        return;
      }

      let data = await getdbValue(number.toString(), TimeoutCase);

      const day = format(new Date(), 'HH:mm');
      embed = new Embeds()
        .setTitle(`case ${number}`)
        .setTimestamp(timenow.getTime())
        .setColor(rdomcolor())
        .setDescription(
          `**If you need further info contact the Moderator.** \n \n ${data}`
        )
        .setFooter(`rtsrs • Case Review Of ${number}`);
    }
    if (table === 'WarnViolations') {
      if ((await dbHasValue(number.toString(), WarnCase)) === false) {
        return;
      }

      let data = await getdbValue(number.toString(), WarnCase);

      const day = format(new Date(), 'HH:mm');
      embed = new Embeds()
        .setTitle(`case ${number}`)
        .setColor(rdomcolor())
        .setDescription(
          `**If you need further info contact the Moderator.** \n \n ${data}`
        )
        .setFooter(`rtsrs • Case Review Of ${number} • ${day}`);
    }
    if (table === 'KickCases') {
      if ((await dbHasValue(number.toString(), KickCase)) === false) {
        return;
      }

      let data = await getdbValue(number.toString(), KickCase);

      const day = format(new Date(), 'HH:mm');
      embed = new Embeds()
        .setTitle(`case ${number}`)
        .setColor(rdomcolor())
        .setDescription(
          `**If you need further info contact the Moderator.** \n \n ${data}`
        )
        .setFooter(`rtsrs • Case Review Of ${number} • ${day}`);
    }

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          flags: 64,
          embeds: embed,
        },
      }
    );
  },
});

createCommand({
  name: 'delviolation',
  description: 'removes violations from user',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'user to remove',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    const hasPerm =
      Boolean(interaction?.member?.permissions) &&
      validatePermissions(interaction.member?.permissions!, ['ADMINISTRATOR']);
    if (hasPerm === false) return;

    const x = interaction.data.options[0].value!;

    if ((await dbHasValue(x.toString(), TimeoutViolations)) === true) {
      await dbDel(`${x}`, TimeoutViolations);
    }
    if ((await dbHasValue(x.toString(), WarnViolations)) === true) {
      await dbDel(`${x}`, WarnViolations);
    }
    if ((await dbHasValue(x.toString(), KickViolations)) === true) {
      await dbDel(`${x}`, KickViolations);
    }

    const embed = new Embeds()
      .setTitle(`Violations Removal`)
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setDescription(`>>> **Violation Cases for <@${x}> Has been removed**`)
      .setFooter(`rtsrs • Violations removal for <@${x}>`);
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
  name: 'resetcase',
  description: 'resetcase Owner NEEDS TO RESTART BOT',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,

  execute: async (Bot, interaction) => {
    try {
      if (interaction?.member === undefined) return;
      if (interaction.member.id.toString() === configs.owner) {
        await dbChangeData('WarnCurrentCase', 0, WarnCase);
        await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase);
        await dbChangeData('KickCurrentCase', 0, KickCase);
        console.log(await getdbValue('TimeoutCurrentCase', TimeoutCase));
        console.log(await getdbValue('WarnCurrentCase', WarnCase));
        log.warn('Resseted Mute case');
        log.warn('Resseted Warn case');
        log.fatal('RESTART BOT');
      } else {
        return;
      }
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: 'Reseted cases to 0 ( owner needs to restart bot )',
          },
        }
      );
      // deno-lint-ignore no-empty
    } catch {
    } finally {
      // deno-lint-ignore no-unsafe-finally
      throw 'RESTART BOT';
    }
  },
});

dbs;
tablesvio;
clr;
log;
MillitoMin;
minToMilli;
configs;
Bot;
createCommand({
  name: 'eval',
  description: 'eval',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'stuff',
      description: 'Runs the sript',
      required: true,
    },
  ],

  execute: async (Bot, interaction) => {
    // USEFULL VARS
    const guildID = interaction.guildId!;

    if (interaction?.member === undefined) return;
    if (interaction?.data?.options === undefined) return;
    if (interaction?.user.id.toString() !== owner) {
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `NO PERMS`,
            flags: 64,
          },
        }
      );

      return;
    }
    const stuff = interaction.data.options[0].value?.toString()!;
    try {
      eval(
        'try{eval((async () => {' +
          stuff +
          '}))()}catch(aysd23sdm){console.log(aysd23sdm);}'
      );
    } catch (err) {
      const embed = new Embeds()
        .setTitle(`EVAL: ERROR`)
        .setColor(discordInvis)
        .setTimestamp(timenow.getTime())
        .setFooter(`rtsrs • Eval`)
        .setDescription(`${err}`);
      console.log(err);
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
    }
  },
});

createCommand({
  name: 'userinfo',
  description: 'userinfo',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'mention user',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.resolved?.users === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.data?.options === undefined) return;

    const msg = JSON.stringify(
      Object.fromEntries(interaction.data.resolved.users),
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );

    const embed = new Embeds()
      .setTitle('rtsrs user info')
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setDescription(`${msg}`)
      .setFooter(`rtsrs bot`);

    const user = interaction.user.id;
    const guildid: bigint = interaction.guildId;
    const resolveduser = interaction.data?.options[0].value?.toString()!;
    console.log(resolveduser);

    // if ((await dbHasValue(user.toString(), slavery)) === false) {
    //   await setdbValue(user.toString(), slavery, user);
    // }

    // await Bot.helpers.editMember(guildid, resolveduser, {
    //   communicationDisabledUntil: Date.now() + 600000
    // });

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
