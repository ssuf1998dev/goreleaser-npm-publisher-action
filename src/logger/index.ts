import { Logger, setLogger } from '@ssuf1998dev/goreleaser-npm-publisher';
import { GithubActionLogger } from './github-action-logger';

export const logger: Logger = new GithubActionLogger();

setLogger(logger);
