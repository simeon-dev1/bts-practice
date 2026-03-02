import {
	Node,
	Tree,
} from "../Data/appData.js";



let tree = new Tree(["Alpham", "Brad","Brad","Charlie", "Arkai", "Bestie"])
tree.buildTree()


console.log(tree.includes("Sam")) //false

tree.insert("Sam")
console.log(tree.includes("Sam")) //true

tree.deleteItem("Sam")
console.log(tree.includes("Sam")) //false
