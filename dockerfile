FROM nginx

WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh && bash nodesource_setup.sh
RUN apt update && apt upgrade -y && apt install nodejs -y && apt install git-all -y
RUN git clone https://github.com/sarnaizgarcia/file_uploader

WORKDIR /app/file_uploader
RUN npm install pm2 -g && npm ci

COPY entrypoint.sh /
RUN chmod u+x /entrypoint.sh

CMD ["/entrypoint.sh"]
