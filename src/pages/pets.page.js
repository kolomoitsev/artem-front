import React, { useEffect, useState } from "react";
import { endpoint } from "../config";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Trans } from "react-i18next";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: "15px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

const OutlinedCard = ({ pet, pets, setPets }) => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <Trans i18nKey={"type"}>Breed: </Trans> {pet.breed}
        </Typography>
        <Typography variant="h5" component="h6">
          <Trans i18nKey={"name"}>Pet's name: </Trans> {pet.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h6"
          className={classes.pos}
          color="textSecondary"
        >
          <Trans i18nKey={"diagnostics"}>Family name: </Trans> {pet.family_name}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.pos}
          color="textSecondary"
        >
          <Trans i18nKey={"diagnostics"}>Owner details: </Trans>{" "}
          {pet.owner.full_name}
        </Typography>

        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.pos}
          color="textSecondary"
        >
          <Trans i18nKey={"diagnostics"}>Pet type: </Trans>{" "}
          {pet.pet_type.type_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/pet/${pet.pet_id}`)}
        >
          <Trans i18nKey={"addBrigade"}>More details </Trans>
        </Button>
      </CardActions>
    </Card>
  );
};

const PetsPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${endpoint}/api/pets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setPets(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <h1>
          <Trans i18nKey={"hTitle"}>Pets page</Trans>
        </h1>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        xs={8}
      >
        {pets &&
          pets.map((pet, index) => {
            return (
              <Grid key={index} item xs={12} md={6} lg={6}>
                <OutlinedCard pet={pet} pets={pets} setPets={setPets} />
              </Grid>
            );
          })}
        {(!pets || !pets.length) && (
          <Grid item xs={12} md={12} lg={12}>
            <h2>
              <Trans i18nKey={"noEmergencies"}>No pets</Trans>
            </h2>
          </Grid>
        )}
      </Grid>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default PetsPage;
