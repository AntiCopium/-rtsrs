// deno-lint-ignore-file
/**
 *
 * ! WORK IN PROGRESS (CURRENTLY WORKING)
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

async function CreateViolations() {
  await CreateTable('WarnViolations').then(() => {
    log.info('WarnViolations table created...');
  });
  await CreateTable('TimeoutViolations').then(() => {
    log.info('TimeoutViolations table created...');
  });
}
// CASE
export const WarnCase = new KwikTable(kwik, 'WarnCase');
export const TimeoutCase = new KwikTable(kwik, 'TimeoutCase');
// VIOLATIONS
export const WarnViolations = new KwikTable(kwik, 'WarnViolations');
export const TimeoutViolations = new KwikTable(kwik, 'TimeoutViolations');

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

export async function addWarnViolation(user: any) {
  if ((await dbHasValue(`${user}`, WarnViolations)) === false) {
    await setdbValue(`${user}`, WarnViolations, WarnCurrentCase);
  } else {
    let olddata: string = await getdbValue(`${user}`, WarnViolations);
    let newdata: string = olddata + '  |  ' + WarnCurrentCase;
    await dbChangeData(`${user}`, newdata, WarnViolations);
  }
}

export async function addTimeoutViolation(user: any) {
  if ((await dbHasValue(`${user}`, TimeoutViolations)) === false) {
    await setdbValue(`${user}`, TimeoutViolations, TimeoutCurrentCase);
  } else {
    let olddata: string = await getdbValue(`${user}`, TimeoutViolations);
    let newdata: string = olddata + '  |  ' + TimeoutCurrentCase;
    await dbChangeData(`${user}`, newdata, TimeoutViolations);
  }
}

export async function CheckWarnCurrentCase() {
  if ((await getdbValue('WarnCurrentCase', WarnCase)) === '[object Object]') {
    await dbChangeData('WarnCurrentCase', 0, WarnCase);
    console.log('Changed WarnCurrentCase to 0');
  }
}
export async function CheckTimeoutCurrentCase() {
  if (
    (await getdbValue('TimeoutCurrentCase', TimeoutCase)) === '[object Object]'
  ) {
    await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase);
    console.log('Changed TimeoutCurrentCase to 0');
  }
}

export async function initCase() {
  await CreateCases();
  await CheckWarnCurrentCase();
  await CheckTimeoutCurrentCase();
}

export async function initViolations() {
  await CreateViolations();
}
``;
