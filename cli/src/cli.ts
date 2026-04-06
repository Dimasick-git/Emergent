#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { userCommand } from './commands/user.js';
import { workspaceCommand } from './commands/workspace.js';
import { channelCommand } from './commands/channel.js';
import { messageCommand } from './commands/message.js';

const pkg = { version: '0.1.0' };

program
  .name('emergent')
  .description(chalk.cyan.bold('🚀 Emergent CLI - Private Messenger for Developers'))
  .version(pkg.version, '-v, --version');

// Commands
program.addCommand(userCommand);
program.addCommand(workspaceCommand);
program.addCommand(channelCommand);
program.addCommand(messageCommand);

program
  .command('init')
  .description('Initialize Emergent configuration')
  .action(() => {
    console.log(chalk.green('✓ Emergent initialized'));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
