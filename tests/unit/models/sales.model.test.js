const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

describe('Testa o model de vendas', function () {
  it('Cadastrando uma venda', async function () {
    const insertId = 1;
    // aranjo
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    // ação
    const result = await salesModel.salesProduct();
    // assert
    expect(result).to.be.equal(insertId);
  });

  it('Cria uma venda', async function () {
    const insertId = 1;
    // aranjo
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    // ação
    const result = await salesModel.createSale();
    // assert
    expect(result).to.be.equal(insertId);
  });

  it('Recuperando uma venda por id', async function () {
    const product = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    sinon.stub(connection, 'execute').resolves([[product]]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(product);
  });

  it('Recuperando todas as vendas', async function () {
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ];
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await salesModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  afterEach(() => {
    sinon.restore();
  });
});