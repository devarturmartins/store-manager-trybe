const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
// const { productsModel } = require('../../models');

const productsMock = require('../models/products.model.mock');

describe('Testes do controller de produtos', function () {
  it('Deve retornar o status 200 e todos os produtos', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findProducts')
      .resolves(productsMock);
    
    await productsController.findProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);

  });

  it('Deve responder com 200 e os dados de um produto', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'findById')
      .resolves({ message : { id: 1, name: 'Martelo de Thor' }});
    
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Thor' });
  
  });

  it('Deve responder com 404 quando o produto não for encontrado', async function () {
    const res = {};
    const req = { params: { id: 50 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'findById')
      .resolves({ error: 'Product not found' });
    
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith('Product not found');

  });

  it('Deve responder com status 200 quando o produto for atualizado', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: { name: 'Martelo de Thor' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves({ message: { id: 1, name: 'Martelo de Thor' } });
    
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Thor' });

  });

  it('Deve responder com status 404 quando o produto não for encontrado', async function () {
    const res = {};
    const req = { params: { id: 99 }, body: { name: 'Martelo de Thor' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves({ type: 'notFound', message: 'Product not found' });
    
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  });

  // it('Deve responder com status 204 quando o produto for deletado', async function () {
  //   const res = {};
  //   const req = { params: { id: 1 } };

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon
  //     .stub(productsService, 'deleteProduct')
  //     .resolves({ message: 'Product deleted' });
    
  //   await productsController.deleteProduct(req, res);

  //   expect(res.status).to.have.been.calledWith(204);
  //   expect(res.json).to.have.been.calledWith({ message: 'Product deleted' });

  // });

  afterEach(() => {
    sinon.restore();
  });
});