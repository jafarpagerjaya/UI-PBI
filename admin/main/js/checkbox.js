const checkboxForBtn = function(targetList, multipleSelectedList = null, singgleSelectedList = null, targetDataName = 'data-id', targetParent = 'tr', selectedId = []) {
    let MultiCloneElement = {},
        SinggleCloneELement = {},
        selectedIdOldLenght = '0';
    const lebel = document.getElementById('lebel');

    if (multipleSelectedList != null) {
        if (multipleSelectedList.length > 0) {
            multipleSelectedList.forEach(element => {
                MultiCloneElement[element.getAttribute('data-value')] = {
                    element: element.cloneNode(true),
                    parent: element.parentElement
                }
                element.remove();
            });
        }
    }

    if (singgleSelectedList != null) {
        if (singgleSelectedList.length > 0) {
            singgleSelectedList.forEach(element => {
                SinggleCloneELement[element.getAttribute('data-value')] = {
                    element: element.cloneNode(true),
                    parent: element.parentElement
                }
                element.remove();
            });
        }
    }

    targetList.forEach(element => {
        if (selectedId.length) {
            if (selectedId.findIndex(item => item.id == element.closest(targetParent).getAttribute(targetDataName)) == 1) {
                element.checked = true;
            }
        }

        element.addEventListener('click', function(e) {
            const target = e.target,
                  targetTr = target.closest(targetParent),
                  targetId = targetTr.getAttribute(targetDataName);
            if (targetId == null) {
                console.log(targetParent+' [data-id] is null');
                return false;
            }

            if (target.checked) {
                selectedId.push({id: targetId});
            } else {
                selectedId.splice(selectedId.findIndex(item => item.id == targetId), 1);
            }

            if (selectedId.length == 1) {
                if (selectedIdOldLenght === '>1') {
                    for (const property in MultiCloneElement) {
                        MultiCloneElement[property].parent.querySelector('[data-value="'+ property +'"]').remove();
                    }
                }
                for (const property in SinggleCloneELement) {
                    SinggleCloneELement[property].parent.appendChild(SinggleCloneELement[property].element);
                }
                selectedIdOldLenght = '=1';
            } else if (selectedId.length > 1) {
                if (selectedIdOldLenght === '=1') {
                    for (const property in SinggleCloneELement) {
                        SinggleCloneELement[property].parent.querySelector('[data-value="'+ property +'"]').remove();
                    }
                }
                for (const property in MultiCloneElement) {
                    MultiCloneElement[property].parent.appendChild(MultiCloneElement[property].element);
                }
                selectedIdOldLenght = '>1';
            } else {
                if (selectedIdOldLenght === '=1') {
                    for (const property in SinggleCloneELement) {
                        SinggleCloneELement[property].parent.querySelector('[data-value="'+ property +'"]').remove();
                    }
                }
                if (selectedIdOldLenght === '>1') {
                    for (const property in MultiCloneElement) {
                        MultiCloneElement[property].parent.querySelector('[data-value="'+ property +'"]').remove();
                    }
                }
                selectedIdOldLenght = '0';
            }

            if (lebel != null && selectedId.length > 0) {
                if (lebel.querySelector('small#selected-count') != null) {
                    lebel.querySelector('small#selected-count').setAttribute('data-selected-length',selectedId.length);
                } else {
                    lebel.insertAdjacentHTML('afterbegin', '<small id="selected-count" class="text-black-50" data-selected-length="'+ selectedId.length +'"> data sedang dipilih</small>');
                }
            } else {
                if (lebel.querySelector('small#selected-count') != null) {
                    lebel.querySelector('small#selected-count').remove();
                }
            }
        });
    });
};