//  FEITO PRA CONVERTER O CID EM UM JSON, JA CONVERTIDO. NÃO PRECISA MEXER
require('dotenv').config();

const xlsxj = require('xlsx-to-json');

const fs = require('fs');
const path = require('path');

const BASE_DIR = process.env.BASE_DIR;


xlsxj({
	input: path.join(BASE_DIR, `/inputData/cid10/CAUSA_BAS_NORM.xlsx`),
	output: `/tmp/CAUSA_BAS_NORM.json`,
}, async (err, cids) => {
	const data = [];

	for (const cid of cids) {
        data.push({
			code_cid: cid['CID10,C,4'],
			desc_cid: cid['DESCR,C,50'],
        });
	}
	
	if (data.length) {
		fs.writeFileSync(path.join(BASE_DIR, `/convertedData/cid10.json`), JSON.stringify(data));
	}
});