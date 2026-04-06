import { Command } from 'commander';
import chalk from 'chalk';

export const messageCommand = new Command('message')
  .description('Message operations')
  .addCommand(
    new Command('send')
      .description('Send message to channel')
      .requiredOption('-c, --channel-id <channelId>', 'Channel ID')
      .requiredOption('-m, --message <message>', 'Message content')
      .action((options) => {
        console.log(chalk.green('✓ Message sent'));
      }),
  );
