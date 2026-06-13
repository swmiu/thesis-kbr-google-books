# GitHub Setup Guide for Thesis Project
## KBR Google Books Digitization Analysis

---

## 1. Recommended GitHub Project Structure

```
thesis-kbr-google-books/
│
├── README.md                          # Project overview
├── METHODOLOGY.md                     # Detailed methodology (from METHODOLOGY_DRAFT.md)
├── .gitignore                         # Git ignore rules
├── requirements.txt                   # Python dependencies
├── environment.yml                    # Conda environment (optional)
│
├── notebooks/
│   ├── 1_extract_from_xml.ipynb       # Step 1: Extract
│   ├── 2_clean_data.ipynb             # Step 2: Clean (Python part)
│   ├── 2b_openrefine_notes.md         # Step 2b: OpenRefine manual steps
│   ├── 3_merge_tables.ipynb           # Step 3: Integrate
│   └── 4_visualize.ipynb              # Step 4: Visualize
│
├── data/
│   ├── raw/
│   │   ├── 0506_Q1_metadata.xml       # Original MARCXML (.gitignore)
│   │   ├── books.csv
│   │   ├── book_cities.csv
│   │   ├── cities.csv
│   │   ├── book_countries.csv
│   │   ├── countries.csv
│   │   ├── book_publishers.csv
│   │   └── publishers.csv
│   │
│   ├── cleaned/
│   │   ├── cities_cleaned.csv         # OpenRefine output
│   │   └── publishers_cleaned.csv
│   │
│   └── integrated/
│       └── data_for_visualization.csv # Step 3 output
│
├── outputs/
│   ├── year_dist.html
│   ├── language_dist.html
│   ├── country_dist.html
│   ├── publisher_dist.html
│   ├── cities_map.html
│   │
│   └── website/
│       ├── index.html
│       └── style.css
│
├── docs/
│   ├── EXTRACTION_DECISIONS.md        # Step 1 decision notes
│   ├── CLEANING_DECISIONS.md          # Step 2 decision notes
│   ├── INTEGRATION_NOTES.md           # Step 3 notes
│   └── VISUALIZATION_SPECS.md         # Step 4 visualization specs
│
└── .github/
    └── workflows/
        └── reproducibility.yml         # (Optional) CI/CD checks
```

---

## 2. Key Files Content Templates

### 2.1 README.md

```markdown
# KBR Google Books Digitization Project: Data Analysis & Visualization

## Overview
Analysis of 1,000 bibliographic records from KBR's Google Books digitization project.
This project documents the methodology and provides reproducible code for analyzing 
publication trends (language, chronology, geography, publishers) in the dataset.

## Quick Start

### Prerequisites
- Python 3.9+
- Git
- VS Code (recommended) or Jupyter

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/thesis-kbr-google-books.git
   cd thesis-kbr-google-books
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Obtain the input data:
   - Ensure `0506_Q1_metadata.xml` is placed in `data/raw/`
   - For access, contact [KBR contact information or Zenodo link]

### Running the Pipeline

Execute notebooks in order:
1. `notebooks/1_extract_from_xml.ipynb` - Extract MARCXML to relational CSVs
2. `notebooks/2_clean_data.ipynb` - Python preprocessing + OpenRefine (manual step)
3. `notebooks/3_merge_tables.ipynb` - Integrate tables for visualization
4. `notebooks/4_visualize.ipynb` - Generate interactive visualizations

### Project Structure

- **notebooks/** - Jupyter notebooks for each pipeline step
- **data/** - Data files (raw, cleaned, integrated)
- **outputs/** - Generated visualizations and website
- **docs/** - Decision documentation for each step
- **METHODOLOGY.md** - Complete methodology description

## Detailed Documentation

See **METHODOLOGY.md** for comprehensive pipeline architecture and design decisions.

## Author
[Your Name]
Master's Thesis, Digital Humanities, KU Leuven

## License
[Choose: MIT, CC-BY-4.0, or other appropriate license]
```

### 2.2 requirements.txt

```
pandas>=1.3.0
pymarc>=4.1.0
folium>=0.14.0
plotly>=5.0.0
matplotlib>=3.5.0
openpyxl>=3.6.0
jupyter>=1.0.0
ipython>=7.0.0
```

### 2.3 .gitignore

