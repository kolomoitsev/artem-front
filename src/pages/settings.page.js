import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import { ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { endpoint } from "../config";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Trans, useTranslation } from "react-i18next";

const saveAs = require("file-saver");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 1, 1),
    width: "100px",
    fontSize: "11px",
  },
  upload: {
    margin: theme.spacing(2, 1, 2),
    width: "150px",
    fontSize: "13px",
  },
}));

const SettingsPage = () => {
  const classes = useStyles();

  const [backups, setBackups] = useState([]);
  const [appliedBackup, setAppliedBackup] = useState(false);
  const [createdBackup, setCreatedBackup] = useState(false);

  const [file, setFile] = useState(null);

  const { t } = useTranslation();

  const showLabel = () => {
    setTimeout(() => {
      setAppliedBackup(false);
      window.location.reload();
    }, 1500);
  };

  const showLabel2 = () => {
    setTimeout(() => {
      setCreatedBackup(false);
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${endpoint}/api/database/dump`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setBackups(data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const applyBackup = async (backup) => {
    try {
      await axios.put(`${endpoint}/api/database/dump/${backup}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setAppliedBackup(true);
      showLabel();
    } catch (e) {
      console.log(e.message);
    }
  };

  const makeBackup = async () => {
    try {
      await axios.get(`${endpoint}/api/database/dump/make`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setCreatedBackup(true);
      showLabel2();
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteBackup = async (backup) => {
    try {
      await axios.delete(`${endpoint}/api/database/dump/${backup}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setAppliedBackup(true);
      showLabel();
    } catch (e) {
      console.log(e.message);
    }
  };

  const downloadBackup = async (backup) => {
    const downloadLink = `${endpoint}/api/database/dump/download/${backup}`;
    fetch(downloadLink, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => saveAs(blob, backup))
      .then((blob) => {
        const _url = window.URL.createObjectURL(blob, {
          type: "octet/stream",
        });
        window.open(_url, "_blank").focus(); // window.open + focus
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const uploadBackup = async (e) => {
    setFile(e.target.files[0]);

    try {
      const data = new FormData();
      data.append("file", e.target.files[0]);

      await axios.post(`${endpoint}/api/database/dump`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAppliedBackup(true);
      showLabel();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <h1>{t("dumps_page_name")}</h1>
        {appliedBackup && (
          <Alert severity="success">{t("dumps_applied_msg")}</Alert>
        )}
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemText primary={t("dumps_available_backups")} />
          </ListItem>
          {backups &&
            backups.map((backup) => (
              <ListItem>
                <ListItemText
                  button
                  onClick={() => downloadBackup(backup.file_name)}
                  primary={backup.file_name}
                />
                <Button
                  onClick={() => applyBackup(backup.file_name)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {t("dumps_execute_button")}
                </Button>

                <Button
                  onClick={() => deleteBackup(backup.file_name)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  {t("dumps_delete_button")}
                </Button>
              </ListItem>
            ))}
        </List>

        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button onClick={() => makeBackup()}>
            <ListItemText primary={t("dumps_create_button")} />
          </ListItem>
        </List>
        {createdBackup && (
          <Alert severity="success">{t("dumps_create_success_msg")}</Alert>
        )}

        <Divider />

        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={uploadBackup}
        />
        <label htmlFor="contained-button-file">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            component="span"
            className={classes.upload}
          >
            {t("dumps_upload_button")}
          </Button>
        </label>

        {file && <p>File: {file.name}</p>}
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
