import React from 'react';
import { Title } from './home/Title';
import aws from 'aws-sdk';

function App() {
  new aws.S3(
    {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID
    }
  );
  console.log(process.env)
  return (
    <div>
      <Title titleDisplayText={'Bitter Jester Data Manager'}/>
    </div>
  );
}

export default App;
