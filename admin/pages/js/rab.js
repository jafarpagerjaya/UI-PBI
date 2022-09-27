let data = {};

$('#modalBuatRencana').on('hidden.bs.modal', function(e) {
    e.target.querySelector('#id-bantuan').removeAttribute('disabled');
    e.target.querySelector('#id-bantuan').value = '0';
    e.target.querySelector('#input-keterangan').value = '';

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('error')) {
            return;
        }
        name.parentElement.classList.remove('error');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });

    delete data.fields;
    objectRencana = {};
});

$('#modalFormRab').on('show.bs.modal', function() {
    
}).on('hidden.bs.modal', function(e) {
    if (document.getElementById('modalBuatRencana').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }
    
    const mode = e.target.querySelector('#formJudul').getAttribute('data-mode');
    if (mode == 'update') {
        e.target.querySelector('#id-kebutuhan').value = '0';
        e.target.querySelector('#input-harga-satuan').value = '';
        e.target.querySelector('#input-jumlah').value = '';
        e.target.querySelector('#input-keterangan').value = '';
    }

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('error')) {
            return;
        }
        name.parentElement.classList.remove('error');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });

    delete data.id_rab;
});

$('#modalTambahKebutuhan').on('show.bs.modal', function() {

}).on('hidden.bs.modal', function(e) {
    if (document.getElementById('modalBuatRencana').classList.contains('show')) {
        document.querySelector('body').classList.add('modal-open');
    }

    e.target.querySelectorAll('[name]').forEach(name => {
        if (!name.parentElement.classList.contains('error')) {
            return;
        }
        name.parentElement.classList.remove('error');
        name.parentElement.querySelector('label').removeAttribute('data-label-after');
        name.classList.remove('is-invalid');
    });
});


// Select
const selectBantuan = document.getElementById('id-bantuan');

