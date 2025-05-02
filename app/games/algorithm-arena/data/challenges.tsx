export const challenges = {
    arrays: [
      {
        id: "array-1",
        title: "Two Sum",
        difficulty: "Easy",
        points: 50,
        description:
          "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
          {
            input: "nums = [2, 7, 11, 15], target = 9",
            output: "[0, 1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
          },
          {
            input: "nums = [3, 2, 4], target = 6",
            output: "[1, 2]",
          },
        ],
        hint: "Consider using a hash map to store the numbers you've seen so far. For each number, check if its complement (target - current number) exists in the hash map.",
        codeTemplate: `/**
   * @param {number[]} nums
   * @param {number} target
   * @return {number[]}
   */
  function twoSum(nums, target) {
    // Your code here
    
  }
  
  // Test cases
  const nums1 = [2, 7, 11, 15];
  const target1 = 9;
  console.log(twoSum(nums1, target1)); // Expected: [0, 1]
  
  const nums2 = [3, 2, 4];
  const target2 = 6;
  console.log(twoSum(nums2, target2)); // Expected: [1, 2]`,
        visualizerType: "array",
      },
      {
        id: "array-2",
        title: "Maximum Subarray",
        difficulty: "Medium",
        points: 75,
        description:
          "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        examples: [
          {
            input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
            output: "6",
            explanation: "The subarray [4, -1, 2, 1] has the largest sum = 6",
          },
          {
            input: "nums = [1]",
            output: "1",
          },
        ],
        hint: "Try using Kadane's algorithm. Keep track of the current sum and the maximum sum found so far.",
        codeTemplate: `/**
   * @param {number[]} nums
   * @return {number}
   */
  function maxSubArray(nums) {
    // Your code here
    
  }
  
  // Test cases
  const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  console.log(maxSubArray(nums1)); // Expected: 6
  
  const nums2 = [1];
  console.log(maxSubArray(nums2)); // Expected: 1`,
        visualizerType: "array",
      },
      {
        id: "array-3",
        title: "Binary Search",
        difficulty: "Easy",
        points: 60,
        description:
          "Given a sorted array of integers nums and a target value, return the index if the target is found. If not, return -1. You must write an algorithm with O(log n) runtime complexity.",
        examples: [
          {
            input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
            output: "4",
            explanation: "9 exists in nums and its index is 4",
          },
          {
            input: "nums = [-1, 0, 3, 5, 9, 12], target = 2",
            output: "-1",
            explanation: "2 does not exist in nums so return -1",
          },
        ],
        hint: "Use two pointers to track the search range. Compare the middle element with the target value and adjust the search range accordingly.",
        codeTemplate: `/**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  function search(nums, target) {
    // Your code here
    
  }
  
  // Test cases
  const nums1 = [-1, 0, 3, 5, 9, 12];
  const target1 = 9;
  console.log(search(nums1, target1)); // Expected: 4
  
  const nums2 = [-1, 0, 3, 5, 9, 12];
  const target2 = 2;
  console.log(search(nums2, target2)); // Expected: -1`,
        visualizerType: "array",
      },
    ],
    trees: [
      {
        id: "tree-1",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        points: 60,
        description:
          "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        examples: [
          {
            input: "root = [3, 9, 20, null, null, 15, 7]",
            output: "3",
            explanation: "The tree has 3 levels: root (3), second level (9, 20), and third level (15, 7)",
          },
          {
            input: "root = [1, null, 2]",
            output: "2",
          },
        ],
        hint: "Consider using recursion. The maximum depth is 1 + the maximum of the depths of the left and right subtrees.",
        codeTemplate: `/**
   * Definition for a binary tree node.
   * function TreeNode(val, left, right) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.left = (left===undefined ? null : left)
   *     this.right = (right===undefined ? null : right)
   * }
   */
  
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  function maxDepth(root) {
    // Your code here
    
  }
  
  // Helper function to create a tree from an array
  function createTree(arr) {
    if (!arr.length) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      
      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  }
  
  // Test cases
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
  }
  
  const tree1 = createTree([3, 9, 20, null, null, 15, 7]);
  console.log(maxDepth(tree1)); // Expected: 3
  
  const tree2 = createTree([1, null, 2]);
  console.log(maxDepth(tree2)); // Expected: 2`,
        visualizerType: "tree",
      },
      {
        id: "tree-2",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        points: 65,
        description:
          "Given the root of a binary tree, invert the tree, and return its root. Inverting a binary tree means swapping every left node with its right node.",
        examples: [
          {
            input: "root = [4, 2, 7, 1, 3, 6, 9]",
            output: "[4, 7, 2, 9, 6, 3, 1]",
            explanation: "The tree is mirrored by swapping each node's left and right children",
          },
          {
            input: "root = [2, 1, 3]",
            output: "[2, 3, 1]",
          },
        ],
        hint: "Use recursion or iteration. For each node, swap its left and right children, then apply the same process to both subtrees.",
        codeTemplate: `/**
   * Definition for a binary tree node.
   * function TreeNode(val, left, right) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.left = (left===undefined ? null : left)
   *     this.right = (right===undefined ? null : right)
   * }
   */
  
  /**
   * @param {TreeNode} root
   * @return {TreeNode}
   */
  function invertTree(root) {
    // Your code here
    
  }
  
  // Helper function to create a tree from an array
  function createTree(arr) {
    if (!arr.length) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      
      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  }
  
  // Helper function to convert tree to array for visualization
  function treeToArray(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
      const node = queue.shift();
      
      if (node) {
        result.push(node.val);
        queue.push(node.left || null);
        queue.push(node.right || null);
      } else {
        result.push(null);
      }
    }
    
    // Remove trailing nulls
    while (result[result.length - 1] === null) {
      result.pop();
    }
    
    return result;
  }
  
  // Test cases
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
  }
  
  const tree1 = createTree([4, 2, 7, 1, 3, 6, 9]);
  const inverted1 = invertTree(tree1);
  console.log(treeToArray(inverted1)); // Expected: [4, 7, 2, 9, 6, 3, 1]
  
  const tree2 = createTree([2, 1, 3]);
  const inverted2 = invertTree(tree2);
  console.log(treeToArray(inverted2)); // Expected: [2, 3, 1]`,
        visualizerType: "tree",
      },
      {
        id: "tree-3",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        points: 80,
        description:
          "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.",
        examples: [
          {
            input: "root = [2, 1, 3]",
            output: "true",
          },
          {
            input: "root = [5, 1, 4, null, null, 3, 6]",
            output: "false",
            explanation: "The root node's value is 5 but its right child's value is 4.",
          },
        ],
        hint: "Use recursion with min and max boundaries. For each node, check if its value is within the allowed range.",
        codeTemplate: `/**
   * Definition for a binary tree node.
   * function TreeNode(val, left, right) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.left = (left===undefined ? null : left)
   *     this.right = (right===undefined ? null : right)
   * }
   */
  
  /**
   * @param {TreeNode} root
   * @return {boolean}
   */
  function isValidBST(root) {
    // Your code here
    
  }
  
  // Helper function to create a tree from an array
  function createTree(arr) {
    if (!arr.length) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      
      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  }
  
  // Test cases
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
  }
  
  const tree1 = createTree([2, 1, 3]);
  console.log(isValidBST(tree1)); // Expected: true
  
  const tree2 = createTree([5, 1, 4, null, null, 3, 6]);
  console.log(isValidBST(tree2)); // Expected: false`,
        visualizerType: "tree",
      },
    ],
    graphs: [
      {
        id: "graph-1",
        title: "Number of Islands",
        difficulty: "Medium",
        points: 85,
        description:
          "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
        examples: [
          {
            input:
              'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
            output: "1",
          },
          {
            input:
              'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
            output: "3",
          },
        ],
        hint: "Use depth-first search (DFS) or breadth-first search (BFS) to explore each island. When you find a land cell, mark it as visited and explore all connected land cells.",
        codeTemplate: `/**
   * @param {character[][]} grid
   * @return {number}
   */
  function numIslands(grid) {
    // Your code here
    
  }
  
  // Test cases
  const grid1 = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ];
  console.log(numIslands(grid1)); // Expected: 1
  
  const grid2 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ];
  console.log(numIslands(grid2)); // Expected: 3`,
        visualizerType: "graph",
      },
      {
        id: "graph-2",
        title: "Course Schedule",
        difficulty: "Medium",
        points: 90,
        description:
          "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return true if you can finish all courses. Otherwise, return false.",
        examples: [
          {
            input: "numCourses = 2, prerequisites = [[1,0]]",
            output: "true",
            explanation:
              "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
          },
          {
            input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
            output: "false",
            explanation:
              "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. This is impossible.",
          },
        ],
        hint: "This is a cycle detection problem in a directed graph. Use topological sort or DFS to detect cycles.",
        codeTemplate: `/**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {boolean}
   */
  function canFinish(numCourses, prerequisites) {
    // Your code here
    
  }
  
  // Test cases
  const numCourses1 = 2;
  const prerequisites1 = [[1,0]];
  console.log(canFinish(numCourses1, prerequisites1)); // Expected: true
  
  const numCourses2 = 2;
  const prerequisites2 = [[1,0],[0,1]];
  console.log(canFinish(numCourses2, prerequisites2)); // Expected: false`,
        visualizerType: "graph",
      },
      {
        id: "graph-3",
        title: "Network Delay Time",
        difficulty: "Medium",
        points: 95,
        description:
          "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.",
        examples: [
          {
            input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
            output: "2",
            explanation:
              "We start at node 2. It takes 1 time unit to reach nodes 1 and 3, and 2 time units to reach node 4 through node 3.",
          },
          {
            input: "times = [[1,2,1]], n = 2, k = 1",
            output: "1",
          },
          {
            input: "times = [[1,2,1]], n = 2, k = 2",
            output: "-1",
            explanation: "Node 1 cannot receive the signal.",
          },
        ],
        hint: "This is a shortest path problem. Use Dijkstra's algorithm to find the shortest path from the source node to all other nodes.",
        codeTemplate: `/**
   * @param {number[][]} times
   * @param {number} n
   * @param {number} k
   * @return {number}
   */
  function networkDelayTime(times, n, k) {
    // Your code here
    
  }
  
  // Test cases
  const times1 = [[2,1,1],[2,3,1],[3,4,1]];
  const n1 = 4;
  const k1 = 2;
  console.log(networkDelayTime(times1, n1, k1)); // Expected: 2
  
  const times2 = [[1,2,1]];
  const n2 = 2;
  const k2 = 1;
  console.log(networkDelayTime(times2, n2, k2)); // Expected: 1
  
  const times3 = [[1,2,1]];
  const n3 = 2;
  const k3 = 2;
  console.log(networkDelayTime(times3, n3, k3)); // Expected: -1`,
        visualizerType: "graph",
      },
    ],
  }
  