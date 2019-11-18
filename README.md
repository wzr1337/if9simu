# IF9 simulation
This is a small simulation of JLRs IF9. It is far from complete and was developed to suport the "Connected Car: From APIs to Zecurity" class.

## Usage

First you need to install all dependencies via `npm`:

```bash
$ npm i
```

## Run it

To use the software simply run:

```bash
$ npm run start
```

## Supported features

### Login
you can login with username and password as well as refresh_token as long as your server session is up and running.
To add users, please change the usersDB in `./src/ifas/tokens`and rebuild.

### Register Device
you can register a device

## Contribution

Any kind of contribution is highly appreciated. Please follow the [guidelines](CONTRIBUTION.md) to allow others to followup with your changes and simplify the contribution process. When ever you made changes, please feel free to file a Pull-Request.

## LICENSE

Please refer to the [LICENSE](LICENSE) document in the root folder.
