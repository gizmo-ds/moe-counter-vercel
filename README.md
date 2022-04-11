# moe-counter-vercel

[Moe-counter](https://github.com/journey-ad/Moe-counter) 的 Serverless 版本

<img src="https://moe-counter-vercel.vercel.app/get/@moe-counter-vercel.github" height="100" title="moe-counter">

## Demo

[https://moe-counter-vercel.vercel.app](https://moe-counter-vercel.vercel.app)

## Deploy on your own Vercel instance

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGizmoOAO%2Fmoe-counter-vercel%2Ftree%2Fmain&env=DB_TYPE,FAUNA_SECRET,DETA_PROJECT_KEY,MONGODB_URI,MONGODB_COLLECTION&envDescription=%E2%9D%A4&envLink=https%3A%2F%2Fgithub.com%2FGizmoOAO%2Fmoe-counter-vercel%2Ftree%2Fmain%23environment-variables)

### Environment Variables

| Key                | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| DB_TYPE            | `fauna` , `deta` or `mongo`                                                     |
| FAUNA_SECRET       | [fauna](https://fauna.com/)'s secret                                            |
| DETA_PROJECT_KEY   | [deta](https://www.deta.sh)'s project key                                       |
| MONGODB_URI        | [MongoDB URI](https://www.mongodb.com/docs/manual/reference/connection-string/) |
| MONGODB_COLLECTION | MongoDB Collection, this is not required, defaults to `moe-counter`             |

## Credits

- [Moe-counter](https://github.com/journey-ad/Moe-counter)

## License

Code is distributed under [MIT](./LICENSE) license, feel free to use it in your proprietary projects as well.

## Thanks

Thanks to [JetBrains](https://jb.gg/OpenSource) for the open source license(s). ❤️

[![JetBrains Logo](./images/jetbrains.svg)](https://jb.gg/OpenSource)
