import React, {Component, createContext} from 'react';

export const GadgetContext = createContext();

class GadgetContextProvider extends Component {
    state = { 
        gadgets: []
     }
    render() { 
        return ( 
            <GadgetContext.Provider value={ {...this.state} }>
                {this.props.children}
            </GadgetContext.Provider>
         );
    }
}
 
export default GadgetContextProvider;
