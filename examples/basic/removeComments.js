export default function ({ types: t }) {
  return {
    visitor: { 
      Program(path) {
        path.traverse({
            DebuggerStatement: {
                enter(path) {
                  t.removeComments(path.node)
              }
            }
            // Note: DebuggerStatement() { ... } is shorthand for DebuggerStatement: { enter() { ... } }.
            // Likewise: DebuggerStatement(path) { ... } is shorthand for DebuggerStatement: { enter(path) { ... } }.
            // DebuggerStatement(path) {
            //     t.removeComments(path.node)
            // }
        })   
      }
    }
  }
}