import { debug, error, group, info, warning } from '@actions/core';
import { Logger } from '@ssuf1998dev/goreleaser-npm-publisher';

export class GithubActionLogger implements Logger {
  async group<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return group(name, fn);
  }

  info(message: string): void {
    info(message);
  }

  warning(message: string | Error): void {
    warning(message);
  }

  error(message: string | Error): void {
    error(message);
  }

  debug(message: string): void {
    debug(message);
  }
}
