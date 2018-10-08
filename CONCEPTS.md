The corresponding tree structure:
```js
- FunctionDeclaration
  - Identifier (id)                      [1]
  - Identifier (params[0])               [2]
  - BlockStatement (body)
    - ReturnStatement (body)
      - BinaryExpression (argument)
        - Identifier (left)              [3]
        - Identifier (right)             [4]
```

However there is also the possibility of calling a visitor method when on **exit**.
> Note: Identifier() { ... } is shorthand for Identifier: { enter() { ... } }. 
> And : Identifier(path, state) { ... } is shorthand for Identifier: { enter(path, state) { ... } }.

# Types

Babel Types is a Lodash-esque **utility library** for AST nodes. It contains methods for building, validating, and converting AST nodes. It's useful for cleaning up AST logic with well thought out utility methods.

- [API of babel-types](https://github.com/babel/babel/tree/master/packages/babel-types/src)

> e.g.: removeComments, isIdentifier

- [Node types](https://github.com/babel/babel/blob/master/packages/babel-parser/src/types.js)

> e.g.: Program, DebuggerStatement 

The following snippet shows how these two "types" be used in plugin: 
```javascript
export default function({ types: t }) { // utility library to provide api
  return {
    visitor: {
      // specific node type
      // e.g. DebuggerStatement
    }
  };
};
```

# Traverse

[API of path](https://github.com/babel/babel/tree/master/packages/babel-traverse/src/path)
> e.g.: traverse, find, getSibling

### Call path.traverse manually
When you are nesting visitors, you may need call path.traverse manually. 

```javascript
const nestedVisitor = {
  Identifier(path) {
    // ...
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    path.traverse(nestedVisitor);
  }