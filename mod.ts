import { startBot } from './deps.ts';
import { fileLoader, importDirectory } from './src/Rtsrs.Utils/loader.ts';
import { updateApplicationCommands } from './src/Rtsrs.Utils/updateCommands.ts';
// setup db
import { Bot } from './rtsrs.ts';
import { initCoin } from './src/Rtsrs.Currency/wallet.ts';
import './src/Rtsrs.Database/mod.ts';
import {
  initCase,
  initViolations,
} from './src/Rtsrs.Violation/ViolationManager.ts';


// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    './src/Rtsrs.Commands',
    './src/Rtsrs.Events',
    './src/Rtsrs.Currency'
    // "./src/Rtsrs.tasks",
  ].map((path) => importDirectory(Deno.realPathSync(path)))
);
await fileLoader();

// UPDATES YOUR COMMANDS TO LATEST COMMANDS
await updateApplicationCommands();

// MAKES CASE WORK
await initCase();
// MAKES VIOLATION WORK
await initViolations();
// STARTS CURRENCY
await initCoin();

// STARTS THE CONNECTION TO DISCORD
await startBot(Bot);
