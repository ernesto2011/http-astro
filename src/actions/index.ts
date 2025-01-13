import { getGreeting } from './greetings/get-greeting.action';
import { getPostLikes } from './posts/get-post-likes.action';
import { updatePostLikes } from './posts/update-likes.action';
import { getLikesPost } from './postsDB/get-likes-post.action';
import { updatelkesPost } from './postsDB/update-likes-post.action';

export const server = {
  getGreeting,

  // posts
  getPostLikes,
  updatePostLikes,

  getLikesPost,
  updatelkesPost,
};
