import * as babel from '@babel/core'
import replaceIdentifierName from './replaceIdentifierName'
import removeDebugger from './removeDebugger'
import removeComments from './removeComments'

const code = `function square(n) {
    // this is a single line comment
    /*
     * this is a multi-line comment
     */
    return n * n;
    debugger; // comment1 after DebuggerStatement
    debugger; // comment2 after DebuggerStatement
  }`;

 babel.transform(code, {
     plugins: [
         replaceIdentifierName,
         removeDebugger, 
         removeComments
        ]
 }, function(err, result) {
     console.log(result.code)
 });