export class Contract {
  wallet;

  constructor({ wallet }) {
    this.wallet = wallet;
  }

  async get_all_posts() {
    return await this.wallet.viewMethod({ method: 'get_all_posts' });
  }
}
