import {
	Node,
	Tree,
} from "../Data/appData.js";



let tree = new Tree(["Alpham", "Brad","Brad","Charlie", "Arkai", "Bestie"])
tree.buildTree()

console.log(tree)
console.log(tree.includes("Alpham"))

console.log(tree.includes("Sam"))
