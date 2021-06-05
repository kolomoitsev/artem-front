import React, { useEffect, useState } from "react";
import { endpoint } from "../config";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Trans } from "react-i18next";
import {
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";

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
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [petTypes, setPetTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [petName, setPetName] = useState(pet.name || "");
  const [petType, setPetType] = useState(pet.pet_type.type_id || "");
  const [petBreed, setPetBreed] = useState(pet.breed || "");
  const [petFamily, setPetFamily] = useState(pet.family_name || "");
  const [petMother, setPetMother] = useState(
    pet.father ? pet.father.pet_id : ""
  );
  const [petFather, setPetFather] = useState(
    pet.mother ? pet.mother.pet_id : ""
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose3 = () => {
    setOpen2(false);
  };

  const handleOpen3 = () => {
    setOpen2(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${endpoint}/api/pets/types`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        data && setPetTypes(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleUpdatingInfo = async () => {
    try {
      const postData = {
        name: petName,
        pet_type: petType,
        breed: petBreed,
        family_name: petFamily,
        father_id: petFather,
        mother_id: petMother,
      };

      await axios.put(`${endpoint}/api/pets/${pet.pet_id}`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      {showModal && (
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Trans i18nKey={"changeEmail"}>Updating pets's info</Trans>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Trans i18nKey={"updateHint"}>
                For updating pets's info prompt all required data
              </Trans>
            </DialogContentText>
            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update pet's name"
              variant="outlined"
              defaultValue={pet.name}
              onChange={(event) => setPetName(event.target.value)}
            />

            {petTypes.length && (
              <>
                <InputLabel id="demo-controlled-open-select-label">
                  Update pet's type
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  defaultValue={petTypes[0].type_id}
                  onChange={(event) => setPetType(event.target.value)}
                >
                  {petTypes &&
                    petTypes.map((type) => (
                      <MenuItem value={type.type_id}>{type.type_name}</MenuItem>
                    ))}
                </Select>
              </>
            )}

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update pet's breed"
              variant="outlined"
              defaultValue={pet.breed}
              onChange={(event) => setPetBreed(event.target.value)}
            />

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update pet's family name"
              variant="outlined"
              defaultValue={pet.family_name}
              onChange={(event) => setPetFamily(event.target.value)}
            />

            {pets.length && (
              <>
                <InputLabel id="demo-controlled-open-select-label-2">
                  Update pet's father
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label-2"
                  id="demo-controlled-open-select-2"
                  open={open2}
                  onClose={handleClose2}
                  onOpen={handleOpen2}
                  defaultValue={pets[0].pet_id}
                  onChange={(event) => setPetFather(event.target.value)}
                >
                  {pets &&
                    pets.map((type) => (
                      <MenuItem value={type.pet_id}>{type.name}</MenuItem>
                    ))}
                </Select>
              </>
            )}

            {pets.length && (
              <>
                <InputLabel id="demo-controlled-open-select-label-3">
                  Update pet's mother
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label-3"
                  id="demo-controlled-open-select-3"
                  open={open3}
                  onClose={handleClose3}
                  onOpen={handleOpen3}
                  defaultValue={pets[0].pet_id}
                  onChange={(event) => setPetMother(event.target.value)}
                >
                  {pets &&
                    pets.map((type) => (
                      <MenuItem value={type.pet_id}>{type.name}</MenuItem>
                    ))}
                </Select>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="primary">
              <Trans i18nKey={"cancel"}>Cancel</Trans>
            </Button>
            <Button onClick={handleUpdatingInfo} color="primary">
              <Trans i18nKey={"save"}>Save</Trans>
            </Button>
          </DialogActions>
        </Dialog>
      )}

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

        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowModal(true)}
        >
          <Trans i18nKey={"addBrigade"}>Edit</Trans>
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
