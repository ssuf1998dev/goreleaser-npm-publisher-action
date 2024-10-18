import { setLogger } from 'goreleaser-npm-publisher';
import { GithubActionLogger, Logger } from './github-action-logger';

export const logger: Logger = new GithubActionLogger();

setLogger(logger);
