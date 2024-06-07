let selectCreate = function(target) {
    const optionPelaksanaan = '<div class="col"><div class="form-group position-relative mb-0"><span class="font-weight-bolder position-absolute mt-3"><label for="id_pelaksanaan" class="form-control-label m-0">Pelaksanaan</label></span><select class="custom-select" id="id_pelaksanaan" name="id_pelaksanaan" required><option value="0" disabled selected hidden>Pilih salah satu</option><option value="1">Pelaksanaan 1</option><option value="2">Pelaksanaan 2</option></select></div></div>';
    target.insertAdjacentHTML('beforeend', optionPelaksanaan);
};

let formatSelected = function(objectSelected) {
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
};

$('#jenis-label').on('change', function(e) {
    if ($(this).val() == 'P') {
        selectCreate(e.target.closest('.row'));
        $('#id_pelaksanaan').on('change', function(e) {
            console.log('ini');
        }).select2({
            placeholder: "Pilih salah satu",
            templateSelection: formatSelected,
            escapeMarkup: function (markup) { return markup; }
        });
    } else {
        if ($('#id_pelaksanaan').length) {
            $('#id_pelaksanaan').select2('destroy');
            $('#id_pelaksanaan').closest('.col').remove();
        }
    }
}).select2({
    placeholder: "Pilih salah satu",
    templateSelection: formatSelected,
    escapeMarkup: function (markup) { return markup; }
});

let qEditor = editor('#editor');