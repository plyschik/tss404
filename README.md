# TSS:404

Projekt realizowany w ramach zajęć z przedmiotu Technologie Server-Side.

## Instrukcja instalacji

1. Skolnuj repozytorium:
```bash
$ git clone https://github.com/plyschik/tss404.git
```

2. Przejdz do utworzonego katalogu:
```bash
$ cd tss404
```

3. Uruchom serwisy:
```bash
$ docker-compose up -d
```

4. Następnie przejdź do terminala `sh` w kontenerze:
```bash
$ docker-compose exec nodejs sh
```

5. Utwórz plik konfiguracyjny `.env` (ewentualnie dostosuj ustawienia):
```bash
$ mv .env.example .env
$ nano .env
```

6. Aby zainicjować bazę danych należy użyć następującego polecenia:
```bash
$ npm run db:init
```

7. Aby wygenerować dokumentację apiDoc należy użyć następującego polecenia:
```bash
$ npm run apidoc
```

8. Aby uruchomić narzędzie ESLint należy użyć następującego polecenia:
```bash
$ npm run eslint
```

9. Aby uruchomić testy należy użyć następującego polecenia:
```bash
$ npm run test
```

10. W celu zamknięcia serwisów należy użyć polecenia:
```bash
$ docker-compose down
```
Jeśli serwisy zostały uruchomione bez przełącznika `-d` (w tle) to w celu zakmnięcia serwisów należ użyć kombinacji klawiszy: `CTRL + C` (jednokrotnie, dwukrotnie usuwa kontenery).

## Usługi

* [NodeJS](https://hub.docker.com/_/node) (wersja: 10.15.3, port: 8080): [http://127.0.0.1:8080](http://127.0.0.1:8080)
* [MySQL](https://hub.docker.com/_/mysql) (wersja: 8.0.15, port: 3306): [http://127.0.0.1:3306](http://127.0.0.1:3306)
* [Adminer](https://hub.docker.com/_/adminer) (wersja: 4.7.1, port: 8081): [http://127.0.0.1:8081](http://127.0.0.1:8081)

Dokumentacja apiDoc po wygenerowaniu (`npm run apidoc`) będzie dostępna pod adresem: [http://127.0.0.1:8080/docs](http://127.0.0.1:8080/docs)