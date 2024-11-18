import type { AfterChangeHook } from 'payload/dist/collections/config/types';
import type { Product } from '../../../payload-types';

export const markProductAsFlashSale: AfterChangeHook<Product> = async ({
  doc,
  req,
  previousDoc,
}) => {
  const { payload } = req;
  const { FlashSalesItems } = doc;

  // Ensure FlashSalesItems is an array
  const isInFlashSale = Array.isArray(FlashSalesItems) && FlashSalesItems?.length > 0;

  if (isInFlashSale && !previousDoc.isFlashSale) {
    await payload.update({
      collection: 'products',
      id: doc.id,
      data: {
        isFlashSale: true,
      },
    });
  } else if (!isInFlashSale && previousDoc.isFlashSale) {
    await payload.update({
      collection: 'products',
      id: doc.id,
      data: {
        isFlashSale: false,
      },
    });
  }

  return;
};
