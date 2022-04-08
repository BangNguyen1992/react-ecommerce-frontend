import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import { ALL_PRODUCTS_QUERY } from '../lib/query/allProductsQuery'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'

// GRAPHQL MUTATION
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "DRAFT"
        image: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      status
      description
    }
  }
`

export default function CreateProduct() {
  const { inputs, handleChange, resetForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
  })

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  })

  const fields = [
    {
      component: 'input',
      name: 'name',
      type: 'text',
      required: true,
      placeholder: 'Product name',
      label: 'Name',
    },
    {
      component: 'input',
      name: 'price',
      type: 'number',
      required: true,
      placeholder: 'Product price',
      label: 'Price',
    },
    {
      component: 'textarea',
      name: 'description',
      type: 'text',
      required: false,
      placeholder: 'Product description',
      label: 'Descriptiom',
    },
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await createProduct()
      resetForm()
    } catch {
      console.error('error', error)
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        {fields.map(({ component, name, type, required, placeholder, label }) => (
          <label key={name} htmlFor={name}>
            {label}
            {component === 'input' ? (
              <input
                type={type}
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                // @ts-expect-error File type doesnt need value
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={loading}
              />
            ) : (
              <textarea
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                // @ts-expect-error File type doesnt need value
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={loading}
              />
            )}
          </label>
        ))}

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  )
}
