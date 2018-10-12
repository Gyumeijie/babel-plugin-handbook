# Visitors
Visitors are a pattern used in AST traversal across languages. Simply put they are an **object** with methods defined for accepting particular **node types** in a tree. 

```javascript
const MyVisitor = {
  Identifier() {
    console.log("visiting an Indentifier node!");
  }
};

// You can also create a visitor and add methods on it later
let visitor = {};
visitor.Program = function() {};
visitor.ReturnStatement = function() {}
visitor.MemberExpression = function() {};
visitor.FunctionDeclaration = function() {}
```
For more information about node types, please visit [Node types](https://github.com/babel/babel/blob/master/packages/babel-parser/src/types.js).

### When to be called?

A function in a visitor will be called on **enter**  every specific type of node  during a traversal . 

Take `MyVisitor` for example, with the following code the `Identifier()` method will be called `four times` with each Identifier
```javascript
function square(n) {
  return n * n;
}

path.traverse(MyVisitor);
```
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
When you are nesting visitors, you may need call path.traverse manually: 

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
};
```

# Credits
[jamiebuilds](https://github.com/jamiebuilds)'s [plugin-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md).
