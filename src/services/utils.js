/**
 * Utility methods
 */

// create item
const createItem = (type, data, el = 'app') => {
  const MyComponent = Vue.extend(type)
  const component = new MyComponent({ propsData: data }).$mount()
  document.getElementById(el).appendChild(component.$el)
  return component
}

// delay promise
const wait = ms => {
  return (x) => {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  }
}

// reverse a string
const reverse = str => str.split("").reverse().join("")

export default { createItem, wait, reverse }
