import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { configs } from '../../configs.ts';
import { Bot } from '../../rtsrs.ts';
import { timenow } from '../Rtsrs.Commands/mod.ts';
import { discordInvis } from '../Rtsrs.Utils/colors.ts';

const when = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

Bot.events.guildMemberAdd = async (_, member) => {
  const avatasr = Bot.helpers.getAvatarURL(
    member.id.toString(),
    member.user?.discriminator.toString()!,
    {
      avatar: member.avatar?.toString()!,
      format: 'png',
    }
  );


  console.log(avatasr);
  const memberAdd = new Embeds()
    .setTitle('LOG: USER ENTER')
    .setColor(discordInvis)
    .setTimestamp(timenow.getTime())
    .setThumbnail(avatasr)
    .setDescription(
      `**WHEN (EST):** ${when}\n>>> **MEMBER_ID:** ${member.id}\n**USERNAME:** ${member.user?.username}\n **DISCRIMINATOR:** ${member.user?.discriminator}`
    );
  await Bot.helpers.sendMessage(configs.USER_LOG_CHANNEL, {
    embeds: memberAdd,
  });
};
