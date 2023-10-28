import {
  IProductImage,
  IProduct,
  ProductModel,
} from "../../../mongodb/models/product";

import shortUUID from "short-uuid";
import moment from "moment";

interface AggregateResult {
  rows: IProduct[];
  totalRecord: {
    _id: null;
    count: number;
  }[];
}

export const addProductService = async (req: {
  body: Record<any, any>;
  files: Express.Multer.File[];
}): Promise<{ sku: string } | null> => {
  const saveParams = {
    sku: shortUUID.generate(),
    productName: req.body?.productName,
    price: req.body?.price,
    images: [] as IProductImage[],
    created_by: req.body?.userId,
    created_name: req.body?.userName,
  };

  if (req.files.length) {
    saveParams.images = req.files.map((file, index) => {
      index++;
      return {
        name: `image${index}_${moment().valueOf()}`,
        originalName: file.originalname,
        buffer: file.buffer,
        contentType: file.mimetype,
      };
    });
  }

  const response = await ProductModel.create(saveParams);
  return response
    ? {
        sku: response?.sku,
      }
    : null;
};

export const listProductService = async (req: {
  body: Record<any, any>;
}): Promise<AggregateResult[] | null> => {
  let option =
    req.body.searchTerm && req.body.searchTerm !== ""
      ? {
          $or: [
            {
              $or: [
                {
                  productName: { $regex: new RegExp(req.body.searchTerm, "i") },
                },
              ],
            },
          ],
          $and: [{}],
        }
      : {};

  let listOptions = {
    sku: 1,
    productName: 1,
    price: 1,
    created_name: 1,
  };

  try {
    const result: AggregateResult[] = await ProductModel.aggregate([
      {
        $sort: {
          _id: -1,
          is_active: -1,
        },
      },
      {
        $match: option,
      },
      {
        $project: listOptions,
      },
      {
        $facet: {
          rows: [
            {
              $skip: req.body.offset,
            },
            {
              $limit: req.body.limit,
            },
          ],
          totalRecord: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
          ],
        },
      },
    ]);

    return result || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findProductService = async (req: { sku: string }) => {
  try {
    const response = await ProductModel.findOne({ sku: req.sku });
    return response || null;
  } catch (error) {
    throw error;
  }
};

export const deleteProductService = async (req: { sku: string }) => {
  try {
    const response = await ProductModel.findOneAndDelete({ sku: req.sku });
    return response || null;
  } catch (error) {
    throw error;
  }
};

export const updateProductService = async (req: {
  sku: string;
  body: Record<any, any>;
  files: Express.Multer.File[];
}) => {
  try {
    const updateParams = {
      productName: req.body?.productName,
      price: req.body?.price,
      images: [] as IProductImage[],
      updated_by: req.body?.userId,
      updated_name: req.body?.userName,
    };

    if (req.files.length) {
      updateParams.images = req.files.map((file, index) => {
        index++;
        return {
          name: `image${index}_${moment().valueOf()}`,
          originalName: file.originalname,
          buffer: file.buffer,
          contentType: file.mimetype,
        };
      });
    }

    const response = await ProductModel.findOneAndUpdate(
      { sku: req.sku },
      updateParams
    );
    return response
      ? {
          sku: response?.sku,
        }
      : null;
  } catch (error) {
    throw error;
  }
};
