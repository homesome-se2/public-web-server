import PLDParser from './PLDLayers/PLDParser';
import PLDDecoder from './PLDLayers/PLDDecoder';
import PLDExecutor from './PLDLayers/PLDExecutor';
import PLDEncapsulator from './PLDLayers/PLDEncapsulator';
import ucEEmitterRVHub from '../EEmitters/RVHubs/ucEEmitterRVHub';

class HoSoProtocolStackImpl {
  /////////////////////////////////////
  ////////////// DEF /////////////////
  ///////////////////////////////////
  constructor(CServiceInstance, csReceiverEEHub) {
    this.mLayers = [];
    this.ucEEmitterRVHub = new ucEEmitterRVHub(); //wong update name
    this.csReceiverEEHub = csReceiverEEHub;
    this.CServiceInstance = CServiceInstance;
    this.createStack();
    this.initCSHooks();
  }
  /////////////////////////////////////
  ///////// CREATE-STACK /////////////
  ///////////////////////////////////
  createStack = () => {
    let m_Layers = [
      new PLDParser(),
      new PLDDecoder(),
      new PLDExecutor(),
      new PLDEncapsulator(),
    ];
    //PLDParser
    m_Layers[0].upperLayer = null;
    m_Layers[0].lowerLayer = m_Layers[1];
    m_Layers[0].CServiceInstance = this.CServiceInstance;
    //PLDDecoder
    m_Layers[1].upperLayer = m_Layers[0];
    m_Layers[1].lowerLayer = m_Layers[2];
    //PLDExecutor
    m_Layers[2].upperLayer = m_Layers[1];
    m_Layers[2].lowerLayer = m_Layers[3];
    m_Layers[2].CServiceInstance = this.CServiceInstance;
    //PLDEncapsulator
    m_Layers[3].upperLayer = m_Layers[2];
    m_Layers[3].lowerLayer = null;
    m_Layers[3].ucEEmitterRVHub = this.ucEEmitterRVHub;

    this.mLayers.push(...m_Layers);
    console.log('HoSoProtocolStackImpl (mLayers): ', this.mLayers);
  };
  /////////////////////////////////////
  ///////// m-RV-ENTRIES /////////////
  ///////////////////////////////////
  send = (obj) => {
    this.mLayers[this.mLayers.length - 1].send(obj);
  };
  recv = (obj) => {
    this.ucEEmitterRVHub.emitGEvent(
      ucEEmitterRVHub.events.onHoSoMessageReceived,
      obj
    );
    console.log('receiving data: ', obj);
    this.mLayers[0].recv(obj);
  };
  getucEEmitterRVHub = () => {
    return this.ucEEmitterRVHub;
  };
  /////////////////////////////////////
  ///////////// cs-HOOKS /////////////
  ///////////////////////////////////
  initCSHooks = () => {
    this.csReceiverEEHub.subscribe(
      '$onWSConnectionOpen-CSEEmitterRVHub',
      (...args) => {
        console.log('csHook event fired(open): ', args);
      }
    );
    this.csReceiverEEHub.subscribe(
      '$onWSMessageReceived-CSEEmitterRVHub',
      (...args) => {
        console.log('csHook event fired(message): ', args);
        this.recv(...args);
      }
    );
  };
}

export default HoSoProtocolStackImpl;
