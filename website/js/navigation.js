// Navigation Logic: Page switching, sidebar toggle, dynamic banner colors

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContent = document.getElementById('pageContent');
    
    // Toggle sidebar on mobile
    hamburgerBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            
            // Update active link styling
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            loadPage(pageName);
            sidebar.classList.remove('active');
            window.scrollTo(0, 0);
        });
    });
    
    // Load introduction on initial load
    loadPage('introduction');
});

function loadPage(pageName) {
    const pageContent = document.getElementById('pageContent');
    
    // Banner color mapping for 8 pages
    const pageColors = {
        'introduction': '#3D6B52',
        'temporal_framework': '#D4A4A0',
        'language_distribution': '#F4D547',
        'publisher_market': '#A64E7C',
        'publisher_language': '#A64E7C',
        'country_distribution': '#4BA3D6',
        'publishing_hubs': '#E8956E',
        'methodology': '#1A3A5C'
    };
    
    // Update nav link active color to match banner
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.style.backgroundColor = '';
    });
    
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    activeLink.classList.add('active');
    activeLink.style.backgroundColor = '#595959';
    
    // 8-page content mapping
    const pages = {

        'introduction': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Introduction</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-1.PNG">
                    <img src="assets/images/banner-1.jpg" alt="Introduction to the Project">
                </picture>
            </div>
            <div class="chart-description">
                <h2>Project Overview</h2>
                <p>KBR — the Royal Library of Belgium — is Belgium's national scientific library, holding close to eight million objects spanning centuries of European cultural heritage. In 2022, KBR formalised a partnership with Google Books to digitise its historical collections, covering works from the 17th to the end of the 19th century, and make them freely accessible worldwide via both Google Books and BELGICA, KBR's own digital platform. Over the three-year project period from 2023 to June 2026, approximately 100,000 volumes were digitised and made available online.</p>
                <p>This project grows directly out of that digitisation effort. As part of an Advanced Master's thesis in Digital Humanities at KU Leuven, the author completed a research internship at KBR's Digitisation unit from March to June 2026, working on the Google Books @ KBR project. The internship involved retrieving books from conservation stacks, verifying and enriching catalogue metadata, assigning barcodes, and assessing the condition of fragile volumes — tasks that sit at the very beginning of the digitisation pipeline, before a single page is scanned, and that require close, hands-on engagement with the physical collection.</p>
                <p>The 1,000 bibliographic records at the heart of this analysis were drawn directly from that experience. On 23 April 2026, with the project approaching its closing date, the author wrote a Python script to randomly sample 1,000 records from the 86,637 catalogue entries updated through the project's cataloguing work. KBR library staff then exported those records as MARC 21 XML from the institutional catalogue system — the starting point of an analytical pipeline built from scratch, from raw XML to the interactive visualisations presented on this site.</p>
            </div>
            
            <h2>About This Dataset</h2>
            <div class="chart-description">
                <p>The 1,000 records analysed here represent a stratified random sample drawn from 86,567 catalogue entries updated by the Google Books @ KBR team across two main collection sections: M-SLZ (Salle de Lecture Générale, general reading room collection, approx. 81%) and M-RP (Réserve Précieuse, rare works predating Belgian independence in 1830, approx. 19%). The sampling ratio mirrors the population distribution between these two sections, ensuring proportional representation. Seventy records from other minor sections were excluded, as their low volume and heterogeneous metadata formats spanning music scores, periodicals, and other specialist materials would have introduced noise incompatible with a consistent bibliographic pipeline. Because all sampled records had already been verified and enriched by trained cataloguers during the project, the dataset benefits from a level of metadata quality rarely available in large-scale computational analyses.</p>
            </div>
            
            <h2>Why 1602–1901?</h2>
            <div class="chart-description">
                <p>In the European Union, Google Books digitises only works no longer subject to copyright, defined as publications older than 125 years. With 2026 as the project's closing year, this places the upper boundary of the eligible collection at 1901. The lower boundary of 1602 is not an imposed constraint but an emergent one: it is simply the earliest publication year present in this sample, reflecting the natural historical depth of KBR's holdings. Together, these dates frame a 300-year window of European print culture, from the early modern book trade to the industrialised publishing of the late 19th century, and define the temporal scope of every visualisation on this site.</p>
            </div>
            
            <h2>Research Questions</h2>
            <div class="chart-description">
                <p>This project asks a straightforward question: what can 1,000 bibliographic records tell us about the character of KBR's Google Books collection? The visualisations on this site approach that question from four angles. Temporally, how did publication output shift across three centuries? Linguistically, which languages dominate the collection, and how diverse is it beyond French? Geographically, which cities and countries formed the core of the European publishing network represented here? And commercially, which publishers were most active, and what does their linguistic profile reveal about the broader publishing ecosystem of the period? No single chart answers all of these questions, but together they sketch a portrait of a collection that is historically deep, geographically concentrated, and linguistically varied in ways that reflect the intellectual currents of 19th-century Europe.</p>
            </div>
        `,
        
        'temporal_framework': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Temporal Framework</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-2.PNG">
                    <img src="assets/images/banner-2.jpg" alt="Temporal Framework: Year Distribution">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/year_distribution.html" title="Year Distribution Chart"></iframe>
            </div>
            <div class="chart-description">
                <h2>Year Distribution</h2>
                <p>The chart maps publication dates across the 1,000-record sample, revealing how output is distributed across three centuries of print history. The pronounced concentration in the post-1830 period reflects the composition of the sample itself: approximately 81% of records come from M-SLZ (Salle de Lecture Générale), comprising works published from 1830 onwards and reflecting Belgium's relatively recent national history, while the remaining 19% from M-RP (Réserve Précieuse) account for the earlier centuries. The 1861–1890 period alone represents 39.1% of all records, with the decades either side also showing elevated activity. These patterns describe the profile of this particular sample within the Google Books @ KBR project, not European publishing output as a whole. The range slider beneath the chart allows readers to zoom into specific decades for a closer look at year-by-year variation.</p>
            </div>
        `,
        
        'language_distribution': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Language Distribution</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-3.PNG">
                    <img src="assets/images/banner-3.jpg" alt="Linguistic Diversity: Language Distribution">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/language_distribution.html" title="Language Distribution Chart"></iframe>
            </div>
            <div class="chart-description">
                <h2>Language Distribution</h2>
                <p>French dominates this collection at 65.5%, reflecting KBR's institutional identity and the historical dominance of French within Belgium's administrative and intellectual elite during the 19th century. The two other official languages of Belgium follow at a distance: German at 9.2% and Dutch at 8.8%. Latin, at 2.8%, marks the presence of older scholarly and ecclesiastical works in the collection.</p>
                <p>Beyond these four, the sample spans a further six languages across multiple language families: English (5.3%), Italian (4.3%), Spanish (1.8%), Portuguese (0.5%), Russian (0.4%), and Swedish (0.1%), pointing to the breadth of KBR's acquisition scope beyond the French-speaking world. A small number of records (1.3%) carry multiple language codes and are grouped as "multiple languages" following the Europeana convention. Across 10 distinct languages, the collection is more diverse than its French-dominant profile might suggest. The interactive legend allows readers to isolate individual languages for comparison.</p>
            </div>
        `,
        
        'publisher_market': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Publisher Market</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-4-1.PNG">
                    <img src="assets/images/banner-4-1.jpg" alt="Publisher Analysis: Market Share">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/publisher_treemap.html" title="Publisher Treemap Chart"></iframe>
            </div>
            <div class="chart-description">
                <h2>Publisher Market Share</h2>
                <p>Only 452 of 1,000 books (45.2%) carry publisher information in the MARC authority fields, a limitation typical of older cataloguing practices. These 452 records map to 374 distinct publisher names. The Treemap visualises relative market share across six time periods. The 1861–1890 period (bright yellow) dominates, consistent with the temporal distribution of the full collection. Publisher activity varies sharply across periods: some firms were active for decades, others for only a single decade. Tile size represents publication volume; colour represents time period. Largest publishers in each era occupy proportionally larger tiles, allowing rapid visual assessment of competitive positioning across a century of European publishing.</p>
            </div>
        `,

        'publisher_language': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Publisher Language</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-4-2.PNG">
                    <img src="assets/images/banner-4-2.jpg" alt="Publisher Analysis: Language Profile">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/publisher_language_bar.html" title="Publisher Language Distribution Chart"></iframe>
            </div>
            <div class="chart-description">
                <h2>Publisher Language Profile</h2>
                <p>The stacked horizontal bar chart reveals the linguistic specialisation of major publishers. Some publishers focused almost exclusively on French-language works (reflecting KBR's institutional identity), while others — particularly German, Belgian, and Swiss publishers — served more linguistically diverse markets. The chart identifies both French-language specialists (left-aligned dominance) and polyglots (more evenly distributed colours). This linguistic profile hints at broader publishing ecosystems: French publishers typically served the francophone intellectual market, while publishers in multilingual regions (Belgium, Switzerland) catered to polyglot audiences. The presence of non-French languages from even specialized publishers underscores the reality of 19th-century European intellectual exchange, which frequently crossed linguistic boundaries.</p>
            </div>
        `,
        
        'country_distribution': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Country Distribution</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-5-1.PNG">
                    <img src="assets/images/banner-5-1.jpg" alt="Geospatial Scope: Country Distribution">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/country_distribution.html" title="Country Distribution Chart"></iframe>
            </div>
            <div class="chart-description">
                <h2>Country Distribution</h2>
                <p>This chart maps the geopolitical scope of the collection across 26 countries, based on publication country codes recorded in the MARC metadata. Belgium leads with 383 records, followed closely by France with 352, together reflecting KBR's institutional location and the French-language dominance of the collection. Germany (98), Italy (43), the United Kingdom (39), and the Netherlands (25) follow, reflecting the broader European reach of KBR's acquisitions. A small number of records (12) carry unresolved country codes and are listed as Unknown.</p>
                <p>The heavy concentration in Belgium and France (73% combined) reflects both the geographical proximity of KBR to francophone Europe and the library's historical acquisition patterns. The presence of publications from 24 other countries across the continent underscores the library's role as a repository of pan-European intellectual and cultural heritage. This distribution is typical of large national libraries drawing on centuries of systematic acquisition.</p>
            </div>
        `,
        
        'publishing_hubs': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Publishing Hubs</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-5-2.PNG">
                    <img src="assets/images/banner-5-2.jpg" alt="Geospatial Scope: Publishing Hubs">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/cities_map.html" title="Cities Map" style="height: 700px;"></iframe>
            </div>
            <div class="chart-description">
                <h2>Publishing Hubs</h2>
                <p>The interactive map shows 189 distinct publication cities across Europe, with circles sized and coloured to represent publication volume. Major publishing centres — Paris (264 books), Brussels (140), Amsterdam (68), Bruxelles, and Berlin — emerge as dominant nodes in the pan-European publishing network. These cities were the commercial and intellectual hubs where books were produced, marketed, and distributed, both within their home countries and across borders through international trading networks.</p>
                <p>The geographic concentration around the Low Countries, France, and Germany reflects both KBR's acquisitional scope and the historical reality of European print culture in the 19th century. Smaller secondary centres (Rome, London, Vienna) appear as medium and small circles, marking the presence of important regional publishing activity. The unscaled circle sizes are intentional: compressing the scale would obscure the genuine concentration of historical publishing activity in a small number of major cities. Hover over any circle to see the city name and publication count.</p>
            </div>
        `,
        
        'methodology': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Methodology</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-6.PNG">
                    <img src="assets/images/banner-6.jpg" alt="Methodology: Data Pipeline and Explanation">
                </picture>
            </div>
            
            <h2>STEP 0: SAMPLE</h2>
            <p>The analysis draws on a stratified random sample of 1,000 bibliographic records, selected by IDN document sequence number from KBR's backend system (Google Books project APP) export of 86,636 entries on 23 April 2026. The 1,000 sampled IDNs were subsequently submitted to KBR library staff, who exported the corresponding bibliographic records as MARC 21 XML from the institutional catalogue system (Syracus). Sampling was restricted to the two main collection sections, M-SLZ (70,230 records, 81%) and M-RP (16,337 records, 19%), totalling 86,567 entries, with 69 records from minor sections excluded due to low volume and heterogeneous metadata formats. Stratification mirrors the population distribution between the two sections, ensuring proportional representation.</p>
            
            <h2>STEP 1: EXTRACT</h2>
            <p>Structured data was extracted from 1,000 MARC 21 XML records using Python. Each record is anchored by a unique book ID from field 001. Publication year is drawn from 008 positions 07–10 (Date 1). Where this field yields no valid date, 264 $c serves as a fallback, recovering 4 of the 17 initially null records. The remaining 13 invalid entries (12 null and 1 zero-valued) represent genuine cataloguing gaps and are excluded from temporal analysis, yielding a final dataset of 987 datable records spanning 1602–1901. Language is extracted from 041 $a; records with multiple values are consolidated as "multiple languages" following the Europeana convention.</p>
            <p>The relational schema follows Third Normal Form (3NF), producing seven CSV files: a core catalogue table (books.csv) holding one-to-one attributes (book ID, title, year, language), and three pairs of bridge tables managing multi-valued entities: cities (book_cities.csv, cities.csv), countries (book_countries.csv, countries.csv), and publishers (book_publishers.csv, publishers.csv). This architecture prevents cartesian product inflation when multi-valued fields are later merged for analysis, and ensures each intermediate table can be independently audited for data quality.</p>
            <p>Publisher extraction prioritises authority control over coverage: only entries in fields 100, 110, 700, 710, 720 with relator code $4="pbl" are retained, yielding 452 records (45.2%) with identifiable publisher data and 376 unique publisher entities. This trade-off preserves data integrity over breadth, excluding informal transcriptions from 264 $b.</p>
            
            <h2>STEP 2: CLEAN</h2>
            <p>Cleaning proceeded in two stages. Python-based syntactic normalisation addressed historical MARC metadata noise across cities, countries, and publishers. City names underwent multi-stage processing: Latin inflections (Parisiis→Paris), publication prefixes (A, Tot), MARC editorial symbols, and whitespace irregularities were resolved, consolidating 270 raw entries into 238 canonical forms. Country codes from 044 $a were mapped to standardised English names via a manually verified reference dictionary cross-checked against the Library of Congress MARC Code List for Countries, resolving regional variants (e.g., England, Scotland→United Kingdom) and historical code ambiguities. Publisher cleaning addressed six categories of noise: missing value standardisation ([s.n.]→Unknown), encoding artefacts, bracketed supplementary metadata, professional role suffixes (imprimeur, libraire, éditeur), conjunction notation (" et "→" & "), and KBR authority control identifiers, producing 374 canonical forms from 376 raw entries.</p>
            <p>City names were then reconciled against Wikidata via OpenRefine to assign authoritative geospatial coordinates. Of 270 processed entries, 262 were successfully matched; the remaining 8 retain null coordinates rather than speculative values. Publisher semantic enrichment via Wikidata was deprioritised, as Python-based cleaning proved sufficient for the aggregation-centric visualisation goals.</p>
            
            <h2>STEP 3: INTEGRATE</h2>
            <p>Five domain-specific analytical tables were generated from the seven relational CSVs, using a chain-merge strategy rather than a single denormalised flat file. For each dimension, the core catalogue (books.csv) is joined to the relevant bridge table, then to the cleaned reference table, preserving full provenance at each stage.</p>
            <p>Year and language tables are deduplicated to one row per book (drop_duplicates(subset=['book_id'])), preventing multi-valued fields from inflating counts. Country and city tables intentionally preserve expanded rows: a book co-published in Belgium and France contributes to both country counts, accurately representing cross-border publication networks. The publisher table similarly retains multi-publisher associations. Left joins are used throughout to retain all 1,000 source records regardless of whether a match exists in the reference table, preventing silent data loss. A filtered city table retaining only records with valid coordinates is generated separately for Folium rendering.</p>
            
            <h2>STEP 4: VISUALISE</h2>
            <p>Six interactive visualisations were produced using Plotly and Folium, exported as standalone responsive HTML files.</p>
            <p>The year distribution chart operates on a deduplicated dataset (drop_duplicates(subset=['book_id'])), ensuring each physical book contributes exactly once to the temporal count. A range slider allows readers to zoom into specific decades across the 300-year span. The language distribution uses a pie chart rather than a bar chart, as the analytical goal is proportional composition rather than precise ranking. MARC language codes are mapped to full human-readable names; colour assignment follows total volume to enable cross-chart comparison with the Publisher Language Distribution chart.</p>
            <p>The country distribution chart preserves co-publication rows rather than deduplicating: a book published in both Belgium and France contributes to both national counts, accurately representing cross-border publication networks. A horizontal bar orientation was chosen to accommodate all 26 country names without truncation.</p>
            <p>Although publisher data is available for only 452 records (45.2%), the authority-controlled subset offers meaningful insight into the commercial landscape of the collection at an aggregation level. Publisher analysis uses two complementary charts drawing from the same filtered subset (within-period count of 2 or more, top 30 segments). The Treemap communicates market share across six time periods, five of which appear in the chart, via a three-level hierarchy (Period, Publisher, Individual Book Title); the 1600–1750 period is excluded as no publisher meets the minimum threshold. A publisher-by-period heatmap was prototyped but discarded: only 18 of 374 publishers are active across two or more periods, producing a near-entirely sparse grid. The stacked bar chart replaces it by introducing a genuinely distinct analytical dimension, the linguistic profile of each publisher, allowing direct comparison between French-language specialists and multilingual publishers.</p>
            <p>The cities map uses unscaled CircleMarker radii proportional to absolute publication volume, preserving the genuine concentration of historical publishing activity rather than compressing it for visual balance. Of 1,073 city records, 1,052 (98.0%) carry valid Wikidata coordinates; the remaining 21 retain null values rather than speculative imputed locations.</p>
            
            <h2>STEP 5: DEPLOY</h2>
            <p>The website is built as a static site deployed on Vercel via GitHub auto-deployment. Each visualisation is exported as a standalone HTML file and embedded via iframe, allowing individual charts to be updated independently without rebuilding the entire site.</p>
            <p>Visual design follows KBR's institutional brand palette throughout all six charts, ensuring visual consistency and institutional identity. Accessibility was a deliberate consideration: text contrast on chart elements is computed programmatically based on background luminance to meet WCAG AA standards, particularly on darker palette colours where black text would fail contrast thresholds.</p>
            <p>Typography uses sans-serif fonts for chart labels and Georgia serif for descriptive text. The layout is responsive, adapting to different screen widths, with minimum width constraints applied to complex charts such as the Treemap to preserve readability at narrow viewports.</p>
        `
    };
    
    pageContent.innerHTML = pages[pageName] || '<h1>Page not found</h1>';

    // Trigger Plotly responsive resize after iframe loads
    const iframes = pageContent.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.onload = function() {
            try {
                setTimeout(() => {
                    iframe.contentWindow.dispatchEvent(new Event('resize'));
                    if (iframe.contentWindow.Plotly) {
                        const plots = iframe.contentDocument.querySelectorAll('.plotly-graph-div');
                        plots.forEach(plot => iframe.contentWindow.Plotly.Plots.resize(plot));
                    }
                }, 300);
            } catch(e) {}
        };
    });


}
