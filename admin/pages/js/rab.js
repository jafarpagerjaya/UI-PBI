let data = {},
    relatedModal,
    relatedTarget;

$('#modalBuatRencana').on('hidden.bs.modal', function (e) {
    e.target.querySelector('#id-bantuan').removeAttribute('disabled');
    e.target.querySelector('#id-bantuan').value = '0';
    e.target.querySelector('#input-keterangan-rencana').value = '';
    if (e.target.querySelector('#input-keterangan-rencana').hasAttribute('maxlength')) {
        e.target.querySelector('#input-keterangan-rencana').parentElement.querySelector('.current-length').innerText = e.target.querySelector('#input-keterangan-rencana').value.length;
    }

    // for select2
    $('#id-bantuan').select2('val', '0');

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('is-invalid')) {
            return;
        }
        name.parentElement.classList.remove('is-invalid');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });

    e.target.querySelectorAll('#id-bantuan option[disabled]').forEach(option => {
        option.removeAttribute('disabled');
    });
    e.target.querySelector('#input-keterangan-rencana').removeAttribute('disabled');
    if (e.target.querySelector('#buat-pencairan[type="button"]') != null) {
        e.target.querySelector('#buat-pencairan[type="button"]').innerText = 'Buat RAB';
        e.target.querySelector('#buat-pencairan[type="button"]').setAttribute('id', 'buat-rab');
        e.target.querySelector('#buat-rab[type="button"]').setAttribute('type', 'submit');

        e.target.querySelector('#action [data-dismiss="modal"]').innerText = 'Batal';
    }

    if (e.target.querySelector('#rencana #balance') != null) {
        e.target.querySelector('#rencana #balance').parentElement.remove();
    }

    if (e.target.querySelector('#rab') != null) {
        document.getElementById('rab').remove();
    }

    let activeTab = e.target.querySelector('#tab-rencana-pencairan > .tab-pane.active.show');

    if (activeTab.getAttribute('id') != 'tab-rencana') {
        activeTab.classList.remove('show');
        activeTab.classList.remove('active');
        e.target.querySelector('#tab-rencana-pencairan #tab-rencana').classList.add('active');
        e.target.querySelector('#tab-rencana-pencairan #tab-rencana').classList.add('show');
    }

    delete data.fields;
    objectRencana = {};
});

$('#modalFormRab').on('show.bs.modal', function (e) {
    if (e.target.querySelector('#input-keterangan-rab').hasAttribute('maxlength')) {
        e.target.querySelector('#input-keterangan-rab').parentElement.querySelector('.current-length').innerText = e.target.querySelector('#input-keterangan-rab').value.length;
    }
}).on('hidden.bs.modal', function (e) {
    if (document.getElementById('modalBuatRencana').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }

    const mode = e.target.querySelector('#formJudul').getAttribute('data-mode');
    if (mode == 'update') {
        e.target.querySelector('#id-kebutuhan').value = '0';
        e.target.querySelector('#input-harga-satuan').value = '';
        e.target.querySelector('#input-jumlah').value = '';
        e.target.querySelector('#input-keterangan-rab').value = '';

        // for select2
        $('#id-kebutuhan').select2('val', '0');
    }

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('is-invalid')) {
            return;
        }
        name.parentElement.classList.remove('is-invalid');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });

    delete data.id_rab;
});

$('#modalTambahKebutuhan').on('show.bs.modal', function () {

}).on('hidden.bs.modal', function (e) {
    if (document.getElementById('modalBuatRencana').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('is-invalid')) {
            return;
        }
        name.parentElement.classList.remove('is-invalid');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });
});

$('#modalKonfirmasiHapusRab').on('hidden.bs.modal', function () {
    if (document.getElementById('modalBuatRencana').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }
});

$('#modalRincianRAB').on('show.bs.modal', function (e) {
    relatedTarget = e.relatedTarget.closest('tr');
    objectRencana.id_rencana = relatedTarget.getAttribute('data-id-rencana');
}).on('shown.bs.modal', function (e) {
    let tableAbsoluteFirstList = document.querySelectorAll('table.table-absolute-first');
    if (tableAbsoluteFirstList.length > 0) {
        tableAbsoluteFirstList.forEach(table => {
            if (table.classList.contains('table-responsive')) {
                doAbsoluteFirstAdd(table);
            } else {
                doAbsoluteFirstRemove(table);
            }
        });
    }
}).on('hidden.bs.modal', function () {
    if (document.getElementById('modalBuatRencana').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }

    objectRencana = {};
});

$('#modalKeteranganPerbaikanRAB').on('hidden.bs.modal', function (e) {
    if (document.getElementById('modalRincianRAB').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('is-invalid')) {
            return;
        }
        name.parentElement.classList.remove('is-invalid');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });
});

$('#modalKonfirmasiAksi').on('show.bs.modal', function (e) {
    const mode = e.relatedTarget.getAttribute('data-mode');
    let desc;
    switch (mode) {
        case 'TD':
            desc = 'tidak melanjutkan';
            break;
        case 'SD':
            desc = 'melanjutkan'
            break;
        case 'BP':
            desc = 'perbaikan'
            break;
        default:
            console.log('Unrecognize action mode');
            return false;
            break;
    }
    e.target.querySelector('.text-sm > span').innerText = desc;
    objectRencana.status = mode;
    relatedModal = e.relatedTarget.closest('.modal').getAttribute('id');
}).on('hidden.bs.modal', function (e) {
    if (document.getElementById('modalRincianRAB').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }
});


// Select
const selectBantuan = document.getElementById('id-bantuan');

let objectRencana = {};
selectBantuan.addEventListener('change', function () {
    if (this.value != '0') {
        objectRencana.id_bantuan = this.value;

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectRencana.id_bantuan;
    }
});

const selectKebutuhan = document.getElementById('id-kebutuhan');

let objectRab = {};
// event ini jalan hanya untuk non select2
selectKebutuhan.addEventListener('change', function () {
    if (this.value != '0') {
        objectRab.id_kebutuhan = this.value;

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectRab.id_kebutuhan;
    }
});

const selectKategori = document.getElementById('id-kategori');

let objectKebutuhan = {};
selectKategori.addEventListener('change', function () {
    if (this.value != '0') {
        objectKebutuhan.id_kategori = this.value;

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectKebutuhan.id_kategori;
    }
});

// Textarea
modalNameListKeyDownTextarea = document.querySelectorAll('.modal textarea');

