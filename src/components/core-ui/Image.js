// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import RefreshIndicator from 'material-ui/RefreshIndicator';

type State = {
  isLoading: boolean;
};

export default class Image extends Component<*, State> {
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      isLoading: true,
    }
  }

  onFinishLoad() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    let {width, height, ...otherProps} = this.props;
    let {isLoading} = this.state;
    return (
      <div>
        <img alt="" width={isLoading ? 0 : width} height={isLoading ? 0 : height} onLoad={this.onFinishLoad} {...otherProps}/>
        <div
          style={{
            display: isLoading ? 'block' : 'none',
            width: isLoading ? '430px' : 0,
            height: isLoading ? '435px' : 0,
            margin: 0,
            padding: 0,
          }}
        >
          <RefreshIndicator
            status="loading"
            size={50}
            left={(450 / 2) - 25}
            top={(450 / 2) - 25}
            loadingColor="rgb(215, 60, 60)"
            
            style={{display: 'inline-block', position: 'relative'}}
          />
        </div>
      </div>
    )
  }
}