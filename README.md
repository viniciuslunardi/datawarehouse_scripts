# Scripts DW
Scripts para normalizar os dados advindos do DATASUS sobre os óbtos dos últimos dois anos no Brasil.

# Como usar:
Crie um arquivo ".env" e adicione as variáveis de acordo com o "example.env"
Crie uma pasta "inputData" na raiz do projeto
Colocar na pasta "inputData" o arquivo csv vindo do DATASUS
Alterar a env "BASE_DIR" para o caminho completo do repo no seu PC
Alterar a env "FILE_PATH" para o caminho do arquivo que voce quer converter dentro da pasta "inputData" ex: "/inputData/DOBR2019.csv"
Alterar a env "YEAR" para o ano do arquivo a ser convertido (2020, 2019...)
Alterar a enc "FILE_NAME" para o nome desejado do arquivo XLSX final

-> Precisa ter nodeJS instalado
```bash
$ cd datawarehouse_scripts
$ npm install
$ node scripts/convert.js
```
O XLSX final deve ser criado em "convertedData", com o nome do FILE_NAME passado na sua env.

# Fontes
Codigos do mun: https://www.ibge.gov.br/explica/codigos-dos-municipios.php
Conversor de DBC para CSV: https://github.com/greatjapa/dbc2csv
Informações dos óbtos e documentação https://datasus.saude.gov.br/transferencia-de-arquivos/#

