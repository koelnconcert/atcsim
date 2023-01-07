import { describe, it, expect } from 'vitest'
import AtcGrammar from '@/libs/AtcGrammar'

function expectGrammar (start, expected, input) {
  const parsed = AtcGrammar.parse(input, start)
  expect(parsed).to.have.length(1)
  const result = parsed[0]
  expect(result).to.deep.equal(expected)
}

describe('AtcGrammar.js', () => {
  it('test DIGIT', () => {
    expectGrammar('DIGIT', '1', 'one')
    expectGrammar('DIGIT', '9', 'niner')
  })
  it('test LETTER', () => {
    expectGrammar('LETTER', 'A', 'alpha')
    expectGrammar('LETTER', 'X', 'x-ray')
  })
  it('test ALPHANUM', () => {
    expectGrammar('ALPHANUM', 'A', 'alpha')
    expectGrammar('ALPHANUM', '9', 'niner')
  })
  it('test ID', () => {
    expectGrammar('ID', 'B8', 'bravo 8')
    expectGrammar('ID', 'N80991', 'november eight 0 9, niner, one')
  })
})
