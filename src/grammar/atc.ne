@include "_functions.ne"
@include "_alphanum.ne"
@include "_callsigns.ne"
@include "_phrases.ne"

START -> CALLSIGN (__ PHRASE):* _
{% data => {
  return {
    callsign: data[0],
    instructions: removeNull(flatten(data[1]))
  }
}%}

_ -> __:?         {% () => null %}
__ -> [ !.,?]:+   {% () => null %}

