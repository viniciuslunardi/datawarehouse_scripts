//  FEITO PRA CONVERTER AS CIDADES EM UM JSON, JA CONVERTIDO. NÃO PRECISA MEXER

require('dotenv').config();

const xlsxj = require('xlsx-to-json');

const fs = require('fs');
const path = require('path');

const BASE_DIR = process.env.BASE_DIR;

const ufCods = require(path.join(BASE_DIR, `/jsonData/uf/ufCodes.json`));

xlsxj({
	input: path.join(BASE_DIR, `/inputData/cities/CADMUN.xlsx`),
	output: `/tmp/CADMUN.json`,
}, async (err, cities) => {
	const data = [];

	for (const city of cities) {
		const uf_name = ufCods[city['UFCOD']] || "IGNORADO";
        data.push({
			uf_code: city['UFCOD'],
			mun_code: city['MUNCOD'],
			mun_name: city['MUNNOMEX'],
			uf_name
        })
	}
	
	if (data.length) {
		fs.writeFileSync(path.join(BASE_DIR, `/convertedData/cities.json`), JSON.stringify(data));
	}
});