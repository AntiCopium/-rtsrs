import { startBot } from './deps.ts';
import { fileLoader, importDirectory } from './src/Rtsrs.Utils/loader.ts';
import log from './src/Rtsrs.Utils/logger.ts';
import { updateApplicationCommands } from './src/Rtsrs.Utils/updateCommands.ts';
// setup db
import { Bot } from './rtsrs.ts';
import './src/Rtsrs.Database/mod.ts';
import { initCase } from './src/Rtsrs.Violation/Case.ts';

log.info('Starting bot...');

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    './src/Rtsrs.Commands',
    './src/Rtsrs.Events',
    // "./src/Rtsrs.tasks",
  ].map((path) => importDirectory(Deno.realPathSync(path)))
);
await fileLoader();

// UPDATES YOUR COMMANDS TO LATEST COMMANDS
await updateApplicationCommands();

// MAKES CASE WORKS
await initCase();

// STARTS THE CONNECTION TO DISCORD
await startBot(Bot);
