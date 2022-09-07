// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import ModalDialog from "src/myComponents/Dialog";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------
const base_url = "http://0.0.0.0:82/";
export default function DashboardApp() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleCloseModal = () => setModalOpen(false);

  const [selectedRow, setSelectedRow] = React.useState(null);

  useEffect(() => {
    axios
      .get(`${base_url}getAllCases`)
      .then(function (response) {
        // handle success

        let data = response.data;
        const final = data.map((row) => ({
          ...row,
          shortCaseNo: row["Case_No"].split("Registered")[0].trim(),
          shortStatus: row["Status_Stage"].split("(")[0].trim(),
        }));

        setData(final);
      })
      .catch(function (error) {
        // handle error
      });
  }, []);
  const columns = [
    {
      name: "Diary_No",
      label: "Diary No",
    },
    {
      name: "shortStatus",
      label: "Status",
    },
    {
      name: "shortCaseNo",
      label: "Case No",
    },
    {
      name: "Present_Last_Listed_On",
      label: "Present/Last Listed On",
    },
    {
      name: "Category",
      label: "Category",
    },
    {
      name: "Petitioner",
      label: "Petitioner(s)",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "Pet_Advocate",
      label: "Pet. Advocate(s)",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "Respondent(s)",
      label: "Respondent(s)",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "Resp_Advocate",
      label: "Resp. Advocate(s)",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
  ];
  const filteredColumns = columns.filter((item) => item.name !== "Category");
  const veryilteredColumns = [
    {
      name: "Diary_No",
      label: "Diary N0",
    },
    {
      name: "shortStatus",
      label: "Status",
    },
    {
      name: "shortCaseNo",
      label: "Case No",
    },
    {
      name: "Compliance",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            control={<TextField value={value || ""} type="number" />}
            onChange={(event) => updateValue(event.target.value)}
          />
        ),
      },
    },
  ];

  const col2 = {};

  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
    selectableRows: "none",
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    onRowClick: (rowData, rowMeta) => {
      console.log(rowData);
      setModalOpen(true);
      setSelectedRow(rowData);
    },
  };

  return (
    <>
      <Page title="Case Management Software">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Welcome to Legal Solutions</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MUIDataTable
                title="Upcoming Cases in next 7 Days"
                columns={columns}
                data={data}
                options={options}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MUIDataTable
                title="Upcoming Cases in next 10 Days"
                columns={columns}
                data={data}
                options={options}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MUIDataTable
                title="Upcoming Cases in next 30 Days"
                columns={filteredColumns}
                data={data}
                options={options}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MUIDataTable
                title="Critical Cases"
                columns={filteredColumns}
                data={data}
                options={options}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MUIDataTable
                title="Contempt Cases"
                columns={filteredColumns}
                data={data}
                options={options}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MUIDataTable
                title="Compliance Status"
                columns={veryilteredColumns}
                data={data}
                options={options}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppNewUsers />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>
          </Grid>
        </Container>
      </Page>
      <ModalDialog
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        heading="Case Details"
      >
        {selectedRow ? selectedRow.toString() : "No data"}
        <Button onClick={handleCloseModal}>Close</Button>
      </ModalDialog>
    </>
  );
}
