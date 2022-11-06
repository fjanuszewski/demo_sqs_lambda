curl -O https://registry.npmjs.org/esbuild-linux-64/-/esbuild-linux-64-0.15.12.tgz
tar xf ./esbuild-linux-64-0.15.12.tgz
export PATH=$PATH:$PWD/package/bin
npm i --omit=dev
