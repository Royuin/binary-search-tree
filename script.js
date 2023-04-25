function nodeFactory(value) {
  return { value, left: null, right: null };
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function merge(left, right) {
  let arr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function mergeSort(array) {
  let uniqueArray = array.filter(onlyUnique);

  const half = uniqueArray.length / 2;

  if (uniqueArray.length < 2) {
    return uniqueArray;
  }

  const left = uniqueArray.splice(0, half);
  return merge(mergeSort(left), mergeSort(uniqueArray));
}

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  // let root = array[Math.floor((start + end) / 2)];
  let mid = Math.floor((start + end) / 2);

  let node = nodeFactory(array[mid]);

  node.left = buildTree(array, start, mid - 1);

  node.right = buildTree(array, mid + 1, end);
  return node;
}

let sortedTestArray = mergeSort(testArray);
let n = sortedTestArray.length;

console.log(buildTree(sortedTestArray, 0, n));
