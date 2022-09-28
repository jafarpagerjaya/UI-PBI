let ctrl = undefined;

const inputAlias = document.getElementById('input-alias-donasi'),
inputAliasMaxChar = inputAlias.getAttribute('maxlength');
inputAlias.addEventListener('keydown', function(e) {
    let bannedCharFound = /[^a-zA-Z0-9\s]/;
    if (bannedCharFound.test(e.key) === true) {
        e.preventDefault();
        return false;
    }
    if (e.target.value.length >= inputAliasMaxChar) {
        if (e.key == "Control") {
            ctrl = "down";
        }
        if ((e.key != "Backspace") && (e.key != "Delete") && (e.key != "F5") && (e.key != "ArrowLeft") && (e.key != "ArrowRight") && (e.key != "ArrowUp") && (e.key != "ArrowDown") && (ctrl != 'down')) {
            e.preventDefault()
        }
    }
});

inputAlias.addEventListener('keyup', function (e) {
    if (e.key == "Control") {
        ctrl = "up";
    }
});

const inputCheckDoa = document.getElementById('input-check-doa'),
      textareaDoa = document.getElementById('textarea-doa'),
      charLeft = document.getElementById('charLeft');
inputCheckDoa.addEventListener('click', function () {
    if (this.checked) {
        this.parentElement.classList.add('checked');
        textareaDoa.classList.remove('d-none');
        charLeft.classList.remove('d-none');
        textareaDoa.focus();
    } else {
        this.parentElement.classList.remove('checked');
        textareaDoa.classList.add('d-none');
        charLeft.classList.add('d-none');
    }
});

const maxChar = textareaDoa.getAttribute('maxlength');

textareaDoa.addEventListener("keydown", function (e) {
    let bannedCharFound = /[^a-zA-Z0-9\s\/.-]/;
    if (bannedCharFound.test(e.key) === true) {
        e.preventDefault();
        return false;
    }
    let ceretS = e.target.selectionStart;
    if ((((e.code == 'Period' && e.key == '.') || (e.code == 'Slash' && e.key == '/') || (e.code == 'Minus' && e.key == '-')) && (
            this.value.substring(ceretS, ceretS+1) == '.' || 
            this.value.substring(ceretS, ceretS-1) == '.' || 
            this.value.substring(ceretS, ceretS+1) == '/' || 
            this.value.substring(ceretS, ceretS-1) == '/' || 
            this.value.substring(ceretS, ceretS+1) == '-' || 
            this.value.substring(ceretS, ceretS-1) == '-' ||
            (this.value.substring(ceretS, ceretS+1) == ' ' && (this.value.substring(ceretS+1, ceretS+2) == '.' || this.value.substring(ceretS+1, ceretS+2) == '/' || this.value.substring(ceretS+1, ceretS+2) == '-')) ||
            (this.value.substring(ceretS, ceretS-1) == ' ' && (this.value.substring(ceretS-1, ceretS-2) == '.' || this.value.substring(ceretS-1, ceretS-2) == '/' || this.value.substring(ceretS-1, ceretS-2) == '-'))
        ))) {
        e.preventDefault();
        return false;
    }

    if (e.target.value.length >= maxChar) {
        if (e.key == "Control") {
            ctrl = "down";
        }
        if ((e.key != "Backspace") && (e.key != "Delete") && (e.key != "F5") && (e.key != "ArrowLeft") && (e.key != "ArrowRight") && (e.key != "ArrowUp") && (e.key != "ArrowDown") && (ctrl != 'down')) {
            e.preventDefault()
        }
    }
});

textareaDoa.addEventListener('keyup', function (e) {
    charLeft.querySelector('span').innerText = this.value.length;
    if (e.key == "Control") {
        ctrl = "up";
    }
});

textareaDoa.addEventListener('paste', function(e) {
    setTimeout(() => {
        this.value = escapeRegExp(this.value.trim(),'',/[^a-zA-Z0-9\s\/.-]/g);
    }, 0);
});

$('select').select2({
    placeholder: "Pilih salah satu"
});

const waktu_bayar = document.getElementById('waktu-bayar');
waktu_bayar.querySelector('.input-group-append').addEventListener('click', function() {
    waktu_bayar.querySelector('#input-waktu-bayar').focus();
});

// let d = new Date(); d.setDate(d.getDate());

let d = new Date('08/11/2021');

// extended function for datepicker
const dateRanges = (date = new Date(), rule = 10, sum = 0) => Math.floor(date.getFullYear() / rule) * rule + sum;

let changeDate = false;

$('.datepicker').datepicker({
    todayBtn: "linked",
    language: 'id',
    format: 'd MM yyyy',
    maxViewMode: 3,
    autoclose: true,
    enableOnReadonly: false // readonly input will not show datepicker . The default value true
}).change(function(e) {
    // submitControl(e.target);\
    // alert('c');
}).on('show', function(e) {
    // alert(1);
}).datepicker('setStartDate', d);

const inputJumlahDonasi = document.getElementById('input-jumlah-donasi');
inputJumlahDonasi.addEventListener('keypress', preventNonNumbersInInput);
inputJumlahDonasi.addEventListener('keyup', function () {
    this.value = numberToPrice(this.value, 'Rp. ');
});