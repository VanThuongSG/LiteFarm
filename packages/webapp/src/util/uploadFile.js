import S3 from 'aws-sdk/clients/s3';
import Endpoint from 'aws-sdk/lib/http.js';
import { DO_CDN_URL, DO_URI } from './constants';

export default function uploadFile(
  blob,
  filename,
  callback,
  {
    isPublic = false,
    onError = (err) => {
      console.log(err);
    },
  },
) {
  const spacesEndpoint = new Endpoint(DO_URI);
  const s3 = new S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.REACT_APP_DO_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_DO_ACCESS_SECRET_KEY,
  });
  const params = {
    Body: blob,
    Bucket: `${process.env.REACT_APP_DO_BUCKET_NAME}`,
    Key: filename,
  };
  const host = DO_CDN_URL;
  s3.putObject(params)
    .on('build', (request) => {
      request.httpRequest.headers.Host = host;
      request.httpRequest.headers['Content-Length'] = blob.size;
      request.httpRequest.headers['Content-Type'] = blob.type;
      isPublic && (request.httpRequest.headers['x-amz-acl'] = 'public-read');
    })
    .send((err) => {
      if (err) onError?.(err);
      else {
        const imageUrl = `${host}/${filename}`;
        callback(imageUrl);
      }
    });
}

export async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hash = hashArray.map((b) => b.toString(36)).join('');
  return hash;
}
