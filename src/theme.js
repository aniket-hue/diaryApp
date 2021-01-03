import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "600",
        fontSize: 17,
        textTransform: "none",
        letterSpacing: 1,
      },
      textColorInherit: {
        color: "#16101c",
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: "Montserrat",
      },
      head: {
        fontWeight: 600,
        fontFamily: 15,
      },
    },
    MuiInput: {
      input: {
        padding: 0,
      },
    },
  },
});

export default theme;
