import { Bot } from '../../rtsrs.ts';
import { Command } from '../types/commands.ts';
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import { table } from '../database/mod.ts';
import { logger } from '../utils/logger.ts';

export function createCommand(command: Command) {
  Bot.commands.set(command.name, command);
}

export const day: string = format(new Date(), 'HH:mm');

export async function setdbValue(id: string, data?: any): Promise<void> {
  const log = logger({ name: 'DB Manager' });
  log.info(`Attempting to add ${id}, ${data} value.`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  await table.create(id, data);
  log.info(`Crated DB values ${id}`);
}

export async function getdbValue(id: string): Promise<unknown> {
  const log = logger({ name: 'DB Manager' });
  log.info(`Attempting to get ${id}`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  log.info(`Fetched DB value ${id}`);
  return await table.get(id);
}

export async function dbHasValue(id: string): Promise<unknown> {
  const log = logger({ name: 'DB Manager' });
  log.info(`Has ${id} ???`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  log.info(`Done has ${id}`);
  return await table.has(id);
}

export async function dbValueDel(id: string) {
  const log = logger({ name: 'DB Manager' });
  log.info(`Deleting ${id} ...`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  await table.delete(id);
  log.info(`Deleted ${id}`);
}
