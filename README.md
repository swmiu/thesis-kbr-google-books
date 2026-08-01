# KBR × Google Books Digitization: Metadata Analysis

A data-driven analysis of KBR's (Royal Library of Belgium) Google Books digitization project corpus, examining 1,000 bibliographic records sampled from a deduplicated pool of 68,036 unique bibliographic records (originally 86,636 document units). This project forms the practical component of an Advanced Master's thesis in Digital Humanities at KU Leuven (2025-2026).

**Live website**: [thesis-kbr-google-books.vercel.app](https://thesis-kbr-google-books.vercel.app)

## Research Scope

Using MARC 21 metadata exported from KBR's Syracuse catalogue, this project analyses the sample across four dimensions: temporal distribution (1602-1901), linguistic diversity (11 language categories, including "multiple languages"), publisher market share and language profiles (374 distinct authority-controlled publishers), and geospatial scope (26 countries, 189 cities). A proportional stratified sample of 1,000 records was drawn from a deduplicated pool of 68,036 unique records, allocating 810 to M-SLZ and 190 to M-RP, following the 81.1% / 18.9% ratio observed in the source file before deduplication.

## Repository Structure

```
thesis-kbr-google-books/
├── notebooks/                        ← Pipeline notebooks (execute in order)
│   ├── 0_sampling.ipynb              ← Step 0: Stratified sampling (N=1,000)
│   ├── 1_extract_from_xml.ipynb      ← Step 1: MARCXML to relational CSVs
│   ├── 2_clean_cities.ipynb          ← Step 2a: City name standardization
│   ├── 2_clean_publishers.ipynb      ← Step 2a: Publisher name cleaning
│   ├── 3_integrate_relational_data_step3.ipynb  ← Step 3: Data integration
│   └── 4_visualize_step4.ipynb       ← Step 4: Chart generation
├── data/
│   ├── raw/                          ← Step 1 outputs + cleaning intermediates
│   ├── cleaned/                      ← Step 2 outputs (standardised entities)
│   ├── integrated/                   ← Step 3 outputs (analytical CSVs)
│   ├── openrefine_projects/          ← OpenRefine project archives
│   └── visualizations/               ← Step 4 outputs (interactive HTML charts)
├── website/                          ← Deployed website (Vercel root)
│   ├── index.html
│   ├── css/                          ← Design tokens, styles, responsive queries
│   ├── js/                           ← Navigation and chart resize logic
│   ├── assets/images/                ← Banner illustrations
│   └── data/visualizations/          ← Charts embedded via iframe
├── docs/                             ← Design and deployment documentation
├── METHODOLOGY.md                    ← Full pipeline documentation
└── LICENSE
```

## Data Pipeline

The pipeline follows a six-step modular architecture, with each step producing independently verifiable outputs:

1. **Sample** (notebook 0): Proportional stratified sampling from KBR's operational inventory
2. **Extract** (notebook 1): MARCXML parsing into 7 relational CSV tables (3NF schema)
3. **Clean** (notebook 2): Python syntactic normalization + OpenRefine/Wikidata reconciliation for cities
4. **Integrate** (notebook 3): Relational merging into 6 domain-specific analytical tables
5. **Visualize** (notebook 4): Plotly and Folium chart generation
6. **Deploy**: Static website on Vercel with GitHub auto-deployment

## Tools and Libraries

- **Python**: pandas, xml.etree.ElementTree, Plotly, Folium
- **Data cleaning**: OpenRefine with Wikidata reconciliation
- **Website**: HTML/CSS/JS (Jost + Source Serif 4 via Google Fonts)
- **Deployment**: Vercel (Hobby plan), GitHub

## Reproducing the Pipeline

1. Clone this repository
2. Obtain the KBR operational inventory file (`0423_Q1_list_all_works_GB.csv`) and place it in `data/raw/`
3. Execute notebook 0 to generate the stratified sample of 1,000 catalogue identifiers (`Q1_kbr_idn_list.txt`)
4. Request the corresponding MARCXML export (`0506_Q1_metadata.xml`) from KBR staff using the generated identifier list, and place it in `data/raw/`
5. Execute notebooks 1 through 4 in sequence
6. Generated charts will appear in `data/visualizations/`

Note: The original KBR source files are not included in this repository due to institutional data access concerns.

## Author

Yung-En Wong.
KU Leuven, Advanced MA in Digital Humanities, 2025-2026.

Banner illustrations by Yung-Heng Wong.

## AI Tools Disclosure

This project was developed using Claude (Anthropic) and Gemini (Google) as assistive tools for iterative development, including code generation, debugging, methodology discussion, work documentation, and writing refinement. The results of this project remain the full responsibility of the author.

## License

See [LICENSE](LICENSE) for details.
