import AWS from 'aws-sdk';

export class S3Client {
    client: AWS.S3;
    constructor() {
        this.client = new AWS.S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
        })
    }

    async put(request) {
        return new Promise((resolve, reject) => {
            this.client.putObject(request, (error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            })
        })
    }

    async getObject(key = "bitter-jester-test.json") {
        const params = {
            Bucket: "bitter-jester-test",
            Key: key
        };
        return new Promise((resolve, reject) => {
            this.client.getObject(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else {
                    const jsonStringReturn = data.Body.toString();
                    return resolve(JSON.parse(jsonStringReturn));
                }
            });
        });
    }

    async getObjectsInFolder(bucket: string, prefix: string) {
        const params = {
            Bucket: bucket,
            Prefix: prefix
        };

        return new Promise((resolve, reject) => {
            this.client.listObjectsV2(params, (err, data) => {
                if (err) console.log(err, err.stack);
                else {
                    const s3Objects = [];
                    data.Contents.forEach(async item => {
                        if (item.Key.includes('.json')) {
                            const s3Object = await this.getObject(item.Key);
                            s3Objects.push(s3Object);
                        }
                    })


                    return resolve(s3Objects);
                }
            })
        })
    }

    createPutPublicJsonRequest(
        location,
        filename,
        contents
    ) {
        return {
            Bucket: location,
            Key: filename,
            Body: contents,
            ContentType: 'application/json; charset=utf-8',
            ACL: 'public-read',
            CacheControl: 'max-age=60'
        };
    }
}