'use client'
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Settings } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { LoadingShimmer } from '../../../_components/LoadingShimmer';
import { useAuth } from '../../../_providers/Auth';
import { useCart } from '../../../_providers/Cart';
import { CheckoutItem } from '../CheckoutItem';
import { CheckoutForm } from '../CheckoutForm';


import classes from './index.module.scss';


const decrypt = (encryptedValue: string): number => {
  const key = 42; // Example decryption key (must match encryption key)
  return encryptedValue.charCodeAt(0) ^ key;
};

export const CheckoutPage: React.FC<{
  settings: Settings;
}> = (props) => {
  const {
    settings: { productsPage },
  } = props;

  const { user } = useAuth();
  const router = useRouter();
  const { cart, cartIsEmpty, cartTotal } = useCart();

  const [deliveryType, setDeliveryType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [deliveryNote, setDeliveryNote] = useState<string>('');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    // Extract parameters from URL
    const params = new URLSearchParams(window.location.search);
    const deliveryTypeParam = params.get('deliveryType') || '';
    const locationParam = params.get('location') || '';

    // Decrypt shipping cost from URL parameter
    const encryptedShippingCost = params.get('shippingCost') || '0';
    const decryptedCost = decrypt(encryptedShippingCost);
    const shippingCostParam = parseFloat(decryptedCost.toString());

    // Optional: Fetch delivery note and custom location from URL parameters
    const deliveryNoteParam = params.get('deliveryNote') || '';
    const customLocationParam = params.get('customLocation') || '';

    // Update state with extracted values
    setDeliveryType(deliveryTypeParam);
    setLocation(locationParam);
    setShippingCost(shippingCostParam);
    setDeliveryNote(decodeURIComponent(deliveryNoteParam));
    setCustomLocation(decodeURIComponent(customLocationParam));
  }, []);

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart');
    }
  }, [router, user, cartIsEmpty]);

  if (!user) return null;

  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          <div className={classes.header}>
            <p>Products</p>
            <div className={classes.headerItemDetails}>
              <p></p>
              <p className={classes.quantity}>Quantity</p>
            </div>
            <p className={classes.subtotal}>Subtotal</p>
          </div>

          <ul>
            {cart?.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { title, meta },
                  selectedAttributes,
                } = item;

                if (!quantity) return null;

                const metaImage = meta?.image;

                return (
                  <Fragment key={index}>
                    <CheckoutItem
                      product={product}
                      title={title}
                      metaImage={metaImage}
                      quantity={quantity}
                      index={index}
                      selectedAttributes={selectedAttributes}
                    />
                  </Fragment>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}

      <div className={classes.summary}>
        <div className={classes.row}>
          <h6 className={classes.cartTotal}>Summary</h6>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Delivery Method</p>
          <p className={classes.cartTotal}>{deliveryType}</p>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Delivery Location</p>
          <p className={classes.cartTotal}>{location}</p>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Subtotal</p>
          <p className={classes.cartTotal}>{cartTotal.formatted}</p>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Delivery Charge</p>
          <p className={classes.cartTotal}>Ksh{shippingCost}</p>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Delivery Note</p>
          <p className={classes.cartTotal}>{deliveryNote}</p>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Custom Location</p>
          <p className={classes.cartTotal}>{customLocation}</p>
        </div>

        <div className={classes.row}>
          <p className={classes.cartTotal}>Grand Total</p>
          <p className={classes.cartTotal}>
            Ksh{parseInt(cartTotal.raw.toString()) + parseInt(shippingCost.toFixed(2))}
          </p>
        </div>
      </div>

      <CheckoutForm
        deliveryType={deliveryType}
        location={location}
        subtotal={cartTotal.raw}
        deliveryNote={deliveryNote}
        customLocation={customLocation}
      />

      {error && (
        <div className={classes.error}>
          <p>{`Error: ${error}`}</p>
          <Button label="Back to cart" href="/cart" appearance="secondary" />
        </div>
      )}
    </Fragment>
  );
};
