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