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
            
            <h2>Project Overview</h2>
            <div class="chart-description">
                <p>The Royal Library of Belgium (KBR) is the national scientific library of Belgium, which holds about eight million objects reflecting the cultural and historical heritage of the country. In 2022, KBR formalised a partnership with Google Books to digitise a large portion of its collections, covering works from the 17th to the end of the 19th century, and make them freely accessible worldwide via both Google Books and KBR's online catalogue. Over the three-year project period from 2023 to June 2026, approximately 100,000* document units were sent to Google Books for digitisation.</p>
                <p>This website presents the results of a thesis project based on the digitisation effort. In the framework of the Advanced Master's program in Digital Humanities at KU Leuven, the author completed an internship at KBR's Google Books project team from March to June 2026, acquiring the practice of catalography from scratch. From retrieving books from the stacks to verifying and enriching catalogue metadata following the RDA (Resource Description and Access) guidelines, the author collected the metadata from the physical historic objects before further processing and analyzing it with a distant-reading approach. This integrated knowledge of the patterns and potential challenges of the metadata helped the author to make key design decisions to answer the research question.</p>
            </div>
            
            <h2>Research Question</h2>
            <div class="chart-description">
                <p>The core concerns of the research project trace back to the objective of KBR's collaboration with Google Books: increasing the visibility of KBR's digitised collections on the internet while expanding their reach to readers from all over the world with free access. In this context, what content is being preserved, democratized and promoted to universal readers became the main interest of this research.</p>
                <p>Instead of interpreting the cultural values and ideologies of the content, this project asks a more straightforward question: what can 1,000 bibliographic records tell us about the character of this collection? The visualizations presented on this website approach that question from four angles: temporal, linguistic, geographical, and commercial. The results aim to provide an initial ground for further studies in specialized fields.</p>
            </div>

            <h2>About This Dataset</h2>
            <div class="chart-description">
                <p>The 1,000 records analysed here represent a stratified random sample drawn from 86,636 catalogue entries updated by the team. The dataset was filtered to retain only two main collection sections: M-SLZ (<em>Salle de Lecture Générale</em>, general reading room collection, approx. 81%) and M-RP (<em>Réserve Précieuse</em>, rare works predating Belgian independence in 1830, approx. 19%), which yielded 86,567 records in the final dataset. As all sampled records had been manually verified and enriched by team members during the project, the dataset benefits from a higher level of metadata quality.</p>    
            </div>
            
            <h2>Temporal Scope of 1602–1901</h2>
            <div class="chart-description">
                <p>In Belgium, copyright law provides protection for up to 70 years after the death of the author, while Google Books opted for 125 years for copyright protection. With 2026 as the project's closing year, this timeline places the upper boundary of the eligible collection at 1901. The lower boundary of 1602 is simply the earliest publication year present in this sample, reflecting the natural historical depth of KBR's holdings. Together, these dates frame a 300-year window of European print culture and define the temporal scope of every visualisation on this site.</p>    
            </div>
        `,
        
        'temporal_framework': `
            <h1 style="position: absolute; left: -9999px;">KBR Google Books Analysis - Temporal Patterns</h1>
            <div class="page-banner">
                <picture>
                    <source media="(max-width: 767px)" srcset="assets/images/m-banner-2.PNG">
                    <img src="assets/images/banner-2.jpg" alt="Temporal Patterns: Year Distribution">
                </picture>
            </div>
            <div class="chart-container">
                <iframe src="data/visualizations/year_distribution.html" title="Year Distribution Chart"></iframe>
            </div>
            <div class="chart-description">
                <h2>Year Distribution</h2>
                <p>The chart demonstrates the publication years of the 1,000-record sample, spanning from 1602 to 1901. The notable increase since the 1830s reflects the composition of the sample itself: approximately 81% of the records come from the <em>M-SLZ</em> (Salle de Lecture Générale) section, which organizes holdings from 1830 onwards, while the remaining 19% comes from the <em>M-RP</em> (Réserve Précieuse) section, containing publications "older than Belgium." While the year distribution seems representative of Belgium's relatively recent national history, the concentration during the 1870–1890 period shows elevated publishing activity. These patterns describe the profile of this particular sample within the Google Books @ KBR project, not European publishing output as a whole. The range slider beneath the chart allows readers to zoom into specific decades for a closer look at year-by-year variation.</p>
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
                <p>This sample gives us a look into the language diversity of the library's collection. Among 10 distinct languages, the major proportion (65.5%) of French reflects the library's institutional identity and the historical dominance of French within Belgium and the intellectual circle during the 19th century. The two other official languages of Belgium, German and Dutch, follow at a distance at 9.2% and 8.8% respectively. Latin (2.8%) marks the presence of older scholarly and ecclesiastical works in the collection.</p>
                <p>Beyond these four, the sample spans a further six "foreign" languages across multiple language families: English (5.3%), Italian (4.3%), Spanish (1.8%), Portuguese (0.5%), Russian (0.4%), and Swedish (0.1%), pointing to the breadth of KBR's acquisition scope beyond the French-speaking world. One thing to note is a small number of records (1.3%) carrying more than one language code and are grouped as "multiple languages". The interactive legend allows readers to hover on individual languages for details.</p>
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
                <p>Among the 1,000 records, 452 (45.2%) contains identifiable publisher information extracted exclusively from authority-controlled MARC fields (100, 110, 700, 710, 720) where the relator code indicated a publisher role. The treemap is based on this subset rather than the full sample. It visualises the market share of 376 unique publisher entities across six time periods: 1600–1750, 1751–1800, 1801–1830, 1831–1860, 1861–1890, and 1891–1901.</p>
                <p>To avoid visual noise of single-title publishers, the chart displays publishers with at least two publications within a given period. As a result, the 1600–1750 period contains no publisher meeting the minimum threshold and is not visible in the chart, whereas larger publishers in each period are represented by proportionally larger tiles. The 1861–1890 period in bright yellow tile dominates, consistent with the temporal distribution of the full collection. Click on a period tile to zoom in to individual publishers; click on a publisher to check the titles and publication years.</p>
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
                <p>This chart is based on the same publisher subset as the treemap of Publisher Market Share above, ensuring both visualisations draw from a consistent corpus. It explores the linguistic dimension of these core publishers. While the size of the sample is relatively limited, several patterns can still be observed. Houses such as H. Manceaux and Baillière contribute exclusively French-language publications in the sample subset. Others show a broader reach: Librairie Hachette & Cie spans French and Latin, while A. Siffer and I. Vanderpoorten published in both Dutch and French. German-language publishers such as J. F. Richter and C. G. Lüderitz'Sche Verlagsbuchhandlung are the main publishers of German books within this sample. It should be noted that this observation is limited to this specific corpus and does not represent the complete publishing history of these houses.</p>
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
                <p>This chart demonstrates the geopolitical scope of the publication across 26 countries, based on publication country codes recorded in the MARC metadata. Belgium leads with 383 records, followed closely by France with 352, together reflecting the library's institutional identity and the French-language dominance of the collection. Germany (98), Italy (43), the United Kingdom (39), and the Netherlands (25) follow, representing the broader European reach of the library's acquisitions. Beyond Europe, the collection also includes records from the Americas (Argentina, Mexico, the United States, Chile, Uruguay, and Peru) and Japan, reflecting the diverse geographic scope. A small number of records (12) carry unresolved country codes and are listed as "Unknown."</p>
                <p>While the sample includes books co-published in multiple countries, in this case, a single book contributes to each respective country count, resulting in a total count of more than 1,000. This is a deliberate methodological choice that preserves the cross-border nature of historical European publishing. As with all charts on this site, these figures describe the profile of this specific sample rather than European publishing as a whole.</p>
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
                <p>The interactive map provides a closer look on the geographical dimension by laying out 189 distinct publication cities across Europe and beyond. However, the major publishing centres remain in Europe. Paris (264) and Brussels (192) dominate by a wide margin, reflecting the French-language dominance of the collection. Ghent (49), London (35), Antwerp (25), Liège (24), and Leipzig (21) form a secondary tier of active publishing centres. Hover over any circle to see the city name and publication count.</p>
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
            <p>The analysis draws on a stratified random sample of 1,000 bibliographic records, selected by IDN document sequence number from KBR's backend system (Google Books project APP) export of 86,636 entries on 23 April 2026. The 1,000 sampled IDNs were subsequently submitted to KBR library staff, who exported the corresponding bibliographic records as MARC 21 XML from the institutional catalogue system (Syracuse). Sampling was restricted to the two main collection sections, M-SLZ (70,230 records, 81%) and M-RP (16,337 records, 19%), totalling 86,567 entries, with 69 records from minor sections excluded due to low volume and heterogeneous metadata formats. Stratification mirrors the population distribution between the two sections, ensuring proportional representation.</p>
            
            <h2>STEP 1: EXTRACT</h2>
            <p>Structured data was extracted from 1,000 MARC 21 XML records using Python. Each record is anchored by a unique book ID from field 001. Publication year is drawn from 008 positions 07–10 (Date 1). Where this field yields no valid date, 264 $c serves as a fallback, recovering 4 of the 17 initially null records. The remaining 13 invalid entries (12 null and 1 zero-valued) represent genuine cataloguing gaps and are excluded from temporal analysis, yielding a final dataset of 987 datable records spanning 1602–1901. Language is extracted from 041 $a; records with multiple values are consolidated as "multiple languages" following the Europeana convention.</p>
            <p>The relational schema follows Third Normal Form (3NF), producing seven CSV files: a core catalogue table (books.csv) holding one-to-one attributes (book ID, title, year, language), and three pairs of bridge tables managing multi-valued entities: cities (book_cities.csv, cities.csv), countries (book_countries.csv, countries.csv), and publishers (book_publishers.csv, publishers.csv). This architecture prevents cartesian product inflation when multi-valued fields are later merged for analysis, and ensures each intermediate table can be independently audited for data quality.</p>
            <p>Publisher extraction prioritises authority control over coverage: only entries in fields 100, 110, 700, 710, 720 with relator code $4="pbl" are retained, yielding 452 records (45.2%) with identifiable publisher data and 376 unique publisher entities. This trade-off preserves data integrity over breadth, excluding informal transcriptions from 264 $b.</p>
            
            <h2>STEP 2: CLEAN</h2>
            <p>Cleaning proceeded in two stages. Python-based syntactic normalisation addressed historical MARC metadata noise across cities, countries, and publishers. City names underwent multi-stage processing: Latin inflections (Parisiis→Paris), publication prefixes (A, Tot), MARC editorial symbols, and whitespace irregularities were resolved, consolidating 270 raw entries into 238 canonical forms. Country codes from 044 $a were mapped to standardised English names via a manually verified reference dictionary cross-checked against the Library of Congress MARC Code List for Countries, resolving regional variants into unified country entries and historical code ambiguities. Publisher cleaning addressed six categories of noise: missing value standardisation ([s.n.]→Unknown), encoding artefacts, bracketed supplementary metadata, professional role suffixes (imprimeur, libraire, éditeur), conjunction notation (" et "→" & "), and KBR authority control identifiers, producing 374 canonical forms from 376 raw entries.</p>
            <p>City names were then reconciled against Wikidata via OpenRefine. Geospatial coordinates were retrieved through OpenRefine's "Add columns from reconciled values" feature, which queries Wikidata properties for each matched entity. Of 270 processed entries, 262 were successfully matched; the remaining 8 retain null coordinates rather than speculative values. Publisher semantic enrichment via Wikidata was deprioritised, as Python-based cleaning proved sufficient for the aggregation-centric visualisation goals.</p>
            
            <h2>STEP 3: INTEGRATE</h2>
            <p>Five domain-specific analytical tables were generated from the seven relational CSVs, using a chain-merge strategy rather than a single denormalised flat file. For each dimension, the core catalogue (books.csv) is joined to the relevant bridge table, then to the cleaned reference table, preserving full provenance at each stage.</p>
            <p>Year and language tables contain one row per book by design, as these are one-to-one attributes drawn directly from books.csv without any bridge table merge. Country and city tables intentionally preserve expanded rows: a book co-published in Belgium and France contributes to both country counts, accurately representing cross-border publication networks. The publisher table similarly retains multi-publisher associations. Left joins are used throughout to retain all 1,000 source records regardless of whether a match exists in the reference table, preventing silent data loss. A filtered city table retaining only records with valid coordinates is generated separately for Folium rendering.</p>
            
            <h2>STEP 4: VISUALISE</h2>
            <p>Six interactive visualisations were produced using Plotly and Folium, exported as standalone responsive HTML files.</p>
            <p>The year distribution chart uses data drawn directly from books.csv, where each book appears exactly once. A range slider allows readers to zoom into specific decades across the 300-year span. The language distribution uses a pie chart rather than a bar chart, as the analytical goal is proportional composition rather than precise ranking. MARC language codes are mapped to full human-readable names; colour assignment follows total volume to enable cross-chart comparison with the Publisher Language Distribution chart.</p>
            <p>The country distribution chart preserves co-publication rows rather than deduplicating: a book published in both Belgium and France contributes to both national counts, accurately representing cross-border publication networks. A horizontal bar orientation was chosen to accommodate all 26 country names without truncation.</p>
            <p>Although publisher data is available for only 452 records (45.2%), the authority-controlled subset offers meaningful insight into the commercial landscape of the collection at an aggregation level. Publisher analysis uses two complementary charts drawing from the same filtered subset (within-period count of 2 or more, top 30 segments). The Treemap communicates market share across six time periods, five of which appear in the chart, via a three-level hierarchy (Period, Publisher, Individual Book Title); the 1600–1750 period is excluded as no publisher meets the minimum threshold. A publisher-by-period heatmap was prototyped but discarded: only 18 of 374 publishers are active across two or more periods, producing a near-entirely sparse grid. The stacked bar chart replaces it by introducing a genuinely distinct analytical dimension, the linguistic profile of each publisher, allowing direct comparison between French-language specialists and multilingual publishers.</p>
            <p>The cities map uses CircleMarker radii scaled with a square root transformation of publication volume, with a minimum of 4 pixels for visibility and a maximum of 30 pixels to prevent overlap. This scaling preserves the relative ordering of cities while keeping smaller publication centres visible and interactive. Of 1,073 city records, 1,052 (98.0%) carry valid Wikidata coordinates; the remaining 21 retain null values rather than speculative imputed locations.</p>
            
            <h2>STEP 5: DEPLOY</h2>
            <p>The website is built as a static site deployed on Vercel via GitHub auto-deployment. Each visualisation is exported as a standalone HTML file and embedded via iframe, allowing individual charts to be updated independently without rebuilding the entire site.</p>
            <p>Visual design follows a palette derived from KBR's institutional branding, with the primary green deepened for improved text contrast. Typography uses Jost for headings and Source Serif 4 for body text, both loaded via Google Fonts. Page banners use the picture element to serve optimised images for desktop and mobile viewports; illustrations are by Yung-Heng Wong.</p>
            <p>Accessibility was a deliberate consideration: text contrast on chart elements is computed programmatically based on background luminance to meet WCAG AA standards, and heading hierarchy and landmark structure follow WCAG guidelines. The layout is responsive across desktop, tablet, and mobile breakpoints. On narrow viewports, chart containers enable horizontal scrolling to preserve chart readability without distorting complex visualisations such as the Treemap and Publisher Language bar chart.</p>

            <h2>AI Tools Disclosure</h2>
            <p>This project was developed using Claude (Anthropic) and Gemini (Google) as iterative development tools. AI tools were used for code generation, debugging, web development, and documentation drafting. AI tools were not used for data interpretation, research question formulation, or academic argumentation. All analytical decisions, research design, and academic interpretations are the author's own.</p>
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
