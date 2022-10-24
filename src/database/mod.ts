import { Kwik, KwikDecode, KwikEncode } from '../../deps.ts';
import { logger } from '../utils/logger.ts';
import { KwikTable } from 'https://deno.land/x/kwik@v1.3.1/table.ts';

const log = logger({ name: 'DB Manager' });

log.info('Initializing Database');

const kwik = new Kwik();
export const table = new KwikTable(kwik, 'table');

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

log.info('Database Initialized!');
