### **Data Pipeline: From MARCXML to Geospatial-Temporal Visualization**

#### **STEP 0: SAMPLE (Proportional Stratified Sampling)**

* **Input Data**: Master operational repository file `0423_all_works_GB.csv` containing the comprehensive holdings selected for the digitization initiative.
* **Development Tools**: Python (`pandas`).
* **Sampling & Cleaning Heuristics**:
  * **Data Integrity & De-duplication**: Primary de-duplication is enforced prior to stratification. The pipeline filters redundant entries strictly based on the unique Identification Number (`IDN`) control column, retaining exclusively the first system record occurrence to secure statistical validity.
  * **Proportional Stratification**: To ensure a representative subset that accurately preserves the distribution characteristics of the master inventory, a target collection size of $N=1,000$ records is established. The sample allocation is mathematically partitioned according to the historical ratio between library cohorts: **81% for general holdings (`M-SLZ`, $n=810$)** and **19% for rare/precious physical entities (`M-RP`, $n=190$)**.
  * **Algorithmic Reproducibility**: To guarantee identical output serialization across different programmatic runtime execution runs, a fixed pseudo-random number generator (PRNG) seed is bound to the process via `random_state=42`.
  * **Automated Quality Assurance (QA)**: Post-generation pipeline evaluation is managed algorithmically to assert three strict formatting parameters: (1) exact match of the global sample bound ($N=1,000$ items), (2) zero record key collision (uniqueness set verification), and (3) alphanumeric pattern matching scans (filtering potential scientific notation conversion bugs or floating-point formatting drift like `.`, `+`, or `E`) to verify that all output tokens remain pristine integer keys.
* **Outputs**: `Q1_kbr_idn_list.txt` (a single-column, newline-delimited operational plain-text payload mapping the 1,000 sampled internal identifiers).


#### **STEP 1: EXTRACT (XML to Relational CSVs)**

* **Input Data**: `0506_Q1_metadata.xml` (1,000 historical bibliographic records in KBR MARCXML format).  
* **Development Tools**: Python (`xml.etree.ElementTree`, `pandas`).  
* **Extraction & Modeling Heuristics**:  
  * **Book ID (IDN)**: Extracted from MARC field `001` (Control Number) as the primary key (`book_id`) for each bibliographic record.  
  * **Title**: Extracted from MARC field `245`.  
  * **Year**: Extracted strictly from MARC field `008` positions `07–10` (Date 1\) to capture the primary and initial publication year. While certain records in the collection indicate multi-year publication spans via Date 2 (MARC `008` positions `11–14`), this pipeline deliberately focuses on the initial year of publication. This strategic decision aligns with the core research question regarding the chronological trends of cultural production, ensures statistical consistency across all analytical metrics, and effectively prevents the double-counting of single bibliographic entities in temporal distributions.  
  * **Language**: Extracted from the first occurrence of subfield `041 $a`. If a record contains more than one language value within `041 $a`, it is systematically categorized under a unified string as `"multiple languages"`. This heuristic decision streamlines linguistic aggregation during data visualization and adheres to the **Europeana convention** for multi-lingual metadata schema mapping, thereby optimizing collection-level statistical representation while respecting international digital cultural heritage standards.  
  * **Cities (Multi-valued Relational Extraction)**: Extracted from MARC field `264 $a` (Place of publication). Since historical books frequently feature multi-centered publication networks (e.g., co-published across multiple historical cities), field `264 $a` can contain multiple values per record. To map these spatial trajectories without violating database normalization standards (3NF), a many-to-many relation is established using a dedicated bridge table.  
  * **Countries (Multi-valued Relational Extraction)**: Extracted from MARC field `044 $a` (Country of publication code). All extracted country codes were manually verified against the official Library of Congress MARC Code List for Countries to ensure empirical accuracy and eliminate historical code ambiguities. Similar to cities, a bibliographic item can represent co-publications spanning multiple geopolitical entities, so a many-to-many bridge table is implemented.
  * **Publishers (Complex Relational Extraction)**: To maintain authority control over corporate and personal entities, the pipeline bypasses the raw transcription strings in `264 $b`. Instead, it conducts a cross-field diagnostic sweep across fields `100`, `110`, `700`, `710`, and `720`. It extracts the character string from subfield `$a`(Name) **only if** the corresponding subfield `$4` (Relator Code) equals `"pbl"` (Publisher). Given that historical editions frequently involve multiple co-publishers, this multi-valued entity requires a dedicated relational bridge structure.  
