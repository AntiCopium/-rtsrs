// deno-lint-ignore-file
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { KwikTable } from 'https://deno.land/x/kwik@v1.3.1/table.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from '../../deps.ts';
import { CreateTable, dbHasValue, kwik, setdbValue } from '../database/mod.ts';
import { rdomcolor } from '../utils/colors.ts';
import { logger } from '../utils/logger.ts';
import { minToMilli } from '../utils/timeconvert.ts';
import { createCommand, day } from './mod.ts';

await CreateTable('MuteCase').then(() => {
  const log = logger({ name: 'DB Manager' });
  log.info('Made new Table');
});
const mutecase = new KwikTable(kwik, 'MuteCase');

let currentcase = 0;
function addCase() {
  currentcase++;
}

console.log(currentcase);

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
    const reason = interaction.data?.options[1].value!;
    const guildID = interaction.guildId!;
    const moderator = interaction.user.id!;
    const userToMute = interaction.data?.options[2].value?.toString()!;
    const timeinMin = interaction.data?.options[3].value!;
    const level = interaction.data.options[0].value!;
    addCase();

    if ((await dbHasValue(currentcase.toString(), mutecase)) === false) {
      let data = `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason}`;
      await setdbValue(currentcase.toString(), mutecase, data);
    }

    const embed = new Embeds()
      .setTitle('TIMEOUT SUCCSESS 🤐')
      .setColor(rdomcolor())
      .setFooter(`rtsrs • Case ${currentcase} • ${day}`)
      .setDescription(
        `**LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason}`
      );
      try {
        await Bot.helpers.editMember(guildID, userToMute, {
            communicationDisabledUntil: Date.now() + minToMilli(timeinMin),
          });
      } catch(err) {
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
