import React from 'react';
import PropTypes from 'prop-types';


import RedBox from 'redbox-react'
import RelationGraph from '../../components/RelationGraph'
import style from './index.scss'

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.state = {
    };
  }

  onPageError = () => {
    window.location.reload()
  }

  componentDidCatch(error, info) {
    this.setState({
      ...this.state,
      appError: error
    })
  }

  render() {
    const { appError } = this.state

    if(appError && process.env.mode == "dev") {
      return <RedBox error={appError} />
    } else if (appError && process.env.mode == "prod") {
      return <div>
        <h3 className={style.errorMessage}>Oops! Something went wrong!</h3>
        <button onClick={this.onPageError}>Back</button>
      </div>
    }
    return (
      <div className={style.wrapper}>
        <RelationGraph/>
      </div>
    );
  }
}

export default App;
