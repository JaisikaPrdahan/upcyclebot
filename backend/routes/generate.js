import express from "express";
import { generateIdeas } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ideas = await generateIdeas(query);

    res.json({
      detectedItem: query,
      ideas,
    });

  } catch (error) {
    console.log("AI failed → using fallback");

    res.json({
      detectedItem: req.body.query,
      ideas: [
        {
          title: "DIY Storage Organizer",
          difficulty: "Easy",
          materials: ["scissors", "glue"],
          steps: [
            "Clean the item",
            "Cut into usable shape",
            "Reassemble into organizer"
          ]
        },
        {
          title: "Decorative Piece",
          difficulty: "Medium",
          materials: ["paint", "brush"],
          steps: [
            "Clean item",
            "Paint creatively",
            "Use as decor"
          ]
        }
      ]
    });
  }
});

export default router;