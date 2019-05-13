const fs = require('fs'),
	path = require('path'),
	readline = require('readline');

let interFace = readline.createInterface({
	input: fs.createReadStream('./data/customer - data.xls')
});
let customer,
	customerInfo = [],
	line_no = 0;

interFace.on('line', line => {
	line_no++;
	if (line_no === 1) {
		customer = line.split(',').reduce((cur, next, index) => {
			cur[next] = index;
			return cur;
		}, {});
	} else {
		generate(line.split(','))
	}
});

function generate(info) {
	let arr = [];
	let fieldNames = Object.keys(customer);

	customerInfo.push(fieldNames.reduce((cur, fieldName) => {
		cur[fieldName] = info[customer[fieldName]];
		arr.push(cur.id)
		return cur;
	}, {}));
	kwala(JSON.stringify(customerInfo))
}

function kwala(data) {
	fs.writeFile(path.join(__dirname, 'data', 'customer_info.json'), data, err => {
		if (err) throw err;
	});
}