let objectRencana = {};
selectBantuan.addEventListener('change', function() {
    if (this.value != '0') {
        objectRencana.id_bantuan = this.value;

        if (this.parentElement.classList.contains('error')) {
            this.parentElement.classList.remove('error');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectRencana.id_bantuan;
    }
});

const selectKebutuhan = document.getElementById('id-kebutuhan');

let objectRab = {};
selectKebutuhan.addEventListener('change', function() {
    if (this.value != '0') {
        objectRab.id_kebutuhan = this.value;

        if (this.parentElement.classList.contains('error')) {
            this.parentElement.classList.remove('error');
            this.parentElement.querySelector('label').removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    } else {
        delete objectRab.id_kebutuhan;
    }
});

const selectKategori = document.getElementById('id-kategori');

let objectKebutuhan = {};
selectKategori.addEventListener('change', function() {
    if (this.value != '0') {
        objectKebutuhan.id_kategori = this.value;

        if (this.parentElement.classList.contains('error')) {
            this.parentElement.classList.remove('error');
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
    name.addEventListener('keydown', function(e) {

        if (!e.target.value.length && (e.keyCode == 16 || e.code == 'Space' || e.code == 'Backspace' || e.code == 'Delete' || e.code == 'ArrowDown' || e.code == 'ArrowUp' || e.code == 'ArrowLeft' || e.code == 'ArrowRight')) {
            return false;
        }

        if (e.code != undefined) {
            if (!e.target.value.length && (e.code.indexOf('Key') < 0 && e.code.indexOf('Digit') < 0 && (e.keyCode != 96 && e.keyCode != 97 && e.keyCode != 98 && e.keyCode != 99 && e.keyCode != 100 && e.keyCode != 101 && e.keyCode != 102 && e.keyCode != 103 && e.keyCode != 104 && e.keyCode != 105))) {
                e.preventDefault();
                return false;
            }
        }

        if (this.parentElement.classList.contains('error')) {
            this.parentElement.classList.remove('error');
            this.nextElementSibling.removeAttribute('data-label-after');
            this.classList.remove('is-invalid');
        }
    });

    name.addEventListener('paste', function(e) {
        setTimeout(() => {
            this.value = escapeRegExp(escapeRegExp(this.value.trim(),'',/[^a-zA-Z0-9\s\/.-]/g),' ',/\s+/g);
            
            if (!this.value.length) {
                return false;
            }

            if (this.parentElement.classList.contains('error')) {
                this.parentElement.classList.remove('error');
                this.nextElementSibling.removeAttribute('data-label-after');
                this.classList.remove('is-invalid');
            }
        }, 0);
    });
});

const inputKeterangan = document.getElementById('input-keterangan');

inputKeterangan.addEventListener('change', function() {
    if (this.value.length) {
        objectRencana.keterangan = this.value;
    } else {
        delete objectRencana.keterangan;
    }
});

const formRab = document.getElementById('modalFormRab'),
      inputRabList = formRab.querySelectorAll('input');

inputRabList.forEach(inputRab => {
    inputRab.addEventListener('change', function(e) {
        const name = e.target.getAttribute('name');
        if (this.value.length) {
            objectRab[name] = this.value;
        } else {
            delete objectRab[name];
        }
    });
});

const inputNamaKebutuhan = document.getElementById('input-nama-kebutuhan');

inputNamaKebutuhan.addEventListener('change', function() {
    if (this.value.length) {
        objectKebutuhan.nama = this.value;
    } else {
        delete objectKebutuhan.nama;
    }
});

const tambahItemRab = document.getElementById('tambah-item-rab');

tambahItemRab.addEventListener('click', function() {
    let mTarget = this.getAttribute('data-target');
    mTarget = document.querySelector(mTarget);
    mTarget.querySelector('#formJudul').setAttribute('data-mode','create');
    mTarget.querySelector('#formJudul').innerText = 'Tambah';
    if (mTarget.querySelector('.btn[type="reset"]') != null) {
        mTarget.querySelector('.btn[type="reset"]').innerText = "Kosongkan";
        mTarget.querySelector('.btn[type="reset"]').setAttribute('type','clear');
    }
    console.log(mTarget.querySelector('#formJudul'));
});
let resultRab = {};
const updateListRab = document.querySelectorAll('#list-area table .btn.update');

updateListRab.forEach(update => {
    update.addEventListener('click', function(e) {
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
        modalFRab.querySelector('#formJudul').setAttribute('data-mode','update');
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
        modalFRab.querySelector('#input-keterangan').value = result.keterangan;
        if (modalFRab.querySelector('.btn[type="clear"]') != null) {
            modalFRab.querySelector('.btn[type="clear"]').innerText = "Reset";
            modalFRab.querySelector('.btn[type="clear"]').setAttribute('type','reset');
        }
        objectRab = {};
        $('#modalFormRab').modal('show');
    });
});

// Clear
const clearList = document.querySelectorAll('[type="clear"]');

clearList.forEach(btn => {
    btn.addEventListener('click', function(e) {
        let type = this.getAttribute('type');
        if (type == 'clear') {
            this.closest('.modal').querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            this.closest('.modal').querySelectorAll('select').forEach(select => {
                select.value = '0';
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
            e.target.closest('.modal').querySelector('#input-keterangan').value = resultRab.keterangan;
            objectRab = {};
        }

        data = {};

        e.target.closest('.modal').querySelectorAll('[name]').forEach(name => {
            if (!name.classList.contains('is-invalid')) {
                return;
            }
            let fromGroup = name.closest('.error');
            fromGroup.querySelector('label').removeAttribute('data-label-after');
            fromGroup.classList.remove('error');
            name.classList.remove('is-invalid');
        });
    });
});

// Submit
const submitList = document.querySelectorAll('.modal [type="submit"]');

submitList.forEach(submit => {
    submit.addEventListener('click', function(e) {

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
                    console.log('Unrecognize mode on #'+modalId);
                    return false;
                }

                data.mode = mode;
                if (Object.keys(objectRab).length) {
                    data.fields = objectRab;
                    data.table = 'rab';
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
                if (!name.parentElement.classList.contains('error')) {
                    name.parentElement.classList.add('error');
                    name.classList.add('is-invalid');
                    name.parentElement.querySelector('label').setAttribute('data-label-after','wajib diisi');
                }
            } else {
                if (name.parentElement.classList.contains('error')) {
                    name.parentElement.classList.remove('error');
                    name.classList.remove('is-invalid');
                    name.parentElement.querySelector('label').removeAttribute('data-label-after');
                }
            }
        });

        if (c_error > 0) {
            return false;
        }

        const url = '/admin/fetch/'+data.mode+'/'+data.table;
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
        message = 'Berhasil '+ dataMode +' data '+ dataTable;

        nameList.forEach(name => {
            if (name.tagName.toLowerCase() == 'select') {
                name.value = '0';
            }

            if (name.tagName.toLowerCase() == 'input') {
                name.value = '';
            }
        });
        
        
        $('#'+modalId).modal('hide');

        // End of submit
        data = {};
    });
});

function diff(prevObject,nextObject) {
    return Object.entries(nextObject).reduce((acc,cv) => {
            if (JSON.stringify(nextObject[cv[0]]) != JSON.stringify(prevObject[cv[0]]))
                acc.push(cv);
                return acc;
            }, []).reduce((acc,cv) => {
                acc[cv[0]]=cv[1];
                return acc;
            }, {});
}