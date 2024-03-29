let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    // [ 'link', 'image', 'video', 'formula' ],          // add's image support
    [ 'link', 'image'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

let defaultOptions = {
    // debug: 'info',
    theme: 'snow',
    placeholder: 'Isi lengkap program...',
    modules: { 
        toolbar: toolbarOptions,
        imageDrop: true,
        imageResize: {
            handleStyles: {
                borderRadius: '50%',
                backgroundColor: 'var(--orange)',
                border: 'none'
                // other camelCase styles for size display
            },
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
                borderRadius: '.375rem'
                // other camelCase styles for size display
            }
        },
    }
};

function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('What is the image URL');
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
}

let editor = function(el, options = defaultOptions) {
    let quill = new Quill(el, options);
    
    // console.log(quill);

    quill.container.querySelector('.ql-editor').addEventListener('focus', function(e) {
        e.target.closest('.ql').classList.add('focused');
    });
    
    quill.container.querySelector('.ql-editor').addEventListener('focusout', function(e) {
        e.target.closest('.ql').classList.remove('focused');
    });

    return quill;
};

let qEditor = editor('#editor');

document.querySelector('#buat-selengkapnya[type="submit"]').addEventListener('click', function(e) {
    console.log(qEditor.getContents());
});