* **Relational Schema (3NF Target Architecture \- 7 CSV Files)**:  
  * `books.csv` (`book_id`, `title`, `year`, `language`) → *Core catalogue table preserving one-to-one attributes.*  
  * `book_cities.csv` (`book_id`, `city_name`) → *Bridge table managing multi-city publication networks.*  
  * `cities.csv` (`city_name`) → *De-duplicated base entity list extracted for OpenRefine cleaning.*  
  * `book_countries.csv` (`book_id`, `country_code`) → *Bridge table for multi-country publications.*  
  * `countries.csv` (`country_code`) → *De-duplicated base reference reference.*  
  * `book_publishers.csv` (`book_id`, `publisher_name`) → *Bridge table for multi-publisher networks.*  
  * `publishers.csv` (`publisher_name`) → *De-duplicated authority source list.*  
* **Outputs**: 7 foundational relational CSV files separating structural catalogue entities from multi-valued data networks.


#### **STEP 2: CLEAN (Standardization & Semantic Enrichment)**

* **2a. Python Baseline Preprocessing (Syntactic Cleaning)**  
  * **Tools**: Python (`pandas`, `re`, `country_mapping.py module`).  
  * **Targets**: `cities.csv`, `countries.csv`, `publishers.csv`.  
  * **Logic**: 
    * **Cities**: Multi-stage syntactic normalization addressing historical MARC metadata: (1) multilingual "place unknown" consolidation to Unknown; (2) iterative removal of publication prefixes (A, Tot, et se vend, Herdruckt); (3) MARC editorial symbol stripping; (4) Latin inflection mapping (Parisiis→Paris, Bruxellis→Bruxelles); (5) whitespace normalization and Title Case with preservation of hyphenated place names. Dual-column retention of city_name_raw and city_name_cleaned preserves relational integrity. Output: 270 raw-to-cleaned mappings consolidated into 238 unique canonical forms.
    * **Countries**: MARC 21 codes mapped to standardized English country names using the `country_mapping` module, consolidating regional variants (England, Scotland→United Kingdom) and isolating ambiguous codes (Unknown).
    * **Publishers**: Syntactic cleaning to normalize orthography, strip metadata noise, and handle authority-controlled identifiers from the KBR Syracus system. The pipeline implements a multi-stage approach: (1) standardization of missing values (e.g., "[s.n.]" to "Unknown"); (2) elimination of encoding artifacts; (3) stripping of bracketed supplementary metadata (e.g., occupational designations); (4) removal of terminal occupational suffixes (e.g., imprimeur, libraire, éditeur) that describe professional role rather than the official entity name; and (5) unification of conjunction notation (" et " → " & ") to resolve multilingual inconsistencies. Dual-column retention is maintained to support data provenance.
  * **Outputs**: `cities_cleaned_step2a.csv` (238 unique cities); `country_mapping.py` (30 standardized country names); `publishers_cleaned.csv` (374 canonical forms from 376 raw entries).
 
* **2b. OpenRefine Semantic Enrichment (Targeted Entity Reconciliation)**  
  * **Tools**: OpenRefine, Wikidata Reconciliation Service.  
  * **Targets**: `cities_cleaned_step2a.csv`.
  * **Logic**:  
    * **Geospatial Reconciliation & Enrichment**:
    Using OpenRefine, standardized names were mapped to unique Wikidata Q-identifiers. This involved a manual disambiguation workflow to resolve homonyms (e.g., distinguishing between administrative municipalities and local infrastructure) and correct ambiguous matches.

    For entities lacking valid Wikidata matches or geospatial attributes, latitude and longitude values were intentionally preserved as `null` to maintain data integrity and prevent programmatic speculation on uncertain geospatial locations. Canonical coordinates were harvested via the Wikidata API to establish a unified framework for micro-geospatial visualization.

    **Results**: Of the 270 processed entries, 262 were successfully reconciled with Wikidata entities and assigned authoritative geospatial coordinates, consolidating multiple orthographic variants (e.g., Brussels, Bruxelles, Bruxellae) into unified identifiers. The remaining 8 unmatched entries retain null coordinates.
    
    * **Note on Publishers**: Semantic enrichment for publishers was deprioritized. Given the aggregation-centric visualization goals (e.g. Treemap), Python-based syntactic cleaning proved sufficient for market share analysis, thereby avoiding the introduction of external noise from Wikidata and maintaining strict adherence to KBR authority control data.  
