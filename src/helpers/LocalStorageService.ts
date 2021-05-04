import { GenericObject } from "../types/interfaces";

/**
 * Localstorage service for handling actions regarding the localstorage.
 */
class LocalStorageService {
  private static instance: LocalStorageService;
  constructor() {
    /* */
  }
  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }
  /**
   *
   * @param name Item's name
   * @param item The item.
   * @returns Promise<boolean>, true if OK. Throws the error if not.
   *
   * Item does not need to be stringified, this method will do it before placing it to localstorage.
   */
  public setItem(name: string, item: GenericObject): Promise<boolean> {
    return new Promise((res, rej) => {
      try {
        const stringifiedItem = JSON.stringify(item);
        window.localStorage.setItem(name, stringifiedItem);
        res(true);
      } catch (e) {
        rej(e);
      }
    });
  }
  /**
   *
   * @param name To be removed item's name
   * @returns Promise<boolean>, true if OK. Throws an error if not.
   *
   * Removes an item from the localstorage.
   */
  public removeItem(name: string): Promise<boolean> {
    return new Promise((res, rej) => {
      try {
        window.localStorage.removeItem(name);
        res(true);
      } catch (e) {
        rej(e);
      }
    });
  }
  /**
   *
   * @param name To be retrieved item's name
   * @returns Promise<any>, returns the item. Or throws an error if there was any.
   *
   * Attempts to retrieve item from the localstorage.
   */
  public retrieveItem(name: string): Promise<GenericObject> {
    return new Promise((res, rej) => {
      try {
        const item = window.localStorage.getItem(name);
        const parsedItem = JSON.parse(item);
        res(parsedItem);
      } catch (e) {
        rej(e);
      }
    });
  }
}

export default LocalStorageService;
