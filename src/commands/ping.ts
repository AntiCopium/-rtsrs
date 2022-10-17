// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { rdomcolor } from '../utils/colors.ts';
import { snowflakeToTimestamp } from '../utils/helpers.ts';
import { createCommand } from './mod.ts';

createCommand({
  name: 'ping',
  description: 'notifys rtsrs erves to send ping request.',
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    // const hasPerm = Boolean(interaction?.member?.permissions) && validatePermissions(interaction.member?.permissions, ["ADMINISTRATOR"]);
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);
    const day = format(new Date(), 'HH:mm');
    const embed = new Embeds()
      .setTitle('rtsrs current ping')
      .setColor(rdomcolor())
      .setDescription(`${ping} (ms)`)
      .setFooter(`rtsrs bot ${day}`);
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
