# 🐟 CarpQuest: Carp Disease Explorer

An interactive, gamified study companion for the research proposal
**"Investigation and Molecular Characterization of Diseases Affecting Cultured Carps in Bangladesh"**
(Bangladesh Fisheries Research Institute, Mymensingh).

**Live site:** https://ishrakhamim.github.io/carpquest/

## What's inside

| Section | Slide | Interactive pieces |
|---|---|---|
| Meet the carps | 1 | Flip cards for 8 carp species, animated Bangladesh fisheries stats, *Pond Architect* polyculture game |
| Justification | 2 | Four deep-dive pillars, outbreak-loss calculator, One Health AMR loop |
| Objectives → Outputs | 3–4 | Click-to-trace map linking each objective to its methods and expected outputs |
| Disease atlas | background | Clickable sick-fish inspector, disease cards with filters, *Fish Doctor* diagnosis cases |
| Activity 1: Survey | 5–7 | Six-step methodology stepper, PRA toolbox, *Questionnaire clinic* game |
| Activity 2: Lab | 8 | Interactive workflow flowchart, selective-media explorer, *Mystery isolate* biochem game, antibiotic-plate reader with MAR index, Koch's postulates, histology steps |
| Molecular lab | 8 | qPCR amplification simulator (read the Ct), virulence-gene gel game, 16S/BLAST identity widget, virulence arsenal, phylogenetic tree puzzle |
| Work schedule | 9 | Gantt chart with a month scrubber |
| Knowledge graph | all | D3 force graph of ~65 linked concepts, with search and filters |
| Flashcards | all | 44 cards with Leitner-box spaced repetition |
| Quiz arena | all | Topic rounds and a 15-question *Boss Battle* with 3 lives |
| Library | 10 | 18 curated YouTube videos, 48 reference articles, glossary, printable certificate |

Gamification: XP, 7 levels (Fish Egg → Master Pathologist), 19 badges, confetti, and progress saved in the browser (`localStorage`).

## Tech

Plain HTML, CSS and JavaScript with no build step. [D3 v7](https://d3js.org/) is loaded from cdnjs for the graph and tree. The site is hosted on GitHub Pages.

```
index.html
css/style.css
js/data.js      ← all content (edit facts, quizzes, flashcards here)
js/game.js      ← XP / levels / badges / persistence
js/widgets.js   ← slide sections and mini-games
js/lab.js       ← lab & molecular simulators
js/learn.js     ← knowledge graph, flashcards, quiz, library
js/main.js      ← bootstrap & navigation
assets/img/     ← photos from the slide deck (web-optimised)
```

Run locally with `python3 -m http.server`, then open http://localhost:8000.

## Notes

- Lab simulations (breakpoints, amplicon sizes, isolate profiles, the phylogeny) are **illustrative teaching data**, labelled as such in the UI. They are not diagnostic references.
- Bangladesh fisheries figures are approximate values from DoF yearbooks. Check the latest edition.
- This is an unofficial study aid and is not affiliated with or endorsed by BFRI.