```
# Large data files
data/raw/0506_Q1_metadata.xml
data/raw/*.csv
data/cleaned/*.csv
data/integrated/*.csv

# Virtual environments
venv/
env/
ENV/
.venv

# Jupyter
.ipynb_checkpoints/
*.ipynb_checkpoints
*/.ipynb_checkpoints/*

# OS
.DS_Store
Thumbs.db
.directory

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.project
.pydevproject
.settings/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Environment
.env
.venv
env.bak
venv.bak

# Testing
.pytest_cache/
.coverage
htmlcov/

# Optional: Uncomment if you want to track HTML outputs
# outputs/*.html
```

---

## 3. GitHub Workflow Strategy

### 3.1 Initial Commits Plan

**Commit 1: Infrastructure**
```bash
git add README.md requirements.txt .gitignore METHODOLOGY.md
git commit -m "chore: initial project structure and documentation"
```

**Commit 2: Step 1**
```bash
git add notebooks/1_extract_from_xml.ipynb
git commit -m "feat: Step 1 MARCXML extraction notebook"
```

**Commit 3: Steps 2-4**
```bash
git add notebooks/2_clean_data.ipynb notebooks/3_merge_tables.ipynb notebooks/4_visualize.ipynb
git commit -m "feat: add Steps 2, 3, 4 notebooks"
```

**Commit 4: Documentation**
```bash
git add docs/
git commit -m "docs: add detailed step-by-step decision notes"
```

### 3.2 Branch Strategy (Simple Version)

```
main              # Stable version, final thesis submission
└─ develop        # Development branch, testing new features
```

Or if you prefer more granular control:
```
main
├─ step1-extract
├─ step2-clean
├─ step3-integrate
└─ step4-visualize
```

### 3.3 Versioning for Thesis Submission

When submitting thesis:
```bash
git tag -a v1.0-thesis-submission -m "Final version for thesis submission"
git push origin v1.0-thesis-submission
```

---

## 4. Data Management Strategy

### Option 1: Use .gitignore (Recommended)
- Don't track raw XML and CSV files
- Only track code and documentation
- In README, explain how to obtain original data
- Users can regenerate CSVs by running notebooks

### Option 2: Use Git LFS (If files are very large)
```bash
git lfs install
git lfs track "data/**/*.csv"
git add .gitattributes
git commit -m "config: set up Git LFS for data files"
```

### Option 3: Use Zenodo or OSF (Academic best practice)
- Upload original dataset to Zenodo
- Include DOI link in README
- Cite in thesis with proper reference

**Recommended for academic integrity:** Option 1 + Option 3
- Code and methodology on GitHub
- Data on Zenodo with persistent DOI

---

## 5. VS Code Integration Checklist

### What You'll Need to Do:
- [ ] Create GitHub account (if not already done)
- [ ] Create new repository on GitHub
- [ ] Install Git on your local machine
- [ ] Install VS Code (if not already done)
- [ ] Install Git extension in VS Code
- [ ] Clone repository to your local machine
- [ ] Open project in VS Code
- [ ] Create folder structure
- [ ] Create initial files
- [ ] Make first commit and push

**Next Step:** Follow the step-by-step VS Code + GitHub setup guide

---

## 6. Timeline for Thesis Submission

### Before Starting Analysis
- [ ] Create GitHub repo
- [ ] Set up folder structure
- [ ] Initialize with README + METHODOLOGY.md

### During Development
- [ ] Commit after each notebook completion
- [ ] Document decisions in docs/
- [ ] Regular pushes to backup

### Before Thesis Submission
- [ ] Final review of all documentation
- [ ] Run complete pipeline end-to-end
- [ ] Test reproducibility
- [ ] Create release/tag version
- [ ] Provide link to GitHub in thesis appendix

---

## 7. Useful Git Commands Reference

```bash
# Initial setup
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Cloning
git clone <repository-url>

# Checking status
git status
git log --oneline

# Making changes
git add <file>
git add .                    # Add all changes
git commit -m "message"

# Branching
git branch                   # List branches
git branch <new-branch>      # Create branch
git checkout <branch>        # Switch branch
git checkout -b <branch>     # Create and switch

# Pushing and pulling
git push origin <branch>
git pull origin <branch>

# Tagging (for thesis submission)
git tag -a v1.0 -m "Release version 1.0"
git push origin v1.0
```

---

## 8. Next Steps

1. **When ready:** Signal to proceed with VS Code + GitHub setup guide
2. **Guide will include:**
   - Creating GitHub account
   - Creating new repository
   - Installing Git on your machine
   - Cloning repo to VS Code
   - Creating folder structure
   - Making first commit
   - Setting up synchronization

---

## Notes

- This document is saved for future reference
- All paths assume you're in the project root directory
- Adjust paths as needed for your system
- For questions about specific steps, refer to the VS Code + GitHub setup guide
