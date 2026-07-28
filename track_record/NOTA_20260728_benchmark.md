# Nota pubblica — 28 luglio 2026

## Sospendiamo il confronto col mercato. Ecco cosa cambia e cosa no.

Da oggi i freeze di GridLab **non includono più le quote di mercato**, e la
scorecard non pubblica più il confronto modello-vs-mercato. Questa nota spiega
perché, cosa resta, e soprattutto **cosa NON abbiamo toccato**.

---

## Cosa NON abbiamo toccato: i freeze passati

**I 16 file di quote già pubblicati restano dove sono, invariati.**

Questo è il punto più importante della nota. Ogni freeze contiene un
`MANIFEST.json` con lo SHA256 di ciascun file congelato, e in
`README_TRACK_RECORD.md` chiediamo esplicitamente ai lettori di ricalcolare quegli
hash — dicendo che se non combaciano *«il record è compromesso: dillo
pubblicamente»*.

Cancellare quei file avrebbe rotto esattamente quelle verifiche. Avremmo prodotto
con le nostre mani il segnale di manomissione che abbiamo insegnato a diffidare, e
per giunta su record già pubblicati e già giudicati.

Quindi: **niente riscritture del passato.** Il cambiamento vale solo in avanti, e
ha una data — questa. Chiunque può verificare, dalla history del repository, che
il confine è dove diciamo che sia.

---

## Perché sospendiamo

La fonte che usavamo per le quote era **Polymarket**, un mercato predittivo. Dal
27 luglio 2026 Polymarket è nella blacklist dell'Agenzia delle Dogane e dei
Monopoli e non è raggiungibile dall'Italia, in quanto l'amministrazione lo
considera equiparabile a un operatore di gioco privo delle autorizzazioni
richieste dalla normativa nazionale.

GridLab è un progetto italiano. Non promuoviamo scommesse, non abbiamo link ad
operatori di gioco, non diamo consigli di gioco, e il confronto col mercato per
noi è sempre stato una **misura di accuratezza**, non un invito a puntare. Le
linee guida AGCOM sulla pubblicità del gioco escludono espressamente dal divieto i
servizi informativi di comparazione di quote — ma l'esempio che tutelano parla di
operatori concessionari.

Non abbiamo la certezza che quella tutela copra la nostra situazione. E davanti a
un'incertezza del genere, su una funzione che è **secondaria** rispetto a ciò che
facciamo, la scelta prudente è smettere e dirlo, invece di continuare sperando che
vada bene.

Preferiamo perdere una metrica piuttosto che tenerne una che non sapremmo
difendere.

---

## Cosa resta (che è quasi tutto)

La scorecard continua a pubblicare, senza selezione, gare buone e gare cattive:

- **MAE** sulle posizioni previste
- **correlazione di Spearman** tra ordine previsto e ordine reale
- **calibrazione** (ECE) — le probabilità dichiarate corrispondono alle frequenze osservate?
- le **previsioni congelate** con hash SHA256 e commit git, come sempre

Queste sono metriche **nostre**: si calcolano sul nostro modello e sui risultati
ufficiali di gara. Non dipendono da nessuna fonte terza, e non sono toccate da
questa decisione.

---

## Cosa perdiamo, detto onestamente

Perdiamo la serie modello-vs-mercato, che era il benchmark esterno più severo che
avessimo: confrontarsi con un mercato liquido è più difficile che confrontarsi con
sé stessi.

Il costo però è minore di quanto sembri, e per una ragione che avevamo già messo
per iscritto **prima** di conoscere questo problema: la nostra regola interna
vieta qualsiasi affermazione comparativa sotto le **8 gare** con intervallo di
confidenza che escluda lo zero. Eravamo lontani da quella soglia. La serie era
ancora un aneddoto, e come tale l'avevamo trattata.

Diciamo anche la cosa scomoda: il primo confronto reale, a Spa, **lo aveva vinto
il mercato** (Brier 0,039 contro 0,008 a nostro sfavore). Sospendere ora non ci
toglie un primato che non avevamo — e ci teniamo a scriverlo qui, perché una
sospensione che cadesse subito dopo una serie favorevole avrebbe tutt'altro odore.

---

## Se e quando torneremo

Il confronto con un benchmark esterno resta desiderabile e vogliamo riaverlo, a
due condizioni: una fonte con una posizione regolatoria chiara, e termini di
licenza che ne consentano la pubblicazione. Se e quando succederà, ripartiremo da
zero con una nuova serie datata — **non ricucita** a quella vecchia, perché due
fonti diverse non fanno una serie sola.

Nel frattempo, l'impegno di sempre: non chiediamo fiducia. Ogni numero che
pubblichiamo resta ricalcolabile da chiunque, e ogni cambiamento di regole viene
scritto qui, con la sua data, prima che qualcuno debba chiedercelo.

---

*GridLab, 28 luglio 2026. Modifica tecnica corrispondente: `freeze_pubblico.py`,
raccolta quote disattivata di default. Le motivazioni estese sono documentate nel
repository di sviluppo.*
