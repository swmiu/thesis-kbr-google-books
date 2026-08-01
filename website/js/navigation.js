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
                <p>The Royal Library of Belgium (KBR) is the national scientific library of Belgium, which holds about eight million objects reflecting the cultural and historical heritage of the country. In 2022, KBR announced a partnership with Google Books to handle a large-scale digitisation programme, covering works from the 17th to the end of the 19th century, and make them freely accessible worldwide via both Google Books and KBR's online catalogue. Over the course of three years, from 2023 to 2026, approximately 100,000 works were sent to Google Books for digitisation.</p>
                <p>This website presents the results of a thesis project based on the digitisation effort. In the framework of the Advanced Master's program in Digital Humanities at KU Leuven, the author completed an internship at KBR's Google Books Project team from March to June 2026, acquiring the practice of cataloguing. The daily work involved retrieving books from the stacks, verifying existing catalogue records, and adding missing metadata based on information found on the title pages. Before further processing and analysing the metadata with a distant-reading approach, this hands-on experience provided integrated knowledge of the patterns and potential challenges of the metadata, which helped the author make key design decisions to answer the research question.</p>
            </div>
            
            <h2>Research Question</h2>
            <div class="chart-description">
                <p>The core concerns of the research project trace back to the objective of KBR's collaboration with Google Books: increasing the visibility of KBR's digitised collections on the internet while expanding their reach to readers from all over the world with free access. In this context, what content is being preserved, democratised and promoted to universal readers became the main interest of this research.</p>
                <p>Instead of interpreting the cultural values and ideologies of the content, this project asks a more straightforward question: what can 1,000 bibliographic records tell us about the character of these digitised books? The visualisations presented on this website approach that question from four angles: temporal, linguistic, geographical, and commercial. The results aim to provide an initial ground for further studies in specialised fields.</p>
            </div>

            <h2>About This Dataset</h2>
            <div class="chart-description">
                <p>The 1,000 records analysed here represent a stratified random sample drawn from a deduplicated pool of 68,036 unique bibliographic records, itself filtered from an original export of 86,636 catalogue entries updated by the team. The dataset was filtered to retain only two main collection sections: M-SLZ (Salle de Lecture Générale, general reading room collection) and M-RP (Réserve Précieuse, rare works predating Belgian independence in 1830), sampled in proportion to their share observed in the source file (approx. 81% and 19% respectively), allocating 810 records to M-SLZ and 190 to M-RP. As all sampled records had been manually verified and enriched by team members during the project, the dataset benefits from a higher level of metadata quality.</p>
            </div>
            
            <h2>Temporal Scope of 1602–1901</h2>
            <div class="chart-description">
                <p>In Belgium, copyright law provides protection for up to 70 years after the death of the author, while Google Books opted for 125 years for copyright protection. With 2026 as the project's closing year, this timeline places the upper boundary of the eligible collection at 1901. The lower boundary of 1602 comes from the earliest publication year present in this sample. Together, these dates frame a 300-year window of European publication history and define the temporal scope of every visualisation on this site.</p>
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
                <p>This chart demonstrates the publication years of the 987 records (excluding 13 without valid data), spanning from 1602 to 1901. The notable increase since the 1830s is consistent with the M-SLZ section's coverage (81%), as this section houses publications from 1830 onwards, while the remaining comes from the M-RP section (19%), containing publications "older than Belgium," before 1830. While the year distribution is consistent with Belgium's relatively recent national history, the concentration during the 1861–1890 period shows elevated publishing activity.</p>
                <p>These patterns describe the profile of this sample, not KBR’s collection as a whole. The range slider beneath the chart allows readers to zoom into specific decades for a closer look at year-by-year variation.</p>
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
                <p>This chart provides a look into the language diversity of this sample. Among 10 distinct languages and a "multiple languages" category, French accounts for the largest share (65.5%), followed by German (9.2%) and Dutch (8.8%). Latin (2.8%) marks the presence of older scholarly and religious works in the sample.</p>
                <p>Beyond these four, the sample includes six other languages across multiple language families: English (5.3%), Italian (4.3%), Spanish (1.8%), Portuguese (0.5%), Russian (0.4%), and Swedish (0.1%), demonstrating the wide range of this sample beyond French publications. One thing to note is a small number of records (1.3%) carrying more than one language code and are grouped as "multiple languages." The interactive legend allows readers to hover on individual languages for details.</p>
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
                <p>Among the 1,000 records, 452 (45.2%) contain identifiable publisher information extracted exclusively from authority-controlled MARC fields (100, 110, 700, 710, 720) where the relator code indicated a publisher role. The treemap is based on this subset rather than the full sample. It visualises the market share of 374 unique publisher entities across five time periods: 1751–1800, 1801–1830, 1831–1860, 1861–1890, and 1891–1901.</p>
                <p>To avoid visual noise of single-title publishers, the chart displays the top 30 publishers with at least two publications within a given period. As a result, the 1600–1750 period was left off the chart, whereas larger publishers in each period are represented by proportionally larger tiles. The 1861–1890 period in bright yellow tile dominates, consistent with the temporal distribution of the full sample. It should be noted that this observation is limited to this sample.</p>
                <p>Click on a period tile to zoom in to individual publishers; click on a publisher to check the titles and publication years.</p>
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
                <p>This chart is based on the same publisher subset as the treemap of Publisher Market Share above, ensuring both visualisations draw from a consistent basis. It explores the linguistic dimension of these core publishers. While the size of the sample is relatively limited, several patterns can still be observed. Houses such as H. Manceaux and Baillière contribute exclusively French-language publications in the sample subset. Others show a broader reach. Librairie Hachette &amp; Cie spans French and Latin, while A. Siffer and I. Vanderpoorten contribute to publications in both Dutch and French. German-language publishers such as J. F. Richter and C. G. Lüderitz'Sche Verlagsbuchhandlung are the main contributors of German books within this sample. It should be noted that this observation is limited to this sample and does not represent the complete publishing history of these houses.</p>
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
                <p>This chart demonstrates the geopolitical scope of the publication across 26 countries, based on publication country codes recorded in the MARC metadata. Belgium leads with 383 records, followed closely by France with 352, which is coherent with the French-language dominance in the sample. Germany (98), Italy (43), the United Kingdom (39), and the Netherlands (25) follow, representing the broader reach of this sample. Beyond Europe, the sample also includes records from the Americas (the United States, Mexico, Argentina, etc.) and Japan, reflecting the diverse geographic scope. A small number of records (12) carry unresolved country codes and are listed as "Unknown."</p>
                <p>For books co-published in multiple countries, a single book contributes to each respective country count, resulting in a total count of more than 1,000. This method preserves the cross-border nature of historical European publishing. As with all charts in this project, these figures describe the profile of this specific sample rather than KBR’s whole collection.</p>
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
                <p>This interactive map provides a closer look on the geographical dimension by laying out 189 distinct publication cities across Europe and beyond. The major publishing centres remain in Europe. Paris (296) and Brussels (192) dominate by a wide margin, reflecting the French-language dominance of the sample. Ghent (49), London (35), Antwerp (25), Liège (24), and Leipzig (21) form a secondary tier of active publishing centres. On the website, users can check the exact city name and respective publication count by hovering over a circle. This map illustrates the profile of this specific sample, rather than KBR’s whole collection. Hover over any circle to see the city name and publication count.</p>
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
            <p>On 23 April 2026, the internship mentor exported 86,636 document units from KBR's internal Google Books Project management application, drawn from the "Digitise by Google Books" category, which contains bibliographic entries whose metadata has been reviewed and updated manually by project team members.</p>
            <p>Sampling was restricted to the two main collection sections: M-SLZ (<em>Magasin Salle de Lecture Générale</em>, General Reading Room stacks) with 70,230 records (81.1%), and M-RP (<em>Magasin Réserve Précieuse</em>, Precious Works stacks) with 16,337 records (18.9%), totalling 86,567 records. The remaining 69 records came from minor sections and were excluded due to their very small share and heterogeneous metadata formats.</p>
            <p>The data was then deduplicated at IDN level, as the source listed records at the level of individual volumes or copies, leaving 68,036 unique records. A proportional stratified random sample of 1,000 records was drawn, allocating 810 to M-SLZ and 190 to M-RP, with a fixed random seed to ensure full reproducibility. The resulting IDN list was submitted to KBR's Bibliographic Information Agency, who exported the corresponding MARC 21 XML records from the catalogue system (Syracuse).</p>

            <h2>STEP 1: EXTRACT</h2>
            <p>The 1,000 MARCXML records were parsed using Python's ElementTree library, extracting structured fields into seven relational CSV files following the Third Normal Form (3NF) principle: a core catalogue table (books.csv) holding one-to-one attributes, and three pairs of bridge and entity tables for cities, countries, and publishers. This architecture prevents cartesian product inflation when multi-valued fields are later merged, and allows every analytical table to be independently audited.</p>
            <p>For most fields, extraction was straightforward: the book identifier from 001, the title from 245 $a, cities from 264 $a, and country codes from 044 $a. Three fields required extra logic.</p>
            <p><strong>Publication year</strong> is drawn from 008 positions 07&ndash;10 (Date 1). Where this field yields no valid date, 264 $c serves as a fallback, recovering 4 of the 17 initially null records. The remaining 13 records were excluded from temporal analysis but kept for the linguistic and geographic dimensions, yielding a final total of 987 datable records spanning 1602 to 1901.</p>
            <p><strong>Publisher names</strong> are extracted from authority-controlled fields (100, 110, 700, 710, 720), taking subfield $a only where $4="pbl", rather than from field 264 $b. The field 264 $b is a transcription field which records names exactly as they appear on the title page, without any assignment of roles such as publisher and printer, whereas the authority-controlled fields explicitly identify the entity's role and link to a standardised entity. This yielded publisher information for 452 of the 1,000 records, a coverage rate of 45.2%, prioritising consistent data quality over breadth.</p>
            <p><strong>Language</strong> is extracted from 041 $a. Records containing multiple language values are consolidated under a single "multiple languages" category, which aligns with the ISO 639-2 standard code mul and prevents duplicate counting in the proportional distribution.</p>

            <h2>STEP 2: CLEAN</h2>
            <p>The three entity tables underwent different approaches depending on the characteristics of the metadata and the ultimate visualisation goals.</p>
            <p><strong>Cities</strong> required the most work, as city names were drawn from the transcription field 264 $a, where information was recorded faithfully from the title page. Names can therefore appear in any language and in historical forms, including Latin, and the field also allowed cataloguers to enter descriptive text and editorial symbols. A multi-layer approach in Python consolidated multilingual "place unknown" phrases, removed prepositions and narrative phrases such as "A Bruxelles" and "Tot Brussel", and mapped Latin names to their modern forms, reducing 270 raw entries to 238 unique cleaned values.</p>
            <p>City names were then loaded into OpenRefine for reconciliation against Wikidata. Ambiguous cases, such as same-name cities in different countries, required manual verification against the original MARCXML records. Coordinates were retrieved through the "Add columns from reconciled values" feature, which queries Wikidata properties for each matched entity. Of the 270 entries, 262 were successfully reconciled; the remaining 8 retain null coordinate values rather than speculative ones.</p>
            <p><strong>Publishers</strong>, already more standardised by nature, required a lighter approach: [s.n.] (<em>sine nomine</em>, meaning no publisher) was standardised to Unknown, and punctuation, white spaces, bracketed supplementary content, and professional role suffixes were removed, with the conjunction "et" unified to "&amp;". This consolidated 376 raw entries into 374 cleaned forms.</p>
            <p><strong>Country codes</strong> were verified against the Library of Congress MARC Code List for Countries and mapped to their full English names via a manually verified Python dictionary, with regional codes grouped into single country entries to avoid fragmentation in the visualisation.</p>

            <h2>STEP 3: INTEGRATE</h2>
            <p>The cleaned CSVs were merged into analytical tables using left joins, joining the core catalogue to the relevant bridge table and then to the cleaned reference table.</p>
            <p>Year and language are one-to-one attributes stored in books.csv, so these tables naturally contain one row per book. Country, city, and publisher are multi-valued relationships drawn from bridge tables, meaning a book published across different countries or cities, or by more than one publisher, appears in multiple rows. This was an intentional design, as they represent real bibliographic relationships rather than meaningless duplicates. A filtered city table retaining only rows with valid coordinates was exported separately for the map.</p>
            <p>This step also introduced a density-adapted periodisation scheme for the publisher treemap, reflecting the concentration of publisher records observed during 1861&ndash;1890 rather than imposing uniform time intervals.</p>

            <h2>STEP 4: VISUALISE</h2>
            <p>Six interactive visualisations were generated using Plotly and Folium, exported as standalone responsive HTML files with interactive tooltips. All follow a colour palette that echoes KBR's official website, with visual consistency and readability as the two main considerations.</p>
            <p>The <strong>year distribution</strong> is presented as a line chart with a filled area beneath the curve. A range slider allows readers to zoom into any period of interest across the 300-year span.</p>
            <p>The <strong>language distribution</strong> uses a pie chart rather than a bar chart, as the analytical goal is to visualise the proportional composition rather than simply checking the ranking. MARC language codes are mapped to full names, and the colours match those used in the Publisher Language Profile chart to maintain a coherent visual experience.</p>
            <p>The <strong>country distribution</strong> is a horizontal bar chart ranking 26 countries by publication volume, with full country names presented without truncation or rotation. A book co-published in Belgium and France contributes counts to both countries, as the research interest lies in the geographic scope of publication.</p>
            <p>The <strong>publisher treemap</strong> presents the relative place of each publisher in the market through a three-level hierarchy, from period overview to individual publisher to individual book title. To avoid hundreds of nearly invisible tiles, a threshold of at least two publications within a given period was implemented, retaining the top 30 period-publisher segments by volume. As a result, the 1600&ndash;1750 period was left off the chart, leaving five periods on display.</p>
            <p>The <strong>publisher language profile</strong> replaced an earlier plan for a temporal heatmap, which contained too little colour variation to yield any meaningful pattern, as too few publishers were active across two or more periods. The stacked horizontal bar chart introduces a genuinely distinct dimension instead, showing whether individual publishers tend to specialise in a single language or were more multilingual. It reuses the identical filtering logic and publisher subset as the treemap.</p>
            <p>The <strong>cities map</strong> is an interactive Folium map built from the coordinates harvested through Wikidata reconciliation. Each city is represented as a circle marker whose radius is scaled by the square root of its publication count, so that the perceived area of each marker remains proportional to the volume, with a minimum of 4 pixels to ensure that even single-publication cities remain visible and clickable, and a maximum of 30 pixels. Of 1,073 city rows, 1,052 (98%) carry valid coordinates.</p>

            <h2>STEP 5: DEPLOY</h2>
            <p>The six HTML chart files were integrated into a static website built with HTML, CSS, and JavaScript, deployed on Vercel via GitHub. Each chart is embedded as an iframe, allowing individual visualisations to be updated independently.</p>
            <p>Since the six charts are already rich in colour and diverse in shapes, the website body adopts a neutral, low-key colour scheme with warm tones to keep the user's attention on the data. Jost was used for headings, with Source Serif 4 for body text, both loaded via Google Fonts. The page banners are custom hand-drawn illustrations by Yung-Heng Wong, integrated using the HTML picture element to serve optimised images for desktop and mobile users.</p>
            <p>Text and background colour combinations were validated using the WebAIM Contrast Checker against the WCAG 2.1 Level AA contrast minimum. Following a basic accessibility audit, the heading hierarchy was corrected to ensure proper nesting. The layout adapts across desktop, tablet, and mobile breakpoints; on narrow viewports, chart containers enable horizontal scrolling to preserve chart readability without distorting the visualisations.</p>
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