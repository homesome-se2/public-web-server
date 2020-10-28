import React, {Component} from 'react';
import "../../gadget/gadget-card/gadgetCard.css"
/*
    import GadgetCard from './components/gadget/gadget-card/GadgetCard';
    <GadgetCard name="Lamp1" state={numeric or true-false} design={numeric or true-false} image={src} />
 */

class GadgetCard extends Component {
    constructor(props){
        super(props)
        //reading values instead of toggling on/off button state
        this.read = {isRead: this.props.read}
        //on or off
        this.state = {isToggled: this.props.state}
        //default design or white design
        this.design = {isDefault: this.props.design}
    }
    
    
    handleClick(){
        if(this.state.isToggled){
            this.setState({isToggled: false })
        }else{
            this.setState({isToggled: true })

        }
    }

    render() { 
        const isRead    = this.read.isRead;
        const isToggled = this.state.isToggled;
        const isDefault = this.design.isDefault;
        return (
            
            <div id={isDefault? "gadget-card" : "gadget-card-white"}>
             <div className="fixed-wrapper"> 
            <img src={this.props.image}  className="gadgetImage" />
            </div>  

             {isRead?
             <>
              <div id="gadget-text-wrapper">
              <section><b> {this.props.name}</b></section>
              <section><small>{isToggled? 'Connected‎':'Disconnected'}</small></section>
               </div>

            <div id="sensor-wrapper" >
                +17C
            </div>
                </>
             :
             
            <>
            <div id="gadget-text-wrapper">
               <section><b> {this.props.name}</b></section>
               <section><small>{isToggled? 'Connected‎':'Disconnected'}</small></section>
                </div>
                <div id={isDefault? "gadget-card-control" : "gadget-card-control-white"} >
                <section className="Off">Off</section>
                <section className="On">On</section>
                
                    <div 
                    onClick={()=> this.handleClick()}
                    className={isToggled? 'up' : 'standard'}
                    >    
                    </div>
                </div>
                </>
                }

            </div>

            
              );
    }
}
 
export default GadgetCard;