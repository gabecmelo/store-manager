const sinon = require('sinon');
const chai = require('chai');
const {
  productsFromModel,
  productFromDB,
  productFromModel,
  productIdFromDB,
  affectedRowsFromDB,
} = require('../mocks/products.mock');
const { productsFromDB } = require('../mocks/products.mock');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCTS MODELS', function () {
  it('Recuperando todos os products do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.deep.equal(productsFromModel);
  });
  it('Recuperando o product com id do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const insertData = 42;

    const product = await productsModel.findById(insertData);
    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productFromModel);
  });
  it('Não recupera o product que o id não for encontrado no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const insertData = 404;
    const product = await productsModel.findById(insertData);
    expect(product).to.be.equal(undefined);
  });
  it('Inserindo product no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const insertData = { name: 'New product' };
    const insertId = await productsModel.insertProduct(insertData);
    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(productIdFromDB);
  });
  it('Modifica o product corretamente no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const insertData = { name: 'Modified product' };
    const affectedRows = await productsModel.changeProduct(insertData);
    expect(affectedRows).to.be.a('number');
    expect(affectedRows).to.equal(affectedRowsFromDB);
  });

  // Adicionar verificação de ERROS ao inserir product

  afterEach(function () {
    sinon.restore();
  });
});
