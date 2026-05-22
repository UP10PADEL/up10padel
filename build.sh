#!/bin/bash
# Ce script tourne à chaque déploiement Netlify
# Il compte les soumissions du formulaire waitlist
# et met à jour la variable JOUEURS_INSCRITS

echo "Build UP10PADEL — comptage inscriptions"

# Netlify injecte automatiquement NETLIFY_ACCESS_TOKEN dans l'environnement de build
# (différent du Personal Access Token — c'est le token interne de build)
if [ -z "$NETLIFY_ACCESS_TOKEN" ]; then
  echo "Pas de token de build — compteur à 0"
  echo "JOUEURS_INSCRITS=0" >> $NETLIFY_BUILD_BASE/.env
  exit 0
fi

SITE_ID="d2e9e084-fe47-4273-a123-55a8537dfd74"

# Appel API pour récupérer les soumissions
RESPONSE=$(curl -s -H "Authorization: Bearer $NETLIFY_ACCESS_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/forms")

COUNT=$(echo $RESPONSE | python3 -c "
import sys, json
try:
    forms = json.load(sys.stdin)
    form = next((f for f in forms if f.get('name') == 'waitlist'), None)
    print(form['submission_count'] if form else 0)
except:
    print(0)
")

echo "Inscriptions trouvées: $COUNT"
echo "JOUEURS_INSCRITS=$COUNT" >> $NETLIFY_BUILD_BASE/.env
