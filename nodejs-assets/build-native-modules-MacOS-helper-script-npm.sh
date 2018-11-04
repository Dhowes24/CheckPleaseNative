#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/Users/derekhowes/.nvm/versions/node/v11.0.0/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/derekhowes/CheckPleaseNative/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/derekhowes/CheckPleaseNative/node_modules/.bin:/Users/derekhowes/Downloads/google-cloud-sdk/bin:/Users/derekhowes/.nvm/versions/node/v11.0.0/bin:/Library/Frameworks/Python.framework/Versions/3.6/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb/bin
      npm $@
    