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
    name: 'my-plugin',
    transform (src, id) {
      if (id.endsWith('.ne')) {
        console.log('transform', id)
        return {
          code: compileGrammar(src, id)
        }
      }
    }
  }
}
