import React, { Component } from 'react'
import RollbarErrorTracking from '../../../helpers/RollbarErrorTracking';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         hasError: false
      }
    }
    
    static getDerivedStateFromError(error) {
      RollbarErrorTracking.logErrorInRollbar(error);
        return {
            hasError: true
        }
    }
    
  render() {
      if (this.state.hasError) {
          return <h2>Some Error Spotted here!</h2>
      }
    return this.props.children
  }
}

export default ErrorBoundary


// export default class ErrorBoundary extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { hasError: false };
//     }
  
//     static getDerivedStateFromError(error) {
//       // Update state so the next render will show the fallback UI.
//       return { hasError: true };
//     }
  
//     componentDidCatch(error, errorInfo) {
//       // You can also log the error to an error reporting service
//       RollbarErrorTracking.logErrorInRollbar(error);
//     }
  
//     render() {
//       if (this.state.hasError) {
//           console.log('Error has occured');
//         // You can render any custom fallback UI
//         return <h1>Something went wrong.</h1>;
//       }
  
//       return this.props.children; 
//     }
//   }


// import Catch from './CustomErrorTracking';
// export const ErrorBoundary = Catch((props, error) => {
//     console.log(error);
//   const node = (error)
//     ? (
//       <div className="error-screen">
//         <h2>Something went wrong</h2>
//         <h4>{error.message}</h4>
//       </div>
//     )
//     : (<>{props.children}</>);
//   return node;
// });
// ErrorBoundary.propsTypes = {
//   children: React.ReactNode
// };
// export default ErrorBoundary;