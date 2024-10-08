import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    TextField,
    TablePagination
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { useEffect, useState } from "react";
// import Cookies from 'js-cookie';

// Helper function to format the date
// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//         weekday: 'long', // Full name of the day (e.g., Friday)
//         year: 'numeric', // 4-digit year
//         month: 'long',  // Full month name (e.g., September)
//         day: 'numeric'  // Day of the month (e.g., 18)
//     }).format(date);
// };

const Diseases = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Set how many records you want per page
    // const token = Cookies.get('token'); // Retrieve the token from cookies

    // Fetch hospitals from the API
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diseases`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setHospitals(data); // Update state with the fetched data
            setFilteredHospitals(data); // If you want to filter or manipulate the data later
        } catch (error) {
            console.error("Error fetching nominees:", error);
        }
    };

    fetchData();
}, []); // Empty dependency array to run only once after component mounts


    // Handle search functionality
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = hospitals.filter((hospital) => {
            const hospitalName = `${hospital?.hospitalName}`.toLowerCase();
            return (
                hospitalName.includes(value) 
            );
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

    // Pagination logic
    const paginatedHospitals = filteredHospitals.slice(
        currentPage * recordsPerPage,
        currentPage * recordsPerPage + recordsPerPage
    );

    return (
        <DashboardCard title="Cancer List">
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Button
                    variant="contained"
                    href="/diseases/add-diseases"
                    disableElevation
                    color="primary"
                >
                    Add Cancer 
                </Button>
                &nbsp;
                <TextField
                    variant="outlined"
                    label="Search by Cancer Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: 300 }}
                />
            </Box>

            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Cancer Type
                                </Typography>
                            </TableCell>
                            
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            {/* <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date Created
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedHospitals.map((hospital) => (
                            <TableRow key={hospital.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {hospital.diseaseName}
                                    </Typography>
                                </TableCell>
                               

                           
                                
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor:
                                            hospital.status === "inactive"
                                                    ? "error.main"
                                                   
                                                    : hospital.status === "active"
                                                    ? "success.main"
                                                    : !hospital.status
                                                    ? "secondary.main"
                                                    : "secondary.main", 
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={hospital?.status || "N/A"}
                                    />
                                </TableCell>
                                {/* <TableCell align="right">
                                    
                                    <Typography variant="h6">
                                        
                                    </Typography>
                                </TableCell> */}
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
        </DashboardCard>
    );
};

export default Diseases;
