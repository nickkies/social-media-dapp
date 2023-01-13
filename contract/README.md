## Test add_post

1. `npm run deploy`
2. `near call {copied id} add_post '{"title": "title test", "description" : "description test", "tags": "one,two", "media":"https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg"}' --accountId {copied id}`
3. `near view {copied id} get_all_posts`
