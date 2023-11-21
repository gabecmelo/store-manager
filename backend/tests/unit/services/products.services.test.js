const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsFromModel } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCT SERVICES', function () {
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const responseData = [
      { id: 1, name: 'name' },
      { id: 2, name: 'name' },
    ];

    const serviceResponse = await productsService.getProducts();
    expect(serviceResponse.status).to.equal('SUCCESSFULL');
    expect(serviceResponse.data).to.deep.equal(responseData);
  });
});