modalNameListKeyDownTextarea.forEach(name => {
    name.addEventListener('keydown', function (e) {

        if (!e.target.value.length && (e.keyCode == 16 || e.code == 'Space' || e.code == 'Backspace' || e.code == 'Delete' || e.code == 'ArrowDown' || e.code == 'ArrowUp' || e.code == 'ArrowLeft' || e.code == 'ArrowRight')) {
            return false;
        }

        if (e.code != undefined) {
            if (!e.target.value.length && (e.code.indexOf('Key') < 0 && e.code.indexOf('Digit') < 0 && (e.keyCode != 96 && e.keyCode != 97 && e.keyCode != 98 && e.keyCode != 99 && e.keyCode != 100 && e.keyCode != 101 && e.keyCode != 102 && e.keyCode != 103 && e.keyCode != 104 && e.keyCode != 105))) {
                e.preventDefault();
                return false;
            }
        }

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.nextElementSibling.removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    });

    name.addEventListener('paste', function (e) {
        setTimeout(() => {
            this.value = escapeRegExp(escapeRegExp(this.value.trim(), '', /[^a-zA-Z0-9\s\/.-]/g), ' ', /\s+/g);

            if (!this.value.length) {
                return false;
            }

            if (this.parentElement.classList.contains('is-invalid')) {
                this.parentElement.classList.remove('is-invalid');
                this.nextElementSibling.removeAttribute('data-label-after');
                this.classList.remove('is-invalid');
            }
        }, 0);
    });
});

// Input
const modalNameListKeyDownInput = document.querySelectorAll('.modal input');

modalNameListKeyDownInput.forEach(name => {
    name.addEventListener('keydown', function (e) {

        if (!e.target.value.length && (e.keyCode == 16 || e.code == 'Space' || e.code == 'Backspace' || e.code == 'Delete' || e.code == 'ArrowDown' || e.code == 'ArrowUp' || e.code == 'ArrowLeft' || e.code == 'ArrowRight')) {
            return false;
        }

        if (e.code != undefined) {
            if (!e.target.value.length && (e.code.indexOf('Key') < 0 && e.code.indexOf('Digit') < 0 && (e.keyCode != 96 && e.keyCode != 97 && e.keyCode != 98 && e.keyCode != 99 && e.keyCode != 100 && e.keyCode != 101 && e.keyCode != 102 && e.keyCode != 103 && e.keyCode != 104 && e.keyCode != 105))) {
                e.preventDefault();
                return false;
            }
        }

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.nextElementSibling.removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    });

    name.addEventListener('paste', function (e) {
        setTimeout(() => {
            this.value = escapeRegExp(escapeRegExp(this.value.trim(), '', /[^a-zA-Z0-9\s\/.-]/g), ' ', /\s+/g);

            if (!this.value.length) {
                return false;
            }

            if (this.parentElement.classList.contains('is-invalid')) {
                this.parentElement.classList.remove('is-invalid');
                this.nextElementSibling.removeAttribute('data-label-after');
                this.classList.remove('is-invalid');
            }
        }, 0);
    });
});

const inputKeteranganRencana = document.getElementById('input-keterangan-rencana');

inputKeteranganRencana.addEventListener('change', function () {
    if (this.value.length) {
        objectRencana.keterangan = this.value;
    } else {
        delete objectRencana.keterangan;
    }
});

const formRab = document.getElementById('modalFormRab'),
    inputRabList = formRab.querySelectorAll('input');

inputRabList.forEach(inputRab => {
    inputRab.addEventListener('change', function (e) {
        const name = e.target.getAttribute('name');
        if (this.value.length) {
            objectRab[name] = this.value;
        } else {
            delete objectRab[name];
        }
    });
});

