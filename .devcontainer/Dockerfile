FROM node:12-buster

RUN apt update && \
    apt install curl -y && \
    apt install unzip -y && \
    apt install unzip -y && \
    npm install -g nodemon    

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    apt install less
