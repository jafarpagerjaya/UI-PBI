let data = {},
    relatedModal,
    relatedTarget;

$('#modalBuatRencana').on('hidden.bs.modal', function (e) {
    e.target.querySelector('#id-bantuan').removeAttribute('disabled');
    e.target.querySelector('#id-bantuan').value = '0';
    e.target.querySelector('#input-keterangan-rencana').value = '';

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

    delete data.fields;
    objectRencana = {};
});

$('#modalFormRab').on('show.bs.modal', function () {
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

// Input
const modalNameListKeyDown = document.querySelectorAll('.modal input');

modalNameListKeyDown.forEach(name => {
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

const inputNamaKebutuhan = document.getElementById('input-nama-kebutuhan');

inputNamaKebutuhan.addEventListener('change', function () {
    if (this.value.length) {
        objectKebutuhan.nama = this.value;
    } else {
        delete objectKebutuhan.nama;
    }
});

const tambahItemRab = document.getElementById('tambah-item-rab');

tambahItemRab.addEventListener('click', function () {
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
            });
            this.closest('.modal').querySelectorAll('textarea').forEach(textarea => {
                textarea.value = '';
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
        const modalId = e.target.closest('.modal').getAttribute('id');
        let invalidModal = false;


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
                    data.fields = objectRab;
                    data.table = 'rencana_anggaran_belanja';
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

        let c_error = 0;
        const nameList = e.target.closest('.modal').querySelectorAll('[name]');
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
            message = 'Berhasil ' + dataMode + ' data ' + dataTable;

            nameList.forEach(name => {
                if (name.tagName.toLowerCase() == 'select') {
                    name.value = '0';

                    // for select2
                    $('#' + name.getAttribute('id')).select2('val', '0');
                }

                if (name.tagName.toLowerCase() == 'input') {
                    name.value = '';
                }
            });

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

            objectRencana = {};

            e.target.innerText = 'Lanjut Pencairan';
        }

        if (modalId == 'modalKonfirmasiAksi') {
            const targetDataModal = document.getElementById(relatedModal),
                statusR = statusRencana(data.fields.status);

            targetDataModal.querySelector('#status-rencana').innerText = statusR[0];
            relatedTarget.querySelector('span.status').innerText = statusR[0].toLowerCase();
            relatedTarget.querySelector('span.status').previousElementSibling.setAttribute('class', statusR[1]);
            relatedTarget.classList.add('highlight');
            setTimeout(() => {
                relatedTarget.classList.remove('highlight');
            }, 3000);
            $('#' + relatedModal).modal('hide');
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
    table.querySelectorAll('thead tr > th:first-of-type').forEach(el => {
        el.nextElementSibling.setAttribute('style', 'padding-left: calc(' + el.offsetWidth + 'px + 1rem)');
    });

    table.querySelectorAll('tfoot tr > th:first-of-type').forEach(el => {
        let widthTh1 = el.closest('table').querySelector('thead tr th:first-of-type').offsetWidth;
        el.setAttribute('style', 'width: ' + widthTh1 + 'px');
        el.nextElementSibling.setAttribute('style', 'padding-left: calc(' + widthTh1 + 'px + 1rem)')
    });

    table.querySelectorAll('tbody tr > td:first-of-type').forEach(el => {
        el.nextElementSibling.setAttribute('style', 'padding-left: calc(' + el.offsetWidth + 'px + 1rem)');
    });
}

function doAbsoluteFirstRemove(table) {
    table.querySelectorAll('thead tr > th:first-of-type').forEach(el => {
        el.nextElementSibling.removeAttribute('style');
    });

    table.querySelectorAll('tfoot tr > th:first-of-type').forEach(el => {
        el.nextElementSibling.removeAttribute('style')
    });

    table.querySelectorAll('tbody tr > td:first-of-type').forEach(el => {
        el.nextElementSibling.removeAttribute('style');
    });
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