* **Outputs**: `cities_cleaned.csv` (enriched with geospatial coordinates) and `publishers_cleaned.csv` (standardized labels for proportional visualization).

#### **STEP 3: INTEGRATE (Relational Data Pipeline Merging)**

* **Input Data**: 7 relational and enriched CSV tables derived from Steps 1 & 2 (`books.csv`, `book_cities.csv`, `cities_cleaned.csv`, `book_countries.csv`, `countries.csv`, `book_publishers.csv`, `publishers_cleaned.csv`), and the Python reference module country_mapping.py.  
* **Development Tools**: Python (`pandas`).  
* **Country Code Reference Dictionary**: MARC 21 044 country codes (2–3 character format) are resolved against the Library of Congress country code registry ([https://www.loc.gov/marc/countries/cou\_home.html](https://www.loc.gov/marc/countries/cou_home.html)). All codes present in the dataset are manually verified and mapped to canonical country names in a reference dictionary, ensuring complete geographical resolution without loss of provenance.  
* **Merging & Integration Workflow**:
To ensure data integrity during the integration of authority-controlled entities (Publishers and Cities), a two-stage chain-merge strategy is implemented for cities and publishers:  
  1. **Geospatial Join**: First, join books.csv with `book_cities.csv` (`on='book_id'`). Second, merge the resulting dataset with `cities_cleaned.csv` (`left_on='city_name', right_on='city_name_raw'`), appending the harvested `latitude`, `longitude`, and `wikidata_id` coordinates.  
  2. **Core Catalog Join**: Bind the resulting geospatial subset to the primary bibliographic database `books.csv` using the unified `book_id` (`on='book_id'`).  
  3. **Geopolitical Mapping**: Map the multi-valued `book_countries.csv` bridge table against the `country_mapping.py` dictionary to resolve MARC 044 codes into human-readable country names, then merge into the core catalog (`on='book_id'`).
  4. **Authority Network Join**: First, join `books.csv` with `book_publishers.csv` (`on='book_id'`). Second, merge the resulting dataset with `publishers_cleaned.csv` (`left_on='publisher_name', right_on='publisher_name_raw'`), incorporating the multi-valued corporate/personal entity network.
* **Data Dimension Strategy**: 
  To preserve the multifaceted nature of library metadata, this pipeline generates five modular, domain-specific analytical tables rather than a single denormalized table. This prevents cartesian product inflation (where multi-valued fields like cities and publishers would cause row count distortion).
  * **Pipeline 1**: Year Analytics (Temporal Dimension): Standardizes `year` via casting to `Int64`, filtering invalid NULL/zero entries. Produces a 987-record dataset (1602–1901) for frequency distribution.
  * **Pipeline 2**: Language Analytics (Linguistic Dimension): Direct extraction from field 041 $a; categorizes multi-lingual records as "multiple languages" per Europeana conventions.
  * **Pipeline 3**: Country Analytics (Geopolitical Dimension): Aggregates 1,014 one-to-many relationships, identifying 26 unique countries. Multi-country publications are preserved as distinct rows to represent co-publication networks.
  * **Pipeline 4**: Publisher Analytics (Commercial Dimension): Syntactic cleaning applied to 476 authority-controlled relationships. 1,024-row dataset maintains multi-publisher associations, preserving the commercial diversity of the collection.
  * **Pipeline 5**: City Analytics (Geospatial Dimension): 1,073-row dataset mapping raw MARC locations to standardized Wikidata coordinates. 98% geospatial coverage (1,052/1,073) enables precise cartographic representation. 

* **Outputs**: 6 integrated analytical CSVs in `data/integrated/` (`year_analytical.csv`, `language_analytical.csv`, `country_analytical.csv`, `publisher_analytical.csv`, `city_analytical.csv`, `city_map_filtered.csv`).

#### **STEP 4: VISUALIZE (Multi-dimensional Dashboard Generation)**

* **Input Data**: Six integrated analytical CSVs from Step 3 (`year_analytical.csv`, `language_analytical.csv`, `country_analytical.csv`, `publisher_analytical.csv`, `city_map_filtered.csv`).  
* **Development Tools**: Python (`Plotly`, `Folium`).  
* **Analytical Dimensions & Plot Types, and Algorithmic Logic:**  
  1. **Temporal Analysis**: Year Distribution — Plotly Bar/Histogram illustrating shifting publication outputs based strictly on the primary year captured from `008 pos. 07-10`. *Data handling*: To prevent statistical distortion from multi-valued row expansion, the dataframe is programmatically de-duplicated using `df.drop_duplicates(subset=['book_id'])` before rendering.  
  2. **Linguistic Analysis**: Language Distribution — Plotly Pie chart displaying collection holdings, explicitly isolating multi-lingual records using the `"multiple languages"` heuristic derived from field `041 $a`. *Data handling*: Leverages the same de-duplicated dataframe to ensure an accurate physical book count.  
  3. **Macro-Geospatial Analysis**: Country Distribution — Plotly Bar chart aggregating book outputs across geopolitical boundaries. Since a single book may be co-published in multiple countries, we preserve the expanded rows from the `book_countries.csv` join. This means a book with two co-publishers in Belgium and France contributes to both country counts, accurately reflecting the geographical scope of the publication network.  
  4. **Production & Network Analysis (Temporal Dimension)**: Publisher Market Share — Plotly Treemap with a three-level hierarchy (Period → Publisher → Individual Book Title), illustrating commercial market share across the six analytical time periods. *Data handling*: Publishers are filtered to those with a within-period publication count of two or more, retaining the top 30 period-publisher segments by volume; this threshold mitigates visual noise from the long tail of single-title publishers (351 of 374 total publishers appear in only one period) while preserving genuine commercial concentration patterns. Drill-down to the third level exposes individual book titles and publication years for qualifying publishers, supporting close reading alongside the aggregate view. Tile coloring follows a six-period KBR-branded palette; text contrast (white vs. dark gray) is computed programmatically per tile based on background luminance to ensure WCAG-compliant readability.  
  5. **Production & Network Analysis (Linguistic Dimension)**: Publisher Language Distribution — Plotly stacked horizontal bar chart visualizing the linguistic profile of the same publisher subset used in the Treemap (identical filtering logic: within-period count ≥ 2, top 30 segments), ensuring both publisher visualizations draw from a consistent, academically justified population. *Design rationale*: A publisher-by-period temporal heatmap was initially developed as the second publisher-focused chart but was discarded after evaluation revealed it produced an almost entirely sparse grid — among the dataset's 374 publishers, only 18 are active across two or more periods, and none across three or more, leaving the heatmap with negligible analytical value. The stacked bar chart instead introduces a genuinely distinct analytical dimension (language) rather than duplicating the Treemap's temporal framing, distinguishing single-language specialist publishers (e.g., predominantly French-language houses) from multilingual or internationally-oriented publishers.  
  6. **Micro-Geospatial Mapping**: Cities Map — Interactive Folium map leveraging coordinates harvested from Wikidata, utilizing the exact `latitude` and `longitude` pairs harvested via OpenRefine. Each city is represented as a `CircleMarker` where the radius (in pixels) directly corresponds to the absolute volume of books published in that locality (e.g., radius=264 for Paris if 264 books were published there). This unscaled representation preserves the publication network's true geographical disparities, allowing readers to visually comprehend the concentration of publishing activity in major European urban centers during the 1600–1901 period.  
* **Outputs**: 6 independent, fully interactive dashboard components saved as modular HTML entities: `year_distribution.html`, `language_distribution.html`, `country_distribution.html`, `publisher_treemap.html`, `publisher_language_bar.html`, and `cities_map.html`.

#### **STEP 5: DEPLOY**

The website is built as a static site deployed on Vercel (Hobby plan, team workspace `2026KULDH`) via GitHub auto-deployment. The Vercel Root Directory is set to `website/`, and visualisation HTML files are stored within `website/data/visualizations/` to keep all served assets under a single deployment root. Each visualisation is exported as a standalone HTML file and embedded via iframe, allowing individual charts to be updated independently without rebuilding the entire site. Every `git push` to the `main` branch triggers automatic redeployment; the Git local `user.email` must match the Vercel account email to avoid blocked deployments on the Hobby plan.

Visual design follows a palette derived from KBR's institutional branding, with the primary green deepened to `#172D20` for improved text contrast. The content area background uses `#D6D3C6`, the sidebar and chart description panels use `#E5E3D7`, and the active sidebar link colour is `#BDA999`. Typography uses Jost (weight 500) for headings and navigation labels, and Source Serif 4 for body text, both loaded via Google Fonts. Page banners use the `<picture>` element with `<source media="(max-width: 767px)">` to serve optimised mobile banner images (1620x400px) alongside desktop versions (1620x400px); banner illustrations are by Yung-Heng Wong. Accessibility was a deliberate consideration: text contrast on chart elements is computed programmatically based on background luminance to meet WCAG AA standards, and WCAG heading hierarchy and landmark structure were corrected (commit `8bc1225`). The layout is responsive, adapting to desktop (sidebar 300px), tablet (sidebar 200px), and mobile (sidebar hidden, hamburger menu) breakpoints. On mobile viewports, chart iframes are assigned `min-width: 800px` with `overflow-x: auto` on the container to enable horizontal scrolling for complex charts, and `Plotly.Plots.resize()` is called on iframe load to ensure correct chart rendering. The `http.postBuffer` Git config is set to `524288000` to accommodate large HTML file pushes (~23MB).

Production URL: `https://thesis-kbr-google-books.vercel.app`

Academic documentation is provided in `METHODOLOGY.md`, covering all pipeline decisions including strict `001` IDN control, `008` Date 1 parsing, the `"multiple languages"` grouping rule, the `1XX/7XX $4="pbl"` authority mapping, the 3NF bridge table schema, deduplication heuristics, and the rationale for replacing the Publisher Timeline Heatmap with a Publisher Language Distribution chart.

#### **AI Tools Usage**

AI tools (Claude by Anthropic; Gemini by Google) were used throughout the development process as iterative development aids. The author initiated all tasks, evaluated and revised all AI-generated outputs, and retained full responsibility for analytical decisions and academic interpretations. AI tools were not used for data interpretation, research question formulation, or academic argumentation. Specific usage by pipeline stage:

* **Steps 0-3 (Sampling, Extraction, Cleaning, Integration)**: Code generation and debugging for Python scripts handling MARCXML parsing, data cleaning logic, and relational data integration. All extraction heuristics (e.g., MARC field selection, authority control filtering) were designed and validated by the author; the bridge table schema was developed through iterative discussion between the author and AI tools based on the author's requirements.
* **Step 4 (Visualization)**: Plotly and Folium chart code generation and configuration. Chart type selection, color schemes, and interactive behaviour (e.g., which elements respond to user clicks) were determined by the author through iterative discussion with AI tools; design decisions such as replacing the Publisher Timeline Heatmap with a Language Distribution bar chart were made by the author based on data evaluation.
* **Step 5 (Website and Deployment)**: The author provided mockups, color specifications, and reference websites; AI tools generated the initial HTML/CSS/JavaScript framework. The author directed iterative refinements including typography, banner image implementation, and responsive layout adjustments, and structured the site's page architecture to reflect the research logic (temporal, linguistic, publisher, and geospatial dimensions). AI tools assisted with Vercel deployment configuration and Git workflow troubleshooting.
* **Documentation**: Drafting and structuring of METHODOLOGY.md, README.md, and STEP_4_DESIGN_AND_DEPLOYMENT.md. All content was reviewed and revised by the author.