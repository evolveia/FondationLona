import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn("Could not initialize GoogleGenAI client:", err);
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Fondation Lona API" });
});

// Institutional Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], language = "fr", userContact = {} } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const client = getAiClient();

    const systemInstruction = `
Vous êtes l'Assistant Numérique Officiel et Conseiller Institutionnel de la Fondation Lona (République Démocratique du Congo), fondée et présidée par Son Excellence Madame la Première Dame Denise Nyakeru Tshisekedi. Devise officielle : "Ensemble, semons l'excellence".

Vos 4 piliers d'intervention sont :
1. Éducation & Bourses EXCELLENTIA : Bourses d'excellence universitaire en RDC et à l'international (France, Maroc, USA) pour les lauréats de l'Examen d'État ayant obtenu au moins 85%.
2. Santé & Drépanocytose : Sensibilisation, électrophorèse néonatale, prise en charge gratuite en hydroxyurée, cliniques mobiles et réduction de la mortalité infantile.
3. Lutte contre les Violences Basées sur le Genre (VBG) : Prise en charge holistique (médicale, juridique, psychologique et réinsertion sociale) des femmes et filles survivantes.
4. Autonomisation Économique des Femmes : Formations professionnelles, dotation en kits de métiers et microcrédits pour l'autonomie financière féminine.

Directives de communication :
- Répondez avec élégance diplomatique, bienveillance, respect et précision.
- Vous devez répondre dans la langue de l'utilisateur (Langue spécifiée : ${language}).
- Si l'utilisateur pose une question sur les critères de la bourse EXCELLENTIA, rappelez qu'il faut avoir au moins 85% à l'Examen d'État et passer le test de sélection.
- Si l'utilisateur souhaite faire un don ou devenir partenaire, orientez-le vers le formulaire officiel ou proposez-lui de finaliser sur WhatsApp.
- Si l'utilisateur a renseigné ses coordonnées (Nom: ${userContact.name || 'Non précisé'}, Email: ${userContact.email || 'Non précisé'}, Tél: ${userContact.phone || 'Non précisé'}, Motif: ${userContact.interest || 'Non précisé'}), remerciez-le chaleureusement et invitez-le si besoin à cliquer sur le bouton WhatsApp pour contacter le cabinet de la Fondation directement (+55 00 00000-0000).
- Restez concis, professionnel et structuré.
`;

    if (client) {
      // Build conversation contents
      const formattedContents = [
        ...history.slice(-6).map((h: { role: string; content: string }) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];

      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "La Fondation Lona vous remercie pour votre message. Comment pouvons-nous vous assister ?";
      return res.json({ response: replyText });
    } else {
      // Graceful institutional fallback when API key is not yet set
      const lower = message.toLowerCase();
      let fallbackReply = "";

      if (lower.includes("excellentia") || lower.includes("bourse") || lower.includes("scholarship")) {
        fallbackReply =
          "Le Programme EXCELLENTIA est l'initiative phare de la Fondation Lona. Il octroie des bourses d'études supérieures complètes aux lauréats de l'Examen d'État ayant obtenu au moins 85%, pour des cursus en RDC, en France, au Maroc ou aux États-Unis. Avez-vous besoin d'informations sur les candidatures de la prochaine cohorte ?";
      } else if (lower.includes("santé") || lower.includes("drépanocytose") || lower.includes("health")) {
        fallbackReply =
          "Dans le domaine de la santé, la Fondation Lona mène un combat sans relâche contre la drépanocytose à travers la RDC : dépistages néonataux précoces, électrophorèses gratuites, cliniques mobiles et fourniture d'hydroxyurée pour les enfants.";
      } else if (lower.includes("femme") || lower.includes("vbg") || lower.includes("autonomie")) {
        fallbackReply =
          "La Fondation Lona assure la prise en charge holistique des survivantes de violences basées sur le genre (médicale, psychologique, juridique) et favorise l'émancipation économique des femmes par des micro-financements et formations techniques.";
      } else if (lower.includes("don") || lower.includes("donner") || lower.includes("donate") || lower.includes("partenaire")) {
        fallbackReply =
          "Nous vous remercions pour votre générosité. Vous pouvez effectuer un don directement via la section 'Faire un don' de notre portail, ou échanger directement avec notre secrétariat via WhatsApp (+55 00 00000-0000).";
      } else {
        fallbackReply =
          "Bonjour et bienvenue à la Fondation Lona, sous le haut patronage de Son Excellence Madame la Première Dame Denise Nyakeru Tshisekedi. Nous œuvrons pour l'éducation, la santé et l'autonomie des femmes en RDC. En quoi puis-je vous renseigner aujourd'hui ?";
      }

      return res.json({ response: fallbackReply });
    }
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement du message.",
      details: error?.message || "Internal error",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fondation Lona Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
