const createRab = document.getElementById('buat-rab');
let data = {};
createRab.addEventListener('click', function(e) {
    // createRab via fetch if success
    // lock #bantuan
    console.log(data)
    if (data.id_bantuan == null) return false;
    this.closest('.row').querySelector('#id-bantuan').setAttribute('disabled','disabled');
});

$('#modalBuatRencana').on('hidden.bs.modal', function() {
    $(this).find('#id-bantuan').removeAttr('disabled');
    delete data.id_bantuan;
    $(this).find('#id-bantuan').val(0);
});

$('#modalFormRab').on('show.bs.modal', function() {
    
}).on('hidden.bs.modal', function(e) {
    if ($('#modalBuatRencana').hasClass('show')) {
        $('body').addClass('modal-open');
    }
    const mode = e.target.querySelector('#formJudul').getAttribute('data-mode');
    if (mode == 'update') {
        e.target.querySelector('#id-kebutuhan').value = '0';
        e.target.querySelector('#input-harga-satuan').value = '';
        e.target.querySelector('#input-jumlah').value = '';
        e.target.querySelector('#input-keterangan').value = '';
    }
});

$('#modalTambahKebutuhan').on('show.bs.modal', function() {

}).on('hidden.bs.modal', function() {
    if ($('#modalBuatRencana').hasClass('show')) {
        $('body').addClass('modal-open');
    }
});

const selectBantuan = document.getElementById('id-bantuan');
selectBantuan.addEventListener('change', function() {
    data.id_bantuan = this.value;
});

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
                delete data.kebutuhan;
            }

            if (modalId == 'modalFormRab') {
                objectRab = {};
                delete data.rab;
            }

            resultRab = {};
        }
        if (type == 'reset') {
            e.target.closest('.modal').querySelector('#id-kebutuhan').value = resultRab.id_kebutuhan;
            e.target.closest('.modal').querySelector('#input-harga-satuan').value = resultRab.harga_satuan;
            e.target.closest('.modal').querySelector('#input-jumlah').value = resultRab.jumlah;
            e.target.closest('.modal').querySelector('#input-keterangan').value = resultRab.keterangan;
        }
    });
});

const selectKebutuhan = document.getElementById('id-kebutuhan');
let objectRab = {};
selectKebutuhan.addEventListener('change', function() {
    if (this.value != '0') {
        objectRab.id_kebutuhan = this.value;
    } else {
        delete objectRab.id_kebutuhan;
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

const selectKategori = document.getElementById('id-kategori');
let objectKebutuhan = {};
selectKategori.addEventListener('change', function() {
    if (this.value != '0') {
        objectKebutuhan.id_kategori = this.value;
    } else {
        delete objectKebutuhan.id_kategori;
    }
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
        $('#modalFormRab').modal('show');
    });
});

const submitList = document.querySelectorAll('[type="submit"]');
submitList.forEach(submit => {
    submit.addEventListener('click', function(e) {

        const modalId = e.target.closest('.modal').getAttribute('id');
        let url = undefined;

        switch (modalId) {
            case 'modalTambahKebutuhan':
                delete data.rab;
                
                url = 'admin/fetch/create/kebutuhan';
                if (Object.keys(objectKebutuhan).length) {
                    data.kebutuhan = objectKebutuhan;
                } else {
                    delete data.kebutuhan;
                }
            break;

            case 'modalFormRab':
                delete data.kebutuhan;
                
                const mode = document.getElementById('formJudul').getAttribute('data-mode');
                if (mode !== 'create' && mode !== 'update') {
                    console.log('Unrecognize mode on #'+modalId);
                    return false;
                }
                url = '/admin/fetch/'+mode+'/kebutuhan';

                if (Object.keys(objectRab).length) {
                    data.rab = objectRab;
                } else {
                    delete data.rab;
                }
            break;
        
            default:
                url = undefined;
            break;
        }

        if (url == undefined) {
            message = 'Invalid URL to fetching';
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
                    // name.parentElement.querySelector('label').removeAttribute('data-label-after');
                }
            }
        });

        console.log(c_error)

        if (c_error > 0) {
            return false;
        }

        // fetch Here
        console.log(data);
    });
});