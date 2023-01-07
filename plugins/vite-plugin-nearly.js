import nearley from 'nearley'
import compile from 'nearley/lib/compile'
import generate from 'nearley/lib/generate'
import nearleyGrammar from 'nearley/lib/nearley-language-bootstrapped'

function compileGrammar (sourceCode, filename) {
  const grammarParser = new nearley.Parser(nearleyGrammar)
  grammarParser.feed(sourceCode)
  const grammarAst = grammarParser.results[0]
  const grammarInfoObject = compile(grammarAst, { args: [filename] })
  return generate(grammarInfoObject, 'grammar')
}

export default function () {
  return {
    name: 'vite-plugin-nearly',
    transform (src, id) {
      if (id.endsWith('.ne')) {
        const code = compileGrammar(src, id)
        /*
           nearley does not procude a esm module, but rather the code contains the following:

              if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
                module.exports = grammar;
              } else {
                window.grammar = grammar;
              }
         */
        const preCode = 'const window = {};\n'
        const postCode = 'export default window.grammar || module.exports \n'
        return { code: preCode + code + postCode }
      }
    }
  }
}