function putValueInKeypress(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

const inputPersentase = document.getElementById('input-persentase-pencairan');
let oldValuePersentase,
    inputKeyState;
inputPersentase.addEventListener('keydown', function (e) {
    if (numberToPrice(this.value) == 100 && +e.key >= 0) {
        e.preventDefault();
        return false;
    }

    const prefix = ' %';

    if (e.target.value.indexOf(prefix) >= 0) {
        if (e.code == "ArrowRight" && e.target.selectionStart >= e.target.value.length - prefix.length) {
            e.target.selectionStart = e.target.value.length - prefix.length;
            e.target.selectionEnd = e.target.value.length - prefix.length;
            inputKeyState = 'down';
            e.preventDefault();
            return false;
        }
    }

    if (inputKeyState == 'down') {
        e.preventDefault();
        return false;
    }

    if (e.code == "ArrowUp" || e.code == "ArrowDown" || e.code == "Home" || e.code == "End") {
        if (e.code == "ArrowUp" || e.code == "Home") {
            e.target.selectionStart = 0;
            e.target.selectionEnd = 0;
        } else if (e.code == "ArrowDown" || e.code == "End") {
            if (e.target.value.indexOf(prefix) >= 0) {
                e.target.selectionStart = e.target.value.length - prefix.length;
                e.target.selectionEnd = e.target.value.length - prefix.length;
            }
        }
        inputKeyState = 'down';
        e.preventDefault();
        return false;
    }

    setTimeout(() => {
        if (e.target.value == prefix) {
            e.target.value = '';
            e.preventDefault();
            return false;
        }
    }, 0);
});

inputPersentase.addEventListener('keypress', function (e) {
    if (inputKeyState == 'press') {
        e.preventDefault();
        return false;
    }

    let prefix = ' %';
    if (!(/[0-9\.]/.test(e.key))) {
        e.preventDefault();
        return false;
    }

    if (e.target.value.indexOf('%') >= 0) {
        e.target.value = e.target.value.replace(prefix, '');
    }

    let cStart = e.target.selectionStart,
        cEnd = e.target.selectionEnd,
        nan = +(e.key) / +(e.key) == 1,
        nBlock = (cStart == cEnd);

    if (!nBlock) {
        if (e.target.value.indexOf('%') == -1) {
            e.target.value = percentMask(e, prefix, 'after');
        }
        return false;
    }

    if (e.target.value.indexOf('.') >= 0 && e.key == '.' || e.key == '.' && e.target.value == 100) {
        if (e.target.value.indexOf('%') == -1) {
            e.target.value = percentMask(e, prefix, 'after');
            e.target.selectionStart = e.target.value.length - prefix.length;
            e.target.selectionEnd = e.target.value.length - prefix.length;
        }
        e.preventDefault();
        return false;
    }

    if (e.target.value.indexOf('.') >= 0 && e.key != '.') {
        let indexDecimal = e.target.value.indexOf('.');
        if (e.target.value.indexOf('%') != -1) {
            indexDecimal = indexDecimal + 2;
        }
        if (e.target.value.length - indexDecimal != 2 && e.target.value.length > indexDecimal + 1) {
            if (e.target.value.indexOf('%') == -1) {
                e.target.value = percentMask(e, prefix, 'after');
                e.target.selectionStart = e.target.value.length - prefix.length;
                e.target.selectionEnd = e.target.value.length - prefix.length;
            }
            e.preventDefault();
            return false;
        }
    }

    e.target.value = putValueInKeypress(e.target.value, cStart, e.key);

    if (e.target.value > 100) {
        e.target.value = 100;
        e.target.value = percentMask(e, prefix, 'after');
        e.target.selectionStart = 3;
        e.target.selectionEnd = 3;
        inputKeyState = 'press';
        e.preventDefault();
        return false;
    }

    if (cStart <= 5 && e.key == '0' && e.target.value.substring(0, 3) == '000') {
        e.target.value = +e.target.value;
        if (e.target.value.indexOf('%') == -1) {
            e.target.value = percentMask(e, prefix, 'after');
        }
        return false;
    }

    if (cStart == 1 && e.target.value.substring(0, 1) == '0' && e.target.value.substring(2, 3) == '0' && e.key != '0') {
        e.target.value = +e.target.value;
    }

    if (cStart == 2 && nan && e.key != '0' && e.target.value.substring(0, 2) == '00') {
        e.target.value = +e.target.value;
    }

    if (e.target.value.indexOf('%') == -1) {
        e.target.value = percentMask(e, prefix, 'after');
    }

    e.target.selectionStart = cEnd + 1;
    e.target.selectionEnd = cEnd + 1;

    e.preventDefault();
});

inputPersentase.addEventListener('keyup', function (e) {
    if (inputKeyState == 'press') {
        inputKeyState = 'up';
    }

    const prefix = ' %';

    if (e.target.value.indexOf(prefix) >= 0) {
        if (e.code == "ArrowRight" && e.target.selectionStart >= e.target.value.length - prefix.length) {
            inputKeyState = 'up';
            e.preventDefault();
            return false;
        }
    }

    if (e.code == "ArrowUp" || e.code == "ArrowDown" || e.code == "Home" || e.code == "End") {
        inputKeyState = 'up';
        e.preventDefault();
        return false;
    }
});

inputPersentase.addEventListener('paste', function (e) {
    setTimeout(() => {
        const prefix = ' %';
        e.target.value = escapeRegExp(e.target.value.trim(), '', /[^0-9.]/g);
        if (e.target.value != '' && e.target.value.indexOf(prefix) == -1) {
            e.target.value = percentMask(e, prefix, 'after');
        }
    }, 0);
});

inputPersentase.addEventListener('click', function (e) {
    const prefix = ' %';
    if (this.value.length && e.target.selectionStart > this.value.length - prefix.length) {
        e.target.selectionStart = this.value.length - prefix.length;
        e.target.selectionEnd = this.value.length - prefix.length;
    }
});

function percentMask(event, mask = '', mask_position = 'after') {
    const value = event.target.value;
    if (mask_position == 'before') {
        return mask + value;
    } else {
        return value + mask;
    }
}

const inputPriceList = document.querySelectorAll('.modal .price');
let oldValuePrice = {};
inputPriceList.forEach(price => {
    price.addEventListener('keypress', preventNonNumbersInInput);
    price.addEventListener('keydown', function (e) {
        let prefix = '';
        if (e.code == "ArrowUp" || e.target.selectionStart == 0 && e.target.selectionStart != e.target.selectionEnd && e.code == "ArrowLeft" || e.code == "ArrowLeft" && e.target.selectionStart == prefix.length || e.code == "Home") {
            e.target.selectionStart = prefix.length;
            e.target.selectionEnd = prefix.length;
            e.preventDefault();
            return false;
        }
        if (e.code == "Delete" || e.code == "Backspace") {
            oldValuePrice[price.getAttribute('name')] = this.value;
            if (e.target.selectionStart <= prefix.length && e.target.selectionStart == e.target.selectionEnd && e.code == "Backspace") {
                e.target.selectionStart = prefix.length;
                e.target.selectionEnd = prefix.length;
                e.preventDefault();
                return false;
            }
        }
    });
    price.addEventListener('keyup', function (e) {
        let ceret = e.target.selectionStart,
            numberTPArray = numberToPrice(this.value, '', e),
            value = numberTPArray[0],
            sisa = numberTPArray[1],
            ribuan = numberTPArray[2],
            prefix = numberTPArray[3];

        this.value = value;
        if (e.code != undefined) {
            if (e.code.match('Digit')) {
                if (ribuan != null) {
                    if ((sisa == 1 && ceret + sisa > value.length - 3) || (sisa == 1 && ceret != prefix.length + 1 && ceret != value.length - prefix.length)) {
                        ceret++;
                    }
                    e.target.selectionStart = ceret;
                    e.target.selectionEnd = ceret;
                }
            }
        }

        if (e.code == "Delete") {
            if (ribuan != null) {
                if (sisa == 0 && ceret != prefix.length && ceret != this.value.length && ceret != this.value.length - 1 || sisa == 0 && ceret >= this.value.length - 3 && ceret > prefix.length) {
                    ceret--;
                }
                if (oldValuePrice[price.getAttribute('name')] == this.value) {
                    if (sisa == 0) {
                        ceret += 2;
                    } else if (sisa == 2) {
                        ceret++;
                    } else {
                        ceret++;
                    }
                    this.value = numberToPrice(removeByIndex(this.value, ceret), prefix);
                    if (sisa == 1) {
                        ceret--;
                    }
                }
                e.target.selectionStart = ceret;
                e.target.selectionEnd = ceret;
            }
        }

        if (e.code == "Backspace") {
            if (ceret <= prefix.length && ribuan == null || ribuan != null && sisa == 0 && ceret == prefix.length) {
                e.target.selectionStart = ceret;
                e.target.selectionEnd = ceret;
            }
            if (ribuan != null && ceret > prefix.length) {
                if (sisa == 0 && oldValuePrice[price.getAttribute('name')] != this.value) {
                    ceret--;
                }
                if (oldValuePrice[price.getAttribute('name')] == this.value) {
                    this.value = numberToPrice(removeByIndex(this.value, --ceret), prefix);
                    if (sisa == 1 && ceret > prefix.length + 1) {
                        ceret--;
                    }
                }
                e.target.selectionStart = ceret;
                e.target.selectionEnd = ceret;
            }
        }
    });
    price.addEventListener('change', function () {
        if (typeof this.value == "string") {
            if (priceToNumber(this.value) > 0) {
                this.value = priceToNumber(this.value);
            }
        }
        this.value = numberToPrice(this.value, '');
    });
    price.addEventListener('paste', function (e) {
        setTimeout(() => {
            this.value = numberToPrice(escapeRegExp(escapeRegExp(this.value.trim(), '', /[^a-zA-Z0-9\s\/.]/g), ' ', /\s+/g), '');
        }, 0);
    });
});

const inputNamaKebutuhan = document.getElementById('input-nama-kebutuhan');

inputNamaKebutuhan.addEventListener('change', function () {
    if (this.value.length) {
        objectKebutuhan.nama = this.value;
    } else {
        delete objectKebutuhan.nama;
    }
});

const tambahItemRab = document.getElementById('tambah-item-rab');

if (tambahItemRab != null) {
    tambahItemRab.addEventListener('click', function () {
        console.log('asdasd')
        let mTarget = this.getAttribute('data-target');
        mTarget = document.querySelector(mTarget);
        mTarget.querySelector('#formJudul').setAttribute('data-mode', 'create');
        mTarget.querySelector('#formJudul').innerText = 'Tambah';
        if (mTarget.querySelector('.btn[type="reset"]') != null) {
            mTarget.querySelector('.btn[type="reset"]').innerText = "Kosongkan";
            mTarget.querySelector('.btn[type="reset"]').setAttribute('type', 'clear');
        }
        console.log(mTarget.querySelector('#formJudul'));
    });
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.parentElement.id == 'tambah-item-rab') {
        // e.target.parentElement.addEventListener('click', function () {
        let mTarget = e.target.parentElement.getAttribute('data-target');
        mTarget = document.querySelector(mTarget);
        mTarget.querySelector('#formJudul').setAttribute('data-mode', 'create');
        mTarget.querySelector('#formJudul').innerText = 'Tambah';
        if (mTarget.querySelector('.btn[type="reset"]') != null) {
            mTarget.querySelector('.btn[type="reset"]').innerText = "Kosongkan";
            mTarget.querySelector('.btn[type="reset"]').setAttribute('type', 'clear');
        }
        console.log(mTarget.querySelector('#formJudul'));
        // });
    } else if (e.target && e.target.classList.contains('update')) {
        // updateListRab.forEach(update => {
        // update.addEventListener('click', function (e) {
        const tr = e.target.closest('tr');
        if (tr == null) {
            console.log('TR data-id-rab is null');
            return false;
        }
        const idRab = tr.getAttribute('data-id-rab');
        // fetch
        let url = '/admin/fetch/rab/read/' + idRab;

        // fetch success
        const modalFRab = document.getElementById('modalFormRab');
        modalFRab.querySelector('#formJudul').setAttribute('data-mode', 'update');
        modalFRab.querySelector('#formJudul').innerText = 'Ubah';
        console.log(modalFRab.querySelector('#formJudul'));
        // data result
        let result = {
            id_rab: "1",
            id_kebutuhan: "1",
            harga_satuan: "100.000",
            jumlah: "100",
            keterangan: "g elit. Fuga eum quia cum totam quos perspiciatis."
        };
        resultRab = result;
        modalFRab.querySelector('#id-kebutuhan').value = result.id_kebutuhan;
        modalFRab.querySelector('#input-harga-satuan').value = result.harga_satuan;
        modalFRab.querySelector('#input-jumlah').value = result.jumlah;
        modalFRab.querySelector('#input-keterangan-rab').value = result.keterangan;

        // for select2
        $('#id-kebutuhan').select2('val', result.id_kebutuhan);

        if (modalFRab.querySelector('.btn[type="clear"]') != null) {
            modalFRab.querySelector('.btn[type="clear"]').innerText = "Reset";
            modalFRab.querySelector('.btn[type="clear"]').setAttribute('type', 'reset');
        }
        objectRab = {};
        $('#modalFormRab').modal('show');
        // });
        // });
    } else if (e.target && e.target.classList.contains('delete')) {
        // deleteListRab.forEach(deleteEl => {
        // deleteEl.addEventListener('click', function (e) {
        const tr = e.target.closest('tr');
        if (tr == null) {
            console.log('TR data-id-rab is null');
            return false;
        }
        const idRab = tr.getAttribute('data-id-rab');
        // fetch
        let url = '/admin/fetch/rab/read/' + idRab;

        // fetch success
        const modalKDeleteRab = document.getElementById('modalKonfirmasiHapusRab');
        // data result
        let result = {
            id_rab: "1",
            nama: "Operasional",
            keterangan: "g elit. Fuga eum quia cum totam quos perspiciatis."
        };
        resultRab = result;
        modalKDeleteRab.querySelector('#kebutuhan').innerText = result.nama;
        modalKDeleteRab.querySelector('#spec-ket').innerText = result.keterangan;

        $('#modalKonfirmasiHapusRab').modal('show');
        // });
        // });
    }
});

