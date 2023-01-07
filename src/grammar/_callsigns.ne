CALLSIGN -> ( (AIRLINE _):? ALPHANUMS ) {% deepJoin %}

AIRLINE ->
    "speedbird" {% () => "BAW" %}
  | "united"    {% () => "UAL" %}
