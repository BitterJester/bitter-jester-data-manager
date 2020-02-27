import React, { useState, useEffect } from 'react';
import { getFromS3 } from '../../s3/getFromS3';
import { Title } from './Title';
import { SubmissionTable } from '../../Components/SubmissionTable';

type Answer = {

}

type Answers = {
  "1"?: Answer;
  "2"?: Answer;
  "3"?: Answer;
  "4"?: Answer;
  "5"?: Answer;
  "6"?: Answer;
  "7"?: Answer;
  "8"?: Answer;
  "9"?: Answer;
  "10"?: Answer;
  "11"?: Answer;
  "12"?: Answer;
  "13"?: Answer;
  "14"?: Answer;
  "15"?: Answer;
  "16"?: Answer;
  "17"?: Answer;
  "18"?: Answer;
  "19"?: Answer;
}

export type Submission = {
  id: string;
  form_id: string;
  ip: string;
  created_at: string;
  status: string;
  new: string;
  flag: string;
  notes: string;
  updated_at: string;
  answers: Answers;
}

export const Submissions = () => {
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
            <SubmissionTable submissions={submissions} />
        </div>
    );
}