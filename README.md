# Usage

To use this example you have to have Node.js and Yarn installed.

Install packages and run startup script:

```
yarn
yarn dev
```

Perform a production build:
```
yarn build
```

ESLint is used to check your JS code for errors, so make sure to install the following extension in VS Code: `dbaeumer.vscode-eslint`. Also a VS Code PostCSS Plugin could be required for correct syntax highlighting.

Vite will start a development webserver and use your index.html as an entrypoint. It will then resolve references to CSS, Image and JS files and compile these automatically whenever a file is saved.

You can configure additonal PostCSS plugins inside `.postcssrc` and change the supported browsers (CSS only) for autoprefixer inside `.browserslistrc`.

To make vite compatible with old browsers, the legacy plugin has to be activated.

After compilation you can check the dist folder to see what vite has written to the output files.

## References

[https://vitejs.dev/guide/](https://vitejs.dev/guide/)

[https://vitejs.dev/guide/features.html#css](https://vitejs.dev/guide/features.html#css)

[https://vitejs.dev/guide/build.html](https://babeljs.io/docs/en/babel-preset-env)

[https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring)

[https://prettier.io/docs/en/configuration.html](https://prettier.io/docs/en/configuration.html)