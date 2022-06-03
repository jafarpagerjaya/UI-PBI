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

// extended function for datepicker
const dateRanges = (date = new Date(), rule = 10, sum = 0) => Math.floor(date.getFullYear() / rule) * rule + sum;

$('.datepicker').datepicker({
    todayBtn: "linked",
    clearBtn: true,
    language: 'id',
    format: 'd MM yyyy'
}).change(function(e) {
    // submitControl(e.target);
}).on('show', function(e,x) {
    let allowedPicker = [],
        untilPicker = undefined,
        year = undefined,
        timeEpoc;
    if (e.viewMode == 3) {
        // Start From This(d) Decade
        allowedPicker = [dateRanges(d)];
        // Until This(default dateRanges) Decade
        untilPicker = dateRanges();
        year = 10;
        timeEpoc = 'decade';
    } else if (e.viewMode == 4) {
        // daterange second params set to 100 a century
        // Start From This(d) Century
        allowedPicker = [dateRanges(d, 100)];
        // Until This(now) Century
        untilPicker = dateRanges(new Date(), 100);
        year = 100;
        timeEpoc = 'century';
    }
    if (allowedPicker.length > 0) {
        if (allowedPicker.find(element => element == untilPicker) == undefined) {
            allowedPicker.push(untilPicker)
        }
        if (allowedPicker.length > 1 && allowedPicker[1] - allowedPicker[0] > year) {
            let loop = 1;
            do {
                if (allowedPicker.find(element => element == (loop*year)) == undefined) {
                    allowedPicker.push(allowedPicker[loop-1]+year);
                }
                loop++;
            } while ((allowedPicker[1] - allowedPicker[0]) / year > loop);
            allowedPicker.sort();
        }
        allowedPicker.forEach(pickElement => {
            $('.datepicker.datepicker-dropdown table tbody td>span.disabled:contains('+ pickElement +')').removeClass('disabled');
        });
    }
    $('.datepicker.datepicker-dropdown').on('click', 'tfoot .clear', function(e) {
        e.stopPropagation();
        console.log('anjir')
    })
}).datepicker('setStartDate', d);