export const formConfig = [
    {
        code: 'name',
        dataType: 'text',
        description: 'Name of the content',
        editable: true,
        inputType: 'text',
        label: 'Name',
        name: 'Name',
        placeholder: 'Name',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
        validations: [{
            type: 'max',
            value: '120',
            message: 'Input is Exceded'
        }, {
            type: 'required',
            message: 'Name is required'
        }]
    },
    {
        code: 'author',
        dataType: 'text',
        description: 'Author of the content',
        editable: true,
        inputType: 'text',
        label: 'Author',
        name: 'Author',
        placeholder: 'Author',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
    },
    {
        code: 'attributions',
        dataType: 'text',
        description: 'Attributions',
        editable: true,
        inputType: 'text',
        label: 'Attributions',
        name: 'Attributions',
        placeholder: 'Attributions',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
    },
    {
        code: 'copyright',
        dataType: 'text',
        description: 'Copyright & year',
        editable: true,
        inputType: 'text',
        label: 'Copyright & year',
        name: 'Copyright & year',
        placeholder: 'Copyright & year',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
    },
    {
        code: 'license',
        dataType: 'list',
        description: 'Licence',
        editable: true,
        inputType: 'select',
        label: 'Licence',
        name: 'Licence',
        placeholder: 'Select Licence',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
        range: [{
                value: 'CC BY 4.0',
                label: 'CC BY 4.0',
            }, {
                value: 'CC BY-NC 4.0',
                label: 'CC BY-NC 4.0',
            }
        ],
    },
    {
        code: 'audience',
        dataType: 'list',
        description: 'Audience',
        editable: true,
        inputType: 'select',
        label: 'Audience',
        name: 'Audience',
        placeholder: 'Select Audience',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
        range: ['Student', 'Teacher', 'Administrator'],
    },
];
