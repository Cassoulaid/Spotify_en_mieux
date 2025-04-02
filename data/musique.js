// @ts-check
/**
 * @typedef {import('@prisma/client').PrismaClient} PrismaClient
 */

import fs from "fs";
import { PrismaClient } from '@prisma/client';

const data = JSON.parse(fs.readFileSync('musique.json', 'utf8'));
const prisma = new PrismaClient();

async function importerDonneesMusique() {
  try {
    // Vérifier le format des données
    console.log("Structure des données:", typeof data);
    
    // Préparer les données selon le modèle musique
    let donneesMusique = [];
    
    if (data.tracks && Array.isArray(data.tracks)) {
      // Format de données du nouveau musique.json avec le tableau tracks
      donneesMusique = data.tracks.map(item => ({
        title: item.title || '',
        artist: item.artist || '',
        album: item.album || '',
        genre: item.genre || '',
        duration: item.duration || '',
        cover: item.cover || '',
        // Générer l'URL du fichier audio à partir du titre
        audioUrl: `audio/${item.title.toLowerCase().replace(/\s+/g, '-')}.mp3`
      }));
    } else if (!Array.isArray(data)) {
      // Option 1: Si les données sont un objet avec des propriétés de musique
      if (data.name !== undefined || data.title !== undefined) {
        donneesMusique = [data]; // Utiliser l'objet unique comme élément d'un tableau
      } 
      // Option 2: Si les données sont structurées comme dans votre script original
      else {
        // Convertir l'objet en format attendu pour le modèle musique
        const musiqueRecords = [];
        
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            value.forEach(item => {
              // Essayer de créer un enregistrement de musique à partir des données disponibles
              const record = {
                title: item.title || item.trait_type || '',
                artist: item.artist || '',
                album: item.album || '',
                genre: item.genre || '',
                cover: item.cover || '',
                duration: item.duration || '',
                audioUrl: item.title ? `audio/${item.title.toLowerCase().replace(/\s+/g, '-')}.mp3` : ''
              };
              musiqueRecords.push(record);
            });
          }
        }
        
        donneesMusique = musiqueRecords;
      }
    } else {
      // Si data est déjà un tableau, utiliser directement
      donneesMusique = data.map(item => ({
        title: item.title || '',
        artist: item.artist || '',
        album: item.album || '',
        genre: item.genre || '',
        duration: item.duration || '',
        cover: item.cover || '',
        audioUrl: item.title ? `audio/${item.title.toLowerCase().replace(/\s+/g, '-')}.mp3` : ''
      }));
    }
    
    console.log(`Tentative d'importation de ${donneesMusique.length} enregistrements`);
    
    if (donneesMusique.length === 0) {
      throw new Error("Aucune donnée n'a pu être extraite du fichier JSON");
    }
    
    // Créer des enregistrements avec Prisma
    // Assurez-vous que votre schéma Prisma inclut les nouveaux champs (duration, audioUrl)
    const nouvellesMusiques = await prisma.musique.createMany({
      data: donneesMusique
    });

    console.log(`${nouvellesMusiques.count} enregistrements de musique importés avec succès`);
  } catch (error) {
    console.error("Erreur lors de l'importation des données de musique:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction d'importation
importerDonneesMusique();