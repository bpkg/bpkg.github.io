FROM jekyll/jekyll:latest

RUN gem install \
    webrick \
    jekyll-theme-minimal

RUN apk add --no-cache \
    curl

RUN wget -O - get.bpkg.sh | bash

CMD []
