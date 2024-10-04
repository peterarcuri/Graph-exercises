class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertices) {
    for(let node of vertices) {
        this.addVertex(node);
    }
  }
  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(node1, node2) {
    node1.adjacent.add(node2);
    node2.adjacent.add(node1);
  }
  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(node1, node2) {
    node1.adjacent.delete(node2);
    node2.adjacent.delete(node1);
  }
  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let node of this.nodes) {
      if(node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }
  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(node) {
      if(!node) { // Base Case
        return null;
      }
      // Visit node
      visited.add(node);
      result.push(node.value);

      // Visit neighbors
      node.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }
    traverse(start);
    return result;
  }
  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const data = [];
    const queue = [start]; // Initialize queue with the start node

    visited.add(start) // Mark the start node as visited

    while(queue.length > 0) {
      const current = queue.shift(); // Remove from front of the queue
      data.push(current.value); // Process the current node

      // Add all unvisited neighbors to the queue
      current.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)) {
          visited.add(neighbor); // Mark neighbor as visited
          queue.push(neighbor);
        }
      });
    }
    return data;
  }
  shortestPath(graph, start, end) {
    const queue = [[start]]; // Queue to store paths, initialized with the start node as a path
    const visited = new Set(); // Set to keep track of visited nodes
    visited.add(start); // Mark start node as visited

    while(queue.length > 0) {
      const path = queue.shift(); // Get the next path from the queue
      const node = path[path.length -1]; // Get the last node from the current path

      // If the end node is found, return path
      if(node === end) {
        return path.map(n => n.value); // return the path value
      }
      // Visit neighbors
      for(let neighbor of node.adjacent) {
        if(!visited.has(neighbor)) {
          visited.add(neighbor); // Mark neighbor as visited
          const newPath = [...path, neighbor]; // Create a new path including the neighbor
          queue.push(newPath); // Add the new path to the queue
        }
      }
    }
    // If no path is found, return null
    return null;
  }
}

module.exports = {Graph, Node}