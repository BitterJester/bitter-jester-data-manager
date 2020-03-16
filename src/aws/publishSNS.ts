import AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });

export type SNSMessage = {
    Message: string;
    TopicArn: string;
};

export const publishSNS = async (snsMessage: SNSMessage) => {
    const client = new AWS.SNS({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        apiVersion: '2010-03-31'
    });

    await client.publish(snsMessage)
        .promise().then(function (data) {
            console.log(`Message ${snsMessage.Message} send sent to the topic ${snsMessage.TopicArn}`);
            console.log("MessageID is " + data.MessageId);
        }).catch(function (err) {
            console.error(err, err.stack);
        });
};