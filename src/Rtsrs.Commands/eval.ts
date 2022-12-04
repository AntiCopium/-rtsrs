// deno-lint-ignore-file
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { configs, owner } from '../../configs.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import * as dbs from '../Rtsrs.Database/mod.ts';
import * as clr from '../Rtsrs.Utils/colors.ts';
import { discordInvis } from '../Rtsrs.Utils/colors.ts';
import * as log from '../Rtsrs.Utils/logger.ts';
import { MillitoMin, minToMilli } from '../Rtsrs.Utils/timeconvert.ts';
import * as tablesvio from '../Rtsrs.Violation/ViolationManager.ts';
import { createCommand, timenow } from './mod.ts';
dbs;
tablesvio;
clr;
log;
MillitoMin;
minToMilli;
configs;
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
      eval('try{(async () => {' + stuff + '})()}catch(aysd23sdm){console.log(aysd23sdm);}');
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
