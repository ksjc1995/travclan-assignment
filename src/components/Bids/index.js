import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    width: "300px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "24px",
  },
  name: {
    fontSize: "32px",
    marginTop: "16px",
  },
  bidsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  bidPaper: {
    width: "200px",
    margin: "32px",
    padding: "16px",
  },
  bidDetailItem: {
    marginBottom: "8px",
  },
  noDataPaper: {
    fontSize: "24px",
    padding: "16px",
  },
});

export default function Bids() {
  const location = useLocation();
  const classes = useStyles();

  const renderBids = () => {
    const bids = location?.state?.bids;
    if (bids.length === 0) {
      return (
        <Paper className={classes.noDataPaper} elevation={2}>
          No Data!
        </Paper>
      );
    }
    return bids?.map((bid) => {
      return (
        <Paper elevation={2} className={classes.bidPaper}>
          <div className={classes.bidDetailItem}>
            <b>Id:</b> {bid?.id}
          </div>
          <div className={classes.bidDetailItem}>
            <b>Amount:</b> {bid?.amount}
          </div>
          <div className={classes.bidDetailItem}>
            <b>Car Title:</b> {bid?.carTitle}
          </div>
          <div className={classes.bidDetailItem}>
            <b>Created:</b> {bid?.created}
          </div>
        </Paper>
      );
    });
  };

  if (location.state) {
    return (
      <div className={classes.container}>
        <div elevation={3} className={classes.paper}>
          <Avatar src={location?.state?.avatarUrl} alt="avatar" />
          <span className={classes.name}>
            {`${location?.state?.firstname} ${location?.state?.lastname}`}
          </span>
        </div>
        <div className={classes.bidsContainer}>{renderBids()}</div>
      </div>
    );
  }
  return <Redirect to="/" />;
}
