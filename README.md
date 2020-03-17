# aurum-react

![image](https://user-images.githubusercontent.com/4575087/76809698-7ad42680-67ca-11ea-85b2-4fcb9bd2dbaa.png)

## Demo:

Front e Back estão rodando no AppEngine:

[Documentação](https://aurum-spring-boot.appspot.com/swagger-ui.html)

[Front](https://aurum-react-front.appspot.com/)

[GitHub - Front](https://github.com/marcotuliotm/aurum-react)

[GitHub - Back](https://github.com/marcotuliotm/aurum-spring-boot)

[Codebeat](https://codebeat.co/a/marco-tulio-venturelli-nascimento/projects)


## A Demanda

- Fazer uma listagem de Caso

- Permitir o usuário acessar e visualizar todos os dados de um Caso da lista 

- Fazer um cadastro de Caso com as validações na especificação

- Fazer uma API para inserção de Casos em Lote

- Permitir o usuário fazer a edição de um Caso

- Permitir que o usuário faça uma busca na lista.

- Permitir que o usuário possa filtrar os Casos

## Solução - Arquitetura

### Backend

![image](https://user-images.githubusercontent.com/4575087/76811162-529af680-67cf-11ea-9112-d256fe590a02.png)

- Arquitetura DDD comunicando em Rest
- Google Datastore para salvar as entidades
- Para salvar em lote a api é usado o Google Pub/Sub, evitando o sobrecarregar a aplicação e evitando custos
- Possui teste unitários em todo o service
- Java 11 com Spring Boot 2

### Frontend

![image](https://user-images.githubusercontent.com/4575087/76811108-1ff0fe00-67cf-11ea-8803-a8f8dc0075f1.png)

- Possui uma tabela paginada, com filtros, busca e com as ações de criação, atualização e remoção
- Controlando o fluxo de dados com Redux-tunk.
- Components com material-ui

# Melhorias

- CI/CD
- Testes no Frontend
- Logs