let resultRab = {};
const updateListRab = document.querySelectorAll('#rab table .btn.update');

updateListRab.forEach(update => {
    update.addEventListener('click', function (e) {
        const tr = e.target.closest('tr');
        if (tr == null) {
            console.log('TR data-id-rab is null');
            return false;
        }
        const idRab = tr.getAttribute('data-id-rab');
        // fetch
        let url = '/admin/fetch/rab/read/' + idRab;

        // fetch success
        const modalFRab = document.getElementById('modalFormRab');
        modalFRab.querySelector('#formJudul').setAttribute('data-mode', 'update');
        modalFRab.querySelector('#formJudul').innerText = 'Ubah';
        console.log(modalFRab.querySelector('#formJudul'));
        // data result
        let result = {
            id_rab: "1",
            id_kebutuhan: "1",
            harga_satuan: "100.000",
            jumlah: "100",
            keterangan: "g elit. Fuga eum quia cum totam quos perspiciatis."
        };
        resultRab = result;
        modalFRab.querySelector('#id-kebutuhan').value = result.id_kebutuhan;
        modalFRab.querySelector('#input-harga-satuan').value = result.harga_satuan;
        modalFRab.querySelector('#input-jumlah').value = result.jumlah;
        modalFRab.querySelector('#input-keterangan-rab').value = result.keterangan;

        // for select2
        $('#id-kebutuhan').select2('val', result.id_kebutuhan);

        if (modalFRab.querySelector('.btn[type="clear"]') != null) {
            modalFRab.querySelector('.btn[type="clear"]').innerText = "Reset";
            modalFRab.querySelector('.btn[type="clear"]').setAttribute('type', 'reset');
        }
        objectRab = {};
        $('#modalFormRab').modal('show');
    });
});

const deleteListRab = document.querySelectorAll('#rab table .btn.delete');
deleteListRab.forEach(deleteEl => {
    deleteEl.addEventListener('click', function (e) {
        const tr = e.target.closest('tr');
        if (tr == null) {
            console.log('TR data-id-rab is null');
            return false;
        }
        const idRab = tr.getAttribute('data-id-rab');
        // fetch
        let url = '/admin/fetch/rab/read/' + idRab;

        // fetch success
        const modalKDeleteRab = document.getElementById('modalKonfirmasiHapusRab');
        // data result
        let result = {
            id_rab: "1",
            nama: "Kebutuhan 1",
            keterangan: "g elit. Fuga eum quia cum totam quos perspiciatis."
        };
        resultRab = result;
        modalKDeleteRab.querySelector('#kebutuhan').innerText = result.nama;
        modalKDeleteRab.querySelector('#spec-ket').innerText = result.keterangan;

        $('#modalKonfirmasiHapusRab').modal('show');
    });
});

// Clear
const clearList = document.querySelectorAll('[type="clear"]');

