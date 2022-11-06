// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  validatePermissions,
} from '../../deps.ts';
import { dbDel, dbHasValue } from '../Rtsrs.Database/mod.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { createCommand } from './mod.ts';
import { Violations } from './timeout.ts';
import { WarnViolations } from './warn.ts';
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

    if ((await dbHasValue(x.toString(), Violations)) === true) {
      await dbDel(`${x}`, Violations);
    }
    if ((await dbHasValue(x.toString(), WarnViolations)) === true) {
      await dbDel(`${x}`, WarnViolations);
    }

    const day = format(new Date(), 'HH:mm');
    const embed = new Embeds()
      .setTitle(`Violations Removal`)
      .setColor(rdomcolor())
      .setDescription(`>>> **Violation Cases for <@${x}> Has been removed**`)
      .setFooter(`rtsrs • Violations removal for <@${x}> • ${day}`);
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
