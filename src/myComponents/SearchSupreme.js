import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Iconify from "src/components/Iconify";
import axios from "axios";
import MuiDataTable from "./MuiDataTable";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { getDateRangePickerDayUtilityClass } from "@mui/lab";
import ModalDialog from "./Dialog";

const base_url = "http://0.0.0.0:82/";

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

export default function SearchSupreme() {
  const [caseDetails, setCaseDetails] = React.useState({
    caseType: 3,
    caseNumber: "25",
    caseYear: 2022,
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleCloseModal = () => setModalOpen(false);
  const [lawyerName, setLawyerName] = React.useState("");
  const [tag, setTag] = React.useState("Critical");
  const [tagsList, setTagsList] = React.useState(["Critical", "Contempt"]);
  const [caseFor, setCaseFor] = React.useState("");

  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error sample");
  const [selectedCase, setSelectedCase] = React.useState(null);

  const [state, setState] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  const createToast = (type, msg) => {
    setState({ open: true, message: msg, type: type });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [output, setOutput] = React.useState("");

  const columns = [
    {
      name: "Diary_No",
      label: "Diary No",
    },
    {
      name: "Status_Stage",
      label: "Status",
    },
    {
      name: "Case_No",
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
  const handleChange = (event) => {
    setCaseDetails({
      ...caseDetails,
      [event.target.name]: [event.target.value],
    });
  };
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
            onClick={() => {
              setModalOpen(true);
              setSelectedCase(displayData[0].data);
            }}
            // onClick={() => addCase(displayData[0].data)}
          >
            Add
          </Button>
        </>
      );
    },
  };

  const addCase = () => {
    console.log("Adding row");
    console.log(selectedCase);
    console.log(lawyerName);

    axios
      .post(
        `${base_url}addcase?ct=${caseDetails.caseType}&cn=${caseDetails.caseNumber}&cy=${caseDetails.caseYear}`
      )
      .then(function (response) {
        createToast("success", "Record Added");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleReset = () => {
    setSearchResults([]);
    setCaseDetails((prevStat) => ({ ...prevStat, caseNumber: "" }));
    setSelectedCase(null);
  };
  const handleSeach = () => {
    setSearchResults([]);
    setIsLoading(true);
    setErrorMessage("");
    setIsError(false);

    axios
      .get(
        `${base_url}getcnr?ct=${caseDetails.caseType}&cn=${caseDetails.caseNumber}&cy=${caseDetails.caseYear}`
      )
      .then(function (response) {
        // handle success
        console.log([response.data]);
        setOutput(JSON.stringify(response.data));
        setSearchResults([response.data]);
        setIsLoading(false);
        console.log("Before handle CLick");
        createToast("success", "Fetched Case Successfully");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setErrorMessage("Case Not Found");
        setIsError(true);
        setIsLoading(false);
      });
  };

  const years = range(1950, 2022);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="demo-simple-select-label">Case Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={caseDetails.caseType}
            label="Case Type"
            onChange={handleChange}
            name="caseType"
            value={caseDetails.caseType}
          >
            <MenuItem value="1">SPECIAL LEAVE PETITION (CIVIL)</MenuItem>
            <MenuItem value="2">SPECIAL LEAVE PETITION (CRIMINAL)</MenuItem>
            <MenuItem value="3">CIVIL APPEAL</MenuItem>
            <MenuItem value="4">CRIMINAL APPEAL</MenuItem>
            <MenuItem value="5">WRIT PETITION (CIVIL)</MenuItem>
            <MenuItem value="6">WRIT PETITION(CRIMINAL)</MenuItem>
            <MenuItem value="7">TRANSFER PETITION (CIVIL)</MenuItem>
            <MenuItem value="8">TRANSFER PETITION (CRIMINAL)</MenuItem>
            <MenuItem value="9">REVIEW PETITION (CIVIL)</MenuItem>
            <MenuItem value="10">REVIEW PETITION (CRIMINAL)</MenuItem>
            <MenuItem value="11">TRANSFERRED CASE (CIVIL)</MenuItem>
            <MenuItem value="12">TRANSFERRED CASE (CRIMINAL)</MenuItem>
            <MenuItem value="13">SPECIAL LEAVE TO PETITION (CIVIL)...</MenuItem>
            <MenuItem value="14">
              SPECIAL LEAVE TO PETITION (CRIMINAL)...
            </MenuItem>
            <MenuItem value="15">WRIT TO PETITION (CIVIL)...</MenuItem>
            <MenuItem value="16">WRIT TO PETITION (CRIMINAL)...</MenuItem>
            <MenuItem value="17">ORIGINAL SUIT</MenuItem>
            <MenuItem value="18">DEATH REFERENCE CASE</MenuItem>
            <MenuItem value="19">CONTEMPT PETITION (CIVIL)</MenuItem>
            <MenuItem value="20">CONTEMPT PETITION (CRIMINAL)</MenuItem>
            <MenuItem value="21">TAX REFERENCE CASE</MenuItem>
            <MenuItem value="22">SPECIAL REFERENCE CASE</MenuItem>
            <MenuItem value="23">ELECTION PETITION (CIVIL)</MenuItem>
            <MenuItem value="24">ARBITRATION PETITION</MenuItem>
            <MenuItem value="25">CURATIVE PETITION(CIVIL)</MenuItem>
            <MenuItem value="26">CURATIVE PETITION(CRL)</MenuItem>
            <MenuItem value="27">REF. U/A 317(1)</MenuItem>
            <MenuItem value="28">MOTION(CRL)</MenuItem>
            <MenuItem value="29">DIARY NO.</MenuItem>
            <MenuItem value="30">FILE NUMBER</MenuItem>
            <MenuItem value="31">DIARYNO AND DIARYYR</MenuItem>
            <MenuItem value="32">SUO MOTO WRIT PETITION(CIVIL)</MenuItem>
            <MenuItem value="33">SUO MOTO WRIT PETITION(CRIMINAL)</MenuItem>
            <MenuItem value="34">SUO MOTO CONTEMPT PETITION(CIVIL)</MenuItem>
            <MenuItem value="35">SUO MOTO CONTEMPT PETITION(CRIMINAL)</MenuItem>
            <MenuItem value="36">REF. U/S 143</MenuItem>
            <MenuItem value="37">REF. U/S 14 RTI</MenuItem>
            <MenuItem value="38">REF. U/S 17 RTI</MenuItem>
            <MenuItem value="39">MISCELLANEOUS APPLICATION</MenuItem>
            <MenuItem value="40">SUO MOTO TRANSFER PETITION(CIVIL)</MenuItem>
            <MenuItem value="41">SUO MOTO TRANSFER PETITION(CRIMINAL)</MenuItem>
            <MenuItem value="9999">Unknown</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ minWidth: 150 }}
          required
          id="outlined-required"
          label="Case Number"
          name="caseNumber"
          value={caseDetails.caseNumber}
          onChange={handleChange}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="demo-simple-select-label">Case Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Case Year"
            name="caseYear"
            value={caseDetails.caseYear}
            onChange={handleChange}
          >
            {years.map((year) => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSeach}
          startIcon={<Iconify icon="ic:sharp-search" />}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleReset}
          startIcon={<Iconify icon="ic:sharp-search" />}
        >
          Reset
        </Button>
      </div>
      {/* <MuiDataTable title="Matched Cases"  columns={columns}  data={searchResults}/> */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100px",
          }}
        >
          {errorMessage}
        </Box>
      )}
      {searchResults.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <MUIDataTable
            title="Matched Cases"
            columns={columns}
            data={searchResults}
            options={options}
          />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={state.open}
        autoHideDuration={1000}
        onClose={handleClose}
        message={state.message}
        severity="success"
        key={"bottomcenter"}
      />

      <ModalDialog
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        heading="Assign Lawyer And Tags"
      >
        <TagAndLawyer
          lawyerName={lawyerName}
          setLawyerName={setLawyerName}
          tag={tag}
          tagsList={tagsList}
          caseFor={caseFor}
          setTag={setTag}
          setCaseFor={setCaseFor}
          handleAddCase={addCase}
          handleCloseModal={handleCloseModal}
        />
      </ModalDialog>
    </>
  );
}

