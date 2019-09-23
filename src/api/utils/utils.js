import {
  PRODUCT_STATUSES
} from "../../config/constants";
import {
  Types
} from 'mongoose';


/** newId
 * This method build an unique id´s with custom given prefix
 */
const newId = (prefix) => {
  return `${prefix}_${Types.ObjectId()}`
};

/** buildProductObject
 * This method should build a valid product schema 
 * @param {object} body should be taken from req object.
 */
const buildProductObject = (body) => {
  // TODO: set category
  return {
    id: body.id || newId('prod'),
    name: body.name,
    image: body.image,
    link: body.link,
    currentPrice: body.currentPrice,
    status: PRODUCT_STATUSES.UNPUBLISHED
  };
}

const buildSearchObject = (body) => {
  // TODO: set category
  // TODO: set vendor name
  // TODO: set brand
  // TODO: set attributes
  return {
    search_id: newId('search'),
    product_name: body.name,
    stats: 1
  }
}

module.exports = {
  buildProductObject,
  buildSearchObject
}