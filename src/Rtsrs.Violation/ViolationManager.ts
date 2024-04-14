// deno-lint-ignore-file

// CAPTHAT (LOOP) 2024

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

export enum CaseType {
  WarnCase,
  TimeoutCase,
  KickCase,
}
export enum ViolationType {
  WarnViolation,
  TimeoutViolation,
  KickViolation,
}
async function CreateCases() {
  await CreateTable('WarnCase').then(() => {
    log.info('WarnCase table created...');
  });
  await CreateTable('TimeoutCase').then(() => {
    log.info('TimeoutCase table created...');
  });
  await CreateTable('KickCase').then(() => {
    log.info('KickCase table created...');
  });
}

async function CreateViolations() {
  await CreateTable('WarnViolations').then(() => {
    log.info('WarnViolations table created...');
  });
  await CreateTable('TimeoutViolations').then(() => {
    log.info('TimeoutViolations table created...');
  });
  await CreateTable('KickViolations').then(() => {
    log.info('KickViolations table created...');
  });
}
// INIT CASES
export const WarnCase = new KwikTable(kwik, 'WarnCase');
export const TimeoutCase = new KwikTable(kwik, 'TimeoutCase');
export const KickCase = new KwikTable(kwik, 'KickCase');
// INIT VIOLATIONS
export const WarnViolations = new KwikTable(kwik, 'WarnViolations');
export const TimeoutViolations = new KwikTable(kwik, 'TimeoutViolations');
export const KickViolations = new KwikTable(kwik, 'KickViolations');
// CASE CURRENT CASE
export let WarnCurrentCase = await getdbValue('WarnCurrentCase', WarnCase);
export let KickCurrentCase = await getdbValue('KickCurrentCase', KickCase);
export let TimeoutCurrentCase = await getdbValue(
  'TimeoutCurrentCase',
  TimeoutCase
);

export async function addCase(data: string, table: CaseType) {
  if (table === CaseType.WarnCase) {
    if (typeof WarnCurrentCase === 'number') {
      WarnCurrentCase++;
      if ((await dbHasValue(WarnCurrentCase.toString(), WarnCase)) === false) {
        await setdbValue(WarnCurrentCase.toString(), WarnCase, data);
      }
    }

    await dbChangeData('WarnCurrentCase', WarnCurrentCase, WarnCase);
    console.log(
      (await getdbValue('WarnCurrentCase', WarnCase)) + ' > Warn Case'
    );
  }

  if (table === CaseType.TimeoutCase) {
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

  if (table === CaseType.KickCase) {
    if (typeof KickCurrentCase === 'number') {
      KickCurrentCase++;
      if ((await dbHasValue(KickCurrentCase.toString(), KickCase)) === false) {
        await setdbValue(KickCurrentCase.toString(), KickCase, data);
      }
    }

    await dbChangeData('KickCurrentCase', KickCurrentCase, KickCase);
    console.log(
      (await getdbValue('KickCurrentCase', KickCase)) + ' > Kick Case'
    );
  }
}

export async function addViolation(user: any, table: ViolationType) {
  if (table === ViolationType.WarnViolation) {
    if ((await dbHasValue(`${user}`, WarnViolations)) === false) {
      await setdbValue(`${user}`, WarnViolations, WarnCurrentCase);
    } else {
      let olddata: string = await getdbValue(`${user}`, WarnViolations);
      let newdata: string = olddata + '  |  ' + WarnCurrentCase;
      await dbChangeData(`${user}`, newdata, WarnViolations);
    }
  }
  if (table === ViolationType.TimeoutViolation) {
    if ((await dbHasValue(`${user}`, TimeoutViolations)) === false) {
      await setdbValue(`${user}`, TimeoutViolations, TimeoutCurrentCase);
    } else {
      let olddata: string = await getdbValue(`${user}`, TimeoutViolations);
      let newdata: string = olddata + '  |  ' + TimeoutCurrentCase;
      await dbChangeData(`${user}`, newdata, TimeoutViolations);
    }
  }
  if (table === ViolationType.KickViolation) {
    if ((await dbHasValue(`${user}`, KickViolations)) === false) {
      await setdbValue(`${user}`, KickViolations, KickCurrentCase);
    } else {
      let olddata: string = await getdbValue(`${user}`, KickViolations);
      let newdata: string = olddata + '  |  ' + KickCurrentCase;
      await dbChangeData(`${user}`, newdata, KickViolations);
    }
  }
}

export async function CheckCurrentCase(table: CaseType) {
  if (table === CaseType.WarnCase) {
    if ((await getdbValue('WarnCurrentCase', WarnCase)) === '[object Object]') {
      await dbChangeData('WarnCurrentCase', 0, WarnCase);
      console.log('Changed WarnCurrentCase to 0');
    }
  }
  if (table === CaseType.TimeoutCase) {
    if (
      (await getdbValue('TimeoutCurrentCase', TimeoutCase)) ===
      '[object Object]'
    ) {
      await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase);
      console.log('Changed TimeoutCurrentCase to 0');
    }
  }

  if (table === CaseType.KickCase) {
    if ((await getdbValue('KickCurrentCase', KickCase)) === '[object Object]') {
      await dbChangeData('KickCurrentCase', 0, KickCase);
      console.log('Changed KickCurrentCase to 0');
    }
  }
}

export async function initCase() {
  await CreateCases();
}

export async function initViolations() {
  await CreateViolations();
}
``;
