FROM harbor.qjdidc.com/public/nginx:1.17.7
COPY ./dist/ /opt/data/
RUN mkdir /opt/logs
RUN mkdir /logs /upload