clearList.forEach(btn => {
    btn.addEventListener('click', function (e) {
        let type = this.getAttribute('type');
        if (type == 'clear') {
            this.closest('.modal').querySelectorAll('input').forEach(input => {
                input.value = '';
                if (input.hasAttribute('maxlength')) {
                    input.parentElement.querySelector('.current-length').innerText = 0;
                }
            });
            this.closest('.modal').querySelectorAll('textarea').forEach(textarea => {
                textarea.value = '';
                if (input.hasAttribute('maxlength')) {
                    input.parentElement.querySelector('.current-length').innerText = 0;
                }
            });
            this.closest('.modal').querySelectorAll('select').forEach(select => {
                select.value = '0';

                // for select2
                $('#' + select.getAttribute('id')).val(0).trigger('change');
            });
            const modalId = this.closest('.modal').getAttribute('id');

            if (modalId == 'modalTambahKebutuhan') {
                objectKebutuhan = {};
            }

            if (modalId == 'modalFormRab') {
                objectRab = {};
            }
        }

        if (type == 'reset') {
            e.target.closest('.modal').querySelector('#id-kebutuhan').value = resultRab.id_kebutuhan;
            e.target.closest('.modal').querySelector('#input-harga-satuan').value = resultRab.harga_satuan;
            e.target.closest('.modal').querySelector('#input-jumlah').value = resultRab.jumlah;
            e.target.closest('.modal').querySelector('#input-keterangan-rab').value = resultRab.keterangan;

            if (e.target.closest('.modal').querySelector('#input-keterangan-rab').hasAttribute('maxlength')) {
                e.target.closest('.modal').querySelector('#input-keterangan-rab').parentElement.querySelector('.current-length').innerText = resultRab.keterangan.length;
            }

            // for select2
            $('#id-kebutuhan').select2('val', resultRab.id_kebutuhan);
            objectRab = {};
        }

        data = {};

        e.target.closest('.modal').querySelectorAll('[name]').forEach(name => {
            if (!name.classList.contains('is-invalid')) {
                return;
            }
            let fromGroup = name.parentElement;
            fromGroup.querySelector('label').removeAttribute('data-label-after');
            fromGroup.classList.remove('is-invalid');
            name.classList.remove('is-invalid');
        });
    });
});

function statusRencana(status) {
    switch (status.toUpperCase()) {
        case 'TD':
            return ['Tidak Disetujui', 'bg-gradient-danger'];
            break;

        case 'SD':
            return ['Sudah Disetujui', 'bg-gradient-success'];
            break;

        case 'BP':
            return ['Butuh Perbaikan', 'bg-gradient-warning'];
            break;

        default:
            break;
    }
}

// Submit
const submitList = document.querySelectorAll('.modal [type="submit"]');

