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
  it('Não recupera a sale que o id não for encontrado no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const insertData = 404;
    const sale = await salesModel.findById(insertData);
    expect(sale).to.be.an('array');
    expect(sale).to.have.length(0);
  });
  it('Insere sale no banco de dados com sucesso', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 42 }])
      .onSecondCall()
      .resolves([{ affectedRows: 1 }]);

    const insertId = await salesModel.createNewSale();
    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(42);

    const insertData = [{ productId: 1, quantity: 2 }];

    const [[{ affectedRows }]] = await salesModel.insertProductsOnSale(
      insertId,
      insertData,
    );

    expect(affectedRows).to.be.a('number');
    expect(affectedRows).to.equal(1);
  });

  // INSERIR VERIFICACAO DE ERROS

  afterEach(function () {
    sinon.restore();
  });
});
