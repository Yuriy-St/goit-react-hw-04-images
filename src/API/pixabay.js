import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37874154-0c182140a298a4e7b14c7c4d9';

const DEF_OPTIONS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
};

export default async function pixabay(options) {
  const params = {
    ...DEF_OPTIONS,
    ...options,
  };

  const config = {
    method: 'get',
    url: BASE_URL,
    params,
  };

  try {
    const response = await axios(config);
    if (response.status !== 200) throw response.data;
    return response;
  } catch (err) {
    const { response } = err;

    if (response?.data) {
      console.error(response.data);
    } else {
      console.error(response || err);
    }

    throw new Error('Something went wrong. Try reload the page.');
  }
}
