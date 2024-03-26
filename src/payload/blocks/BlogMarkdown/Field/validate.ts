// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validate = (value: string) => {
  if (typeof value !== 'string' || value?.length === 0) {
    return 'This field is required.'
  }

  return true
}
