# CounselMate 💊
> **Pharmacy Counseling Simulation Platform**  
> *"Practice. Communicate. Care."*

CounselMate is an interactive, responsive healthcare web application designed for pharmacy students and clinical educators to simulate realistic outpatient pharmacist-patient counseling consultations.

![CounselMate Consultation Station](/public/hero_banner.jpg)

---

## 🌟 Key Features

- **Realistic Virtual Patient Scenarios**: Practice outpatient counseling across 5 standardized clinical cases:
  1. **Hypertension**: Amlodipine 5 mg (First-time prescription, adherence, OTC Ibuprofen interaction, kidney myth)
  2. **Type 2 Diabetes**: Metformin 500 mg (Titration, GI distress prevention with meals, alcohol moderation)
  3. **GERD / Gastritis**: Omeprazole 20 mg (Pre-breakfast 30–60 min timing, swallowing whole, delayed onset)
  4. **Antibiotics**: Amoxicillin 500 mg (Course completion, 8-hour spacing, oral contraceptive interactions)
  5. **Dyslipidemia**: Simvastatin 20 mg (Bedtime timing, grapefruit juice toxicity, myopathy red flags)
- **Interactive Chat Simulation**: Responsive patient dialogue engine with dynamic emotional states (`Anxious`, `Curious`, `Reassured`, `Grateful`, `Skeptical`, `Surprised`) and hidden clinical discoveries.
- **10-Point Objective Competency Assessment**: Automatic evaluation scoring from 0–100 across 10 standards with strengths, growth areas, and golden-standard question rephrasing.
- **6-Step Clinical Counseling Guide**: Masterclass based on the Indian Health Service (IHS) model and Teach-Back verification.
- **Interactive Quiz Center**: Instant feedback and pharmacological explanations for clinical counseling dilemmas.
- **Learning Progress & History**: Longitudinal competency growth tracking and transcript archives persisted in `localStorage`.

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/counselmate.git
   cd counselmate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages

This project is pre-configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. Push this repository to GitHub.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push any commit to `main`, and your site will be live automatically!

---

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS (Custom healthcare palette: Deep Navy, Clinical Teal, Mint)
- **Icons:** Lucide React
- **Bundler:** Vite
- **Storage:** LocalStorage (zero external API keys required)

---

## 📄 License & Disclaimer

CounselMate is an educational tool designed for healthcare student simulation. All patient profiles and scenarios are simulated for clinical training purposes.
