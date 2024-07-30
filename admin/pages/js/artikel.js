let cbl = document.querySelectorAll('table tbody td[data-checkbox] input[type="checkbox"]');
let bml = document.querySelectorAll('button[data-value].multi');
let bsl = document.querySelectorAll('button[data-value].singgle');

let selectedId = [];
checkboxForBtn(cbl, bml, bsl, 'data-id-artikel','tr', selectedId);

let qEditor = editor('#editor');