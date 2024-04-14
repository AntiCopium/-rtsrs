import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import { configs } from '../../configs.ts';
import { Bot } from '../../rtsrs.ts';
import { timenow } from '../Rtsrs.Commands/mod.ts';
import {
  UserConfigOptions,
  UserConfigSettings,
} from '../Rtsrs.UserConfig/mod.ts';
import { discordInvis } from '../Rtsrs.Utils/colors.ts';

const when = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

Bot.events.guildMemberAdd = async (_, member, user) => {
  const avatasr = Bot.helpers.getAvatarURL(
    member.id.toString(),
    member.user?.discriminator.toString()!,
    {
      avatar: user.avatar,
      format: 'png',
    }
  );

  const memberAdd = new Embeds()
    .setTitle('LOG: USER ENTER')
    .setColor('#0f2080')
    .setTimestamp(timenow.getTime())
    .setThumbnail(avatasr)
    .setDescription(
      `**WHEN (EST):** ${when}\n>>> **MEMBER_ID:** ${member.id}\n**USERNAME:** ${member.user?.username}\n **DISCRIMINATOR:** ${member.user?.discriminator}`
    );
  await Bot.helpers.sendMessage(configs.USER_LOG_CHANNEL, {
    embeds: memberAdd,
  });
};

Bot.events.messageCreate = async (_, msg) => {
  if (msg.content.toLowerCase() === 'hello') {
    await Bot.helpers.sendMessage(msg.channelId, {
      content: 'hi',
    });
  }
};

Bot.events.guildMemberRemove = async (_, user) => {
  const avatasr = Bot.helpers.getAvatarURL(
    user.id.toString(),
    user.discriminator.toString()!,
    {
      avatar: user.avatar,
      format: 'png',
    }
  );
  const memberAdd = new Embeds()
    .setTitle('LOG: USER LEAVE')
    .setColor('#80170f')
    .setTimestamp(timenow.getTime())
    .setThumbnail(avatasr)
    .setDescription(
      `**WHEN (EST):** ${when}\n>>> **MEMBER_ID:** ${user.id}\n**USERNAME:** ${user.username}\n **DISCRIMINATOR:** ${user.discriminator}`
    );
  await Bot.helpers.sendMessage(configs.USER_LOG_CHANNEL, {
    embeds: memberAdd,
  });
};

Bot.events.guildMemberUpdate = async (_, member, user) => {
  const avatasr = Bot.helpers.getAvatarURL(
    member.id.toString(),
    member.user?.discriminator.toString()!,
    {
      avatar: user.avatar,
      format: 'png',
    }
  );

  const memberAdd = new Embeds()
    .setTitle('LOG: USER INFO UPDATE')
    .setColor('#80780f')
    .setTimestamp(timenow.getTime())
    .setThumbnail(avatasr)
    .setDescription(
      `**WHEN (EST):** ${when}\n>>> **MEMBER_ID:** ${member.id}\n**USERNAME:** ${member.user?.username}\n **DISCRIMINATOR:** ${member.user?.discriminator}`
    );
  await Bot.helpers.sendMessage(configs.USER_LOG_CHANNEL, {
    embeds: memberAdd,
  });
};

Bot.events.guildBanAdd = async (_, usr) => {
  const avatasr = Bot.helpers.getAvatarURL(
    usr.id.toString(),
    usr.discriminator.toString()!,
    {
      avatar: usr.avatar,
      format: 'png',
    }
  );

  const memberBan = new Embeds()
    .setTitle('LOG: USER BAN ADD')
    .setColor('#80780f')
    .setTimestamp(timenow.getTime())
    .setThumbnail(avatasr)
    .setDescription(
      `**WHEN (EST):** ${when}\n>>> **MEMBER_ID:** ${usr.id}\n**USERNAME:** ${usr.username}\n **DISCRIMINATOR:** ${usr.discriminator}`
    );

  await Bot.helpers.sendMessage(configs.USER_LOG_CHANNEL, {
    embeds: memberBan,
  });
};

Bot.events.messageDelete = async (_, chan, msg) => {
  if (
    UserConfigSettings.get(UserConfigOptions.MessageDeletionLogSetting) ===
    false
  ) {
    return;
  }

  const userID = msg?.authorId;

  const _chan = chan.channelId;

  // coulda .trim() it but nah
  const channel = _chan.toString().split('n').join('');

  const embed = new Embeds()
    .setTitle('LOG: MESSAGE DELETE')
    .setColor(discordInvis)
    .setTimestamp(timenow.getTime())
    .setDescription(
      `**WHEN (EST):** ${when}\n>>> **CHANNEL_ID:** <#${channel}>\n**USER** <@${userID}>\n**MESSAGE:** ${msg?.content}`
    );

  await Bot.helpers.sendMessage(channel, {
    embeds: embed,
  });

  await Bot.helpers.sendMessage(configs.USER_LOG_CHANNEL, {
    embeds: embed,
  });
};
