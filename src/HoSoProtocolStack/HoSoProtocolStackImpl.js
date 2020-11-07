import PLDParser from './PLDLayers/PLDParser';
import PLDDecoder from './PLDLayers/PLDDecoder';
import PLDExecutor from './PLDLayers/PLDExecutor';
import PLDEncapsulator from './PLDLayers/PLDEncapsulator';
import UCReceiverEEHub from '../contexts/UCReceiverEEHub';

class HoSoProtocolStackImpl {
  constructor() {
    this.mLayers = [];
    this.UCReceiverEEHub = new UCReceiverEEHub();
    this.createStack();
  }
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
    //PLDDecoder
    m_Layers[1].upperLayer = m_Layers[0];
    m_Layers[1].lowerLayer = m_Layers[2];
    //PLDExecutor
    m_Layers[2].upperLayer = m_Layers[1];
    m_Layers[2].lowerLayer = m_Layers[3];
    //PLDEncapsulator
    m_Layers[3].upperLayer = m_Layers[2];
    m_Layers[3].lowerLayer = null;
    m_Layers[3].UCReceiverEEHub = this.UCReceiverEEHub;

    this.mLayers.push(...m_Layers);
    console.log('HoSoProtocolStackImpl (mLayers): ', this.mLayers);
  };
  send = (obj) => {
    this.mLayers[this.mLayers.length].send(obj);
  };
  recv = (obj) => {
    this.UCReceiverEEHub.emitGEvent(
      UCReceiverEEHub.events.onHoSoMessageReceived,
      obj
    );
    console.log('receiving data: ', obj);
    this.mLayers[0].recv(obj);
  };
  getUCReceiverEEHub = () => {
    return this.UCReceiverEEHub;
  };
}

export default HoSoProtocolStackImpl;
