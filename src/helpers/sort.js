export default class SortProducts {
  static sorting(products, appliedSort) {
    switch(appliedSort) {
      case 'A-Z':
        return products.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      case 'Z-A':
        return products.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      case 'Price low to hgigh':
        return products.sort((a, b) => {
          return a.price - b.price
        });
      case 'Price high to low':
        return products.sort((a, b) => {
          return b.price - a.price
        });
    }
  }
}
