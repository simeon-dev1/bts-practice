// All Data processes are linked to here
import { Utils } from "../Utils/appUtils.js"


export class Node {
	constructor(data = null, leftNode = null, rightNode = null) {
		this.data = data;
		this.left = leftNode;
		this.right = rightNode;
	}
}

export class Tree {
	constructor(valuesArray = [], root = null) {
		this.root = this.buildTree(valuesArray);
	}

	buildTree(valuesArray) {
		const array = Utils.sortAndDedupe(valuesArray);;
		if (array.length < 1) return null;
		const midIndex = Math.floor(array.length/2);
		const root = new Node(
			array[midIndex],
			this.getLeftNode(array, midIndex),
			this.getRightNode(array, midIndex),
		)
		this.root = root;
		return root;
	}

	includes(value) {
		//Check Root
		const root = this.root;
		const nodeWithData = this.getNode(root, value);
		return nodeWithData ? true : false;
	}

	insert(value) {
		let node = this.root;
		if (!node) {
			this.root = new Node(value);
		}
		else {
			this.insertInnerNode(value, node);
		}
	}

//HERE, THE NEW SIMPLE BST DELETION LOGIC BEGINS
	deleteItem(value) {
	    const { parent, node, direction } = this.findNodeWithParent(value);
	    if (!node) return;
	    
	    this.walkValueToLeaf(parent, node, direction);
	}
	
	findNodeWithParent(value, node = this.root, parent = null, direction = null) {
	    if (!node) return { parent: null, node: null, direction: null };
	    
	    if (node.data === value) {
	        return { parent, node, direction };
	    }
	    
	    if (value < node.data) {
	        return this.findNodeWithParent(value, node.left, node, 'left');
	    } else {
	        return this.findNodeWithParent(value, node.right, node, 'right');
	    }
	}
	
	walkValueToLeaf(parent, node, direction) {
	    if (!node.left && !node.right) {
	        parent[direction] = null;
	        return;
	    }
	    
	    if (direction === 'right') {
	        while (node.right) {
	            // Swap values
	            [node.data, node.right.data] = [node.right.data, node.data];
	            
	            // Move down
	            parent = node;
	            node = node.right;
	            direction = 'right';
	        }
	    } else {
	        while (node.left) {
	            // Swap values
	            [node.data, node.left.data] = [node.left.data, node.data];
	            
	            // Move down
	            parent = node;
	            node = node.left;
	            direction = 'left';
	        }
	    }
	    
	    // Delete the leaf
	    parent[direction] = null;
	} //DELETION DONE

	
	
//HELPERS
	getLeftNode(array, rootMidIndex) {
		const leftArr = array.slice(0, rootMidIndex)
		if (leftArr.length === 0) return null;
		const midIndex = Math.floor(leftArr.length/2);
		const leftNode = new Node(
			leftArr[midIndex],
			this.getLeftNode(leftArr, midIndex),
			this.getRightNode(leftArr, midIndex)
		)
		return leftNode;
	}

	getRightNode(array, rootMidIndex) {
		const rightArr = array.slice(rootMidIndex + 1);
		if (rightArr.length === 0) return null;
		const midIndex = Math.floor(rightArr.length/2);
		const rightNode = new Node(
			rightArr[midIndex],
			this.getLeftNode(rightArr, midIndex),
			this.getRightNode(rightArr, midIndex)
		)
		return rightNode;
	}

	getNode(root, data) {
		let node = root;
		if (!node) return;
		console.log(node.data, data)
		if (node.data === data) {
			return node;
		}
		else if (data > node.data) {
			node = this.getNode(node.right, data) || null;
		}
		else if (data < node.data) {
			node = this.getNode(node.left, data) || null;
		}
		return node;
	}

	insertInnerNode(data, node) {
		if (data > node.data) {
			if (node.right === null) {
				node.right = new Node(data);
				return;
			}
			else {
				this.insertInnerNode(data, node.right)
			}
		}
		else if(data <  node.data) {
			if (node.left === null) {
				node.left = new Node(data);
				return;
			}
			else {
				this.insertInnerNode(data, node.left)
			}
		}
		else {
			//EQUAL VALUES FOUND, DATA IGNORED TO PREVENT DUPLICATES;
		}
	}

}
