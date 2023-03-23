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

  afterEach(() => {
    sinon.restore();
  });
});