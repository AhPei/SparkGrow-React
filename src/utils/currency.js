const threeDecimal = /^\d+(?=\.)(\.\d{3,})?$/;
const oneDecimal = /^\d+(?=\.)(\.\d{1})?$/;

// String.prototype.replaceAt = function (index, replacement) {
//   if (index >= this.length) return this.valueOf();
//   return this.substring(0, index) + replacement + this.substring(index + 1);
// };

Object.defineProperty(String.prototype, "replaceAt", {
  value: function (index, replacement) {
    if (index >= this.length) return this.valueOf();
    return this.substring(0, index) + replacement + this.substring(index + 1);
  },
});

Object.defineProperty(String.prototype, "toCurrency", {
  value: function () {
    // Remove comma
    let price = this.replace(/,/g, "");
  
    // Move the dot
    [...price].forEach((value, idx) => {
      // Right to Left
      if (value === "." && threeDecimal.test(price)) {
        price = price.replaceAt(idx, [...price][idx + 1]);
        price = price.replaceAt(idx + 1, ".");
      }
      // Left to Right
      else if (value === "." && oneDecimal.test(price)) {
        price = price.replaceAt(idx, [...price][idx - 1]);
        price = price.replaceAt(idx - 1, ".");
      }
    });
    // First number will start on the last
    const cur = Number(price);
    if (cur === 0) return "0.00";
    if (/^[\d]?$/g.test(price)) return (price /= 100);
  
    // Add comma and fixed two decimal
    price = cur.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return price;
  },
});

// String.prototype.toCurrency = function () {
//   // Remove comma
//   let price = this.replace(/,/g, "");

//   // Move the dot
//   [...price].forEach((value, idx) => {
//     // Right to Left
//     if (value === "." && threeDecimal.test(price)) {
//       price = price.replaceAt(idx, [...price][idx + 1]);
//       price = price.replaceAt(idx + 1, ".");
//     }
//     // Left to Right
//     else if (value === "." && oneDecimal.test(price)) {
//       price = price.replaceAt(idx, [...price][idx - 1]);
//       price = price.replaceAt(idx - 1, ".");
//     }
//   });
//   // First number will start on the last
//   const cur = Number(price);
//   if (cur === 0) return "0.00";
//   if (/^[\d]?$/g.test(price)) return (price /= 100);

//   // Add comma and fixed two decimal
//   price = cur.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return price;
// };

// const currency = (price) => {
//   // Remove comma
//   price = price.replace(/\,/g, "");

//   // // Prevent invalid character
//   // if (price === "") return onChange((0).toFixed(2));

//   // Move the dot
//   [...price].forEach((value, idx) => {
//     // Right to Left
//     if (value === "." && threeDecimal.test(price)) {
//       price = price.replaceAt(idx, [...price][idx + 1]);
//       price = price.replaceAt(idx + 1, ".");
//     }
//     // Left to Right
//     else if (value === "." && oneDecimal.test(price)) {
//       price = price.replaceAt(idx, [...price][idx - 1]);
//       price = price.replaceAt(idx - 1, ".");
//     }
//   });

//   // First number will start on the last
//   const cur = Number(price);
//   if (/^[\d]?$/g.test(price))
//     return (price /= 100);

//   // Add comma and fixed two decimal
//   price = cur.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return price
// };

// export default currency;
