import { ajax } from 'discourse/lib/ajax';

const getLatestReplies = () => {
  return ajax('/posts').then(function (result) {
    return result.latest_posts;
  }).catch(() => {
    console.log('getting topic list failed');
    return [];
  });
};

export { getLatestReplies }
