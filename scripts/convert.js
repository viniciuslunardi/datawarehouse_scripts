require('dotenv').config();

const fs = require('fs');
const path = require('path');

const BASE_DIR = process.env.BASE_DIR;
const _YEAR = process.env.YEAR || '2020';
const FILE_DIR = process.env.FILE_DIR;
const FILE_NAME = process.env.FILE_NAME;

const cid10 = require(path.join(BASE_DIR, `/convertedData/cid10.json`));
const cities = require(path.join(BASE_DIR, `/convertedData/cities.json`));

const csvFilePath = path.join(BASE_DIR, FILE_DIR);
const csv = require('csvtojson');
const json2xls = require('json2xls');

csv()
  .fromFile(csvFilePath)
  .then((deaths) => {
    const data = [];
    for (const death of deaths) {
      //normalizing date
      const dataInfo = death['DTOBITO'];
      let day;
      let year = _YEAR;
      let month;

      if (dataInfo.split(year)[0].split('').length === 4) {
        day = dataInfo.split(year)[0].split('')[0] + dataInfo.split(year)[0].split('')[1];
        month = dataInfo.split(year)[0].split('')[2] + dataInfo.split(year)[0].split('')[3];
      } else {
        day = dataInfo.split(year)[0].split('')[0];
        month = dataInfo.split(year)[0].split('')[1] + dataInfo.split(year)[0].split('')[2];
      }

      //normalizing age
      let age = '00'; // nao comeca com 4, nem com 5 (100+anos), morreu antes de ter 1 ano
      const ageInfo = death['IDADE'];

      if (ageInfo.split('')[0] === '4') {
        age = ageInfo.split('')[1] + ageInfo.split('')[2];
      } else if (ageInfo.split('')[0] === '5') {
        age = '1' + ageInfo.split('')[1] + ageInfo.split('')[2];
      }

      //normalizing sex
      const sexInfo = death['SEXO'];
      let sex = 'Ignorado'
      if (sexInfo === '1') {
        sex = 'M'
      } else if (sexInfo === '2') {
        sex = 'F'
      }

      //normalizing city
      const cityInfo = death['CODMUNOCOR'];
      const cityNormalized = cities.filter(el => el.mun_code === cityInfo);

      let uf_name = 'N/A';
      let uf_code = 'N/A';
      let city_name = 'N/A';
      let city_code = 'N/A';

      if (cityNormalized && cityNormalized.length) {
        uf_name = cityNormalized[0].uf_name
        uf_code = cityNormalized[0].uf_code
        city_name = cityNormalized[0].mun_name
        city_code = cityNormalized[0].mun_code
      }

      //normalizing causabas
      const causeInfo = death['CAUSABAS'];
      const causeNormalized = cid10.filter(el => el && el.code_cid === causeInfo);

      let death_cause_code = 'N/A';
      let death_cause_desc = 'N/A';

      if (causeNormalized && causeNormalized.length) {
        death_cause_code = causeNormalized[0].code_cid
        death_cause_desc = causeNormalized[0].desc_cid
      }

      //normalizing circumstance
      const circumstanceInfo = death['CIRCOBITO'];
      let circumstance = 'N/A';

      if (circumstanceInfo === '9') {
        circumstance = 'Ignorado'
      } else if (circumstanceInfo === '1') {
        circumstance = 'Acidente'
      } else if (circumstanceInfo === '2') {
        circumstance = 'Suicídio'
      } else if (circumstanceInfo === '3') {
        circumstance = 'Homicídio'
      }
      else if (circumstanceInfo === '4') {
        circumstance = 'Outros'
      }

      const workInfo = death['ACIDTRAB'];
      let workAccident = 'N/A';

      if (workInfo === '9') {
        workAccident = 'Ignorado'
      } else if (workInfo === '1') {
        workAccident = 'Sim'
      } else if (workInfo === '2') {
        workAccident = 'Não'
      }

      data.push({
        day,
        month,
        year,
        age,
        sex,
        uf_name,
        uf_code,
        city_name,
        city_code,
        death_cause_code,
        death_cause_desc,
        circumstance,
        workAccident
      });

    }


    if (data.length) {
      fs.writeFileSync(path.join(BASE_DIR, `/convertedData/${FILE_NAME}.xlsx`), json2xls(data), 'binary');
    }
  })
