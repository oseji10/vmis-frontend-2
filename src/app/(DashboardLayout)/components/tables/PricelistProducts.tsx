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
    TablePagination,
    Modal
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { useEffect, useState } from "react";
// import Modal from '@mui/material';
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

const PricelistProducts = () => {
    const [pricelistproducts, setPricelistProducts] = useState<PricelistProduct[]>([]);
    const [filteredPricelistProducts, setFilteredPricelistProducts] = useState<PricelistProduct[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [pricelistproductId, setPricelistProductId] = useState("");
    const [pricelistproductName, setPricelistProductName] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false); // Add modal state
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPricelistProduct, setSelectedPricelistProduct] = useState<Pharmacist | null>(null);
    // Set how many records you want per page
    // const token = Cookies.get('token'); // Retrieve the token from cookies
  // Modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: '8px',
  };
    // Fetch pricelistproducts from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricelist_products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setPricelistProducts(data); // Update state with the fetched data
                setFilteredPricelistProducts(data); // If you want to filter or manipulate the data later
            } catch (error) {
                console.error("Error fetching pricelistproducts:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once after component mounts


    // Handle search functionality
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = pricelistproducts.filter((pricelistproduct) => {
            const pricelistproductName = `${pricelistproduct?.pricelistproductName}`.toLowerCase();
            return (
                pricelistproductName.includes(value)
            );
        });

        setFilteredPricelistProducts(filtered);
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
    const paginatedPricelistProducts = filteredPricelistProducts.slice(
        currentPage * recordsPerPage,
        currentPage * recordsPerPage + recordsPerPage
    );



      // Handle modal open/close for adding a pricelistproduct
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Handle opening the details modal
  const handleOpenDetailsModal = (pricelistproduct: pricelistproduct) => {
    setSelectedPricelistProduct(pricelistproduct);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  // Handle form submission for adding a pricelistproduct
  const handleAddPricelistProduct = async () => {
    const pricelistproductData = {
      pricelistproductId,
      pricelistproductName,
      
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricelistproducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pricelistproductData),
      });

      if (response.ok) {
        const newpricelistproduct = await response.json();
        setPricelistProducts([...pricelistproducts, newpricelistproduct]);
        setFilteredPricelistProducts([...pricelistproducts, newpricelistproduct]);
        handleCloseAddModal();
      } else {
        console.error('Error adding pricelistproduct');
      }
    } catch (error) {
      console.error('Error adding pricelistproduct:', error);
    }
  };

    return (
        <DashboardCard title="PricelistProduct List">
            <Box display="flex" justifyContent="space-between" mb={2}>
            <Button variant="contained" onClick={handleOpenAddModal} disableElevation color="primary" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add PricelistProduct
        </Button>
                &nbsp;
                <TextField
                    variant="outlined"
                    label="Search by PricelistProduct Name"
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
                                    List ID
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    PricelistProduct Name
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

                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPricelistProducts.map((pricelistproduct) => (
                            <TableRow key={pricelistproduct.id}>

                                <TableCell>
                                    <Typography>
                                        {pricelistproduct.pricelistproductId}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {pricelistproduct.pricelistproductName}
                                    </Typography>
                                </TableCell>




                                


                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor:
                                                pricelistproduct.status === "inactive"
                                                    ? "error.main"

                                                    : pricelistproduct.status === "active"
                                                        ? "success.main"
                                                        : !pricelistproduct.status
                                                            ? "secondary.main"
                                                            : "secondary.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={pricelistproduct?.status || "N/A"}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {pricelistproduct?.createdAt}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {pricelistproduct?.status}
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {/* Pagination component */}
            <TablePagination
                component="div"
                count={filteredPricelistProducts.length}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={recordsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />

            {/* Modal for Adding Price List */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Add Price List
          </Typography>
          <TextField
            fullWidth
            label="PricelistProduct ID"
            value={pricelistproductId}
            onChange={(e) => setPricelistProductId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="PricelistProduct Name"
            value={pricelistproductName}
            onChange={(e) => setPricelistProductName(e.target.value)}
            sx={{ mb: 2 }}
          />
         
          <Button variant="contained" color="primary" onClick={handleAddPricelistProduct}>
            Add pricelistproduct
          </Button>
        </Box>
      </Modal>


        </DashboardCard>
    );
};

export default PricelistProducts;
