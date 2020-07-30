import meshes from './network/meshes';
import index from './network/index';
import topic from './network/topic';
import user from './network/user';

export default {
  meshes_v1: meshes.meshes_v1,
  banners_v1: index.banners_v1,
  category_v1: index.category_v1,
  quizzes_v1: topic.quizzes_v1,
  user_v1: user.user_v1,
  feedback_v1:user.feedback_v1
};