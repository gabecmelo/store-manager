const sinon = require('sinon');
const chai = require('chai');
const {
  salesFromModel,
  saleFromDB,
  saleFromModel,
} = require('../mocks/sales.mock');
const { salesFromDB } = require('../mocks/sales.mock');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - SALES MODELS', function () {
  it('Recuperando todos as sales do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.findAll();
    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal(salesFromModel);
  });
  it('Recuperando a sale com id do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const insertData = 1;

    const sale = await salesModel.findById(insertData);
    expect(sale).to.be.an('array');
    expect(sale).to.deep.equal(saleFromModel);
  });

  // IMPLEMENTAR TESTE DE NÃO ENCONTRADA

  afterEach(function () {
    sinon.restore();
  });
});