function TagAndLawyer({
  lawyerName,
  tag,
  tagsList,
  caseFor,
  setTag,
  setCaseFor,
  setLawyerName,
  handleAddCase,
  handleCloseModal,
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ minWidth: 150, margin: "20px" }}>
          <InputLabel id="demo-simple-select-label">Select Advocate</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Case Type"
            name="lawyerName"
            value={lawyerName}
            onChange={(e) => setLawyerName(e.target.value)}
          >
            <MenuItem value="Adv Mukesh">Adv Mukesh</MenuItem>
            <MenuItem value="Adv Ramesh">Adv Ramesh</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150, margin: "20px" }}>
          <InputLabel id="demo-simple-select-label">Assign Case For</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Case Type"
            name="tag"
            value={caseFor}
            onChange={(e) => setCaseFor(e.target.value)}
          >
            <MenuItem value="Sub1">Sub1</MenuItem>
            <MenuItem value="Sub2">Sub2</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150, margin: "20px" }}>
          <InputLabel id="demo-simple-select-label">Case Tags</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Case Type"
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {tagsList.forEach((tag) => (
              <MenuItem value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          style={{ margin: "20px" }}
          variant="contained"
          onClick={handleCloseModal}
        >
          Close
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="contained"
          onClick={handleAddCase}
          startIcon={<Iconify icon="ic:sharp-search" />}
        >
          Add
        </Button>
      </div>
    </>
  );
}
