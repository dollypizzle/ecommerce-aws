import express, { Request, Response, Router } from 'express';
import Product from '../models/product';
import auth, { IntRequest } from '../middleware/auth';

const productRouter: Router = express.Router();
//add new product
productRouter.post(
  '/products',
  auth,
  async (req: IntRequest, res: Response) => {
    const product = new Product({
      ...req.body,
      owner: req.user && req.user._id,
    });

    try {
      await product.save();
      res.status(201).send(product);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

productRouter.get('/products', (req: IntRequest, res: Response) => {
  //Get all the products from db
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(products);
    }
  });
});

//get product by id
productRouter.get('/product/:id', (req: IntRequest, res: Response) => {
  const _id = req.params.id;

  Product.findById(_id)
    .then(product => {
      if (!product) {
        return res.status(404).send();
      }

      res.send(product);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

//update product
productRouter.patch(
  '/product/:id',
  auth,
  async (req: IntRequest, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'brand', 'price', 'image', 'description'];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const product = await Product.findByIdAndUpdate(
        { _id: req.params.id, owner: req.user && req.user._id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!product) {
        return res.status(404).send();
      }

      res.send(product);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

//delete product
productRouter.delete(
  '/product/:id',
  auth,
  async (req: IntRequest, res: Response) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        owner: req.user && req.user._id,
      });

      if (!product) {
        res.status(404).send();
      }

      res.send(product);
    } catch (e) {
      res.status(500).send();
    }
  }
);

export { productRouter };
