import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  async setObject({ key, value }) {
    return await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async getObject(key) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async setItem({ key, value }) {
    return await Storage.set({ key, value });
  }

  async getItem(key) {
    return (await Storage.get({ key })).value;
  }

  async removeItem(key) {
    return await Storage.remove({ key });
  }

  async keys() {
    return await Storage.keys();
  }

  async clear() {
    return await Storage.clear();
  }
}
