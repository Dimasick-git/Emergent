import { Command } from 'commander';
import chalk from 'chalk';

export const userCommand = new Command('user')
  .description('User management')
  .addCommand(
    new Command('create')
      .description('Create new user')
      .requiredOption('-e, --email <email>', 'User email')
      .requiredOption('-u, --username <username>', 'Username')
      .requiredOption('-p, --password <password>', 'Password')
      .action((options) => {
        console.log(chalk.green(`✓ User ${options.email} created successfully`));
      }),
  )
  .addCommand(
    new Command('list')
      .description('List all users')
      .action(() => {
        console.log(chalk.green('✓ Users listed'));
      }),
  );
