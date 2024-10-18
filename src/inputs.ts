import { getBooleanInput, getInput, getMultilineInput } from '@actions/core';
import { fmt } from './helpres';
import { Logger } from './logger';

interface InputOptions<T = string> {
  logger: Logger;
  name: string;
  defaultValue?: T;
}

type BooleanInputOptions = Omit<InputOptions<boolean>, 'defaultValue'>;

const undefinedIfEmpty = (value: string | undefined): string | undefined => {
  return value && value?.length > 0 ? value : undefined;
};

export const string = ({
  name,
  logger,
  defaultValue,
}: InputOptions): string | undefined => {
  const raw = getInput(name, { trimWhitespace: true });
  const value = undefinedIfEmpty(raw) ?? defaultValue;
  logger.debug(fmt`Loading ${name}: ${value}`);

  return value;
};

export const boolean = ({ name, logger }: BooleanInputOptions): boolean => {
  const value = getBooleanInput(name);
  logger.debug(fmt`Loading ${name}: ${value}`);

  return value;
};

export const stringArray = ({
  name,
  logger,
  defaultValue,
}: InputOptions<string[]>): string[] => {
  const raw = getMultilineInput(name, { trimWhitespace: true });
  const value = (raw ?? defaultValue ?? []).filter(undefinedIfEmpty);

  logger.debug(fmt`Loading ${name}: ${value}`);

  return value;
};
