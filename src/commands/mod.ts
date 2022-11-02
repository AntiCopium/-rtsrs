import { Bot } from '../../rtsrs.ts';
import { Command } from '../types/commands.ts';
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';

export function createCommand(command: Command) {
  Bot.commands.set(command.name, command);
}

export const day: string = format(new Date(), 'HH:mm');
