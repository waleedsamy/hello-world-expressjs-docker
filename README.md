# api
Hello world express sample, return `Hello World!` when calling `127.0.0.1:8080/`.

[![Docker Hub](https://img.shields.io/badge/docker-ready-blue.svg)](https://registry.hub.docker.com/u/waleedsamy/hello-world-expressjs-docker/)

* run

 ```bash
  # docker run --log-driver=fluentd --name hwed -d -p 8080:8080 waleedsamy/hello-world-expressjs-docker
  $ docker run --name hwed -d -p 8080:8080 waleedsamy/hello-world-expressjs-docker
 ```

#### changes
* provide a simple api endpoint and use winston to log to stdout with json format
* running it with docker (with default log driver - jsonfile) mean your stdout/stderr is available in `/var/lib/docker/containers/{CONTAINER_ID}/{CONTAINER_ID}-json.log`
  ```bash
  /var/lib/docker/containers/b27e000d5bb025688645a413406c3055d22ef6a035f98d10b7091138a0ad5205/b27e000d5bb025688645a413406c3055d22ef6a035f98d10b7091138a0ad5205-json.log
  ```

* running docker containers in Kubernetes generates symbolic link to files under `/var/lib/containers/xxx/xxx-json.log` under `/var/log/containers/`
  ```bash
  lrwxrwxrwx 1 root root 165 Sep 28 09:01 /var/log/containers/api-deployment-502056682-ra1rj_default_POD-b27e000d5bb025688645a413406c3055d22ef6a035f98d10b7091138a0ad5205.log -> /var/lib/docker/containers/b27e000d5bb025688645a413406c3055d22ef6a035f98d10b7091138a0ad5205/b27e000d5bb025688645a413406c3055d22ef6a035f98d10b7091138a0ad5205-json.log
  ```
* now your logs are ready to be consumed by fluentd agent!
