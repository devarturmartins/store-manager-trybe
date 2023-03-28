const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

// describe('Testes do service de vendas', () => {
//   it('Cria uma venda', async function () {
//     const sale = [
//       {
//         productId: 1,
//         quantity: 1
//       },
//       {
//         productId: 2,
//         quantity: 1
//       }
//     ]
//     sinon.stub(salesModel, 'createSale').resolves({ type: null, message: { id: 1, itemsSold: sale } });

//     const result = await salesService.createSale(sale);
//     console.log(result);

//     expect(result.message).to.be.deep.equal(sale);
//   });

  // it('Cria uma venda com produto inexistente', async function () {
  //   const sale = {
  //     "id": 1,
  //     "itemsSold": [
  //       {
  //         "productId": 99,
  //         "quantity": 1
  //       },
  //       {
  //         "productId": 2,
  //         "quantity": 1
  //       }
  //     ]
  //   }

  //   sinon.stub(salesModel, 'createSale').resolves(sale);

  //   const result = await salesService.createSale(sale.itemsSold);

  //   expect(result).to.be.deep.equal({ type: 'notFound', message: 'Product not found' });
  // });
// });