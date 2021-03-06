export const toolbarConfig = {
  headerName: 'Create Question Set',
  title: 'Question Collection',
  buttons: [{
    telemetryId: 'save_as_draft',
    telemetrySubtype: 'submit',
    name: 'Save as draft',
    type: 'saveCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
  },
  {
    telemetryId: 'submit',
    telemetrySubtype: 'submit',
    name: 'Submit',
    type: 'submitCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-primary',
    slot: `<i class="trash alternate outline icon"></i>`
  }
  ]
};

export const questionToolbarConfig = {
  headerName: 'Back',
  title: 'Q1 | MCQ',
  buttons: [
    {
      telemetryId: 'edit',
      telemetrySubtype: 'launch',
      name: 'Edit',
      type: 'editContent',
      buttonType: 'button',
      style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
      slot: `icon edit`
    },
    {
    telemetryId: 'preview',
    telemetrySubtype: 'launch',
    name: 'Preview',
    type: 'previewContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
    slot: `icon eye`
  }, {
    telemetryId: 'cancel',
    telemetrySubtype: 'launch',
    name: 'Cancel',
    type: 'cancelContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
  },
  {
    telemetryId: 'save',
    telemetrySubtype: 'submit',
    name: 'Save',
    type: 'saveContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-primary'
  }
  ]
};

export const McqQuestionTemplate = [
  {templateType: 'mcq-vertical', class: 'q-sb-layout-single mr-10 h-7'},
  {templateType: 'mcq-horizontal', class: 'q-sb-layout-two mr-10 h-7'},
  {templateType: 'mcq-grid-split', class: 'q-sb-layout-three mr-10 h-7 w-20'}
];

export const editorConfig = {
    nodeDisplayCriteria: {
      contentType: ['QuestionSet', 'Question']
    },
    keywordsLimit: 500,
    editorConfig: {
      rules: {
        levels: 2,
        objectTypes: [
          {
            type: 'QuestionSet',
            label: 'QuestionSet',
            isRoot: true,
            editable: true,
            childrenTypes: [
              'QuestionSet', 'Question'
            ],
            addType: 'Editor',
            iconClass: 'fa fa-book'
          },
          {
            type: 'Question',
            label: 'Question',
            isRoot: false,
            editable: true,
            childrenTypes: [],
            addType: 'Editor',
            iconClass: 'fa fa-file-o'
          },
        ]
      },
      mode: 'Edit'
    }
};

export const questionEditorConfig = {
    config: {
      tenantName: '',
      assetConfig: {
        image: {
          size: '50',
          accepted: 'jpeg, png, jpg'
        },
        video: {
          size: '50',
          accepted: 'pdf, mp4, webm, youtube'
        }
      },
      solutionType: [
        'Video',
        'Text & image'
      ],
      'No of options': 4,
      questionCategory: [
        'vsa',
        'sa',
        'ls',
        'mcq',
        'curiosity'
      ],
      resourceTitleLength: '200'
    },
    channel: 'sunbird'
};
