FROM buildkite/puppeteer:v1.13.0
# Image has non-empty node_modules in root directory, so we have to move away from it
COPY . /pup
WORKDIR /pup
RUN npm install
CMD npm run dev
