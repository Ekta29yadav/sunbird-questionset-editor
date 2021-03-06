export const formConfig = [
    {
        code: 'name',
        dataType: 'text',
        description: 'Name of the content',
        editable: true,
        inputType: 'text',
        label: 'Title',
        name: 'Title',
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
        code: 'description',
        dataType: 'text',
        description: 'Brief description',
        editable: true,
        inputType: 'textarea',
        label: 'Description',
        name: 'Description',
        placeholder: 'Description',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: false,
        visible: true,
        validations: [{
          type: 'max',
          value: '1000',
          message: 'Description is Exceeded'
        },
        {
          type: 'required',
          message: 'Description is required'
        }]
      },
    //   {
    //     code: 'board',
    //     dataType: 'text',
    //     description: 'Board',
    //     editable: true,
    //     index: 2,
    //     inputType: 'select',
    //     label: 'Board/Syllabus',
    //     name: 'Board/Syllabus',
    //     placeholder: 'Select Board/Syllabus',
    //     renderingHints: {class: 'sb-g-col-lg-1'},
    //     required: true,
    //     visible: true,
    //     type: 'select',
    //     templateOptions: {
    //       placeHolder: 'Select Board',
    //       multiple: false,
    //       hidden: false,
    //     },
    //     validations: [{
    //       type: 'required',
    //       message: 'Board is required'
    //     }],
    //     identifier: 'ekstep_ncert_k-12_board',
    //     translations: null,
    //     status: 'Live'
    //   },
    //   {
    //     code: 'medium',
    //     dataType: 'list',
    //     description: '',
    //     editable: true,
    //     index: 3,
    //     depends: [
    //         'board'
    //     ],
    //     inputType: 'select',
    //     label: 'medium',
    //     name: 'medium',
    //     placeholder: 'Select Medium',
    //     renderingHints: {class: 'sb-g-col-lg-1'},
    //     required: true,
    //     visible: true,
    //     identifier: 'ekstep_ncert_k-12_medium',
    //     translations: null,
    //     association: true,
    //     status: 'Live',
    //     type: 'select',
    //     templateOptions: {
    //       placeHolder: 'Select Category',
    //       multiple: false,
    //     },
    //     validations: [{
    //       type: 'required',
    //       message: 'Medium is required'
    //     }]
    //   },
    //   {
    //     code: 'gradeLevel',
    //     dataType: 'list',
    //     description: 'Class',
    //     editable: false,
    //     index: 4,
    //     depends: [
    //         'medium',
    //         'board'
    //     ],
    //     inputType: 'select',
    //     label: 'Class',
    //     name: 'Class',
    //     placeholder: 'Select Class',
    //     renderingHints: {class: 'sb-g-col-lg-1'},
    //     required: true,
    //     visible: true,
    //     identifier: 'ekstep_ncert_k-12_gradelevel',
    //     default: ['ekstep_ncert_k-12_gradelevel_class1', 'ekstep_ncert_k-12_gradelevel_class2'],
    //     translations: null,
    //     status: 'Live',
    //     association: true,
    //     validation: [{
    //       type: 'max',
    //       message: 'Input is Exceeded',
    //       value: '1000'
    //     }]
    //   },
      {
        code: 'primaryCategory',
        dataType: 'text',
        description: 'Collection Type',
        editable: false,
        renderingHints: {class: 'sb-g-col-lg-1'},
        index: 0,
        inputType: 'select',
        label: 'Collection Type',
        name: 'Collection Type',
        placeholder: '',
        required: true,
        visible: true,
      },
      {
        code: 'additionalCategories',
        dataType: 'text',
        depends: [
          'primaryCategory', 'channel'
        ],
        default: ['Classroom Teaching Video',
        'Concept Map'],
        description: 'Additonal Category of the Content',
        editable: false,
        index: 5,
        inputType: 'nestedselect',
        label: 'Additional Category',
        name: 'Additional Category',
        placeholder: 'Select Additional Category',
        renderingHints: {class: 'sb-g-col-lg-1'},
        range: ['Classroom Teaching Video',
        'Concept Map',
        'Curiosity Question Set',
        'Experiential Resource',
        'Explanation Video',
        'Focus Spot',
        'Learning Outcome Definition',
        'Lesson Plan',
        'Marking Scheme Rubric',
        'Pedagogy Flow',
        'Previous Board Exam Papers',
        'TV Lesson',
        'Textbook'],
        required: false,
        visible: true
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
        editable: false,
        inputType: 'select',
        label: 'Licence',
        name: 'Licence',
        placeholder: 'Select Licence',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: true,
        visible: true,
        range: ''
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
    {
        code: 'showFeedback',
        dataType: 'text',
        description: 'Show Feedback',
        editable: true,
        default: false,
        index: 5,
        inputType: 'checkbox',
        label: 'Show Feedback',
        name: 'showFeedback',
        placeholder: 'Show Feedback',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: false,
        visible: true
      },
      {
        code: 'shuffle',
        dataType: 'text',
        description: 'Shuffle Questions',
        editable: true,
        default: 'Yes',
        index: 5,
        inputType: 'checkbox',
        label: 'Shuffle Questions',
        name: 'Shuffle Questions',
        placeholder: 'Shuffle Questions',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: false,
        visible: true
      },
      {
        code: 'showQuestions',
        dataType: 'text',
        description: 'Show Questions',
        editable: true,
        index: 5,
        inputType: 'select',
        label: 'Show Questions',
        name: 'showQuestions',
        placeholder: 'Show Questions',
        renderingHints: {class: 'sb-g-col-lg-1'},
        required: false,
        visible: true,
        range: [1, 2, 3, 4, 5]
      }
];
