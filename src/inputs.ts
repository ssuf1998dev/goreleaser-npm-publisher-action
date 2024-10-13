import { getBooleanInput, getInput, getMultilineInput } from '@actions/core';
import { fmt } from './helpres';
import { Logger } from './logger';

interface InputOptions<T = string> {
  logger: Logger;
  name: string;
  defaultValue?: T;
}

const undefinedIfEmpty = (value: string | undefined): string | undefined => {
  return value && value?.length > 0 ? value : undefined;
};

export const string = ({
  name,
  logger,
  defaultValue,
}: InputOptions): string | undefined => {
  const value =
    undefinedIfEmpty(getInput(name, { trimWhitespace: true })) ?? defaultValue;
  logger.debug(fmt`Loading ${name}: ${value}`);

  return value;
};

export const boolean = ({
  name,
  logger,
}: Omit<InputOptions, 'defaultValue'>): boolean => {
  const value = getBooleanInput(name);
  logger.debug(fmt`Loading ${name}: ${value}`);

  return value;
};

export const stringArray = ({
  name,
  logger,
  defaultValue,
}: InputOptions<string[]>): string[] => {
  const value = (
    getMultilineInput(name, { trimWhitespace: true }) ??
    defaultValue ??
    []
  ).filter(undefinedIfEmpty);

  logger.debug(fmt`Loading ${name}: ${value}`);

  return value;
};
