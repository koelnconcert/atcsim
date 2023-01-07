import nearley from 'nearley'
import grammar from '@/grammar/atc.ne'

export default {
  defaultStart: () => grammar.ParserStart,
  ruleNames: () => grammar.ParserRules.map(rule => rule.name),
  parse: (text, parserStart = 'START') => {
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
