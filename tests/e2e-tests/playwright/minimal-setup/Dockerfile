# playwright:bionic has everything to run playwright (node, npm, chromium, dependencies)
FROM mcr.microsoft.com/playwright:v1.9.1-bionic
COPY . .
RUN npm install
CMD npm run prod-tests