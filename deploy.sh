echo "🐙  \033[1;34m clea dist folder  \033[0m"
rm -rf ../dist/

echo "🐙  \033[1;34m starting gh-page deploy!! \033[0m"
gulp ghpages-build
gulp ghpages-deploy
echo "🐙  \033[1;34m gh-pages feito!! \033[0m"

# echo "🐙  \033[1;34m clean jekyll dist folder  \033[0m"
# rm -rf ../dist/jekyll

echo "🐙  \033[1;34m starting html deploy!! \033[0m"
gulp html-build
gulp html-deploy
echo "🐙  \033[1;34m html feito!! \033[0m"

echo "🐙  \033[1;34m starting docker volume!! \033[0m"
gulp docker-volume-build
gulp docker-volume-deploy
echo "🐙  \033[1;34m docker-volume feito!! \033[0m"