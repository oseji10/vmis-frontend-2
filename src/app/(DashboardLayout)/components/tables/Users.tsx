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

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Set how many records you want per page
    // const token = Cookies.get('token'); // Retrieve the token from cookies

    // Fetch users from the API
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setUsers(data); // Update state with the fetched data
            setFilteredUsers(data); // If you want to filter or manipulate the data later
        } catch (error) {
            console.error("Error fetching names:", error);
        }
    };

    fetchData();
}, []); // Empty dependency array to run only once after component mounts


    // Handle search functionality
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = users.filter((user) => {
            const firstName = `${user?.admin?.firstName}`.toLowerCase();
            const otherNames = `${user?.admin?.otherNames}`.toLowerCase();
            const phoneNumber = `${user?.phoneNumber}`.toLowerCase();
            const email = `${user?.email}`.toLowerCase();
            return (
                firstName.includes(value) ||
                otherNames.includes(value) ||
                phoneNumber.includes(value) ||
                email.includes(value) 
            );
        });

        setFilteredUsers(filtered);
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
    const paginatedUsers = filteredUsers.slice(
        currentPage * recordsPerPage,
        currentPage * recordsPerPage + recordsPerPage
    );

    return (
        <DashboardCard title="Users List">
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Button
                    variant="contained"
                    href="/users/add-users"
                    disableElevation
                    color="primary"
                >
                    Add User 
                </Button>
                &nbsp;
                <TextField
                    variant="outlined"
                    label="Search by Name, Phone Number"
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
                                    Name
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone
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
    {paginatedUsers.map((user) => (
        <TableRow key={user.id}>
            <TableCell>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                    }}
                >
                    {user.admin && user.admin.length > 0
                        ? user.admin.map(admin => `${admin.firstName} ${admin.otherNames}`).join(', ')
                        : "N/A"}  {/* Handle case where admin might be empty */}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                    }}
                >
                    {user?.email} 
                </Typography>
            </TableCell>

            <TableCell>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                    }}
                >
                    {user?.phoneNumber} 
                </Typography>
            </TableCell>

            <TableCell>
                <Chip
                    sx={{
                        px: "4px",
                        backgroundColor:
                        user.status === "inactive"
                                ? "error.main"
                                : user.status === "active"
                                ? "success.main"
                                : !user.status
                                ? "secondary.main"
                                : "secondary.main",
                        color: "#fff",
                    }}
                    size="small"
                    label={user?.status || "N/A"}
                />
            </TableCell>
        </TableRow>
    ))}
</TableBody>

                </Table>
            </Box>

            {/* Pagination component */}
            <TablePagination
                component="div"
                count={filteredUsers.length}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={recordsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </DashboardCard>
    );
};

export default Users;
