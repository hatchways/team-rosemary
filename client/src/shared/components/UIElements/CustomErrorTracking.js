import React from 'react';
import RollbarErrorTracking from '../../../helpers/RollbarErrorTracking';
export default function Catch(
  component,
  errorHandler
) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: undefined,
      };
    }
static getDerivedStateFromError(error) {
      return { error };
    }
componentDidCatch(error, info) {
      if (errorHandler) {
        RollbarErrorTracking.logErroInfo(info);
        RollbarErrorTracking.logErrorInRollbar(error);
        errorHandler(error, info);
      }
    }
render() {
      const { error } = this.state;
      return component(this.props, error);
    }
  };
}