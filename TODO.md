### Encurtar url

[-] Gera uma url encurtada
[-] Salva url original na base
[-] Retorna url encurtada

### Acessar url encurtada GET no dominio/code,

[-] Pega url original
[-] Adiciona visita a url encurtada "hit"
[-] Atualizar documento com o novo número de "hits" depois de incrementado
[-] Redireciona para a url original

### "Dono" da url original acessa as infos da url encurtada GET dominio/code/stats

[-] Retornar url infos

## Para fazer

## Fase 1

[-] Criar um README
[-] Criar módulo "short url"
[-] Criar CRUD da short url
[-] Criar testes de integração casos de uso - repositorios (save, findOne)
[-] Criar controllers (save, findOne)
[-] Criar testes de integração controllers - casos de uso
[-] Criar adaptador e-press
[-] Criar rotas
[-] Criar servidor
[-] Adicionar logs
[] Adicionar gracefull shutdown
[] Criar validador da integridade da url raiz

## Fase 2

[] Criar fila para salvar url encurtada
[] Criar fila para atualizar hit da url encurtada
[] Gerar QR Code para a short url

## Fase 3

[] Criar módulo "short url owner"
