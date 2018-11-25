export default class ProductNameFormat {
  static getProductUrl(productName) {
    return productName.replace(/\s+/g, '-');
  }

  static getProductName(path) {
    return path.replace(/-/g, ' ');
  }
}
