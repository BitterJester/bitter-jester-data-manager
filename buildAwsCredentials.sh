#!/bin/sh

mkdir ~"/.aws"
echo "aws_access_key_id=${REACT_APP_AWS_ACCESS_ID}" > ~/'.aws/credentials'
echo "aws_secret_access_key=${REACT_APP_AWS_SECRET_KEY}" >> ~'/.aws/credentials'
