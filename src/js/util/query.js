/* 
  This module emulates database functionality with local storage and JSON.
  Returns tables as objects consisting of a list of entries.

  There are two 'tables':
  products is the product data, taken from a JSON file.
  cart is the shopping cart data, taken from (and written to) local storage.
*/

import productDataJSON from "../../products.json";

// UTILITY FUNCTIONS

// Utility function for product data access.
// Rather than a table with one element, it just returns the element.
// SELECT * FROM products WHERE product.id = id
export function getProduct(id) {
  const numId = parseInt(id, 10);
  for (let i = 0; i < productDataJSON.length; i += 1) {
    if (productDataJSON[i].id === numId) return productDataJSON[i];
  }
  return null;
}

// Creates an empty cart.
function createEmptyCart() {
  return {
    productList: [],
  };
}

// Reads the cart from local storage and parses it, or creates
// an empty cart if no cart currently exists.
function getCartTable() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : createEmptyCart();
}

// Writes a cart into local storage.
function setCartTable(cartTable) {
  localStorage.setItem("cart", JSON.stringify(cartTable));
}

// Utility function to return the number of available products.
export function numOfProducts() {
  return productDataJSON.length;
}

// Returns the number of different products in the shopping cart.
export function cartSize() {
  return getCartTable().productList.length;
}

// Getter for the full product data table to expose to the outside world.
export function getProductData() {
  return productDataJSON;
}

// Getter for the pure cart data (without product data).
export function getCartData() {
  return getCartTable().productList;
}

// QUERIES

// INSERT INTO cart
// VALUES { newEntry }
// newEntry is given as an object. It is assumed to have the correct structure.
export function insertEntry(newEntry) {
  const cartTable = getCartTable();
  cartTable.productList.push(newEntry);
  setCartTable(cartTable);
}

// DELETE FROM cart WHERE deleteCondition
// Returns a boolean indicating whether anything was deleted.
export function deleteEntry(deleteCondition) {
  const cartTable = getCartTable();
  const newProductList = cartTable.productList.filter(
    (e) => !deleteCondition(e)
  );
  if (newProductList.length !== cartTable.productList.length) {
    cartTable.productList = newProductList;
    setCartTable(cartTable);
    return true;
  }
  return false;
}

// UPDATE cart
// SET updateEntry
// WHERE selectCondition
// Here, updateEntry is a procedure working on entries and select is a predicate.
// Also returns a boolean indicating whether at least one entry was updated.
export function update(updateEntry, selectCondition) {
  const cartTable = getCartTable();
  // Computes a list of cart entries fulfilling the given select condition
  const queryResult = cartTable.productList.filter(selectCondition);
  // I THINK that's going to mutate the cart table's product list, too.
  if (queryResult.length !== 0) {
    queryResult.forEach(updateEntry);
    setCartTable(cartTable);
    return true;
  }
  return false;
}

// SELECT attrs
// FROM cart INNER JOIN products ON cart.id = products.id
// Also flattens the variants.
function joinCartAndProductData() {
  const joinedTable = [];
  getCartTable().productList.forEach((cartProduct) => {
    // TODO: Inefficient (quadratic in size of cart).
    // Instead, filter product data by id once and index efficiently?
    const fullProductData = getProduct(cartProduct.id);
    const { variants } = fullProductData;

    for (let i = 0; i < variants.length; i += 1) {
      const variant = variants[i];
      if (variant.variantName === cartProduct.variantName) {
        joinedTable.push({
          id: cartProduct.id,
          productName: fullProductData.productName,
          description: fullProductData.description,
          properties: fullProductData.properties,
          variantName: variant.variantName,
          price: variant.price,
          weight: variant.weight,
          amount: cartProduct.amount,
        });
        break;
      }
    }
  });
  return joinedTable;
}

// Selects a subset of attributes from an object and returns a new object with
// those attributes.
// If attrs is empty, all attributes will be selected, meaning the
// new object is a (shallow) copy of entry.
function selectAttributes(entry, attrs) {
  let obj = {};

  if (attrs.length > 0) {
    // Select a subset of attributes
    attrs.forEach((attr) => {
      obj[attr] = entry[attr];
    });
  }
  // Select all available attributes
  else {
    obj = { ...entry };
  }
  return obj;
}

// SELECT attrs
// FROM cart INNER JOIN products ON cart.id = products.id
// WHERE selectCondition
// If attrs is empty, it is interpreted as * (all attributes).
// If select is not specified, everything will be selected.
export function read(attrs = [], selectCondition = () => true) {
  return joinCartAndProductData()
    .filter(selectCondition)
    .map((entry) => selectAttributes(entry, attrs));
}

// SELECT attrs FROM cart WHERE selectCondition
export function readCart(attrs = [], selectCondition = () => true) {
  return getCartTable()
    .productList.filter(selectCondition)
    .map((entry) => selectAttributes(entry, attrs));
}