submitList.forEach(submit => {
    submit.addEventListener('click', function (e) {
        if (e.target.getAttribute('type') == 'button') {
            if (e.target.getAttribute('id') == 'buat-pencairan') {
                e.target.closest('.modal').querySelector('#tab-rencana').classList.remove('active');
                e.target.closest('.modal').querySelector('#tab-rencana').classList.remove('show');
                e.target.closest('.modal').querySelector('#tab-pencairan').classList.add('active');
                e.target.closest('.modal').querySelector('#tab-pencairan').classList.add('show');
            }
            e.preventDefault();
            return false;
        }

        const modalId = e.target.closest('.modal').getAttribute('id');
        let invalidModal = false,
            namaKebutuhan = undefined;

        switch (modalId) {
            case 'modalTambahKebutuhan':

                data.mode = 'create';
                if (Object.keys(objectKebutuhan).length) {
                    data.fields = objectKebutuhan;
                    data.table = 'kebutuhan';
                } else {
                    delete data.fields;
                }
                break;

            case 'modalFormRab':

                const mode = document.getElementById('formJudul').getAttribute('data-mode');
                if (mode !== 'create' && mode !== 'update') {
                    console.log('Unrecognize mode on #' + modalId);
                    return false;
                }

                data.mode = mode;
                if (Object.keys(objectRab).length) {
                    namaKebutuhan = objectRab.nama_kebutuhan;
                    delete objectRab.nama_kebutuhan;
                    data.fields = objectRab;
                    data.table = 'rencana_anggaran_belanja';
                    data.id_rencana = objectRencana.id_rencana;
                    if (mode == 'update') {
                        const objectNewRab = diff(resultRab, data.fields);
                        if (Object.keys(objectNewRab).length) {
                            data.id_rab = resultRab.id_rab;
                            data.fields = objectNewRab;
                        } else {
                            data = {};
                        }
                    }
                } else {
                    delete data.fields;
                }
                break;

            case 'modalBuatRencana':

                data.mode = 'create';
                if (Object.keys(objectRencana).length) {
                    data.fields = objectRencana;
                    data.table = 'rencana';
                } else {
                    delete data.fields;
                }
                break;

            case 'modalKonfirmasiHapusRab':
                data.mode = 'delete';
                data.id_rab = resultRab.id_rab;
                data.table = 'rencana_anggaran_belanja';
                break;

            case 'modalKonfirmasiAksi':
                data.mode = 'update';
                if (Object.keys(objectRencana).length) {
                    data.fields = objectRencana;
                    data.id_rencana = objectRencana.id_rencana;
                    delete objectRencana.id_rencana;
                    data.table = 'rencana';
                } else {
                    delete data.fields;
                }
                break;

            case 'modalKeteranganPerbaikanRAB':
                data.mode = 'update';
                if (Object.keys(objectRencana).length && e.target.closest('.modal').querySelector('textarea').value.length) {
                    data.fields = {
                        status: 'BP',
                        pesan: e.target.closest('.modal').querySelector('textarea').value
                    };
                    data.id_rencana = objectRencana.id_rencana;
                    delete objectRencana.id_rencana;
                    data.table = 'rencana';
                } else {
                    delete data.fields;
                }
                break;

            default:
                invalidModal = true;
                break;
        }

        if (invalidModal) {
            console.log('Unrecognize modal ID');
            return false;
        }

        let c_error = 0,
            nameList;

        if (modalId == 'modalBuatRencana') {
            nameList = e.target.closest('.modal').querySelectorAll('.tab-pane.active.show [name]');

        } else {
            nameList = e.target.closest('.modal').querySelectorAll('[name]');
        }

        nameList.forEach(name => {
            let error = false;
            if (name.tagName.toLowerCase() == 'select') {
                if (name.value == '0') {
                    error = true;
                }
            }

            if (name.tagName.toLowerCase() == 'input') {
                if (!name.value.length) {
                    error = true;
                }
            }

            if (name.tagName.toLowerCase() == 'textarea') {
                if (!name.value.length) {
                    error = true;
                }
            }

            if (error) {
                c_error++;
                if (!name.parentElement.classList.contains('is-invalid')) {
                    name.parentElement.classList.add('is-invalid');
                    name.classList.add('is-invalid');
                    name.parentElement.querySelector('label').setAttribute('data-label-after', 'wajib diisi');
                }
            } else {
                if (name.parentElement.classList.contains('is-invalid')) {
                    name.parentElement.classList.remove('is-invalid');
                    name.classList.remove('is-invalid');
                    name.parentElement.querySelector('label').removeAttribute('data-label-after');
                }
            }
        });

        if (c_error > 0) {
            return false;
        }

        const url = '/admin/fetch/' + data.mode + '/' + data.table;
        let dataMode = data.mode,
            dataTable = data.table,
            message;
        delete data.mode;
        delete data.table;

        if (!Object.keys(data).length) {
            console.log('Failed to fetch, no data object!')
            return false;
        }
        // fetch Here
        console.log(data);
        console.log(url);

        // if fetch success 
        if (modalId != 'modalBuatRencana') {
            message = 'Berhasil ' + dataMode + ' data ' + dataTable.replaceAll('_', ' ');

            nameList.forEach(name => {
                if (name.tagName.toLowerCase() == 'select') {
                    name.value = '0';

                    // for select2
                    $('#' + name.getAttribute('id')).select2('val', '0');
                }

                if (name.tagName.toLowerCase() == 'input') {
                    name.value = '';
                    if (name.hasAttribute('maxlength')) {
                        name.parentElement.querySelector('.current-length').innerText = 0;
                    }
                }

                if (name.tagName.toLowerCase() == 'textarea') {
                    name.value = '';
                    if (name.hasAttribute('maxlength')) {
                        name.parentElement.querySelector('.current-length').innerText = 0;
                    }
                }
            });

            if (modalId == 'modalFormRab') {
                if (dataMode == 'create') {
                    // return
                    const dataRab = {
                        id_rab: 1,
                        total_anggaran: '10.000.000'
                    };

                    if (document.querySelector('#rab table>tbody>tr:not([data-id-rab])') != undefined) {
                        document.querySelector('#rab table>tbody>tr:not([data-id-rab])').remove();
                    }

                    const trRab = '<tr data-id-rab="' + dataRab.id_rab + '" class="highlight"><td>' + namaKebutuhan + '</td><td>' + data.fields.keterangan + '</td><td>' + data.fields.harga_satuan + '</td><td>' + data.fields.jumlah + '</td><td>' + numberToPrice(priceToNumber(data.fields.harga_satuan) * priceToNumber(data.fields.jumlah)) + '</td><td class="px-0"><a href="#" class="btn btn-outline-danger btn-sm font-weight-bolder delete">Hapus</a></td><td><a href="#" class="btn btn-outline-orange btn-sm font-weight-bolder update">Ubah</a></td></tr>';
                    document.querySelector('#rab table>tbody').insertAdjacentHTML('afterbegin', trRab);
                    document.querySelector('#rab .bg-lighter .mb-0').innerText = 'Rp. ' + dataRab.total_anggaran;
                    setTimeout(() => {
                        document.querySelector('#rab table>tbody>tr[data-id-rab="' + dataRab.id_rab + '"]').classList.remove('highlight');
                    }, 3000);
                }

                if (dataMode == 'update') {
                    const trRabUpdateEl = document.querySelector('#rab table>tbody>tr[data-id-rab="' + data.id_rab + '"]');
                    Object.keys(data.fields).forEach(key => {
                        if (key == 'id_kebutuhan') {
                            trRabUpdateEl.children[0].innerText = namaKebutuhan;
                        } else if (key == 'keterangan') {
                            trRabUpdateEl.children[1].innerText = data.fields.keterangan;
                        } else if (key == 'harga_satuan' && data.fields.jumlah == null) {
                            trRabUpdateEl.children[2].innerText = data.fields.harga_satuan;
                            trRabUpdateEl.children[4].innerText = numberToPrice(priceToNumber(data.fields.harga_satuan) * priceToNumber(resultRab.jumlah));
                        } else if (key == 'jumlah' && data.fields.harga_satuan == null) {
                            trRabUpdateEl.children[3].innerText = data.fields.jumlah;
                            trRabUpdateEl.children[4].innerText = numberToPrice(priceToNumber(resultRab.harga_satuan) * priceToNumber(data.fields.jumlah));
                        }
                    });
                    trRabUpdateEl.classList.add('highlight');
                    setTimeout(() => {
                        trRabUpdateEl.classList.remove('highlight');
                    }, 3000);
                }
            }

            if (modalId == 'modalKonfirmasiHapusRab') {
                const trRabDeleteEl = document.querySelector('#rab table>tbody>tr[data-id-rab="' + data.id_rab + '"]');
                trRabDeleteEl.remove();
            }

            $('#' + modalId).modal('hide');
        } else {
            e.target.closest('.modal').querySelector('#id-bantuan').setAttribute('disabled', 'true');
            e.target.closest('.modal').querySelector('#input-keterangan-rencana').setAttribute('disabled', 'true');

            const optionList = e.target.closest('.modal').querySelector('#id-bantuan').children;
            for (let index = 0; index < optionList.length; index++) {
                const element = optionList[index];
                if (element.value != data.fields.id_bantuan) {
                    element.setAttribute('disabled', 'true');
                }
            }

            objectRencana = {
                id_rencana: '10'
            };

            e.target.closest('#action').querySelector('[data-dismiss="modal"]').innerText = 'Tutup';

            e.target.innerText = 'Lanjut Pencairan';
            e.target.setAttribute('type', 'button');
            e.target.setAttribute('id', 'buat-pencairan');

            const rencanaEl = document.querySelector('#' + modalId + ' #rencana');
            const rabEl = '<div class="col-12 px-0 d-flex gap-4 flex-column" id="rab"><div class="row m-0"><button class="col-12 col-md-auto px-0 btn btn-primary m-0" data-target="#modalFormRab" data-toggle="modal" id="tambah-item-rab" type="button"><span class="p-3">Tambah Item</span></button><div class="col-12 col-md d-flex p-3 bg-lighter rounded align-items-center gap-x-2"><i class="fa-info fa"></i><h4 class="mb-0">Rp. 0</h4></div></div><table class="table table-borderless table-hover list-rab"><thead class="thead-light"><tr><th>Kebutuhan</th><th>Keterangan / Spesifikasi</th><th>Harga Satuan</th><th>Jumlah</th><th>Sub Total</th><th colspan="2" class="fit text-center">Aksi</th></tr></thead><tbody><tr><td colspan="6">Belum ada item RAB yang dibuat</td></tr></tbody></table></div>';
            rencanaEl.insertAdjacentHTML('afterend', rabEl);
            message = 'Rencana anggaran baru telah dibuat';
        }

        if (modalId == 'modalKonfirmasiAksi') {
            const targetDataModal = document.getElementById(relatedModal),
                statusR = statusRencana(data.fields.status);

            targetDataModal.querySelector('#status-rencana').innerText = statusR[0];
            relatedTarget.querySelector('span.status').innerText = statusR[0].toLowerCase();
            relatedTarget.querySelector('span.status').previousElementSibling.setAttribute('class', statusR[1]);
            relatedTarget.classList.add('highlight');
            message = message + ' menjadi <b>' + statusR[0].toLowerCase() + '</b>';
            setTimeout(() => {
                relatedTarget.classList.remove('highlight');
            }, 3000);
            $('#' + relatedModal).modal('hide');
        }

        if (modalId == 'modalKeteranganPerbaikanRAB') {
            let statusR = statusRencana(data.fields.status);
            document.querySelector('#modalRincianRAB #status-rencana').innerText = statusR[0];
            relatedTarget.querySelector('span.status').innerText = statusR[0].toLowerCase();
            relatedTarget.querySelector('span.status').previousElementSibling.setAttribute('class', statusR[1]);
            relatedTarget.classList.add('highlight');
            message = message + ' menjadi <b>' + statusR[0].toLowerCase() + '</b>';
            setTimeout(() => {
                relatedTarget.classList.remove('highlight');
            }, 3000);
            $('#modalRincianRAB').modal('hide');
        }


        $('.toast[data-toast="feedback"] .toast-header .small-box').removeClass('bg-danger').addClass('bg-success');
        $('.toast[data-toast="feedback"] .toast-header strong').text('Informasi');
        // End of submit
        $('.toast[data-toast="feedback"] .toast-body').html(message);
        $('.toast[data-toast="feedback"] .time-passed').text('Baru Saja');
        $('.toast').toast('show');
        data = {};
    });
});

