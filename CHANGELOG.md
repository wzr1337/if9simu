## [0.1.5](https://git.sdo.jlrmotor.com/d9mvp/wcif9/compare/0.1.4...0.1.5) (2019-08-13)


### Bug Fixes

* **shoulder:** [D9CC-123456789] fixed shoulder mount ([dd5c8fe](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/dd5c8fe))



## [0.1.4](https://git.sdo.jlrmotor.com/d9mvp/wcif9/compare/0.1.1...0.1.4) (2019-02-21)


### Bug Fixes

* **constants:** fix an issue running it outside of nodeJS (process) ([f5c5d6c](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/f5c5d6c))


### Features

* **auth:** allow to refresh tokens with just refresh tokemn ([ab26623](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/ab26623))
* **Environment:** add environment selection via ENV variable ([030fc72](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/030fc72))
* **general:** use new baseUrls for production ([6a91ff3](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/6a91ff3))
* **test:** Added testing for getTrips() ([3808bd7](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/3808bd7))
* **types:** properly export tspes ([25caa8d](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/25caa8d))
* **vehicle:** add route fetching - journeys ([66f73ec](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/66f73ec))
* **vehicle:** add trips ([e9a9853](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/e9a9853))



## [0.1.1](https://git.sdo.jlrmotor.com/d9mvp/wcif9/compare/0.1.0...0.1.1) (2018-12-18)


### Bug Fixes

* **commands.vehicles:** fix the evStatus not iterable bug ([3a8ff10](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/3a8ff10))



# [0.1.0](https://git.sdo.jlrmotor.com/d9mvp/wcif9/compare/31bac19...0.1.0) (2018-12-13)


### Bug Fixes

* **commands.auth:** remove user agent from login() to make it browser friendly ([784be02](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/784be02))
* **general:** deviceId is now a string ([231a2fa](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/231a2fa))
* **utils.stomp:** make line enidng optional for parsing frame body ([d94c952](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/d94c952))


### Features

* **commands:** add getLocation method, add demo ([ed22de6](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/ed22de6))
* **commands.vehicles:** add HornBlowFlashLights capability ([31bac19](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/31bac19))
* **commands.vehicles:** return an observable from  liveStatus() ([be2dd85](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/be2dd85))
* **commands.vehicles:** support prod and pre-prod urls ([2543f8f](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/2543f8f))
* **Commands.Vehicles:** Added Get SeriveStatus and VHS ([5b9bf8f](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/5b9bf8f))
* **utils:** add STOMP parser ([cef2dcf](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/cef2dcf))
* **utils.stomp:** encoding and decoding are now static method ([df578bd](https://git.sdo.jlrmotor.com/d9mvp/wcif9/commits/df578bd))



