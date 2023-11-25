const apiBaseURL = 'http://elc137-t2.inf.ufsm.br/api';

const makeRequest = (httpMethod, url, body, cardNumber) => {
  let xhr = new XMLHttpRequest();

  xhr.open(httpMethod, url, true);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  const responseCardResponseTextArea = $(`#request-card-${cardNumber}-response`);
  responseCardResponseTextArea.val('Carregando...');
  
  xhr.onload = () => {
    const responseCardResponseTextArea = $(`#request-card-${cardNumber}-response`);
    let responseCardResponseTextAreaValue = '';

    if (xhr.readyState !== 4) return;
    
    if (xhr.status >= 200 && xhr.status < 400) {
      responseCardResponseTextAreaValue = JSON.stringify(JSON.parse(xhr.response), false, 2);
    } else {
      responseCardResponseTextAreaValue = `Erro: ${xhr.statusText}`;
    }

    responseCardResponseTextArea.val(responseCardResponseTextAreaValue);
  };

  xhr.onerror = () => {
    $(`#request-card-${cardNumber}-response`).val(`Erro: ${xhr.statusText}`);
  };

  xhr.send(body);
};

const findSaleByInvoiceNumber = () => {
  makeRequest('GET', `${apiBaseURL}/sales/TESTE`, null, 1);
};

const findLast100SalesOf2021 = () => {
  makeRequest('GET', `${apiBaseURL}/sales?sortBy=date:desc&limit=100&page=1`, null, 2);
};

const generateReportFromStartDateToEndDate = () => {
  makeRequest('GET', `${apiBaseURL}/sales/report?startDate=01/12/2021&endDate=08/12/2021`, null, 3);
};

const saveNewSale = () => {
  makeRequest(
    'POST',
    `${apiBaseURL}/sales`,
    JSON.stringify({
      'invoiceNumber': 'TESTE',
      'date': '2021-08-09T00:00:00.000Z',
      'storeNumber': '9999',
      'storeName': 'TESTE',
      'address': 'TESTE',
      'city': 'TESTE',
      'zipCode': '99999',
      'storeLocation': null,
      'countyNumber': '99',
      'county': 'TESTE',
      'category': '9999999',
      'categoryName': 'TESTE',
      'vendorNumber': '999',
      'vendorName': 'TESTE',
      'itemNumber': '99999',
      'itemDescription': 'TESTE',
      'pack': 99,
      'bottleVolumeMl': 999,
      'stateBottleCost': 9.9,
      'stateBottleRetail': 9.99,
      'bottlesSold': 99,
      'saleDollars': 999,
      'volumeSoldLiters': 9,
      'volumeSoldGallons': 9.99
    }),
    4
  );
};

const updateSaleByInvoiceNumber = () => {
  makeRequest(
    'PATCH',
    `${apiBaseURL}/sales/TESTE`,
    JSON.stringify({
      'bottlesSold': 3
    }),
    5
  );
};

const deleteSaleByInvoiceNumber = () => {
  makeRequest('DELETE', `${apiBaseURL}/sales/TESTE`, null, 6);
};

$(document).ready(async () => {
  $('#request-card-1-execute-button').on('click', findSaleByInvoiceNumber);
  $('#request-card-2-execute-button').on('click', findLast100SalesOf2021);
  $('#request-card-3-execute-button').on('click', generateReportFromStartDateToEndDate);
  $('#request-card-4-execute-button').on('click', saveNewSale);
  $('#request-card-5-execute-button').on('click', updateSaleByInvoiceNumber);
  $('#request-card-6-execute-button').on('click', deleteSaleByInvoiceNumber);
});
