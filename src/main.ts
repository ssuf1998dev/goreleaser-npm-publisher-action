import { publish, setLogger } from 'goreleaser-npm-publisher';
import { cwd } from 'node:process';
import { boolean, string, stringArray } from './inputs';
import { GithubActionLogger } from './logger';

export async function run(): Promise<void> {
  const logger = new GithubActionLogger();

  logger.debug(`Running publishing...`);
  logger.info('Test iteration 2.');

  setLogger(new GithubActionLogger());
  logger.debug(`Setup Github Action Logger`);

  await publish({
    project: string({ name: 'project', defaultValue: cwd(), logger }),
    builder: string({ name: 'project', logger }),
    clear: boolean({ name: 'clear', logger }),
    prefix: string({ name: 'prefix', logger }),
    description: string({ name: 'description', logger }),
    files: stringArray({
      name: 'files',
      logger,
      defaultValue: ['readme.md', 'license'],
    }),
    token: string({ name: 'token', logger }),
  });

  logger.debug('Finished publishing');
}
