import { assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import { dbChangeData, dbHasValue } from "./src/Rtsrs.Database/mod.ts";
import { KickCase, TimeoutCase, WarnCase } from "./src/Rtsrs.Violation/ViolationManager.ts";

Deno.test({
  name: "Case Check",
  async fn() {
    assertEquals(await dbHasValue("0", TimeoutCase), await dbHasValue("0", TimeoutCase));
    assertEquals(await dbHasValue("0", WarnCase), await dbHasValue("0", WarnCase));
    assertEquals(await dbHasValue("0", KickCase), await dbHasValue("0", KickCase));
  },
 });

 Deno.test({
  name: "resetcase check",
  async fn() {
    assertEquals(await dbChangeData('WarnCurrentCase', 0, WarnCase), await dbChangeData('WarnCurrentCase', 0, WarnCase))
    assertEquals(await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase), await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase))
    assertEquals(await dbChangeData('KickCurrentCase', 0, KickCase),await dbChangeData('KickCurrentCase', 0, KickCase))
  },
 });


//  await dbChangeData('WarnCurrentCase', 0, WarnCase);
//  await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase);
//  await dbChangeData('KickCurrentCase', 0, KickCase);