/* 
  This module provides functions to set and modify attributes of HTML or SVG
  elements given as strings.
*/

/*
  Modifies an attribute in an HTML (or SVG) element given as a string
  by applying the given function to the current value of the attribute.
  Returns the HTML as a string with the modified attribute or the unmodified
  string if the attribute is not set.
*/
export function modifyAttribute(htmlStr, attr, modify) {
  const regExp = new RegExp(`(${attr}=")([\\w ]*)(")`);
  const fun = (_match, _attr, val) => {
    return `${attr}="${modify(val)}"`;
  };
  return htmlStr.replace(regExp, fun);
}

// Sets an attribute in an HTML (or SVG) element given as a string.
export function setAttribute(htmlStr, attr, newVal) {
  const res = modifyAttribute(htmlStr, attr, () => newVal);
  if (res !== htmlStr) {
    return res;
  }

  // The attribute is not set, so it is inserted into the opening tag.
  const regExp = /<\w* /;
  return htmlStr.replace(regExp, (match) => `${match}${attr}="${newVal}" `);
}

export function removeAttribute(htmlStr, attr) {
  const regExp = new RegExp(`(${attr}=")([\\w ]*)(")`);
  return htmlStr.replace(regExp, "");
}

// SVG string utility functions

export function setSVGSize(svgStr, width, height) {
  let modSVG = setAttribute(svgStr, "width", width);
  modSVG = setAttribute(modSVG, "height", height);
  return modSVG;
}

// Scales an SVG given as a string by a factor of lambda.
export function scaleSVG(svgStr, lambda) {
  const scaleFun = (dimStr) => parseInt(dimStr, 10) * lambda;
  let modSVG = modifyAttribute(svgStr, "width", scaleFun);
  modSVG = modifyAttribute(modSVG, "height", scaleFun);
  return modSVG;
}
