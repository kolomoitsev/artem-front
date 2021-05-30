import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title.components";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ subscriptions, registrations }) {
  const subs = subscriptions.reduce(
    (subscription, { subscriptions_count }) =>
      subscription + subscriptions_count,
    0
  );

  const regs = registrations.reduce(
    (registration, { registrations_count }) =>
      registration + registrations_count,
    0
  );

  return (
    <React.Fragment>
      <Title>Total subscriptions</Title>
      <Typography component="p" variant="h4">
        {subs}
      </Typography>
      <Title>Total registrations</Title>
      <Typography component="p" variant="h4">
        {regs}
      </Typography>
    </React.Fragment>
  );
}
