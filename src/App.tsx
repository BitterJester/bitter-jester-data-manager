import React, { useState, useEffect } from 'react';
import { Title } from './Pages/home/Title';
import { getFromS3 } from './s3/getFromS3';


type Answer = {
  name: string;
  order: string;
  text: string;
  type: string;
  sublabels?: string;
  answer?: object | string | string[];
  prettyFormat?: string;
  mcolumns?: string;
  mrows?: string;
}

type Submission = {
  id: string;
  form_id: string;
  ip: string;
  created_at: string;
  status: string;
  new: string;
  flag: string;
  notes: string;
  updated_at: string;
  answers: Answer[];
}

function App() {
  const initialSubmissions: Submission[] = [];
  const [submissions, setSubmissions] = useState(initialSubmissions);
  
  useEffect(() => {
    async function fetch() {
      await getFromS3(setSubmissions);      
    }
    fetch();
  }, []);

  return (
    <div>
      <Title titleDisplayText={'Bitter Jester Data Manager'} />
      <p>
        {JSON.stringify(submissions)}
      </p>
    </div>
  );
}

export default App;
