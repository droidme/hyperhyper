FROM gitpod/workspace-full:latest

USER gitpod

ENV ANDROID_HOME=/workspace/android-sdk

RUN npm install expo-cli --global 

RUN bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh \
             && sdk install java 8.0.292-open \
             && sdk default java java 8.0.292-open"