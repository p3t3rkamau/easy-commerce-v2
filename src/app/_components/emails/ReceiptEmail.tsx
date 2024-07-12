import * as React from 'react'
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  render,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { format } from 'date-fns'

const ReceiptEmail = ({
  email,
  date,
  orderId,
  productsCart,
  total,
  refId,
  deliveryType,
  deliveryCost,
  location,
  deliveryNote,
  phoneNumber,
  orderNotes,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Order Confirmation from EasyBake Supplies</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Order Confirmation</Text>
          </Section>
          <Section style={LogoRow}>
            <Row>
              <Column style={ColumnStyle}>
                <Img
                  src="https://ik.imagekit.io/6cga8hi9z/All_Products/Easy_bake_supplies_Logo_The_Easy_Way_1_tYFeQxy3I3.png"
                  width="54"
                  height="64"
                  alt="Product Image"
                  style={LogoIcon}
                />
              </Column>
            </Row>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>EMAIL</Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}
                >
                  {email}
                </Link>
              </Column>

              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>INVOICE DATE</Text>
                <Text style={informationTableValue}>{format(date, 'dd MMM yyyy')}</Text>
              </Column>

              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>ORDER ID</Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}
                >
                  {orderId}
                </Link>
              </Column>
            </Row>
          </Section>

          <Section style={productTitleTable}>
            <Text style={productsTitle}>Order Summary</Text>
          </Section>
          {productsCart.map(productCart => {
            return (
              <Section key={productCart.id}>
                <Column style={{ width: '64px' }}>
                  <Img
                    src={productCart.product.imageUrl}
                    width="54"
                    height="64"
                    alt="Product Image"
                    style={productIcon}
                  />
                </Column>
                <Column style={{ paddingLeft: '22px' }}>
                  <Text style={productTitle}>{productCart.product.title}</Text>
                  <Text style={productDescription}>{productCart.product.description}</Text>
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>Ksh{productCart.product.price}</Text>
                </Column>
              </Section>
            )
          })}

          <Section>
            <Column style={{ width: '64px' }}></Column>
            <Column style={{ paddingLeft: '40px', paddingTop: 20 }}>
              <Text style={productTitle}>Delivery Cost</Text>
            </Column>

            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>Ksh{deliveryCost}</Text>
            </Column>
          </Section>

          <Section>
            <Column style={{ width: '64px' }}></Column>
            <Column style={{ paddingLeft: '40px', paddingTop: 20 }}>
              <Text style={productTitle}>Total</Text>
            </Column>

            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>Ksh{total}</Text>
            </Column>
          </Section>

          <Hr style={productPriceLine} />
          <Section align="right">
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>Ksh{total}</Text>
            </Column>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>Mpesa Payment ID</Text>
                <Text style={informationTableValue}>{refId}</Text>
              </Column>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>Delivery Type</Text>
                <Text style={informationTableValue}>{deliveryType}</Text>
              </Column>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>Delivery Location</Text>
                <Text style={informationTableValue}>{location}</Text>
              </Column>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>Phone Number</Text>
                <Text style={informationTableValue}>{phoneNumber}</Text>
              </Column>
            </Row>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>Delivery Note</Text>
                <Text style={informationTableValue}>{deliveryNote}</Text>
              </Column>
            </Row>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>Order Note</Text>
                <Text style={informationTableValue}>{orderNotes}</Text>
              </Column>
            </Row>
          </Section>

          <Text style={footerLinksWrapper}>
            <Link href="#">Account Settings</Link> • <Link href="#">Terms of Sale</Link> •{' '}
            <Link href="#">Privacy Policy</Link>
          </Text>
          <Text style={footerCopyright}>
            Copyright © 2023 EasyBake Supplies Limited. <br />{' '}
            <Link href="#">All rights reserved</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ReceiptEmail

export const ReceiptEmailHtml = props =>
  render(<ReceiptEmail {...props} />, {
    pretty: true,
  })

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
}

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
}

const tableCell = { display: 'table-cell' }

const heading = {
  fontSize: '28px',
  fontWeight: '300',
  color: '#888888',
}

const informationTable = {
  borderCollapse: 'collapse',
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
  marginTop: '12px',
}

const informationTableRow = {
  height: '46px',
}

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
}

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
}

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
}

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}
const LogoRow = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Ensure it takes the full height of the parent
}

const LogoIcon = {
  display: 'block',
  margin: '0 auto', // Center the image horizontally within the Column
  objectFit: 'cover',
}

const ColumnStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
}

const productTitle = {
  fontSize: '12px',
  fontWeight: '600',
  ...resetText,
}

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
}

const productLink = {
  fontSize: '12px',
  color: 'rgb(0,112,201)',
  textDecoration: 'none',
}

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right',
}

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
}

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  textAlign: 'right',
}

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
}

const productPriceLine = { margin: '30px 0 0 0' }

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
}

const productPriceLargeWrapper = {
  display: 'table-cell',
  width: '90px',
}

const productPriceLineBottom = { margin: '0 0 75px 0' }

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center',
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center',
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}
