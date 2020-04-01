import AWS from 'aws-sdk';

export class S3Client {
    client: AWS.S3;
    constructor(
        accessKeyId,
        secretAccessKey
    ) {
        this.client = new AWS.S3({
            accessKeyId,
            secretAccessKey
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

    async getObject() {
        const params = {
            Bucket: "bitter-jester-test",
            Key: "bitter-jester-test.json"
        };
        return new Promise((resolve, reject) => {
            this.client.getObject(params, function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                    const jsonStringReturn = data.Body.toString();

                    return resolve(JSON.parse(jsonStringReturn));
                }
            });
        });
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