import {
  ERRORS
} from '../config/constants';

module.exports.malformedRequest = (field, context) => {
  return {
    message: `error malformed request`,
    details: `validation error on field ${field}`,
    context: context
  }
}

module.exports.productNotFound = () => {
  return {
    message: ERRORS.ITEM_NOT_FOUND,
    details: `Id provided was not found in our records`,
  }
}

module.exports.couldNotSave = () => {
  return {
    message: ERRORS.COULD_NOT_SAVE_PRODUCT,
    details: `Cannot save product object, try again later`,
  }
}