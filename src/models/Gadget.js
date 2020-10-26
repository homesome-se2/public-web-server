class Gadget {
    static gadgetProperties = 6;
    
  constructor(id, alias, type, valueTemplate, state, pollDelaySec){
      this.id = id;
      this.alias = alias;
      this.type = type;
      this.valueTemplate = valueTemplate;
      this.state = state;
      this.pollDelaySec = pollDelaySec;
  }

}
 
export default Gadget;