# GridLab F1 — Previsioni con track record verificabile

Sito: **https://roger7111.github.io/gridlab-f1/**

Questo repository contiene la vetrina pubblica e, in `track_record/`, le
**previsioni congelate prima di ogni evento**. Non chiediamo fiducia: ogni
numero è verificabile da terzi. E il posizionamento è onesto: pubblichiamo
**probabilità calibrate e verificate** — non promettiamo di battere i bookmaker.

## Come verificare un freeze in 10 minuti

Ogni cartella `track_record/<gara>/<timestamp>_<stage>/` è una fotografia
scattata PRIMA dell'evento (lo stage `post-quali` è quello ufficiale: griglia
reale, mercato liquido). Contiene la previsione, le quote di mercato del
momento e un `MANIFEST.json`.

**1. Il timestamp non è nostro, è di GitHub.** Guarda la history del commit che
ha creato la cartella: la data del commit è la prova terza che la previsione
esisteva prima della gara. Un timestamp nel file si può falsificare; la history
di un repo pubblico no.

**2. I file non sono stati toccati dopo.** `MANIFEST.json` elenca lo SHA256 di
ogni file congelato. Ricalcolalo tu:

```powershell
Get-FileHash -Algorithm SHA256 .\<file>            # PowerShell
```
```bash
sha256sum <file>                                    # Linux/macOS
```
Se un hash non combacia col manifest, il record è compromesso: dillo pubblicamente.

**3. Nessun leakage dal futuro.** Il manifest registra anche l'hash del database
risultati (`results_db_sha256`) e il numero di gare presenti al momento del
freeze: la previsione non può aver visto l'esito.

**4. Il benchmark usa solo dati congelati.** `benchmark.json` (post-gara)
confronta modello e mercato usando ESCLUSIVAMENTE le quote (`polymarket_*.csv`)
e la previsione presenti nel freeze — mai i file live. Brier score e log-loss,
metriche standard, ricalcolabili a mano dai CSV congelati.

## Cosa mostriamo (e cosa no)

La scorecard sul sito riporta MAE, Spearman e calibrazione del modello, gare
buone e gare cattive, senza selezione. Il confronto col mercato si accumula
gara per gara: con poche gare è un aneddoto e lo trattiamo come tale. Nessun
claim comparativo finché il campione non ha potenza statistica.

## Stack

Modello Monte Carlo (30k simulazioni) su dati FastF1, ancoraggio alla griglia,
modello DNF team×circuito, calibrazione isotonica. Il codice sorgente del
modello è in un repo privato; ciò che serve per la verifica — previsioni
congelate, quote, manifest, benchmark — è tutto qui.
