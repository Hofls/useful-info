# playwright:bionic has everything to run playwright (node, npm, chromium, dependencies)
FROM mcr.microsoft.com/playwright:v1.25.1-focal
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
CMD npx playwright test --config=config/server.config.js
