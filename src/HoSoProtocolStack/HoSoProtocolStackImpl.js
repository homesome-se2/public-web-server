import PLDParser from './PLDParser';
import PLDDecoder from './PLDDecoder';
import PLDExecutor from './PLDExecutor';
import PLDEncapsulator from './PLDEncapsulator';

class HoSoProtocolStackImpl {
  constructor() {
    this.mLayers = [];
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

    this.mLayers.push(...m_Layers);
    console.log('mLayers: ', this.mLayers);
  };
  send = (obj) => {
    this.mLayers[this.mLayers.length].send(obj);
  };
  recv = (obj) => {
    console.log('receiving data: ', obj);
    this.mLayers[0].recv(obj);
  };
}

export default HoSoProtocolStackImpl;
