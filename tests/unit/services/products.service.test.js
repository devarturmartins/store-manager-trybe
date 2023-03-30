const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
// const mock = require('./products.service.mock');
const productsMock = require('../models/products.model.mock');


describe('Testes do service de produtos', () => {
  it('Recuperando lista de produtos', async function () {
    //aranjo
    sinon.stub(productsModel, 'findAll').resolves([productsMock]);
    //ação
    const result = await productsService.findProducts();
    //assert
    // expect(result.type).to.be.deep.equal(null);
    expect(result).to.be.deep.equal([productsMock]);
  });

  it('Recuperando produto por id', async function () {
    //aranjo
    sinon.stub(productsModel, 'findById').resolves(productsMock[0]);
    //ação
    const result = await productsService.findById(1);
    //assert
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(productsMock[0]);
  });

  it('Recuperando produto por id inexistente', async function () {
    //aranjo
    sinon.stub(productsModel, 'findById').resolves(undefined);
    //ação
    const result = await productsService.findById(6);
    //assert
    expect(result.error.message).to.be.deep.equal('Product not found');
  });

  it('Atualizando produto por id', async function () {
    const results = [{ id: 1, name: 'Produto 1' }];
    sinon.stub(productsModel, 'updateProduct').resolves([results]);
    const result = await productsService.updateProduct(1, 'Produto 1');
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal([results]);
  });

  it('Atualizando produto por id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.updateProduct(6, 'Produto 6');
    expect(result.type).to.be.deep.equal('notFound');
    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('Deletando produto por id', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves({ affectedRows: 1 });
    const result = await productsService.deleteProduct(1);
    expect(result.affectedRows).to.be.deep.equal(1);
  });

  afterEach(() => {
    sinon.restore();
  });
});