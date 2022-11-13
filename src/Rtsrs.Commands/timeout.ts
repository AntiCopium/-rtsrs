// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from '../../deps.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { minToMilli } from '../Rtsrs.Utils/timeconvert.ts';
import {
  addCase,
  addViolation,
  CaseType,
  CheckCurrentCase,
  TimeoutCurrentCase,
  ViolationType,
} from '../Rtsrs.Violation/ViolationManager.ts';
import { createCommand, day, timenow } from './mod.ts';

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
      validatePermissions(interaction.member?.permissions!, ['ADMINISTRATOR']);
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

    let data = `**TYPE:** TIMEOUT \n **LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason} \n **WHEN:** ${when}`;
    await CheckCurrentCase(CaseType.TimeoutCase);
    await addCase(data, CaseType.TimeoutCase);

    await addViolation(userToMute, ViolationType.TimeoutViolation);
    const embed = new Embeds()
      .setTitle('TIMEOUT SUCCSESS 🤐')
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setFooter(`rtsrs • Timeout Case ${TimeoutCurrentCase}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason}`
      );
    try {
      await Bot.helpers.editMember(guildID, userToMute, {
        communicationDisabledUntil: Date.now() + minToMilli(timeinMin),
      });
    } catch (err) {
      return;
    }

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
