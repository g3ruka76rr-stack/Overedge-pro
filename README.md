# OverEdge Pro

Tu app de análisis WTA/ATP, publicada en GitHub Pages, con el Elo/yElo
actualizándose solo.

## Qué cambia respecto al HTML que ya usabas

- `index.html` es tu app de siempre (mismo motor, mismo formulario, mismo
  histórico) con un único añadido: al cargar la página, pide las 4 tablas de
  Elo/yElo a `data/*.json` (en vez de depender de lo que hubiera pegado a
  mano). El autocompletado de nombres (el `datalist` de Favorita/No favorita)
  sigue funcionando exactamente igual, solo que ahora se rellena con el dato
  fresco.
- `data/elo_wta.json`, `data/elo_atp.json`, `data/yelo_wta.json`,
  `data/yelo_atp.json` — las tablas descargadas de TennisAbstract, versionadas
  en el repo.
- `.github/workflows/update-elo.yml` — un GitHub Action que corre cada 3
  horas (y se puede lanzar a mano desde la pestaña *Actions* → *Actualizar
  Elo/yElo* → *Run workflow*), descarga las 4 tablas y comitea el JSON si hay
  cambios.
- El panel "Importar" (pegado manual) sigue ahí tal cual, por si algún día
  quieres forzar un dato a mano por encima de lo automático — no se ha
  tocado.

## Cuotas de Bet365

Siguen siendo manuales, como siempre: tú las metes en la app. No hay scraping
de Bet365 (motivo: son mucho más frágiles/agresivas contra bots que
TennisAbstract, y no compensa el riesgo para ahorrar dos números).

## Cómo actualizar manualmente el Elo/yElo en local

```
npm install
npm run update-elo
```

Sobrescribe los 4 JSON de `data/` con el dato más reciente.

## Publicar en GitHub Pages

1. Settings → Pages → Source: "Deploy from a branch", branch `main`,
   carpeta `/ (root)`.
2. La URL será `https://<tu-usuario>.github.io/<nombre-repo>/`.

## Primera carga tras publicar

El Action tarda hasta 3h en correr solo la primera vez salvo que lo lances a
mano (Actions → Actualizar Elo/yElo → Run workflow) — los 4 JSON ya vienen
con datos reales de hoy en el primer commit, así que la app funciona desde
el primer minuto aunque no hayas lanzado el Action todavía.
