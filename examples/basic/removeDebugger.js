export default function({ types: t }) {
    return {
        visitor: {
            DebuggerStatement(path) {
                path.remove()
            }
        }
    }
}