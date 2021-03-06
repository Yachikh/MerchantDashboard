FROM node:7.2.1

MAINTAINER Oleg Shalygin <oshalygin@gmail.com>

ARG version

LABEL version=$version
LABEL description="Merchant dashboard built on NodeJs, React, Redux, Express"

ENV PORT=8080

COPY . /wwwroot
WORKDIR /wwwroot
EXPOSE $PORT

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN $HOME/.yarn/bin/yarn install
RUN npm run build

ENTRYPOINT  ["npm", "run", "open:dist"]
