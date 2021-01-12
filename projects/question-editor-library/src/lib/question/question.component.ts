import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
import { UUID } from 'angular2-uuid';
import { EditorConfig } from '../question-editor-library-interface';
import { questionToolbarConfig, questionEditorConfig } from '../editor.config';
import { McqForm, ServerResponse } from '../interfaces';
import { EditorService, QuestionService } from '../services';
import { data1 } from '../player/quml-library-data';

@Component({
  selector: 'lib-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  QumlPlayerConfig = data1;
  @Input() editorConfig: EditorConfig | undefined;
  toolbarConfig = questionToolbarConfig;
  public ckeditorConfig: any = questionEditorConfig;
  public editorState: any = {};
  public showPreview = false;
  public mediaArr: any = [];
  public videoShow = false;
  public showFormError = false;
  selectedSolutionType: string;
  selectedSolutionTypeIndex: string;
  showSolutionDropDown = true;
  showSolution = false;
  videoSolutionName: string;
  videoSolutionData: any;
  videoThumbnail: string;
  solutionUUID: string;
  solutionValue: string;
  solutionTypes: any = [{
    type: 'html',
    value: 'Text+Image'
  },
  {
    type: 'video',
    value: 'video'
  }];
  questionMetaData: any;
  questionInteractionType;
  questionId;
  questionSetId;
  public setCharacterLimit = 160;
  public showLoader = true;
  questionSetHierarchy: any;
  showConfirmPopup = false;
  public questionData: any = {};
  validQuestionData = false;

  constructor(
    private questionService: QuestionService,
    private editorService: EditorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.questionData = this.editorService.selectedChildren;
    this.toolbarConfig.title = this.questionData.primaryCategory;
    this.questionInteractionType = 'choice';
    this.questionId = 'do_11319194338113126419';
    this.questionSetId = 'do_113187143974723584150';
    this.initialize();
    this.solutionUUID = UUID.UUID();
  }

  initialize() {
    this.editorService.getQuestionSetHierarchy(this.questionSetId).
      subscribe((response) => {
        this.questionSetHierarchy = response;
      });
    if (!_.isUndefined(this.questionId)) {
      this.questionService.readQuestion(this.questionId)
        .subscribe((res) => {
          if (res.result) {
            this.questionMetaData = res.result.question;
            this.questionInteractionType = this.questionMetaData.interactionTypes ? this.questionMetaData.interactionTypes[0] : 'default';
            if (this.questionInteractionType === 'default') {
              if (this.questionMetaData.editorState) {
                this.editorState = this.questionMetaData.editorState;
              }
            }

            if (this.questionInteractionType === 'choice') {
              const responseDeclaration = this.questionMetaData.responseDeclaration;
              const templateId = this.questionMetaData.templateId;
              this.questionMetaData.editorState = this.questionMetaData.editorState;
              const numberOfOptions = this.questionMetaData.editorState.options.length;
              const options = _.map(this.questionMetaData.editorState.options, option => ({ body: option.value.body }));
              const question = this.questionMetaData.editorState.question;
              this.editorState = new McqForm({
                question, options, answer: _.get(responseDeclaration, 'response1.correctResponse.value')
              }, { templateId, numberOfOptions });
              this.editorState.solutions = this.questionMetaData.editorState.solutions;
            }

            if (!_.isEmpty(this.editorState.solutions)) {
              this.selectedSolutionType = this.editorState.solutions[0].type;
              this.solutionUUID = this.editorState.solutions[0].id;
              this.showSolutionDropDown = false;
              this.showSolution = true;
              if (this.selectedSolutionType === 'video') {
                const index = _.findIndex(this.questionMetaData.media, (o) => {
                  return o.type === 'video' && o.id === this.editorState.solutions[0].value;
                });
                this.videoSolutionName = this.questionMetaData.media[index].name;
                this.videoThumbnail = this.questionMetaData.media[index].thumbnail;
              }
              if (this.selectedSolutionType === 'html') {
                this.editorState.solutions = this.editorState.solutions[0].value;
              }
            }
            if (this.questionMetaData.media) {
              this.mediaArr = this.questionMetaData.media;
            }
            this.showLoader = false;
          }
        });
    }
    if (_.isUndefined(this.questionId)) {
      if (this.questionInteractionType === 'default') {
        this.editorState = { question: '', answer: '', solutions: '' };
        this.showLoader = false;
      }
      if (this.questionInteractionType === 'choice') {
        this.editorState = new McqForm({ question: '', options: [] }, {});
        this.showLoader = false;
      }
    }
  }

  toolbarEventListener(event) {
    switch (event.button.type) {
      case 'saveContent':
        this.saveContent();
        break;
      case 'cancelContent':
        this.handleRedirectToQuestionset();
        break;
      case 'backContent':
        this.handleRedirectToQuestionset();
        break;
      case 'previewContent':
        this.previewContent();
        break;
        case 'editContent':
          this.showPreview = false;
          this.showLoader = false;
          break;
      default:
        break;
    }
  }

  handleRedirectToQuestionset() {
    if (_.isUndefined(this.questionId)) {
      this.showConfirmPopup = true;
    } else {
      this.redirectToQuestionset();
    }
  }

  saveContent() {

    if ([undefined, ''].includes(this.editorState.question)) {
      this.showFormError = true;
      return;
    }

    // to handle when question type is subjective
    if (this.questionInteractionType === 'default') {
      if (this.editorState.answer !== '') {
        this.showFormError = false;
      } else {
        this.showFormError = true;
        return;
      }
    }

    // to handle when question type is mcq
    if (this.questionInteractionType === 'choice') {
      const optionValid = _.find(this.editorState.options, option =>
        (option.body === undefined || option.body === '' || option.length > this.setCharacterLimit));
      if (optionValid || !this.editorState.answer) {
        this.showFormError = true;
        return;
      } else {
        this.showFormError = false;
      }
    }
    this.validQuestionData = true;
    this.saveQuestion();
  }

  redirectToQuestionset() {
    this.showConfirmPopup = false;
    setTimeout(() => {
      this.router.navigateByUrl(`create/questionSet/${this.questionSetId}`);
    }, 100);

  }

  editorDataHandler(event, type?) {
    if (type === 'question') {
      this.editorState.question = event.body;
    } else if (type === 'solution') {
      this.editorState.solutions = event.body;
    } else {
      this.editorState = _.assign(this.editorState, event.body);
    }

    if (event.mediaobj) {
      const media = event.mediaobj;
      this.setMedia(media);
    }
  }

  setMedia(media) {
    if (media) {
      const value = _.find(this.mediaArr, ob => {
        return ob.id === media.id;
      });
      if (value === undefined) {
        this.mediaArr.push(media);
      }
    }
  }

  saveQuestion() {
    if (_.isUndefined(this.questionId)) {
      this.createQuestion();
    }
    if (!_.isUndefined(this.questionId)) {
      this.updateQuestion(this.questionId);
    }
  }

  videoDataOutput(event) {
    if (event) {
      this.videoSolutionData = event;
      this.videoSolutionName = event.name;
      this.editorState.solutions = event.identifier;
      this.videoThumbnail = event.thumbnail;
      const videoMedia: any = {};
      videoMedia.id = event.identifier;
      videoMedia.src = event.src;
      videoMedia.type = 'video';
      videoMedia.assetId = event.identifier;
      videoMedia.name = event.name;
      videoMedia.thumbnail = this.videoThumbnail;
      if (videoMedia.thumbnail) {
        const thumbnailMedia: any = {};
        thumbnailMedia.src = this.videoThumbnail;
        thumbnailMedia.type = 'image';
        thumbnailMedia.id = `video_${event.identifier}`;
        this.mediaArr.push(thumbnailMedia);
      }
      this.mediaArr.push(videoMedia);
      this.showSolutionDropDown = false;
      this.showSolution = true;
    } else {
      this.deleteSolution();
    }
    this.videoShow = false;
  }

  selectSolutionType(data: any) {
    const index = _.findIndex(this.solutionTypes, (sol: any) => {
      return sol.value === data;
    });
    this.selectedSolutionType = this.solutionTypes[index].type;
    if (this.selectedSolutionType === 'video') {
      const showVideo = true;
      this.videoShow = showVideo;
    } else {
      this.showSolutionDropDown = false;
    }
  }

  deleteSolution() {
    if (this.selectedSolutionType === 'video') {
      this.mediaArr = _.filter(this.mediaArr, (item: any) => item.id !== this.editorState.solutions);
    }
    this.showSolutionDropDown = true;
    this.selectedSolutionType = '';
    this.videoSolutionName = '';
    this.editorState.solutions = '';
    this.videoThumbnail = '';
    this.showSolution = false;
  }

  getSolutionObj(solutionUUID, selectedSolutionType, editorStateSolutions: any) {
    let solutionObj: any;
    solutionObj = {};
    solutionObj.id = solutionUUID;
    solutionObj.type = selectedSolutionType;
    if (_.isString(editorStateSolutions)) {
      solutionObj.value = editorStateSolutions;
    }
    if (_.isArray(editorStateSolutions)) {
      if (_.has(editorStateSolutions[0], 'value')) {
        solutionObj.value = editorStateSolutions[0].value;
      }
    }
    return solutionObj;
  }

  prepareRequestBody() {
    let metadata: any = {
      mimeType: 'application/vnd.sunbird.question',
      media: this.mediaArr,
      editorState: {}
    };
    metadata = _.assign(metadata, this.editorState);
    metadata.editorState.question = metadata.question;
    metadata.body = metadata.question;

    if (this.questionInteractionType === 'choice') {
      metadata.body = this.getMcqQuestionHtmlBody(this.editorState.question, this.editorState.templateId);
    }

    if (!_.isUndefined(this.selectedSolutionType) && !_.isEmpty(this.selectedSolutionType)) {
      const solutionObj = this.getSolutionObj(this.solutionUUID, this.selectedSolutionType, this.editorState.solutions);
      metadata.editorState.solutions = [solutionObj];
      metadata.solutions = [solutionObj];
    }
    if (_.isEmpty(this.editorState.solutions)) {
      metadata.solutions = [];
    }
    return _.omit(metadata, ['question', 'numberOfOptions', 'options']);
  }

  getMcqQuestionHtmlBody(question, templateId) {
    const mcqTemplateConfig = {
      // tslint:disable-next-line:max-line-length
      mcqBody: '<div class=\'question-body\'><div class=\'mcq-title\'>{question}</div><div data-choice-interaction=\'response1\' class=\'{templateClass}\'></div></div>'
    };
    const { mcqBody } = mcqTemplateConfig;
    const questionBody = mcqBody.replace('{templateClass}', templateId)
      .replace('{question}', question);
    return questionBody;
  }

  createQuestion() {
    const metadata = this.prepareRequestBody();
    this.questionService.updateHierarchyQuestionCreate(this.questionSetId, metadata, this.questionSetHierarchy).
      subscribe(
        (response: ServerResponse) => {
          if (response.result) {
            const questionId = response.result.identifiers.questionId;
            alert('Question is created');
            // tslint:disable-next-line:max-line-length
            this.router.navigate([`create/questionSet/${this.questionSetId}/question`], { queryParams: { type: this.questionInteractionType, questionId } });
          }
        },
        (err: ServerResponse) => {
          console.log(err);
        });
  }

  updateQuestion(questionId) {
    const metadata = this.prepareRequestBody();
    this.questionService.updateHierarchyQuestionUpdate(this.questionSetId, questionId, metadata, this.questionSetHierarchy).
      subscribe(
        (response: ServerResponse) => {
          if (response.result) {
            alert('Question is updated');
            // tslint:disable-next-line:max-line-length
            this.router.navigate([`create/questionSet/${this.questionSetId}/question`], { queryParams: { type: this.questionInteractionType, questionId } });
          }
        },
        (err: ServerResponse) => {
          console.log(err);
        });
  }

 async previewContent() {
   await this.saveContent();
   if (this.validQuestionData === true) {
    await this.setQumlData();
    this.showPreview = true;
   }
  }

  setQumlData() {
    this.QumlPlayerConfig.data.children = [];
    const questionMetadata = this.prepareRequestBody();
    this.QumlPlayerConfig.data.children.push(questionMetadata);
  }

  getPlayerEvents(event) {
    console.log('get player events', JSON.stringify(event));
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', JSON.stringify(event));
  }

}


