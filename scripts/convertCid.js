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

		if (code_cid.startsWith('A') || code_cid.startsWith('B')) {
			cid_category = 'Algumas doenças infeccionsas e parasitárias';
		} else if (code_cid.startsWith('C')) {
			cid_category = 'Neoplasmas (tumores)';
		} else if (code_cid.startsWith('D')) {
			const cid = code_cid.split('', 3);

			if (Number(cid[1] + cid[2]) <= 48) {
				cid_category = 'Neoplasmas (tumores)';
			} else if (Number(cid[1] + cid[2]) >= 50) {
				cid_category = 'Doenças do sangue e dos órgãos hematopoéticos e alguns transtornos imunitários';
			}
		} else if (code_cid.startsWith('E')) {
			cid_category = 'Doenças endócrinas, nutricionais e metabólicas';
		} else if (code_cid.startsWith('F')) {
			cid_category = 'Transtornos mentais e comportamentais';
		} else if (code_cid.startsWith('G')) {
			cid_category = 'Doenças do sistema nervoso';
		} else if (code_cid.startsWith('H')) {
			// H59 >= 
			const cid = code_cid.split('', 3);

			if (Number(cid[1] + cid[2]) <= 59) {
				cid_category = 'Doenças do olho e anexos';
			} else if (Number(cid[1] + cid[2]) >= 60) {
				cid_category = 'Doenças do ouvido e da apófise mastóide';
			}
		} else if (code_cid.startsWith('I')) {
			cid_category = 'Doenças do aparelho circulatório';
		} else if (code_cid.startsWith('J')) {
			cid_category = 'Doenças do aparelho respiratório';
		} else if (code_cid.startsWith('K')) {
			cid_category = 'Doenças do aparelho digestivo';
		} else if (code_cid.startsWith('L')) {
			cid_category = 'Doenças da pele e do tecido subcutâneo';
		} else if (code_cid.startsWith('M')) {
			cid_category = 'Doenças do sistema osteomuscular e do tecido conjuntivo';
		} else if (code_cid.startsWith('N')) {
			cid_category = 'Doenças do aparelho geniturinário';
		} else if (code_cid.startsWith('O')) {
			cid_category = 'Gravidez, parto e puerpério';
		} else if (code_cid.startsWith('P')) {
			cid_category = 'Algumas afecções originadas no período perinatal';
		} else if (code_cid.startsWith('Q')) {
			cid_category = 'Malformações congênitas, deformidades e anomalias cromossômicas';
		} else if (code_cid.startsWith('R')) {
			cid_category = 'Sintomas, sinais e achados anormais de exames clínicos e de laboratório, não classificados em outra parte';
		} else if (code_cid.startsWith('S') || code_cid.startsWith('T')) {
			cid_category = 'Lesões, envenenamentos e algumas outras conseqüências de causas externas';
		} else if (code_cid.startsWith('V') || code_cid.startsWith('W') || code_cid.startsWith('X') || code_cid.startsWith('Y')) {
			cid_category = 'Causas externas de morbidade e de mortalidade';
		} else if (code_cid.startsWith('Z')) {
			cid_category = 'Fatores que exercem influência sobre o estado de saúde e o contato com serviços de saúde';
		} else if (code_cid.startsWith('U')) {
			cid_category = 'Códigos para propósitos especiais';
		}

		console.log(cid_category)
		data.push({
			code_cid,
			desc_cid: cid['DESCR,C,50'],
			cid_category,
		});
	}

	if (data.length) {
		fs.writeFileSync(path.join(BASE_DIR, `/convertedData/cid10.json`), JSON.stringify(data));
	}
});