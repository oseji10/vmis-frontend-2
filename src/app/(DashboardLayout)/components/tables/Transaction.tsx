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
  Modal,
  MenuItem,
  InputLabel,
  FormControl,
  Select
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Visibility } from '@mui/icons-material';

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

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [suppliers, setSuppliers] = useState<Transaction[]>([]);
  const [hospitals, setHospitals] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [transactionId, setTransactionId] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false); // Add modal state
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Pharmacist | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Pharmacist | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const router = useRouter();

  const [products, setProducts] = useState([]);
  //   const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const [salesData, setSalesData] = useState([]);
  const [openSalesModal, setOpenSalesModal] = useState(false);

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
  // Fetch transactions from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setTransactions(data); // Update state with the fetched data
        setFilteredTransactions(data); // If you want to filter or manipulate the data later
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once after component mounts


  const fetchSalesData = async (transactionId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setSalesData(data); // Update state with the fetched sales data
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const handleOpenDetailsModal = async (transaction) => {
    setSelectedTransaction(transaction);
    setTransactionId(transaction.id); // Store the transaction ID
    await fetchSalesData(transaction.id); // Fetch sales data
    setOpenDetailsModal(true);
  };



  // Fetch suppliers for dropdown
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    };

    fetchSuppliers();
  }, []);


  // Handle search functionality
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = transactions.filter((transaction) => {
      const transactionName = `${transaction?.transactionName}`.toLowerCase();
      return (
        transactionName.includes(value)
      );
    });

    setFilteredTransactions(filtered);
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
  const paginatedTransactions = filteredTransactions.slice(
    currentPage * recordsPerPage,
    currentPage * recordsPerPage + recordsPerPage
  );



  // Handle modal open/close for adding a transaction
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Handle opening the details modal
  // const handleOpenDetailsModal = (transaction: Transaction) => {
  //   setSelectedTransaction(transaction);
  //   setOpenDetailsModal(true);
  // };

  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  // Handle form submission for adding a transaction
  //   const handleAddTransaction = async () => {
  //     const transactionData = {
  //       transactionId,
  //       transactionName,
  //     //   selectedSupplier

  //     };

  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drug-transaction/new-transaction`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(transactionData),
  //       });

  //       if (response.ok) {
  //         const newtransaction = await response.json();
  //         setTransactions([...transactions, newtransaction]);
  //         setFilteredTransactions([...transactions, newtransaction]);
  //         handleCloseAddModal();
  //         router.refresh();
  //       } else {
  //         console.error('Error adding transaction');
  //       }
  //     } catch (error) {
  //       console.error('Error adding transaction:', error);
  //     }
  //   };


  // Fetch products for dropdown
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hospitals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);


  // Fetch products based on selected supplier
  const handleSupplierChange = async (supplierId) => {
    setSelectedSupplier(supplierId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drugs/supplier/${supplierId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add to cart functionality
  const addToCart = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (product) {
      const cartItem = {
        product: { id: selectedProduct },
        productName: product.productName, // Include product name
        productDescription: product.productDescription, // Include product description
        quantityTransactioned: quantity,
        transactionedBy: { id: "3cc433d3-1e4a-4b45-81df-2f7b4f6227bb" },
      };
      setCart([...cart, cartItem]);
      setQuantity(1);  // Reset quantity for next item
    } else {
      console.error('Selected product not found.');
    }
  };


  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };


  const handleAddTransaction = async () => {
    try {
      // Format the data according to the API requirements
      const transactionData = {
        transactionRequest: {
          hospital: { id: selectedHospital }  // Assuming you have hospitalId from state or context
        },
        salesRequest: cart,  // Use the cart directly as the array of items
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/new-sale`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),  // Send formatted transaction data
      });

      if (response.ok) {
        console.log("Transaction submitted successfully");
        setCart([]);  // Clear the cart after successful submission
        setOpenAddModal(false);
      } else {
        console.error("Error submitting transaction");
      }
    } catch (error) {
      console.error('Error submitting cart:', error);
    }
    router.refresh();
  };


  return (
    <DashboardCard title="Drug Transactions">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleOpenAddModal} disableElevation color="primary" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          New Transaction
        </Button>

        &nbsp;
        <TextField
          variant="outlined"
          label="Search by Transaction Name"
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
                  Transaction ID
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hospital Name
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Amount
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
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>

                <TableCell>
                  <Typography>
                    {transaction?.transactionId}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {transaction?.hospital?.shortName}
                  </Typography>
                </TableCell>



                <TableCell>
                  <Typography>
                    {transaction?.amount}
                  </Typography>
                </TableCell>



                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor:
                        transaction.status === "inactive"
                          ? "error.main"

                          : transaction.status === "active"
                            ? "success.main"
                            : !transaction.status
                              ? "secondary.main"
                              : "secondary.main",
                      color: "#fff",
                    }}
                    size="small"
                    label={transaction?.status || "N/A"}
                  />
                </TableCell>
                <TableCell>
                  <Typography>
                    {transaction?.createdAt}
                  </Typography>
                </TableCell>
                <IconButton onClick={() => {
                  handleOpenDetailsModal(transaction); // This fetches sales and opens the sales modal
                  setOpenSalesModal(true); // Open the sales modal
                }}>
                  <Visibility />
                </IconButton>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination component */}
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={recordsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />


      {/* Modal for Adding Transaction */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box sx={{
           ...modalStyle, 
           maxHeight: '80vh', // Set max height to 80% of the viewport height
           overflowY: 'auto'
        }}>
          <Typography variant="h6" mb={2}>Add New Transaction</Typography>


          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="hospital-label">Select Hospital</InputLabel>
            <Select
              labelId="hospital-label"
              value={selectedHospital}
              label="Select Hospital"
              onChange={(e) => setSelectedHospital(e.target.value)}
            >
              {hospitals.map((hospital) => (
                <MenuItem key={hospital.id} value={hospital.id}>
                  {hospital.hospitalName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Supplier */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="supplier-label">Select Supplier</InputLabel>
            <Select
              labelId="supplier-label"
              value={selectedSupplier}
              label="Select Supplier"
              onChange={(e) => handleSupplierChange(e.target.value)}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.supplierName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Product */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="product-label">Select Product</InputLabel>
            <Select
              labelId="product-label"
              value={selectedProduct}
              label="Select Product"
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!products.length}  // Disable if no products are available
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.productName} {product.productDescription}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Quantity Input */}
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Add to Cart Button */}
          <Button fullWidth variant="contained" color="primary" onClick={addToCart}>
            Add to Cart
          </Button>

          {/* Display Cart */}
          <Box mt={2}>
            <Typography variant="subtitle1">Cart:</Typography>
            {cart.map((item, index) => (
              <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                <Typography>{item.productName} - {item.productDescription}</Typography>
                <Box display="flex" alignItems="center">
                  <Typography>{item.quantityTransactioned}</Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeFromCart(index)}  // Call the remove function on click
                    size="small"
                    sx={{ ml: 1 }}  // Margin left for spacing
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>


          {/* Submit Cart */}
          <Button fullWidth variant="contained" color="secondary" onClick={handleAddTransaction} sx={{ mt: 2 }}>
            Submit Transaction
          </Button>
        </Box>
      </Modal>



      {openSalesModal && (
        <Modal open={openSalesModal} onClose={() => setOpenSalesModal(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h6" mb={2}>
              Sales for Transaction ID: {transactionId}
            </Typography>
            <Table
              sx={{
                ...modalStyle,
                width: '90%', // Use a percentage for width
                maxWidth: '600px', // Set a max width
                overflow: 'auto',
                border: '1px solid', // Add border to the table
                borderColor: 'divider', // Use the theme's divider color
                borderRadius: '4px', // Optional: Add some rounding to the corners
                // overflow: 'hidden' // To keep the border rounded
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: '1px solid' }}>Product Name</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Quantity Sold</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Landed Cost</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Hospital Markup</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Supplier Markup</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Consultant Markup</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Bank Charges</TableCell>
                  <TableCell sx={{ border: '1px solid' }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell sx={{ border: '1px solid' }}>{sale.product?.productName} {sale.product?.productDescription}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>{sale.quantitySold}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>{sale.landedCost}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>{sale.hospitalMarkup}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>{sale.supplierMarkup}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>{sale.consultantMarkup}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>{sale.bankCharges}</TableCell>
                    <TableCell sx={{ border: '1px solid' }}>
                      {`₦${(
                        (Number(sale?.landedCost) || 0) +
                        (Number(sale?.supplierMarkup) || 0) +
                        (Number(sale?.hospitalMarkup) || 0) +
                        (Number(sale?.consultantMarkup) || 0) +
                        (Number(sale?.bankCharges) || 0)
                      ).toFixed(2)}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </Box>
        </Modal>
      )}


    </DashboardCard>
  );
};

export default Transactions;
