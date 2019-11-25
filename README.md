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

## Supported endpoints

So far implemented:
`GET /`

`GET /ifas`

`POST /ifas/jlr/tokens`

`GET /if9`

`GET /if9/jlr/users/:userid/vehicles`

`GET /if9/jlr/users/:userid/vehicles`

`POST /if9/jlr/vehicles/:VIN/users/:userid/authenticate`

`POST /if9/jlr/vehicles/:VIN/unlock` & `POST /if9/jlr/vehicles/:VIN/RDU`

`POST /if9/jlr/vehicles/:VIN/lock` & `POST /if9/jlr/vehicles/:VIN/RDL`

`POST /if9/jlr/vehicles/:VIN/honkBlink` & `POST /if9/jlr/vehicles/:VIN/hblf`

`GET /if9/jlr/vehicles/:VIN/status`

`GET /if9/jlr/vehicles/:VIN/services/:customerServiceId`

`GET /ifop`

`POST /ifop/jlr/users/:userName/clients`

### Login
you can login with username and password as well as refresh_token as long as your server session is up and running.
To add users, please change the usersDB in `./src/ifas/tokens`and rebuild.

### Register Device
you can register a device

## Contribution

Any kind of contribution is highly appreciated. Please follow the [guidelines](CONTRIBUTION.md) to allow others to followup with your changes and simplify the contribution process. When ever you made changes, please feel free to file a Pull-Request.

## LICENSE

Please refer to the [LICENSE](LICENSE) document in the root folder.
