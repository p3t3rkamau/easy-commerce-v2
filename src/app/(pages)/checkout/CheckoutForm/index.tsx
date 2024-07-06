import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { useCart } from '../../../_providers/Cart';

import classes from './index.module.scss';

interface CheckoutFormProps {
  deliveryType: string;
  location: string;
  subtotal: number;
  deliveryNote?: string; // Add deliveryNote as optional prop
  customLocation?: string; // Add customLocation as optional prop
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  deliveryType,
  location,
  subtotal,
  deliveryNote = '', // Default value if not provided
  customLocation = '', // Default value if not provided
}) => {
  const router = useRouter();
  const { cart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [refId, setRefId] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!phoneNumber || !refId || !agreedToTerms) {
        alert('Please fill in all required fields and agree to the terms and conditions.');
        return;
      }
      setIsSubmitting(true);
      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: subtotal,
            items: (cart?.items || []).map(({ product, quantity, selectedAttributes }) => ({
              product: typeof product === 'object' ? product.id : product,
              quantity,
              price: typeof product === 'object' ? product.price : undefined,
              selectedAttributes: typeof product === 'object' ? selectedAttributes : undefined,
            })),
            phoneNumber,
            refId,
            orderNotes,
            deliveryType,
            location,
            deliveryNote, // Include deliveryNote in the request body
            customLocation, // Include customLocation in the request body
          }),
        });

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.');

        const { error: errorFromRes, doc }: { message?: string; error?: string; doc: Order } =
          await orderReq.json();

        if (errorFromRes) throw new Error(errorFromRes);

        router.push(`/order-confirmation?order_id=${doc.id}`);
      } catch (err) {
        console.error('Error occurred while creating order:', err);
        router.push(`/app?error=${encodeURIComponent(err.message)}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [cart, subtotal, phoneNumber, refId, orderNotes, agreedToTerms, deliveryType, location, deliveryNote, customLocation, router]
  );

  return (
    <div className={classes.checkoutContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.inputGroup}>
          <label htmlFor="mpesa">Type Your M-Pesa No.</label>
          <input
            id="mpesa"
            type="text"
            placeholder="07XXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="refId">Type Ref ID</label>
          <input
            id="refId"
            type="text"
            placeholder="JKR2K6DND"
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
            required
          />
        </div>
        <div className={classes.additionalInfo}>
          <h3>ADDITIONAL INFORMATION</h3>
          <div className={classes.textareaGroup}>
            <label htmlFor="orderNotes">Order notes (optional)</label>
            <textarea
              id="orderNotes"
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />
          </div>
        </div>
        <p className={classes.privacyNote}>
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="/privacy-policy">privacy policy</a>.
        </p>
        <div className={classes.termsGroup}>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            I have read and agree to the website <a href="/terms">terms and conditions</a>
          </label>
        </div>
        <Button 
          label={isSubmitting ? "Processing..." : "Place order"}
          type="submit"
          className={classes.submitButton}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
