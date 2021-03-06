import { EventEmitter, Injectable } from '@angular/core';
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import { EditorConfig, Context } from '../../question-editor-library-interface';
import { UtilService } from '../index';


@Injectable({
  providedIn: 'root'
})
export class EditorTelemetryService {
  duration: number;
  channel: string;
  telemetryEvent = new EventEmitter<any>();
  private context: Context;
  private telemetryObject: any;
  private contentSessionId: string;
  private playSessionId: string;
  private pdata: any;
  private sid: string;
  private uid: string;
  private rollup: any;

  constructor(
    public utilService: UtilService
  ) {

  }

  initializeTelemetry(config: EditorConfig) {
    this.duration = new Date().getTime();
    this.context = config.context;
    this.channel = config.context.channel;
    this.contentSessionId = this.utilService.uniqueId();
    this.playSessionId = this.utilService.uniqueId();
    this.channel = config.context.channel;
    this.pdata = this.context.pdata;
    this.sid =  this.context.sid;
    this.uid =  this.context.uid;
    this.rollup = this.context.contextRollup;
    if (!CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.init({});
      CsTelemetryModule.instance.telemetryService.initTelemetry(
        {
          config: {
            pdata: config.context.pdata,
            env: 'ContentPlayer',
            channel: config.context.channel,
            did: config.context.did,
            authtoken: config.context.authToken || '',
            uid: config.context.uid || '',
            sid: config.context.sid,
            batchsize: 20,
            mode: config.context.mode,
            host: config.context.host || '',
            endpoint: config.context.endpoint || '/data/v3/telemetry',
            tags: config.context.tags,
            cdata: [{ id: this.contentSessionId, type: 'ContentSession' },
            { id: this.playSessionId, type: 'PlaySession' }]
          },
          userOrgDetails: {}
        }
      );
    }

    this.telemetryObject = {
      id: config.metadata.identifier,
      type: 'Content',
      ver: config.metadata.pkgVersion + '',
      rollup: this.context.objectRollup || {}
    };
  }

  // public onTelemetry(callback: () => void) {

  // }

  public start(edata) {
    CsTelemetryModule.instance.telemetryService.raiseStartTelemetry(
      {
        options: this.getEventOptions(),
        edata
      }
    );
  }
  public end(edata) {
    CsTelemetryModule.instance.telemetryService.raiseEndTelemetry({
      edata,
      options: this.getEventOptions()
    });
  }

  public interact(edata) {
    CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry({
      options: this.getEventOptions(),
      edata
    });
  }

  public heartBeat(data) {
    CsTelemetryModule.instance.playerTelemetryService.onHeartBeatEvent(data, {});
  }

  public impression(edata) {
    CsTelemetryModule.instance.telemetryService.raiseImpressionTelemetry({
      options: this.getEventOptions(),
      edata
    });
  }

  public error(edata) {
    CsTelemetryModule.instance.telemetryService.raiseErrorTelemetry({
      edata
    });
  }

  public getEventOptions() {
    return ({
      object: this.telemetryObject,
      context: {
        channel: this.channel,
        pdata: this.pdata,
        env: 'ContentPlayer',
        sid: this.sid,
        uid: this.uid,
        cdata: [{ id: this.contentSessionId, type: 'ContentSession' },
        { id: this.playSessionId, type: 'PlaySession' }],
        rollup: this.rollup || {}
      }
    });
  }

}

