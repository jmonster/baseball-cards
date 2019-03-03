# dealzilla scripts

# Redis
- To install locally: `brew install redis`
- To have launchd start redis now and restart at login:
  - `brew services start redis`
- Or, if you don't want/need a background service you can just run:
  - `redis-server /usr/local/etc/redis.conf`

# Queue
To have launchd start the dealzilla worker queue:
```sh
cp launchd/com.dealzilla.queue.plist /Library/LaunchDaemons/
sudo launchctl load -w /Library/LaunchDaemons/com.dealzilla.queue.plist
```

To stop that
```sh
sudo launchctl unload -w /Library/LaunchDaemons/com.dealzilla.queue.plist
```

# CamelCamelCamel RSS feed
To have launchd start the (scheduled) dealzilla camelcamelcamel RSS catcher:
```sh
cp com.dealzilla.camels.plist /Library/LaunchDaemons/
sudo launchctl load -w /Library/LaunchDaemons/com.dealzilla.camels.plist
```
To stop that
```sh
sudo launchctl unload -w /Library/LaunchDaemons/com.dealzilla.camels.plist
```
