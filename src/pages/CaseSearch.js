import React from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Tab,
  Tabs,
  Box,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
//
import USERLIST from "../_mocks_/user";
import SearchSupreme from "src/myComponents/SearchSupreme";

export default function CaseSearch() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Seach Case">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Search Case
          </Typography>
          <Button variant="contained" component={RouterLink} to="#">
            Test
          </Button>
        </Stack>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Supreme" value="1" />
                <Tab label="High" value="2" />
                <Tab label="District" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SearchSupreme />{" "}
            </TabPanel>
            <TabPanel value="2">High</TabPanel>
            <TabPanel value="3">District</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
