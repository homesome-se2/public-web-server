import React, { Component } from 'react';
import './PaneActiveArea.css';

import { Grid } from '@material-ui/core';
import GadgetCard from '../../gadget/gadget-card/GadgetCard';
import { UserContext } from '../../../contexts/UserContext.js';
import ucEEmitterRVHub from '../../../EEmitters/RVHubs/ucEEmitterRVHub';

class PaneActiveArea extends Component {
  static contextType = UserContext;

  componentDidMount() {
    setTimeout(() => {
      this.setupEESubscribers();
    }, 1000);
  }

  setupEESubscribers = () => {
    this.context.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onUnSuccessfulLoginRVEEService,
        (...args) => {
          //
        }
      );
    this.context.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onGadgetGroupFetchCompleteRVEEService,
        (...args) => {
          //
        }
      );
  };
  state = {};
  render() {
    return (
      <div className="pane-active-area">
        <div className="inset-area">
          <div className="content-wrapper">
            <h1 className="header black-medium">Gadget list</h1>
            <h2 className="sub-header light-grey">All the available gadget</h2>
            <div className="divider"></div>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {this.context.gadgets.map((gadget, key) => {
                if (
                  this.context.selectedGadgetGroup.gadgetIds.includes(gadget.id)
                )
                  return <GadgetCard gadget={gadget} key={gadget.id} />;

                return null;
              })}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default PaneActiveArea;
