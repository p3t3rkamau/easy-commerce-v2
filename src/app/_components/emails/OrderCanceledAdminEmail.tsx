import { Container, Heading, Section, Text } from '@react-email/components'

interface OrderCanceledAdminEmailProps {
  userName: string
  orderId: string
  orderDate: string
  total: number
}

const OrderCanceledAdminEmail = ({
  userName,
  orderId,
  orderDate,
  total,
}: OrderCanceledAdminEmailProps) => (
  <Container>
    <Section>
      <Heading>Order Canceled Notification</Heading>
      <Text>Dear Admin,</Text>
      <Text>
        The order with ID {orderId} has been canceled by {userName}.
      </Text>
      <Text>Order Details:</Text>
      <Text>Ordered On: {orderDate}</Text>
      <Text>Total: ${total}</Text>
      <Text>Thank you,</Text>
      <Text>Easy Bake Supplies Limited</Text>
    </Section>
  </Container>
)

export default OrderCanceledAdminEmail
