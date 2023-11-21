const sinon = require('sinon');
const chai = require('chai');
const {
  productsFromModel,
  productFromDB,
  productFromModel,
} = require('../mocks/products.mock');
const { productsFromDB } = require('../mocks/products.mock');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCT MODELS', function () {
  it('Recuperando todos os products do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.deep.equal(productsFromModel);
  });
  it('Recuperando o produto com id do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const insertData = 42;

    const product = await productsModel.findById(insertData);
    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});