// routes/borrowerRoutes.js
const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

router.post("/", borrowerController.createBorrower);
router.put("/:id", borrowerController.updateBorrower);
router.delete("/:id", borrowerController.deleteBorrower);
router.get("/", borrowerController.getAllBorrowers);

module.exports = router;
