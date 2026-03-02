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
	constructor(arr = [], root = null) {
		this.arr = Utils.sortAndDedupe(arr);
		this.root = root;
	}

	buildTree() {
		const array = Utils.sortAndDedupe(this.arr);;
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

	includes(data) {
		//Check Root
		const root = this.root;
		const nodeWithData = this.getNode(root, data);
		return nodeWithData ? true : false;
	}

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
		const node = root;
		if (!node) return;
		if (node.data === data) {
			return node;
		}
		else {
			const rightNode = node.right;
			const leftNode = node.left;
			const innerNode = this.getNode(leftNode, data) || this.getNode(rightNode, data);
			return innerNode || null;
		}
	}

}
