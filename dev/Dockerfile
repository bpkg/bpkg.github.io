FROM jekyll/jekyll:latest

RUN gem install \
    webrick \
    github-pages

RUN apk add --no-cache \
    curl

RUN wget -O - get.bpkg.sh | bash

CMD []
