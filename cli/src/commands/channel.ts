import { Command } from 'commander';
import chalk from 'chalk';

export const channelCommand = new Command('channel')
  .description('Channel management')
  .addCommand(
    new Command('create')
      .description('Create new channel')
      .requiredOption('-n, --name <name>', 'Channel name')
      .requiredOption('-w, --workspace-id <workspaceId>', 'Workspace ID')
      .option('-p, --private', 'Make channel private')
      .action((options) => {
        console.log(chalk.green(`✓ Channel "${options.name}" created`));
      }),
  )
  .addCommand(
    new Command('list')
      .description('List channels')
      .requiredOption('-w, --workspace-id <workspaceId>', 'Workspace ID')
      .action(() => {
        console.log(chalk.green('✓ Channels listed'));
      }),
  );
