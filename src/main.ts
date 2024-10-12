import { getBooleanInput, getInput, getMultilineInput } from '@actions/core';
import { publish, setLogger } from 'goreleaser-npm-publisher';
import { cwd } from 'node:process';
import { GithubActionLogger } from './logger';

export async function run(): Promise<void> {
  const logger = new GithubActionLogger();
  logger.debug(`Running publishing...`);

  setLogger(new GithubActionLogger());
  logger.debug(`Setup Github Action Logger`);

  const project = getInput('project') ?? cwd();
  logger.debug(`Loading project: ${project ?? 'N/A'}`);

  const builder = getInput('builder');
  logger.debug(`Loading builder: ${builder ?? 'N/A'}`);

  const clear = getInput('clear') ?? false;
  logger.debug(`Loading clear parameter: ${clear}`);

  const prefix = getInput('prefix');
  logger.debug(`Loading prefix: ${prefix ?? 'N/A'}`);

  const description = getInput('description');
  logger.debug(`Loading description: ${description ?? 'N/A'}`);

  const files = getMultilineInput('files') ?? ['readme.md', 'license'];
  logger.debug(`Loading files : ${files ?? 'N/A'}`);

  const token = getInput('token');
  logger.debug(`Loading token: ${token ?? 'N/A'}`);

  await publish({
    project,
    builder,
    clear,
    prefix,
    description,
    files,
    token,
  });

  logger.debug('Finished publishing');
}
