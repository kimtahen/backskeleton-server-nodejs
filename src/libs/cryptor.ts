import * as crypto from 'crypto';
import 'dotenv/config';

export class Cryptor {
  private HASING_KEY = process.env.HASHING_KEY;
  private ALGORITHM = 'sha1';

  public async encrypt(payload: string): Promise<string> {
    return crypto.createHmac(this.ALGORITHM, this.HASING_KEY).update(payload).digest('base64');
  }

  public async decrypt() {

  }
}
