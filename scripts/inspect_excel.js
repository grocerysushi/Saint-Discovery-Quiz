const XLSX = require('xlsx');

try {
    const workbook = XLSX.readFile('Catholic_Saints_Comprehensive.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Get headers (first row)
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ c: C, r: 0 });
        if (!sheet[address]) continue;
        headers.push(sheet[address].v);
    }

    console.log('Headers:', headers);

    // Get first row of data
    const data = XLSX.utils.sheet_to_json(sheet);
    if (data.length > 0) {
        console.log('First Row Data:', JSON.stringify(data[0], null, 2));
    } else {
        console.log('No data found in sheet.');
    }

} catch (error) {
    console.error('Error reading Excel file:', error);
}
