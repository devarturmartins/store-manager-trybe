const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const productsMock = require('./products.model.mock');

describe('Testes do model de produtos', function () {
  it('Recuperando lista de produtos', async function () {
    //aranjo
    sinon.stub(connection, 'execute').resolves([productsMock]);
    //ação
    const result = await productsModel.findAll();

    expect(result).to.be.deep.equal(productsMock);
  });

  it('Recuperando produto por id', async function () {
    //aranjo
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
    //ação
    const result = await productsModel.findById(1);
    //assert
    expect(result).to.be.deep.equal(productsMock[0]);
  });

  it('Atualizando produto por id', async function () {
    //aranjo
    sinon.stub(connection, 'execute').resolves(productsMock);
    //ação
    const result = await productsModel.updateProduct(1, 'Produto 1');
    console.log(result);
    //assert
    expect(result).to.be.deep.equal({ id: 1, name: 'Produto 1' });
  });

  afterEach(() => {
    sinon.restore();
  });
});