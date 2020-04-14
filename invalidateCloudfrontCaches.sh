echo "[preview]" >> '~/.aws/config'
echo "cloudfront=true" >> '~/.aws/config'
aws cloudfront create-invalidation --distribution-id E1YBOAFSW1IURN --paths /*