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
import {
  addCase,
  addViolation,
  CaseType,
  CheckCurrentCase,
  KickCurrentCase,
  ViolationType,
} from '../Rtsrs.Violation/ViolationManager.ts';
import { createCommand, day } from './mod.ts';

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
      .setColor(rdomcolor())
      .setFooter(`rtsrs • Kick Case ${KickCurrentCase} • ${day}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToKick}> \n **REASON:** ${reason}`
      );

    try {
      await Bot.helpers.kickMember(
        guildID,
        userToKick.toString(),
        reason.toString()
      );
    } catch (err) {
      return;
    }

    let data = `**TYPE:** KICK \n **LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToKick}> \n **REASON:** ${reason}\n**WHEN:** ${when}`;
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
