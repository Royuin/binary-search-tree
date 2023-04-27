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

  let mid = Math.floor((start + end) / 2);

  let node = nodeFactory(array[mid]);

  node.left = buildTree(array, start, mid - 1);
  if (node.value === undefined) {
    return null;
  }
  node.right = buildTree(array, mid + 1, end);
  return node;
}

function deletevalue(value) {
  root = delete (root, value);
}

function minValue(root) {
  let minv = root.value;
  while (root.left != null) {
    minv = root.left.value;
    root = root.left;
  }
  return minv;
}

function treeFactory(array) {
  let sortedTestArray = mergeSort(array);
  let n = sortedTestArray.length;

  let root = buildTree(sortedTestArray, 0, n);

  return {
    root,
    insert: function (root, value) {
      let errorMsg = 'Oops that already exists!';
      if (root.value === value) {
        return console.log(errorMsg);
      }

      if (root.value > value) {
        if (root.left === null) {
          return (root.left = nodeFactory(value));
        }
        return this.insert(root.left, value);
      }
      if (root.value < value) {
        if (root.right === null) {
          return (root.right = nodeFactory(value));
        }
        return this.insert(root.right, value);
      }
    },
    delete: function (root, value) {
      if (root == null) return root;

      if (value < root.value) root.left = this.delete(root.left, value);
      else if (value > root.value) root.right = this.delete(root.right, value);
      else {
        if (root.left == null) return root.right;
        else if (root.right == null) return root.left;

        root.value = minValue(root.right);

        root.right = this.delete(root.right, root.value);
      }

      return root;
    },
  };
}

const tree = treeFactory(testArray);

console.log(tree.root);
