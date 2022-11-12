// deno-lint-ignore-file
/**
 *
 * ! WORK IN PROGRESS (CURRENTLY UNWORKING)
 *
 *
 * This is a a manager for cases;
 * Instead of the casses going in the file this is more organized and with init when bot started
 * This will fix all setup issues and make an more organised workspace.
 *
 * ~ CAPTHAT
 */

import { KwikTable } from 'https://deno.land/x/kwik@v1.3.1/table.ts';
import {
  CreateTable,
  dbChangeData,
  dbHasValue,
  getdbValue,
  kwik,
  setdbValue,
} from '../Rtsrs.Database/mod.ts';
import { log } from '../Rtsrs.Utils/logger.ts';

export enum _CaseType {
  WarnCase,
  TimeoutCase,
}

export type Case = {
  type: _CaseType;
  table: KwikTable<any>;
};

async function CreateCases() {
  await CreateTable('WarnCase').then(() => {
    log.info('WarnCase table created...');
  });
  await CreateTable('TimeoutCase').then(() => {
    log.info('TimeoutCase table created...');
  });
}

export const WarnCase = new KwikTable(kwik, 'WarnCase');
export const TimeoutCase = new KwikTable(kwik, 'TimeoutCase');
export let WarnCurrentCase = await getdbValue('WarnCurrentCase', WarnCase);
export let TimeoutCurrentCase = await getdbValue(
  'TimeoutCurrentCase',
  TimeoutCase
);

export async function addWarnCase(data: string) {
  if (typeof WarnCurrentCase === 'number') {
    WarnCurrentCase++;
    if ((await dbHasValue(WarnCurrentCase.toString(), WarnCase)) === false) {
      await setdbValue(WarnCurrentCase.toString(), WarnCase, data);
    }
  }

  await dbChangeData('WarnCurrentCase', WarnCurrentCase, WarnCase);
  console.log((await getdbValue('WarnCurrentCase', WarnCase)) + ' > Warn Case');
}

export async function addTimeoutCase(data: string) {
  if (typeof TimeoutCurrentCase === 'number') {
    TimeoutCurrentCase++;
    if (
      (await dbHasValue(TimeoutCurrentCase.toString(), TimeoutCase)) === false
    ) {
      await setdbValue(TimeoutCurrentCase.toString(), TimeoutCase, data);
    }
  }

  await dbChangeData('TimeoutCurrentCase', TimeoutCurrentCase, TimeoutCase);
  console.log(
    (await getdbValue('TimeoutCurrentCase', TimeoutCase)) + ' > Timeout Case'
  );
}

export async function CheckWarnCurrentCase() {
  if (typeof WarnCurrentCase !== 'number') {
    await dbChangeData('WarnCurrentCase', 0, WarnCase);
    console.log('Changed WarnCurrentCase to 0');
  }
}

export async function initCase() {
  await CreateCases();
  await CheckWarnCurrentCase();
}
``;
