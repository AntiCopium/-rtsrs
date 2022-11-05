import { KwikTable } from 'https://deno.land/x/kwik@v1.3.1/table.ts';
import { Kwik, KwikDecode, KwikEncode } from '../../deps.ts';
import { logger } from '../utils/logger.ts';

const log = logger({ name: 'DB Manager' });

log.info('Initializing Database');

export const kwik = new Kwik();

// Add BigInt Support
kwik.msgpackExtensionCodec.register({
  type: 0,
  encode: (object: unknown): Uint8Array | null => {
    if (typeof object === 'bigint') {
      if (
        object <= Number.MAX_SAFE_INTEGER &&
        object >= Number.MIN_SAFE_INTEGER
      ) {
        return KwikEncode(parseInt(object.toString(), 10), {});
      } else {
        return KwikEncode(object.toString(), {});
      }
    } else {
      return null;
    }
  },
  decode: (data: Uint8Array) => {
    return BigInt(KwikDecode(data, {}) as string);
  },
});

// Initialize the Database
await kwik.init();

// await table.set('testsss');
// await table.create('YH', 'Hello');
// await table.create('YY', 'Hello');
// console.log(await table.has('test'));
// const test = await table.get('YH');
// console.log(test);

/**
 * Creates a table (DONT USE ON EXEUCAION)
 * @param table
 * @constructor
 */
export async function CreateTable(table: string) {
  try {
    await Deno.mkdir(`C:\\Users\\Owner\\Desktop\\!rtsrs\\db\\${table}`);
    await new KwikTable(kwik, table);
  } catch (e) {
    const log = logger({ name: 'DB Manager' });
    log.warn(e);
  }
}

/**
 * Sets a DB VALUE
 * @async
 * @param id
 * @param table
 * @param data
 */
export async function setdbValue(
  id: string,
  table: KwikTable<any>,
  data?: any
): Promise<void> {
  const log = logger({ name: 'DB Manager' });
  log.info(`Attempting to add ${id}, ${data} value.`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  await table.create(id, data);
  log.info(`Created DB values ${id}`);
}

// HOW TO CREATE A TABLE
// CreateTable('Hus').then(() => {
//   const log = logger({ name: 'DB Manager' });
//   log.info('Made new Table')
// });const Hus = new KwikTable(kwik, 'Hus')

/**
 * Gets the data of a db value
 * @param id
 * @param table
 */
export async function getdbValue(
  id: string,
  table: KwikTable<any>
): Promise<any> {
  const log = logger({ name: 'DB Manager' });
  log.info(`Attempting to get ${id}`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  log.info(`Fetched DB value ${id}`);
  return await table.get(id);
}

/**
 * Check if DB has value
 * @param id
 * @param table
 */
export async function dbHasValue(
  id: string,
  table: KwikTable<any>
): Promise<unknown> {
  const log = logger({ name: 'DB Manager' });
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  if ((await table.has(id)) === true) {
    log.info(`${id} => TRUE`);
  } else {
    log.info(`${id} => FALSE`);
  }
  return await table.has(id);
}

/**
 * DB deletes a value
 * @param id
 * @param table
 */
export async function dbDel(id: string, table: KwikTable<any>) {
  const log = logger({ name: 'DB Manager' });
  log.info(`Deleting ${id} ...`);
  if (id === undefined) {
    log.error('NO ID SPECIFIED');
    return;
  }
  await table.delete(id);
  log.info(`Deleted ${id}`);
}

/**
 * changes a db data
 * @param id
 * @param data
 * @param table
 */
export async function dbChangeData(
  id: string,
  data: any,
  table: KwikTable<any>
) {
  const log = logger({ name: 'DB Manager' });

  if (id && data === undefined) return;

  log.info(`Changing ${id} ...`);
  await dbDel(id, table);
  await setdbValue(id, table, data);
}
/**
 * updates db data id
 * @param id
 * @param data
 * @param table
 */
export async function updatedbData(
  id: string,
  data: any,
  table: KwikTable<any>
): Promise<void> {
  const log = logger({ name: 'DB Manager' });
  if (id && data && table === undefined) return;
  log.info(`Updating ${id} ... with ${data}`);
  await table.update(id, data);
  log.info(`Updated ${id}`);
  console.log(await getdbValue(id, table))
}

log.info('Database Initialized!');
