import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
// material
import { Stack, Button, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";

import USERLIST from "../_mocks_/user";
import MUIDataTable from "mui-datatables";
const base_url = "http://0.0.0.0:82/";
export default function User() {
  const [data, setData] = useState([]);

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
  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
    selectableRows: "single",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      return (
        <>
          <Button
            variant="contained"
            onClick={() => console.log("Remove button")}
          >
            Remove
          </Button>
        </>
      );
    },
  };

  //app.run(host='0.0.0.0', port=82)
  return (
    <Page title="My Cases">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            My Cases
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Case
          </Button>
        </Stack>
        <MUIDataTable
          title="My Cases"
          columns={columns}
          data={data}
          options={options}
        />
      </Container>
    </Page>
  );
}
