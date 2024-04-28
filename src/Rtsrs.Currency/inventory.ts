// deno-lint-ignore-file
import { KwikTable } from "https://deno.land/x/kwik@v1.3.1/table.ts";
import * as db from "../Rtsrs.Database/mod.ts";
import log from "../Rtsrs.Utils/logger.ts";

export const UserInventory = new KwikTable(db.kwik, "UserInventory");

export enum InventoryItems {
  Nail = "Nail",
  Cards = "Cards",
  Keys = "Keys",
  Gun = "Gun",
  Knife = "Knife",
  Tape = "Tape",
  Lock = "Lock",
}

export function inventoryItemToString(
  item: InventoryItems,
): string {
  switch (item) {
    case InventoryItems.Nail:
      return "Nail";
    case InventoryItems.Cards:
      return "Cards";
    case InventoryItems.Keys:
      return "Keys";
    case InventoryItems.Gun:
      return "Gun";
    case InventoryItems.Knife:
      return "Knife";
    case InventoryItems.Tape:
      return "Tape";
    case InventoryItems.Lock:
      return "Lock";
    default:
      return "Nail";
  }
}

export function stringToInventoryItem(
  str: any,
): InventoryItems {
  switch (str) {
    case "Nail":
      return InventoryItems.Nail;
    case "Cards":
      return InventoryItems.Cards;
    case "Keys":
      return InventoryItems.Keys;
    case "Gun":
      return InventoryItems.Gun;
    case "Knife":
      return InventoryItems.Knife;
    case "Tape":
      return InventoryItems.Tape;
    case "Lock":
      return InventoryItems.Lock;
    default:
      return InventoryItems.Nail;
  }
}

export function inventoryFormat(item: InventoryItems, amount: number) {
  return `${item} | ${amount}`;
}

export async function createNewInventory(user: any) {
  if ((await db.dbHasValue(user.toString(), UserInventory)) === true) {
    return;
  }
  await db.setdbValue(
    user.toString(),
    UserInventory,
    "yess king \nNail | 0\nCards | 0\nKeys | 0\nGun | 0\nKnife | 0\nTape | 0\nLock | 0",
  );
}

export async function readInventory(
  user: any,
): Promise<Map<InventoryItems, number>> {
  if ((await db.dbHasValue(user.toString(), UserInventory)) === false) {
    await createNewInventory(user);
  }
  const inv = new Map<InventoryItems, number>();
  const userInv = await db.getdbValue(user.toString(), UserInventory);
  // Remove the first line
  const lines = userInv.substring(userInv.indexOf("\n") + 1).split("\n");

  for (const line of lines) {
    const [item, amount] = line.split(" | ");
    inv.set(stringToInventoryItem(item), parseInt(amount));
  }
  return inv;
}

export async function addToInventory(
  user: any,
  item: InventoryItems,
  amount: any,
) {
  if ((await db.dbHasValue(user.toString(), UserInventory)) === false) {
    await createNewInventory(user);
  }

  user = user.toString();

  const myInv = new Map<InventoryItems, number>();

  const oldData = await db.getdbValue(user, UserInventory);

  const lines = oldData.substring(oldData.indexOf("\n") + 1).split("\n");

  for (const line of lines) {
    const [oldItem, oldAmount] = line.split(" | ");
    myInv.set(stringToInventoryItem(oldItem), parseInt(oldAmount));
  }

  myInv.set(item, amount);

  // map into string key | value
  const newData = "yess kng\n" +
    Array.from(myInv.entries()).map(([key, value]) =>
      `${inventoryItemToString(key)} | ${value}`
    ).join("\n");

  await db.dbChangeData(user, newData.toString(), UserInventory);
}

export async function initInventory() {
  await db.CreateTable("UserInventory").then(() => {
    log.info("UserInventory table created...");
  });
}
