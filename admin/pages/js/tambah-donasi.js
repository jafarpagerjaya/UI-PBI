const inputCheckDoa = document.getElementById('input-check-doa'),
      textareaDoa = document.getElementById('textarea-doa');
inputCheckDoa.addEventListener('click', function () {
    if (this.checked) {
        this.parentElement.classList.add('checked');
        textareaDoa.classList.remove('d-none');
        textareaDoa.focus();
    } else {
        this.parentElement.classList.remove('checked');
        textareaDoa.classList.add('d-none');
    }
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
$('.datepicker').datepicker('setStartDate', d);

$('.datepicker').datepicker({
    todayBtn: "linked",
    clearBtn: true,
    language: 'id',
    format: 'd MM yyyy'
}).change(function(e) {
    // submitControl(e.target);
}).on('changeYear', function(e) {
    console.log(e)
});