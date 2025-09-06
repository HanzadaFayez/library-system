// routes/bookLoanRoutes.js
const express = require("express");
const router = express.Router();
const bookLoanController = require("../controllers/bookLoanController");

router.post("/checkout", bookLoanController.checkoutBook);
router.put("/return/:id", bookLoanController.returnBook);
router.get("/borrower/:id", bookLoanController.borrowerBooks);
router.get("/overdue", bookLoanController.overdueBooks);

module.exports = router;
