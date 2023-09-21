# tv-shows

I didn't use any external libraries except of what is provided out of the box with Vue. I was tempted for a second to add lodash which kind of lives in most of the modern projects, but I figured that I can write a debounce function myself just as well.

Apart from out of the box functionality there is also lint and prettier to make it more production ready.

There is no 100% code coverage, only some sample tests that can be created for this app. Normally I would certainly add more, but there are also time constraints, my current job and 4 other technical assignments I've been working on at the same time :) I might be missing some Vue best practices, since I'm primarily working with Angular (and React sometimes) and I had only educational experience with Vue.

Any feedback is appreciated.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
