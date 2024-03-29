import { Container, Grid, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { UI_API } from '../../../Static/API';
import useStyles from './styles';

const CheckoutForm = (props) => {
  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          toast.success("Payment succeeded! You can check your tickets on tickets page.")
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: UI_API + "tickets",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.popupBox}>
      <Container className={classes.container}>
        <Paper className={classes.paper} component="main" maxWidth="xs">
          <Grid className={classes.closeIconContainer}>
            <IconButton onClick={props.handleClosePopup} aria-label="close" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
          <form id="payment-form" className={classes.form} onSubmit={handleSubmit}>
            <PaymentElement id="paymentElement" classes="paymentElement" />
            <button className={classes.button} disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </button>
            {message && <div id="paymentMessage" className={classes.paymentMessage}>{message}</div>}
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default CheckoutForm;