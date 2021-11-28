import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@material-ui/icons'
import React from 'react'
import './CheckoutSteps.css'

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />,
        },
    ]

    const stepStyle = {
        boxSizing: "border-box",
        width: "100%",
        marginTop: "80px",
    }

    return (
        <div className="checkOutSteps">
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {steps.map((step, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}>
                        <StepLabel icon={step.icon} style={{
                            color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                        }}>
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default CheckoutSteps
