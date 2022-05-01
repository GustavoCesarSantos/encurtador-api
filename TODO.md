### Encurtar url

- [x] Gera uma url encurtada
- [x] Salva url original na base
- [x] Retorna url encurtada

### Acessar url encurtada GET no dominio/code,

- [x] Pega url original
- [x] Adiciona visita a url encurtada "hit"
- [x] Atualizar documento com o novo número de "hits" depois de incrementado
- [x] Redireciona para a url original

### "Dono" da url original acessa as infos da url encurtada GET dominio/code/stats

- [x] Retornar url infos

## Para fazer

## Fase 1

- [x] Criar um README
- [x] Criar módulo "short url"
- [x] Criar CRUD da short url
- [x] Criar testes de integração casos de uso - repositorios (save, findOne)
- [x] Criar controllers (save, findOne)
- [x] Criar testes de integração controllers - casos de uso
- [x] Criar adaptador e-press
- [x] Criar rotas
- [x] Criar servidor
- [x] Adicionar logs
- [] Adicionar gracefull shutdown
- [] Criar validador da integridade da url raiz

## Fase 2

- [] Criar fila para salvar url encurtada
- [] Criar fila para atualizar hit da url encurtada
- [] Gerar QR Code para a short url

## Fase 3

- [] Criar módulo "short url owner"
