import S3 from 'aws-sdk/clients/s3';
import mime from 'mime';
import cors from 'cors';
import cryptoRandomString from 'crypto-random-string';

const createPresignedPost = params => {
  const s3 = new S3({
    region: 'us-west-2',
    signatureVersion: 'v4'
  }); // Set the region according to the bucket's needs

  return new Promise((resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

const corsMiddleware = initMiddleware(
  cors({
    methods: ['POST', 'OPTIONS']
  })
);

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }

        return resolve(result);
      });
    });
}

export default async function(req, res) {
  await corsMiddleware(req, res);
  const name = req.body.name;
  const contentType = mime.getType(name);
  const key = `${cryptoRandomString({length: 16, type: 'url-safe'})}_${name}`;
  const bucket = 'sermons.onewaymargate.org';

  const params = {
    Expires: 60,
    Bucket: bucket,
    Conditions: [['content-length-range', 100, 100000000]], // 100Byte - 10MB
    Fields: {
      'Content-Type': contentType,
      key
    }
  };

  try {
    const presignedPostData = await createPresignedPost(params);

    res.status(200).json({presignedPostData});
  } catch (error) {
    console.log(error);
    res.status(500).send('Alan sucks at coding');
  }
}
