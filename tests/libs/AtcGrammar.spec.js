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
  it('test ALPHANUMS', () => {
    expectGrammar('ALPHANUMS', 'B8', 'bravo 8')
    expectGrammar('ALPHANUMS', 'N80991', 'november eight 0 9, niner, one')
  })
  it('test CALLSIGN', () => {
    expectGrammar('CALLSIGN', 'BAW1BJ', 'speedbird 1 bravo juliett')
    expectGrammar('CALLSIGN', 'N80991', 'november eight 0 9, niner, one')
  })
  it('test PHRASE_TURN', () => {
    expectGrammar('PHRASE_TURN', { command: 'turn left', heading: '150' }, 'turn left heading 150')
  })
  it('test PHRASE_CLIMB_DESCEND', () => {
    expectGrammar('PHRASE_CLIMB_DESCEND', { command: 'climb', height: 'FL200' }, 'climb and maintain flight level 200')
    expectGrammar('PHRASE_CLIMB_DESCEND', { command: 'descend', height: '5000' }, 'descend 5000 feet')
  })
  it('test START', () => {
    expectGrammar('START', {
      callsign: 'BAW1',
      instructions: [
        {
          command: 'turn left', heading: '150'
        },
        {
          command: 'climb', height: '5000'
        }
      ]
    }, 'speedbird 1, turn left heading 150, climb 5000 feet')
  })
})
