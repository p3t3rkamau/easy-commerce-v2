'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'
import { useLoader } from '../../../_providers/LoaderContext'
import { useToast } from '../../../_providers/Toast/ToastContext'

import classes from './index.module.scss'

type FormData = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  // Hide the loader when the component is mounted or the route changes
  useEffect(() => {
    hideLoader()

    return () => {
      hideLoader() // Ensure loader hides on component unmount
    }
  }, [router])

  const onSubmit = useCallback(
    async (data: FormData) => {
      showLoader() // Show loader when form submission starts
      setError(null) // Reset any previous errors

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const message = response.statusText || 'There was an error creating the account.'
          setError(message)
          addToast(message, 'error')
          hideLoader() // Hide loader if there's an error
          return
        }

        await login(data)
        addToast('Account created successfully!', 'success')

        const redirect = searchParams.get('redirect')
        if (redirect) router.push(redirect as string)
        else router.push('/')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
        addToast('Error creating account. Please try again.', 'error')
      } finally {
        hideLoader() // Hide the loader after the process completes
      }
    },
    [login, router, searchParams, showLoader, hideLoader, addToast],
  )

  const handleLinkClick = (message: string, href: string) => {
    addToast(message, 'info')
    showLoader() // Show loader when navigating to another link
    router.push(href) // Navigate using router.push
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="name"
        label="Full name"
        required
        register={register}
        error={errors.name}
        type="text"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        validate={value => value === password.current || 'The passwords do not match'}
        error={errors.passwordConfirm}
      />
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Sign up'}
        disabled={loading}
        appearance="secondary"
        className={classes.submit}
      />
      <div>
        {'Already have an account? '}
        <a onClick={() => handleLinkClick('Navigating to login page.', `/login${allParams}`)}>
          Login
        </a>
      </div>
    </form>
  )
}

export default CreateAccountForm