function diff(prevObject, nextObject) {
    return Object.entries(nextObject).reduce((acc, cv) => {
        if (JSON.stringify(nextObject[cv[0]]) != JSON.stringify(prevObject[cv[0]]))
            acc.push(cv);
        return acc;
    }, []).reduce((acc, cv) => {
        acc[cv[0]] = cv[1];
        return acc;
    }, {});
}

let fetchData = function (url, data, root) {
    // Fetch with token
    fetch(url, {
        method: "POST",
        cache: "no-cache",
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(function (result) {
            let sentData = data;
            if (result.error == false) { }
            else { }
        })
};

let x = [
    { id_kebutuhan: 1, nama: 'Operasional', kategori: 'Jasa', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 2, nama: 'Kebutuhan 1', kategori: 'Barang', jumlah_item_rab_ini: '1' },
    { id_kebutuhan: 3, nama: 'Snak', kategori: 'Makanan', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 4, nama: 'Air Mineral', kategori: 'Minuman', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 5, nama: 'Galon', kategori: 'Barang', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 6, nama: 'Minibus Pickup', kategori: 'Kendaraan', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 7, nama: 'Engkel Box', kategori: 'Kendaraan', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 8, nama: 'Double Engkel', kategori: 'Kendaraan', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 9, nama: 'Geo Elektrik', kategori: 'Jasa', jumlah_item_rab_ini: '0' },
    { id_kebutuhan: 10, nama: 'Box Snak', kategori: 'Barang', jumlah_item_rab_ini: '0' }
];

function formatKebutuhan(kebut) {
    if (kebut.loading) {
        return kebut.text;
    }
    let $kebut;
    if (kebut.jumlah_item_rab_ini == null || kebut.jumlah_item_rab_ini == undefined || kebut.jumlah_item_rab_ini == '0') {
        $kebut = '<div class="font-weight-bolder">' + kebut.text + '</div>'
    } else {
        $kebut = '<div class="row w-100 m-0 align-items-center"><div class="col p-0"><span class="font-weight-bold">' + kebut.text + '</span></div><div class="col-auto px-1 d-flex align-items-center"><span class="badge badge-circle badge-primary border-white badge-sm badge-floating font-weight-bold">' + kebut.jumlah_item_rab_ini + '</span></div></div>'
    }
    return $kebut;
};

function formatSelected(objectSelected) {
    const label = objectSelected.element.closest('select').parentElement.querySelector('label');

    if (objectSelected.loading) {
        return objectSelected.text;
    }

    let $elSelected = '';

    if (label != null) {
        $elSelected = label.outerHTML;
    }

    if (objectSelected.jumlah_item_rab_ini == null || objectSelected.jumlah_item_rab_ini == undefined || objectSelected.jumlah_item_rab_ini == '0') {
        $elSelected = $elSelected + '<div class="font-weight-normal">' + objectSelected.text + '</div>';
    } else {
        $elSelected = $elSelected + '<div class="row w-100 m-0 align-items-center"><div class="col p-0"><span class="font-weight-bold">' + objectSelected.text + '</span></div><div class="col-auto px-1 d-flex align-items-center"><span class="badge badge-circle badge-primary border-white badge-sm badge-floating font-weight-bold">' + objectSelected.jumlah_item_rab_ini + '</span></div></div>'
    }
    return $elSelected;

}

function selectLabelKebutuhan(array) {
    return Object.values(array.reduce((accu, { id_kebutuhan: id, kategori: text, nama, jumlah_item_rab_ini }) => {
        (accu[text] ??= { text, children: [] }).children.push({ id, text: nama, jumlah_item_rab_ini });
        return accu;
    }, {}));
}

// Select2 for Kebutuhan
function modelMatcher(params, data) {
    data.parentText = data.parentText || "";

    // Always return the object if there is nothing to compare
    if ($.trim(params.term) === '') {
        return data;
    }

    // Do a recursive check for options with children
    if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
            var child = data.children[c];
            child.parentText += data.parentText + " " + data.text;

            var matches = modelMatcher(params, child);

            // If there wasn't a match, remove the object in the array
            if (matches == null) {
                match.children.splice(c, 1);
            }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
            return match;
        }

        // If there were no matching children, check just the plain object
        return modelMatcher(params, match);
    }

    // If the typed-in term matches the text of this term, or the text from any
    // parent term, then it's a match.
    var original = (data.parentText + ' ' + data.text).toUpperCase();
    var term = params.term.toUpperCase();

    // Check if the text contains the term
    if (original.indexOf(term) > -1) {
        return data;
    }

    // If it doesn't contain the term, don't return anything
    return null;
}

// console.log(selectLabelKebutuhan(x));

$('#id-kebutuhan').select2({
    placeholder: "Pilih salah satu",
    data: selectLabelKebutuhan(x),
    matcher: modelMatcher,
    escapeMarkup: function (markup) { return markup; },
    templateResult: formatKebutuhan,
    templateSelection: formatSelected
}).on('select2:select', function (e) {
    if (this.value != '0') {
        objectRab.id_kebutuhan = this.value;
        objectRab.nama_kebutuhan = e.params.data.text;

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectRab.id_kebutuhan;
    }
}).on('select2:open', function () {
    if ($(this).hasClass("select2-hidden-accessible")) {
        if ($(this).hasClass('is-invalid')) {
            $('#select2-' + $(this).attr('id') + '-results').parents('span.select2-dropdown').addClass('is-invalid');
        } else {
            $('#select2-' + $(this).attr('id') + '-results').parents('span.select2-dropdown').removeClass('is-invalid');
        }
    }
});

