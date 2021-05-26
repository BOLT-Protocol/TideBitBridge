<<<<<<< HEAD
# MerMer-framework
MerMer Framework for Front End and Back End
=======
# TideBitBridge
Cross Chain Channel for Transfering Crypto Assets to TideBit Chain
>>>>>>> d6b0e431b858c9814a83e8b33728f8af1f655170

## Install
```shell
npm i -g mermer
```

## Initial New Project
```shell
mermer init /path/to/your/new/project
```

### edit package
```shell
vi /path/to/your/new/project/package.json
```

### edit config
```shell
cp /path/to/your/new/project/default.config.toml /path/to/your/new/project/private/config.toml
vi /path/to/your/new/project/private/config.toml
```
```toml
[api]
pathname = [
  "get | /,/version | Static.Utils.readPackageInfo"
]

# [method] | [path] | [execute function]
```

## Run Project
```
cd /path/to/your/new/project/
npm install
npm start
```
