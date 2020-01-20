# gitstat-web

This repository contains the source code of the [gitstat.com](https://gitstat.com) website.

If you're looking to generate the JSON git logfile [go here](https://github.com/nielskrijger/gitstat) instead.

## Development

Simply run:

```sh
$ npm install
$ npm run dev
```

The website will be available at http://localhost:1234

## Todo

See the Kanban board [here](https://github.com/nielskrijger/gitstat-web/projects/1).

## FAQ

__I miss feature X or found a bug__

If you found a bug or feature suggestions, please open an issue [here](https://github.com/nielskrijger/gitstat-web/issues). Issues/features related to the website should be posted in the [gitstat repository](https://github.com/nielskrijger/gitstat). 

__Can I contribute?__

Yes! Please open a PR. If you want to do significant work I'd recommend opening an issue first, share some thoughts before you invest a lot of your time.

__Will you commercialize gitstat.com?__

No. As long as there are no significant costs involved in running the website I won't be looking for any type of funding. Additionally the sourcecode is open-source so anyone can fork and setup their own if they feel like it.

__Why did you use chart.js instead of X__

I tried several chart libraries (also React-specific ones) and I found Chart.js the most performant with larger datasets while at the same time providing a great out-of-the-box setup.

There are definitely things I don't like about it and I did fine a couple of bugs, but in the end I value performance and features more. 

__Why no redux/sagas/moby/...?__

I tend to go for the simplest solution possible. I was intrigued with the new out-of-the-box reducer from React so I tried managing state within the context manually. Not sure if I'm particularly happy with the setup now, but it'll do.

__Where are the tests?__

Usually I focus heavily on automated tests but most of my hobby projects never see the light of day. In this case I focused on pushing the project above all else.

__Why is there so much computation in the front-end?__

There is no backend API, only a CLI tool to generate the git logfile. The gitstat CLI tool is intended to gather the minimum amount of data; any data that can be derived is excluded from its JSON output. As a result the front-end computes derived data within `Extended<Type>` objects.
