import { Command } from 'commander';
import chalk from 'chalk';

export const workspaceCommand = new Command('workspace')
  .description('Workspace management')
  .addCommand(
    new Command('create')
      .description('Create new workspace')
      .requiredOption('-n, --name <name>', 'Workspace name')
      .option('-d, --description <description>', 'Workspace description')
      .action((options) => {
        console.log(chalk.green(`✓ Workspace "${options.name}" created`));
      }),
  )
  .addCommand(
    new Command('list')
      .description('List workspaces')
      .action(() => {
        console.log(chalk.green('✓ Workspaces listed'));
      }),
  );
