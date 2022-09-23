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

$('#modalFormRab').on('show.bs.modal', function(e) {
    
}).on('hidden.bs.modal', function(e) {
    if ($('#modalBuatRencana').hasClass('show')) {
        $('body').addClass('modal-open');
    }
});

const selectBantuan = document.getElementById('id-bantuan');
selectBantuan.addEventListener('change', function() {
    data.id_bantuan = this.value;
});

const reset = document.querySelectorAll('[type="clear"]');

reset.forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.closest('.modal').querySelector('input').value = '';
        this.closest('.modal').querySelector('select').value = '0';
        delete data.kebutuhan;
    });
});

const selectKategori = document.getElementById('id-kategori');
selectKategori.addEventListener('change', function() {
    data.kebutuhan.id_kategori = this.value;
});

const inputNamaKebutuhan = document.getElementById('input-nama-kebutuhan');
inputNamaKebutuhan.addEventListener('change', function() {
    data.kebutuhan.nama = this.value;
});

const tambahItemRab = document.getElementById('tambah-item-rab');
tambahItemRab.addEventListener('click', function() {
    let mTarget = this.getAttribute('data-target');
    mTarget = document.querySelector(mTarget);
    mTarget.querySelector('#formJudul').setAttribute('data-mode','create');
    console.log(mTarget.querySelector('#formJudul'));
});

const updateListRab = document.querySelectorAll('')

const submitList = document.querySelectorAll('[type="submit"]');
submitList.forEach(submit => {
    submit.addEventListener('click', function(e) {
        console.log(data);

        const modalId = e.target.closest('.modal').getAttribute('id');
        let url = undefined;

        switch (modalId) {
            case 'modalTambahKebutuhan':
                url = 'admin/fetch/create/kebutuhan'
            break;

            case 'modalFormRab':
                const mode = modalId.getElementById('formJudul').getAttribute('data-mode');
                if (mode != 'create' || mode != 'update') {
                    console.log('Unrecognize mode on #'+modalId);
                    return false;
                }
                url = '/admin/fetch/'+mode+'/kebutuhan';
            break;
        
            default:
                url = undefined;
            break;
        }

        if (url == undefined) {
            message = 'Invalid URL to fetching';
        }
    });
});