let xBantuan = [
    { id_bantuan: 1, text: 'Bantuan 1' },
    { id_bantuan: 2, text: 'Bantuan 2' },
    { id_bantuan: 3, text: 'Bantuan 3' }
];

$('#id-bantuan').select2({
    placeholder: "Pilih salah satu",
    escapeMarkup: function (markup) { return markup; },
    templateSelection: formatSelected
}).on('select2:select', function (e) {
    if (this.value != '0') {
        objectRencana.id_bantuan = this.value;

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }

        // fetch data
        const result = {
            max_anggaran: '3.000.000'
        };
        // fetch success
        const elment = document.getElementById('rencana-program');
        if (document.getElementById('balance') == null) {
            let boxInfo = '<div class="px-0 col-12 col-md bg-lighter rounded"><div class="p-3" id="balance"><h4 class="mb-1">Total Max Anggaran</h4><div class="text-sm">' + result.max_anggaran + '</div></div></div>';
            elment.insertAdjacentHTML('afterend', boxInfo);
        } else {
            document.querySelector('#balance>.text-sm').innerText = result.max_anggaran;
        }
    } else {
        delete objectRencana.id_bantuan;
    }
}).on('select2:open', function () {
    if ($(this).hasClass("select2-hidden-accessible")) {
        if ($(this).hasClass('is-invalid')) {
            $('#select2-' + $(this).attr('id') + '-results').parents('span.select2-dropdown').addClass('is-invalid');
        } else {
            $('#select2-' + $(this).attr('id') + '-results').parents('span.select2-dropdown').removeClass('is-invalid');
        }
    }
});

$('#id-kategori').select2({
    placeholder: "Pilih salah satu",
    escapeMarkup: function (markup) { return markup; },
    templateSelection: formatSelected
}).on('select2:select', function (e) {
    if (this.value != '0') {
        objectKebutuhan.id_kategori = this.value;

        if (this.parentElement.classList.contains('is-invalid')) {
            this.parentElement.classList.remove('is-invalid');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectKebutuhan.id_kategori;
    }
}).on('select2:open', function () {
    if ($(this).hasClass("select2-hidden-accessible")) {
        if ($(this).hasClass('is-invalid')) {
            $('#select2-' + $(this).attr('id') + '-results').parents('span.select2-dropdown').addClass('is-invalid');
        } else {
            $('#select2-' + $(this).attr('id') + '-results').parents('span.select2-dropdown').removeClass('is-invalid');
        }
    }
});

function doAbsoluteFirstAdd(table) {
    let theadThEl = table.querySelector('thead tr > th:first-of-type'),
        theadThFW = theadThEl.offsetWidth,
        tfootThEl = table.querySelector('tfoot tr > th:first-of-type'),
        tableHW = table.offsetWidth / 2;

    let tbodyTFW = 0;

    if (theadThFW > tableHW) {
        theadThFW = tableHW;
        tbodyTFW = tableHW;
    }

    if (tbodyTFW == 0) {
        table.querySelectorAll('tbody tr > *:first-of-type').forEach(el => {
            if (tableHW <= el.offsetWidth) {
                tbodyTFW = tableHW;
                theadThFW = tableHW;
                return false;
            }
            if (el.offsetWidth > theadThFW) {
                theadThFW = el.offsetWidth;
            } else {
                tbodyTFW = theadThFW;
            }
            if (tbodyTFW < el.offsetWidth) {
                tbodyTFW = el.offsetWidth;
            }
        });
    }

    theadThEl.setAttribute('style', 'width: ' + theadThFW + 'px');
    theadThEl.nextElementSibling.setAttribute('style', 'padding-left: calc(' + theadThFW + 'px + 1rem)');
    // theadThEl.parentElement.setAttribute('style', 'height: ' + theadThEl.offsetHeight + 'px');

    table.querySelectorAll('tbody tr > *:first-of-type').forEach(el => {
        el.setAttribute('style', 'width:' + tbodyTFW + 'px');
        el.nextElementSibling.setAttribute('style', 'padding-left: calc(' + tbodyTFW + 'px + 1rem)');
        if (el.querySelector('span') != null) {
            const computedStyle = getComputedStyle(el);
            let elementWidth = el.clientWidth;
            elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
            if (el.querySelector('span').offsetWidth > elementWidth) {
                el.parentElement.setAttribute('style', '');
                setTimeout(() => {
                    el.parentElement.setAttribute('style', 'height: ' + el.offsetHeight + 'px');
                }, 0)
            }
        }
    });

    tfootThEl.setAttribute('style', 'width: ' + theadThFW + 'px');
    tfootThEl.nextElementSibling.setAttribute('style', 'padding-left: calc(' + theadThFW + 'px + 1rem)');
    // tfootThEl.parentElement.setAttribute('style', 'height: ' + tfootThEl.offsetHeight + 'px');
}

function doAbsoluteFirstRemove(table) {
    let theadThEl = table.querySelector('thead tr > th:first-of-type'),
        tfootThEl = table.querySelector('tfoot tr > th:first-of-type');

    theadThEl.removeAttribute('style');
    theadThEl.nextElementSibling.removeAttribute('style');
    theadThEl.parentElement.removeAttribute('style');

    table.querySelectorAll('tbody tr > *:first-of-type').forEach(el => {
        el.removeAttribute('style');
        el.nextElementSibling.removeAttribute('style');
        el.parentElement.removeAttribute('style');
    });

    tfootThEl.removeAttribute('style');
    tfootThEl.nextElementSibling.removeAttribute('style');
    tfootThEl.parentElement.removeAttribute('style');
}

const tableAbsoluteFirstList = document.querySelectorAll('table.table-absolute-first');
if (tableAbsoluteFirstList.length > 0) {
    tableAbsoluteFirstList.forEach(table => {
        if (table.classList.contains('table-responsive')) {
            doAbsoluteFirstAdd(table);
        }
    });
    let resizeTimeoutRab
    window.addEventListener('resize', function (e) {
        clearTimeout(resizeTimeoutRab)
        resizeTimeoutRab = setTimeout(() => {
            if (tableAbsoluteFirstList.length > 0) {
                tableAbsoluteFirstList.forEach(table => {
                    if (table.classList.contains('table-responsive')) {
                        doAbsoluteFirstAdd(table);
                    } else {
                        doAbsoluteFirstRemove(table);
                    }
                })
            }
        }, 50);
    })
}