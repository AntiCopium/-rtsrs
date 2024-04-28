// deno-lint-ignore-file
import { KwikTable } from "https://deno.land/x/kwik@v1.3.1/table.ts";
import * as db from "../Rtsrs.Database/mod.ts";
import log from "../Rtsrs.Utils/logger.ts";

export enum InventoryItems {
  Nail = "Nail",
  Cards = "Cards",
  Keys = "Keys",
  Gun = "Gun",
  Knife = "Knife",
  Tape = "Tape",
  Lock = "Lock",
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

export async function readInventory(
  user: string,
): Promise<Map<InventoryItems, number>> {
  const decoder = new TextDecoder("utf-8");
  const inv = new Map<InventoryItems, number>();
  const file = decoder.decode(
    await Deno.readFile(
      `db/UserInvetory/${user.split("n").join("")}.kwik`,
    ),
  );
  const lines = file.split("\n");
  for (const line of lines) {
    const [item, amount] = line.split(" | ");
    inv.set(stringToInventoryItem(item), parseInt(amount));
  }

  return inv;
}

export const UserInvetory = new KwikTable(db.kwik, "UserInvetory");

export async function getInventory(
  user: string,
): Promise<Map<InventoryItems, number>> {
  if ((await db.dbHasValue(user, UserInvetory)) === false) {
    await db.setdbValue(
      user.toString(),
      UserInvetory,
    );
  }
  return await readInventory(user);
}

// function that appends the db file with an item and its amount in the inventory

export async function addItemToInventory(
  user: any,
  item: InventoryItems,
  amount: any,
): Promise<void> {
  if ((await db.dbHasValue(`${user}`, UserInvetory)) === false) {
    await db.setdbValue(`${user}`, UserInvetory);
  } else {
    const olddata: string = await db.getdbValue(`${user}`, UserInvetory);
    const newdata: string = olddata + "\n" + inventoryFormat(item, amount);
    await db.dbChangeData(`${user}`, newdata, UserInvetory);
  }
}

export async function initInventory() {
  await db.CreateTable("UserInvetory").then(() => {
    log.info("UserInvetory table created...");
  });
}
