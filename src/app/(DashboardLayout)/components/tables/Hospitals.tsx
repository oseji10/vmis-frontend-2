import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    TextField,
    TablePagination,
    Modal,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
  } from '@mui/material';
  import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';

  const Hospitals = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [open, setOpen] = useState(false); // Modal state
    const [contactPersons, setContactPersons] = useState([]); // Contact persons from API
    const [selectedContactPerson, setSelectedContactPerson] = useState(''); // Selected contact person
    const [hospitalName, setHospitalName] = useState('');
    const [shortName, setShortName] = useState('');
    const [location, setLocation] = useState(''); // Location state
  
    const router = useRouter();
    // Define the modal style for mobile responsiveness
    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%', // Increased flexibility for mobile
      maxWidth: '400px', // Still retain a reasonable size for larger screens
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 3,
      borderRadius: '8px',
    };
  
    // Fetch hospitals from the API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hospitals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const data = await response.json();
          setHospitals(data); // Update state with the fetched data
          setFilteredHospitals(data); // If you want to filter or manipulate the data later
        } catch (error) {
          console.error('Error fetching hospitals:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // Fetch contact persons for dropdown from the API
    useEffect(() => {
      const fetchContactPersons = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admins`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setContactPersons(data);
        } catch (error) {
          console.error('Error fetching contact persons:', error);
        }
      };
  
      fetchContactPersons();
    }, []);
  
    // Handle search functionality
    const handleSearch = (event) => {
      const value = event.target.value.toLowerCase();
      setSearchTerm(value);
  
      const filtered = hospitals.filter((hospital) => {
        const hospitalName = `${hospital?.hospitalName}`.toLowerCase();
        return hospitalName.includes(value);
      });
  
      setFilteredHospitals(filtered);
      setCurrentPage(0); // Reset to first page when search is triggered
    };
  
    // Handle pagination
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRecordsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(0);
    };
  
    // Handle modal open/close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    // Handle form submission for adding a hospital
    const handleAddHospital = async () => {
      const hospitalData = {
        shortName,
        hospitalName,
        hospitalAdmin: selectedContactPerson,
        location,
      };
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hospitals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hospitalData),
        });
  
        if (response.ok) {
          const newHospital = await response.json();
          setHospitals([...hospitals, newHospital]); // Add new hospital to the list
          setFilteredHospitals([...hospitals, newHospital]);
          handleClose(); // Close the modal after successful submission
        } else {
          console.error('Error adding hospital');
        }
        router.refresh();
      } catch (error) {
        console.error('Error adding hospital:', error);
      }
      
    };
  
    // Pagination logic
    const paginatedHospitals = filteredHospitals.slice(
      currentPage * recordsPerPage,
      currentPage * recordsPerPage + recordsPerPage
    );
  
    return (
      <DashboardCard title="Hospitals List">
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={{ xs: 2, sm: 0 }}
        >
          <Button
            variant="contained"
            onClick={handleOpen}
            disableElevation
            color="primary"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Add Hospital
          </Button>
          <TextField
            variant="outlined"
            label="Search by Hospital Name"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: { xs: '100%', sm: 300 } }}
          />
        </Box>
  
        {/* Table wrapper for horizontal scrolling on smaller screens */}
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <Table aria-label="simple table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Acronym
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Hospital Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Contact Person
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date Created
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedHospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                      {hospital.shortName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                      {hospital?.hospitalName}
                    </Typography>
                  </TableCell>
  
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {hospital?.hospitalAdmin?.firstName} {hospital?.hospitalAdmin?.otherNames}
                    </Typography>
                  </TableCell>
  
                  <TableCell>
                    <Chip
                      sx={{
                        px: '4px',
                        backgroundColor:
                          hospital.status === 'inactive'
                            ? 'error.main'
                            : hospital.status === 'active'
                            ? 'success.main'
                            : 'secondary.main',
                        color: '#fff',
                      }}
                      size="small"
                      label={hospital?.status || 'N/A'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">{/* Date Formatting */}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
  
        {/* Pagination component */}
        <TablePagination
          component="div"
          count={filteredHospitals.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={recordsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
  
        {/* Modal for Adding Hospital */}
        <Modal open={open} onClose={handleClose}>
          <Box 
            sx={{ 
              ...modalStyle, 
              maxHeight: '80vh', // Set max height to 80% of the viewport height
              overflowY: 'auto' // Enable vertical scrolling
            }}
          >
            <Typography variant="h6" mb={2}>
              Add Hospital
            </Typography>
            <TextField
              fullWidth
              label="Acronym"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
  
  <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Select Contact Person</InputLabel>
  <Select
    value={selectedContactPerson}
    onChange={(e) => setSelectedContactPerson(e.target.value)}  // Check if this updates correctly
  >
    {contactPersons.map((person) => (
      <MenuItem key={person.id} value={person.id}>
        {person.firstName} {person.otherNames}
      </MenuItem>
    ))}
  </Select>
</FormControl>

  
            <Box display="flex" justifyContent="flex-end" flexDirection={{ xs: 'column', sm: 'row' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                sx={{ width: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 }, mr: { sm: 1 } }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddHospital}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </DashboardCard>
    );
  };
  
  export default Hospitals;
  