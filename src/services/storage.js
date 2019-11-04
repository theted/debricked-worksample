/**
 * Minimal localStorage module
 */

const Store = window.localStorage

export default class Storage {
  /**
   * Get value from localStorage
   * @param {string} key
   * @returns {string} value
   */
  get(key) {
    return Store.getItem(key)
  }

  /**
   * Get JSON
   * @param {string} key
   * @returns {JSON} data
   */
  getJSON(key) {
    return JSON.parse(this.get(key))
  }

  /**
   * Set/update localStorage value
   * @param {string} key
   * @param {string} val
   */
  set(key, val) {
    Store.setItem(key, val)
  }

  /**
   * Set/update JSON
   * @param {String} key
   * @param {Object} data
   */
  setJSON(key, val) {
    return this.set(key, JSON.stringify(val))
  }

  /**
   * Remove key from localStorage
   * @param {string} key
   */
  remove(key) {
    Store.removeItem(key)
  }
}
