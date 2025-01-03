import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Customer } from "../types"

interface AddressFormProps {
  onChange: (addressData: Customer) => void
  isSubmitting: boolean
  onBack: () => void
}

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
})

const AddressForm: React.FC<AddressFormProps> = ({
  onChange,
  isSubmitting,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  })

  const onSubmit = (data: Customer) => {
    onChange(data)
  }

  return (
    <div className="bg-white rounded-md px-4 py-6 h-max">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {(
          ["name", "mobile", "address", "email", "pincode"] as Array<
            keyof Customer
          >
        ).map((field) => (
          <div key={field} className="relative z-0 mt-4">
            <input
              id={field}
              type={field === "email" ? "email" : "text"}
              {...register(field)}
              placeholder=" "
              autoComplete="off"
              aria-invalid={errors[field] ? "true" : "false"}
              aria-describedby={`${field}-error`}
              className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none ${
                errors[field] ? "border-red-500" : ""
              }`}
            />
            <label
              htmlFor={field}
              className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors[field] ? "text-red-500" : ""
              }`}
              style={{ zIndex: 1 }}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {errors[field] && (
              <p id={`${field}-error`} className="text-red-500 text-sm">
                {errors[field]?.message}
              </p>
            )}
          </div>
        ))}
        <div className="flex space-x-2">
          <button
            type="button"
            className="text-sm px-2 py-2 w-1/3 font-semibold tracking-wide bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={onBack}
            aria-label="Go back to the previous step"
          >
            Back
          </button>
          <button
            type="submit"
            className="text-sm px-4 py-2.5 w-2/3 font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-label="Proceed to payment"
          >
            {isSubmitting ? "Loading..." : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddressForm
