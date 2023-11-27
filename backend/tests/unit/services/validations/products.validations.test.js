const sinon = require('sinon');
const chai = require('chai');
const {
  insertProductSchema,
} = require('../../../../src/services/validations/schemas');
const schema = require('../../../../src/services/validations/validateProduct');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes = PRODUCTS VALIDATIONS:', function () {
  it('Valor válido passa na verificação', async function () {
    sinon
      .stub(insertProductSchema, 'validate')
      .resolves();

    const insertProductData = { name: 'Valid name' };

    const error = await schema.validateProduct(insertProductData);
    expect(error.status).to.equal('VALID');
});


  afterEach(function () {
    sinon.restore();
  });
});
