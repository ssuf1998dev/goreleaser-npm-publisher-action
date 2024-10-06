import { debug, error, group, info, warning } from '@actions/core';

interface Logger {
  group<T>(name: string, fn: () => Promise<T>): Promise<T>;
  info(message: string): void;
  warning(message: string | Error): void;
  error(message: string | Error): void;
  debug(message: string): void;
}

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
