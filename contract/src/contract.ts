import { NearBindgen, UnorderedMap } from 'near-sdk-js';

@NearBindgen({})
class SocialMedia {
  posts: UnorderedMap;
  number_of_posts: number;
  likes_by_user_id: UnorderedMap;
  posts_by_tag: UnorderedMap;

  constructor() {
    this.posts = new UnorderedMap('p');
    this.number_of_posts = 0;
    this.likes_by_user_id = new UnorderedMap('l');
    this.posts_by_tag = new UnorderedMap('t');
  }
}
