#!/bin/sh

mkdir ~/".aws"
rm ~/".aws/credentials"
echo "[default]" > ~/'.aws/credntials'
echo "aws_access_key_id=${REACT_APP_AWS_ACCESS_ID}" >> ~/'.aws/credentials'
echo "aws_secret_access_key=${REACT_APP_AWS_SECRET_KEY}" >> ~/'.aws/credentials'

rm ~/".aws/config"
echo "[default]" > ~/'.aws/config'
echo "region=us-east-1" >> ~/'.aws/config'