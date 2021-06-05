import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";
import { endpoint } from "../config";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  InputLabel,
  ListItem,
  ListItemText,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../components/Title.components";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Trans } from "react-i18next";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  formArea: {
    margin: theme.spacing(1),
    width: "100%",
    minHeight: "150px",
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "1px solid #ccc",
    margin: "5px 0",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  fixedHeight: {
    height: 240,
    width: "100%",
  },
  container: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "baseline",
    marginBottom: theme.spacing(1),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Deposits = ({ food_total_calories, rer_total_calories }) => {
  return (
    <React.Fragment>
      <Title>Total food calories</Title>
      <Typography component="p" variant="h4">
        {food_total_calories.toFixed(2)}
      </Typography>
      <Title>RER total calories</Title>
      <Typography component="p" variant="h4">
        {rer_total_calories.toFixed(2)}
      </Typography>
    </React.Fragment>
  );
};

const Chart = ({ calories, rerCalories }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const data = [
      ...calories.map((callory) => {
        return {
          name: new Date(callory.date).toDateString(),
          food_calories_total: callory.food_total_calories,
        };
      }),
    ];

    setData(data);

    const data2 = [
      ...rerCalories.map((rerCallory) => {
        return {
          name: new Date(rerCallory.date).toDateString(),
          rer_calories_total: rerCallory.rer_total_calories,
        };
      }),
    ];

    const length1 = calories.length;
    const length2 = rerCalories.length;

    let finalLength = length1 - length2;

    if (rerCalories[rerCalories.length - 1] && calories[calories.length - 1]) {
      while (finalLength !== 0) {
        data2.push({
          name: new Date(calories[calories.length - 1].date).toDateString(),
          rer_calories_total:
            rerCalories[rerCalories.length - 1].rer_total_calories,
        });

        finalLength--;
      }
    }

    setData2(data2);
  }, [calories, rerCalories]);

  return (
    <React.Fragment>
      <Title>Stats on chart</Title>
      <ResponsiveContainer>
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            data={data}
            type="monotone"
            dataKey="food_calories_total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            data={data2}
            type="monotone"
            dataKey="rer_calories_total"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

const Chart2 = ({ anthropometry }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const data = [
      ...anthropometry.map((callory) => {
        return {
          name: new Date(callory.date).toDateString(),
          food_calories_total: callory.height,
        };
      }),
    ];

    setData(data);

    const data2 = [
      ...anthropometry.map((rerCallory) => {
        return {
          name: new Date(rerCallory.date).toDateString(),
          rer_calories_total: rerCallory.weight,
        };
      }),
    ];

    setData2(data2);
  }, [anthropometry]);

  return (
    <React.Fragment>
      <Title>Stats on chart</Title>
      <ResponsiveContainer>
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            data={data}
            type="monotone"
            dataKey="food_calories_total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            data={data2}
            type="monotone"
            dataKey="rer_calories_total"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

const SinglePetPage = (props) => {
  const classes = useStyles();
  const petId = props.match.params.pet_id;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [petInfo, setPetInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState([]);
  const [rerCalories, setRerCalories] = useState([]);
  const [antrop, setAntrop] = useState([]);
  const [foods, setFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodAmount, setFoodAmount] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [antropometricRecords, setAnthropometricRecords] = useState([]);

  const [promptedWeight, setPromptedWeight] = useState("");
  const [promptedHeight, setPromptedHeight] = useState("");

  const [reports, setReports] = useState([]);

  const [promptedSummary, setPromptedSummary] = useState("");
  const [promptedComment, setPromptedComment] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${endpoint}/api/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setPetInfo(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { food_calories, rer_calories, anthropometry },
        } = await axios.get(`${endpoint}/api/pets/${petId}/statistic`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        anthropometry && setAntrop(anthropometry);
        food_calories && setCalories(food_calories);
        rer_calories && setRerCalories(rer_calories);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${endpoint}/api/foods`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        data && setFood(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${endpoint}/api/pets/${petId}/statistic/today`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        data && setStatsData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${endpoint}/api/pets/${petId}/stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        data && console.log(data);
        setAnthropometricRecords(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${endpoint}/api/pets/${petId}/reports`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        data && setReports(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const addComment = async () => {
    const postData = {
      creator_id: parseInt(localStorage.getItem("currentUser")),
      conclusion: promptedSummary,
    };

    if (promptedComment) {
      postData.comment = promptedComment;
    }

    try {
      const { data } = await axios.post(
        `${endpoint}/api/pets/${petId}/reports`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      data && console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const sendFeedData = async () => {
    try {
      const data = await axios.post(
        `${endpoint}/api/pets/${petId}/eating`,
        {
          food_id: parseInt(selectedFood),
          portion_weight: parseInt(foodAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const sendAntropometricData = async () => {
    try {
      const data = await axios.post(
        `${endpoint}/api/pets/${petId}/stats`,
        {
          height: parseFloat(promptedHeight),
          weight: parseFloat(promptedWeight),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {petInfo && (
        <React.Fragment>
          <Container
            maxWidth="sm"
            component="main"
            className={classes.heroContent}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {petInfo.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              {petInfo.pet_type.type_name}
            </Typography>
          </Container>

          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              <Grid item key={"Free1"} xs={12} sm={12 || 6} md={4}>
                {petInfo.father && (
                  <Card>
                    <CardHeader
                      title={`Father - ${petInfo.father.name}`}
                      subheader={`Family name - ${petInfo.father.family_name}`}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      action={"Pro" ? <StarIcon /> : null}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardPricing}>
                        <Typography
                          component="p"
                          variant="p"
                          color="textPrimary"
                        >
                          Breed - {petInfo.father.breed}
                        </Typography>

                        <Typography
                          component="h3"
                          variant="h6"
                          color="textPrimary"
                        >
                          {petInfo.father_verified ? (
                            <>
                              <h5>
                                <VerifiedUserIcon /> verified dog
                              </h5>
                            </>
                          ) : (
                            <>
                              <h5>
                                <NoEncryptionIcon /> Not verified dog
                              </h5>
                            </>
                          )}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Grid>
              <Grid item key={"Free2"} xs={12} sm={12 || 6} md={4}>
                <Card>
                  <CardHeader
                    title={`Owner - ${petInfo.owner.full_name}`}
                    subheader={`${petInfo.owner.account_email}`}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    action={"Pro" ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="p" variant="p" color="textPrimary">
                        {petInfo.owner.backup_email} - backup email
                      </Typography>
                      <Typography variant="p" color="textSecondary">
                        Location - {petInfo.owner.location}
                      </Typography>
                      <Typography variant="p" color="textSecondary">
                        Registration -{" "}
                        {new Date(
                          petInfo.owner.registration_date
                        ).toLocaleDateString()}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item key={"Free3"} xs={12} sm={12 || 6} md={4}>
                {petInfo.mother && (
                  <Card>
                    <CardHeader
                      title={`Mother - ${petInfo.mother.name}`}
                      subheader={`Family name - ${petInfo.mother.family_name}`}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      action={"Pro" ? <StarIcon /> : null}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardPricing}>
                        <Typography
                          component="p"
                          variant="p"
                          color="textPrimary"
                        >
                          Breed - {petInfo.mother.breed}
                        </Typography>
                        <Typography
                          component="h3"
                          variant="h6"
                          color="textPrimary"
                        >
                          {petInfo.mother_verified ? (
                            <>
                              <h5>
                                <VerifiedUserIcon /> verified dog
                              </h5>
                            </>
                          ) : (
                            <>
                              <h5>
                                <NoEncryptionIcon /> Not verified dog
                              </h5>
                            </>
                          )}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )}
      <Container maxWidth="lg" className={classes.container}>
        <Grid item xs={12} md={12} lg={12}>
          {statsData && (
            <Paper className={fixedHeightPaper}>
              <Deposits
                food_total_calories={statsData.food_total_calories}
                rer_total_calories={statsData.rer_total_calories}
              />
            </Paper>
          )}
          {!statsData && (
            <Paper className={fixedHeightPaper}>
              <Typography component="p" variant="h4">
                No today's eatings
              </Typography>
            </Paper>
          )}
        </Grid>
      </Container>

      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              {calories && rerCalories && (
                <Chart calories={calories} rerCalories={rerCalories} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Paper className={fixedHeightPaper}>
            <Grid item xs={12} md={6}>
              <InputLabel id="demo-controlled-open-select-label">
                Select food
              </InputLabel>

              {foods && (
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  defaultValue={foods[0] ? foods[0].food_id : ""}
                  onChange={(event) => setSelectedFood(event.target.value)}
                >
                  {foods &&
                    foods.map((food) => (
                      <MenuItem value={food.food_id}>{food.food_name}</MenuItem>
                    ))}
                </Select>
              )}
            </Grid>

            <Grid item xs={12} md={4} lg={6}>
              <TextField
                className={classes.formControl}
                id="outlined-basic"
                label="Enter amount"
                variant="outlined"
                defaultValue={""}
                onChange={(event) => setFoodAmount(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2} lg={2}>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!foodAmount}
                  onClick={sendFeedData}
                >
                  <Trans i18nKey={"addBrigade"}>Feed pet</Trans>
                </Button>
              </CardActions>
            </Grid>
          </Paper>
        </Grid>
      </Container>

      <Container maxWidth={"lg"} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <List className={classes.root} subheader={<li />}>
              <ListSubheader>{`Anthopometric record`}</ListSubheader>
              {antropometricRecords &&
                antropometricRecords.map((item, index) => (
                  <React.Fragment>
                    {index === 0 && (
                      <ListItem key={`item-${index}-${item.record_id}`}>
                        <ListItemText
                          primary={`Current - Date:  ${new Date(
                            item.record_time
                          ).toLocaleDateString()} Height: ${
                            item.height
                          } Weight: ${item.weight}`}
                        />
                      </ListItem>
                    )}
                    {index !== 0 && (
                      <ListItem key={`item-${index}-${item.record_id}`}>
                        <ListItemText
                          primary={`Date:  ${new Date(
                            item.record_time
                          ).toLocaleDateString()} Height: ${
                            item.height
                          } Weight: ${item.weight}`}
                        />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Enter height"
              variant="outlined"
              defaultValue={""}
              onChange={(event) => setPromptedHeight(event.target.value)}
            />

            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Enter weight"
              variant="outlined"
              defaultValue={""}
              onChange={(event) => setPromptedWeight(event.target.value)}
            />

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                disabled={!promptedHeight && !promptedWeight}
                onClick={sendAntropometricData}
              >
                <Trans i18nKey={"addBrigade"}>Submit</Trans>
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              {antrop && <Chart2 anthropometry={antrop} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={"lg"} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <List className={classes.root} subheader={<li />}>
              <ListSubheader>{`Reports history`}</ListSubheader>
              {reports &&
                reports.map((item, index) => (
                  <React.Fragment>
                    {item && console.log(item)}
                    <ListItem
                      className={classes.listItem}
                      key={`item-${index}-${item.creator.registration_date}`}
                    >
                      <ListItemText
                        primary={`
                          Author: ${item.creator.full_name}
                        `}
                      />

                      <ListItemText
                        primary={`
                          Summary: ${item.report.report_conclusion}
                        `}
                      />

                      {item.report.report_comment && (
                        <ListItemText
                          primary={`
                          Report: ${item.report.report_comment}
                        `}
                        />
                      )}
                    </ListItem>
                  </React.Fragment>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              className={classes.formControl}
              id="outlined-basic"
              label="Enter report summary"
              variant="outlined"
              defaultValue={""}
              onChange={(event) => setPromptedSummary(event.target.value)}
            />

            <TextField
              className={classes.formArea}
              id="outlined-basic"
              label="Enter report comment"
              variant="outlined"
              multiline
              rows={4}
              defaultValue={""}
              onChange={(event) => setPromptedComment(event.target.value)}
            />

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                disabled={!promptedSummary}
                onClick={addComment}
              >
                <Trans i18nKey={"addBrigade"}>Add comment</Trans>
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Container>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default SinglePetPage;
