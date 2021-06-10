/**
 * @description вызывает событие event на element 
 * @param {String} event 
 * @param {Node} element 
 */
export default (event, element) => {
  const evt = new Event(event);
  element.dispatchEvent(evt);
}