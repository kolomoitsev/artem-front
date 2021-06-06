import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title.components";
import { useTranslation } from "react-i18next";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = ({ lastsubs }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Title>{t("index_table_header")}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("index_table_date")}</TableCell>
            <TableCell>{t("index_table_full_name")}</TableCell>
            <TableCell>{t("index_table_location")}</TableCell>
            <TableCell>{t("index_table_email")}</TableCell>
            <TableCell align="right">{t("index_table_username")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastsubs.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(row.subscription_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{row.full_name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.account_email}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t("index_more_subscriptions")}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Orders;
