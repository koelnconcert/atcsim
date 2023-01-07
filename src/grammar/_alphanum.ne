ALPHANUM -> ( DIGIT | LETTER )  {% unnest %}

DIGIT -> (0|1|2|3|4|5|6|7|8|9)  {% unnest %}
0 -> ( "0" | "zero" )             {% () => "0" %}
1 -> ( "1" | "one" | "on" )       {% () => "1" %}
2 -> ( "2" | "two" | "to" )       {% () => "2" %}
3 -> ( "3" | "three" | "tree" )   {% () => "3" %}
4 -> ( "4" | "four" | "for" )     {% () => "4" %}
5 -> ( "5" | "five" )             {% () => "5" %}
6 -> ( "6" | "six" )              {% () => "6" %}
7 -> ( "7" | "seven" )            {% () => "7" %}
8 -> ( "8" | "eight" )            {% () => "8" %}
9 -> ( "9" | "nine" | "niner" )   {% () => "9" %}

LETTER -> (A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)  {% unnest %}
A -> "alpha"     {% () => "A" %}
B -> "bravo"     {% () => "B" %}
C -> "charlie"   {% () => "C" %}
D -> "delta"     {% () => "D" %}
E -> "echo"      {% () => "E" %}
F -> "foxtrot"   {% () => "F" %}
G -> "golf"      {% () => "G" %}
H -> "hotel"     {% () => "H" %}
I -> "india"     {% () => "I" %}
J -> "juliett"   {% () => "J" %}
K -> "kilo"      {% () => "K" %}
L -> "lima"      {% () => "L" %}
M -> "mike"      {% () => "M" %}
N -> "november"  {% () => "N" %}
O -> "oscar"     {% () => "O" %}
P -> "papa"      {% () => "P" %}
Q -> "quebec"    {% () => "Q" %}
R -> "romeo"     {% () => "R" %}
S -> "sierra"    {% () => "S" %}
T -> "tango"     {% () => "T" %}
U -> "uniform"   {% () => "U" %}
V -> "victor"    {% () => "V" %}
W -> "whiskey"   {% () => "W" %}
X -> "x-ray"     {% () => "X" %}
Y -> "yankee"    {% () => "Y" %}
Z -> "zulu"      {% () => "Z" %}
