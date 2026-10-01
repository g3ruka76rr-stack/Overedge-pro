'use strict';
// Descarga Elo/yElo ATP+WTA en vivo de TennisAbstract y los deja en /data como
// JSON, en el MISMO formato de objeto que OverEdge Pro ya espera en
// ELO_WTA/ELO_ATP/YELO_WTA/YELO_ATP (ver index.html). Pensado para correr
// desde el workflow de GitHub Actions (.github/workflows/update-elo.yml),
// pero funciona igual en local con `node scripts/update_elo.js`.
const fs = require('fs');
const path = require('path');
const TA = require('./lib/tennisabstract.js');

const DATA_DIR = path.join(__dirname, '..', 'data');

async function main() {
  console.log('Descargando Elo/yElo de TennisAbstract...');
  const [eloWta, eloAtp, yeloWta, yeloAtp] = await Promise.all([
    TA.descargarEloRatings('WTA'),
    TA.descargarEloRatings('ATP'),
    TA.descargarYEloRatings('WTA'),
    TA.descargarYEloRatings('ATP'),
  ]);

  if (!eloWta.length || !eloAtp.length || !yeloWta.length || !yeloAtp.length) {
    throw new Error(
      `Descarga sospechosamente vacia (WTA elo=${eloWta.length}, ATP elo=${eloAtp.length}, ` +
      `WTA yelo=${yeloWta.length}, ATP yelo=${yeloAtp.length}) -- no se escribe nada, ` +
      `para no pisar datos buenos con datos malos.`
    );
  }

  const actualizado = new Date().toISOString();
  const escribir = (nombre, datos) => {
    const destino = path.join(DATA_DIR, nombre);
    fs.writeFileSync(destino, JSON.stringify({ actualizado, n: datos.length, data: datos }, null, 0));
    console.log(`  ${nombre}: ${datos.length} filas`);
  };

  fs.mkdirSync(DATA_DIR, { recursive: true });
  escribir('elo_wta.json', eloWta);
  escribir('elo_atp.json', eloAtp);
  escribir('yelo_wta.json', yeloWta);
  escribir('yelo_atp.json', yeloAtp);

  console.log('OK --', actualizado);
}

main().catch((e) => {
  console.error('FALLO actualizando Elo/yElo:', e.message);
  process.exit(1);
});
