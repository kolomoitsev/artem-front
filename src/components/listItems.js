import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PetsIcon from "@material-ui/icons/Pets";
import { Trans, useTranslation } from "react-i18next";

const MainListItems = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ListSubheader inset>{t("menu")}</ListSubheader>
      <ListItem button onClick={() => (window.location.href = "/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu_dashboard")} />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/pets")}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu_pets")} />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/users")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu_users")} />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/settings")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu_database")} />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu_logout")} />
      </ListItem>
    </div>
  );
};

export default MainListItems;
