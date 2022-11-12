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
  setdbValue
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
export let TimeoutCurrentCase: number;

export async function addWarnCase() {
  if (typeof WarnCurrentCase  === 'number') {
    WarnCurrentCase++;
  }
  await dbChangeData('WarnCurrentCase', WarnCurrentCase, WarnCase);
  console.log(WarnCurrentCase);
}


export async function addTimeoutCase() {
  if (
    typeof (await getdbValue('TimeoutCurrentCase', TimeoutCase)) != 'number'
  ) {
    setdbValue('TimeoutCurrentCase', TimeoutCase, 0);
  } else {
    TimeoutCurrentCase++;
  }

  await dbChangeData('TimeoutCurrentCase', WarnCurrentCase, TimeoutCase);
}

export async function CheckWarnCurrentCase() {
  if (typeof (await getdbValue('WarnCurrentCase', WarnCase)) === 'number') {
    if ((await getdbValue('WarnCurrentCase', WarnCase)) < 0) {
      await dbChangeData('WarnCurrentCase', 0, WarnCase);
      console.log('CheckWarnCurrentCase checked... (Set to Zero)');
    } else {
      await setdbValue('WarnCurrentCase', WarnCase, 0);
    }
  }
}

export async function initCase() {
  await CreateCases();
  await CheckWarnCurrentCase();
}
``;
