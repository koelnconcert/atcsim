@include "_functions.ne"
@include "_alphanum.ne"

START -> ( ID _ )  {% removeNull %}
_ -> [ !.,?]:*   {% () => null %}

ID -> ( ALPHANUM ( _ ID ):? )  {% (data) => removeNull(flatten(data)).join('') %}
