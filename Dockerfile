FROM centos:7
MAINTAINER 4Lambda Developers <d@4lambda.io>

EXPOSE 80

RUN yum -y makecache all \
    && yum -y install epel-release \
    && yum -y install \
        gcc \
        python-pip \
        python-devel \
        pcre-devel \
    && yum clean all

ADD . /var/4l/www
WORKDIR /var/4l/www
RUN pip install -r requirements.txt

ENTRYPOINT ["uwsgi"]
CMD ["app.ini"]

