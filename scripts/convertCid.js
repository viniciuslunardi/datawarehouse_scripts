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
		const code_cid = cid['CID10,C,4'];

		let cid_category = '';

		if (code_cid.starstWith('A') || code_cid.starstWith('B')) {
			cid_category = 'Algumas doenças infeccionsas e parasitárias';
		} else if (code_cid.starstWith('C')) {
			cid_category = 'Neoplasmas (tumores)';
		} else if (code_cid.starstWith('D')) {
			//D48 >= 

			//D-50 <=
		} else if (code_cid.starstWith('E')) {
			cid_category = 'Doenças endócrinas, nutricionais e metabólicas';
		} else if (code_cid.starstWith('F')) {
			cid_category = 'Transtornos mentais e comportamentais';
		} else if (code_cid.starstWith('G')) {
			cid_category = 'Doenças do sistema nervoso';
		} else if (code_cid.starstWith('H')) {
			// H59 >= 

			//H60 <=
		} else if (code_cid.starstWith('I')) {
			cid_category = 'Doenças do aparelho circulatório'
		} else if (code_cid.starstWith('J')) {
			cid_category = 'Doenças do aparelho respiratório';
		} else if (code_cid.starstWith('K')) {
			cid_category = 'Doenças do aparelho digestivo';
		} else if (code_cid.starstWith('L')) {
			cid_category = 'Doenças da pele e do tecido subcutâneo'
		} else if (code_cid.starstWith('M')) {
			cid_category = 'Doenças do sistema osteomuscular e do tecido conjuntivo'
		} else if (code_cid.starstWith('N')) {
			cid_category = 'Doenças do aparelho geniturinário'
		} else if (code_cid.starstWith('O')) {
			cid_category = 'Gravidez, parto e puerpério'
		} else if (code_cid.starstWith('P')) {
			cid_category = 'Algumas afecções originadas no período perinatal';
		} else if (code_cid.starstWith('Q')) {
			cid_category = 'Malformações congênitas, deformidades e anomalias cromossômicas'
		} else if (code_cid.starstWith('R')) {
			cid_category = 'Sintomas, sinais e achados anormais de exames clínicos e de laboratório, não classificados em outra parte'
		} else if (code_cid.starstWith('S') || code_cid.starstWith('T')) {
			cid_category = 'Lesões, envenenamentos e algumas outras conseqüências de causas externas'
		} else if (code_cid.starstWith('V') || code_cid.starstWith('W') || code_cid.starstWith('X') || code_cid.starstWith('Y')) {
			cid_category = 'Causas externas de morbidade e de mortalidade'
		} else if (code_cid.starstWith('Z')) {
			cid_category = 'Fatores que exercem influência sobre o estado de saúde e o contato com serviços de saúde'
		} else if (code_cid.starstWith('U')) {
			cid_category = 'Códigos para propósitos especiais'
		}

		data.push({
			code_cid,
			desc_cid: cid['DESCR,C,50'],
			cid_category
		});
	}

	if (data.length) {
		fs.writeFileSync(path.join(BASE_DIR, `/convertedData/cid10.json`), JSON.stringify(data));
	}
});