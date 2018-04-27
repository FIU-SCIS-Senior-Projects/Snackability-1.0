import express from 'express';
const router = express.Router();
import snackRoutes from'./snack';
// import userRoutes from'./snack';
// import adminRoutes from'./admin';

router.use("/snack", snackRoutes);
// router.use("/user", userRoutes);
// router.use("/admin", adminRoutes);

export default router;
