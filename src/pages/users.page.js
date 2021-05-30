import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../config";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

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

import { Trans } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";

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

const OutlinedCard = ({ user, users, setUsers }) => {
  const [appliedStatus, setAppliedStatus] = useState();
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const [account_email, setAccountEmail] = useState(user.account_email || "");
  const [backup_email, setBackupEmail] = useState(user.backup_email || "");
  const [full_name, setFullName] = useState(user.full_name || "");
  const [location, setLocation] = useState(user.location || "");
  const [username, setUsername] = useState(user.username || "");

  const [selectedRole, setSelectedRole] = useState(null);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const showLabel = async () => {
    setTimeout(() => {
      setAppliedStatus(undefined);
    }, 2000);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2500);
  };

  const updateUserData = async (id) => {
    localStorage.setItem("user", id);
    try {
      const { data } = await axios.get(`${endpoint}/api/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setRoles(data);
      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  const applyUserInfoUpdating = async () => {
    const user = localStorage.getItem("user");

    try {
      await axios.put(
        `${endpoint}/api/users/${user}`,
        {
          account_email,
          backup_email,
          full_name,
          location,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (selectedRole) {
        await axios.post(
          `${endpoint}/api/users/${user}/role`,
          {
            role_id: selectedRole,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
      }

      setAppliedStatus(200);
      await showLabel();
    } catch (e) {
      console.log(e);
      setAppliedStatus(500);
      await showLabel();
    }

    setShowModal(false);
  };

  const currentUser = localStorage.getItem("currentUser");
  const selectedUser = localStorage.getItem("user");

  return (
    <Card className={classes.root} variant="outlined">
      {roles && (
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Trans i18nKey={"changeEmail"}>Updating user's info</Trans>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Trans i18nKey={"updateHint"}>
                For updating user's info prompt all required data
              </Trans>
            </DialogContentText>

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update username"
              variant="outlined"
              defaultValue={user.username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update full name"
              variant="outlined"
              defaultValue={user.full_name}
              onChange={(event) => setFullName(event.target.value)}
            />

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update account email"
              variant="outlined"
              defaultValue={user.account_email}
              onChange={(event) => setAccountEmail(event.target.value)}
            />

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update backup email"
              variant="outlined"
              defaultValue={user.backup_email}
              onChange={(event) => setBackupEmail(event.target.value)}
            />

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Update location"
              variant="outlined"
              defaultValue={user.location}
              onChange={(event) => setLocation(event.target.value)}
            />

            {roles.length && currentUser !== selectedUser && (
              <>
                <InputLabel id="demo-controlled-open-select-label">
                  Select role
                </InputLabel>

                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  defaultValue={roles[0].role_id}
                  onChange={(event) => setSelectedRole(event.target.value)}
                >
                  {roles &&
                    roles.map((role) => (
                      <MenuItem value={role.role_id}>{role.role_name}</MenuItem>
                    ))}
                </Select>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="primary">
              <Trans i18nKey={"cancel"}>Cancel</Trans>
            </Button>
            <Button onClick={applyUserInfoUpdating} color="primary">
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
          <Trans i18nKey={"type"}>Username: </Trans> {user.username}
        </Typography>
        <Typography variant="h5" component="h6">
          <Trans i18nKey={"name"}>Full name: </Trans> {user.full_name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h6"
          className={classes.pos}
          color="textSecondary"
        >
          <Trans i18nKey={"diagnostics"}>email: </Trans> {user.account_email}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.pos}
          color="textSecondary"
        >
          <Trans i18nKey={"diagnostics"}>backup emails: </Trans>{" "}
          {user.backup_email}
        </Typography>

        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.pos}
          color="textSecondary"
        >
          <Trans i18nKey={"diagnostics"}>Location: </Trans> {user.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateUserData(user.user_id)}
        >
          <Trans i18nKey={"addBrigade"}>More details </Trans>
        </Button>
      </CardActions>

      {appliedStatus && (
        <Alert severity={appliedStatus === 200 ? "success" : "error"}>
          {appliedStatus === 200 ? "Done" : "Error"}
        </Alert>
      )}
    </Card>
  );
};

const UsersPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${endpoint}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    const parseDataWithInterval = async () => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => reject(err));
      });
    };

    const interval = setInterval(() => {
      parseDataWithInterval()
        .then((emergencies) => setUsers(emergencies))
        .catch((err) => console.log(err));

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
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
          <Trans i18nKey={"hTitle"}>Users page</Trans>
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
        {users &&
          users.map((user, index) => {
            return (
              <Grid key={index} item xs={12} md={6} lg={6}>
                <OutlinedCard user={user} users={users} setUsers={setUsers} />
              </Grid>
            );
          })}
        {(!users || !users.length) && (
          <Grid item xs={12} md={12} lg={12}>
            <h2>
              <Trans i18nKey={"noEmergencies"}>No users</Trans>
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

export default UsersPage;
