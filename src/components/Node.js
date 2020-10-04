import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import {padLeadingZeroes} from "../utils/numberFormat";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <div className={classes.parentContainer}>
          {node.online && Array.isArray(node.blocks) === false && (<p>Loading blocks...</p>)}
          {
            node.online && Array.isArray(node.blocks) && (node.blocks.map(b => (
              <div className={classes.card}>
                  <span className={classes.cardHeading}>{padLeadingZeroes(b.id)}</span>
                <p>{b.attributes.data}</p>
              </div>
            )))
          }
          {node.online && Array.isArray(node.blocks) && !node.blocks.length && (<p>Node returned 0 blocks.</p>)}
          {node.online === false && (<p>Node is offline</p>)}
          </div>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  cardHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: '#384FFE'
  },
  card: {
    backgroundColor: '#E0E0E0',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    left: 0,
    right: 0
  },
  parentContainer: {
    position: 'relative',
    width: 600
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
