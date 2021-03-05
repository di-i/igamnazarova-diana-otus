function maxItemAssociation(associations) {
    if (associations.length === 0) {
      return [];
    } else if (!Array.isArray(associations)) {
      return 'The argument must be an array.';
    }
  
    let dictionaryItemNeighbors = createDictionaryItemNeighbors(associations);
  
    let visitedItemsInDictionary = new Set();
    let maxListOfItems = [];
    for (let key of Object.keys(dictionaryItemNeighbors)) {
      let currentListOfItems = [];
      if (!visitedItemsInDictionary.has(key)) {
        createAssociatesList(key, dictionaryItemNeighbors, currentListOfItems, visitedItemsInDictionary);
        currentListOfItems.sort();
        if (!maxListOfItems.length) {
          maxListOfItems.push(...currentListOfItems);
        } else if (currentListOfItems.length > maxListOfItems.length) {
          maxListOfItems = currentListOfItems.slice();
        } else continue;
      }
    }
    return maxListOfItems;
  }
  
  const createDictionaryItemNeighbors = (array) => {
    let dictionary = {};
    for (let [firstItem, secondItem] of array) {
      if (firstItem == undefined || secondItem == undefined) return [];
      if (dictionary[firstItem] == undefined) dictionary[firstItem] = [];
      if (dictionary[secondItem] == undefined) dictionary[secondItem] = [];
      dictionary[firstItem].push(secondItem);
      dictionary[secondItem].push(firstItem);
    }
    return dictionary;
  };
  
  const createAssociatesList = (
    key,
    dictionaryItemNeighbors,
    currentListOfItems,
    visitedItemsInDictionary,
  ) => {
    if (!visitedItemsInDictionary.has(key)) {
      visitedItemsInDictionary.add(key);
      currentListOfItems.push(key);
      for (let neighbour of dictionaryItemNeighbors[key]) {
        if (visitedItemsInDictionary.has(neighbour)) continue;
        createAssociatesList(
          neighbour,
          dictionaryItemNeighbors,
          currentListOfItems,
          visitedItemsInDictionary,
        );
      }
    }
    return currentListOfItems;
  };
  
  module.exports = maxItemAssociation;
