import { Router } from "express";
import {
  getAllRessources,
  createRessource,
  getRessourceById,
  updateRessource,
  deleteRessource,
} from "../controllers/ressourceController";

const router = Router();

router.get("/", getAllRessources);
router.post("/", createRessource);
router.get("/:id", getRessourceById);
router.put("/:id", updateRessource);
router.delete("/:id", deleteRessource);

export default router;
