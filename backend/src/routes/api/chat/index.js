import { Router } from "express";
import { getAllChat, deleteChat, createChat } from "./handlers";

const router = Router();

// GET /chat -- get all chat messages {username, profile, content, subcontent, id}
// POST /char -- post a chat message to database, body will be { message: value }
// DELETE /chat -- delete a chat message from database, body will be { id: value }
router.get('/', getAllChat);
router.delete('/:id', deleteChat);
router.post('/', createChat);

export default router;