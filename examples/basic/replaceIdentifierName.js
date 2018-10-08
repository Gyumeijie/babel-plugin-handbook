export default function({ types: t }) {
  return {
    visitor: {
       Identifier(path) {
         if (t.isIdentifier(path.node, { name: "n" })) {
            path.node.name = "x";
         }
        }
     }
  }
}