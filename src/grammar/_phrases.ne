PHRASE -> ( PHRASE_IDENTIFIED | PHRASE_TURN | PHRASE_CLIMB_DESCEND )
{% unnest %}

PHRASE_IDENTIFIED -> ( "identified" | "radar contact" )
{% data => {
  return {
    command: 'identified'
  }
}%}

PHRASE_TURN -> "turn" __ ("left"|"right") __ "heading" __ DIGITS
{% data => {
  return {
    command: 'turn ' + data[2][0],
    heading: data[6]
  }
}%}

PHRASE_CLIMB_DESCEND -> ("climb"|"descend") (__ "and maintain"):? __ ( FLIGHTLEVEL | ALTITUDE )
{% data => {
  return {
    command: data[0][0],
    height: data[3][0]
  }
}%}

FLIGHTLEVEL -> "flight level" __ DIGITS
{% data => deepJoin(["FL", data.slice(1)]) %}

ALTITUDE -> DIGITS __ "feet"
{% id %}

