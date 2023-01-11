## Test add_post

1. `cd ./contract && ./deploy.sh`
2. copy Account id(log or `cat ./neardev/dev-account`)
3. `near call {copied id} add_post '{"title": "title test", "description" : "description test", "tags": "one,two", "media":"https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg"}' --accountId {copied id}`
