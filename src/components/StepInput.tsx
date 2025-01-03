import React, { memo } from "react"

interface StepInputProps {
  steps: string[]
  activeStep: number
}

const StepInput: React.FC<StepInputProps> = ({ steps, activeStep }) => {
  return (
    <div className="relative flex flex-row gap-x-2 mb-8" role="progressbar" aria-valuenow={activeStep + 1} aria-valuemin={1} aria-valuemax={steps.length}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
          <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span className={`size-7 flex justify-center items-center shrink-0 font-medium rounded-full group-focus:bg-gray-200 ${activeStep > index ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-800"} ${activeStep === index ? "bg-blue-600 text-white" : ""}`} aria-current={activeStep === index ? "step" : undefined}>
              {activeStep > index ? (
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </span>
            <span className="ms-2 text-sm font-medium text-gray-800">{step}</span>
          </span>
          {index < steps.length - 1 && (
            <div className={`w-full h-px flex-1 ${activeStep > index ? "bg-teal-600" : "bg-gray-200"}`} aria-hidden="true"></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default memo(StepInput)
