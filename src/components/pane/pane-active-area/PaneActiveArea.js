import React, { Component } from 'react';
import './PaneActiveArea.css';

import { Grid } from '@material-ui/core';
import GadgetCard from '../../gadget/gadget-card/GadgetCard';
import { UserContext } from '../../../contexts/UserContext.js';
import ucEEmitterRVHub from '../../../EEmitters/RVHubs/ucEEmitterRVHub';

class PaneActiveArea extends Component {
  static contextType = UserContext;

  state = {
    searchText: '',
  };

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
  searchText = (e) => {
    this.setState({ searchText: e.target.value });
  };
  render() {
    return (
      <div className="pane-active-area">
        <div className="inset-area">
          <div className="content-wrapper">
            <div className="left-wrapper">
              <h1 className="header black-medium">Gadget list</h1>
              <h2 className="sub-header light-grey">
                All the available gadget
              </h2>
            </div>
            <div className="right-wrapper">
              <h1 className="home-alias">
                Home alias: <span>{this.context.homeAlias}</span>
              </h1>
              <input
                className="search-bar"
                type="text"
                placeholder="Type to search..."
                onChange={(e) => {
                  this.searchText(e);
                }}
              ></input>
            </div>
            <div className="divider"></div>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {this.context.gadgets.map((gadget, key) => {
                if (
                  //1 || //=REMOVE-ME, NOTIFY ANTON BUG
                  (this.context != null &&
                    this.context.selectedGadgetGroup != null &&
                    this.context.selectedGadgetGroup.gadgetIds.includes(
                      gadget.id
                    ) &&
                    this.state.searchText.length > 0) ||
                  gadget.alias.includes(this.state.searchText)
                )
                  return <GadgetCard gadget={gadget} key={key} />;

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
