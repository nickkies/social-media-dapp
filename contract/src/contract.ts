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

  @call({})
  add_post({ title, description, tags, media }): Post {
    const id = this.number_of_posts.toString();
    const post = new Post(id, title, description, tags.split(','), media);

    this.posts.set(id, post);
    this.number_of_posts++;

    return post;
  }

  @view({})
  get_all_posts({}) {
    return this.posts.toArray();
  }

  @call({})
  like_a_post({ postId }): Post {
    postId = postId.toString();

    if (!this.posts.get(postId)) return null;

    const post = this.posts.get(postId) as Post;
    const sender_id = near.predecessorAccountId();
    // const users_who_liked = post.users_who_likded;

    // users_who_liked.forEach((id) => {
    //   if (id === sender_id) return post;
    // });

    post.users_who_likded.push(sender_id);
    this.posts.set(postId, post);

    return post;
  }
}
