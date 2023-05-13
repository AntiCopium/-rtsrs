// deno-lint-ignore-file
import { KwikTable } from 'https://deno.land/x/kwik@v1.3.1/table.ts';
import * as db from '../Rtsrs.Database/mod.ts';
import log from "../Rtsrs.Utils/logger.ts";

export const UserCurrencyWallet = new KwikTable(db.kwik, 'UserCurrencyWallet');

export async function getBalance(user: bigint): Promise<number> {
  if ((await db.dbHasValue(user.toString(), UserCurrencyWallet)) === false) {
    await db.setdbValue(user.toString(), UserCurrencyWallet, 0);
  }
  return await db.getdbValue(user.toString(), UserCurrencyWallet);
}

export async function addToUserBalance(user: any, amount: any) {
  if ((await db.dbHasValue(user.toString(), UserCurrencyWallet)) === false) {
    await db.setdbValue(user.toString(), UserCurrencyWallet, 0);
  }

  const oldBal: number = await db.getdbValue(
    user.toString(),
    UserCurrencyWallet
  );
  const newBal: number = oldBal + amount;
  await db.dbChangeData(user.toString(), newBal, UserCurrencyWallet);
  return newBal;
}

export async function initCoin() {
  await db.CreateTable('UserCurrencyWallet').then(() => {
    log.info('UserCurrencyWallet table created...');
  });
}
