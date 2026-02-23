## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript for a REST API.
This API was created to saved receipt for projects and to help keeping track of expenses in a financial year.
Every records are saved even if they are not saved under a category.

## Version
Stable version : N/A
Dev: V0.2

## Services Dependencies

Verify the following services are running on the distributed system:
  - Keycloak
  - PostgreSQL

## Next updates foreseen

Add a `reports` service to generate tax reports and add information in the dashboard.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
