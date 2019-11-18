# Wireless Car IF9

## Introduction

This software is aimed to help people building Javascript based software on top of Wireless cars IF9 Interface. The software is not publicly released and is not intended to be.

The software was build based on the documentation found here:

[IF9 API Documentation v3](https://docs.google.com/document/d/1xrqXM_bQZokUhY8govxanRsVQ0LGLGI7mHthOvfPANs/edit?usp=sharing)

## Backlog

* Needs to get abetter, object oriented interface, functional interface to be only used internally

client code might look like

```javascript
const client = new IF9Client();
await client.login("username", "password");
const vehicles = await client.getVehicles();
const epace = await client.getVehicle("e-pace-vin");
epace.state.subscribe((data) => {
  // fires with each and every vehicle state change
  console.log(data);
});
epace.lockstate = "unlocked"; // logs into console once vehicle was unlocked
epace.lockstate = "locked"; // logs into console once vehicle was locked
console.log(await epace.trips) // logs into console once trips where retrieved
```

## Code Samples

There are a couple of code examples in the `src/examples` folder. Each of them carrying its own `README.md`.

## Installation

To use the software as a library install it via `npm`

```bash
$ npm i git+https://git.sdo.jlrmotor.com/d9mvp/wcif9.git
```

To setup up pre-commit hooks for linting run:

```bash
./setup.sh
```

## Contribution

Any kind of contribution is highly appreciated. Please follow the [guidelines](CONTRIBUTION.md) to allow others to followup with your changes and simplify the contribution process. When ever you made changes, please feel free to file a Pull-Request.

## LICENSE

Please refer to the [LICENSE](LICENSE) document in the root folder.