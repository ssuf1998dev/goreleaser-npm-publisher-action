/**
 * The entrypoint for the action.
 */
import { setFailed } from '@actions/core';
import { run } from './main';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run().catch(setFailed);
