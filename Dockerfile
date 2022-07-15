FROM centos:latest
LABEL maintainer="CoordGrabber"
RUN yum -y install httpd
COPY dist/* /var/www/html/
ENTRYPOINT ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80

