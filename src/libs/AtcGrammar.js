import nearley from 'nearley'
import compile from 'nearley/lib/compile'
import generate from 'nearley/lib/generate'
import nearleyGrammar from 'nearley/lib/nearley-language-bootstrapped'

import grammarSource from '@/grammar/atc.ne?raw'

function compileGrammar (sourceCode) {
  // Parse the grammar source into an AST
  const grammarParser = new nearley.Parser(nearleyGrammar)
  grammarParser.feed(sourceCode)
  const grammarAst = grammarParser.results[0] // TODO check for errors

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {})
  // Generate JavaScript code from the rules
  const grammarJs = generate(grammarInfoObject, 'grammar')

  // Pretend this is a CommonJS environment to catch exports from the grammar.
  const module = { exports: {} }
  // eslint-disable-next-line no-eval
  eval(grammarJs)

  return module.exports
}

// console.log('init grammer', grammarSource)
const grammar = compileGrammar(grammarSource)
// console.log('compiled grammer', grammar)

export default {
  defaultStart: () => grammar.ParserStart,
  ruleNames: () => grammar.ParserRules.map(rule => rule.name),
  parse: (text, parserStart) => {
    try {
      const currentGrammer = nearley.Grammar.fromCompiled(grammar)
      if (parserStart) {
        currentGrammer.start = parserStart
      }
      const parser = new nearley.Parser(currentGrammer)
      parser.feed(text.toLowerCase())
      return parser.results
    } catch (parseError) {
      console.log('parseError', parseError)
      return parseError
    }
  }
}
