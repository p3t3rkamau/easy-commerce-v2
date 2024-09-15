import payload from 'payload'

export const resetPassword = async (token, password) => {
  try {
    const result = await payload.resetPassword({
      collection: 'users',
      token,
      password,
    })
    return result
  } catch (error: unknown) {
    console.error('Error resetting password:', error)
    throw error
  }
}
