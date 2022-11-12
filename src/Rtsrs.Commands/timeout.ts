// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { KwikTable } from 'https://deno.land/x/kwik@v1.3.1/table.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from '../../deps.ts';
import {
  CreateTable,
  dbChangeData,
  dbHasValue,
  getdbValue,
  kwik,
  setdbValue,
} from '../Rtsrs.Database/mod.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { logger } from '../Rtsrs.Utils/logger.ts';
import { minToMilli } from '../Rtsrs.Utils/timeconvert.ts';
import { createCommand, day } from './mod.ts';

await CreateTable('MuteCase').then(() => {
  const log = logger({ name: 'DB Manager' });
  log.info('Made new Table');
});
export const mutecase = new KwikTable(kwik, 'MuteCase');

await CreateTable(`Violations`).then(() => {
  const log = logger({ name: 'DB Manager' });
  log.info('Made new Table');
});
export const Violations = new KwikTable(kwik, 'Violations');

export let currentcase = await getdbValue('currentCASE', mutecase);
await setdbValue('currentCASE', mutecase, currentcase);
export async function addCase() {
  if (typeof currentcase === 'number') {
    currentcase++;
  }
  await dbChangeData('currentCASE', currentcase, mutecase);
}

console.log(await getdbValue('currentCASE', mutecase));

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

    await addCase();
    if (typeof currentcase === 'number') {
      if ((await dbHasValue(currentcase.toString(), mutecase)) === false) {
        let data = `**TYPE:** TIMEOUT \n **LEVEL:** ${level}\n \n**MODERATOR:** <@${moderator}> \n >>> **USER:** <@${userToMute}>\n**TIME:** ${timeinMin}m\n **REASON:** ${reason} \n **WHEN:** ${when}`;
        await setdbValue(currentcase.toString(), mutecase, data);
      }
    }

    if ((await dbHasValue(`${userToMute}`, Violations)) === false) {
      await setdbValue(`${userToMute}`, Violations, currentcase);
    } else {
      const olddata: string = await getdbValue(`${userToMute}`, Violations);
      const newdata: string =
        olddata.toString() + '  |  ' + currentcase.toString();
      await dbChangeData(`${userToMute}`, newdata, Violations);
    }
    const embed = new Embeds()
      .setTitle('TIMEOUT SUCCSESS 🤐')
      .setColor(rdomcolor())
      .setFooter(`rtsrs • Timeout Case ${currentcase} • ${day}`)
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
