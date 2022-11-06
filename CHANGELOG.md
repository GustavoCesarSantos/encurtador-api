# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.17.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.16.0...v1.17.0) (2022-11-06)


### Features

* adiciona inicialização da rota de doc ao entry point ([d46a242](https://github.com/GustavoCesarSantos/encurtador-api/commit/d46a24267819cba58ca6acd026e5246060804a2d))
* adiciona swagger ao express ([e941911](https://github.com/GustavoCesarSantos/encurtador-api/commit/e941911e04684c70c7ef99689893d91c7c53fa07))
* cria helper para lidar com swagger ([96c23a7](https://github.com/GustavoCesarSantos/encurtador-api/commit/96c23a7c524fbc727b04193d2019f9d429682c24))
* cria swagger document ([e765a83](https://github.com/GustavoCesarSantos/encurtador-api/commit/e765a83db70f0116df7c386d6cbf47e9fb86bf03))


### Bug Fixes

* :bug: corrige status e cria método created ([6c5e9d1](https://github.com/GustavoCesarSantos/encurtador-api/commit/6c5e9d1ec44d8729d1375c0a90db8489c12a3b47))
* :bug: corrige uso do método de response ([99a96de](https://github.com/GustavoCesarSantos/encurtador-api/commit/99a96de119cf5bc904039b24dbf3808e6b800e7a))

## [1.16.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.15.3...v1.16.0) (2022-10-30)


### Features

* :sparkles: cria adaptador de middleware ([fc60603](https://github.com/GustavoCesarSantos/encurtador-api/commit/fc606030f99da8f79b6383fa884bd79f31b17754))
* :sparkles: cria cliente do redis ([678b5d8](https://github.com/GustavoCesarSantos/encurtador-api/commit/678b5d85b8de833cf6efdffef2ea210e72ca7797))
* :sparkles: cria middleware de rate limit ([a3f5967](https://github.com/GustavoCesarSantos/encurtador-api/commit/a3f5967ea3da51e8ea04b09c516760531ac81c9b))
* adiciona a propriedade connect a interface de cache ([dc24be6](https://github.com/GustavoCesarSantos/encurtador-api/commit/dc24be61cdeaed372aa55ef2dad2ecfcb8a647df))
* adiciona middleware rate-limit a rota de health check ([fbfad8d](https://github.com/GustavoCesarSantos/encurtador-api/commit/fbfad8d292b15675eb5af4417e200a71b298f15b))
* adiciona o método connect a classe redisClient ([504e70b](https://github.com/GustavoCesarSantos/encurtador-api/commit/504e70b71056d7d8d0f2ab0c38e4cde66e0f9dc1))
* adiciona rate limit ([f0d04cc](https://github.com/GustavoCesarSantos/encurtador-api/commit/f0d04ccbea5a09d0df0e3750b9236ffdd0966d95))
* cria interface para cache ([18265c1](https://github.com/GustavoCesarSantos/encurtador-api/commit/18265c11069efc75e7b94c5c523eec1ae55b6b79))
* cria interface para middleware ([14c59ef](https://github.com/GustavoCesarSantos/encurtador-api/commit/14c59ef01bf94e060389d4577c49cf411c507e67))
* **rate-limit:** cria cliente para redis ([730be48](https://github.com/GustavoCesarSantos/encurtador-api/commit/730be48df922df2880ac664c37600b765c2d9822))
* **rate-limit:** cria método fabrica para rate limit ([3d46dbb](https://github.com/GustavoCesarSantos/encurtador-api/commit/3d46dbb954b0e37dc27354ce585e04315d2dacee))


### Bug Fixes

* corrige classe de rate limit ([65b135f](https://github.com/GustavoCesarSantos/encurtador-api/commit/65b135f8237a2b44c5b759fcd120b34cf427a25f))
* **middleware adapter:** corrige adaptador de middleware ([728b2e8](https://github.com/GustavoCesarSantos/encurtador-api/commit/728b2e8a6d17036753fb3825cd884e43011bdb72))
* **rate-limit:** corrige erro na comparação das datas ([d8cc936](https://github.com/GustavoCesarSantos/encurtador-api/commit/d8cc936545e3ddfc0308fbd1ffd99c371faa3ba7))
* **rate-limit:** corrige import ([3bafaff](https://github.com/GustavoCesarSantos/encurtador-api/commit/3bafaff3a2f9b40b4b678fc6ccc10d8b9e2dd73e))
* **rate-limit:** cria classe cacheWihtRedis ([7f04957](https://github.com/GustavoCesarSantos/encurtador-api/commit/7f04957e519a3a892257364f54984da4c1d4172b))
* **rate-limit:** remove classe redisClient ([a790776](https://github.com/GustavoCesarSantos/encurtador-api/commit/a790776cf61ddaef429f4515da7b748a1fef8cfd))
* **rate-limit:** remove método connect da interface ([4f87c61](https://github.com/GustavoCesarSantos/encurtador-api/commit/4f87c61704a1772c80c5b476eb2e2ac566f3710c))
* **rate-limit:** remove uso do método connect ([6d57d34](https://github.com/GustavoCesarSantos/encurtador-api/commit/6d57d3491458bfa227276d22957e13b4ddf409da))

### [1.15.3](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.15.2...v1.15.3) (2022-09-24)

### [1.15.2](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.15.1...v1.15.2) (2022-06-09)


### Bug Fixes

* corrige erro de conflito ([2dffa15](https://github.com/GustavoCesarSantos/encurtador-api/commit/2dffa153e1db1a3410a37fac2d50cf29f0f3499c))

### [1.15.1](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.15.0...v1.15.1) (2022-06-09)


### Bug Fixes

* :bug: corrige erro de tipagem ([a43eb6e](https://github.com/GustavoCesarSantos/encurtador-api/commit/a43eb6edbff112664d38951733e06a85d9b30974))
* corrige dependencias ([abc6ee5](https://github.com/GustavoCesarSantos/encurtador-api/commit/abc6ee5ac87f82800c72f4f460691595f2660b52))
* corrige problema de build do heroku ([88e268d](https://github.com/GustavoCesarSantos/encurtador-api/commit/88e268df998891616fffe4943742d889e8d7a50e))
* corrige problema de deploy ([4c5337c](https://github.com/GustavoCesarSantos/encurtador-api/commit/4c5337cc7489a509293280f09a797b8537351eea))
* corrige problema de deploy do heroku ([646e508](https://github.com/GustavoCesarSantos/encurtador-api/commit/646e508e141fc595f47b51cc211dc83a75d2fba3))

## [1.15.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.14.0...v1.15.0) (2022-06-09)


### Features

* :sparkles: cria rota de health check ([2b59bb3](https://github.com/GustavoCesarSantos/encurtador-api/commit/2b59bb3c1763be543c00b9f6fd2ff636af0d5f52))
* adiciona as rotas de health check ao router do express ([e808eb6](https://github.com/GustavoCesarSantos/encurtador-api/commit/e808eb6a3dcea4cab4dc675781c21dafb2246ee3))


### Bug Fixes

* :bug: corrige número da porta ([e093432](https://github.com/GustavoCesarSantos/encurtador-api/commit/e093432bcb7e05740391c6d14540e9ccf65fecbe))

## [1.14.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.13.0...v1.14.0) (2022-05-29)


### Features

* adiciona uso do método de setCors ao entrypoint ([7a64b7d](https://github.com/GustavoCesarSantos/encurtador-api/commit/7a64b7d3aa5e3712e6d028b811287838babc3e9b))
* cria método para configurar cors ([5ccc6c5](https://github.com/GustavoCesarSantos/encurtador-api/commit/5ccc6c5d81fae30251deacb3359cbd625d470135))
* cria resposta http para os erros do tipo servidor ([2826d7a](https://github.com/GustavoCesarSantos/encurtador-api/commit/2826d7af1cdd7e193ffc1c0c6942bec9bbd4c7b5))

## [1.13.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.12.1...v1.13.0) (2022-05-14)


### Features

* :sparkles: adiciona gracefull shutdown ([e954188](https://github.com/GustavoCesarSantos/encurtador-api/commit/e9541886dc13acf8eeb83a42b876530c1efc61a4))

### [1.12.1](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.12.0...v1.12.1) (2022-05-14)

## [1.12.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.10.0...v1.12.0) (2022-05-02)


### Features

* Adiciona event manager a classe creat short url ([ce84988](https://github.com/GustavoCesarSantos/encurtador-api/commit/ce849886d0ad5bc5db9fcac805896e2b483fe6f6))
* adiciona eventManager a construção do caso de uso incrementHits ([3095f3c](https://github.com/GustavoCesarSantos/encurtador-api/commit/3095f3c44e20b7d27657b7ce55fc2286c0e1abfd))
* adiciona eventManager a construção do caso de uso updateShortUrl ([2dff661](https://github.com/GustavoCesarSantos/encurtador-api/commit/2dff6613e12091f0cba1b6c3c19f358ae64aacd8))
* Adiciona gerente de eventos a criação do caso de uso retornar url encurtada na fabrica de casos de uso ([e6fa83a](https://github.com/GustavoCesarSantos/encurtador-api/commit/e6fa83a57f31693317918fa204307ab463fb0631))
* Adiciona gerente de eventos a criação do caso de uso retornar url encurtada no teste unitario ([d942a10](https://github.com/GustavoCesarSantos/encurtador-api/commit/d942a1003888b5a6478a3d99ded9df4ea9f8adab))
* Adiciona gerente de eventos ao caso de uso gerar código ([2ef577f](https://github.com/GustavoCesarSantos/encurtador-api/commit/2ef577f3a1052bff4f81cbe96cc8f55d8f1a1cee))
* Adiciona gerente de eventos ao construtor do caso de uso gerador de código ([5ea8ed3](https://github.com/GustavoCesarSantos/encurtador-api/commit/5ea8ed39603c86a11be501810793cac9670d36fe))
* Adiciona gerente de eventos ao construtor dos casos de uso gerador de código nos testes unitario e de integração ([5989ae6](https://github.com/GustavoCesarSantos/encurtador-api/commit/5989ae69086bdd928ab2474b196b05cd5d675f7c))
* Adiciona gerente de eventos ao construtor dos casos de uso retorna e salva url encurtada ([c2ef904](https://github.com/GustavoCesarSantos/encurtador-api/commit/c2ef904f1fb1884e7883b4c0ceaeecc56aeb5289))
* Adiciona gerente de eventos ao construtor dos casos de uso retorna e salva url encurtada nos testes de unidade e integração ([d6bb9d2](https://github.com/GustavoCesarSantos/encurtador-api/commit/d6bb9d26bf1135003b9f68427c2d7439a0124079))
* Adiciona gerente de eventos e log ao caso de uso retorna url encurtada ([32a6317](https://github.com/GustavoCesarSantos/encurtador-api/commit/32a6317a145cf5a15dcf508a3fa0b849855934f0))
* Adiciona gerente de eventos e log ao caso de uso salva url encurtada ([593e37b](https://github.com/GustavoCesarSantos/encurtador-api/commit/593e37b6870f74abdbead37abe6d3d9dcde13077))
* Adiciona gerente de eventos no construtor do caso de uso retornar url encurtada ([4fa0fe2](https://github.com/GustavoCesarSantos/encurtador-api/commit/4fa0fe26af5ac467cfa6cb80b4db397f249341e0))
* Adiciona gerente de eventos no construtor do caso de uso retornar url encurtada no teste de integração ([a450de1](https://github.com/GustavoCesarSantos/encurtador-api/commit/a450de1788e0b86e626958811821b0dafdc5ba66))
* Adiciona gerente de eventos no construtor do caso de uso retornar url encurtada no teste de integração da controller acessar url original ([fed0ac8](https://github.com/GustavoCesarSantos/encurtador-api/commit/fed0ac8fb7b70f3a309882794dfab92832ebd0cd))
* Adiciona implementação da interface listener e método update na classe pino logger ([4253ea9](https://github.com/GustavoCesarSantos/encurtador-api/commit/4253ea9712cf7e4bae9b05d6ca6f1f389ec076fa))
* Adiciona listeners ao evento errors ([9211bc6](https://github.com/GustavoCesarSantos/encurtador-api/commit/9211bc67af202791a2f9ee72b0576d3095e042d1))
* adiciona listeners ao evento warn nos casos de uso ([f1adf7c](https://github.com/GustavoCesarSantos/encurtador-api/commit/f1adf7cad4dbc9559ab88beaf7a4f24fbc3e0fc5))
* Adiciona log ao subir servidor ([d38bb27](https://github.com/GustavoCesarSantos/encurtador-api/commit/d38bb27fdacc0cc00d52153320bfae41f0834939))
* Adiciona logs a classe createShortUrl ([c2fb0c6](https://github.com/GustavoCesarSantos/encurtador-api/commit/c2fb0c6bd3728c977cc26abfd3b32099c5ce04ed))
* Adiciona logs a controller access root url ([d94c4c8](https://github.com/GustavoCesarSantos/encurtador-api/commit/d94c4c8d5b476f976e25b6d008ed4285e9db8262))
* Adiciona manager na construção da classe create short url na fabrica de controllers ([456e99a](https://github.com/GustavoCesarSantos/encurtador-api/commit/456e99a453883ac549fcd18148b9cd5e1093acb1))
* Adiciona método que lida com erros não tratados ([689a504](https://github.com/GustavoCesarSantos/encurtador-api/commit/689a50439d57fa17e91eba36a63aba67ea5aafe9))
* Adiciona os pacotes pino e pino-pretty ([0afc8f4](https://github.com/GustavoCesarSantos/encurtador-api/commit/0afc8f471db709ec0ea82dc2b36814b86f29ccb8))
* Adiciona parametro event manager ao construtor da classe access root url ([ab8dffa](https://github.com/GustavoCesarSantos/encurtador-api/commit/ab8dffa06ea370fdb8997acee79b827ed8a09969))
* Adiciona parametro event manager ao construtor da classe access root url ([c0794ad](https://github.com/GustavoCesarSantos/encurtador-api/commit/c0794add06891d265d9c5db143d7e58fe67c5d40))
* Adiciona parametro event manager ao construtor da classe access root url na fabrica de controllers ([c833d48](https://github.com/GustavoCesarSantos/encurtador-api/commit/c833d48c888fa87cfeba38ecda9822ab56beae1f))
* adiciona tipo warn ao enum de nomes de eventos ([fe0a1a5](https://github.com/GustavoCesarSantos/encurtador-api/commit/fe0a1a5d00fbfdf68dc5ffe4ebf56fceafc4273b))
* Adiciona variavel para declarar o ambiente que o código está sendo utilizado ([ef5bacf](https://github.com/GustavoCesarSantos/encurtador-api/commit/ef5bacf753cd3be65f0e200a0a807ac3488efa7d))
* Atualiza pacotes do projeto ([8f66565](https://github.com/GustavoCesarSantos/encurtador-api/commit/8f66565045cae43dbf4aec0ae84c48ea1bea05de))
* Converte para string o objeto de resposta da requisicação de criar url encurtada ([cd31ceb](https://github.com/GustavoCesarSantos/encurtador-api/commit/cd31cebc6563430a76180f15b356162a09efd24d))
* Cria enum para os nomes de eventos ([b6e29b8](https://github.com/GustavoCesarSantos/encurtador-api/commit/b6e29b8792f23424f0152ccbf2683b76e122a54d))
* Cria event manager ([af7001e](https://github.com/GustavoCesarSantos/encurtador-api/commit/af7001e9c1f5ab2010136ae5abc7acb1169cbae3))
* Cria interface listener ([1f9b795](https://github.com/GustavoCesarSantos/encurtador-api/commit/1f9b7952c831bdaab6b7e3c5d7742e06666841bc))
* Cria interface logger ([7744d39](https://github.com/GustavoCesarSantos/encurtador-api/commit/7744d3935b313172cb84b5897938ed8af718a9b5))
* Cria logger utilizando o pacote pino ([f5b6658](https://github.com/GustavoCesarSantos/encurtador-api/commit/f5b665895652a0dcbc79658ea5f87d70c2b3da20))
* Cria scripts para testes unitarios e de integração ([23509e0](https://github.com/GustavoCesarSantos/encurtador-api/commit/23509e0d7fd1a105e89ead63e7d8b018a8b37daa))
* Cria teste unitario para o pino logger ([13c1eb1](https://github.com/GustavoCesarSantos/encurtador-api/commit/13c1eb18ceae6e850b9cc943fc350f802a3d503c))
* **findShortUrl:** adiciona logs ([af628af](https://github.com/GustavoCesarSantos/encurtador-api/commit/af628afbbc907e034714a794b852dd52b38d0304))
* **incrementHit:** adiciona logs ([c582602](https://github.com/GustavoCesarSantos/encurtador-api/commit/c582602917182a6c87e3a60466404439f16b32a5))
* **pinoLogger:** Adiciona método de log do tipo warn ([1384540](https://github.com/GustavoCesarSantos/encurtador-api/commit/13845408f348de2f20197cf3001fe3c1695a925b))
* **updateShortUrl:** adiciona logs ([c331e32](https://github.com/GustavoCesarSantos/encurtador-api/commit/c331e3242dc508d833c337fff243373d89e88b91))


### Bug Fixes

* Adiciona permissao de acesso ao disco aos hooks do husky ([67b59eb](https://github.com/GustavoCesarSantos/encurtador-api/commit/67b59ebcc8ea8f3c5644b520af82ad266fe6f941))
* Corrige ci yml ([33d7186](https://github.com/GustavoCesarSantos/encurtador-api/commit/33d71865fa06deb068ae944389d4340125ce6bf3))
* Corrige ci yml ([e3db201](https://github.com/GustavoCesarSantos/encurtador-api/commit/e3db20112b788fbf37e359c10388f4fd2b434d78))
* Corrige nome da pasta loggers ([fc57f9e](https://github.com/GustavoCesarSantos/encurtador-api/commit/fc57f9e29aa369ec04ed69455580e2bfa046cce6))
* Corrige testes unitario e de integração da classe create short url ([739a9f2](https://github.com/GustavoCesarSantos/encurtador-api/commit/739a9f2e1c89f34957357559629267642dc6ddd6))

## [1.11.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.10.0...v1.11.0) (2022-04-10)


### Features

* Adiciona implementação da interface listener e método update na classe pino logger ([4253ea9](https://github.com/GustavoCesarSantos/encurtador-api/commit/4253ea9712cf7e4bae9b05d6ca6f1f389ec076fa))
* Adiciona log ao subir servidor ([d38bb27](https://github.com/GustavoCesarSantos/encurtador-api/commit/d38bb27fdacc0cc00d52153320bfae41f0834939))
* Adiciona os pacotes pino e pino-pretty ([0afc8f4](https://github.com/GustavoCesarSantos/encurtador-api/commit/0afc8f471db709ec0ea82dc2b36814b86f29ccb8))
* Adiciona variavel para declarar o ambiente que o código está sendo utilizado ([ef5bacf](https://github.com/GustavoCesarSantos/encurtador-api/commit/ef5bacf753cd3be65f0e200a0a807ac3488efa7d))
* Atualiza pacotes do projeto ([8f66565](https://github.com/GustavoCesarSantos/encurtador-api/commit/8f66565045cae43dbf4aec0ae84c48ea1bea05de))
* Cria enum para os nomes de eventos ([b6e29b8](https://github.com/GustavoCesarSantos/encurtador-api/commit/b6e29b8792f23424f0152ccbf2683b76e122a54d))
* Cria interface listener ([1f9b795](https://github.com/GustavoCesarSantos/encurtador-api/commit/1f9b7952c831bdaab6b7e3c5d7742e06666841bc))
* Cria interface logger ([7744d39](https://github.com/GustavoCesarSantos/encurtador-api/commit/7744d3935b313172cb84b5897938ed8af718a9b5))
* Cria logger utilizando o pacote pino ([f5b6658](https://github.com/GustavoCesarSantos/encurtador-api/commit/f5b665895652a0dcbc79658ea5f87d70c2b3da20))
* Cria scripts para testes unitarios e de integração ([23509e0](https://github.com/GustavoCesarSantos/encurtador-api/commit/23509e0d7fd1a105e89ead63e7d8b018a8b37daa))
* Cria teste unitario para o pino logger ([13c1eb1](https://github.com/GustavoCesarSantos/encurtador-api/commit/13c1eb18ceae6e850b9cc943fc350f802a3d503c))


### Bug Fixes

* Corrige ci yml ([33d7186](https://github.com/GustavoCesarSantos/encurtador-api/commit/33d71865fa06deb068ae944389d4340125ce6bf3))
* Corrige ci yml ([e3db201](https://github.com/GustavoCesarSantos/encurtador-api/commit/e3db20112b788fbf37e359c10388f4fd2b434d78))
* Corrige nome da pasta loggers ([fc57f9e](https://github.com/GustavoCesarSantos/encurtador-api/commit/fc57f9e29aa369ec04ed69455580e2bfa046cce6))

## [1.10.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.9.0...v1.10.0) (2022-04-04)


### Features

* Adiciona pacote supertest ([ff53687](https://github.com/GustavoCesarSantos/encurtador-api/commit/ff5368760784921a019b852f4f694c383bddfe44))
* Adiciona tipagem ao pacote supertest ([c8b2717](https://github.com/GustavoCesarSantos/encurtador-api/commit/c8b27179929ad2284c33326e38fdaa7559201d58))
* Cria teste e2e para acesso de url original ([53bb7ff](https://github.com/GustavoCesarSantos/encurtador-api/commit/53bb7ff93cdda494639660252091d0125c56fdfd))
* Cria teste e2e para criação de url encurtada ([6e51fb8](https://github.com/GustavoCesarSantos/encurtador-api/commit/6e51fb8a9984f8a19c99cc25c21794c6cdb5f8af))


### Bug Fixes

* Corrige caso de erro ao tentar retornar schema da url encurtada ([1c6cb71](https://github.com/GustavoCesarSantos/encurtador-api/commit/1c6cb716858db75f63e6d69fcc40b97dedddb798))

## [1.9.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.8.0...v1.9.0) (2022-03-27)


### Features

* Adiciona campos unicos a model ShortUrl ([9d1e805](https://github.com/GustavoCesarSantos/encurtador-api/commit/9d1e805973ca1cbc15a3a6b2ef0bb4f6560880be))
* Adiciona redirecionamento ao adaptador de routas do express ([acff156](https://github.com/GustavoCesarSantos/encurtador-api/commit/acff1560c0a571aee9d54c6d015f7255b2f0282b))
* Atualiza pacote do prisma e prisma client ([d9fd5f8](https://github.com/GustavoCesarSantos/encurtador-api/commit/d9fd5f858f461179989612b470b132ac700a4bc4))
* Cria arquivo de ci ([49153bc](https://github.com/GustavoCesarSantos/encurtador-api/commit/49153bcaa7ff37cd4f2299af96d6b69eb8657082))
* Cria interface dos mappers ([9fd334b](https://github.com/GustavoCesarSantos/encurtador-api/commit/9fd334b7924ba4097cd83f41dfa4b4f8ec9d2121))
* Cria interface para o repositório de url encurtada ([cc234d9](https://github.com/GustavoCesarSantos/encurtador-api/commit/cc234d9a615fe40e7d2b69e7aeca56338354329d))
* Cria mapper da url encurtada ([eeb98f7](https://github.com/GustavoCesarSantos/encurtador-api/commit/eeb98f7d68948d8e7cc18b77c443b769c190fa8f))
* Cria migration para trocar tipo do campo uuid ([cf2bba9](https://github.com/GustavoCesarSantos/encurtador-api/commit/cf2bba9e2d39633e91be07b25d8ea0381a89e7b2))
* Cria migration que adiciona campos unicos a model ShortUrl ([b39bdb4](https://github.com/GustavoCesarSantos/encurtador-api/commit/b39bdb4a114f349159032d7a2d85b39a4c315c39))
* Implementa todos os métodos no repostiório com prisma ([61876bc](https://github.com/GustavoCesarSantos/encurtador-api/commit/61876bce007c98f3319de79f0a74428fef3dc948))


### Bug Fixes

* Corrige atribuição do parametro uuid para o caso de uso atualizar url encurtada ([d36fe2e](https://github.com/GustavoCesarSantos/encurtador-api/commit/d36fe2e23adc84590f25ec4b9e73d4ac2393435a))
* Corrige nome do repositório com prisma orm na fabrica de casos de uso ([e2e7ae5](https://github.com/GustavoCesarSantos/encurtador-api/commit/e2e7ae54c076c95503fa2f6e6504987fcceffdae))
* Corrige testes de acordo com a nova interface do repositório da url encurtada ([956c9da](https://github.com/GustavoCesarSantos/encurtador-api/commit/956c9da6eaac3f72b60b6c4c44bcd80d8e9224fb))
* Corrige uso da interface do repositório de url encurtada e o uso dos métodos de query ([5c6d73d](https://github.com/GustavoCesarSantos/encurtador-api/commit/5c6d73da7d791d3150d41fe70d95b06c2e484a35))

## [1.8.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.7.0...v1.8.0) (2022-03-26)


### Features

* Add some props to tsconfig ([b49652e](https://github.com/GustavoCesarSantos/encurtador-api/commit/b49652e1b1bba361fce4383e7a5903ec9e11bc0a))
* Add tsconfig path ([6925e1b](https://github.com/GustavoCesarSantos/encurtador-api/commit/6925e1bff0c37e33907f9486eb00ff7400422360))
* Create express server file ([1d3156b](https://github.com/GustavoCesarSantos/encurtador-api/commit/1d3156b9eb96d19cbd74b86adce3013873379fdd))
* Create index for routes ([8f8b92c](https://github.com/GustavoCesarSantos/encurtador-api/commit/8f8b92c74dac0be907266f1db39217ce0fb3b252))
* Cria entrypoint do projeto ([33b9b61](https://github.com/GustavoCesarSantos/encurtador-api/commit/33b9b61860b7094b9c9e0d42e655484c3f15389a))
* Cria interface para casos de uso ([bd7247d](https://github.com/GustavoCesarSantos/encurtador-api/commit/bd7247d52290639d8743f508727aa842f146a6bc))


### Bug Fixes

* Fix prettier script ([4f476fb](https://github.com/GustavoCesarSantos/encurtador-api/commit/4f476fbcba8e7e95db98232bc340165d56fcc1a4))

## [1.7.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.6.0...v1.7.0) (2022-03-21)


### Features

* Cria arquivo de rotas da entidade url encurtada ([fa469fa](https://github.com/GustavoCesarSantos/encurtador-api/commit/fa469fa500d5cc4ba150950f85c7fb1cb5a16937))
* Cria fabrica de casos de uso ([44d3842](https://github.com/GustavoCesarSantos/encurtador-api/commit/44d3842da0310f90b12336700e10ad2b72cd1e10))
* Cria fabrica de constrollers ([c02d9c7](https://github.com/GustavoCesarSantos/encurtador-api/commit/c02d9c772eadc78210032a9fe25f7a8355198c96))
* Cria interface da fabrica de casos de uso ([cb841fd](https://github.com/GustavoCesarSantos/encurtador-api/commit/cb841fd84f368e639e1d14ae99536bbf99d2fbee))

## [1.6.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.5.0...v1.6.0) (2022-03-20)


### Features

* Adiciona pacote express ([a86067e](https://github.com/GustavoCesarSantos/encurtador-api/commit/a86067e8d2145d82ad3f8cb7febd311f279643f7))
* Adiciona pasta shared aos paths do tsconfig e jestconfig ([030dcb2](https://github.com/GustavoCesarSantos/encurtador-api/commit/030dcb2ae059602a724cdf4b5a5c0c52e52d2fc5))
* Cria adaptador de routes do express ([c0a0537](https://github.com/GustavoCesarSantos/encurtador-api/commit/c0a05378281a19b250bf7065c1da9d14a79359c5))
* Cria helper para resposta http ([434f4a8](https://github.com/GustavoCesarSantos/encurtador-api/commit/434f4a8e71c6926ddfcfa81d576f458cd9211a49))
* Cria interface para as controllers ([1a38ffe](https://github.com/GustavoCesarSantos/encurtador-api/commit/1a38ffe08b6c358bd7bd06848bbca27fe542f0a1))
* Cria tipagem para respostas das controllers ([75db5a1](https://github.com/GustavoCesarSantos/encurtador-api/commit/75db5a17dc561645e8266d9672a43871b15f5742))

## [1.5.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.4.0...v1.5.0) (2022-03-20)


### Features

* Cria teste de integração da controller acessar url raiz ([f784a89](https://github.com/GustavoCesarSantos/encurtador-api/commit/f784a89af02b29f4d32e0ecce61e146ef2c554b5))

## [1.4.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.3.0...v1.4.0) (2022-03-20)


### Features

* Cria teste de integração da controller criar url encurtada ([2706318](https://github.com/GustavoCesarSantos/encurtador-api/commit/27063186c78752aaaa6f32579a922d971bb6b001))

## [1.3.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.2.0...v1.3.0) (2022-03-20)


### Features

* Adiciona casos de uso a controller acessar url raiz ([2b54e08](https://github.com/GustavoCesarSantos/encurtador-api/commit/2b54e081d62b33db25edf726390aa6842d408715))
* Adiciona novos casos de teste ao teste unitario da controller acessar url raiz ([f083bfe](https://github.com/GustavoCesarSantos/encurtador-api/commit/f083bfe9e51ca2a1a8cf78e281ad6f7d9d394fec))
* Adiciona novos métodos a entidade url encurtada ([f397200](https://github.com/GustavoCesarSantos/encurtador-api/commit/f397200b1d941b3022cf65c77c0b4e767f3326d4))
* Cria controller acessar url raiz ([759600f](https://github.com/GustavoCesarSantos/encurtador-api/commit/759600fb12e2740f2501f88b2a085e04a95740a5))
* Cria helper para erros do tipo não encontrado ([dc5880b](https://github.com/GustavoCesarSantos/encurtador-api/commit/dc5880b4faf6c304db6be34f200b3f314dcf40c5))
* Cria teste unitario da controller acessar url raiz ([3cd5700](https://github.com/GustavoCesarSantos/encurtador-api/commit/3cd5700b3311ed772b04ed52c31e983f070e41dc))

## [1.2.0](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.1.1...v1.2.0) (2022-03-20)


### Features

* Cria caso de teste de sucesso ([309a4d4](https://github.com/GustavoCesarSantos/encurtador-api/commit/309a4d4a5c446d01f95834245c841b551d13e4f8))
* Cria controller salvar url encurtada ([ea4dd27](https://github.com/GustavoCesarSantos/encurtador-api/commit/ea4dd27842734d2e24f6181d48971ba09a72e663))
* Cria teste unitario do controller salvar url encurtada ([1ce0537](https://github.com/GustavoCesarSantos/encurtador-api/commit/1ce053746c096669595b9b8e78c8a07041c45273))

### [1.1.1](https://github.com/GustavoCesarSantos/encurtador-api/compare/v1.1.0...v1.1.1) (2022-03-20)

## 1.1.0 (2022-03-20)

### Features

-   Adiciona a pasta coverage ao gitignore ([0f78ea7](https://github.com/GustavoCesarSantos/encurtador-api/commit/0f78ea783c250ecd23e8010cdc526efa8940f098))
-   Adiciona caso de uso incrementar acesso a url encurtada ([5c42f33](https://github.com/GustavoCesarSantos/encurtador-api/commit/5c42f3345de043a4e8c496a68c91e0dfa2588cd5))
-   Adiciona construtor a entidade short url ([fd6f8c9](https://github.com/GustavoCesarSantos/encurtador-api/commit/fd6f8c98c775be5de76af66ac1cb6b8aa835b660))
-   Adiciona migrations e cria migration inicial ([d967832](https://github.com/GustavoCesarSantos/encurtador-api/commit/d9678323428a09b856c88a39bff2451ed330561e))
-   Adiciona modulo ts-jest e dotenv ([f0d2773](https://github.com/GustavoCesarSantos/encurtador-api/commit/f0d277337e79ed7d340b273cc0345fc56d02dd88))
-   Adiciona nova propriedade ao schema de owner ([f820037](https://github.com/GustavoCesarSantos/encurtador-api/commit/f820037afaa5941dcdaded98816cfc33cc340cf4))
-   Adiciona novo passo ao lint staged ([d7bcea3](https://github.com/GustavoCesarSantos/encurtador-api/commit/d7bcea3fc288ae2678d97a5267be46823b358727))
-   Adiciona prisma ([c0bb36c](https://github.com/GustavoCesarSantos/encurtador-api/commit/c0bb36cd22f692c4798d554fc5fd83e3e045607f))
-   Adiciona teste unitario ao caso de uso incrementar acesso a url encurtada ([1f69753](https://github.com/GustavoCesarSantos/encurtador-api/commit/1f697532facd8fc8084ec11b6f2e35a3b6418e4f))
-   Configura jest ([ccb1a0a](https://github.com/GustavoCesarSantos/encurtador-api/commit/ccb1a0a12055fb3086eedce26dc8364603b4848e))
-   Cria caso de uso atualizar schema da url encurtada ([35ea970](https://github.com/GustavoCesarSantos/encurtador-api/commit/35ea970532267cf96dbbb23664ce2227a8f7a0a6))
-   Cria caso de uso de deletar url encurtada ([195aafe](https://github.com/GustavoCesarSantos/encurtador-api/commit/195aafe7a07a3892ffe716c10e8d1ae5681cdbaf))
-   Cria caso de uso de salvar url encurtada ([0f1a562](https://github.com/GustavoCesarSantos/encurtador-api/commit/0f1a562297708bc2fb9c724f174c4d02235bb261))
-   Cria caso de uso gerador de código ([c0bf91c](https://github.com/GustavoCesarSantos/encurtador-api/commit/c0bf91cb55b5bac7753a932ce6fc1c35784951b5))
-   Cria caso de uso retorna url encurtada ([098167b](https://github.com/GustavoCesarSantos/encurtador-api/commit/098167b7e4d4477e7aab92b3845ba70ffcc6b80f))
-   Cria caso de uso retornar varios ([f7037b7](https://github.com/GustavoCesarSantos/encurtador-api/commit/f7037b7992b3aa4069dcfeb74fc636b96c5d0db4))
-   Cria docker compose ([c7e77dc](https://github.com/GustavoCesarSantos/encurtador-api/commit/c7e77dce7fbe173c365779cf59804d5018f82efb))
-   Cria helper para erro do tipo parametros faltando ([dd2164c](https://github.com/GustavoCesarSantos/encurtador-api/commit/dd2164c9c692bf8d43b9e4fee8edd1e878c2c619))
-   Cria helper para o cliente do prisma ([53fc34a](https://github.com/GustavoCesarSantos/encurtador-api/commit/53fc34a0633cf628ac52b4e9de8f53d7b450378f))
-   Cria hook de pre push ([d61783e](https://github.com/GustavoCesarSantos/encurtador-api/commit/d61783e274b9bd975c4528cff69e7b4c7b20a576))
-   Cria migration que adiciona a coluna createdAt a tabela Owners ([872cb5c](https://github.com/GustavoCesarSantos/encurtador-api/commit/872cb5cc59181e8cc75f2d15494c14be88c79b12))
-   Cria pasta de testes ([ff886af](https://github.com/GustavoCesarSantos/encurtador-api/commit/ff886afb56a10e57e635997c95f48f84424e4a5c))
-   Cria repositorio base ([4f552fe](https://github.com/GustavoCesarSantos/encurtador-api/commit/4f552fe82e75e000d459397c27e20b567167c470))
-   Cria teste de integracao do caso de uso encontrar url encurtada ([4f7b781](https://github.com/GustavoCesarSantos/encurtador-api/commit/4f7b7819a84c677f2d36dc0130a90857d4a13cc0))
-   Cria teste de integração do caso de uso salvar url encurtada ([e22b87e](https://github.com/GustavoCesarSantos/encurtador-api/commit/e22b87e12aa464c8fea92c6d29ae48b6a935eff7))
-   Cria teste unitario do caso de uso de deletar url encurtada ([c642138](https://github.com/GustavoCesarSantos/encurtador-api/commit/c6421382510f822d756baba9d20739edb69eb119))
-   Cria teste unitario para o caso de uso atualizar schema da url encurtada ([c5dee5c](https://github.com/GustavoCesarSantos/encurtador-api/commit/c5dee5ce248957013bbe08692d5b5466d918b1c4))
-   Cria teste unitário para o caso de uso de retornar varios ([a9fc4ba](https://github.com/GustavoCesarSantos/encurtador-api/commit/a9fc4ba1a6841d4be40ab105339725fbf88bfae4))
-   Cria teste unitario para o caso de uso de salvar url encurtada ([fbd65c1](https://github.com/GustavoCesarSantos/encurtador-api/commit/fbd65c17046aba4b09ae9eb85a7add7e73bd18dd))
-   Cria teste unitario para o caso de uso gerador de código ([92e63ce](https://github.com/GustavoCesarSantos/encurtador-api/commit/92e63cef02ae26140d9ebcf040d11f6094e4b618))
-   Cria teste unitario para o caso de uso retorna url encurtada ([f05037a](https://github.com/GustavoCesarSantos/encurtador-api/commit/f05037a31ea160fbdf6b5b5106d0bea0c5683551))
-   Cria teste unitario para o util guard ([ddd9206](https://github.com/GustavoCesarSantos/encurtador-api/commit/ddd9206248d943a20d940e903b6b7db1c8a11252))
-   Cria util para validar campos vazios ou indefinidos ([09c0dde](https://github.com/GustavoCesarSantos/encurtador-api/commit/09c0dde5a3cb79e7979ac38c74eec67d17f5aea8))
-   Inicia prisma no projeto ([f8909b0](https://github.com/GustavoCesarSantos/encurtador-api/commit/f8909b097a38f85ea8c789af423d8835b9ac9f0b))
-   **shortened-url:** Cria classe ([7b03d0d](https://github.com/GustavoCesarSantos/encurtador-api/commit/7b03d0df7a5d3d06d4d4366281d8666d99dd3d78))
-   **shortened-url:** Cria teste unitario ([b2c5fa7](https://github.com/GustavoCesarSantos/encurtador-api/commit/b2c5fa7b455cb4fc94ab1467c99d1b4981e9a77f))
-   **shortUrl:** Adiciona novo teste unitario ([473a61c](https://github.com/GustavoCesarSantos/encurtador-api/commit/473a61cde290eeee083ce320325c2db7e84508be))
-   **shortUrl:** Adiciona teste unitário ([09db262](https://github.com/GustavoCesarSantos/encurtador-api/commit/09db2628ec3d349530fbecb609d0bb7ef8f95cca))
-   **shortUrl:** Cria caso de uso encontrar um ([f1877ce](https://github.com/GustavoCesarSantos/encurtador-api/commit/f1877ce053c914be5eb8f561ecd69f6219cde7c7))
-   **shortUrl:** Cria repositorio em memória ([0d9531e](https://github.com/GustavoCesarSantos/encurtador-api/commit/0d9531eeea643e35df46708519851b142afe7a55))
-   **shortUrl:** Cria repositorio prisma ([a735693](https://github.com/GustavoCesarSantos/encurtador-api/commit/a73569395e63eee4379de9f4fecce2d0d36ec235))
-   **shortUrl:** Cria teste unitario do caso de uso encontrar um ([ffaf809](https://github.com/GustavoCesarSantos/encurtador-api/commit/ffaf809f1ce0209bc806dc1068ca7629b490430d))

### Bug Fixes

-   Aplica camelCase no nome do teste e da entidade short url ([fd46a48](https://github.com/GustavoCesarSantos/encurtador-api/commit/fd46a48ee66836ab8a5ed13cd1c53eaa016dd5a0))
-   Corrige criação da entidade short url ([da29e7b](https://github.com/GustavoCesarSantos/encurtador-api/commit/da29e7b8f0e5feeaf24e44616889ff9785d20ab1))
-   Corrige nome da classe duble de teste utilizada no teste unitario do caso de uso atualiza schema da url encurtada ([3140c41](https://github.com/GustavoCesarSantos/encurtador-api/commit/3140c41619412387cf066c0a8ae33c29af41a5ca))
-   Corrige nome da classe stub usada no teste unitario do caso de uso retornar muitos ([c9c21eb](https://github.com/GustavoCesarSantos/encurtador-api/commit/c9c21eb069e27bc7715dea1fd2169ba0cb880dff))
-   Corrige nome do arquivo ([1bb9349](https://github.com/GustavoCesarSantos/encurtador-api/commit/1bb9349158826d48c0916a827083b2c99a53fc39))
-   Corrige nome do arquivo ([a1b868c](https://github.com/GustavoCesarSantos/encurtador-api/commit/a1b868c5ea15d4a100f44c65bb17c18b7956ffdf))
-   Corrige tsconfig ([4edf46a](https://github.com/GustavoCesarSantos/encurtador-api/commit/4edf46a82cdd092e92f9437108a2a70c4766cdba))
-   Remove dead code ([e7bc129](https://github.com/GustavoCesarSantos/encurtador-api/commit/e7bc129e15810a977458c72182bcacdfdefb3753))
