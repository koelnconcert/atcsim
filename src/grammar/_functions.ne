@{%
const unnest = (data) => data[0][0]
const flatten = (data) => data.flat(999)
const removeNull = (data) => data.filter(item => item !== null)
const deepJoin = (data) => removeNull(flatten(data)).join('')
%}
