# TSS:404

W celu uruchomienia aplikacji wykonaj:

1. Skolnuj to repozytorium
```bash
$ git clone https://github.com/plyschik/tss404.git
```

2. Przejdz do utworzonego katalogu i uruchom kontener:
```bash
$ docker-compose up
```

3. Następnie przejdź do terminala `sh` w kontenerze:
```bash
$ docker-compose exec node sh
```

4. Pobierz zależności:
```bash
$ npm install
```

5. Usługi działają na portach:
```
127.0.0.1:8080 - node (REST API),
127.0.0.1:8081 - adminer (prosty panel do zarządzania bazą danych)
127.0.0.1:3306 - serwer MySQL
```
Przetestujcie czy wszyskie usługi działają.

6. Aby uruchomić skrypt deweloperski (przeładowywaie plików za pomocą `nodemon`):
```bash
$ npm run dev
``` 

7. Aby uruchomić LINTera (ESLINT):
```bash
$ npm run eslint
```

8 . Aby uruchomić testy (Mocha + Chai + ChaiHttp):
```bash
$ npm run test
```

9. Aby wygenerować dokumentację (ApiDoc) dostępną pod adresem `http://127.0.0.1:8080/docs`:
```bash
$ npm run apidoc
```