# Seed Firebase From CamelCamelCamel

### Explanation
Fetches the CamelCamelCamel RSS feed and ensures all of the products are in the monitoring queue.
+ Creates or update deal/product records as appropriate
+ Avoid duplicates
+ Expires deals that are no longer part of the feed

### Usage
```sh
$ yarn seed-firebase-from-camelcamelcamel

yarn run v1.13.0
$ node ./tasks/seed-firebase-from-camelcamelcamel
Added 0 deals
Expired 0 deals
Added 0 products
```


# Seed Queue from Firebase

### Explanation
Grabs all products from Firebase and adds them to the (recurring) worker queue. _note: there's no useful output (yet?)_

### Usage
```sh
yarn seed-queue-from-firebase
```

---

# launchd scripts

### Redis
- To install locally: `brew install redis`
- To have launchd start redis now and restart at login:
  - `brew services start redis`
- Or, if you don't want/need a background service you can just run:
  - `redis-server /usr/local/etc/redis.conf`

### Queue
To have launchd start the dealzilla worker queue:
```sh
cp launchd/com.dealzilla.queue.plist /Library/LaunchDaemons/
sudo launchctl load -w /Library/LaunchDaemons/com.dealzilla.queue.plist
```

To stop that
```sh
sudo launchctl unload -w /Library/LaunchDaemons/com.dealzilla.queue.plist
```

### CamelCamelCamel RSS Feed
To have launchd start the (scheduled) dealzilla camelcamelcamel RSS catcher:
```sh
cp com.dealzilla.camels.plist /Library/LaunchDaemons/
sudo launchctl load -w /Library/LaunchDaemons/com.dealzilla.camels.plist
```
To stop that
```sh
sudo launchctl unload -w /Library/LaunchDaemons/com.dealzilla.camels.plist
```
