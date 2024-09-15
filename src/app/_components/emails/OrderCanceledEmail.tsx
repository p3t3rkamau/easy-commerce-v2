import { Button, Container, Heading, Section, Text } from '@react-email/components'

interface OrderCanceledEmailProps {
  userName: string
  orderId: string
}

const OrderCanceledEmail = ({ userName, orderId }: OrderCanceledEmailProps) => (
  <Container>
    <Section>
      <Heading>Your Order Has Been Canceled</Heading>
      <Text>Dear {userName},</Text>
      <Text>Your order with ID {orderId} has been successfully canceled.</Text>
      <Text>
        We offer a money-back guarantee within two weeks. If you have any concerns, please contact
        us.
      </Text>
      <Button href="https://www.example.com/contact">Contact Us</Button>
      <Text>Thank you for shopping with us.</Text>
      <Text>Best regards,</Text>
      <Text>Easy Bake Supplies Limited</Text>
    </Section>
  </Container>
)

export default OrderCanceledEmail
