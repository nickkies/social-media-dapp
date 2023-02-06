export class Contract {
  wallet;

  constructor({ wallet }) {
    this.wallet = wallet;
  }

  async get_all_posts() {
    return await this.wallet.viewMethod({ method: 'get_all_posts' });
  }

  async add_post(args) {
    return await this.wallet.callMethod({
      method: 'add_post',
      args,
    });
  }

  async like_a_post(postId) {
    return await this.wallet.callMethod({
      method: 'like_a_post',
      args: { postId },
    });
  }

  async get_posts_by_tag(tag) {
    return await this.wallet.viewMethod({
      method: 'get_post_by_tag',
      args: { tag },
    });
  }
}
