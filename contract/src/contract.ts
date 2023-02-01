import {
  call,
  near,
  NearBindgen,
  UnorderedMap,
  Vector,
  view,
} from 'near-sdk-js';

class Post {
  id: string;
  title: string;
  description: string;
  tags: Vector;
  media: string;
  users_who_likded: string[];
  owner_id: string;

  constructor(
    id: string,
    title: string,
    description: string,
    tags: Vector,
    media: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.media = media;
    this.users_who_likded = [];
    this.owner_id = near.predecessorAccountId();
  }
}

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

  add_posts_by_tag(post: Post, tags: string[]) {
    tags.forEach((tag) => {
      const posts_for_tag: Post[] =
        (this.posts_by_tag.get(tag) as Post[]) || [];

      posts_for_tag.push(post);
      this.posts_by_tag.set(tag, posts_for_tag);
    });
  }

  @call({})
  add_post({ title, description, tags, media }): Post {
    const id = this.number_of_posts.toString();
    tags = tags.split(',');
    const post = new Post(id, title, description, tags, media);

    this.posts.set(id, post);
    this.number_of_posts++;

    this.add_posts_by_tag(post, tags);

    return post;
  }

  @view({})
  get_all_posts({}) {
    return this.posts.toArray();
  }

  @call({})
  clear_all_posts({}): string {
    this.posts = new UnorderedMap('p');
    this.number_of_posts = 0;
    this.likes_by_user_id = new UnorderedMap('l');
    this.posts_by_tag = new UnorderedMap('t');

    return 'all posts are cleared';
  }

  @call({})
  like_a_post({ postId }): Post {
    postId = postId.toString();

    if (!this.posts.get(postId)) return null;

    const post = this.posts.get(postId) as Post;
    const sender_id = near.predecessorAccountId();
    const users_who_liked = post.users_who_likded;

    for (let i = 0; i < users_who_liked.length; i++)
      if (users_who_liked[i] === sender_id) return post;

    post.users_who_likded.push(sender_id);
    this.posts.set(postId, post);

    this.add_post_to_my_liked(sender_id, post);

    return post;
  }

  add_post_to_my_liked(sender_id: string, post: Post): void {
    let likes: Post[] = (this.likes_by_user_id.get(sender_id) as Post[]) || [];
    likes.push(post);
    this.likes_by_user_id.set(sender_id, likes);
  }

  @call({})
  get_my_liked_posts({}): Post[] {
    const sender_id = near.predecessorAccountId();
    return (this.likes_by_user_id.get(sender_id) as Post[]) || [];
  }

  @view({})
  get_post_by_tag({ tag }) {
    return this.posts_by_tag.get(tag) || [];
  }
}
